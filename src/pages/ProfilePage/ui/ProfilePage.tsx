import { FC, useCallback, useEffect } from "react";
import { classNames, DynamicModuleLoader, ReducersList } from "../../../shared";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getProfileIsLoading,
  getProfileError,
  getProfileReadOnly,
  fetchProfileData,
  getFormProfileData,
  profileActions,
  ProfileCard,
  profileReducer
} from "../../../entities/Profile"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

interface ProfilePageProps {
  className?: string;
}

export interface ProfileEditkCallbacks {
  firstName: (value: string) => void
  lastName: (value: string) => void
  middleName: (value: string) => void
  phone: (value: string) => void
  dateBirthday: (value: string) => void
  avatar: (value: string) => void
}

const redusers: ReducersList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const dispatch = useAppDispatch()
  const formData = useSelector(getFormProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const readonly = useSelector(getProfileReadOnly)

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch])

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstName: value || '' }))
  }, [dispatch])

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastName: value || '' }))
  }, [dispatch])

  const onChangeMiddleName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ middleName: value || '' }))
  }, [dispatch])

  const onChangePhone = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ phone: value || '' }))
  }, [dispatch])

  const onChangeDateBirthday = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ dateBirthday: value || '' }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <div className={classNames('', {}, [props.className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          callbacks={
            {
              firstName: onChangeFirstName,
              lastName: onChangeLastName,
              middleName: onChangeMiddleName,
              phone: onChangePhone,
              dateBirthday: onChangeDateBirthday,
              avatar: onChangeAvatar
            }
          }
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage
