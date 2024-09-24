import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  classNames,
  ThemeButton,
  Text,
  HStack,
} from "../../../../shared";
import { getProfileReadOnly } from "../../../../entities/Profile/model/selectors/getProfileReadOnly/getProfileReadOnly";
import { useSelector } from "react-redux";
import {
  getProfileData,
  profileActions,
  updateProfileData,
} from "../../../../entities/Profile";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { getUserAuthData } from "../../../../entities/User";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
  const { t } = useTranslation("profile");
  const readonly = useSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEditProfile());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack
      max
      justify="between"
      className={classNames("", {}, [props.className])}
    >
      <Text title={t("Профиль")} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
              {t("Редактировать")}
            </Button>
          ) : (
            <HStack gap="8">
              <Button theme={ThemeButton.OUTLINE_RED} onClick={onCancelEdit}>
                {t("Отменить")}
              </Button>

              <Button theme={ThemeButton.OUTLINE} onClick={onSave}>
                {t("Сохранить")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};
