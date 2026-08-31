"use client";

import { useEffect } from "react";

export default function ProcessMotionTrigger() {
  useEffect(() => {
    const sequence = document.querySelector<HTMLElement>(".processSequence");
    if (!sequence) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const run = () => {
      sequence.classList.remove("processMotionArmed");
      sequence.classList.add("processMotionRun");
    };

    sequence.classList.add("processMotionArmed");

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        run();
        observer.disconnect();
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(sequence);
    return () => observer.disconnect();
  }, []);

  return null;
}
