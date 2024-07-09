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
import { CHAINS } from "@/constants/chain";
import PasskeyAccount from "@/account/passkeyAccount";
import { handleUserOp } from "@/utils/bundler";
import { erc20Abi } from "viem";
import TokenAndNFTs from "@/components/TokenAndNFTs";
import Icon from "@/components/Icon";
import useAssetStore, { NFT, Token } from "@/stores/assetStore";
import { getAssetLogo } from "@/utils/format";

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
  const [selectedAsset, setSelectedAsset] = useState<Token | NFT>(tokens[0]);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const isToken = "balance" in selectedAsset;

  const onSend = async () => {
    console.log("send", amount, receiver);
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
          wallet.senderAddress,
          getAddress(receiver),
          parseEther(selectedAsset.id),
        ],
      });
    }

    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });
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
    console.log("txHash", txHash);
    setTxHash(txHash);

    setVisibleModal(true);
  };

  return (
    <>
      {isToken && <CurrencyInput
        className="input-caret-color w-full h-40 mb-6 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary xl:text-h2 lg:text-h1 md:h-24 md:text-h2"
        name="price"
        placeholder="0.00"
        decimalsLimit={8}
        decimalSeparator="."
        groupSeparator=","
        onValueChange={(value, name, values) => setAmount(value || "0")}
      />}
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
