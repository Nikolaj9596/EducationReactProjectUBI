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
import {
  ArticleDetailsCommentsSchema,
  ArticleDetailsPageRecommendationsSchema,
} from "../../../../pages/ArticleDetailsPage";
import { AddCommentFormSchema } from "../../../../features/AddCommentForm";
import { ArticlesPageSchema } from "../../../../pages/ArticlesPage";
import { UISchema } from "../../../../features/UI";
import { CombinedState, MountedRecord } from "../../../../app/types/global";
export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface StateScheme {
  counter: CounterStateSchema;
  user: UserSchema;
  ui: UISchema;
  // Async Reducers
  loginForm?: LoginSchema;
  profile?: ProfileScheme;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPageRecommendations?: ArticleDetailsPageRecommendationsSchema;
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
