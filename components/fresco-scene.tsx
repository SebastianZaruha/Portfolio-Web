"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import {
  DESKTOP_STILL,
  DESKTOP_TARGETS,
  MOBILE_STILL,
  MOBILE_TARGETS,
  alignmentProgress,
  journeyProgress,
  poseFor,
  settleFrames,
  type CameraFrameId,
  type CameraKeyframe,
  type CameraTarget,
} from "@/lib/camera";

const MOBILE_QUERY = "(max-width: 840px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

const CONTENT_FRAMES = ["whole", "architect", "thinker", "builder"] as const;
type ContentFrameId = (typeof CONTENT_FRAMES)[number];

function isContentFrame(value: string | undefined): value is ContentFrameId {
  return CONTENT_FRAMES.some((id) => id === value);
}

function offsetWithin(element: HTMLElement, ancestor: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function buildFrames(
  journey: HTMLElement,
  stageHeight: number,
  targets: Record<CameraFrameId, CameraTarget>,
): CameraKeyframe[] {
  const travel = journey.offsetHeight - stageHeight;
  const frames: CameraKeyframe[] = [];
  journey.querySelectorAll<HTMLElement>("[data-frame]").forEach((node) => {
    const id = node.dataset.frame;
    if (!isContentFrame(id)) return;
    const center = offsetWithin(node, journey) + node.offsetHeight / 2;
    frames.push({
      ...targets[id],
      at: alignmentProgress(center, stageHeight, travel),
    });
  });
  return settleFrames(frames);
}

/**
 * Single owner of the fresco composition. Scroll writes a transform on the image
 * and does not rerender this tree.
 */
export function FrescoScene({ children }: { children: ReactNode }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const journey = journeyRef.current;
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!journey || !stage || !img) return;

    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia(REDUCE_QUERY);
    let raf = 0;
    let frames: readonly CameraKeyframe[] = DESKTOP_STILL;
    let signature = "";

    const apply = () => {
      raf = 0;
      const header = document.querySelector(".site-header");
      const headerH = header?.getBoundingClientRect().height ?? 0;
      const headerPx = `${Math.round(headerH)}px`;
      const root = document.documentElement;
      if (root.style.getPropertyValue("--header-h").trim() !== headerPx) {
        root.style.setProperty("--header-h", headerPx);
      }

      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      const journeyH = journey.offsetHeight;
      const reducedOn = reduced.matches;
      const mobileOn = mobile.matches;
      const nextSignature = `${stageW}x${stageH}x${journeyH}x${reducedOn ? 1 : 0}x${mobileOn ? 1 : 0}`;
      if (nextSignature !== signature) {
        signature = nextSignature;
        frames = reducedOn
          ? mobileOn
            ? MOBILE_STILL
            : DESKTOP_STILL
          : buildFrames(journey, stageH, mobileOn ? MOBILE_TARGETS : DESKTOP_TARGETS);
      }

      const progress = reducedOn
        ? 0
        : journeyProgress(journey.getBoundingClientRect().top, headerH, journeyH, stageH);
      const pose = poseFor({ width: stageW, height: stageH }, progress, frames);
      const base = `${Math.round(pose.width)}x${Math.round(pose.height)}`;
      if (img.dataset.base !== base) {
        img.dataset.base = base;
        img.style.width = `${pose.width}px`;
        img.style.height = `${pose.height}px`;
      }
      img.style.transform = `translate3d(${pose.x.toFixed(2)}px, ${pose.y.toFixed(2)}px, 0) scale(${pose.zoom.toFixed(4)})`;
      stage.classList.add("is-posed");
    };

    const request = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    const onScroll = () => {
      if (reduced.matches) return;
      request();
    };

    apply();
    const observed = document.querySelector(".site-header");
    const observer = new ResizeObserver(request);
    observer.observe(journey);
    if (observed) observer.observe(observed);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", request);
    mobile.addEventListener("change", request);
    reduced.addEventListener("change", request);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", request);
      mobile.removeEventListener("change", request);
      reduced.removeEventListener("change", request);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="journey" ref={journeyRef}>
      <div className="fresco" ref={stageRef} aria-hidden="true">
        <picture>
          <source srcSet="/fresco/fresco-1920.avif" type="image/avif" />
          <source srcSet="/fresco/fresco-1920.webp" type="image/webp" />
          <img
            ref={imgRef}
            className="fresco-img"
            src="/fresco/fresco-1920.jpg"
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="journey-copy">{children}</div>
    </div>
  );
}
