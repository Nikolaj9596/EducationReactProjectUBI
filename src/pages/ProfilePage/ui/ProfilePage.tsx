import { profileReducer } from "../../../entities/Profile";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames, DynamicModuleLoader, ReducersList } from "../../../shared";

interface ProfilePageProps {
  className?: string;
}

const redusers: ReducersList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <div className={classNames('', {}, [props.className ? props.className : ''])}>
        {t("Страница Профиля")}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage
