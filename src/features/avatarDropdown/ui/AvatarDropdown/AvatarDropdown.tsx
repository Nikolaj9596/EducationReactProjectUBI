import { useTranslation } from "react-i18next";
import cls from "./AvatarDropdown.module.scss";
import { memo, useCallback } from "react";
import { Dropdown, classNames, Avatar } from "../../../../shared";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "../../../../entities/User";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  const isAdminPanelAvailable = isAdmin || isManager;
  return (
    <Dropdown
      className={classNames(cls.AvatarDropdown, {}, [className])}
      direction={"bottom left"}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t("Админка"),
                href: "/admin",
              },
            ]
          : []),
        {
          content: t("Профиль"),
          href: "/profile/" + authData?.id,
        },
        {
          content: t("Выйти"),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData?.avatar} />}
    />
  );
});
