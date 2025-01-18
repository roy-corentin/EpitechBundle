import { LatLngTuple } from "leaflet";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MapBounds } from "./domain/MapBounds";
import { Marker } from "./domain/Marker";
import { User } from "./domain/user";
import { Itinerary } from "./domain/itinerary";

export interface AppState {
  markers: Marker[];
  position: LatLngTuple;
  positionMarker: Marker;
  itinerary: Marker[];
  itinerariesSaved: Itinerary[];
  user: User | null;
  mapBounds: MapBounds;
}

export const initStore = () => {
  const defaultPosition: LatLngTuple = [44.833328, -0.56667];
  const defaultPositionMarker: Marker = {
    id: crypto.randomUUID(),
    lat: defaultPosition[0],
    lng: defaultPosition[1],
    title: "Bordeaux",
    description:
      "Ville historique de pierres et de vins, Bordeaux est aussi une destination plébiscitée pour ses ambiances urbaines, sa gastronomie et son effervescence culturelle. Une destination où la douceur de vivre et l'éco-responsabilité imprègnent chaque coin de rue. Laissez-vous séduire par son énergie bienveillante qui transporte habitants et visiteurs. Amateur d’art, féru d’histoire, épicurien ou slow-touriste : chaque voyageur trouvera son Bordeaux ! Voici les lieux et activités incontournables à vivre dans le Port de la Lune.",
    petsAllowed: true,
    link: "https://www.bordeaux-tourisme.com/ville-patrimoine/incontournables-bordeaux",
    address: {
      city: "Bordeaux",
      postalCode: "33000",
      streetAddress: null,
      department: null,
      region: null,
      country: "France",
    },
  };
  const defaultMapBounds: MapBounds = {
    northWest: {
      lat: 0,
      lng: 0,
    },
    southEast: {
      lat: 0,
      lng: 0,
    },
    center: {
      lat: 0,
      lng: 0,
    },
  };

  return create<AppState>()(
    devtools(
      () =>
        ({
          markers: [],
          position: defaultPosition,
          positionMarker: defaultPositionMarker,
          itinerary: [],
          itinerariesSaved: [],
          user: null,
          mapBounds: defaultMapBounds,
        }) as AppState
    )
  );
};

export type AppStore = ReturnType<typeof initStore>;
