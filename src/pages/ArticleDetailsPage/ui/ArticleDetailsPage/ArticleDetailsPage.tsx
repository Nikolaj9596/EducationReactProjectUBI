import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, VStack } from "../../../../shared";
import cls from "./ArticleDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "../../../../widgets";
import { ArticleRecommendationsList } from "../../../../features/articleRecommendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "../../../../features/articleRating";
import { StickyContentLayout } from "../../../../shared/layouts";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <StickyContentLayout
      content={
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
          <VStack gap="16" max>
            <DetailsContainer />
            <ArticleRating articleId={id} />
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id} />
          </VStack>
        </Page>
      }
      right={<AdditionalInfoContainer />}
    />
  );
};

export default memo(ArticleDetailsPage);
