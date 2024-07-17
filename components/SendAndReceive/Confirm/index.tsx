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
        <div className="text-title-1s text-theme-green md:text-base-1s">
            Transaction success
        </div>
        <a className="btn-gray w-full mt-12 md:mt-8" href={`https://vicscan.xyz/tx/${txHash}`} target="_blank">
            View transaction
        </a>
    </div>
);

export default Confirm;
