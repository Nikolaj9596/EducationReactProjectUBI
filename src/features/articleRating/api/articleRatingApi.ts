import { Rating } from "../../../entities/Rating";
import { rtkApi } from "../../../shared/api/rtkApi";

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

interface RateArticleBody {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ articleId, userId }) => ({
        url: "/article-ratings",
        params: {
          articleId,
          userId,
        },
      }),
    }),

    addRatingArticle: build.mutation<void, RateArticleBody>({
      query: (body) => ({
        url: "/article-ratings",
        body: body,
        method: "POST",
      }),
    }),
  }),
});

export const useGetArticleRatingQuery =
  articleRatingApi.useGetArticleRatingQuery;

export const useAddRatingArticleMutation =
  articleRatingApi.useAddRatingArticleMutation;
