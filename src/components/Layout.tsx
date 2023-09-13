import * as React from "react";
import { FC } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mantine/core";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ToastContainer } from "react-toastify";
import { Location } from "@reach/router";

const Layout: FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const dark = colorScheme === "dark";

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Location>
      {() => (
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
              primaryColor: "red",
              primaryShade: { light: 6, dark: 8 },
            }}
          >
            <Navbar />
            <Box>
              {children}
            </Box>
            <Footer />
          </MantineProvider>
          <ToastContainer
            theme={dark ? "dark" : "light"}
            autoClose={2000}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
        </ColorSchemeProvider>
      )}
    </Location>
  );
}

export default Layout;