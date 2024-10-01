import { ArticleDetails } from "../../../../entities/Article";
import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  DynamicModuleLoader,
  Text,
  ReducersList,
  TextSize,
  VStack,
} from "../../../../shared";
import cls from "./ArticleDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import { CommentList } from "../../../../entities/Comment";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../../../pages/ArticleDetailsPage";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/commentSelectors";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { AddCommentForm } from "../../../../features/AddCommentForm";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Page } from "../../../../widgets";
import { articleDetailsPageRecommendationsReducer } from "../../model/slices/articleDetailsPageRecommendationsSlice";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleRecommendationsList } from "../../../../features/articleRecommendationsList";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
  articleDetailsPageRecommendations: articleDetailsPageRecommendationsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap={"16"} max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t("Комментарии")}
          />
          <AddCommentForm onSentComment={onSendComment} />
          <CommentList isLoading={isLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
