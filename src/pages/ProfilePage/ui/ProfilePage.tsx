import { FC } from "react";
import { classNames, VStack } from "../../../shared";
import { Page } from "../../../widgets";
import { EditableProfileCard } from "../../../features/editableProfileCard";
import { useParams } from "react-router-dom";

interface ProfilePageProps {
  className?: string;
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
