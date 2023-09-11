import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import MyApp from "./src/_app";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return (
    <MyApp>
      { element }
    </MyApp>
  )
}