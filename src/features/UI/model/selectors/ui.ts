import { createSelector } from "@reduxjs/toolkit";
import { StateScheme } from "../../../../app/providers";

export const getUIScroll = (state: StateScheme) => state.ui.scroll;

export const getUIScrollByPath = createSelector(
  getUIScroll,
  (state: StateScheme, path: string) => path,
  (scroll, path) => scroll[path] || 0,
)
