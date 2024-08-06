"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import theme from "./theme";
import { useWalletStore } from "@/stores/walletStore";
import useAssetStore from "@/stores/assetStore";
import { useEffect } from "react";
import { ethClient } from "@/config";

export function Providers({ children }: { children: React.ReactNode }) {
  const loading = useWalletStore((state) => state.loading);
  const walletAddress = useWalletStore((state) => state.activeAddress)();
  const fetchWalletBalance = useAssetStore((state) => state.fetchData);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (walletAddress) {
      // TODO: Fetch balance on third party service
      ethClient.watchBlockNumber({
        onBlockNumber: (blockNumber) => {
          fetchWalletBalance(walletAddress);
        },
        onError: (error) => {
          console.error("Error fetching block number", error);
        },
      })
    }
  }, [walletAddress, loading, fetchWalletBalance]);

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
      <Toaster position="top-center" />
    </>
  );
}
