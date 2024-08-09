import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../shared";
import cls from "./NotFoundPage.module.scss";
import { Page } from "../../../widgets";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Page className={classNames(cls.NotFoundPage, {}, [props.className])}>
      {t("Страница не найдена")}
    </Page>
  );
};
