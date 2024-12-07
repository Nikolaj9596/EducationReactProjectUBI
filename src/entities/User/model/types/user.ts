import { JsonSettings } from "./jsonSettings";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
}

export interface User {
  id: string;
  userName: string;
  password?: string;
  avatar?: string;
  roles?: UserRole[];
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
