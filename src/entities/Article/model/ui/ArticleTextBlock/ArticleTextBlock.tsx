import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared";
import cls from "./ArticleTextBlock.module.scss";

interface ArticleTextBlockProps {
  className?: string;
}

export const ArticleTextBlock:FC<ArticleTextBlockProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.ArticleTextBlock, {}, [props.className])}>
    </div>
  );
};
