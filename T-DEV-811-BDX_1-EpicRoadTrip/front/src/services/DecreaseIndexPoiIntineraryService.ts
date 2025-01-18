import { AppStore } from "../store";

export class DecreaseIndexPoiItineraryService {
  constructor(private readonly store: AppStore) {}

  call(index: number) {
    const itinerary = this.store.getState().itinerary;
    const [itineraryToMoved] = itinerary.splice(index, 1);
    const newItinerary = [...itinerary.slice(0, index + 1), itineraryToMoved, ...itinerary.slice(index + 1)];

    this.store.setState((_state) => ({
      itinerary: newItinerary,
    }));
  }
}
