import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../../../../entities/Counter";
import { StateScheme } from "./StateScheme";

export const createReduxStore = (initialState?: StateScheme) => {
  return configureStore<StateScheme>({
    reducer: {
      counter: counterReducer
    },
    devTools: true,
    preloadedState: initialState

  })
}
