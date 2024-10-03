import { ArticleDetails } from "../../../../entities/Article";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  DynamicModuleLoader,
  ReducersList,
  VStack,
} from "../../../../shared";
import cls from "./ArticleDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import { articleDetailsCommentsReducer } from "../../../../pages/ArticleDetailsPage";
import { Page } from "../../../../widgets";
import { articleDetailsPageRecommendationsReducer } from "../../model/slices/articleDetailsPageRecommendationsSlice";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleRecommendationsList } from "../../../../features/articleRecommendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

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
          <ArticleDetailsComments id={id}/>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
