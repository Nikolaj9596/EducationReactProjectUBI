import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../shared/lib/hooks/useAppDispatch";
import { classNames, DynamicModuleLoader, ReducersList, Text, TextAlign, TextTheme} from "../../../../../shared";
import { fetchArticleById } from "../../services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../slice/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";
import { useSelector } from "react-redux";
import { articleDetailsData, articleDetailsError, articleDetailsIsLoading } from "../../selectors/articleDetailsData";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo((props) => {
  const { className, id } = props
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const article = useSelector(articleDetailsData);
  const error = useSelector(articleDetailsError);
  const isLoading = useSelector(articleDetailsIsLoading);

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content;

  if (isLoading) {
    content = (
      <div>.....Loadign</div>
    )
  } else if (error) {
    content = (
      <Text 
       title={t("Произашла ошибка при загрузки статьи!!!!")}
       align={TextAlign.CENTER}
       theme={TextTheme.ERROR}
      />
    )
  } else {
    content = (
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        Article Details
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {content}
    </DynamicModuleLoader>
  );
})
