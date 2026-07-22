import { MOBILE_BREAK } from "@lib/constants";

export default function isMobile(): boolean {
  return window.innerWidth <= MOBILE_BREAK;
}
