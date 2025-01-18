import { useCallback, useContext } from "react";
import { DependenciesContext } from "../dependencies";
import { AppState } from "../store";
import { useStore } from "zustand";
import { LatLng } from "leaflet";

export const useMarkers = () => {
  return useContextStore((state) => state.markers);
};

export const usePosition = () => {
  return useContextStore((state) => state.position);
};

export const useItinerary = () => {
  return useContextStore((state) => state.itinerary);
};

export const useItinerariesSaved = () => {
  return useContextStore((state) => state.itinerariesSaved);
};

export const useUser = () => {
  return useContextStore((state) => state.user);
};

export const usePositionMarker = () => {
  return useContextStore((state) => state.positionMarker);
};

const useContextStore = <T>(selector: (state: AppState) => T) => {
  const deps = useContext(DependenciesContext);
  if (!deps) throw new Error("DependenciesContext not found");
  return useStore(deps.store, selector);
};

export const useClearMarker = () => {
  const deps = useContext(DependenciesContext);

  if (!deps) {
    throw new Error("DependenciesContext not found");
  }

  const addMarker = useCallback(() => {
    deps.store.setState(() => ({
      markers: [],
    }));
  }, [deps.store]);

  return addMarker;
};

export const useSetPosition = () => {
  const deps = useContext(DependenciesContext);

  if (!deps) {
    throw new Error("DependenciesContext not found");
  }

  const position = useCallback(
    (position: LatLng) => {
      deps.store.setState(() => ({
        position: [position.lat, position.lng],
      }));
    },
    [deps.store]
  );

  return position;
};

export const useQueries = () => {
  const deps = useContext(DependenciesContext);
  if (deps === null) throw Error("App initialization failed");
  return deps.queries;
};

export const useServices = () => {
  const deps = useContext(DependenciesContext);
  if (deps === null) throw Error("App initialization failed");
  return deps.services;
};
