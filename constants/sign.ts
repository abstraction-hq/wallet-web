export const signMethods = {
  contractInteraction: ['eth_signTransaction', "eth_sendTransaction"],
  multiCall: ['wallet_sendCalls'],
  signMessage: ["personal_sign"],
  signTypeData: ["eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4"],
} as const

export type MethodCategory = keyof typeof signMethods;
export type Method<C extends MethodCategory = MethodCategory> =
  (typeof signMethods)[C][number];