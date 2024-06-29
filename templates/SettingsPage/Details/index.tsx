import Image from "@/components/Image";

type DetailsProps = {
    title: string;
    desciption?: string;
    colorImage?: string;
    image: string;
    children: React.ReactNode;
};

const Details = ({
    title,
    desciption,
    colorImage,
    image,
    children,
}: DetailsProps) => (
    <div className="">
        <div className="mb-10 md:mb-8">
            <div className="pb-4 border-b border-theme-stroke text-h4 md:text-title-1s">
                {title}
            </div>
            {desciption && (
                <div className="max-w-[30rem] mt-6 text-body-2s text-theme-secondary">
                    {desciption}
                </div>
            )}
            <div
                className={`mt-10 rounded-[1.25rem] overflow-hidden md:mt-8 ${
                    colorImage || "bg-theme-purple-100"
                }`}
            >
                <Image
                    className="w-full rounded-[1.25rem] md:min-h-[11.25rem] md:object-[70%_50%] md:object-cover"
                    src={image}
                    width={646}
                    height={240}
                    alt=""
                />
            </div>
        </div>
        {children}
    </div>
);

export default Details;
