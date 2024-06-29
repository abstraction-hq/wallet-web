import Image from "@/components/Image";

type ConfirmProps = {
    children: React.ReactNode;
};

const Confirm = ({ children }: ConfirmProps) => (
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
        {children}
        <button className="btn-gray w-full mt-20 md:mt-14">
            View transaction
        </button>
    </div>
);

export default Confirm;
