// Hook реализует бесконечный скролл
import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollOptions) => {
  const { callback, triggerRef, wrapperRef } = props;
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      let options = {
        root: wrapperElement,
        rootMargin: "0px",
        threshould: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);

      return () => {
        if (observer) {
          observer.unobserve(triggerElement);
        }
      };
    }
  }, [callback, triggerRef, wrapperRef]);
};
