import { memo } from "react";
import {
  AppLink,
  Avatar,
  Card,
  classNames,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "../../../../shared";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../module/types/comment";
import { getRouteProfile } from "../../../../shared/const/router";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.userName} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <Card padding="24" border="partial" fullWidth>
      <VStack
        gap="8"
        max
        className={classNames(cls.CommentCardRedesigned, {}, [className])}
      >
        <AppLink to={getRouteProfile(comment.user.id)}>
          <HStack gap="8">
            {comment.user.avatar ? (
              <Avatar size={30} src={comment.user.avatar} />
            ) : null}
            <Text text={comment.user.userName} bold />
          </HStack>
        </AppLink>
        <Text text={comment.text} />
      </VStack>
    </Card>
  );
});
