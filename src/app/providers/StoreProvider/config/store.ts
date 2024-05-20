import { configureStore } from "@reduxjs/toolkit";
import { StateScheme } from "./StateScheme";

export const createReduxStore = (initialState?: StateScheme) => {
  return configureStore<StateScheme>({
    reducer: {},
    devTools: true,
    preloadedState: initialState

  })
}
