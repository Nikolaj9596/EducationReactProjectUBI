import { useGetNotificationsListQuery } from "../../api/notificationApi";
import { FC, memo } from "react";
import { classNames, VStack } from "../../../../shared";
import cls from "./NotificationList.module.scss";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = memo((props) => {
  let { data, isLoading } = useGetNotificationsListQuery(10);
  if (!data) {
    data = [
      {
        id: "1",
        title: "Уведомление 1",
        description: "Произошло какое-то событие",
        userId: "1",
        href: "http://loclahost:3000/admin",
      },
      {
        id: "2",
        title: "Уведомление 2",
        description: "Произошло какое-то событие",
        userId: "1",
        href: "http://loclahost:3000/admin",
      },
      {
        id: "3",
        title: "Уведомление 3",
        description: "Произошло какое-то событие",
        userId: "1",
        href: "http://loclahost:3000/admin",
      },
      {
        id: "4",
        title: "Уведомление 4",
        description: "Произошло какое-то событие",
        userId: "1",
      },
    ];
  }
  return (
    <VStack
      max
      gap={"16"}
      className={classNames(cls.NotificationList, {}, [props.className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item}/>
      ))}
    </VStack>
  );
});
