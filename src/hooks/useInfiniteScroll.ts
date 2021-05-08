import React, { useEffect } from "react";

interface Props {
  root: null;
  target: HTMLElement;
  onIntersect: IntersectionObserverCallback;
  threshold: number;
  rootMargin: string;
}

export const useInfinteScroll = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
}: Props) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    if (!target) {
      return;
    }
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};
