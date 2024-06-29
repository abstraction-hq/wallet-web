import { useState } from "react";
import Field from "@/components/Field";
import Switch from "@/components/Switch";
import Details from "../Details";

type SecurityProps = {};

const Security = ({}: SecurityProps) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [googleAuthenticator, setGoogleAuthenticator] = useState(true);
    const [addressVerification, setAddressVerification] = useState(false);

    const items = [
        {
            title: "Google Authenticator (2FA)",
            content:
                "Use the Authenticator to get verification codes for better security.",
            value: googleAuthenticator,
            setValue: setGoogleAuthenticator,
        },
        {
            title: "E-mail address verification (2FA)",
            content:
                "Use the Authenticator to get verification codes for better security.",
            value: addressVerification,
            setValue: setAddressVerification,
        },
    ];

    return (
        <Details
            title="Password"
            desciption="Remember not to store your password in your email or cloud and don't share it with anyone."
            image="/images/profile-security.png"
            colorImage="bg-theme-yellow-100"
        >
            <div className="">
                <div className="space-y-6">
                    <Field
                        label="Current password"
                        placeholder="Current password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <Field
                        label="New password"
                        placeholder="New password"
                        type="password"
                        note="Minimum 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        label="Confirm new password"
                        placeholder="Confirm new password"
                        type="password"
                        note="Minimum 6 characters"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn-secondary mt-8">Update password</button>
            </div>
            <div className="mt-10 space-y-6">
                {items.map((item, index) => (
                    <div className="flex items-center" key={index}>
                        <div className="grow pr-6">
                            <div className="text-base-2">{item.title}</div>
                            <div className="text-caption-2m text-theme-tertiary">
                                {item.content}
                            </div>
                        </div>
                        <Switch
                            value={item.value}
                            setValue={() => item.setValue(!item.value)}
                        />
                    </div>
                ))}
            </div>
        </Details>
    );
};

export default Security;
