import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { User } from "../../../../../entities/User";
import i18n from "../../../../../shared/config/i18n/i18n";

interface LoginByUsernameProps {
  userName: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/liginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response: AxiosResponse = await axios.post<User>('http://localhost:8000/login', authData)
      if (!response.data) {
        throw new Error();
      }
      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пороль'))
    }
  }
)
