import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../shared";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classNames('', {}, [props.className ? props.className : ''])}>
      {t("Страница Профиля")}
    </div>
  );
};

export default ProfilePage
