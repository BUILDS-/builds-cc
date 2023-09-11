import 'styles/globals.css';

import * as React from 'react';
import { FC } from 'react';

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { ToastContainer } from "react-toastify";


const MyApp: FC<{ children: React.ReactElement }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const dark = colorScheme === "dark";

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
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
        <ToastContainer
          theme={dark ? "dark" : "light"}
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;