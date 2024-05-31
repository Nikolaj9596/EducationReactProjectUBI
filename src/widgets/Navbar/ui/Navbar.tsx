import React, { FC, useCallback, useState } from "react";
import { Button, ThemeButton } from "../../../shared/ui";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { LoginModal } from "../../../features/AuthByUserName";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false)
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])
  return (
    <div className={classNames(cls.navbar, {}, [className ? className : ''])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
};

