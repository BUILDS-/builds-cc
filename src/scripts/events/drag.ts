import {
  animate,
  stagger,
  linear,
  createDraggable,
  type Draggable,
  type DOMTargetSelector,
} from "animejs";
import { assertExist } from "@lib/fp";

const animateConfig = {
  x: stagger(26),
  y: stagger(26),
  delay: stagger(50),
  ease: linear(0, 1),
  duration: 100,
};

export function initDrag(
  $eventsContainer: HTMLDivElement,
  $allCards: NodeListOf<HTMLDivElement>,
): Draggable[] {
  const allDraggable: Draggable[] = [];
  $allCards.forEach(($card) => {
    const $tbar = $card.querySelector(".title-bar") as DOMTargetSelector;
    assertExist($tbar, "$tbar does not exist");
    const d = createDraggable($card, {
      trigger: $tbar,
      container: $eventsContainer,
      maxVelocity: 100,
    });
    allDraggable.push(d);
  });
  return allDraggable;
}

export function offsetAnim($allDraggable: Draggable[]): () => void {
  animate($allDraggable, animateConfig);

  return () => {
    $allDraggable.forEach(($draggable) => {
      $draggable.revert();
    });
  };
}
