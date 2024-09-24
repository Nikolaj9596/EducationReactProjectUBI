import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import {
  Avatar,
  classNames,
  DynamicModuleLoader,
  ReducersList,
  Skeleton,
  Text,
  TextAlign,
  TextSize,
  TextTheme,
  Icon,
  HStack,
  VStack,
} from "../../../../shared";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";
import { useSelector } from "react-redux";
import {
  articleDetailsData,
  articleDetailsError,
  articleDetailsIsLoading,
} from "../../model/selectors/articleDetailsData";
import { ReactComponent as CalendarIcon } from "../../../../shared/assets/icons/calendar-20-20.svg";
import { ReactComponent as EyeIcon } from "../../../../shared/assets/icons/eye-20-20.svg";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo((props) => {
  const { className, id } = props;
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const article = useSelector(articleDetailsData);
  const error = useSelector(articleDetailsError);
  const isLoading = useSelector(articleDetailsIsLoading);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent block={block} className={cls.block} />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent block={block} className={cls.block} />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent block={block} className={cls.block} />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        title={t("Произашла ошибка при загрузки статьи!!!!")}
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
    );
  } else {
    content = (
      <>
        <HStack justify={"center"} max className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>
        <VStack gap={"4"} max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap={"8"} className={cls.articleInfo}>
            <Icon Svg={EyeIcon} className={cls.icon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap={"8"} className={cls.articleInfo}>
            <Icon Svg={CalendarIcon} className={cls.icon} />
            <Text text={String(article?.createdAt)} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap={"16"}
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
