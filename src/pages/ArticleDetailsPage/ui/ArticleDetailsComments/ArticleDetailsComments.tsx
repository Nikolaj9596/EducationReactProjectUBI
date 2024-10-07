import { getArticleCommentsIsLoading } from "../../model/selectors/commentSelectors";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { FC, memo, Suspense, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames, Text, TextSize, VStack } from "../../../../shared";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { AddCommentForm } from "../../../../features/AddCommentForm";
import { CommentList } from "../../../../entities/Comment";
import { PageLoader } from "../../../../widgets";

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
  (props) => {
    const { t } = useTranslation();
    const { className, id } = props;

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

    return (
      <VStack gap={"16"} max className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Комментарии")} />
        <Suspense fallback={<PageLoader />}>
          <AddCommentForm onSentComment={onSendComment} />
        </Suspense>
        <CommentList isLoading={isLoading} comments={comments} />
      </VStack>
    );
  },
);
