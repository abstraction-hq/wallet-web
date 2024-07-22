import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import Option from "@/components/Option";
import Confirm from "../Confirm";
import { useWalletStore } from "@/stores/walletStore";
import {
  Address,
  encodeFunctionData,
  erc721Abi,
  formatUnits,
  getAddress,
  Hex,
  parseEther,
  zeroAddress,
} from "viem";
import PasskeyAccount from "@/account/passkeyAccount";
import { handleUserOp, submitUserOp, UserOpReceipt } from "@/utils/bundler";
import { erc20Abi } from "viem";
import TokenAndNFTs from "@/components/TokenAndNFTs";
import Icon from "@/components/Icon";
import useAssetStore, { NFT, Token } from "@/stores/assetStore";
import { getAssetLogo } from "@/utils/format";
import { ethClient } from "@/config";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { ENTRY_POINT } from "@/constants";

type SendProps = {};

const Send = ({}: SendProps) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const [visibleModalTokenAndNFTs, setVisibleModalTokenAndNFTs] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");
  const [userOpReceipt, setUserOpReceipt] = useState<UserOpReceipt>();
  const tokens = useAssetStore((state) => state.tokens);
  const [selectedAsset, setSelectedAsset] = useState<Token | NFT>(tokens[0]);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [loading, setLoading] = useState<boolean>(false);
  const isToken = "balance" in selectedAsset;
  const maxValue = isToken ? formatUnits(selectedAsset?.balance, selectedAsset?.decimals) : "1";
  const isDisabled = maxValue === "0";

  const onSend = async () => {
    let target: Address = getAddress(selectedAsset.address);
    let value: bigint = 0n;
    let data: Hex = "0x";
    if (selectedAsset.address == zeroAddress) {
      // transfer native
      target = getAddress(receiver);
      value = parseEther(amount);
    } else if (isToken) {
      // transfer token
      data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [getAddress(receiver), parseEther(amount)],
      });
    } else {
      // transfer NFT
      data = encodeFunctionData({
        abi: erc721Abi,
        functionName: "transferFrom",
        args: [
          wallet?.senderAddress,
          getAddress(receiver),
          BigInt(selectedAsset.id),
        ],
      });
    }

    const account = new PasskeyAccount(
      wallet.passkeyCredentialId || "",
      0n,
      0n
    );

    const [userOp, userOpHash] = await account.sendTransactionOperation(
      ethClient,
      [
        {
          target,
          value,
          data,
        },
      ]
    );

    const result = await submitUserOp(userOp, ENTRY_POINT);
    console.log(result);

    // toast.promise(handleUserOp(userOp, userOpHash), {
    //   loading: "Sending...",
    //   success: (data) => <div>Transaction Success - <a href={`https://vicscan.xyz/tx/${data.txHash}`} target="_blank">Click to view on scan</a></div>,
    //   error: (err) => <div>Transaction Fail - <a href={`https://vicscan.xyz/tx/${err.txHash}`} target="_blank">Click to view on scan</a></div>,
    // })
  };

  const handleValueChange = (
    value: string | undefined,
    name: string | undefined,
    values: any
  ) => {
    if (isToken) {
      if (values && values.float > parseFloat(maxValue)) {
        setAmount(maxValue);
      } else {
        setAmount(value || "0.00");
      }
    } else {
      setAmount(value || "0.00");
    }
  };

  return (
    <>
      {isToken && (
        <CurrencyInput
          className="input-caret-color w-full h-20 mb-1 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary xl:text-h2 lg:text-h1 md:h-24 md:text-h2"
          name="price"
          placeholder="0.00"
          decimalsLimit={4}
          disabled={isDisabled}
          // maxLength={4}
          // max={formatUnits(selectedAsset.balance, selectedAsset.decimals)}
          decimalSeparator="."
          groupSeparator=","
          value={amount}
          onValueChange={handleValueChange}
        />
      )}
      {/*<input*/}
      {/*    className="w-full h-14 pl-14 pr-4 bg-transparent border border-theme-stroke text-base-1s text-theme-primary outline-none rounded-xl transition-colors placeholder:text-theme-tertiary focus:border-theme-brand md:text-[1rem]"*/}
      {/*    type="text"*/}
      {/*    placeholder="Search for asset"*/}
      {/*    value={search}*/}
      {/*    onChange={(e) => setSearch(e.target.value)}*/}
      {/*    required*/}
      {/*    data-autofocus*/}
      {/*/>*/}
      <div
        className={`text-center justify-center mb-7 h-20 ${
          isDisabled ? "text-theme-red" : "text-gray-400"
        }`}
      >
        {isDisabled ? "Insufficient funds" : `Max value: ${maxValue}`}
      </div>
      <div className="space-y-1">
        <Option classTitle="2xl:mr-3" title="Asset" stroke>
          <div className="flex items-center grow">
            <button
              className="flex items-center grow justify-between"
              onClick={() => setVisibleModalTokenAndNFTs(true)}
            >
              <div className="shrink-0 mr-2">
                <Image
                  className="crypto-logo w-6"
                  src={getAssetLogo(selectedAsset)}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="flex items-center grow">
                {selectedAsset.name}
                {isToken && (
                  <span className="ml-2 text-theme-tertiary">
                    {selectedAsset.symbol}
                  </span>
                )}
              </div>
              <Icon
                name="arrow-next"
                className="fill-theme-primary opacity-100"
              />
            </button>
          </div>
        </Option>
        <Option classTitle="2xl:mr-3" title="To" color="bg-theme-green" stroke>
          <input
            className="bg-transparent outline-none text-theme-primary"
            placeholder="Receiver Address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </Option>
      </div>
      {loading ? (
        <div className="flex justify-center w-full mt-6">
          <button className="p-2 w-full btn-gray">
            <Loading />
          </button>
        </div>
      ) : (
        <button className="btn-primary w-full mt-6" onClick={() => onSend()}>
          Send
        </button>
      )}
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Confirm
          txHash={userOpReceipt?.txHash}
          amount={amount}
          success={userOpReceipt?.success}
        />
      </Modal>
      <TokenAndNFTs
        visibleModal={visibleModalTokenAndNFTs}
        setSelectedAsset={setSelectedAsset}
        onClose={() => setVisibleModalTokenAndNFTs(false)}
      />
    </>
  );
};

export default Send;
