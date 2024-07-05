import { fetchProfileData, ProfileCard, profileReducer } from "../../../entities/Profile";
import { FC, useEffect } from "react";
import { classNames, DynamicModuleLoader, ReducersList } from "../../../shared";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";

interface ProfilePageProps {
  className?: string;
}

const redusers: ReducersList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProfileData());
  }, [dispatch])
  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <div className={classNames('', {}, [props.className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage
