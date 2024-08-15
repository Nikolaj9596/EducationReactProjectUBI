import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "../../../../entities/Counter";
import { userReducer } from "../../../../entities/User";
import { createReducerManager } from "./reducerManager";
import { StateScheme, ThunkExtraArg } from "./StateScheme";
import { $api } from "../../../../shared/api/api";
import { uiReducer } from "../../../../features/UI";
import { CombinedState } from "../../../types/global";

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
