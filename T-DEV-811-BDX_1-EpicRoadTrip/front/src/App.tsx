import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { routes } from "./routes";
import { AppStore, initStore } from "./store";
import { DependenciesProvider } from "./dependencies";
import { Queries, initQueries } from "./queries";
import { Apis, initApis } from "./apis";
import { Services, initServices } from "./services";

export type AppRouter = ReturnType<typeof createBrowserRouter>;

export class App {
  private readonly router: AppRouter;
  private readonly store: AppStore;
  private readonly themeConfig: ThemeConfig;
  private readonly apis: Apis;
  private readonly queries: Queries;
  private readonly services: Services;

  constructor() {
    this.store = initStore();
    this.router = createBrowserRouter(routes);
    this.apis = initApis();
    this.queries = initQueries(this.store, this.apis);
    this.services = initServices(this.store, this.apis);
    this.themeConfig = {
      initialColorMode: "dark",
      useSystemColorMode: false,
    };
  }

  start() {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <ChakraProvider theme={extendTheme({ config: this.themeConfig })}>
          <DependenciesProvider dependencies={{ store: this.store, queries: this.queries, services: this.services }}>
            <RouterProvider router={this.router} />
          </DependenciesProvider>
        </ChakraProvider>
      </React.StrictMode>
    );
  }
}
