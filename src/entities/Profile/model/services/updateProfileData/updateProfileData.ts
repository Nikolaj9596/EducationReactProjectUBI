import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Profile } from "../../types/profile";
import { getFormProfileData } from "../../selectors/getProfileFormData/getProfileFormData";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',

  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState} = thunkApi;
    const formData = getFormProfileData(getState())
    try {
      const response: AxiosResponse = await extra.api.put<Profile>('/profile', formData)
      if (!response.data) {
        throw new Error();
      }
      return response.data
    } catch (e) {
      console.log(e)
      // return rejectWithValue(i18n.t('Профиль не найден'))
      // TODO: Delete when create server
      return formData
    }
  }
)
