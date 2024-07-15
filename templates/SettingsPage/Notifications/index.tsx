import { useState } from "react";
import Switch from "@/components/Switch";
import Details from "../Details";

type NotificationsProps = {};

const Notifications = ({}: NotificationsProps) => {
    const [notificationCoin, setNotificationCoin] = useState(true);
    const [watchlist, setWatchlist] = useState(true);
    const [updates, setUpdates] = useState(false);
    const [payoutProcessed, setPayoutProcessed] = useState(false);
    const [googleAuthenticator, setGoogleAuthenticator] = useState(true);

    const items = [
        {
            title: "Bitcoin and Ethereum Movement",
            content:
                "You’ll be notified of important price milestones for Bitcoin and Ethereum.",
            value: notificationCoin,
            setValue: setNotificationCoin,
        },
        {
            title: "Watchlist",
            content:
                "You’ll be notified of significant increase & decrease of coins in your watchlist.",
            value: watchlist,
            setValue: setWatchlist,
        },
        {
            title: "Updates & Promotions",
            content: "Receive important Abstraction Wallet promotions and updates.",
            value: updates,
            setValue: setUpdates,
        },
        {
            title: "Payout processed",
            content: "Receive important Abstraction Wallet promotions and updates.",
            value: payoutProcessed,
            setValue: setPayoutProcessed,
        },
        {
            title: "Google Authenticator (2FA)",
            content: "Receive important Abstraction Wallet promotions and updates.",
            value: googleAuthenticator,
            setValue: setGoogleAuthenticator,
        },
    ];

    return (
        <Details
            title="Notification settings"
            description="Connect wallets for a more flexible trading method and withdraw."
            image="/images/profile-notifications.png"
            colorImage="bg-theme-green-100"
        >
            <div className="space-y-8">
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

export default Notifications;
