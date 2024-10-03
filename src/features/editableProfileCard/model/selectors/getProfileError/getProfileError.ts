import { StateScheme } from "app/providers";

export const getProfileError = (state: StateScheme) => state.profile?.error || ''
