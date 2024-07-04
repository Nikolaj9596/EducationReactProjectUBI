import { fetchProfileData, profileReducer } from "../../../entities/Profile";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames, DynamicModuleLoader, ReducersList } from "../../../shared";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";

interface ProfilePageProps {
  className?: string;
}

const redusers: ReducersList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProfileData());
  }, [dispatch])
  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <div className={classNames('', {}, [props.className ? props.className : ''])}>
        {t("Страница Профиля")}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage
