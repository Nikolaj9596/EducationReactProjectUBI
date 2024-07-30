import { FC, useCallback, useEffect } from "react";
import {
  classNames,
  DynamicModuleLoader,
  ReducersList,
  TextTheme,
  Text,
} from "../../../shared";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getProfileIsLoading,
  getProfileError,
  getProfileReadOnly,
  getProfileValidateErrors,
  fetchProfileData,
  getFormProfileData,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidateProfileError,
} from "../../../entities/Profile";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface ProfilePageProps {
  className?: string;
}

export interface ProfileEditkCallbacks {
  firstName: (value: string) => void;
  lastName: (value: string) => void;
  middleName: (value: string) => void;
  phone: (value: string) => void;
  dateBirthday: (value: string) => void;
  avatar: (value: string) => void;
}

const redusers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const dispatch = useAppDispatch();
  const formData = useSelector(getFormProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const { t } = useTranslation("profile");
  const { id } = useParams<{ id: string }>();
  const validateErrorTranslates = {
    [ValidateProfileError.NO_DATA]: t("Нет данных для обработки"),
    [ValidateProfileError.SERVER_ERROR]: t("Неизвестная ошибка на сервере"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t(
      "Некорректные данные пользователя",
    ),
    [ValidateProfileError.INCORRECT_DATE_BIRTHDAY]: t(
      "Некорректные дата рождения",
    ),
  };

  useEffect(() => {
    dispatch(fetchProfileData(id));
  }, [dispatch, id]);

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ firstName: value || "" }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastName: value || "" }));
    },
    [dispatch],
  );

  const onChangeMiddleName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ middleName: value || "" }));
    },
    [dispatch],
  );

  const onChangePhone = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ phone: value || "" }));
    },
    [dispatch],
  );

  const onChangeDateBirthday = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ dateBirthday: value || "" }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <div className={classNames("", {}, [props.className])}>
        <ProfilePageHeader />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          callbacks={{
            firstName: onChangeFirstName,
            lastName: onChangeLastName,
            middleName: onChangeMiddleName,
            phone: onChangePhone,
            dateBirthday: onChangeDateBirthday,
            avatar: onChangeAvatar,
          }}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
