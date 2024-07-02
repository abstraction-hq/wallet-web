import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import CurrencyInput from "react-currency-input-field";
import Option from "@/components/Option";
import Image from "@/components/Image";

type SendProps = {};

const Send = ({}: SendProps) => {
  const [confirm, setConfirm] = useState(false);
  // Add state variables for receiver address and amount
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <>
      <CurrencyInput
        className="input-caret-color w-full h-40 mb-6 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary xl:text-h2 lg:text-h1 md:h-24 md:text-h2"
        name="amount"
        prefix="$"
        placeholder="$0.00"
        decimalsLimit={2}
        decimalSeparator="."
        groupSeparator=","
        value={amount}
        onValueChange={(value: any) => setAmount(value)}
      />
      <input
        className="input-caret-color w-full h-12 mb-6 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary"
        type="text"
        placeholder="Receiver Address"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
      />
      <div className="space-y-1">
        <Option classTitle="2xl:mr-3" title="Asset" stroke>
          <div className="flex items-center grow">
            <div className="shrink-0 mr-2">
              <Image
                className="crypto-logo w-6"
                src="/images/crypto-icon-2.png"
                width={24}
                height={24}
                alt=""
              />
            </div>
            Ethereum
            <span className="ml-2 text-theme-tertiary">ETH</span>
          </div>
        </Option>
        <Option classTitle="2xl:mr-3" title="To" color="bg-theme-green" stroke>
          <div className="text-theme-tertiary">Wallet address</div>
        </Option>
        <Option classTitle="2xl:mr-3" title="Note" color="bg-theme-red" stroke>
          <div className="text-theme-tertiary">Messages</div>
        </Option>
      </div>
      {/* Other components and logic */}
    </>
  );
};

export default Send;
