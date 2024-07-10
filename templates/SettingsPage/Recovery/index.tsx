import { useState } from "react";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Details from "../Details";

type RecoveryProps = {};

const Recovery = ({}: RecoveryProps) => {
  const [walletMetamask, setWalletMetamask] = useState("Not connected");
  const [recoverMail, setRecoverMail] = useState<string>("Not set up");

  return (
    <Details
      title="Recovery"
      description="Use one of the methods below as a recovery method in case you lose the wallet."
      image="/images/profile-wallets.png"
      colorImage="bg-theme-brand-100"
    >
      <div className="space-y-6">
        <div className="">
          <div className="flex items-center mb-2 text-base-2">
            <div className="mr-3">
              <Image
                className="w-6 opacity-100"
                src="/images/mail.png"
                width={24}
                height={24}
                alt=""
              />
            </div>
            Recover Mail
          </div>
          <div className="relative">
            <button className="group absolute top-0 left-0 bottom-0 z-1 w-12 pl-1 text-0">
              <Icon
                className="!w-5 !h-5 fill-theme-tertiary transition-colors group-hover:fill-theme-primary"
                name="copy-1"
              />
            </button>
            <Field
              className="flex-1"
              classInput="pl-12 pr-42 truncate"
              readOnly
              value={recoverMail}
              onChange={(e) => setRecoverMail(e.target.value)}
            />
            <button className="btn absolute right-1 bottom-1 w-38 h-10 bg-theme-primary hover:bg-theme-on-surface-3 rounded-lg hover:text-theme-primary text-theme-light">
              Change Email
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center mb-2 text-base-2">
            <div className="mr-3">
              <Image
                className="w-6 opacity-100"
                src="/images/fox.png"
                width={24}
                height={24}
                alt=""
              />
            </div>
            Metamask
          </div>
          <div className="relative">
            <button className="group absolute top-0 left-0 bottom-0 z-1 w-12 pl-1 text-0">
              <Icon
                className="!w-5 !h-5 fill-theme-tertiary transition-colors group-hover:fill-theme-primary"
                name="copy-1"
              />
            </button>
            <Field
              className="flex-1"
              classInput="pl-12 pr-42 truncate"
              value={walletMetamask}
              onChange={(e) => setWalletMetamask(e.target.value)}
              required
            />
            <button className="btn absolute right-1 bottom-1 w-38 h-10 bg-theme-primary hover:bg-theme-on-surface-3 rounded-lg hover:text-theme-primary text-theme-light">
              Connect
            </button>
          </div>
        </div>
      </div>
    </Details>
  );
};

export default Recovery;
