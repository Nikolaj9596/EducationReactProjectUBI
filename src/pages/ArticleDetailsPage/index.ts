export {
  articleDetailsCommentsActions,
  articleDetailsCommentsReducer,
  getArticleComments,
} from "./model/slices/articleDetailsCommentsSlice";

export { ArticleDetailsPageAsync as ArticleDetailsPage } from "./ui/ArticleDetailsPage/ArticleDetailsPage.async";
export type { ArticleDetailsCommentsSchema } from "./model/types/ArticleDetailsCommentsSchema";
export type {ArticleDetailsPageRecommendationsSchema} from "./model/types/ArticleDetailsPageRecommendationsSchema";
