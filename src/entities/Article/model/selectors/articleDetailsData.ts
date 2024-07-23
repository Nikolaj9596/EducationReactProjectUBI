import { StateScheme } from "../../../../app/providers";

export const articleDetailsData = (state: StateScheme) => state.articleDetails?.data;
export const articleDetailsIsLoading = (state: StateScheme) => state.articleDetails?.isLoading;
export const articleDetailsError = (state: StateScheme) => state.articleDetails?.error;
