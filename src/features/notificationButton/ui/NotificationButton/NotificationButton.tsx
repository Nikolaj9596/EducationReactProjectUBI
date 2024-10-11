import cls from "./NotificationButton.module.scss";
import { memo, useCallback, useState } from "react";
import {
  Popover,
  classNames,
  Button,
  ThemeButton,
  Icon,
  Drawer,
} from "../../../../shared";
import { NotificationList } from "../../../../entities/Notification";
import { ReactComponent as NotificationIcon } from "../../../../shared/assets/icons/notification-20-20.svg";
import { BrowserView, MobileView } from "react-device-detect";
import { AnimationProvider } from "../../../../shared/lib/components/AnimationProvider";
interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpent, setIsOpen] = useState(false);
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover trigger={trigger} direction={"bottom left"}>
          <NotificationList
            className={classNames(cls.NotificationButton, {}, [className])}
          />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
          <Drawer isOpen={isOpent} onClose={onCloseDrawer}>
            <NotificationList
              className={classNames(cls.NotificationButton, {}, [className])}
            />
          </Drawer>
      </MobileView>
    </div>
  );
});
