"use client";

import { useState, useRef } from "react";
import ReactCodesInput from "react-codes-input";
import Link from "next/link";
import "react-codes-input/lib/react-codes-input.min.css";
import Login from "@/components/Login";

const VerifyCodePage = () => {
    const pinWrapperRef = useRef(null);
    const [pin, setPin] = useState("");

    return (
        <Login
            title="We sent you a code"
            description="Check your email to get verify coded"
            image="/images/login-pic-2.png"
            verifyCode
        >
            <ReactCodesInput
                classNameComponent="react-codes-custom !h-20 mb-3"
                classNameWrapper="!border-2 justify-center !border-theme-stroke !rounded-2xl space-x-8 md:space-x-6"
                classNameCodeWrapper="!w-6 !h-9 !flex-none border-0"
                classNameEnteredValue="!text-h5 text-theme-primary"
                classNameCode="!border-0"
                classNameCodeWrapperFocus="!shadow-none !border-0 !shadow-[inset_0_-0.125rem_0_0_#0C68E9]"
                initialFocus={true}
                wrapperRef={pinWrapperRef}
                placeholder="000000"
                id="pin"
                codeLength={6}
                type="number"
                hide={false}
                value={pin}
                onChange={(res) => {
                    setPin(res);
                }}
            />
            <Link className="btn-gray w-full mb-3" href="/verify-your-identity">
                Confirm
            </Link>
        </Login>
    );
};

export default VerifyCodePage;
