import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Profile, ValidateProfileError } from "../../types/profile";
import { getFormProfileData } from "../../selectors/getProfileFormData/getProfileFormData";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',

  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getFormProfileData(getState())
    const errors = validateProfileData(formData)
    if (errors.length) {
      return rejectWithValue(errors)
    }
    try {
      const response: AxiosResponse = await extra.api.put<Profile>('/profile', formData)
      if (!response.data) {
        throw new Error();
      }
      return response.data
    } catch (e) {
      console.log(e)
      // return rejectWithValue([ValidateProfileError.SERVER_ERROR])
      // TODO: Delete when create server
      return formData
    }
  }
)
