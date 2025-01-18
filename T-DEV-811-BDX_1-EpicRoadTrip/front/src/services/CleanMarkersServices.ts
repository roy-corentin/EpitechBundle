import { AppStore } from "../store";

export class ClearMarkersServices {
  constructor(private readonly store: AppStore) {}

  call() {
    this.store.setState(() => ({
      markers: [],
    }));
  }
}
