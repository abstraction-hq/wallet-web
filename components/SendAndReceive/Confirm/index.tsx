import Image from "@/components/Image";

type ConfirmProps = {
  txHash: string;
  amount: string;
};

const Confirm = ({txHash, amount}: ConfirmProps) => (
    <div className="pt-6 text-center">
        <div className="mb-8">
            <Image
                className="opacity-100"
                src="/images/confirm.png"
                width={164}
                height={177}
                alt=""
            />
        </div>
        <div className="text-h1 md:text-h2">Ξ {amount.toString()}</div>
        <div className="text-title-1s text-theme-green md:text-base-1s">
            Successfully sent
        </div>
        <a className="btn-gray w-full mt-12 md:mt-8" href={`https://testnet.vicscan.xyz/tx/${txHash}`} target="_blank">
            View transaction
        </a>
    </div>
);

export default Confirm;
