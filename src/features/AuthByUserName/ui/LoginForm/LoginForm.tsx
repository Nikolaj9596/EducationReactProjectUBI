import { loginActions, getLoginState } from "../../../../features/AuthByUserName";
import React, { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, classNames, Input, ThemeButton, TextTheme, Text } from "../../../../shared";
import cls from "./LoginForm.module.scss";
import { loginByUsername } from "../../../../features/AuthByUserName";
import { useAppDispatch } from "../../../../app/providers";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { userName, password, isLoading, error} = useSelector(getLoginState)
  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ userName, password}))
  }, [dispatch, userName, password])

  return (
    <div
      className={classNames(cls.LoginForm, {}, [
        props.className ? props.className : "",
      ])}
    >
      <Text title={t('Форма авторизации')}/>
      {error && <Text text={error} theme={TextTheme.ERROR} />}

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
      <Button
        theme={ThemeButton.OUTLINE}
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t("Boйти")}
      </Button>
    </div>
  );
})
