import { createLayout, type AutoLayout } from "animejs";
import { assertExist, assertNever } from "@lib/fp";
import isMobile from "@scripts/isMobile";
import { teardownDialog, initModal } from "./dialog";
import {
  initControls,
  initSwitchHighlight,
  teardownControls,
} from "./controls";
import { initGrid, gridIntroAnim } from "./grid";
import { offsetAnim, initDrag } from "./drag";

type Layout = "grid" | "drag";
let currLayout: Layout | null = null;
let teardown: (() => void) | null = null;
let autoLayout: AutoLayout | null = null; // Holds object returned from createLayout()

const LAYOUT_CONFIG = {
  grid: { duration: 300, ease: "out(3)" },
  drag: { duration: 200, ease: "out(3)" },
};

function reverseDOM($htmlElm: HTMLElement) {
  // Only 1 render with fragement (neat little thingy)
  // Prevents browser from re-rendering when you append each card
  const frag = document.createDocumentFragment();
  const children = Array.from($htmlElm.children).toReversed();
  frag.append(...children);
  $htmlElm.appendChild(frag);
}

function updateFn($eventsContainer: HTMLDivElement, layout: Layout) {
  // This is a small helper to only be called for switchLayout
  reverseDOM($eventsContainer);
  assertExist(
    teardown,
    "teardown should exist at this point, something went wrong",
  );
  teardown();
  teardown = null;
  $eventsContainer.dataset.layout = layout;
}

function switchLayout(
  $eventsContainer: HTMLDivElement,
  $allCards: NodeListOf<HTMLDivElement>,
  layout: Layout,
) {
  if (currLayout === layout || currLayout == null) return; // Why switch if we on the same layout alr
  // Or no Layout set yet, must be on page load

  assertExist(
    autoLayout,
    "autoLayout should exist at this point, something went wrong",
  );

  currLayout = layout;

  autoLayout
    .update(() => {
      updateFn($eventsContainer, layout);
    }, LAYOUT_CONFIG[layout])
    .then(() => {
      if (currLayout !== layout) return; // user must've switched layout
      switch (layout) {
        case "grid":
          teardown = initGrid($allCards);
          return;
        case "drag":
          const allDraggable = initDrag($eventsContainer, $allCards);
          teardown = offsetAnim(allDraggable);
          return;
        default:
          assertNever(layout);
      }
    });
}

/* --- Page initialization --- */
export default function setup() {
  // In the case user navigated away in drag mode, tear it all down.
  teardown?.();
  teardown = null;
  autoLayout?.revert();
  autoLayout = null;
  currLayout = null;

  teardownControls();
  teardownDialog();

  const $clubEventsDiv = document.querySelector<HTMLDivElement>(".club-events");
  assertExist($clubEventsDiv, "$clubEventsDiv does not exist");

  const naturalHeight = $clubEventsDiv.getBoundingClientRect().height;
  $clubEventsDiv.style.height = `${naturalHeight}px`;

  const $allCards = document.querySelectorAll<HTMLDivElement>(".event-card");

  autoLayout = createLayout($clubEventsDiv, {
    children: [".event-card", "p", "img"],
  });

  initModal($clubEventsDiv);
  initControls($clubEventsDiv, $allCards, switchLayout);

  // .controls is removed on mobile, so only wire the highlight on desktop.
  // The .switch-highlight span starts inside #grid, matching the initial grid layout.
  if (!isMobile()) initSwitchHighlight();

  gridIntroAnim($allCards);
  currLayout = "grid";
  teardown = initGrid($allCards);
}
