"use client";
import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpHandle from "../SignUpPage/SignUpHandle";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";

const ConnectPage: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [dappInfo, setDappInfo] = useState<any>({});
  const [messageId, setMessageId] = useState<string>("");
  const searchParams = useSearchParams();
  const communicator = new Communicator(window.opener, "");

  useEffect(() => {
    communicator.onPopupLoaded(searchParams.get("id") || "");
  }, [loading, wallet]);

  useEffect(() => {
    communicator.listenRequestMessage((message) => {
      setDappInfo(message.payload.dappInfo);
      setMessageId(message.id);
      console.log("message", message);
    });
  });

  const onConnect = () => {
    communicator.sendResponseMessage(messageId, [wallet.senderAddress]);
    window.close();
  };

  const onReject = () => {
    communicator.sendResponseMessage(messageId, "rejected");
    window.close();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wallet) {
    return <SignUpHandle allowToggle={false} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[28.5rem] w-full p-6 text-white">
        <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
          Connect Account
        </div>
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">Requested from</div>
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full`}
            >
              <Image src={dappInfo.icon} width={48} height={48} alt="" />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">
                {dappInfo.title}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  {dappInfo.hostname}
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <div className="mb-30 text-sm">
            <div className="flex items-center border-t border-theme-stroke py-3">
              <div className="flex flex-col text-left w-4/5">
                <div className="flex items-center">
                  <div className="text-base-1 text-theme-secondary">
                    Accounts connect
                  </div>
                </div>
                <div className="text-base-1s font-medium text-theme-primary">
                  {wallet.senderAddress}
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
        </>
        <div className="border-t border-theme-stroke mt-30 py-3">
          <div className="flex items-center">
            <div className="flex justify-start">
              <Tooltip className="-mb-0.25 md:mb-0" title={"Tip"} />
            </div>
            <div className="flex flex-col w-4/5 ml-4 text-left">
              <div className="text-base-1s font-medium text-theme-primary">
                Allow current DApp to connect Abstraction Wallet
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button
              onClick={onConnect}
              className="btn-secondary mr-2 w-1/2 px-4"
            >
              Connect
            </button>
            <button onClick={onReject} className="btn-gray w-1/2 px-4">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
