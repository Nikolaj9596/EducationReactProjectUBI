import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from "../../../../entities/Counter";
import { userReducer } from "../../../../entities/User";
import { createReducerManager } from './reducerManager';
import { CombinedState, StateScheme, ThunkExtraArg } from './StateScheme';
import { $api } from '../../../../shared/api/api';
import { NavigateFunction } from 'react-router-dom';

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
  navigator?: NavigateFunction,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigator,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
