import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { Marker } from "../domain/Marker";

export function searchResultToMarker(place: SearchResult): Marker {
  return {
    id: crypto.randomUUID(),
    lat: place.y,
    lng: place.x,
    title: place.label,
    description: "Votre recherche",
    petsAllowed: null,
    link: null,
    address: {
      city: null,
      postalCode: null,
      streetAddress: null,
      department: null,
      region: null,
      country: "France",
    },
  };
}
