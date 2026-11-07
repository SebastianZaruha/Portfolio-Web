/**
 * Scroll camera for the home fresco.
 *
 * State, named before the motion:
 * - CameraFrameId: which figure the journey is featuring.
 * - CameraKeyframe: one row of the frame table (progress, focus, zoom, stage anchor).
 * - CameraPose: the transform written to the image. Scroll progress is not React state.
 *
 * The painting is a flat 1280×720 image. Pose math only pans and scales that bitmap.
 * It does not move the figures. Zoom is capped so a large screen cannot magnify the
 * source into an empty, mushy crop, while still leaving enough travel to change framing.
 */

export const FRESCO_SOURCE = { width: 1280, height: 720 } as const;

/** Largest displayed width relative to the original 1280px file. */
export const MAX_BITMAP_SCALE = 2.45;

export type CameraFrameId = "whole" | "architect" | "thinker" | "builder" | "resolve";

export type CameraTarget = {
  id: CameraFrameId;
  /** Point in the source image, 0–1 from the top left. */
  focusX: number;
  focusY: number;
  /** 1 = the image just covers the stage. Higher values move closer. */
  zoom: number;
  /** Where that point should land in the stage, 0–1. */
  anchorX: number;
  anchorY: number;
};

export type CameraKeyframe = CameraTarget & {
  /** 0 at the start of the journey, 1 when it has fully traveled. */
  at: number;
};

export type StageSize = {
  width: number;
  height: number;
};

export type CameraPose = {
  /** Layout size before scale(). Scroll updates the transform, not these, until resize. */
  width: number;
  height: number;
  x: number;
  y: number;
  zoom: number;
};

export const DESKTOP_TARGETS: Record<CameraFrameId, CameraTarget> = {
  whole: { id: "whole", focusX: 0.5, focusY: 0.46, zoom: 1.05, anchorX: 0.58, anchorY: 0.48 },
  architect: { id: "architect", focusX: 0.2, focusY: 0.63, zoom: 1.58, anchorX: 0.3, anchorY: 0.56 },
  thinker: { id: "thinker", focusX: 0.5, focusY: 0.46, zoom: 1.7, anchorX: 0.64, anchorY: 0.42 },
  builder: { id: "builder", focusX: 0.79, focusY: 0.27, zoom: 1.58, anchorX: 0.7, anchorY: 0.34 },
  resolve: { id: "resolve", focusX: 0.5, focusY: 0.46, zoom: 1.08, anchorX: 0.52, anchorY: 0.46 },
};

export const MOBILE_TARGETS: Record<CameraFrameId, CameraTarget> = {
  whole: { id: "whole", focusX: 0.5, focusY: 0.44, zoom: 1.04, anchorX: 0.5, anchorY: 0.3 },
  architect: { id: "architect", focusX: 0.24, focusY: 0.6, zoom: 1.28, anchorX: 0.42, anchorY: 0.28 },
  thinker: { id: "thinker", focusX: 0.5, focusY: 0.46, zoom: 1.32, anchorX: 0.5, anchorY: 0.28 },
  builder: { id: "builder", focusX: 0.74, focusY: 0.32, zoom: 1.28, anchorX: 0.58, anchorY: 0.28 },
  resolve: { id: "resolve", focusX: 0.5, focusY: 0.45, zoom: 1.05, anchorX: 0.5, anchorY: 0.3 },
};

export const DESKTOP_STILL: readonly CameraKeyframe[] = [
  { ...DESKTOP_TARGETS.whole, zoom: 1, at: 0 },
  { ...DESKTOP_TARGETS.whole, zoom: 1, at: 1 },
];

export const MOBILE_STILL: readonly CameraKeyframe[] = [
  { ...MOBILE_TARGETS.whole, zoom: 1, at: 0 },
  { ...MOBILE_TARGETS.whole, zoom: 1, at: 1 },
];

