import { StateScheme } from "app/providers";

export const getProfileValidateErrors = (state: StateScheme) => state.profile?.validateErrors
