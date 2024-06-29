import Image from "@/components/Image";

const items = [
    {
        title: "Trade Execution",
        image: "/images/chart-breakout-circle.svg",
        color: "#FBA94B",
    },
    {
        title: "Real-Time Alerts",
        image: "/images/bell-ringing.svg",
        color: "#0C68E9",
    },
];

type DetailsProps = {};

const Details = ({}: DetailsProps) => (
    <div className="flex space-x-4 md:-mx-4 md:overflow-auto md:scrollbar-none md:scroll-smooth md:before:shrink-0 md:before:w-4 md:after:shrink-0 md:after:w-4">
        {items.map((item, index) => (
            <div
                className="flex items-center flex-1 p-5.5 border-2 border-theme-stroke rounded-xl text-title-1s 2xl:p-3 md:shrink-0 md:w-72 md:p-5 md:flex-none md:text-[1.125rem]"
                key={index}
            >
                <div
                    className="flex justify-center items-center w-10 h-10 mr-5 rounded-xl 2xl:mr-3"
                    style={{ backgroundColor: item.color }}
                >
                    <Image
                        className="w-6 opacity-100"
                        src={item.image}
                        width={24}
                        height={24}
                        alt=""
                    />
                </div>
                {item.title}
            </div>
        ))}
    </div>
);

export default Details;
