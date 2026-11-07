const WIDTH = 1920;
const HEIGHT = 1080;

/** Static crop for About and Contact. The home journey owns the moving frame. */
export function FrescoStill() {
  return (
    <div className="fresco-still" aria-hidden="true">
      <picture>
        <source
          type="image/avif"
          srcSet="/fresco/fresco-1280.avif 1280w, /fresco/fresco-1920.avif 1920w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/fresco/fresco-1280.webp 1280w, /fresco/fresco-1920.webp 1920w"
          sizes="100vw"
        />
        <img src="/fresco/fresco-1920.jpg" alt="" width={WIDTH} height={HEIGHT} decoding="async" />
      </picture>
    </div>
  );
}
