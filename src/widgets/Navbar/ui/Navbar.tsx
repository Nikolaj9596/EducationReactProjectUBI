import React, { FC, useCallback, useState } from "react";
import { Button, Modal, ThemeButton } from "../../../shared/ui";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({className}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false)
  const onToggleModal = useCallback(() => {
     setIsAuthModal((prev) => !prev) 
  }, [])
  return (
    <div className={classNames(cls.navbar, {}, [className? className : ''])}>
      <Button 
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t("Войти")}
      </Button>
        <Modal isOpen={isAuthModal} onClose={onToggleModal}>
          The pattern A[w-]+z is a regular expression that defines a rule for what characters can be included in a string and how it should be formatted. Let's break down what this pattern specifies:
          Given your input of sale__house__697212864, it appears that your string should match the pattern because:
        </Modal>
    </div>
  );
};

