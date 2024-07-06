import { StateScheme } from "app/providers";

export const getProfileIsLoading = (state: StateScheme) => state.profile?.isLoading || false
