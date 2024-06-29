import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@/components/Icon";

type ToggleThemeProps = {
    visible?: boolean;
};

const ToggleTheme = ({ visible }: ToggleThemeProps) => {
    const { colorMode, setColorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    const items = [
        {
            icon: "sun",
            active: colorMode === "light",
            onClick: () => setColorMode("light"),
        },
        {
            icon: "moon",
            active: colorMode === "dark",
            onClick: () => setColorMode("dark"),
        },
    ];

    return (
        <div
            className={`p-1 bg-theme-n-8 rounded-xl ${
                visible
                    ? `relative flex w-full before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-theme-on-surface-1 before:rounded-lg before:shadow-[0_0.125rem_0.25rem_0_rgba(0,0,0,0.15)] before:transition-[transform] ${
                          isDarkMode && "before:translate-x-full"
                      }`
                    : ""
            }`}
        >
            {items.map((item, index) => (
                <button
                    className={`relative z-1 group flex justify-center items-center ${
                        visible
                            ? "h-8 basis-1/2"
                            : `flex w-full h-10 rounded-lg bg-theme-on-surface-1 ${
                                  item.active ? "!hidden" : ""
                              }`
                    }`}
                    key={index}
                    onClick={item.onClick}
                >
                    <Icon
                        className={`fill-theme-secondary transition-colors group-hover:fill-theme-primary ${
                            item.active && visible && "!fill-theme-primary"
                        }`}
                        name={item.icon}
                    />
                </button>
            ))}
        </div>
    );
};

export default ToggleTheme;
