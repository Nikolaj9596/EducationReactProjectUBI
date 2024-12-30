import { getUserAuthData } from "../../../../entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { Button, Card, classNames, HStack, Text } from "../../../../shared";

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> =
  memo((props) => {
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
      <Card padding="24" fullWidth border="partial">
        <HStack
          max
          justify="between"
          className={classNames("", {}, [props.className])}
        >
          <Text title={t("Профиль")} />
          {canEdit && (
            <div>
              {readonly ? (
                <Button onClick={onEdit}>{t("Редактировать")}</Button>
              ) : (
                <HStack gap="8">
                  <Button onClick={onCancelEdit} color="error">
                    {t("Отменить")}
                  </Button>
                  <Button onClick={onSave} color="success">
                    {t("Сохранить")}
                  </Button>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      </Card>
    );
  });
