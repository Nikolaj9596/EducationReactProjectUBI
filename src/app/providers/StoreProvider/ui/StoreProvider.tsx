import { ReducersMapObject } from "@reduxjs/toolkit";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateScheme } from "../config/StateScheme";
import { createReduxStore } from "../config/store";

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers,
  } = props;

  const navigator = useNavigate();

  const store = createReduxStore(
    initialState as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
    navigator,
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
