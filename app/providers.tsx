"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider>{children}</ChakraProvider>
      <ProgressBar
        color="green"
        height="2px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
