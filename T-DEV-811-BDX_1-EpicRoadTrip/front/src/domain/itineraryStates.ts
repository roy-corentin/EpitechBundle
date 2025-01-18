import { Itinerary } from "./itinerary";

export interface ItineraryStates {
  isDisplayed: boolean;
  itinerary: Itinerary | null;
}
