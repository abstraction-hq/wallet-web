"use client";
import React, { useEffect } from "react";
import CurrencyFormat from "@/components/CurrencyFormat";
import Percent from "@/components/Percent";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

const POPUP_WIDTH = 420;
const POPUP_HEIGHT = 540;

const url = "http://localhost:3000";

function App() {
  const [popup, setPopup] = React.useState<Window | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = React.useState<string>("");

  function openPopup(): Window {
    window.addEventListener("message", (event) => {
      console.log("event", event);
      if (event.origin !== url) return;

      if (event.data.type == "connect") {
        if (event.data.message == "Reject") {
          setIsConnected(false);
        } else if (event.data.message.walletAddress) {
          setIsConnected(true);
          setConnectedAddress(event.data.message.walletAddress);
        }
      }
      window.removeEventListener("message", () => {});
    });

    const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
    const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;

    const popup = window.open(
      `${url}/connect`,
      "Abstraction Wallet",
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`
    );
    console.log("popup", popup);
    popup?.focus();
    if (!popup) {
      throw "Pop up window failed to open";
    }
    setPopup(popup);
    return popup;
  }

  function mintNFT() {
  }

  return (
      <div className="card-sidebar">
        <div className="mb-6 text-title-1s md:mb-4 md:text-[1.125rem]">
          Is connect: {isConnected ? "True": "False"}
        </div>
        <div className="relative w-[15.75rem] h-[15.75rem] mx-auto">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base-1s">
            Connected Address: {connectedAddress}
            {
                  isConnected && (
                    <button onClick={mintNFT}>Mint NFT</button>
                  )
                }
          </div>
        </div>
        <button onClick={openPopup} className="btn-gray w-full mt-6">Connect</button>
      </div>
  );
}

export default App;
