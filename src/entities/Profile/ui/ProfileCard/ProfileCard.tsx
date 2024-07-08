import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  Text,
  Input,
  Loader,
  TextTheme,
  TextAlign
} from "../../../../shared";
import cls from "./ProfileCard.module.scss";
import { Profile } from "../../model/types/profile";
import { ProfileEditkCallbacks } from "../../../../pages/ProfilePage/ui/ProfilePage";

interface ProfileCardProps {
  className?: string;
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  callbacks: ProfileEditkCallbacks
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { className, data, isLoading, error, callbacks, readonly } = props
  const { t } = useTranslation("profile")

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    console.log(error)
    return (
      <div
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузки профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    )

  }
  return (
    <div
      className={classNames(cls.ProfileCard, {}, [className])}
    >
      <div className={cls.data}>

        <Input
          value={data?.lastName}
          placeholder={t("Фамилия")}
          className={cls.input}
          onChange={callbacks.lastName}
          readonly={readonly}
        />
        <Input
          value={data?.firstName}
          placeholder={t("Имя")}
          className={cls.input}
          onChange={callbacks.firstName}
          readonly={readonly}
        />
        <Input
          value={data?.middleName}
          placeholder={t("Отчество")}
          className={cls.input}
          onChange={callbacks.middleName}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
