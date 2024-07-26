import { FC, memo } from "react";
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
    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        {block?.code && <Code text={block?.code} />}
      </div>
    );
  });
