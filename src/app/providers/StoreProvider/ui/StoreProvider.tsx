import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { StateScheme } from "../config/StateScheme";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateScheme
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { children, initialState } = props
  const store = createReduxStore(initialState)
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
