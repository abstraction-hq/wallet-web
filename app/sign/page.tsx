"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { createPublicClient, http } from "viem";
import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";

const SignTransactionPage: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [messageId, setMessageId] = useState<string>("");
  const [signData, setSignData] = useState<any>(null)
  const searchParams = useSearchParams()
  const communicator = new Communicator(window.opener);

  useEffect(() => {
    communicator.onPopupLoaded(searchParams.get('id') || "");
  }, [loading, wallet]);

  useEffect(() => {
    communicator.listenRequestMessage((message) => {
      setMessageId(message.id)
      setSignData({
        method: message.payload.method,
        data: message.payload.params[0]
      })
    })
  }, )

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
    communicator.sendResponseMessage(messageId, txHash)
    window.close();
  };

  const onReject = () => {
    window.opener.postMessage({ type: "sign-transaction", message: "Reject" }, "*");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card-sidebar">
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Sign transaction
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Method: {signData?.method}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          From: {signData?.data.from}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          To: {signData?.data.to}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Value: {signData?.data.value}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Data: {signData?.data.data}
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

export default SignTransactionPage;