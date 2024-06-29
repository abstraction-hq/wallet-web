import Link from "next/link";

const links = [
    {
        title: "Dashboard",
        url: "/",
    },
    {
        title: "Greed index",
        url: "/greed-index",
    },
    {
        title: "My assets",
        url: "/my-assets",
    },
    {
        title: "Asset details",
        url: "/asset",
    },
    {
        title: "Notification",
        url: "/notification",
    },
    {
        title: "Trade",
        url: "/trade",
    },
    {
        title: "Token details",
        url: "/token",
    },
    {
        title: "New chat",
        url: "/chat",
    },
    {
        title: "Chat - casual",
        url: "/chat/casual",
    },
    {
        title: "Chat - smart trade",
        url: "/chat/trade",
    },
    {
        title: "Chat - bulk price alert",
        url: "/chat/price-alert",
    },
    {
        title: "Chat - best price",
        url: "/chat/best-price",
    },
    {
        title: "Chat - auto withdraw",
        url: "/chat/auto-withdraw",
    },
    {
        title: "Pricing",
        url: "/pricing",
    },
    {
        title: "Settings",
        url: "/settings",
    },
    {
        title: "Sign up",
        url: "/sign-up",
    },
    {
        title: "Sign in",
        url: "/sign-in",
    },
    {
        title: "Verify code",
        url: "/verify-code",
    },
    {
        title: "Verify your identity",
        url: "/verify-your-identity",
    },
    {
        title: "404",
        url: "/404",
    },
    {
        title: "News",
        url: "/news",
    },
];

const PageListPage = () => {
    return (
        <div className="flex flex-col items-start px-6 py-10 space-y-1">
            {links.map((link, index) => (
                <Link
                    className="text-base-1s text-theme-primary transition-colors hover:text-primary-1"
                    href={link.url}
                    key={index}
                >
                    {link.title}
                </Link>
            ))}
        </div>
    );
};

export default PageListPage;
