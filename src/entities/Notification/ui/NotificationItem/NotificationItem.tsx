import { FC, memo } from "react";
import { Card, classNames, Text, CardTheme, AppLink } from "../../../../shared";
import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo((props) => {
  const { className, item } = props;
  const content = (
    <Card
      theme={CardTheme.OUTLINE}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <AppLink to={item.href} className={cls.link}>
        <Card
          theme={CardTheme.OUTLINE}
          className={classNames(cls.NotificationItem, {}, [className])}
        >
          <Text title={item.title} text={item.description} />
        </Card>
      </AppLink>
    );
  }
  return content;
});
