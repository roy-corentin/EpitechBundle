import { AppStore } from "../store";
import { Marker } from "../domain/Marker";

export class UpdatePositionMarkerService {
  constructor(private readonly store: AppStore) {}

  call(newPositionMarker: Marker) {
    this.store.setState((_state) => ({
      position: [newPositionMarker.lat, newPositionMarker.lng],
      positionMarker: newPositionMarker,
    }));
  }
}
