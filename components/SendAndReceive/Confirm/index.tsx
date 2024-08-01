import Image from "@/components/Image";

type ConfirmProps = {
  txHash?: string;
  amount: string;
  success?: boolean;
};

const Confirm = ({txHash, success}: ConfirmProps) => (
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
        <div className={`text-title-1s ${ success ? 'text-theme-green' : 'text-theme-red'} md:text-base-1s`}>
            Transaction {success ? "successful" : "failed"}
        </div>
        <a className="btn-gray w-full mt-12 md:mt-8" href={`https://scan.abstraction.world/operation/${txHash}`} target="_blank">
            View transaction
        </a>
    </div>
);

export default Confirm;
