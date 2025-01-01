import { Article, ArticleView } from "../../model/types/article";
import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { classNames, HStack, Text } from "../../../../shared";
import cls from "./ArticleList.module.scss";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { useTranslation } from "react-i18next";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.TABLE ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TABLE,
    target = "_blank",
  } = props;

  const { t } = useTranslation();
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={"l"} title={t("Статьи не найдены")} />
      </div>
    );
  }
  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.ArticleList, {}, [])}
    >
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={cls.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </HStack>
  );
});
