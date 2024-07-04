import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { USER_LOCLA_STORAGE_KEY } from "../../../../../shared/const/LocalStorage";
import { User, userActions } from "../../../../../entities/User";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";

interface LoginByUsernameProps {
  userName: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/liginByUsername',

  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await extra.api.post<User>('/login', authData)
      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(USER_LOCLA_STORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setAuthData(response.data))
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(i18n.t('Вы ввели неверный логин или пороль'))
    }
  }
)
