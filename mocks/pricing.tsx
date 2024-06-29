export const pricing = [
    {
        id: "0",
        popular: false,
        active: true,
        title: "Starter",
        image: "/images/plan-starter.png",
        priceMonthly: 19,
        priceYearly: 171,
        description:
            "Perfect for beginners, our Starter Plan introduces you to advanced crypto trading tools and AI-powered analytics.",
        options: [
            "Real-time price alerts",
            "Basic portfolio analytics",
            "AI predictive analytics",
            "Limited automated trading",
        ],
    },
    {
        id: "1",
        popular: true,
        active: false,
        title: "Standard",
        image: "/images/plan-standard.png",
        priceMonthly: 48,
        priceYearly: 432,
        description:
            "In-depth market analyses and advanced AI predictions are ideal for seasoned traders seeking strategy enhancement.",
        options: [
            "All features from starter plan",
            "Depth of market analysis",
            "Advanced portfolio analytics",
            "Enhanced AI predictive analytics",
        ],
    },
    {
        id: "2",
        popular: false,
        active: false,
        title: "Pro",
        image: "/images/plan-pro.png",
        priceMonthly: 88,
        priceYearly: 792,
        description:
            "Discover diverse trading resources, tailored insights, premium support, and exclusive webinars and events.",
        options: [
            "All features from Standard Plan",
            "Advanced learning resources",
            "AI predictive analytics",
            "High-priority customer support",
        ],
    },
];
