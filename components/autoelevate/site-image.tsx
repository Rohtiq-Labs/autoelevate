import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export const SiteImage = ({
  src,
  alt,
  priority = false,
  className = "object-cover",
  sizes = "(max-width: 640px) 100vw, 50vw",
}: SiteImageProps): React.ReactElement => (
  <Image
    src={src}
    alt={alt}
    fill
    className={className}
    sizes={sizes}
    priority={priority}
    style={{ objectFit: "cover" }}
  />
);
