import { Box } from "@chakra-ui/react";
import L from "leaflet";

export const itineraryIcon = L.icon({
  iconUrl: "/itineraryMarker.png",
  iconSize: [50, 50],
  iconAnchor: [24, 50],
  popupAnchor: [0, -47],
});

export const markerIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [50, 50],
  iconAnchor: [24, 50],
  popupAnchor: [0, -47],
});

export const resultIcon = L.icon({
  iconUrl: "/resultMarker.png",
  iconSize: [50, 50],
  iconAnchor: [24, 50],
  popupAnchor: [0, -47],
});

export const positionIcon = L.icon({
  iconUrl: "/positionMarker.png",
  iconSize: [50, 50],
  iconAnchor: [24, 50],
  popupAnchor: [0, -47],
});

export const DogIcon = () => {
  return (
    <Box as="svg" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" marginRight={2}>
      <path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
    </Box>
  );
};

export const WebSiteIcon = () => {
  return (
    <Box as="svg" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" marginRight={2}>
      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
    </Box>
  );
};

export const AddressIcon = () => {
  return (
    <Box as="svg" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" marginRight={2}>
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
    </Box>
  );
};

export const MarkerIcon = () => {
  return (
    <Box as="svg" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" marginRight={2}>
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
    </Box>
  );
};

export const MapSvgIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
    </svg>
  );
};
