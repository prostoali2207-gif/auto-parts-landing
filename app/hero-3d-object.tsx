"use client";

import { createElement, useEffect, useRef, useState } from "react";

type AnimationOptions = {
  repetitions?: number;
  pingpong?: boolean;
  weight?: number;
  timeScale?: number;
  time?: number;
  fade?: boolean | number;
  warp?: boolean | number;
  relativeWarp?: boolean;
};

type HeroModelViewerElement = HTMLElement & {
  loaded?: boolean;
  availableAnimations: string[];
  animationName?: string;
  updateComplete?: Promise<unknown>;
  appendAnimation: (animationName: string, options?: AnimationOptions) => void;
  play: (options?: Pick<AnimationOptions, "repetitions" | "pingpong">) => void;
  pause: () => void;
};

function webGlAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
    );
  } catch {
    return false;
  }
}

function requestedMode() {
  const value = new URLSearchParams(window.location.search).get("hero3d");
  if (value === "0") return "off";
  if (value === "1") return "on";
  return "auto";
}

export default function Hero3DObject() {
  const viewerRef = useRef<HeroModelViewerElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mode = requestedMode();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mode === "off" || reduceMotion.matches || !webGlAvailable()) return;

    let cancelled = false;
    let timer = 0;

    const boot = async () => {
      try {
        await import("@google/model-viewer");
        if (!cancelled) setEnabled(true);
      } catch {
        // CSS V7 object remains the complete fallback.
      }
    };

    const schedule = () => {
      timer = window.setTimeout(() => void boot(), mode === "on" ? 0 : 250);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    let disposed = false;
    const hero = viewer.closest(".heroObject");

    const clearReady = () => {
      if (disposed) return;
      setReady(false);
      hero?.classList.remove("hero3dReady");
    };

    const onLoad = async () => {
      if (disposed) return;
      const animations = viewer.availableAnimations ?? [];
      if (animations.length > 0) {
        viewer.animationName = animations[0];
        await viewer.updateComplete;
        for (const name of animations.slice(1)) {
          viewer.appendAnimation(name, {
            repetitions: 1,
            weight: 1,
            time: 0,
            fade: false,
            warp: false,
          });
        }
      }

      if (disposed) return;
      setReady(true);
      hero?.classList.add("hero3dReady");

      if (animations.length > 0) {
        viewer.play({ repetitions: 1, pingpong: false });
      }
    };

    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", clearReady);

    if (viewer.loaded) void onLoad();

    return () => {
      disposed = true;
      viewer.pause?.();
      hero?.classList.remove("hero3dReady");
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", clearReady);
    };
  }, [enabled]);

  const modelViewer = enabled
    ? createElement("model-viewer", {
        ref: (node: HTMLElement | null) => {
          viewerRef.current = node as HeroModelViewerElement | null;
        },
        src: "/hero/hero-object.glb",
        class: "hero3dModel",
        "camera-orbit": "0deg 75deg 105%",
        "field-of-view": "28deg",
        "interaction-prompt": "none",
        "shadow-intensity": "0",
        exposure: "1.08",
        "tone-mapping": "neutral",
        "aria-hidden": "true",
        tabindex: "-1",
      })
    : null;

  return (
    <div
      className={`hero3dStage${ready ? " hero3dStageReady" : ""}`}
      data-hero-3d={ready ? "ready" : enabled ? "loading" : "fallback"}
      aria-hidden="true"
    >
      {modelViewer}
    </div>
  );
}
