import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager, StateSchemeKey } from "../../../../app/providers";
import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemeKey]?: Reducer;
}
export type ReducersListEntry = [StateSchemeKey, Reducer]

interface DynamicModuleLoaderProps {
  children?: ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}


export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children,
    reducers,
    removeAfterUnmount = true
  } = props

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer)
      dispatch({ type: `@INIT ${name} reducer` })
    })

    return () => {
      if (removeAfterUnmount) {
        // @ts-ignore
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
          store.reducerManager.remove(name)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
  }, [])
  return (
    <>
      {children}
    </>
  );
};
