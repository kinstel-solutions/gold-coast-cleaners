import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

/** Native logo canvas size — drives the locked aspect ratio. */
const LOGO_WIDTH = 700;
const LOGO_HEIGHT = 237;

interface SiteLogoProps {
  /**
   * Pass ONLY a height class (e.g. "h-10", "h-14", "h-20").
   * Width is computed automatically from the 1024 × 682 aspect ratio,
   * so you never have to worry about distortion.
   */
  className?: string;
  /**
   * Scale factor that compensates for the SVG's internal whitespace.
   * At 1× the raw artwork looks small; default 2.5 fills the clip area nicely.
   * Tune up/down if the logo still appears too small or gets clipped.
   */
  zoom?: number;
  /** Extra classes forwarded to the underlying next/image element. */
  imageClassName?: string;
  priority?: boolean;
}

export function SiteLogo({
  className,
  zoom = 1,
  imageClassName,
  priority = false,
}: SiteLogoProps) {
  return (
    /*
     * Outer div:
     *  - `aspect-[1024/682]` locks width to (height × 1024/682) automatically.
     *  - `overflow-hidden` clips the scaled-up inner image.
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
          src="/logos/logo-full-blue.svg"
          alt={SITE_NAME}
          fill
          className={cn(
            "object-contain transition-all duration-300",
            imageClassName,
          )}
          priority={priority}
        />
      </div>
    </div>
  );
}
