import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',

  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response: AxiosResponse = await extra.api.get<Profile>('/profile')
      if (!response.data) {
        throw new Error();
      }
      return response.data
    } catch (e) {
      console.log(e)
      // return rejectWithValue(i18n.t('Профиль не найден'))
      return {
        "phone": "79999999999",
        "firstName": "Иван",
        "lastName": "Иванов",
        "middleName": "Иванович",
        "dateBirthday": "10-03-1990",
        "avatar": "https://i.pinimg.com/originals/88/9e/5d/889e5dd8334a7dfca281208cd74bd40e.png"
      }
    }
  }
)
