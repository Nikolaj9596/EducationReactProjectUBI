import { memo } from "react";
import { classNames } from "../../../../shared";
import cls from "./CommentCard.module.scss";
import {Comment } from "../../module/types/comment"

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean; 
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading} = props;
  return <div className={classNames(cls.CommentCard, {}, [className])}>
    {comment.text}
  </div>;
});
