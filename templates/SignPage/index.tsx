"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createPublicClient, http } from "viem";
import ContractInteraction from "./ContractInteraction";
import SignMessage from "./SignMessage";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";
// import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";

const SignPage = () => {
    const loading = useWalletStore((state) => state.loading);
    const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
    const [messageId, setMessageId] = useState<string>("");
    const [signData, setSignData] = useState<any>(null)
    const searchParams = useSearchParams();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(wallet.senderAddress).then(
            (err) => {
                console.error("Failed to copy text: ", err);
            }
        );
    };
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
    if (!wallet) window.close();
    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });
    const account = new PasskeyAccount(
      wallet.passkeyCredentialId || "",
      0n,
      0n
    );

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
    window.opener.postMessage(
      { type: "sign-transaction", message: "Reject" },
      "*"
    );
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
        <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
          Sign Message
        </div>
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">Requested from</div>
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full`}
            >
              <Image
                src={"/images/viction.jpeg"}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">
                Uniswap Interface
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  app.uniswap.org
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <div className="mb-4 text-sm">
            <div className="flex items-center border-t border-theme-stroke py-3">
              <div className="flex flex-col text-left w-4/5">
                <div className="flex items-center">
                  <div className="text-base-1 text-theme-secondary">
                    Wallet used
                  </div>
                </div>
                <div className="text-base-1s font-medium text-theme-primary">
                  {wallet.senderAddress}
                </div>
              </div>
              <div className="flex justify-end w-1/5">
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="flex flex-col text-left w-4/5">
                <div className="flex items-center">
                  <div className="text-base-1 text-theme-secondary">Data</div>
                </div>
                <div className="text-base-1s font-medium text-theme-primary">
                  0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
                </div>
              </div>
              <div className="flex justify-end w-1/5">
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
          </div>
        </>
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
};
export default SignPage;
