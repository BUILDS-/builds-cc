import { GAP, GAPDesktop } from "@lib/constants";

export type SVGGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SVGFrame = {
  inner: SVGGeometry;
  outer: SVGGeometry;
};

export function calcFrame(vw: number, vh: number, isMobile: boolean): SVGFrame {
  const outer = { x: 0, y: 0, width: vw, height: vh };

  const inner = isMobile
    ? {
        x: GAP,
        y: GAP * 2,
        width: vw - 2 * GAP,
        height: vh - 3 * GAP,
      }
    : {
        x: GAPDesktop,
        y: GAPDesktop * 3,
        width: vw - 2 * GAPDesktop,
        height: vh - 4 * GAPDesktop,
      };

  return { outer, inner };
}
