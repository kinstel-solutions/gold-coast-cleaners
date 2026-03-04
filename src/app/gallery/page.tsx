import fs from "fs";
import path from "path";
import Image from "next/image";
import { CtaStrip } from "@/components/home/CtaStrip";

export const metadata = {
  title: "Gallery",
  description:
    "View our gallery of past cleaning jobs and see the quality of our work firsthand.",
};

export default async function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
  let images: string[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      images = fs
        .readdirSync(galleryDir)
        .filter(
          (f) =>
            f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".jpeg"),
        );
    }
  } catch (e) {
    console.error("Failed to read gallery directory:", e);
  }

  return (
    <>
      <div className="bg-card pt-32 pb-16 sm:pt-40 sm:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 font-display">
            Our Work{" "}
            <span className="text-primary block sm:inline">In Action</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Browse through our gallery to see the high standards of cleanliness
            we deliver for homes and properties across the Gold Coast. Our
            results speak for themselves.
          </p>

          {images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md group cursor-pointer hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5 bg-white transform hover:-translate-y-1">
                  <div className="aspect-auto relative">
                    <Image
                      src={`/images/gallery/${img}`}
                      alt={`Cleaning gallery image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm py-2 px-4 flex justify-center items-center pointer-events-none z-10 transition-opacity duration-300 group-hover:bg-slate-900/80">
                      <Image
                        src="/logos/JBC-logo-JB-with-full-name-noBG.png"
                        alt="Watermark"
                        width={150}
                        height={50}
                        className="w-auto h-8 sm:h-10 drop-shadow-md opacity-90"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
              <p className="text-xl font-medium">
                No images found in the gallery yet.
              </p>
              <p className="mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
      <CtaStrip />
    </>
  );
}
