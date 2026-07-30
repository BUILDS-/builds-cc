import { createLayout, type AutoLayout } from "animejs";
import { assertExist } from "@lib/fp";
import isMobile from "@scripts/isMobile";

type Layout = "grid" | "drag";
let $switchHighlight: HTMLElement | null = null;
let layoutControl: AutoLayout | null = null; // Drives the sliding highlight between buttons

export function initSwitchHighlight() {
  // Same idea as NavMenu's initNavLayout:
  const $layoutSwitch = document.querySelector<HTMLElement>(".layout-switch");
  assertExist($layoutSwitch, "$layoutSwitch does not exist");
  layoutControl = createLayout($layoutSwitch, {
    ease: "out(5.82)",
    children: "span",
  });
  $switchHighlight = document.querySelector<HTMLElement>(".switch-highlight");
}

export function initControls(
  $eventsContainer: HTMLDivElement,
  $allCards: NodeListOf<HTMLDivElement>,
  switchLayout: (
    // This parameter solves a circular depencency issue
    $ec: HTMLDivElement,
    $ac: NodeListOf<HTMLDivElement>,
    l: Layout,
  ) => void,
) {
  const $controls = document.querySelector(".controls");
  assertExist($controls, "$controls does not exist");
  if (isMobile()) {
    // If we're on mobile completely remove the controls
    $controls.remove();
  } else {
    $controls.addEventListener("click", (e) => {
      const $btn = (e.target as HTMLElement).closest("button");
      const layout = $btn?.id;
      if (layout === "grid" || layout === "drag") {
        // Slide the highlight into the clicked button (NavMenu pattern)
        layoutControl?.update(() => $btn!.appendChild($switchHighlight!));
        switchLayout($eventsContainer, $allCards, layout);
      }
    });
  }
}

export function teardownControls() {
  layoutControl?.revert();
  layoutControl = null;
  $switchHighlight = null;
}
