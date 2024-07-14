export { ValidateProfileError } from "../Profile/model/types/profile";

// selectors
export { getProfileData } from "./model/selectors/getProfileData/getProfileData";
export { getProfileError } from "./model/selectors/getProfileError/getProfileError";
export { getProfileIsLoading } from "./model/selectors/getProfileIsLoading/getProfileIsLoading";
export { getProfileReadOnly } from "./model/selectors/getProfileReadOnly/getProfileReadOnly";
export { getFormProfileData } from "./model/selectors/getProfileFormData/getProfileFormData";
export { getProfileValidateErrors } from "./model/selectors/getProfileValidateErrors/getProfileValidateErrors";
//thunks
export { fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData";
export { updateProfileData } from "./model/services/updateProfileData/updateProfileData";
// types
export type { Profile, ProfileScheme } from "../Profile/model/types/profile";
//ui
export { ProfileCard } from "./ui/ProfileCard/ProfileCard";
//slices
export { profileActions, profileReducer } from "./model/slice/profileSlice";
