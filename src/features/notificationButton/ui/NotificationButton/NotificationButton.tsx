import cls from "./NotificationButton.module.scss";
import { memo } from "react";
import {
  Popover,
  classNames,
  Button,
  ThemeButton,
  Icon,
} from "../../../../shared";
import { NotificationList } from "../../../../entities/Notification";
import { ReactComponent as NotificationIcon } from "../../../../shared/assets/icons/notification-20-20.svg";
interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      trigger={
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
      direction={"bottom left"}
    >
      <NotificationList
        className={classNames(cls.NotificationButton, {}, [className])}
      />
    </Popover>
  );
});
