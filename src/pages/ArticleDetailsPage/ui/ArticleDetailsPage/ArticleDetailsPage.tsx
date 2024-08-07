import { ArticleDetails } from "../../../../entities/Article";
import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  DynamicModuleLoader,
  Text,
  ReducersList,
  Button,
  ThemeButton,
  Page,
} from "../../../../shared";
import cls from "./ArticleDetailsPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
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
import { RoutePath } from "../../../../shared/config";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

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
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t("Комментарии")} />
        <AddCommentForm onSentComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
