import { StateScheme } from "app/providers";

export const getAddCommentFormText = (state: StateScheme) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateScheme) => state.addCommentForm?.error;
