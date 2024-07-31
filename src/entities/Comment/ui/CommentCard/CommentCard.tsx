import { memo } from "react";
import {
  AppLink,
  Avatar,
  classNames,
  Skeleton,
  Text,
} from "../../../../shared";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../module/types/comment";
import { RoutePath } from "../../../../shared/config";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  console.log(comment);
  if (isLoading) {
    return (
      <div
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border={"50%"} />
          <Skeleton width={100} height={16} className={cls.userName} />
        </div>
        <Skeleton width={"100%"} height={50} className={cls.text} />
      </div>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink
        to={`${RoutePath.profile}${comment.user.id}`}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : (
          <Avatar size={30} />
        )}
        <Text className={cls.userName} title={comment.user.userName} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  );
});
