import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '../../../../features/AuthByUserName/modal/slice/loginSlice';
import { counterReducer } from "../../../../entities/Counter";
import { userReducer } from "../../../../entities/User";
import { createReducerManager } from './reducerManager';
import { StateScheme } from './StateScheme';

export const createReduxStore = (initialState?: StateScheme) => {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer
  };
  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore<StateScheme>({
    // @ts-ignore
    reducer: reducerManager.reduce,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
};
