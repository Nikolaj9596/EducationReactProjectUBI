import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager, StateSchemeKey } from "../../../../app/providers";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemeKey]?: Reducer;
}

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
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemeKey, reducer)
      dispatch({ type: `@INIT ${name} reducer` })
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemeKey)
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
