import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '../../../../features/AuthByUserName/modal/slice/loginSlice';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { counterReducer } from "../../../../entities/Counter";
import { userReducer } from "../../../../entities/User";
import { createReducerManager } from './reducerManager';
import { StateScheme } from './StateScheme';

const createReduxStore = (initialState?: StateScheme) => {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer
  };
  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
};

export const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
