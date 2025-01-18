import { Marker } from "../domain/Marker";
import { AppStore } from "../store";

export class AddToItineraryService {
  constructor(private readonly store: AppStore) {}

  call(marker: Marker) {
    this.store.setState((state) => ({
      itinerary: [...state.itinerary, marker],
    }));
  }
}
