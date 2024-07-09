"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { createPublicClient, http } from "viem";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Tooltip from "@/components/Tooltip";
// import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";

const items = [
    {
        title: "$308.2",
        price: -0.1,
        tooltip: "Toolltip Available to trade",
        image: "/images/ethereum.png",
    },
    {
        title: "$308.2",
        price: 0.1,
        tooltip: "Toolltip Available to cash out",
        image: "/images/arrow-narrow-up-right.svg",
    },
];

const SignPage = () => {
    const loading = useWalletStore((state) => state.loading);
    const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
    const [messageId, setMessageId] = useState<string>("");
    const [signData, setSignData] = useState<any>(null)
    const searchParams = useSearchParams()
    // const communicator = new Communicator(window.opener, "");

    // useEffect(() => {
    //     communicator.onPopupLoaded(searchParams.get('id') || "");
    // }, [loading, wallet]);
    //
    // useEffect(() => {
    //     communicator.listenRequestMessage((message) => {
    //         setMessageId(message.id)
    //         setSignData({
    //             method: message.payload.method,
    //             data: message.payload.params[0]
    //         })
    //     })
    // }, )

    const onConfirm = async () => {
        if (!wallet) window.close()
        const ethClient = createPublicClient({
            chain: CHAINS["testnet"],
            transport: http(),
        });
        const account = new PasskeyAccount(wallet.passkeyCredentialId || "", 0n , 0n)

        const [userOp] = await account.sendTransactionOperation(ethClient, [
            {
                target: signData.data.to,
                value: signData.data.value || 0n,
                data: signData.data.data || "0x",
            },
        ]);

        const txHash = await handleUserOp(userOp);
        // communicator.sendResponseMessage(messageId, txHash)
        window.close();
    };

    const onReject = () => {
        window.opener.postMessage({ type: "sign-transaction", message: "Reject" }, "*");
    };

    // if (!signData) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="card-sidebar">
    //                 <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
    //                     Loading...
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card-sidebar max-w-[28.5rem] rounded-3xl w-full p-6 text-white shadow-lg">
                <div className="mb-4 text-xl text-center font-semibold">
                    Contract Interaction
                </div>
                <div className="mb-8 space-y-2">
                    <div className="text-base-2 text-theme-secondary">
                        Est. Transaction detail
                    </div>
                    {items.map((item, index) => (
                        <div className="flex items-center" key={index}>
                            <div
                                className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full ${
                                    index === 0
                                        ? "bg-theme-brand-100"
                                        : "bg-theme-green-100"
                                }`}
                            >
                                <Image
                                    src={item.image}
                                    width={48}
                                    height={48}
                                    alt=""
                                />
                            </div>
                            <div className="grow">
                                {item?.price > 0 ? <div className="text-3xl font-medium text-green-600">{`+${item?.price} WETH`}</div> :
                                    <div className="text-3xl font-medium">{`${item?.price} ETH`}</div>}
                                <div className="flex justify-between items-center">
                                    <div className="text-base-2 text-theme-secondary">
                                        {`≈ ${item.title}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-8 space-y-2">
                    <div className="text-base-2 text-theme-secondary">
                        Requested from
                    </div>
                    <div className="flex items-center">
                        <div className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full`}>
                            <Image
                                src={'/images/ethereum.png'}
                                width={48}
                                height={48}
                                alt=""
                            />
                        </div>
                        <div className="grow">
                            <div className="text-3xl font-medium">Uniswap Interface</div>
                            <div className="flex justify-between items-center">
                                <div className="text-base-2 text-theme-secondary">
                                    app.uniswap.org
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full mt-6">
                    <button onClick={onConfirm} className="btn-secondary mr-2 w-1/2 px-4">
                        Confirm
                    </button>
                    <button onClick={onReject} className="btn-gray w-1/2 px-4">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SignPage;
