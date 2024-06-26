import { StateScheme } from "../../../../../app/providers";

export const getLoginIsLoading = (state: StateScheme) => state?.loginForm?.isLoading || false;
