import { EntityState } from "@reduxjs/toolkit";
import { ArticleSortField } from "../../../../entities/Article/model/types/article";
import { Article, ArticleView } from "../../../../entities/Article";

export type SortOrder = "asc" | "desc";

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
  //pagination
  limit: number;
  page: number;
  hasMore: boolean;
  //filters
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  _inited: boolean;
}
