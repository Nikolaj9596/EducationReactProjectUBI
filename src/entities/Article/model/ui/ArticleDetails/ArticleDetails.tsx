import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../shared/lib/hooks/useAppDispatch";
import { Avatar, classNames, DynamicModuleLoader, ReducersList, Skeleton, Text, TextAlign, TextSize, TextTheme } from "../../../../../shared";
import { fetchArticleById } from "../../services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../slice/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";
import { useSelector } from "react-redux";
import { articleDetailsData, articleDetailsError, articleDetailsIsLoading } from "../../selectors/articleDetailsData";
import { ReactComponent as CalendarIcon } from "../../../../../shared/assets/icons/calendar-20-20.svg"
import { ReactComponent as EyeIcon } from "../../../../../shared/assets/icons/eye-20-20.svg"

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
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
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
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleInfo}>
          <EyeIcon className={cls.icon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <CalendarIcon className={cls.icon} />
          <Text text={String(article?.createdAt)} />
        </div>
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
})
