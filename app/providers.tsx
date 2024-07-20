"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import theme from "./theme";
import { useWalletStore } from "@/stores/walletStore";
import useAssetStore from "@/stores/assetStore";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const fetchWalletBalance = useAssetStore((state) => state.fetchData);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (wallet) {
      fetchWalletBalance(wallet?.senderAddress);
    }
  }, [wallet, loading, fetchWalletBalance]);

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
