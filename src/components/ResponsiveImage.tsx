import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = Omit<ImageProps, "src" | "unoptimized"> & {
  src: string;
};

const sourceWidths: Record<string, number[]> = {
  "/images/optimized/atalica-hero-ai.webp": [480, 768, 1200, 1536],
  "/images/optimized/founder/raheel.webp": [480, 768, 781],
  "/images/optimized/projects/livingroom1.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/bedroom2.webp": [480, 768, 1200, 1600],
  "/images/optimized/projects/office1.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/exterior.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/kitchen1.webp": [480, 768, 800],
  "/images/optimized/projects/ceiling1.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/stairs.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/livingroom2.webp": [480, 768, 1200, 1600, 1800],
  "/images/optimized/projects/bedroom4b.webp": [480, 768, 1200],
  "/images/optimized/projects/livingroom4.webp": [480, 768, 1200],
  "/images/optimized/projects/livingroom5.webp": [480, 768, 1200, 1500],
};

const fallbackSources: Record<string, string> = {
  "/images/optimized/atalica-hero-ai.webp": "/images/atalica-hero-ai.png",
  "/images/optimized/founder/raheel.webp": "/images/founder/raheel.jpeg",
  "/images/optimized/projects/livingroom1.webp": "/images/projects/livingroom1.jpg",
  "/images/optimized/projects/bedroom2.webp": "/images/projects/bedroom2.jpg",
  "/images/optimized/projects/office1.webp": "/images/projects/office1.jpg",
  "/images/optimized/projects/exterior.webp": "/images/projects/exterior.jpg",
  "/images/optimized/projects/kitchen1.webp": "/images/projects/kitchen1.jpeg",
  "/images/optimized/projects/ceiling1.webp": "/images/projects/ceiling1.jpg",
  "/images/optimized/projects/stairs.webp": "/images/projects/stairs.jpg",
  "/images/optimized/projects/livingroom2.webp": "/images/projects/livingroom2.jpg",
  "/images/optimized/projects/bedroom4b.webp": "/images/projects/bedroom4b.jpeg",
  "/images/optimized/projects/livingroom4.webp": "/images/projects/livingroom4.jpeg",
  "/images/optimized/projects/livingroom5.webp": "/images/projects/livingroom5.jpeg",
};

export default function ResponsiveImage({ src, alt, sizes = "100vw", ...props }: ResponsiveImageProps) {
  const widths = sourceWidths[src];
  const srcSet = widths
    ?.map((width) => {
      const imageSrc = width === widths.at(-1)
        ? src
        : src.replace(/\.webp$/i, `-${width}.webp`);
      return `${imageSrc} ${width}w`;
    })
    .join(", ");

  return (
    <picture className="contents">
      {srcSet && <source srcSet={srcSet} sizes={sizes} type="image/webp" />}
      <Image {...props} src={fallbackSources[src] ?? src} alt={alt} sizes={sizes} unoptimized />
    </picture>
  );
}
