import { StateScheme } from "../../../../../app/providers";

export const getLoginUsername = (state: StateScheme) => state?.loginForm?.userName || '';
