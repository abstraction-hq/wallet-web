"use client";
import type { NextPage } from "next";
import { useEffect } from "react";

const Connect: NextPage = () => {
  useEffect(() => {
    window.opener.postMessage({ type: "connect", message: "PopupLoaded" }, "*");
  }, []);

  return <div>Connect</div>;
};

export default Connect;
