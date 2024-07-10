"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createPublicClient, http } from "viem";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon";
// import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";

const items = [
  {
    title: "$0",
    price: -0,
    image: "/images/viction.jpeg",
  }
];

type ContractInteractionProps = {
  signData: any;
  onConfirm: () => void;
  onReject: () => void;
};

const ContractInteraction = ({
  onConfirm,
  onReject,
  signData,
}: ContractInteractionProps) => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card-sidebar max-w-[28.5rem] rounded-3xl w-full p-6 text-white shadow-lg">
        <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
          Contract Interaction
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
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">
            Est. Transaction detail
          </div>
          {items.map((item, index) => (
            <div className="flex items-center" key={index}>
              <div
                className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full ${
                  index === 0 ? "bg-theme-brand-100" : "bg-theme-green-100"
                }`}
              >
                <Image src={item.image} width={48} height={48} alt="" />
              </div>
              <div className="grow">
                {item?.price > 0 ? (
                  <div className="text-3xl font-medium text-green-600 mr-2">{`+${item?.price} WETH`}</div>
                ) : (
                  <div className="text-3xl text-theme-primary font-medium">{`${item?.price} VIC`}</div>
                )}
                <div className="flex justify-between items-center">
                  <div className="text-base-2 text-theme-secondary">
                    {`≈ ${item.title}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <>
          <div className="mb-4 text-sm">
            <div className="flex items-center border-t border-theme-stroke py-3 justify-between">
              <div className="text-left">
                <div className="flex items-center">
                  <Image
                    src="/images/viction.jpeg"
                    width={24}
                    height={24}
                    alt="Viction"
                    className="mr-2"
                  />
                  <div className="text-base-1 text-theme-secondary">
                    Viction Est network fee
                  </div>
                </div>
                {/* <div className="text-title-1m font-medium text-theme-primary">
                  Average
                </div> */}
                <div className="text-base-1s font-medium text-theme-primary">
                  <span className="line-through mr-1 ml-1">0.000025 VIC ≈ $0.00001</span>
                  <span className="text-green-600">
                    (Sponsor by Abstraction)
                  </span>
                </div>
                {/* <div className="text-base-1 text-theme-secondary">
                  The max network fee is 0.0002536 VIC ($0.7817)
                </div> */}
              </div>
              {/* <Icon
                className="ml-3 fill-theme-primary md:ml-1.5"
                name="arrow-next"
              /> */}
            </div>
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
                  <div className="text-base-1 text-theme-secondary">
                    Interact with
                  </div>
                </div>
                <div className="text-base-1s font-medium text-theme-primary">
                  0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
                </div>
              </div>
              <div className="flex justify-end w-1/5">
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="flex flex-col text-left w-4/5">
                <div className="flex items-center">
                  <div className="text-base-1 text-theme-secondary">
                    Data 
                  </div>
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
export default ContractInteraction;
