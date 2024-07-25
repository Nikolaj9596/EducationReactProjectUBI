import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Code } from "../../../../../shared";
import { ArticleCodeBlock } from "../../types/article";
import cls from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block?: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
  memo((props) => {
    const { className, block } = props;
    const { t } = useTranslation();
    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code>{block?.code}</Code>
      </div>
    );
  });
