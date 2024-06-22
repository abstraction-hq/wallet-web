import { defineChain } from "viem"

export const vicTestnet = defineChain({
    id: 89,
    name: 'Viction Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Viction',
        symbol: 'VIC',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.viction.xyz'],
            webSocket: ['wss://ws-testnet.viction.xyz'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://testnet.vicscan.xyz' },
    },
    testnet: true
})

export const CHAINS: any = {
    "testnet": vicTestnet
}