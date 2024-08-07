import { FC, memo, MutableRefObject, ReactNode, useRef } from "react";
import { useInfiniteScroll } from "../../lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo((props) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
