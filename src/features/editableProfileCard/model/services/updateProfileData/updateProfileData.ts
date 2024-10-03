import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { getFormProfileData } from "../../selectors/getProfileFormData/getProfileFormData";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { Profile } from "../../../../../entities/Profile";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

export const updateProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<ValidateProfileError[]>
>(
  "profile/updateProfileData",

  async (profileId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getFormProfileData(getState());
    const errors = validateProfileData(formData);
    if (!profileId) {
      throw new Error();
    }
    if (errors.length) {
      return rejectWithValue(errors);
    }
    try {
      const response: AxiosResponse = await extra.api.put<Profile>(
        `/profile/${profileId}`,
        formData,
      );
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      // return rejectWithValue([ValidateProfileError.SERVER_ERROR])
      // TODO: Delete when create server
      return formData;
    }
  },
);
