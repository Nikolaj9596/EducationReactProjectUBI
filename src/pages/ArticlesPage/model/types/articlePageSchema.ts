import { EntityState } from "@reduxjs/toolkit";
import { ArticleSortField } from "../../../../entities/Article/model/types/article";
import { Article, ArticleView } from "../../../../entities/Article";

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
  //pagination
  limit?: number;
  page: number;
  hasMore: boolean;
  //filters
  order: "asc" | "desc";
  sort: ArticleSortField;
  search: string;
  _inited: boolean;
}
