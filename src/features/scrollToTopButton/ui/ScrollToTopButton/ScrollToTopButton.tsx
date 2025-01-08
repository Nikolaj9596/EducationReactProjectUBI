import { memo } from "react";
import cls from "./ScrollToTopButton.module.scss";
import { ReactComponent as CircleIcon } from "../../../../shared/assets/icons/circle-up.svg";
import { classNames, Icon } from "../../../../shared";

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onCLick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onCLick}
      width={32}
      height={32}
      className={classNames(cls.ScrollToTopButton, {}, [className])}
    />
  );
});
