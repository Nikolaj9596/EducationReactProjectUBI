export { getProfileReadOnly } from "./model/selectors/getProfileReadOnly/getProfileReadOnly";
export { getProfileData } from "./model/selectors/getProfileData/getProfileData";
export { updateProfileData } from "./model/services/updateProfileData/updateProfileData";
export { profileActions, profileReducer } from "./model/slice/profileSlice";

export { EditableProfileCard } from "./ui/EditableProfileCard/EditableProfileCard";
export type { ProfileScheme } from "./model/types/editableProfileCardSchema";
