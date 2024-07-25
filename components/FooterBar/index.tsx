import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import ToggleTheme from "@/components/ToggleTheme";
import Switch from "@/components/Switch";
import NavLink from "./NavLink";
import UpgradeToPro from "./UpgradeToPro";

import { navigation } from "@/constants/navigation";
import {isMobile} from "react-codes-input/lib/utils";

type FooterBarProps = {
    className?: string;
    visible: boolean;
    onClick: () => void;
};

const FooterBar = ({ className, visible, onClick }: FooterBarProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isLightMode = colorMode === "light";

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-20 flex flex-row items-center h-24 bg-theme-on-surface-1 mb-0 ${
                visible ? "pb-0" : "pb-0"
            } ${className || ""}`}
            style={{ height: '100px' }}
        >
            <div
                className={`flex items-center h-full ${
                    visible ? "px-7" : "px-4"
                }`}
            >
                <Link
                    className="flex justify-center items-center w-12 h-12"
                    href="/"
                >
                    <Image
                        className="w-12 opacity-100"
                        src={
                            colorMode === "light"
                                ? "/images/logo-dark.svg"
                                : "/images/logo-light.svg"
                        }
                        width={40}
                        height={40}
                        alt=""
                    />
                </Link>
            </div>
            <div
                className={`flex flex-row flex-grow overflow-auto scroll-smooth scrollbar-none ${
                    visible ? "px-6" : "px-4"
                }`}
            >
                {navigation.map((link) => (
                    <NavLink
                        title={link.title}
                        icon={link.icon}
                        url={link.url}
                        key={link.id}
                        visible={visible}
                    />
                ))}
            </div>
            <div className="group flex items-center h-12 px-4 rounded-xl transition-colors hover:bg-theme-on-surface-2 md:hover:bg-transparent">
                <Icon
                    className="shrink-0 mr-4 fill-theme-secondary transition-colors group-hover:fill-theme-primary md:group-hover:fill-theme-secondary"
                    name={isLightMode ? "moon" : "sun"}
                />
                <div className="mr-3 text-base-1s text-theme-secondary transition-colors group-hover:text-theme-primary md:group-hover:text-theme-secondary">
                    {isLightMode ? "Dark" : "Light"}
                </div>
                <Switch
                    value={colorMode}
                    setValue={toggleColorMode}
                    small
                    theme
                />
            </div>
        </div>
    );
};

export default FooterBar;
