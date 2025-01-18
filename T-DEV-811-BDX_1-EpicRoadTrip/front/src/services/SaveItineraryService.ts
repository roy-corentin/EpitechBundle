import { AppStore } from "../store";

export class SaveItineraryService {
  constructor(private readonly store: AppStore) {}

  call(itineraryName: string) {
    this.store.setState((state) => ({
      itinerariesSaved: [...state.itinerariesSaved, { name: itineraryName, markers: state.itinerary }],
    }));
  }
}
