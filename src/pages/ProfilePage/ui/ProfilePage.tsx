import { FC } from "react";
import {
  classNames,
  DynamicModuleLoader,
  ReducersList,
  VStack,
} from "../../../shared";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { Page } from "../../../widgets";
import {
  EditableProfileCard,
  profileReducer,
} from "../../../features/editableProfileCard";

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
  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <Page className={classNames("", {}, [props.className])}>
        <VStack gap={"16"} max>
          <ProfilePageHeader />
          <EditableProfileCard />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
