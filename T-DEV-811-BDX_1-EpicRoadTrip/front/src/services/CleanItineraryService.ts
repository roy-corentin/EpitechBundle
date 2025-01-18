import { AppStore } from "../store";

export class ClearItineraryServices {
  constructor(private readonly store: AppStore) {}

  call() {
    this.store.setState(() => ({
      itinerary: [],
    }));
  }
}
