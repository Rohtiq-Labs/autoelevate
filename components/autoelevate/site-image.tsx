import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: "cover" | "contain";
};

export const SiteImage = ({
  src,
  alt,
  priority = false,
  className = "object-cover",
  sizes = "(max-width: 640px) 100vw, 50vw",
  objectFit = "cover",
}: SiteImageProps): React.ReactElement => (
  <Image
    src={src}
    alt={alt}
    fill
    className={className}
    sizes={sizes}
    priority={priority}
    style={{ objectFit }}
  />
);
