import { createLayout, type Draggable, type AutoLayout } from "animejs";
import { assertExist } from "@lib/fp";
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
let allDraggable: Draggable[] = []; // Holds all draggable elements, used to disable them later
let teardown: (() => void) | null = null;
let autoLayout: AutoLayout | null = null; // Holds object returned from createLayout()

function reverseDOM($eventsContainer: HTMLDivElement) {
  // A neat DOM feature with fragment
  // Prevents browser from re-rendering when you append each card
  // Only 1 render with fragement
  const frag = document.createDocumentFragment();
  const children = Array.from($eventsContainer.children);
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child !== undefined) frag.appendChild(child);
  }
  $eventsContainer.appendChild(frag);
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

  switch (layout) {
    case "grid":
      autoLayout
        .update(
          () => {
            reverseDOM($eventsContainer);
            assertExist(
              teardown,
              "teardown should exist at this point, something went wrong",
            );
            teardown();
            teardown = null;
            allDraggable = [];
            $eventsContainer.dataset.layout = layout;
          },
          { duration: 300, ease: "out(3)" },
        )
        .then(() => {
          if (currLayout !== layout) return; // user must've switched layout
          teardown = initGrid($allCards);
        });
      return;
    case "drag":
      autoLayout
        .update(
          () => {
            reverseDOM($eventsContainer);
            assertExist(
              teardown,
              "teardown should exist at this point, something went wrong",
            );
            teardown();
            teardown = null;
            $eventsContainer.dataset.layout = layout;
          },
          {
            duration: 250,
            ease: "out(3)",
          },
        )
        .then(() => {
          if (currLayout !== layout) return;
          allDraggable = initDrag($eventsContainer, $allCards);
          teardown = offsetAnim(allDraggable);
        });
      return;
    default:
      throw new Error("Impossible state");
  }
}

/* --- Page initialization --- */
export default function setup() {
  // In the case user navigated away in drag mode, tear it all down.
  teardown?.();
  teardown = null;
  allDraggable.forEach((d) => {
    // console.log(`draggable: ${d}`);
    d.revert();
  });
  allDraggable = [];
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
