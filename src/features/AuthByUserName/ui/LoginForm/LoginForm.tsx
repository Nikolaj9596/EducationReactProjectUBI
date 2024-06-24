import React, { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useStore } from "react-redux";
import { Button, classNames, Input, ThemeButton, TextTheme, Text } from "../../../../shared";
import cls from "./LoginForm.module.scss";
import { loginByUsername } from "../../../../features/AuthByUserName";
import { useAppDispatch } from "../../../../app/providers";
import { ReduxStoreWithManager } from "../../../../app/providers/StoreProvider";
import { loginActions, loginReducer } from "../../modal/slice/loginSlice";
import { getLoginState } from "../../modal/selectors/getLoginState/getLoginState";

export interface LoginFormProps {
  className?: string;
}

const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithManager;
  const { userName, password, isLoading, error } = useSelector(getLoginState)
  useEffect(() => {
    store.reducerManager.add('loginForm', loginReducer)
    return () => {
      store.reducerManager.remove('loginForm')
    }
  }, [])
  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ userName, password }))
  }, [dispatch, userName, password])

  return (
    <div
      className={classNames(cls.LoginForm, {}, [
        props.className ? props.className : "",
      ])}
    >
      <Text title={t('Форма авторизации')} />
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

export default LoginForm;
