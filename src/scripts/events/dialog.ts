import { animate, createLayout, type AutoLayout } from "animejs";
import { assertExist } from "@lib/fp";

/*
 * NOTE: This section is AI assisted
 *
 * I also referenced Animejs's talented author Julian Garnier's codepen ALOT here,
 * https://codepen.io/juliangarnier/pen/PwzmxwR
 *
 * I of course wrote (YOINKED) it all myself  :)
 *
 * Jokes aside Julian's pen was invaluable to this section of code
 * */

let $dialog: HTMLDialogElement | null = null;
let $shownCard: HTMLElement | null = null;
let dialogLayout: AutoLayout | null = null;
let modalTeardown: (() => void) | null = null;

function openModal($card: HTMLElement) {
  assertExist($dialog, "$dialog does not exist");
  assertExist(dialogLayout, "dialogLayout does not exist");

  const $clone = document.createElement("div");
  $clone.className = $card.className;
  const layoutId = $card.dataset.layoutId;
  if (layoutId) $clone.dataset.layoutId = layoutId;

  $clone.innerHTML = $card.innerHTML;
  $clone.removeAttribute("style");
  $clone.querySelectorAll("*").forEach(($el) => $el.removeAttribute("style"));

  $dialog.innerHTML = "";
  $dialog.appendChild($clone);

  $shownCard = $card;

  dialogLayout
    .update(() => {
      $card.classList.add("is-open");
      // showModal is a HTMLDialogElement method builtin to the browser
      $dialog!.showModal();
    })
    .then(() => {
      const $info = $dialog!.querySelector(".dialog-info-wrapper");
      if ($info) {
        animate($info, {
          opacity: 1,
          y: { from: "8px" },
          duration: 150,
          ease: "out(3)",
        });
      }
    });
}

function closeModal() {
  if (!$dialog || !dialogLayout || !$shownCard) return;
  const $card = $shownCard;
  const $info = $dialog!.querySelector(".dialog-info-wrapper");
  if ($info) {
    animate($info, {
      opacity: [1, 0],
      y: [0, 8],
      duration: 100,
      ease: "out(3)",
    }).then(() => {
      dialogLayout!.update(() => {
        // Please forgive the assertions I am getting lazy a little
        $dialog!.close();
        // preventScroll avoids a jump that would break the closing animation.
        $card.focus({ preventScroll: true });
        $card.classList.remove("is-open");
      });
      $shownCard = null;
    });
  }
}

export function teardownDialog() {
  modalTeardown?.();
  dialogLayout?.revert();
  dialogLayout = null;
  $shownCard = null;
  if ($dialog) {
    if ($dialog.open) $dialog.close();
    $dialog.remove();
    $dialog = null;
  }
}

export function initModal($eventsContainer: HTMLDivElement) {
  // Reuse an existing dialog across swup navigations instead of stacking new ones.
  let $existing = document.querySelector<HTMLDialogElement>("#layout-dialog");
  if (!$existing) {
    $existing = document.createElement("dialog");
    $existing.id = "layout-dialog";
    document.body.appendChild($existing);
  }
  $dialog = $existing;
  dialogLayout = createLayout($dialog, {
    children: [
      ".event-card",
      ".title-bar",
      ".title-bar p",
      "img",
      ".dialog-info-wrapper",
    ],
    properties: ["--overlay-alpha"],
    duration: 350,
  });

  const onContainerClick = (e: MouseEvent) => {
    const $img = (e.target as HTMLElement).closest("img");
    if ($img !== null) {
      const $card = $img.closest<HTMLElement>(".event-card");
      if ($card !== null) openModal($card);
    }
  };
  const onDialogClick = (e: MouseEvent) => {
    const $target = e.target as HTMLElement;
    if ($target.closest(".close-overlay") || $target === $dialog) {
      closeModal();
    }
  };
  const onCancel = (e: Event) => {
    e.preventDefault(); // let the layout animation run instead of an instant close
    closeModal();
  };

  $eventsContainer.addEventListener("click", onContainerClick);
  $dialog.addEventListener("click", onDialogClick);
  $dialog.addEventListener("cancel", onCancel);

  modalTeardown = () => {
    $eventsContainer.removeEventListener("click", onContainerClick);
    $dialog?.removeEventListener("click", onDialogClick);
    $dialog?.removeEventListener("cancel", onCancel);
  };
}
