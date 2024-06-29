import { useState } from "react";
import Icon from "@/components/Icon";

type DetailsProps = {};

const Details = ({}: DetailsProps) => {
    const [showText, setShowText] = useState<boolean>(false);

    return (
        <div>
            <div className="p-6 bg-theme-on-surface rounded-xl border border-theme-stroke">
                <div className="mb-5 text-title-1s">Stats</div>
                <div className="flex space-x-5 md:block md:space-x-0 md:space-y-5">
                    <div className="flex-1">
                        <div className="mb-3 text-body-2s text-theme-secondary">
                            Market cap
                        </div>
                        <div className="text-h5">$393,049,577,059</div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-3 text-body-2s text-theme-secondary">
                            Volume (24h)
                        </div>
                        <div className="text-h5">$15,333,208,883</div>
                    </div>
                </div>
            </div>
            <div className="mt-6 p-6 bg-theme-on-surface rounded-xl border border-theme-stroke">
                <div className="mb-5 text-title-1s">About Ethereum</div>
                <div
                    className={`text-theme-secondary ${
                        showText ? "line-clamp-none" : "line-clamp-4"
                    }`}
                >
                    Ethereum is a decentralized open-source blockchain system
                    that features its own cryptocurrency, Ether. ETH works as a
                    platform for numerous other cryptocurrencies, as well as for
                    the execution of decentralized smart contracts. Ethereum was
                    first described in a 2013 whitepaper by Vitalik Buterin.
                    Buterin, along with other co-founders, secured funding for
                    the project in an online public crowd sale in the summer of
                    2014. The project team managed to raise $18.3 million in
                    Bitcoin, and Ethereum’s price in the Initial Coin Offering
                    (ICO) was $0.311, with over 60 million Ether sold. Taking
                    Ethereum’s price now, this puts the return on investment
                    (ROI) at an annualized rate of over 270%, essentially almost
                    quadrupling your investment every year since the summer of
                    2014. The Ethereum Foundation officially launched the
                    blockchain on July 30, 2015, under the prototype codenamed
                    “Frontier.” Since then, there has been several network
                    updates — “Constantinople” on Feb. 28, 2019, “Istanbul” on
                    Dec. 8, 2019, “Muir Glacier” on Jan. 2, 2020, “Berlin” on
                    April 14, 2021, and most recently on Aug. 5, 2021, the
                    “London” hard fork. Ethereum’s own purported goal is to
                    become a global platform for decentralized applications,
                    allowing users from all over the world to write and run
                    software that is resistant to censorship, downtime and
                    fraud.
                </div>
                <button
                    className="inline-flex items-center mt-3 text-button-1 text-theme-brand"
                    onClick={() => setShowText(!showText)}
                >
                    View {showText ? "less" : "more"}
                    <Icon
                        className={`!w-4 !h-4 ml-2 fill-theme-brand transition-transform ${
                            showText ? "rotate-180" : ""
                        }`}
                        name="arrow-down"
                    />
                </button>
            </div>
        </div>
    );
};

export default Details;
