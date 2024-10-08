import { rtkApi } from "../../../shared/api/rtkApi";
import { Notification } from "../model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsList: build.query<Notification[], number>({
      query: (limit) => ({
        url: "/notifications",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useGetNotificationsListQuery =
  notificationApi.useGetNotificationsListQuery;
