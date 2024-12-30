import { useTranslation } from "react-i18next";
import { Profile } from "../../model/types/profile";
import {
  ProfileCardError,
  ProfileCardRedesigned,
  ProfileCardSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeLastName?: (value?: string) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeMiddleName?: (value?: string) => void;
  onChangePhone?: (value?: string) => void;
  onChangeDateBirthday?: (value?: string) => void;
  onChangeCurrency?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { isLoading, error } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return <ProfileCardError />;
  }

  return <ProfileCardRedesigned {...props} />;
};
