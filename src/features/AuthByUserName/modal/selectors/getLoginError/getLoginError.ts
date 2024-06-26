import { StateScheme } from "../../../../../app/providers";

export const getLoginError = (state: StateScheme) => state?.loginForm?.error || '';
