const WIDTH = 2160;
const HEIGHT = 2700;

/**
 * Stationary portrait. One size is chosen for the viewport; nothing here
 * listens to scroll, and the bitmap is never stretched.
 */
export function PaintingBackdrop() {
  return (
    <div className="painting-backdrop" aria-hidden="true">
      <picture>
        <source
          type="image/avif"
          srcSet="/painting/selected-1080.avif 1080w, /painting/selected.avif 2160w"
          sizes="min(100vw, 80vh)"
        />
        <source
          type="image/webp"
          srcSet="/painting/selected-1080.webp 1080w, /painting/selected.webp 2160w"
          sizes="min(100vw, 80vh)"
        />
        <img
          src="/painting/selected.jpg"
          alt=""
          width={WIDTH}
          height={HEIGHT}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </div>
  );
}
