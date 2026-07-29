const navOpen = new CustomEvent("navOpen");
const navClose = new CustomEvent("navClose");

export function isNavOpen(): boolean {
  return document.body.hasAttribute("data-nav-open");
}

export function openNav(): void {
  if (isNavOpen()) return;
  document.body.setAttribute("data-nav-open", "");
  document.dispatchEvent(navOpen);
}

export function closeNav(): void {
  if (!isNavOpen()) return;
  document.body.removeAttribute("data-nav-open");
  document.dispatchEvent(navClose);
}

export function toggleNav(): void {
  isNavOpen() ? closeNav() : openNav();
}
