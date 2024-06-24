import { StateScheme } from "../../../../../app/providers";

export const getUserAuthData = (state: StateScheme) => state.user.authData;
