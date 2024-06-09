import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "../../../../entities/User";
import { counterReducer } from "../../../../entities/Counter";
import { StateScheme } from "./StateScheme";
import { loginReducer } from "../../../../features/AuthByUserName";

export const createReduxStore = (initialState?: StateScheme) => {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer

  }
  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState

  })
}
