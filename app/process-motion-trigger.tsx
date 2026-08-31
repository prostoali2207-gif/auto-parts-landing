"use client";

import { useEffect } from "react";

const NUMBER_STAGGER_MS = 620;

export default function ProcessMotionTrigger() {
  useEffect(() => {
    const sequence = document.querySelector<HTMLElement>(".processSequence");
    if (!sequence) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const steps = Array.from(sequence.querySelectorAll<HTMLElement>(".processStep"));
    const firstStep = steps[0];
    if (!firstStep) return;

    let numbersStarted = false;
    let userScrolled = window.scrollY > 8;
    const timers: number[] = [];

    const runRoute = () => {
      sequence.classList.remove("processMotionArmed");
      sequence.classList.add("processMotionRun");
    };

    const runNumbers = () => {
      if (numbersStarted) return;
      numbersStarted = true;

      steps.forEach((step, index) => {
        const timer = window.setTimeout(() => {
          step.classList.add("processStepVisible");
          step.classList.remove("processStepPending");
        }, index * NUMBER_STAGGER_MS);
        timers.push(timer);
      });
    };

    const numberAnchorIsReady = () => {
      const rect = firstStep.getBoundingClientRect();
      const triggerBottom = window.innerHeight * 0.78;
      const triggerTop = window.innerHeight * 0.12;
      return rect.top < triggerBottom && rect.bottom > triggerTop;
    };

    sequence.classList.add("processMotionArmed");
    steps.forEach((step) => step.classList.add("processStepPending"));

    let routeObserver: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      runRoute();
    } else {
      routeObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;
          runRoute();
          routeObserver?.disconnect();
        },
        {
          threshold: 0.22,
          rootMargin: "0px 0px -8% 0px",
        },
      );
      routeObserver.observe(sequence);
    }

    let numberObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      numberObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting || !userScrolled) return;
          runNumbers();
          numberObserver?.disconnect();
        },
        {
          threshold: 0.35,
          rootMargin: "0px 0px -18% 0px",
        },
      );
      numberObserver.observe(firstStep);
    }

    const onScroll = () => {
      userScrolled = true;
      if (numberAnchorIsReady()) {
        runNumbers();
        numberObserver?.disconnect();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    if (!("IntersectionObserver" in window) && userScrolled && numberAnchorIsReady()) {
      runNumbers();
    }

    return () => {
      routeObserver?.disconnect();
      numberObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
