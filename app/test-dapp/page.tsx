"use client";
import React, { useEffect } from "react";

const POPUP_WIDTH = 420;
const POPUP_HEIGHT = 540;

const url = "http://localhost:3000";

function App() {
  const [popup, setPopup] = React.useState<Window | null>(null);
  
  useEffect(() => {

  })

  function openPopup(): Window {
    window.addEventListener("message", (event) => {
      if (event.origin !== url) return;

      console.log("event", event);
    });
    const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
    const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;

    const popup = window.open(
      `${url}/connect`,
      "Abstraction Wallet",
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`
    );
    popup?.focus();
    if (!popup) {
      throw "Pop up window failed to open";
    }

    // window.addEventListener('message', (event) => {
    //   console.log(event.data, url)
    //   if (event.origin !== url) return

    //   console.log('event', event);
    // })

    popup?.postMessage("Gm Gm", url);
    setPopup(popup);
    return popup;
  }

  function sendMessage() {
    popup?.postMessage(
      {
        type: "GET_ACCOUNTS",
      },
      url
    );
  }

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
