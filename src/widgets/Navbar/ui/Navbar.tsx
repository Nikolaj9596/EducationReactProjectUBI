import React, { FC, useCallback, useState } from "react";
import { Button, ThemeButton } from "../../../shared/ui";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { LoginModal } from "../../../features/AuthByUserName";
import { useSelector } from "react-redux";
import { getUserAuthData, userActions } from "../../../entities/User";
import { useDispatch } from "react-redux";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false)
  const dispatch = useDispatch()
  const authData = useSelector(getUserAuthData)
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])
  if (authData) {

    return (
      <div className={classNames(cls.navbar, {}, [className ? className : ''])}>
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
      </div>
    );
  }
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

