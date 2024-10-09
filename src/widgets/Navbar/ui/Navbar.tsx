import React, { FC, memo, useCallback, useState } from "react";
import {
  Button,
  ThemeButton,
  Text,
  AppLink,
  AppLinkTheme,
  TextTheme,
  HStack,
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
import { NotificationButton } from "../../../features/notificationButton";
import { AvatarDropdown } from "../../../features/avatarDropdown";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

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
        <HStack gap={"16"} className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
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
