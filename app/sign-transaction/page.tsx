"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { createPublicClient, http } from "viem";

const SignTransactionPage: NextPage = () => {
  const [signTransactionRequest, setSignTransactionRequest] = React.useState<any>(null);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== window.opener.origin) return;
      if (event.data.type === "sign-transaction-request") {
        setSignTransactionRequest(event.data.message);
      }
    });
  }, []);

  useEffect(() => {
    window.opener.postMessage({ type: "sign-transaction", message: "PopupLoaded" }, "*");
  }, []);

  const onConfirm = async () => {
    if (!wallet) window.close()
    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });
    const account = new PasskeyAccount(wallet.passkeyCredentialId || "", 0n , 0n)

    const [userOp] = await account.sendTransactionOperation(ethClient, [
      {
        target: signTransactionRequest.target,
        value: signTransactionRequest.value,
        data: signTransactionRequest.data,
      },
    ]);

    const txHash = await handleUserOp(userOp);

    window.opener.postMessage({ type: "sign-transaction-response", message: txHash }, "*");
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
          To: {signTransactionRequest?.target}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Value: {signTransactionRequest?.value}
        </div>
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Data: {signTransactionRequest?.data}
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