import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames, Text, Button, ThemeButton, Input } from "../../../../shared";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { t } = useTranslation("profile")
  const data = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  return (
    <div
      className={classNames(cls.ProfileCard, {}, [props.className])}
    >
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button
          theme={ThemeButton.OUTLINE}
          className={cls.editBtn}
        >
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>

        <Input
          value={data?.lastName}
          placeholder={t("Фамилия")}
          className={cls.input}
        />
        <Input
          value={data?.firstName}
          placeholder={t("Имя")}
          className={cls.input}
        />
        <Input
          value={data?.middleName}
          placeholder={t("Отчество")}
          className={cls.input}
        />
      </div>
    </div>
  );
};
