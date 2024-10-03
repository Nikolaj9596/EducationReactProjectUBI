import { StateScheme } from "app/providers";

export const getProfileReadOnly = (state: StateScheme) => state.profile?.readonly || false
