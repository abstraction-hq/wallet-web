import { create } from "zustand";

export interface IDapp {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface IDappStoreState {
  dapp: IDapp | null;
  setDapp: (dapp: IDapp) => void;
}

const useConnectDappStore = create<IDappStoreState>((set) => ({
  dapp: null,
  setDapp: (dapp) => set({ dapp }),
}));

export default useConnectDappStore;