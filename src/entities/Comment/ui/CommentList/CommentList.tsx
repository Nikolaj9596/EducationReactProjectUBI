import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Text, VStack } from "../../../../shared";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../module/types/comment";
import cls from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();
  return (
    <VStack
      gap={"16"}
      max
      className={classNames(cls.CommentList, {}, [className])}
    >
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            className={cls.comment}
            comment={comment}
            isLoading={isLoading}
            key={comment.id}
          />
        ))
      ) : (
        <Text text={t("Коментарии отсутствуют")} />
      )}
    </VStack>
  );
});
