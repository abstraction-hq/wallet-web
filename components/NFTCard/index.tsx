import Image from "@/components/Image";
interface NFTCardProps {
    nft: string;
    fromAvatar: string;
    fromLogin: string;
    price: string;
    buyNowPrice: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, fromAvatar, fromLogin, price, buyNowPrice }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
            <Image
                className="object-cover"
                src={nft}
                alt="NFT Image"
                width={300}
                height={300}
            />
        </div>
        <div className="p-4 flex items-center">
            <Image
                className="w-8 h-8 object-cover rounded-full"
                src={fromAvatar}
                alt={fromLogin}
                width={32}
                height={32}
            />
            <div className="ml-2 text-body-1m text-theme-secondary font-bold">@{fromLogin}</div>
        </div>
        <div className="border-t px-4 py-2 flex justify-between items-center">
            <div>
                <span className="text-black">Current bid</span>
                <div className="text-black font-bold">{price}</div>
            </div>
            <div>
                <span className="text-gray-600">Buy now</span>
                <div className="text-black font-bold">{buyNowPrice}</div>
            </div>
        </div>
    </div>
);

export default NFTCard;
