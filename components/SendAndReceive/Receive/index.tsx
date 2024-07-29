import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Option from "@/components/Option";
import QRCode from "@/components/QRCode";
import { useWalletStore } from "@/stores/walletStore";
import toast from "react-hot-toast";

type ReceiveProps = {};

const Receive = ({}: ReceiveProps) => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet?.senderAddress).then((data) => {
      toast.success("Address copied to clipboard");
    });
  };
  return (
    <>
      <div className="mb-6 p-6 text-center md:py-0">
        <QRCode value={wallet?.senderAddress} />
      </div>
      <div className="space-y-1">
        <Option classTitle="2xl:mr-3" title="Network" stroke>
          <div className="shrink-0 mr-2">
            <Image
              className="crypto-logo w-6"
              src="/images/crypto-icon-2.png"
              width={24}
              height={24}
              alt=""
            />
          </div>
          Viction
          <span className="ml-2 text-theme-tertiary">VIC</span>
        </Option>
        <Option
          classTitle="2xl:mr-3"
          title="Address"
          color="bg-theme-green"
          stroke
        >
          {wallet?.senderAddress?.slice(0, 7)}...
          {wallet?.senderAddress?.slice(-7)}
          <button className="group ml-auto text-0" onClick={copyToClipboard}>
            <Icon
              className="!w-5 !h-5 fill-theme-tertiary transition-colors group-hover:fill-theme-primary"
              name="copy"
            />
          </button>
        </Option>
        <div className="p-5 border border-theme-stroke rounded-xl bg-theme-on-surface text-caption-1 text-theme-secondary">
          This address can only receive assets from Viction network. Don&apos;t
          send assets from other networks, it may result in a loss of funds.
        </div>
      </div>
      <button className="btn-secondary w-full mt-6" onClick={copyToClipboard}>
        Copy VIC address
      </button>
    </>
  );
};

export default Receive;
