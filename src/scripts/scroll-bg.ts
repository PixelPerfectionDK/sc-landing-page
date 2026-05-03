interface RGB {
  r: number;
  g: number;
  b: number;
}

type OverlayOpacityFn = (sectionIndex: number, t: number) => number;

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(t: number): number {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

export function initScrollBg(
  sectionIds: string[],
  colorStops: RGB[],
  getOverlayOpacity: OverlayOpacityFn,
): void {
  const scrollBg = document.getElementById("scroll-bg") as HTMLElement | null;
  const gradientLayer = document.getElementById(
    "scroll-bg-gradient",
  ) as HTMLElement | null;
  const grainLayer = document.getElementById(
    "scroll-bg-grain",
  ) as HTMLElement | null;
  const streakLayer = document.getElementById(
    "scroll-bg-streak",
  ) as HTMLElement | null;

  if (!scrollBg || !gradientLayer || !grainLayer || !streakLayer) return;

  let ticking = false;

  function update() {
    const sections = sectionIds.map((id) => document.getElementById(id));
    const viewportCenter = window.scrollY + window.innerHeight / 2;

    let activeIndex = 0;
    let t = 0;

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i];
      if (!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeIndex = i;
        t = (viewportCenter - top) / el.offsetHeight;
        break;
      } else if (viewportCenter > bottom) {
        activeIndex = i;
        t = 1;
      }
    }

    const current = colorStops[activeIndex] ?? colorStops.at(-1)!;
    const next =
      colorStops[Math.min(activeIndex + 1, colorStops.length - 1)] ?? current;
    const blendT = smoothstep(t);

    scrollBg!.style.backgroundColor = `rgb(${Math.round(
      lerp(current.r, next.r, blendT),
    )}, ${Math.round(lerp(current.g, next.g, blendT))}, ${Math.round(
      lerp(current.b, next.b, blendT),
    )})`;

    const overlayOpacity = getOverlayOpacity(activeIndex, t);
    gradientLayer!.style.opacity = String(overlayOpacity);
    grainLayer!.style.opacity = String(overlayOpacity * 0.2);
    streakLayer!.style.opacity = String(overlayOpacity);

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  update();
}
