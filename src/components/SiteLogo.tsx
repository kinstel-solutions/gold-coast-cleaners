import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

/** Native logo canvas size — drives the locked aspect ratio. */
const LOGO_WIDTH = 700;
const LOGO_HEIGHT = 237;

interface SiteLogoProps {
  /**
   * Pass ONLY a height class (e.g. "h-10", "h-14", "h-20").
   * Width is computed automatically from the locked aspect ratio,
   * so you never have to worry about distortion.
   */
  className?: string;
  /**
   * Scale factor that compensates for the SVG's internal whitespace.
   * At 1× the raw artwork looks small; default 1 fills the clip area.
   */
  zoom?: number;
  /** Extra classes forwarded to the underlying next/image element. */
  imageClassName?: string;
  priority?: boolean;
  /**
   * 'light' → white logo  (for dark / transparent hero backgrounds).
   * 'dark'  → black logo  (for white / solid backgrounds).
   * Defaults to 'dark'.
   */
  variant?: "light" | "dark";
}

export function SiteLogo({
  className,
  zoom = 1,
  imageClassName,
  priority = false,
  variant = "dark",
}: SiteLogoProps) {
  /**
   * CSS filter tricks:
   *  - 'dark'  → brightness(0)           = turns any colour fully black
   *  - 'light' → brightness(0) invert(1) = black → white
   */
  const filterStyle = "";
  // variant === "light" ? "invert(1)" : "";

  return (
    /*
     * Outer div:
     *  - Locks width to (height × LOGO_WIDTH/LOGO_HEIGHT) automatically.
     *  - overflow-hidden clips the scaled-up inner image.
     *  - Caller controls visible height via `className` (e.g. "h-10").
     */
    <div
      className={cn("relative overflow-hidden shrink-0", className)}
      style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}>
      {/*
       * Inner div: scaled up from the centre so the artwork fills the clip area,
       * removing the empty SVG canvas padding around the actual logo.
       */}
      <div
        className="absolute inset-0 origin-center"
        style={{ transform: `scale(${zoom})` }}>
        <Image
          src="/logos/logo-image-based-noBg.png"
          alt={SITE_NAME}
          fill
          className={cn(
            "object-contain transition-all duration-300",
            imageClassName,
          )}
          style={{ filter: filterStyle }}
          priority={priority}
        />
      </div>
    </div>
  );
}
