import { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IWallet {
  id: number;
  name: string;
  passkeyCredentialId?: string;
  senderAddress: Address;
  signerAddress?: Address;
}

interface IWalletStoreState {
  wallets: IWallet[];
  activeWallet: number;
  loading: boolean;
  onCreateWallet: (wallet: IWallet) => void;
  setActiveWallet: (id: number) => void;
}

export const useWalletStore = create<IWalletStoreState>()(
  persist(
    (set) => ({
      wallets: [],
      activeWallet: 0,
      loading: true,
      onCreateWallet: (wallet: IWallet) => {
        set((state) => ({
          wallets: [...state.wallets, wallet],
          activeWallet: wallet.id,
        }));
      },
      setActiveWallet: (id: number) => {
        set((state) => ({
          ...state,
          activeWallet: id,
        }));
      },
    }),
    {
      name: "walletStore",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (_: IWalletStoreState) => {
        return (state: IWalletStoreState | undefined, error: unknown) => {
          if (error) {
            console.log(state)
            console.error("Failed to rehydrate state", error);
          } 

          if (state) {
            state.loading = false
          }
        }
      },
    }
  )
);
