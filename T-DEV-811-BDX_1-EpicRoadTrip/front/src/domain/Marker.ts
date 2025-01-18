export interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  petsAllowed: boolean | null;
  link: string | null;
  address: {
    city: string | null;
    country: string | null;
    department: string | null;
    postalCode: string | null;
    streetAddress: string | null;
    region: string | null;
  };
}
