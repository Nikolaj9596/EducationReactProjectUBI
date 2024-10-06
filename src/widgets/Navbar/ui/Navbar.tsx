import React, { FC, memo, useCallback, useState } from "react";
import {
  Button,
  ThemeButton,
  Text,
  AppLink,
  AppLinkTheme,
  TextTheme,
  Dropdown,
  Avatar,
} from "../../../shared/ui";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { LoginModal } from "../../../features/AuthByUserName";
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "../../../entities/User";
import { useDispatch } from "react-redux";
import { RoutePath } from "../../../shared/config";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  const isAdminPanelAvailable = isAdmin || isManager;
  if (authData) {
    return (
      <header
        className={classNames(cls.navbar, {}, [className ? className : ""])}
      >
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t("Blog App")}
        />
        {/*TODO: Delete this code*/}
        {/* <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.article_create}> */}
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.SECONDARY}
          to={"/articles/new"}
        >
          {t("Создать статью")}
        </AppLink>
        <Dropdown
          direction={"bottom left"}
          className={cls.dropdown}
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
              href: "/profile/" + authData.id,
            },
            {
              content: t("Выйти"),
              onClick: onLogout,
            },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    );
  }
  return (
    <header
      className={classNames(cls.navbar, {}, [className ? className : ""])}
    >
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
