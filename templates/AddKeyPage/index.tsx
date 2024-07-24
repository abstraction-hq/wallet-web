"use client";
import { Communicator } from "@abstraction-hq/wallet-sdk";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpHandle from "../CreatePage/SignUpHandle";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Loading from "@/components/Loading";
import PasskeyAccount from "@/account/passkeyAccount";
import { ethClient } from "@/config";
import { PASSKEY } from "@/constants";
import { encodeFunctionData } from "viem";
import Passkey from "@/abis/Passkey.json"
import toast from "react-hot-toast";
import { submitUserOp } from "@/utils/bundler";

const AddKeyPage: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const searchParams = useSearchParams();

  const passkeyId = searchParams.get("passkeyId");
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const device = searchParams.get("device");

  const onConnect = async () => {
    const account = new PasskeyAccount(
      wallet.passkeyCredentialId || "",
      0n,
      0n
    );

    const [userOp, userOpHash] = await account.sendTransactionOperation(
      ethClient,
      [
        {
          target: PASSKEY,
          value: 0,
          data: encodeFunctionData({
            abi: Passkey.abi,
            functionName: "registerPublicKey",
            args: [passkeyId, x, y],
          }),
        },
      ]
    );

    toast.promise(submitUserOp(userOp), {
      loading: "Sending...",
      success: (data) => <div>Transaction Success - <a href={`https://vicscan.xyz/tx/${data.userOpHash}`} target="_blank">Click to view on scan</a></div>,
      error: (err) => <div>Transaction Fail - <a href={`https://vicscan.xyz/tx/${err.userOpHash}`} target="_blank">Click to view on scan</a></div>,
    })

    window.close();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[28.5rem] w-full p-6 text-white">
        <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
          Login Request
        </div>
        <div className="mb-3 text-sm">
          <div className="flex items-center border-t border-theme-stroke py-3">
            <div className="flex flex-col text-left w-4/5">
              <div className="flex items-center">
                <div className="text-base-1 text-theme-secondary">
                  Accounts connect
                </div>
              </div>
              <div className="text-base-1s font-medium text-theme-primary">
                {wallet?.senderAddress}
              </div>
            </div>
            <div className="flex justify-end w-1/5">
              <Icon
                className="fill-theme-primary md:ml-1.5"
                name="arrow-next"
              />
            </div>
          </div>
        </div>
        <div className="mb-3 text-sm">
          <div className="flex items-center border-t border-theme-stroke py-3">
            <div className="flex flex-col text-left w-4/5">
              <div className="flex items-center">
                <div className="text-base-1 text-theme-secondary">
                  Passkey Id
                </div>
              </div>
              <div className="text-base-1s font-medium text-theme-primary">
                {passkeyId}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 text-sm">
          <div className="flex items-center border-t border-theme-stroke py-3">
            <div className="flex flex-col text-left w-4/5">
              <div className="flex items-center">
                <div className="text-base-1 text-theme-secondary">
                  Passkey X
                </div>
              </div>
              <div className="text-base-1s font-medium text-theme-primary">
                {x}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 text-sm">
          <div className="flex items-center border-t border-theme-stroke py-3">
            <div className="flex flex-col text-left w-4/5">
              <div className="flex items-center">
                <div className="text-base-1 text-theme-secondary">
                  Passkey Y
                </div>
              </div>
              <div className="text-base-1s font-medium text-theme-primary">
                {y}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-theme-stroke mt-3 py-3">
          <div className="flex items-center">
            <div className="flex justify-start">
              <Tooltip className="-mb-0.25 md:mb-0" title={"Tip"} />
            </div>
            <div className="flex flex-col w-4/5 ml-4 text-left text-red-500">
              <div className="text-base-1s font-medium">
                PLEASE READ CAREFULLY BEFORE ACCEPT: This action Allow the key
                access to your account, the key can be used to send any
                transaction on your behalf.
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button
              onClick={onConnect}
              className="btn-secondary mr-2 w-full px-4"
            >
              ACCEPT LOGIN REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKeyPage;
