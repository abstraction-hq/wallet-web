"use client";
// import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpHandle from "../SignUpPage/SignUpHandle";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";

const items = [
    {
        title: "$308.2",
        price: -0.1,
        tooltip: "Toolltip Available to trade",
        image: "/images/viction.jpeg",
    },
    {
        title: "$308.2",
        price: 0.1,
        tooltip: "Toolltip Available to cash out",
        image: "/images/arrow-narrow-up-right.svg",
    },
];

const ConnectPage: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [dappInfo, setDappInfo] = useState<any>({});
  const [messageId, setMessageId] = useState<string>("");
  const searchParams = useSearchParams();
  // const communicator = new Communicator(window.opener);
  //
  // useEffect(() => {
  //   communicator.onPopupLoaded(searchParams.get("id") || "");
  // }, [loading, wallet]);

  // useEffect(() => {
  //   communicator.listenRequestMessage((message) => {
  //     setDappInfo(message.payload.dappInfo);
  //     setMessageId(message.id);
  //     console.log("message", message);
  //   });
  // });

  // const onConnect = () => {
  //   communicator.sendResponseMessage(messageId, [wallet.senderAddress]);
  //   window.close();
  // };

  const onReject = () => {
    window.opener.postMessage({ type: "connect", message: "Reject" }, "*");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wallet) {
    return <SignUpHandle allowToggle={false} />;
  }

  return (
    // <div className="flex flex-col items-center justify-center">
    //   <h1 className="text-3xl font-bold mb-4">Connect</h1>
    //   <img
    //     className="w-16 h-16 mb-2"
    //     src={dappInfo.icon}
    //     alt={dappInfo.title}
    //   />
    //   <h2 className="text-xl font-semibold mb-2">{dappInfo.title}</h2>
    //   <p className="text-gray-500 mb-4">{dappInfo.hostname}</p>
    //   <p className="text-lg mb-4">Would you like to connect?</p>
    //   <div className="flex items-center py-3">
    //     <div className="flex flex-col w-4/5">
    //       <div className="flex items-center">
    //         <div className="text-base-1 text-theme-secondary">
    //           Selected Wallet
    //         </div>
    //       </div>
    //       <div className="text-base-1s font-medium">
    //         {wallet.senderAddress}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex space-x-4">
    //     <button
    //       className="px-4 py-2 bg-red-500 text-white rounded"
    //       onClick={onReject}
    //     >
    //       Reject
    //     </button>
    //     <button
    //       className="px-4 py-2 bg-green-500 text-white rounded"
    //       onClick={onConnect}
    //     >
    //       Accept
    //     </button>
    //   </div>
    // </div>
      <div className="flex justify-center items-center min-h-screen">
          <div className="card-sidebar max-w-[28.5rem] rounded-3xl w-full p-6 text-white shadow-lg">
              <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
                  Connect Account
              </div>
              <div className="mb-4 space-y-1">
                  <div className="text-base-2 text-theme-secondary">
                      Requested from
                  </div>
                  <div className="flex items-center">
                      <div className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full`}>
                          <Image
                              src={'/images/viction.jpeg'}
                              width={48}
                              height={48}
                              alt=""
                          />
                      </div>
                      <div className="grow">
                          <div className="text-3xl text-theme-primary font-medium">Uniswap Interface</div>
                          <div className="flex justify-between items-center">
                              <div className="text-base-2 text-theme-secondary">
                                  app.uniswap.org
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
                                      Accounts connected
                                  </div>
                              </div>
                              <div className="text-base-1s font-medium text-theme-primary">0x4fff0f708c768a46050f9b96c46c265729d1a62f</div>
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
                          <Tooltip
                              className="-mb-0.25 md:mb-0"
                              title={'Tip'}
                          />
                      </div>
                      <div className="flex flex-col w-4/5 ml-4 text-left">
                          <div className="text-base-1s font-medium text-theme-primary">Allow current DApp to connect Abstraction Wallet</div>
                      </div>
                  </div>
                  <div className="flex justify-center w-full mt-6">
                      <button onClick={onReject} className="btn-gray mr-2 w-1/2 px-4">
                          Reject
                      </button>
                      <button className="btn-secondary w-1/2 px-4">
                          Connect
                      </button>
                  </div>
              </div>

          </div>
      </div>
  );
};

export default ConnectPage;
