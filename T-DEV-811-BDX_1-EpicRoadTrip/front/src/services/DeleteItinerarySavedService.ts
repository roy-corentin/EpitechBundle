import { AppStore } from "../store";

export class DeleteItinerarySavedService {
  constructor(private readonly store: AppStore) {}

  call(index: number) {
    const itinerariesSaved = this.store.getState().itinerariesSaved;
    itinerariesSaved.splice(index, 1);

    this.store.setState((_state) => ({
      itinerariesSaved,
    }));
  }
}
