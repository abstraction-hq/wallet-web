"use client";
import React, { useEffect } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { Address, encodeFunctionData } from "viem";
import MyERC721Abi from "@/abis/MyERC721.json";
import { MY_ERC721 } from "@/constants";
import "react-toastify/dist/ReactToastify.css";
import { AbstractionProvider } from "@/sdk/provider";

function App() {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = React.useState<Address>("0x");
  const [txHash, setTxHash] = React.useState<string>("");
  const [provider, setProvider] = React.useState<AbstractionProvider | null>(null);

  useEffect(() => {
    setProvider(new AbstractionProvider());
  }, [])

  const onConnect = async () => {
    if (!provider) return
    const res: Address[] = await provider.request({ method: "eth_requestAccounts" }) as Address[]
    setIsConnected(true)
    setConnectedAddress(res[0])
  }

  const mintNFT = async () => {
    if (!provider) return
    const signTransactionRequest = {
      from: connectedAddress,
      to: MY_ERC721,
      value: 0n,
      data: encodeFunctionData({
        abi: MyERC721Abi.abi,
        functionName: "mint",
        args: [Math.floor(Math.random() * 1000)],
      }),
    }

    const res: string = await provider.request({ method: "eth_sendTransaction", params: [signTransactionRequest] }) as string
    setTxHash(res)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card-sidebar">
        <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
          Is connected:
          <div
            className={`ml-2 text-title-1s ${
              isConnected ? "text-theme-green" : "text-theme-yellow"
            }`}
          >
            {isConnected ? "True" : "False"}
          </div>
        </div>
        <div className="relative w-[15.75rem] h-[5.75rem] mx-auto flex items-center justify-center">
          <div className="text-base-1s text-left mt-10">
            Connected Address
            <div className="relative">
              <button className="group absolute top-0 left-0 bottom-0 z-1 w-12 pl-1 text-0">
                <Icon
                  className="!w-5 !h-5 fill-theme-tertiary transition-colors group-hover:fill-theme-primary"
                  name="copy-1"
                />
              </button>
              <Field
                className="flex-1"
                classInput="pl-12 truncate"
                value={connectedAddress}
              />
            </div>
          </div>
        </div>
        {txHash && (
          <div className="relative w-[15.75rem] h-[5.75rem] mx-auto flex items-center justify-center">
            <div className="text-base-1s text-left mt-10">
              Mint NFT Transaction Hash
              <div className="relative">
                <a href={`https://testnet.vicscan.xyz/tx/${txHash}`} target="_blank">
                  <Field
                    className="flex-1"
                    classInput="pl-12 truncate"
                    value={"View on Vicscan"}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
        {isConnected && (
          <div className="flex justify-center w-full mt-5">
            <button onClick={mintNFT} className="btn-secondary w-3/5 px-4">
              Mint NFT
            </button>
          </div>
        )}
        {!isConnected && (
          <div className="flex justify-center w-full mt-14">
            <button onClick={onConnect} className="btn-secondary w-1/2 px-4">
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
