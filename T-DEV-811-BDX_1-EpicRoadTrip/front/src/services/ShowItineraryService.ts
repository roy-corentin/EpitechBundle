import { AppStore } from "../store";

export class ShowItineraryService {
  constructor(private readonly store: AppStore) {}

  call(index: number) {
    this.store.setState((state) => ({
      itinerary: state.itinerariesSaved[index].markers,
    }));
  }
}
