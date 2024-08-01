import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Text } from "../../../../shared";
import { ArticleTextBlock } from "../../model/types/article";
import cls from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> =
  memo((props) => {
    const { className, block } = props;
    const { t } = useTranslation();
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text className={cls.paragraphs} key={index} text={paragraph} />
        ))}
      </div>
    );
  });
