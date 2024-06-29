import { useState } from "react";
import ButtonBack from "@/components/ButtonBack";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Option from "@/components/Option";
import Confirm from "../Confirm";
import CurrencyFormat from "@/components/CurrencyFormat";

type PreviewSwapProps = {
    onBack: () => void;
};

const PreviewSwap = ({ onBack }: PreviewSwapProps) => {
    const [confirm, setConfirm] = useState(false);

    return confirm ? (
        <Confirm>
            <div className="mb-1 text-h3 md:text-h4">Order submitted</div>
            <div className="max-w-[17rem] mx-auto text-title-1s text-theme-secondary">
                We&apos;ll email you once this order changes status
            </div>
        </Confirm>
    ) : (
        <>
            <div className="flex items-center mb-6">
                <ButtonBack
                    className="!mb-0"
                    title="Order preview"
                    onClick={onBack}
                />
                <div className="flex items-center ml-auto">
                    <div className="">
                        <Image
                            className="crypto-logo w-8"
                            src="/images/crypto-icon-2.png"
                            width={32}
                            height={32}
                            alt=""
                        />
                    </div>
                    <Icon
                        className="!w-3 !h-3 mx-3 rotate-90 fill-theme-tertiary"
                        name="arrow-swap"
                    />
                    <div className="">
                        <Image
                            className="crypto-logo w-8"
                            src="/images/crypto-icon-3.png"
                            width={32}
                            height={32}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="mb-1 py-6 text-center">
                <CurrencyFormat
                    className="text-h1 md:text-h2"
                    currency="$"
                    value={100.0}
                />
                <div className="mt-1 text-base-2 text-theme-secondary">
                    ETH/SOL = 0,028331501229587153
                </div>
            </div>
            <div>
                <Option
                    classTitle="!w-auto !mr-auto md:!mr-auto"
                    title="Amount in ETH"
                    color="bg-theme-tertiary"
                >
                    <div className="w-full text-right">
                        0,028331501229587153
                    </div>
                </Option>
                <Option
                    classTitle="!w-auto !mr-auto md:!mr-auto"
                    title="Amount in SOL"
                    color="bg-theme-tertiary"
                >
                    <div className="w-full text-right">
                        0,028331501229587153
                    </div>
                </Option>
                <Option
                    classTitle="!w-auto !mr-auto md:!mr-auto"
                    title="NeutraNet fee"
                    color="bg-theme-green"
                >
                    <div className="w-full text-right">US$0.00</div>
                </Option>
                <Option
                    classTitle="!w-auto !mr-auto md:!mr-auto"
                    title="Total"
                    color="bg-theme-purple"
                >
                    <div className="w-full text-right">US$100.00</div>
                </Option>
            </div>
            <button
                className="btn-primary w-full mt-4"
                onClick={() => setConfirm(true)}
            >
                Place order
            </button>
        </>
    );
};

export default PreviewSwap;
