import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TextTheme, Text, classNames } from "../../../../shared";
import { getFormProfileData } from "../../model/selectors/getProfileFormData/getProfileFormData";
import { getProfileError } from "../..//model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { ValidateProfileError } from "../../model/types/editableProfileCardSchema";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { ProfileCard } from "../../../../entities/Profile";

interface EditableProfileCardProps {
  className?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className } = props;
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
    <div className={classNames("", {}, [className])}>
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
  );
});
