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

export default function Photo({ name, alt, sizes = "100vw", className = "", priority = false }: Props) {
  const p = photos[name];
  return (
    <img
      src={photoUrl(p, 1200)}
      srcSet={photoSrcSet(p)}
      sizes={sizes}
      alt={alt}
      width={p.width}
      height={p.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`block h-full w-full bg-slate-200 object-cover ${className}`}
    />
  );
}
