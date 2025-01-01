import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  AppImage,
  AppLink,
  Avatar,
  Button,
  Card,
  classNames,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack,
} from "../../../../shared";
import cls from "./ArticleListItem.module.scss";
import { ReactComponent as EyeIcon } from "../../../../shared/assets/icons/eye.svg";
import { getRouteArticleDetails } from "../../../../shared/const/router";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view, target = "_blank" } = props;
  const { t } = useTranslation("article");
  const userInfo = (
    <>
      <Avatar size={32} src={article.author.avatar} className={cls.avatar} />
      <Text bold text={article.author.userName} />
    </>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        max
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
            />
          )}
          <HStack max justify="between">
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant="outline">{t("Читать далее...")}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} border="partial" padding="0">
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
