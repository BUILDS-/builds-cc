import { animate, stagger } from "animejs";
import isMobile from "@scripts/isMobile";

export function gridIntroAnim($allCards: NodeListOf<HTMLDivElement>) {
  // Should only play on page load, no more.
  for (const $card of $allCards) {
    $card.style.opacity = "1";
  }
  const mobile = isMobile();
  return animate($allCards, {
    x: { from: mobile ? "0" : "-150px" },
    y: { from: mobile ? "50px" : "0" },
    opacity: { from: 0 },
    delay: stagger(70),
    ease: "out(3)",
    duration: 400,
  });
}

export function initGrid($allCards: NodeListOf<HTMLDivElement>) {
  const AC = new AbortController(); // To handle removing EventListeners
  for (const $card of $allCards) {
    $card.addEventListener(
      "mouseenter",
      () =>
        animate($card, {
          y: -20,
          ease: "out(3)",
          duration: 100,
        }),
      { signal: AC.signal },
    );
    $card.addEventListener(
      "mouseleave",
      () =>
        animate($card, {
          y: 0,
          ease: "out(3)",
          duration: 100,
        }),
      { signal: AC.signal },
    );
  }

  return () => {
    // Returns a teardown function to clean up for later
    AC.abort();
    for (const $card of $allCards) {
      // Manual reset here instead of revert()
      // Lazy solution because I dont want to keep record of each animate object for each card
      // Regardless I think animate objects are garbage collected after they are complete?
      $card.style.transform = "";
      $card.style.margin = "";
    }
  };
}
