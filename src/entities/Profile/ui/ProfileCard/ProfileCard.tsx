import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  Text,
  Input,
  Loader,
  TextTheme,
  TextAlign,
  Avatar,
  Mods,
} from "../../../../shared";
import cls from "./ProfileCard.module.scss";
import { Profile } from "../../model/types/profile";
import { ProfileEditkCallbacks } from "../../../../pages/ProfilePage/ui/ProfilePage";
import { CurrencySelect } from "../../../Currency";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  callbacks: ProfileEditkCallbacks;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { className, data, isLoading, error, callbacks, readonly } = props;
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузки профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar size={150} src={data?.avatar} />
          </div>
        )}
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
        <Input
          value={data?.phone}
          placeholder={t("Номер телофона")}
          className={cls.input}
          onChange={callbacks.phone}
          readonly={readonly}
        />
        <Input
          value={data?.dateBirthday}
          placeholder={t("Дата рождения")}
          className={cls.input}
          onChange={callbacks.dateBirthday}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t("Аватарка")}
          className={cls.input}
          onChange={callbacks.avatar}
          readonly={readonly}
        />
        <CurrencySelect readonly={readonly} className={cls.input} />
      </div>
    </div>
  );
};
