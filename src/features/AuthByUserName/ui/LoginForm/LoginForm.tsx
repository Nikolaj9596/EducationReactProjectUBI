import React, { FC, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Button, classNames, Input } from "../../../../shared";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm:FC<LoginFormProps> = (props) => {
  const {t} = useTranslation()
  return (
    <div className={classNames(cls.LoginForm, {}, [props.className ? props.className : ''])}>
      <Input type="text" className={cls.input}/>
      <Input type="text" className={cls.input}/>
      <Button className={cls.loginBtn}>
        {t("Boйти")}
      </Button>
    </div>
  );
};
