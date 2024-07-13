export const signMethods = {
  contractInteraction: ['eth_signTransaction', "eth_sendTransaction"],
  signMessage: ["personal_sign", "eth_sign"],
} as const

export type MethodCategory = keyof typeof signMethods;
export type Method<C extends MethodCategory = MethodCategory> =
  (typeof signMethods)[C][number];