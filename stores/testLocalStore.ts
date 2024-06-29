import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLocalStore = create()(
  persist(
    (set) => ({
      data: 0,
      loading: true,
      increment: () => set((state: any) => ({ data: state.data + 1 })),
      decrement: () => set((state: any) => ({ data: state.data - 1 })),
    }),
    {
      name: "localStore",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state: any) => {
        return (state: any, error) => {
          if (error) {
            console.error("Failed to rehydrate state", error);
          }
          state.loading = false;
        }
      },
    }
  )
);
