import { useState } from "react";
import Field from "@/components/Field";
import Details from "../Details";

type CardProps = {};

const Card = ({}: CardProps) => {
    const [nameCard, setNameCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [code, setCode] = useState("");

    return (
        <Details
            title="Card"
            desciption="Add new card for trading faster, easy to go Premium"
            image="/images/profile-card.png"
            colorImage="bg-theme-yellow-100"
        >
            <div className="space-y-6">
                <Field
                    className="flex-1"
                    label="Name on Card"
                    value={nameCard}
                    onChange={(e) => setNameCard(e.target.value)}
                    required
                />
                <Field
                    className="flex-1"
                    label="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                />
                <div className="flex space-x-6">
                    <Field
                        className="flex-1"
                        label="Expired date"
                        value={expiredDate}
                        onChange={(e) => setExpiredDate(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="CVC"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button className="btn-secondary mt-8 md:w-full">Save card</button>
        </Details>
    );
};

export default Card;
