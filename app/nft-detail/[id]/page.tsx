'use client';

import React, {useEffect, useState} from 'react';
import { NFT } from "@/apis/fetchNFTBalance";

interface NFTPageDetailProps {
    nfts: NFT[]
    params: {
        id: string;
    };
}

const NFTPageDetail: React.FC<NFTPageDetailProps> = ({nfts, params }) => {

    console.log(`mienpv12 :: ${JSON.stringify(nfts)}`);

    // useEffect(() => {
    //     const { id } = params;
    //
    //     const fetchNFTDetails = async (id: string) => {
    //         // Replace this with your actual API call
    //         const fetchedNFT: NFT = await fetchNFTById(id);
    //         setNft(fetchedNFT);
    //     };
    //
    //     fetchNFTDetails(id);
    // }, [params]);

    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    );

}

export default NFTPageDetail;
