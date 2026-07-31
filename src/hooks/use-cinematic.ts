"use client";

import { useEffect, useState } from "react";

/**
 * A pinned, full-height scene needs room to be pinned in. Below this the
 * scene's content is taller than the viewport it would be pinned to, and the
 * set piece turns into a clipped mess.
 */
const STAGE = "(min-width: 1024px) and (min-height: 640px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Whether this reader gets the cinematic treatment: enough viewport to pin a
 * full-height scene, and no request for reduced motion.
 *
 * It deliberately starts `false`, so the server renders the plain stacked
 * fallback and every scene's content exists without JavaScript; the pinned
 * version is swapped in on mount once the viewport is actually known.
 */
export function useCinematic() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stage = window.matchMedia(STAGE);
    const reduced = window.matchMedia(REDUCED);
    const update = () => setEnabled(stage.matches && !reduced.matches);

    update();
    stage.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      stage.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
