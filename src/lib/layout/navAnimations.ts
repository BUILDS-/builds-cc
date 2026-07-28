import { NAV_DURATION, NAV_EASE, NAV_SLIDE_DIST } from "@lib/constants";

/*
 * Using "+=" and "-=" is not the best choice because drifting will
 * occur if someone mashes the mobile nav icon...
 *
 * But it's probably ok because the animation is fairly fast.
 * So dont mash the nav icons pls 😭
 */

export function navSlideParams(op: "open" | "close") {
  const params = {
    duration: NAV_DURATION,
    ease: NAV_EASE,
    top: `${op === "open" ? "+=" : "-="}${NAV_SLIDE_DIST}`,
  };

  return params;
}

export function frameMorphParams(op: "open" | "close") {
  const params = {
    duration: NAV_DURATION,
    ease: NAV_EASE,
    y: `${op === "open" ? "+=" : "-="}${NAV_SLIDE_DIST}`,
    height: `${op === "open" ? "-=" : "+="}${NAV_SLIDE_DIST}`,
  };

  return params;
}
