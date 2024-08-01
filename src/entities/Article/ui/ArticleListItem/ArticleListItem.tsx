import { Article, ArticleView } from "../../model/types/article";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Icon, Text } from "../../../../shared";
import cls from "./ArticleListItem.module.scss";
import { ReactComponent as EyeIcon } from "../../../../shared/assets/icons/eye-20-20.svg";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  if (view === ArticleView.LIST) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        {article.title}
      </div>
    );
  }
  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <div className={cls.card}>
        <div className={cls.imageWrapper}>
          <img className={cls.img} src={article.img} alt={article.title} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(", ")} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={EyeIcon} />
        </div>
        <Text text={article.title} className={cls.title} />
      </div>
    </div>
  );
});
