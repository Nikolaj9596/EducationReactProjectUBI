import { ArticleView } from "../../../../entities/Article";
import { getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slice/articlePageSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { classNames, Select } from "../../../../shared";
import { ArticleViewSelector } from "../ArticleViewSelector/ArticleViewSelector";
import cls from "./AriclesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
  (props) => {
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
    );
    return (
      <div
        className={classNames(cls.ArticlesPageFilters, {}, [props.className])}
      >
        <Select label={t("Сортировать по")}/>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
    );
  },
);
