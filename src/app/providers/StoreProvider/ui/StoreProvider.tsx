import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateScheme } from "../config/StateScheme";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateScheme
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { children, initialState } = props
  const navigator = useNavigate()
  const store = createReduxStore(
    navigator,
    initialState,
  )
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
