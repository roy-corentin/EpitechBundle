import { Box, Checkbox, IconButton, Image, Stack, Text, VStack } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useItinerary, useMarkers, usePosition, usePositionMarker, useServices } from "../hooks";
import { CustomPopup } from "./Popup";
import { Routing } from "./Routing";
import { MapBounds } from "../domain/MapBounds";
import { itineraryIcon, positionIcon, resultIcon } from "./Icons";

export const Map = () => {
  const markers = useMarkers();
  const position = usePosition();
  const positionMarker = usePositionMarker();
  const itinerary = useItinerary();

  const [showMarkers, setShowMarkers] = useState(true);
  const [showItineraryMarkers, setShowItineraryMarkers] = useState(true);
  const [showItineraryTracker, setShowItineraryTracker] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const SetViewOnClick = () => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, map.getZoom());
    }, [position, map]);

    return null;
  };

  return (
    <Box style={{ flex: 2, backgroundColor: "green", position: "relative" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100vh" }} scrollWheelZoom={true} className="map">
        <SetViewOnClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetMapBounds />
        {showMarkers
          ? markers.map((marker) => (
              <Marker zIndexOffset={1} icon={resultIcon} position={[marker.lat, marker.lng]} key={marker.id}>
                <Popup>
                  <CustomPopup marker={marker} />
                </Popup>
              </Marker>
            ))
          : null}
        {showItineraryMarkers ? (
          <>
            {itinerary.map((marker) => (
              <Marker zIndexOffset={50} icon={itineraryIcon} position={[marker.lat, marker.lng]} key={marker.id}>
                <Popup>
                  <CustomPopup marker={marker} />
                </Popup>
              </Marker>
            ))}
          </>
        ) : null}
        {showItineraryTracker ? <Routing /> : null}
        {positionMarker ? (
          <Marker
            zIndexOffset={100}
            icon={positionIcon}
            position={[positionMarker.lat, positionMarker.lng]}
            key={positionMarker.id}
          >
            <Popup>
              <CustomPopup marker={positionMarker} />
            </Popup>
          </Marker>
        ) : null}

        <IconButton
          zIndex={1000}
          mt={100}
          bottom={5}
          ml={5}
          position={"fixed"}
          onClick={() => {
            setShowFilterMenu((show) => !show);
          }}
          aria-label={"Filter"}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          }
        />
      </MapContainer>
      {showFilterMenu ? (
        <Box
          zIndex="1000"
          position="fixed"
          bottom="65px"
          ml={5}
          p={2}
          backgroundColor="white"
          boxShadow="lg"
          borderRadius="md"
        >
          <VStack align="stretch" spacing={4}>
            <Checkbox
              size={"sm"}
              value="1"
              isChecked={showMarkers}
              onChange={() => {
                setShowMarkers((show) => !show);
              }}
            >
              <Stack direction={"row"}>
                <Image src="/resultMarker.png" maxW={8} maxH={8} />
                <Text color={"black"}>Points d'intérêts</Text>
              </Stack>
            </Checkbox>
            <Checkbox
              size={"sm"}
              value="1"
              isChecked={showItineraryMarkers}
              onChange={() => {
                setShowItineraryMarkers((show) => !show);
              }}
            >
              <Stack direction={"row"}>
                <Image src="/itineraryMarker.png" maxW={8} maxH={8} />
                <Text color={"black"}>Point Itinéraire</Text>
              </Stack>
            </Checkbox>
            <Checkbox
              size={"sm"}
              value="1"
              isChecked={showItineraryTracker}
              onChange={() => {
                setShowItineraryTracker((show) => !show);
              }}
            >
              <Stack direction={"row"}>
                <Image src="/destination.png" maxW={8} maxH={8} />
                <Text color={"black"}>Itinéraire</Text>
              </Stack>
            </Checkbox>
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

const GetMapBounds = () => {
  const map = useMap();
  const services = useServices();

  const updateMapViewHook = useCallback(() => {
    const rectangleBounds = map.getBounds();
    const rectangleCenter = map.getCenter();
    const mapBounds: MapBounds = {
      northWest: rectangleBounds.getNorthWest(),
      southEast: rectangleBounds.getSouthEast(),
      center: rectangleCenter,
    };

    services.updateMapBounds.call(mapBounds);
  }, [map, services.updateMapBounds]);

  map.on("moveend", updateMapViewHook);

  useEffect(() => {
    updateMapViewHook;
    return () => {
      map.off("moveend", updateMapViewHook);
    };
  }, []);
  return null;
};
