import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { IconButton } from "@chakra-ui/react";
import { useItinerary } from "../hooks";
import { MapSvgIcon } from "./Icons";

export const Routing = () => {
  const map = useMap();
  const itinerary = useItinerary();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!map) return;

    const waypoints = itinerary.map((s) => L.latLng(s.lat, s.lng));

    const plan = new L.Routing.Plan(waypoints, {
      createMarker: function () {
        return false;
      },
      addWaypoints: false,
      draggableWaypoints: false,
    });

    const routingControl = L.Routing.control({
      plan,
      showAlternatives: false,
      routeWhileDragging: true,
      addWaypoints: false,
    }).addTo(map);

    const routingContainer = document.querySelector(".leaflet-routing-container") as HTMLElement;
    if (routingContainer) {
      if (!isVisible) {
        routingContainer.style.display = "none";
      } else {
        routingContainer.style.color = "black";
        routingContainer.style.backgroundColor = "#fff";
        routingContainer.style.height = "300px";
        routingContainer.style.overflow = "auto";
        routingContainer.style.position = "fixed";
        routingContainer.style.bottom = "65px";
        routingContainer.style.right = "5px";
      }
    }

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, itinerary, isVisible]);

  return (
    <IconButton
      zIndex={1000}
      mt={100}
      bottom={5}
      right={5}
      position={"fixed"}
      onClick={() => setIsVisible(!isVisible)}
      aria-label={"Instructions"}
      icon={<MapSvgIcon />}
    />
  );
};
