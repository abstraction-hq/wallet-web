import Image from "@/components/Image";

type ConfirmProps = {};

const Confirm = ({}: ConfirmProps) => (
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
        <div className="text-h1 md:text-h2">Ξ 0,1568</div>
        <div className="text-title-1s text-theme-green md:text-base-1s">
            Successfully sent to 0x1e8...d533B
        </div>
        <button className="btn-gray w-full mt-12 md:mt-8">
            View transaction
        </button>
    </div>
);

export default Confirm;
