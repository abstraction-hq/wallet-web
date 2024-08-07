import { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Addresses {
  chainId: number
  address: Address
}

export interface PasskeyInfo {
  passkeyCredentialId: string
  x: string
  y: string
}

export interface MnemonicInfo {
  encryptedMnemonic: string
}

export interface IWallet {
  id: number;
  name: string;
  passkeyAuthorization?: PasskeyInfo;
  mnemonicAuthorization?: MnemonicInfo;
  addresses: Addresses[];
}

interface IWalletStoreState {
  wallets: IWallet[];
  activeWallet: number;
  activeNetwork: number;
  loading: boolean;
  activeAddress: () => Address | undefined;
  onCreateWallet: (wallet: IWallet) => void;
  setActiveWallet: (id: number) => void;
}

export const useWalletStore = create<IWalletStoreState>()(
  persist(
    (set, get) => ({
      wallets: [],
      activeWallet: 0,
      activeNetwork: 97,
      loading: true,
      activeAddress: () => get().wallets[get().activeWallet]?.addresses?.find((address) => address.chainId === get().activeNetwork)?.address,
      onCreateWallet: (wallet: IWallet) => {
        set((state) => ({
          ...state,
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
      setActiveNetwork: (network: number) => {
        set((state) => ({
          ...state,
          activeNetwork: network,
        }));
      }
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
