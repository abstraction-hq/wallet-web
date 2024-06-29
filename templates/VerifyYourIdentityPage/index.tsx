"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Field from "@/components/Field";

const VerifyYourIdentityPage = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [nationality, setNationality] = useState("");

    return (
        <Login
            title="Verify your identity"
            description="Check your email to get verify coded"
            image="/images/login-pic-2.png"
        >
            <div className="space-y-6">
                <Field
                    className="mb-3"
                    label="Full name"
                    placeholder="Display name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="flex space-x-6 md:block md:space-x-0 md:space-y-6">
                    <Field
                        className="flex-1"
                        label="NRIC/FIN"
                        placeholder="NRIC/FIN"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Nationality"
                        placeholder="Nationality"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        required
                    />
                </div>
                <div className="">
                    <div className="mb-2 text-base-2">Upload your ID photo</div>
                    <div className="relative group">
                        <input
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            type="file"
                        />
                        <div className="flex justify-center items-center h-38 bg-theme-n-8 rounded-xl text-base-2 text-theme-tertiary transition-colors group-hover:text-theme-primary">
                            Drag & drop or click to upload
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn-primary w-full mt-6">
                Verify with NeuPass
            </button>
        </Login>
    );
};

export default VerifyYourIdentityPage;
