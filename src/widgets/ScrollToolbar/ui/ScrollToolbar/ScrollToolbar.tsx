import { ScrollToTopButton } from "../../../../features/scrollToTopButton";
import { memo } from "react";
import { classNames, VStack } from "../../../../shared";
import cls from "./ScrollToolbar.module.scss";

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
