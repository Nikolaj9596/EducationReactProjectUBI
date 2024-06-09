import { loginActions, getLoginState } from "../../../../features/AuthByUserName";
import React, { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, classNames, Input, ThemeButton } from "../../../../shared";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const {userName, password} = useSelector(getLoginState)
  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  return (
    <div
      className={classNames(cls.LoginForm, {}, [
        props.className ? props.className : "",
      ])}
    >
      <Input
        placeholder={t("Введите логин")}
        type="text"
        className={cls.input}
        autofocus
        onChange={onChangeUserName}
        value={userName}
      />
      <Input
        placeholder={t("Введите пароль")}
        type="password"
        className={cls.input}
        onChange={onChangePassword}
        value={password}
      />
      <Button theme={ThemeButton.OUTLINE} className={cls.loginBtn}>
        {t("Boйти")}
      </Button>
    </div>
  );
})
