import { ArticleDetails } from "../../../../entities/Article";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../../shared";
import cls from "./ArticleDetailsPage.module.scss";
import { useParams } from "react-router-dom";

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation("article")
  const { id } = useParams<{ id: string }>();
  if (!id){
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }
  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
