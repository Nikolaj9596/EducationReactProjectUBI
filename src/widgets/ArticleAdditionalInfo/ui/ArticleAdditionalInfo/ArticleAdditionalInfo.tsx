import { User } from "../../../../entities/User";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleAdditionalInfo.module.scss";
import {
  Text,
  Avatar,
  Button,
  classNames,
  HStack,
  VStack,
} from "../../../../shared";

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
      <VStack
        gap="32"
        className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
      >
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.userName} bold />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t("Редактировать")}</Button>
        <Text text={t("{{count}} просмотров", { count: views })} />
      </VStack>
    );
  },
);
