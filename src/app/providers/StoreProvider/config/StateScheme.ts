import { UserSchema } from "../../../../entities/User";
import { CounterStateSchema } from "../../../../entities/Counter";
import { LoginSchema } from "../../../../features/AuthByUserName";
import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit";
import { ProfileScheme } from "../../../../entities/Profile";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "../../../../entities/Article";
import { ArticleDetailsCommentsSchema } from "../../../../pages/ArticleDetailsPage";
import { AddCommentFormSchema } from "../../../../features/AddCommentForm";
import { ArticlesPageSchema } from "../../../../pages/ArticlesPage";

export type CombinedState<T> = {
  [K in keyof T]: T[K];
};

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type MountedRecord = OptionalRecord<StateSchemeKey, boolean>;

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface StateScheme {
  counter: CounterStateSchema;
  user: UserSchema;
  // Async Reducers
  loginForm?: LoginSchema;
  profile?: ProfileScheme;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
}

export type StateSchemeKey = keyof StateScheme;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (
    state: StateScheme,
    action: UnknownAction,
  ) => CombinedState<StateScheme>;
  add: (key: StateSchemeKey, reducer: Reducer) => void;
  remove: (key: StateSchemeKey) => void;
  //true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedRecord;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
}
