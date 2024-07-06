import { UserSchema } from "../../../../entities/User";
import { CounterStateSchema } from "../../../../entities/Counter";
import { LoginSchema } from "../../../../features/AuthByUserName";
import { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { ProfileScheme } from "../../../../entities/Profile";
import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

export type CombinedState<T> = {
  [K in keyof T]: T[K];
};

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface StateScheme {
  counter: CounterStateSchema
  user: UserSchema
  // Async Reducers
  loginForm?: LoginSchema
  profile?: ProfileScheme
}

export type StateSchemeKey = keyof StateScheme;


export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: UnknownAction) => CombinedState<StateScheme>;
  add: (key: StateSchemeKey, reducer: Reducer) => void;
  remove: (key: StateSchemeKey) => void;
}


export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigator?: NavigateFunction;
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg
}
