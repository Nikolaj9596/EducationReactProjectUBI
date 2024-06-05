import React, { FC, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Button, classNames, Input, ThemeButton } from "../../../../shared";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.LoginForm, {}, [
        props.className ? props.className : "",
      ])}
    >
      <Input placeholder="Введите логин" type="text" className={cls.input} />
      <Input
        placeholder="Введите пароль"
        type="password"
        className={cls.input}
      />
      <Button theme={ThemeButton.OUTLINE} className={cls.loginBtn}>
        {t("Boйти")}
      </Button>
    </div>
  );
};
