import { FC } from "react";
import { classNames, VStack } from "../../../shared";
import { Page } from "../../../widgets";
import { EditableProfileCard } from "../../../features/editableProfileCard";
import { useParams } from "react-router-dom";

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

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <Page className={classNames("", {}, [props.className])}>
      <VStack gap={"16"} max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
