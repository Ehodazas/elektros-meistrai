import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scroll-reveal for elements marked with `data-reveal` (stagger via `style={stagger(i)}`).
 *
 * An element is revealed once its top has reached the lower part of the viewport –
 * including elements that were scrolled past quickly (fast flings, anchor jumps), so
 * nothing can stay invisible above the viewport. Content is only hidden after this hook
 * runs and when the user has not asked for reduced motion.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("reveal-ready");

    const pending = new Set<Element>();
    // setTimeout rather than requestAnimationFrame: rAF is paused in hidden/background
    // views, which would leave content invisible until the next scroll.
    let timer = 0;

    const check = () => {
      timer = 0;
      const limit = window.innerHeight * 0.92;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          pending.delete(el);
        }
      }
    };
    const schedule = () => {
      if (!timer) timer = window.setTimeout(check, 50);
    };
    const collect = () => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => pending.add(el));
      schedule();
    };

    const start = window.setTimeout(collect, 0);
    const mo = new MutationObserver(collect);
    mo.observe(document.getElementById("turinys") ?? document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
}
