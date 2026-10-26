import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const activeRestorationRef = useRef<{ cancel: () => void } | null>(null);

  // 1. Configure manual scroll restoration and record scroll positions reliably
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let isScheduled = false;
    const savePosition = () => {
      if (!isScheduled) {
        isScheduled = true;
        requestAnimationFrame(() => {
          sessionStorage.setItem(`scroll_pos_${window.location.pathname}`, String(window.scrollY));
          isScheduled = false;
        });
      }
    };

    const flushPosition = () => {
      sessionStorage.setItem(`scroll_pos_${window.location.pathname}`, String(window.scrollY));
    };

    window.addEventListener("scroll", savePosition, { passive: true });
    window.addEventListener("beforeunload", flushPosition);
    window.addEventListener("pagehide", flushPosition);

    return () => {
      window.removeEventListener("scroll", savePosition);
      window.removeEventListener("beforeunload", flushPosition);
      window.removeEventListener("pagehide", flushPosition);
    };
  }, []);

  // 2. Handle scroll restoration on refresh / back-forward, and reset on push navigation
  useEffect(() => {
    // If a previous restoration observer is active, cancel it first
    if (activeRestorationRef.current) {
      activeRestorationRef.current.cancel();
      activeRestorationRef.current = null;
    }

    // When navigating to a new route via Link or programmatic push:
    if (navigationType === "PUSH") {
      sessionStorage.removeItem(`scroll_pos_${pathname}`);
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      return;
    }

    // On page refresh or browser back/forward (POP):
    const saved = sessionStorage.getItem(`scroll_pos_${pathname}`);
    if (!saved) return;

    const targetY = parseInt(saved, 10);
    if (isNaN(targetY) || targetY <= 0) return;

    let isCancelled = false;
    let observer: ResizeObserver | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      isCancelled = true;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (safetyTimer) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("keydown", handleKeyInteraction);
    };

    // User cancellation listeners: if user touches or scrolls, abort restoration immediately
    const handleUserInteraction = () => {
      cleanup();
    };

    const handleKeyInteraction = (e: KeyboardEvent) => {
      const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (scrollKeys.includes(e.key)) {
        cleanup();
      }
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleKeyInteraction, { passive: true });

    const attemptRestore = () => {
      if (isCancelled) return;

      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const maxScroll = Math.max(0, docHeight - viewHeight);

      // If document height is sufficient to reach target position:
      if (maxScroll >= targetY) {
        window.scrollTo({ top: targetY, behavior: "instant" });
        cleanup();
      } else if (document.readyState === "complete" && maxScroll > 0) {
        // If document is fully loaded but slightly shorter, scroll to current max
        window.scrollTo({ top: maxScroll, behavior: "instant" });
      }
    };

    // Attempt immediately in case DOM is already sized
    attemptRestore();

    // Use ResizeObserver to monitor document height changes dynamically as components and images render
    if (!isCancelled) {
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => {
          attemptRestore();
        });
        observer.observe(document.documentElement);
      }

      // Safety timeout: stop observing after 3 seconds of settling
      safetyTimer = setTimeout(() => {
        if (!isCancelled) {
          attemptRestore();
          cleanup();
        }
      }, 3000);
    }

    activeRestorationRef.current = { cancel: cleanup };

    return () => {
      cleanup();
    };
  }, [pathname, navigationType]);

  return null;
}
