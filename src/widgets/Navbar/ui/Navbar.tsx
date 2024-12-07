import { FC, memo, useCallback, useState } from "react";
import {
  Button,
  Text,
  AppLink,
  AppLinkVariant,
  TextTheme,
  HStack,
  classNames,
} from "../../../shared";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { LoginModal } from "../../../features/AuthByUserName";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../entities/User";
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
        variant={"clear"}
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
