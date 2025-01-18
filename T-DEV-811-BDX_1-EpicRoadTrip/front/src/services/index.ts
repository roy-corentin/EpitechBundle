import { Apis } from "../apis";
import { AppStore } from "../store";
import { AddToItineraryService } from "./AddToItineraryService";
import { ClearItineraryServices } from "./CleanItineraryService";
import { ClearMarkersServices } from "./CleanMarkersServices";
import { DecreaseIndexPoiItineraryService } from "./DecreaseIndexPoiIntineraryService";
import { DeleteItinerarySavedService } from "./DeleteItinerarySavedService";
import { IncreaseIndexPoiItineraryService } from "./IncreaseIndexPoiItineraryService";
import { SaveItineraryService } from "./SaveItineraryService";
import { ShowItineraryService } from "./ShowItineraryService";
import { SignUpService } from "./SignUpServie";
import { UpdateMapBoundService } from "./UpdateMapBoundsService";
import { UpdatePositionMarkerService } from "./UpdatePositionMarkerService";
import { SignInService } from "./signInService";

export interface Services {
  signUpService: SignUpService;
  signInService: SignInService;
  updateMapBounds: UpdateMapBoundService;
  updatePositionMarker: UpdatePositionMarkerService;
  addToItinerary: AddToItineraryService;
  clearMarkers: ClearMarkersServices;
  clearItinerary: ClearItineraryServices;
  saveItinerary: SaveItineraryService;
  showItinerary: ShowItineraryService;
  increasePoiItinerary: IncreaseIndexPoiItineraryService;
  decreasePoiItinerary: DecreaseIndexPoiItineraryService;
  deleteItinerarySaved: DeleteItinerarySavedService;
}

export function initServices(store: AppStore, apis: Apis): Services {
  const { sessionApi } = apis;
  return {
    signUpService: new SignUpService(store, sessionApi),
    signInService: new SignInService(store, sessionApi),
    updateMapBounds: new UpdateMapBoundService(store),
    updatePositionMarker: new UpdatePositionMarkerService(store),
    addToItinerary: new AddToItineraryService(store),
    clearMarkers: new ClearMarkersServices(store),
    clearItinerary: new ClearItineraryServices(store),
    saveItinerary: new SaveItineraryService(store),
    showItinerary: new ShowItineraryService(store),
    increasePoiItinerary: new IncreaseIndexPoiItineraryService(store),
    decreasePoiItinerary: new DecreaseIndexPoiItineraryService(store),
    deleteItinerarySaved: new DeleteItinerarySavedService(store),
  };
}
