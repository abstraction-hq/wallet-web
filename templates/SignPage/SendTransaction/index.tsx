"use client";
import { useWalletStore } from "@/stores/walletStore";
import React, { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
import { computeNewContractAddress } from "@/utils/create2";
import PasskeyAccount from "@/account/passkeyAccount";
import { ethClient } from "@/config";
import { FACTORY } from "@/constants";
import { encodeFunctionData, formatEther, parseEther, zeroAddress } from "viem";
import GenericFactory from "@/abis/GenericFactory.json";
import { handleUserOpWithoutWait } from "@/utils/bundler";
import useAssetStore from "@/stores/assetStore";

type ContractInteractionProps = {
  signData: any;
  loading: boolean;
  onConfirm: (returnValue: any) => void;
  onReject: () => void;
};

const ContractInteraction = ({
  onReject,
  signData,
  onConfirm
}: ContractInteractionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const walletInfo = useAssetStore((state) => state.walletInfo);
  const params = signData?.params[0];
  const dappInfo = signData?.dappInfo || {};

  const displayValue = formatEther(BigInt(params.value || "0"));

  const onSignTransaction = async () => {
    setLoading(true);
    try {
      if (!wallet) window.close();
      const account = new PasskeyAccount(
        wallet.passkeyCredentialId || "",
        0n,
        0n
      );

      let userOp, userOpHash;

      if (!signData?.params[0].to) {
        // create contract
        [userOp, userOpHash] = await account.sendTransactionOperation(
          ethClient,
          [
            {
              target: FACTORY,
              value: signData?.params[0].value || 0n,
              data: encodeFunctionData({
                abi: GenericFactory.abi,
                functionName: "create2",
                args: [signData?.params[0].data, signData.salt],
              }),
            },
          ]
        );
      } else {
        [userOp, userOpHash] = await account.sendTransactionOperation(
          ethClient,
          [
            {
              target: signData?.params[0].to || zeroAddress,
              value: signData?.params[0].value || 0n,
              data: signData?.params[0].data || "0x",
            },
          ]
        );
      }

      const txHash = await handleUserOpWithoutWait(userOp);
      onConfirm(txHash);
    } catch (error) {
      console.error(error);
    }
    window.close();
  };
  if (!params) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[28.5rem] w-full p-6 text-white">
        <div className="mb-4 text-xl text-center font-semibold text-theme-primary">
          Contract Interaction
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
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">
            Est. Transaction detail
          </div>
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center w-12 h-12 mr-4`}
            >
              <Image
                src={`/images/viction.jpeg`}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">{`- ${displayValue} VIC`}</div>
              {/* <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  {`≈ ${displayValueUsd}`}
                </div>
              </div> */}
            </div>
          </div>
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
                  <span className="line-through mr-1 ml-1">
                    0.000025 VIC ≈ $0.00001
                  </span>
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
                  {wallet?.senderAddress}
                </div>
              </div>
              <div className="flex justify-end w-1/5">
                <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
              </div>
            </div>
            {params.to ? (
              <>
                <div className="flex items-center py-3">
                  <div className="flex flex-col text-left w-4/5">
                    <div className="flex items-center">
                      <div className="text-base-1 text-theme-secondary">
                        Interact with
                      </div>
                    </div>
                    <div className="text-base-1s font-medium text-theme-primary">
                      {params.to}
                    </div>
                  </div>
                  <div className="flex justify-end w-1/5">
                    <Icon
                      className="fill-theme-primary md:ml-1.5"
                      name="copy"
                    />
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
                      {params.data}
                    </div>
                  </div>
                  <div className="flex justify-end w-1/5">
                    <Icon
                      className="fill-theme-primary md:ml-1.5"
                      name="copy"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center py-3">
                <div className="flex flex-col text-left w-4/5">
                  <div className="flex items-center">
                    <div className="text-base-1 text-theme-secondary">
                      New Contract Creation
                    </div>
                  </div>
                  <div className="text-base-1s font-medium text-theme-primary">
                    {computeNewContractAddress(signData.salt, params.data)}
                  </div>
                </div>
                <div className="flex justify-end w-1/5">
                  <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
                </div>
              </div>
            )}
          </div>
        </>
        {loading ? (
          <div className="flex justify-center w-full mt-6">
            <button className="p-2 w-full btn-gray">
              <Loading />
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full mt-6">
            <button
              onClick={onSignTransaction}
              className="btn-secondary mr-2 w-1/2 px-4"
            >
              Confirm
            </button>
            <button onClick={onReject} className="btn-gray w-1/2 px-4">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContractInteraction;
