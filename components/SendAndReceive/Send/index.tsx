import { use, useState } from "react";
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
  formatEther,
  formatGwei,
  formatUnits,
  getAddress,
  Hex,
  http,
  parseEther,
  toHex,
} from "viem";
import { CHAINS } from "@/constants/chain";
import PasskeyAccount from "@/account/passkeyAccount";
import { handleUserOp } from "@/utils/bundler";
import { erc20Abi } from "viem";

type SendProps = {
  asset: any;
};

const Send = ({ asset }: SendProps) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);

  const onSend = async () => {
    console.log("send", amount, receiver);
    let target: Address;
    let data: Hex;
    let value: bigint

    if (asset.id === "0") {
      target = getAddress(receiver);
      value = parseEther(amount);
      data = "0x";
    } else {
      target = getAddress(asset.id);
      value = 0n;
      data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [getAddress(receiver), parseEther(amount)],
      });
    }
    console.log("send", target, value, data);
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
        data
      },
    ]);

    const txHash = await handleUserOp(userOp);
    console.log("txHash", txHash);
    setTxHash(txHash);

    setVisibleModal(true);
  };

  return (
    <>
      <CurrencyInput
        className="input-caret-color w-full h-40 mb-6 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary xl:text-h2 lg:text-h1 md:h-24 md:text-h2"
        name="price"
        placeholder="0.00"
        decimalsLimit={8}
        decimalSeparator="."
        groupSeparator=","
        onValueChange={(value, name, values) => setAmount(value || "0")}
      />
      <div className="space-y-1">
        <Option classTitle="2xl:mr-3" title="Asset" stroke>
          <div className="flex items-center grow">
            <div className="shrink-0 mr-2">
              <Image
                className="crypto-logo w-6"
                src={asset.logo}
                width={24}
                height={24}
                alt=""
              />
            </div>
            {asset.name}
            <span className="ml-2 text-theme-tertiary">{asset.symbol}</span>
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
    </>
  );
};

export default Send;
