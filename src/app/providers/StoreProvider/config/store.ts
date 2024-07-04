import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../../../../features/AuthByUserName/modal/slice/loginSlice';
import { counterReducer } from "../../../../entities/Counter";
import { userReducer } from "../../../../entities/User";
import { createReducerManager } from './reducerManager';
import { StateScheme } from './StateScheme';
import { profileReducer } from '../../../../entities/Profile';
import { $api } from '../../../../shared/api/api';
import { NavigateFunction } from 'react-router-dom';

export const createReduxStore = (
  navigator: NavigateFunction,
  initialState?: StateScheme
) => {
  const rootReducers = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
    profile: profileReducer
  };
  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore<StateScheme>({
    // @ts-ignore
    reducer: reducerManager.reduce,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigator: navigator
        }
      }
    })
  });
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
