import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  DynamicModuleLoader,
  ReducersList,
  Skeleton,
  Text,
  VStack,
  AppImage,
  useAppDispatch,
} from "../../../../shared";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";
import { useSelector } from "react-redux";
import {
  articleDetailsData,
  articleDetailsError,
  articleDetailsIsLoading,
} from "../../model/selectors/articleDetailsData";
import { renderArticleBlock } from "./renderBlock";
import { fetchArticleById } from "../../../../entities/Article/model/services/fetchArticleById/fetchArticleById";

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetailsSkeleton = () => {
  return (
    <VStack gap="16" max>
      <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
      <Skeleton className={cls.title} width={300} height={32} />
      <Skeleton className={cls.skeleton} width={600} height={24} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
    </VStack>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const isLoading = useSelector(articleDetailsIsLoading);
  const error = useSelector(articleDetailsError);
  const article = useSelector(articleDetailsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text
        align={"center"}
        title={t("Произошла ошибка при загрузке статьи.")}
      />
    );
  } else {
    content = (
      <>
        <Text title={article?.title} size="l" bold />
        <Text title={article?.subtitle} />
        <AppImage
          fallback={<Skeleton width="100%" height={420} border="16px" />}
          src={article?.img}
          className={cls.img}
        />
        {article?.blocks.map(renderArticleBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
