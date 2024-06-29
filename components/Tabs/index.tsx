type TabType = {
    id: string;
    title: string;
    onClick?: () => void;
};

type TabsProps = {
    className?: string;
    items: TabType[];
    value: any;
    setValue: any;
};

const Tabs = ({ className, items, value, setValue }: TabsProps) => {
    return (
        <div className={`flex flex-wrap gap-3 xl:gap-2 ${className || ""}`}>
            {items.map((item, index) => (
                <button
                    className={`h-10 px-5.5 border-2 rounded-full text-base-2 transition-colors hover:text-theme-primary outline-none xl:px-3.5 ${
                        item === value
                            ? "border-theme-brand text-theme-primary"
                            : "border-transparent text-theme-secondary"
                    }`}
                    onClick={() => setValue(item)}
                    key={index}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
