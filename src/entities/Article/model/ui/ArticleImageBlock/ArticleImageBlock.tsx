import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared";
import cls from "./ArticleImageBlock.module.scss";

interface ArticleImageBlockProps {
  className?: string;
}

export const ArticleImageBlock: FC<ArticleImageBlockProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [props.className])}>
      ArticleImageBlock
    </div>
  );
};