export const STILL_FRAMES = DESKTOP_STILL;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function smoothstep(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function journeyProgress(
  journeyTop: number,
  stickyTop: number,
  journeyHeight: number,
  stageHeight: number,
): number {
  const travel = journeyHeight - stageHeight;
  if (travel <= 0) return 0;
  return clamp((stickyTop - journeyTop) / travel, 0, 1);
}

/** Scroll progress at which a section center sits on the stage center. */
export function alignmentProgress(centerInJourney: number, stageHeight: number, travel: number): number {
  if (travel <= 0) return 0;
  return clamp((centerInJourney - stageHeight / 2) / travel, 0, 1);
}

/**
 * The last plate is the builder. Its center lands at the end of the journey,
 * so the close-up has to hold there. Pulling back to a wide frame at progress 1
 * would erase that figure. The calm contact surface is the resolve, after the
 * painting unpins.
 */
export function settleFrames(frames: CameraKeyframe[]): CameraKeyframe[] {
  const sorted = [...frames].sort((a, b) => a.at - b.at);
  if (!sorted.length) return [...STILL_FRAMES];
  const last = sorted[sorted.length - 1];
  sorted[0] = { ...sorted[0], at: 0 };
  if (sorted.length === 1) return [...sorted, { ...last, at: 1 }];
  if (last.at > 0.84) sorted[sorted.length - 1] = { ...last, at: 0.78 };
  sorted.push({ ...last, at: 1 });
  return sorted;
}

export function sampleFrame(frames: readonly CameraKeyframe[], progress: number): CameraTarget {
  const fallback = STILL_FRAMES[0];
  if (!frames.length) return fallback;
  const p = clamp(progress, 0, 1);
  let index = 0;
  while (index < frames.length - 1 && frames[index + 1].at <= p) index += 1;
  const from = frames[index];
  const to = frames[Math.min(index + 1, frames.length - 1)];
  const span = to.at - from.at;
  const t = span <= 0.0001 ? 0 : smoothstep((p - from.at) / span);
  return {
    id: t < 0.5 ? from.id : to.id,
    focusX: lerp(from.focusX, to.focusX, t),
    focusY: lerp(from.focusY, to.focusY, t),
    zoom: lerp(from.zoom, to.zoom, t),
    anchorX: lerp(from.anchorX, to.anchorX, t),
    anchorY: lerp(from.anchorY, to.anchorY, t),
  };
}

export function coverSize(stage: StageSize, source = FRESCO_SOURCE): { width: number; height: number } {
  if (stage.width <= 0 || stage.height <= 0) return { width: 0, height: 0 };
  const imageAspect = source.width / source.height;
  const stageAspect = stage.width / stage.height;
  if (imageAspect > stageAspect) {
    return { width: stage.height * imageAspect, height: stage.height };
  }
  return { width: stage.width, height: stage.width / imageAspect };
}

export function poseFor(
  stage: StageSize,
  progress: number,
  frames: readonly CameraKeyframe[],
): CameraPose {
  const base = coverSize(stage);
  if (base.width <= 0 || base.height <= 0) {
    return { width: 0, height: 0, x: 0, y: 0, zoom: 1 };
  }
  const frame = sampleFrame(frames, progress);
  const coverScale = base.width / FRESCO_SOURCE.width;
  const zoomCap = coverScale > 0 ? MAX_BITMAP_SCALE / coverScale : 1;
  const zoom = Math.min(Math.max(frame.zoom, 1), Math.max(zoomCap, 1));
  const dispW = base.width * zoom;
  const dispH = base.height * zoom;
  const minX = Math.min(0, stage.width - dispW);
  const minY = Math.min(0, stage.height - dispH);
  return {
    width: base.width,
    height: base.height,
    x: clamp(stage.width * frame.anchorX - frame.focusX * dispW, minX, 0),
    y: clamp(stage.height * frame.anchorY - frame.focusY * dispH, minY, 0),
    zoom,
  };
}
