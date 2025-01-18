import { Text, Center, Stack, Box, Button } from "@chakra-ui/react";
import { useItinerary, useServices } from "../hooks";
import { MarkerCard } from "./MarkerCard";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useCallback } from "react";

export const ItineraryList = () => {
  const itinerary = useItinerary();
  const services = useServices();

  const increaseIndex = useCallback(
    (index: number) => {
      services.increasePoiItinerary.call(index);
    },
    [services]
  );

  const decreaseIndex = useCallback(
    (index: number) => {
      services.decreasePoiItinerary.call(index);
    },
    [services]
  );

  return itinerary.length != 0 ? (
    itinerary.map((marker, index) => (
      <Stack direction={"row"} key={marker.id}>
        <Box display="flex" alignItems="center">
          <MarkerCard marker={marker} />
          <Box display="flex" gap={7} alignItems={"center"} flexDirection={"column"} width="20%">
            {index !== 0 ? (
              <Button
                width="80%"
                onClick={() => {
                  increaseIndex(index);
                }}
              >
                <ChevronUpIcon />
              </Button>
            ) : null}
            {index !== itinerary.length - 1 ? (
              <Button
                width="80%"
                onClick={() => {
                  decreaseIndex(index);
                }}
              >
                <ChevronDownIcon />
              </Button>
            ) : null}
          </Box>
        </Box>
      </Stack>
    ))
  ) : (
    <Text textAlign={"center"} mt={4}>
      Aucun lieux ajoutés
    </Text>
  );
};
