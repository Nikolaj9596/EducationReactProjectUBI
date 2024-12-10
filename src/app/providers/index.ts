//router
export { AppRouter } from "./router";

// ui
export { ThemeProvider } from "./ThemeProvider";
export { ErrorBoundary } from "./ErrorBoundaries";
export { StoreProvider } from "./StoreProvider";
export type {
  StateSchemeKey,
  StateScheme,
  ReduxStoreWithManager,
  ThunkConfig,
} from "./StoreProvider";

export type { DeepPartial } from "./StoreProvider/ui/StoreProvider";
