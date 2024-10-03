import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Profile } from "../../../../../entities/Profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<string>
>(
  "profile/fetchProfileData",

  async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    if (!profileId) {
      return rejectWithValue(i18n.t("Профиль не найден"));
    }
    try {
      const response: AxiosResponse = await extra.api.get<Profile>(
        `/profiles/${profileId}`,
      );
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      // return rejectWithValue(i18n.t('Профиль не найден'))
      // TODO: Delete when create server
      return {
        id: profileId,
        phone: "79999999999",
        firstName: `Иван ${profileId}`,
        lastName: "Иванов",
        middleName: "Иванович",
        dateBirthday: "10-03-1990",
        avatar:
          "https://i.pinimg.com/originals/88/9e/5d/889e5dd8334a7dfca281208cd74bd40e.png",
      };
    }
  },
);
