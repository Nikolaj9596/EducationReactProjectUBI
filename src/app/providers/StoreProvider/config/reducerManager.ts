import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { MountedRecord } from "../../../types/global";
import {
  ReducerManager,
  StateScheme,
  StateSchemeKey,
} from "./StateScheme";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateScheme>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemeKey> = [];
  const mountedReducers: MountedRecord = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: StateScheme, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }
      //@ts-ignore
      return combinedReducer(state, action);
    },

    add: (key: StateSchemeKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemeKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      mountedReducers[key] = false;
      combinedReducer = combineReducers(reducers);
    },
  };
}
