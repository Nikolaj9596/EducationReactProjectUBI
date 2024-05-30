import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "../../../../entities/User";
import { counterReducer } from "../../../../entities/Counter";
import { StateScheme } from "./StateScheme";

export const createReduxStore = (initialState?: StateScheme) => {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer
    
  }
  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState

  })
}
