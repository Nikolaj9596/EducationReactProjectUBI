import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared";
import cls from "./ArticleCodeBlock.module.scss";

interface ArticleCodeBlockProps {
  className?: string;
}

export const ArticleCodeBlock: FC<ArticleCodeBlockProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.ArticleCodeBlock, {}, [props.className])}>
      Article Code Block
    </div>
  );
};
