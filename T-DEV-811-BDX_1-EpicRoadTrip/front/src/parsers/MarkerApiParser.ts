import { Marker } from "../domain/Marker";

interface MarkerApi {
  x: number;
  y: number;
  data: {
    address: {
      city: string | null;
      country: string | null;
      department: string | null;
      postalCode: string | null;
      streetAddress: string | null;
      region: string | null;
    };
    event: {
      label: string;
      type: string[];
      link: string | null;
      description: string;
      petsAllowed: boolean | null;
    };
  };
}

export function markerApiParser(markerApi: MarkerApi): Marker {
  return {
    id: crypto.randomUUID(),
    lat: markerApi.y,
    lng: markerApi.x,
    title: markerApi.data.event.label,
    description: markerApi.data.event.description,
    petsAllowed: markerApi.data.event.petsAllowed,
    link: markerApi.data.event.link,
    address: markerApi.data.address,
  };
}
