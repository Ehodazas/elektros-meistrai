import { photos, photoSrcSet, photoUrl, type PhotoKey } from "../data/photos.ts";

type Props = {
  name: PhotoKey;
  alt: string;
  /** `sizes` attribute – how wide the image renders at each breakpoint. */
  sizes?: string;
  className?: string;
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean;
};

/**
 * Local, optimized WebP with responsive srcset. A tiny blurred version of the same photo is
 * painted as the background, so there is never an empty grey box while it loads.
 */
export default function Photo({ name, alt, sizes = "100vw", className = "", priority = false }: Props) {
  const p = photos[name];
  return (
    <img
      src={photoUrl(p, 960)}
      srcSet={photoSrcSet(p)}
      sizes={sizes}
      alt={alt}
      width={p.width}
      height={p.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      style={{ backgroundImage: `url("${p.blur}")` }}
      className={`block h-full w-full bg-slate-200 bg-cover bg-center object-cover ${className}`}
    />
  );
}
