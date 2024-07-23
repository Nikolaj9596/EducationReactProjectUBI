import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared";
import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  className?: string;
}

export const ArticleDetails: FC<ArticleDetailsProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.ArticleDetails, {}, [props.className])}>
      Article Details
    </div>
  );
};
