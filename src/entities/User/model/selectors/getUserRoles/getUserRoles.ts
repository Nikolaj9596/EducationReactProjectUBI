import { createSelector } from "@reduxjs/toolkit";
import { StateScheme } from "../../../../../app/providers";
import { UserRole } from "../../types/user";

export const getUserRoles = (state: StateScheme) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.ADMIN)),
);

export const isUser = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.USER)),
);

export const isUserManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER)),
);
