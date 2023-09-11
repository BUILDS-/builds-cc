import * as React from "react";
import { FC } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mantine/core";

const Layout: FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box>
        {children}
      </Box>
      <Footer />
    </>
  );
}

export default Layout;