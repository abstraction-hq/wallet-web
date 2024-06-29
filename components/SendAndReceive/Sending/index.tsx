import Icon from "@/components/Icon";
import ButtonBack from "@/components/ButtonBack";
import Option from "@/components/Option";

type SendingProps = {
    onConfirm: () => void;
    onClose: () => void;
};

const Sending = ({ onConfirm, onClose }: SendingProps) => (
    <>
        <ButtonBack title="Sending" onClick={onClose} />
        <div className="mb-1 py-8 text-center text-base-2">
            <div className="text-h1 md:text-h2">Ξ 1,5634</div>
            <div className="mt-1 text-theme-secondary">
                You will pay <span className="text-theme-green">US$579,91</span>
            </div>
        </div>
        <div className="">
            <Option classTitle="!w-30" title="Send to" color="bg-theme-green">
                <div>
                    <span className="md:hidden">
                        0x1e862Be555...26b444d533B
                    </span>
                    <span className="hidden md:inline">0x1e8...s533B</span>
                </div>
                <button className="group ml-auto text-0">
                    <Icon
                        className="!w-5 !h-5 fill-theme-secondary transition-colors group-hover:fill-theme-primary"
                        name="copy"
                    />
                </button>
            </Option>
            <Option classTitle="!w-30" title="Price" color="bg-theme-red">
                1 ETH = US$3579,78
            </Option>
            <Option
                classTitle="!w-30"
                title="Abstraction Wallet fee"
                color="bg-theme-purple"
            >
                US$0.00
            </Option>
            <Option classTitle="!w-30" title="Total">
                US$5596,83
            </Option>
        </div>
        <button className="btn-primary w-full mt-4" onClick={onConfirm}>
            Confirm
        </button>
    </>
);

export default Sending;
