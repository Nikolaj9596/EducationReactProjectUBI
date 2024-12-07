import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, classNames } from "../../../shared";
import cls from "./PageError.module.scss";

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PageErrorProps> = (props) => {
  const { t } = useTranslation();
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [props.className])}>
      <p>{t("Произошла непредвиденная ошибка")}</p>
      <Button variant="clear" onClick={reloadPage}>
        {t("Обновить страницу")}
      </Button>
    </div>
  );
};
