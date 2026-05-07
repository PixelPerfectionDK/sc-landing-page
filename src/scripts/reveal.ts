import { animate, inView } from "motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL_DURATION = 0.9;
const STAMP_DURATION = 0.6;
const STAMP_DELAY = 0.55;

export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  elements.forEach((el) => {
    const parsed = Number(el.dataset.revealDelay);
    const delay = Number.isFinite(parsed) ? parsed / 1000 : 0;
    const stamps = el.querySelectorAll<HTMLElement>(".receipt-stamp");

    inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, y: 0 },
          { duration: REVEAL_DURATION, ease: EASE, delay },
        );
        stamps.forEach((stamp) => {
          animate(
            stamp,
            { opacity: 1, rotate: -8, scale: 1 },
            {
              duration: STAMP_DURATION,
              ease: EASE,
              delay: delay + STAMP_DELAY,
            },
          );
        });

        return () => {
          animate(el, { opacity: 0, y: 28 }, { duration: 0 });
          stamps.forEach((stamp) => {
            animate(
              stamp,
              { opacity: 0, rotate: -30, scale: 1.5 },
              { duration: 0 },
            );
          });
        };
      },
      { amount: 0.12, margin: "0px 0px -30px 0px" },
    );
  });
}
