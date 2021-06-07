import { RefObject, useEffect } from 'react';

export interface UseIntersectionObserverParams {
  root?: RefObject<HTMLElement>;
  target: RefObject<HTMLElement>;
  onIntersect: () => void;
  threshold?: number;
  enabled?: boolean;
  rootMargin?: string;
}

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(el);
  }, [target.current, enabled]);
}
