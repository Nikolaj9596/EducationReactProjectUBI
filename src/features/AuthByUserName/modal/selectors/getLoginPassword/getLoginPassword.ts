import { StateScheme } from "../../../../../app/providers";

export const getLoginPassword = (state: StateScheme) => state?.loginForm?.password || '';
