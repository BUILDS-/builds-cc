import { animate, utils } from "animejs";

export function gridIntroAnim($allCards: NodeListOf<HTMLDivElement>) {
  // Plays only once on page load
  $allCards.forEach(($card) => ($card.style.opacity = "1"));
  return animate($allCards, {
    y: { from: "50px" },
    opacity: { from: 0 },
    delay: utils.stagger(70),
    ease: "out(3)",
    duration: 400,
  });
}

export function initGrid($allCards: NodeListOf<HTMLDivElement>) {
  const AC = new AbortController(); // To handle removing EventListeners
  $allCards.forEach(($card) => {
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
  });

  return () => {
    // Returns a teardown function to clean up for later
    AC.abort();
    $allCards.forEach(($card) => {
      // Manual reset here instead of revert()
      // Lazy solution because I dont want to keep record of each animate object for each card
      // Regardless I think animate objects are garbage collected after they are complete?
      $card.style.transform = "";
      $card.style.margin = "";
    });
  };
}
