import Image from "@/components/Image";

interface NFTCardProps {
    imageUrl: string;
    avatarUrl: string;
    username: string;
    currentBid: string;
    buyNowPrice: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, avatarUrl, username, currentBid, buyNowPrice }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
            <Image
                className="object-cover"
                src={imageUrl}
                alt="NFT Image"
                width={300}
                height={300}
            />
        </div>
        <div className="p-4 flex items-center">
            <Image
                className="w-8 h-8 object-cover rounded-full"
                src={avatarUrl}
                alt={username}
                width={32}
                height={32}
            />
            <div className="ml-2 text-body-1m text-theme-secondary font-bold">@{username}</div>
        </div>
        <div className="border-t px-4 py-2 flex justify-between items-center">
            <div>
                <span className="text-gray-600">Current bid</span>
                <div className="text-lg font-bold">{currentBid} ETH</div>
            </div>
            <div>
                <span className="text-gray-600">Buy now</span>
                <div className="text-lg font-bold">{buyNowPrice} ETH</div>
            </div>
        </div>
    </div>
);

export default NFTCard;
