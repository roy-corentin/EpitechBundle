import { ErrorPage } from "./ErrorPage";
import { Route, createRoutesFromElements } from "react-router-dom";
import { BaseLayout } from "./layout/BaseLayout";
import { Search } from "./pages/Search";
import { ItinerariesSaved } from "./pages/ItinariesSaved";
import { Itinerary } from "./pages/Itinerary";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

export const routes = createRoutesFromElements(
  <Route element={<BaseLayout />}>
    <Route path="/" element={<Search />} errorElement={<ErrorPage />} />
    <Route path="/itinerary" element={<Itinerary />} errorElement={<ErrorPage />} />
    <Route path="/saves" element={<ItinerariesSaved />} errorElement={<ErrorPage />} />
    <Route path="/signup" element={<SignUp />} errorElement={<ErrorPage />} />
    <Route path="/signin" element={<SignIn />} errorElement={<ErrorPage />} />
  </Route>
);
