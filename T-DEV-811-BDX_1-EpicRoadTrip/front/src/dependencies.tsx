import { createContext } from "react";
import { AppStore } from "./store";
import { Queries } from "./queries";
import { Services } from "./services";

export interface Dependencies {
  store: AppStore;
  queries: Queries;
  services: Services;
}

interface DependenciesProviderProps {
  dependencies: Dependencies;
  children: React.ReactNode;
}

export const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = ({ dependencies, children }: DependenciesProviderProps) => {
  return <DependenciesContext.Provider value={dependencies}>{children}</DependenciesContext.Provider>;
};
