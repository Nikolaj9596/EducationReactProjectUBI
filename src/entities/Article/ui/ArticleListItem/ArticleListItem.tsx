import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { FC, HTMLAttributeAnchorTarget, memo} from "react";
import { useTranslation } from "react-i18next";
import {
  AppLink,
  Avatar,
  Button,
  Card,
  classNames,
  Icon,
  Text,
  ThemeButton,
} from "../../../../shared";
import cls from "./ArticleListItem.module.scss";
import { ReactComponent as EyeIcon } from "../../../../shared/assets/icons/eye-20-20.svg";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view, target = "_blank" } = props;
  const { t } = useTranslation("article");
  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST) {
    let textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar
              size={30}
              src={article.author.avatar}
              className={cls.avatar}
            />
            <Text text={article.author.userName} className={cls.userName} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink target={target}
              //TODO: Remove it
              // to={RoutePath.article_details + article.id}
              to={"/articles/" + article.id}
            >
              <Button theme={ThemeButton.OUTLINE}>
                {t("Читать далее...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink
      target={target}
      // to={RoutePath.article_details + article.id}
      to={"/articles/" + article.id}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img className={cls.img} src={article.img} alt={article.title} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
