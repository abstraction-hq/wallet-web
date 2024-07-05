"use client";

import { NFT } from "@/apis/fetchNFTBalance";
import Image from "@/components/Image";

interface NFTCardProps {
  nft: NFT;
  isDarkMode?: boolean;
}

const MAX_LENGTH = 8;

const NFTCard: React.FC<NFTCardProps> = ({ nft, isDarkMode }) => {
    const isVideo = (url: string) => {
        const videoExtensions = ['mp4'];
        const extension = url.split('.').pop();
        return extension ? videoExtensions.includes(extension) : false;
    };
    return (
        <div style={{backgroundColor: isDarkMode ? '#202020' : '#FFFFFF'}}
             className="shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
                {isVideo(nft.image) ? (
                    <video className="object-cover" width={300} height={300} autoPlay loop muted playsInline>
                        <source src={nft.image} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <Image
                        className="object-cover"
                        src={nft.image}
                        alt="NFT Image"
                        width={300}
                        height={300}
                    />
                )}
            </div>
            <div className="border-t px-4 py-2 flex justify-between items-center">
                <div className="text-body-1m text-theme-primary font-bold">
                    {nft.name}
                </div>
            </div>
            <div className="border-t px-4 py-2 flex justify-between items-center">
                <div>
                    <span className="text-theme-tertiary font-medium">Token ID</span>
                    <div className="text-theme-primary font-bold">
                        {nft.id.toString().length > MAX_LENGTH
                            ? `${nft.id.toString().substring(0, MAX_LENGTH)}...`
                            : nft.id}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NFTCard;
