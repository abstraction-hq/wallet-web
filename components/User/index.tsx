import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import Link from "next/link";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Switch from "@/components/Switch";
import NavLink from "./NavLink";

type UserProps = {
    className?: string;
};

const User = ({ className }: UserProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isLightMode = colorMode === "light";

    return (
        <Menu className={`relative ${className || ""}`} as="div">
            <MenuButton className="group w-12 h-12">
                <Image
                    className="w-12 h-12 object-cover rounded-full opacity-100"
                    src="/images/avatar.jpg"
                    width={48}
                    height={48}
                    alt=""
                />
            </MenuButton>
            <Transition
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-300 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <MenuItems
                    className="absolute top-full -right-4 w-[19.75rem] mt-2 p-3 rounded-2xl border border-theme-stroke bg-theme-surface-pure shadow-depth-1 lg:right-0"
                    modal={false}
                >
                    <div className="flex items-center mb-2 p-3 rounded-xl bg-theme-n-8">
                        <div className="">
                            <Image
                                className="w-16 h-16 rounded-full opacity-100"
                                src="/images/avatar.jpg"
                                width={64}
                                height={64}
                                alt=""
                            />
                        </div>
                        <div className="grow pl-4.5">
                            <div className="text-title-1s">Display Name</div>
                            <div className="text-body-1m text-theme-secondary">
                                @username
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 space-y-1">
                        <NavLink
                            title="Settings"
                            icon="settings"
                            url="/settings"
                        />
                        <NavLink
                            title="Contact support"
                            icon="support"
                            url="/support"
                        />
                        <div className="group flex items-center h-12 px-4 rounded-xl transition-colors hover:bg-theme-on-surface-2">
                            <Icon
                                className="shrink-0 mr-4 fill-theme-secondary transition-colors group-hover:fill-theme-primary"
                                name={isLightMode ? "moon" : "sun"}
                            />
                            <div className="mr-auto text-base-1s text-theme-secondary transition-colors group-hover:text-theme-primary">
                                {isLightMode ? "Dark" : "Light"}
                            </div>
                            <Switch
                                value={colorMode}
                                setValue={toggleColorMode}
                                small
                                theme
                            />
                        </div>
                        <NavLink title="News" icon="news" url="/news" />
                    </div>
                    <NavLink title="Log out" icon="logout" url="/sign-up" />
                </MenuItems>
            </Transition>
        </Menu>
    );
};

export default User;
