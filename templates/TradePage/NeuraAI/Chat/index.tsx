import Answer from "@/components/Chat/Answer";
import Question from "@/components/Chat/Question";
import Image from "@/components/Image";

type ChatProps = {};

const Chat = ({}: ChatProps) => (
    <div className="space-y-6">
        <Question content="Show me the top 5 cryptocurrencies by market cap." />
        <Answer
            content="The top 5 cryptocurrencies by market cap as of April 2024
                    are:"
        >
            <div className="flex flex-wrap mt-4 gap-3">
                {[
                    "Bitcoin (BTC)",
                    "Tether (USDT)",
                    "BNB (BNB)",
                    "Solana (SOL)",
                    "Bitcoin (BTC)",
                ].map((item, index) => (
                    <div
                        className="px-4 py-1 bg-theme-brand-100 rounded-full text-theme-brand text-caption-1"
                        key={index}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </Answer>
    </div>
);

export default Chat;
