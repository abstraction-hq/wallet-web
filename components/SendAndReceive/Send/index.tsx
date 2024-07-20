import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import Option from "@/components/Option";
import Sending from "../Sending";
import Confirm from "../Confirm";
import { useWalletStore } from "@/stores/walletStore";
import {
  Address,
  createPublicClient,
  encodeFunctionData,
  erc721Abi,
  formatEther,
  formatGwei,
  formatUnits,
  getAddress,
  Hex,
  http,
  parseEther,
  toHex,
  zeroAddress,
} from "viem";
import PasskeyAccount from "@/account/passkeyAccount";
import { handleUserOp } from "@/utils/bundler";
import { erc20Abi } from "viem";
import TokenAndNFTs from "@/components/TokenAndNFTs";
import Icon from "@/components/Icon";
import useAssetStore, { NFT, Token } from "@/stores/assetStore";
import { getAssetLogo } from "@/utils/format";
import { ethClient } from "@/config";

type SendProps = {
};

const Send = ({}: SendProps) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const [visibleModalTokenAndNFTs, setVisibleModalTokenAndNFTs] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const tokens = useAssetStore((state) => state.tokens);
  const [selectedAsset, setSelectedAsset] = useState<Token | NFT>(tokens[0] || {});
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const isToken = "balance" in selectedAsset;
  console.log(selectedAsset);
  const maxValue = 9999;

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

    const [userOp] = await account.sendTransactionOperation(ethClient, [
      {
        target,
        value,
        data,
      },
    ]);

    const txHash = await handleUserOp(userOp);
    setTxHash(txHash);

    setVisibleModal(true);
  };

  const handleValueChange = (value: string | undefined, name: string | undefined, values: { float: number } | undefined) => {
    if (values && values.float > maxValue) {
      setAmount("9999");
    } else {
      setAmount(value || "0.00");
    }
    console.log(values);
  };

  return (
    <>
      {isToken && <CurrencyInput
        className="input-caret-color w-full h-20 mb-1 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary xl:text-h2 lg:text-h1 md:h-24 md:text-h2"
        name="price"
        placeholder="0.00"
        decimalsLimit={4}
        // maxLength={4}
        // max={formatUnits(selectedAsset.balance, selectedAsset.decimals)}
        decimalSeparator="."
        groupSeparator=","
        value={amount}
        onValueChange={handleValueChange}
      />}
      {/*<input*/}
      {/*    className="w-full h-14 pl-14 pr-4 bg-transparent border border-theme-stroke text-base-1s text-theme-primary outline-none rounded-xl transition-colors placeholder:text-theme-tertiary focus:border-theme-brand md:text-[1rem]"*/}
      {/*    type="text"*/}
      {/*    placeholder="Search for asset"*/}
      {/*    value={search}*/}
      {/*    onChange={(e) => setSearch(e.target.value)}*/}
      {/*    required*/}
      {/*    data-autofocus*/}
      {/*/>*/}
      <div className="text-center justify-center mb-7 h-20 text-gray-400">
        {`Max value: ${maxValue}`}
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
      <button className="btn-primary w-full mt-6" onClick={() => onSend()}>
        Send
      </button>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Confirm txHash={txHash} amount={amount} />
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
