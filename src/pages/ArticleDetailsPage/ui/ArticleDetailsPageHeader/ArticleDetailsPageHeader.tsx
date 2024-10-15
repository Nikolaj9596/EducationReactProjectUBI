import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, classNames, HStack, ThemeButton } from "../../../../shared";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { useSelector } from "react-redux";
import { articleDetailsData } from "../../../../entities/Article";
import { getCanEditArticle } from "../../model/selectors/article";
import { RoutePath } from "../../../../shared/const/router";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
  (props) => {
    const { t } = useTranslation("article");
    const navigate = useNavigate();
    const article = useSelector(articleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(RoutePath.article_details + `${article?.id}/edit`);
    }, [navigate, article]);

    return (
      <HStack
        max
        justify={"between"}
        className={classNames(cls.ArticleDetailsPageHeader, {}, [
          props.className,
        ])}
      >
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEditArticle}
          >
            {t("Редактировать")}
          </Button>
        )}
      </HStack>
    );
  },
);
