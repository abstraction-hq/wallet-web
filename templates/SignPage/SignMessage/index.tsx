"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { useWalletStore } from "@/stores/walletStore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { concat, createPublicClient, hashMessage, http } from "viem";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon";
import { ethClient } from "@/config";
import Wallet from "@/abis/Wallet.json";
import { copyToClipboard } from "@/utils/browser";

type SignMessageProps = {
  signData: any;
  onConfirm: (returnValue: any) => void;
  onReject: () => void;
};

const SignMessage = ({ onConfirm, onReject, signData }: SignMessageProps) => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);

  const onSignMessage = async () => {
    const signMessage = hashMessage(signData?.params[0]);

    const account = new PasskeyAccount(
      wallet.passkeyCredentialId || "",
      0n,
      0n,
      wallet.senderAddress
    );

    const signature = concat([
      account.getSignerAddress(),
      account.getSignerAddress(), // double check in passkey module
      await account.signMessage(signMessage),
    ]) 

    onConfirm(signature)
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[28.5rem] w-full p-6 text-white">
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
                src={signData?.dappInfo?.icon}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">
                {signData?.dappInfo?.title}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  {signData?.dappInfo?.hostname}
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
                  {wallet?.senderAddress}
                </div>
              </div>
              <div className="flex justify-end w-1/5" onClick={() => copyToClipboard(wallet?.senderAddress)}>
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="flex flex-col text-left w-4/5">
                <div className="flex items-center">
                  <div className="text-base-1 text-theme-secondary">Data</div>
                </div>
                <div className="text-base-1s font-medium text-theme-primary">
                  {signData?.params[0]}
                </div>
              </div>
              <div className="flex justify-end w-1/5" onClick={() => copyToClipboard(signData?.params[0])}>
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
          </div>
        </>
        <div className="flex justify-center w-full mt-6">
          <button onClick={onSignMessage} className="btn-secondary mr-2 w-1/2 px-4">
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
export default SignMessage;
