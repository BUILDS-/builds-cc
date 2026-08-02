import {
  animate,
  stagger,
  spring,
  createDraggable,
  type Draggable,
  type DOMTargetSelector,
} from "animejs";
import { assertExist } from "@lib/fp";

const animateConfig = {
  x: stagger(26),
  y: stagger(26),
  // ease: linear(0, 1),
  ease: spring({
    bounce: -1,
    duration: 100,
  }),
  duration: 200,
};

export function initDrag(
  $eventsContainer: HTMLDivElement,
  $allCards: NodeListOf<HTMLDivElement>,
): Draggable[] {
  const allDraggable: Draggable[] = Array.from($allCards)
    .toReversed()
    .map(($card) => {
      const $tbar = $card.querySelector(".title-bar") as DOMTargetSelector;
      assertExist($tbar, "$tbar does not exist");
      const d = createDraggable($card, {
        trigger: $tbar,
        container: $eventsContainer,
        maxVelocity: 100,
      });
      return d;
    });
  return allDraggable;
}

export function offsetAnim($allDraggable: Draggable[]): () => void {
  animate($allDraggable, animateConfig);

  return () => {
    // Returns a teardown function to clean up for later
    for (const $drag of $allDraggable) {
      $drag.revert();
    }
  };
}
