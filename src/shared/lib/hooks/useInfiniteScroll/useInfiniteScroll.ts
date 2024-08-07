import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollOptions) => {
  const { callback, triggerRef, wrapperRef } = props;
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (callback) {
      let options = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshould: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerRef.current);

      return () => {
        if (observer) {
          observer.unobserve(triggerRef.current);
        }
      };
    }
  }, [callback, triggerRef, wrapperRef]);
};
