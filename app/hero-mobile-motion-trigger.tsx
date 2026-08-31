"use client";

import { useEffect } from "react";

const MOBILE_QUERY = "(max-width: 600px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MIN_VISIBLE_RATIO = 0.36;

export default function HeroMobileMotionTrigger() {
  useEffect(() => {
    const heroObject = document.querySelector<HTMLElement>(".heroObject");
    if (!heroObject) return;

    const mobile = window.matchMedia(MOBILE_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (!mobile.matches || reducedMotion.matches) return;

    let hasRun = false;
    let userScrolled = window.scrollY > 8;

    const visibleRatio = () => {
      const rect = heroObject.getBoundingClientRect();
      if (rect.height <= 0) return 0;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      return visibleHeight / rect.height;
    };

    const run = () => {
      if (hasRun) return;
      hasRun = true;
      heroObject.classList.remove("heroMobileMotionArmed");
      heroObject.classList.add("heroMobileMotionRun");
    };

    const ready = () => {
      const rect = heroObject.getBoundingClientRect();
      return (
        userScrolled &&
        visibleRatio() >= MIN_VISIBLE_RATIO &&
        rect.top < window.innerHeight * 0.78 &&
        rect.bottom > window.innerHeight * 0.16
      );
    };

    heroObject.classList.add("heroMobileMotionArmed");

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting || !userScrolled) return;
          if (entry.intersectionRatio < MIN_VISIBLE_RATIO && !ready()) return;
          run();
          observer?.disconnect();
        },
        {
          threshold: [MIN_VISIBLE_RATIO, 0.5],
          rootMargin: "0px 0px -6% 0px",
        },
      );
      observer.observe(heroObject);
    }

    const onScroll = () => {
      userScrolled = true;
      if (!ready()) return;
      run();
      observer?.disconnect();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    if (userScrolled && ready()) run();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
