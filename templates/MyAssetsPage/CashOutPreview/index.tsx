import Image from "@/components/Image";
import ButtonBack from "@/components/ButtonBack";
import Option from "@/components/Option";

type CashOutPreviewProps = {
    onBack: () => void;
};

const CashOutPreview = ({ onBack }: CashOutPreviewProps) => (
    <>
        <ButtonBack title="Cash out preview" onClick={onBack} />
        <div className="py-6 text-center">
            <div className="mb-1 text-h1 md:text-h2">$18.24</div>
            <div className="text-base-2 text-theme-secondary">
                You will pay <span className="text-theme-green">US$579,91</span>
            </div>
        </div>
        <div>
            <Option
                classTitle="!w-40 !mr-14 md:!w-34 md:!mr-3"
                title="To"
                color="bg-theme-tertiary"
            >
                TRAN MAU TRI TAM
            </Option>
            <Option
                classTitle="!w-40 !mr-14 md:!w-34 md:!mr-3"
                title="Funds will arrive"
                color="bg-theme-tertiary"
            >
                <div className="mr-2 text-0">
                    <Image
                        className="w-4"
                        src="/images/funds-arrival-indicator.svg"
                        width={16}
                        height={16}
                        alt=""
                    />
                </div>
                <div className="text-theme-brand">Instantly</div>
            </Option>
            <Option
                classTitle="!w-40 !mr-14 md:!w-34 md:!mr-3"
                title="Cash out amount"
                color="bg-theme-tertiary"
            >
                $18.24
            </Option>
            <Option
                classTitle="!w-40 !mr-14 md:!w-34 md:!mr-3"
                title="Fee"
                color="bg-theme-green"
            >
                <div className="text-primary-2">Free</div>
            </Option>
            <Option
                classTitle="!w-40 !mr-14 md:!w-34 md:!mr-3"
                title="Total"
                color="bg-theme-purple"
            >
                $18.24
            </Option>
        </div>
        <button className="btn-primary w-full h-14 mt-4">Cash out now</button>
    </>
);

export default CashOutPreview;
