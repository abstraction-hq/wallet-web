import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import ToggleTheme from "@/components/ToggleTheme";
import Switch from "@/components/Switch";
import NavLink from "./NavLink";
import UpgradeToPro from "./UpgradeToPro";

import { navigation } from "@/constants/navigation";

type SidebarProps = {
    className?: string;
    visible: boolean;
    onClick: () => void;
};

const Sidebar = ({ className, visible, onClick }: SidebarProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isLightMode = colorMode === "light";

    return (
        <div
            className={`fixed top-0 left-0 bottom-0 z-20 flex flex-col pt-24 bg-theme-on-surface-1 md:pt-20 ${
                visible
                    ? "w-[18.25rem] pb-20 2xl:w-76 xl:shadow-depth-1 md:w-full md:pb-0"
                    : "w-20 pb-[9.25rem]"
            } ${className || ""}`}
        >
            <div
                className={`absolute top-0 left-0 right-0 flex items-center h-24 md:hidden ${
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
            <button
                className={`group absolute w-12 h-12 md:hidden ${
                    visible ? "top-6 right-7" : "left-4 bottom-20"
                }`}
                onClick={onClick}
            >
                <Icon
                    className="fill-theme-secondary opacity-50 transition-[fill,opacity] group-hover:opacity-100 group-hover:fill-theme-primary"
                    name="toggle"
                />
            </button>
            <div
                className={`flex flex-col grow overflow-auto scroll-smooth scrollbar-none md:pb-6 ${
                    visible ? "px-6 md:px-4" : "px-4"
                }`}
            >
                <div className="flex flex-col space-y-2 mb-auto">
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
                {/*{visible && <UpgradeToPro />}*/}
                <div className="hidden flex-col mt-6 pt-4 border-t border-theme-stroke space-y-1 md:flex">
                    <NavLink
                        title="Contact support"
                        icon="support"
                        url="/support"
                        visible={visible}
                    />
                    <div className="group flex items-center h-12 px-4 rounded-xl transition-colors hover:bg-theme-on-surface-2 md:hover:bg-transparent">
                        <Icon
                            className="shrink-0 mr-4 fill-theme-secondary transition-colors group-hover:fill-theme-primary md:group-hover:fill-theme-secondary"
                            name={isLightMode ? "moon" : "sun"}
                        />
                        <div className="mr-auto text-base-1s text-theme-secondary transition-colors group-hover:text-theme-primary md:group-hover:text-theme-secondary">
                            {isLightMode ? "Dark" : "Light"}
                        </div>
                        <Switch
                            value={colorMode}
                            setValue={toggleColorMode}
                            small
                            theme
                        />
                    </div>
                    <NavLink
                        title="News"
                        icon="news"
                        url="/news"
                        visible={visible}
                    />
                    <NavLink
                        title="Log out"
                        icon="logout"
                        url="/sign-up"
                        visible={visible}
                    />
                </div>
            </div>
            <div
                className={`absolute left-0 right-0 bottom-0 pb-6 md:hidden ${
                    visible ? "pt-4 px-6" : "pt-2 px-4"
                }`}
            >
                <ToggleTheme visible={visible} />
            </div>
        </div>
    );
};

export default Sidebar;
