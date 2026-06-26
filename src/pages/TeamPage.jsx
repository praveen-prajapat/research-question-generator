import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AmbientField from "../components/AmbientField";

// Pulls every image out of the top-level "group" folder (sits next to /src),
// regardless of extension or filename. Sorted naturally so 1,2,10 behaves,
// not 1,10,2.
const photoModules = import.meta.glob("../../group/*.{png,jpg,jpeg,webp,JPG,PNG,JPEG,WEBP}", {
  eager: true,
  import: "default",
});

const PHOTOS = Object.keys(photoModules)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  )
  .map((path, i) => ({
    id: i,
    src: photoModules[path],
    name: path.split("/").pop(),
  }));

export default function TeamPage() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  const hasPhotos = PHOTOS.length > 0;

  const scrollToIndex = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, PHOTOS.length - 1));
    const el = itemRefs.current[clamped];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setActive(clamped);
  }, []);

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  // Track which card is centered as the user free-scrolls / swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !hasPhotos) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const trackRect = track.getBoundingClientRect();
        const center = trackRect.left + trackRect.width / 2;
        let closest = 0;
        let closestDist = Infinity;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [hasPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-void font-body text-ink">
      <AmbientField density={14} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col px-5 pt-6 pb-8 sm:px-8">
        {/* top bar */}
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
          <button
            onClick={() => navigate("/")}
            aria-label="Back to home"
            className="glass-pill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal/80 sm:text-xs sm:tracking-[0.25em]">
              The People Behind It
            </p>
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Our Team
            </h1>
          </div>
          {hasPhotos && (
            <span className="font-mono text-xs text-ink-faint">
              {active + 1} / {PHOTOS.length}
            </span>
          )}
        </div>

        {/* gallery */}
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-6">
          {hasPhotos ? (
            <>
              <div
                ref={trackRef}
                className="thin-scroll flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4"
                style={{ scrollbarWidth: "thin" }}
              >
                {PHOTOS.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    ref={(el) => (itemRefs.current[i] = el)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="glass-panel relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl shadow-panel sm:w-[420px]"
                  >
                    <img
                      src={photo.src}
                      alt={`Team photo ${i + 1}`}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void/70 to-transparent" />
                  </motion.div>
                ))}
              </div>

              {/* nav arrows */}
              <div className="mt-2 flex items-center justify-center gap-4">
                <button
                  onClick={goPrev}
                  disabled={active === 0}
                  aria-label="Previous photo"
                  className="glass-pill flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* dot indicators */}
                <div className="flex items-center gap-1.5">
                  {PHOTOS.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => scrollToIndex(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      className="p-1.5"
                    >
                      <span
                        className={`block rounded-full transition-all ${
                          i === active ? "h-1.5 w-5 bg-signal" : "h-1.5 w-1.5 bg-void-line"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={goNext}
                  disabled={active === PHOTOS.length - 1}
                  aria-label="Next photo"
                  className="glass-pill flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="glass-panel mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl p-10 text-center">
              <Users size={28} className="text-ink-faint" />
              <p className="font-display text-lg font-medium text-ink">No photos yet</p>
              <p className="text-sm text-ink-muted">
                Drop images into the <code className="font-mono text-ink-faint">group</code> folder
                at the project root and they'll show up here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
