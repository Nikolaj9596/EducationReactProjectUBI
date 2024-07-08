import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Button,
  DynamicModuleLoader,
  classNames,
  Input,
  ThemeButton,
  TextTheme,
  Text
} from "../../../../shared";
import cls from "./LoginForm.module.scss";
import { loginByUsername } from "../../../../features/AuthByUserName";
import { loginActions, loginReducer } from "../../modal/slice/loginSlice";
import { getLoginUsername } from "../../modal/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../modal/selectors/getLoginPassword/getLoginPassword";
import { getLoginError } from "../../modal/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../modal/selectors/getLoginIsLoading/getLoginIsLoading";
import type { ReducersList } from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const intialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const userName = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const error = useSelector(getLoginError)
  const isLoading = useSelector(getLoginIsLoading)

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ userName, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      props.onSuccess()
    }

  }, [props.onSuccess, dispatch, userName, password])

  return (
    <DynamicModuleLoader reducers={intialReducers}>
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
    </DynamicModuleLoader>
  );
})

export default LoginForm;
