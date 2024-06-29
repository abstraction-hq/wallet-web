import { useState } from "react";
import Field from "@/components/Field";
import Details from "../Details";

type DeleteAccountProps = {};

const DeleteAccount = ({}: DeleteAccountProps) => {
    const [email, setEmail] = useState("");

    return (
        <Details
            title="Delete account"
            desciption="Permanently deleting your account and all data associated with it is a manual process performed on our end."
            image="/images/profile-delete-account.png"
            colorImage="bg-theme-red-100"
        >
            <Field
                className="flex-1"
                label="Your email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button className="btn-red mt-6 md:w-full">
                Permanently delete account
            </button>
        </Details>
    );
};

export default DeleteAccount;
