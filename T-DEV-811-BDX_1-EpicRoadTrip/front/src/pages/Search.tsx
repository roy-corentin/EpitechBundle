import { Box, Button, Input, Text, VStack, Center, ButtonGroup, Spinner } from "@chakra-ui/react";
import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { useMarkers, useQueries, useServices } from "../hooks";
import { debounce } from "lodash-es";
import { MarkerCard } from "../components/MarkerCard";
import { POIType } from "../queries/PointOfInterestQuery";
import { searchResultToMarker } from "../utils/map";
import { Marker } from "../domain/Marker";

export const Search = () => {
  const [results, setResults] = useState<SearchResult[]>([]);

  const markers = useMarkers();
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const provider = new OpenStreetMapProvider();
  const queries = useQueries();
  const services = useServices();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDestinationChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const searchResults =
        value.length > 2
          ? await provider.search({
              query: value,
            })
          : [];
      setResults(searchResults);
    },
    [provider]
  );

  const updateHandlerWithDelay = useMemo(() => debounce(handleDestinationChange, 200), [handleDestinationChange]);

  const searchPointOfInterest = useCallback(
    async (type: POIType) => {
      setIsLoading(true);
      try {
        await queries.pointOfInterestQuery.call(type);
      } finally {
        setIsLoading(false);
      }
    },
    [queries, setIsLoading]
  );

  const setSearchMarker = useCallback(
    (place: SearchResult) => {
      services.updatePositionMarker.call(searchResultToMarker(place));
    },
    [services]
  );

  const handleResultClick = useCallback(
    (marker: Marker) => {
      services.updatePositionMarker.call(marker);
    },
    [services]
  );

  return (
    <Box mt={2}>
      <Center>
        <Box mt={5} p={2} w={"sm"} background={"gray.700"} borderWidth="1px" borderRadius="lg">
          <Text as="b" fontSize={"md"}>
            Recherchez des activités
          </Text>
          <br />
          <Input
            ref={inputRef}
            placeholder="Entrez un lieux"
            _placeholder={{ color: "white" }}
            variant="flushed"
            marginTop={3}
            onChange={(event) => {
              updateHandlerWithDelay.cancel();
              updateHandlerWithDelay(event);
            }}
          />
          {results.map((result, index) => (
            <VStack key={index} align="start" overflow="hidden">
              <Button
                variant="ghost"
                onClick={() => {
                  if (inputRef.current) inputRef.current.value = result.label;
                  setSearchMarker(result);
                  setResults([]);
                }}
              >
                {result.label}
              </Button>
            </VStack>
          ))}
        </Box>
      </Center>

      <Center>
        <SearchButtons searchPointOfInterestHandler={searchPointOfInterest} isLoading={isLoading} />
      </Center>
      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : markers.length > 0 ? (
        <VStack marginTop={2} maxHeight={"73vh"} overflowY={"scroll"}>
          <Text fontSize="2xl">RÉSULTAT {markers.length}</Text>
          {markers.map((marker) => (
            <Box minW={"100%"} key={marker.id} onClick={() => handleResultClick(marker)} cursor={"pointer"}>
              <Center>
                <MarkerCard marker={marker} />
              </Center>
            </Box>
          ))}
        </VStack>
      ) : null}
    </Box>
  );
};

const SearchButtons = ({
  searchPointOfInterestHandler,
  isLoading,
}: {
  searchPointOfInterestHandler: (type: POIType) => void;
  isLoading: boolean;
}) => {
  return (
    <ButtonGroup variant="outline" size="sm" spacing={3} marginY={5}>
      <Button
        colorScheme={"orange"}
        onClick={() => {
          searchPointOfInterestHandler("enjoy");
        }}
        isLoading={isLoading}
      >
        Enjoy
      </Button>
      <Button
        colorScheme={"red"}
        onClick={() => {
          searchPointOfInterestHandler("eat");
        }}
        isLoading={isLoading}
      >
        Eat
      </Button>
      <Button
        colorScheme={"blue"}
        onClick={() => {
          searchPointOfInterestHandler("drink");
        }}
        isLoading={isLoading}
      >
        Drink
      </Button>
      <Button
        colorScheme={"green"}
        onClick={() => {
          searchPointOfInterestHandler("sleep");
        }}
        isLoading={isLoading}
      >
        Sleep
      </Button>
      <Button
        colorScheme="pink"
        onClick={() => {
          searchPointOfInterestHandler("travel");
        }}
        isLoading={isLoading}
      >
        Travel
      </Button>
    </ButtonGroup>
  );
};
