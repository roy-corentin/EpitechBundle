import { MapBounds } from "../domain/MapBounds";
import { AppStore } from "../store";

export class UpdateMapBoundService {
  store: AppStore;

  constructor(store: AppStore) {
    this.store = store;
  }

  call(newMapBound: MapBounds) {
    console.debug(newMapBound);

    this.store.setState((_state) => ({
      mapBounds: newMapBound,
    }));

    return newMapBound;
  }
}
