"use client";
import React, { useEffect } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";

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
            <div className="text-base-1s text-left">
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
                    classInput="pl-12 pr-42 truncate"
                    value={connectedAddress}
                />
              </div>

              {isConnected && (
                  <div className="flex justify-center w-full mt-3">
                    <button onClick={mintNFT} className="btn-secondary w-3/5 px-4">
                      Mint NFT
                    </button>
                  </div>
              )}
            </div>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button onClick={openPopup} className="btn-secondary w-1/2 px-4">
              Connect
            </button>
          </div>
        </div>
      </div>
  );
}

export default App;
