import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface NFT {
    address: string;
    id: string;
    name: string;
    image: string;
}

const NFTDetailPage: React.FC = () => {
    const router = useRouter();
    const [nft, setNft] = useState<NFT | null>(null);

    console.log(`mienpv2 :: ${JSON.stringify(router)}`);
    useEffect(() => {
        const id = router.query.id as string;
        if (id) {
            // Fetch the NFT details using the ID (for demonstration purposes, using the same data)
            const fetchedNft: NFT = {
                address: "0x73282CF5A9a5e15e8a51005C91dAdE32Fa02b193",
                id: id,
                name: "Ivy #" + id,
                image: "https://ipfs-wrapper.dagora.xyz/ipfs/bafybeihfz74ilwaf2ayfnif5itrbmyshwkes5edylu4zcxblzqr3gy235u?width=800&height=800"
            };
            setNft(fetchedNft);
        }
    }, [router.query]);

    if (!nft) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={nft.image} alt={nft.name} />
            <h1>{nft.name}</h1>
            <p>Token ID: {nft.id}</p>
            <p>Address: {nft.address}</p>
        </div>
    );
};

export default NFTDetailPage;
