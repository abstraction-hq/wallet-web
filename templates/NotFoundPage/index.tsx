"use client";

import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import User from "@/components/User";

const NotFoundPage = () => {
    const { colorMode } = useColorMode();

    return (
        <div className="flex flex-col min-h-svh">
            <div className="relative z-5 flex items-center h-28 pl-6 pr-8 md:h-24 md:pr-6">
                <Link
                    className="flex justify-center items-center w-12 h-12 mr-auto"
                    href="/"
                >
                    <Image
                        className="w-10 opacity-100"
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
                <User />
            </div>
            <div className="flex grow justify-center items-center px-6 pt-6 pb-24 md:pt-6 md:pb-12 md:px-10">
                <div className="flex items-center max-w-[63rem] w-full xl:max-w-[47.5rem] md:block">
                    <div className="shrink-0 w-[30.375rem] xl:w-[21.75rem] md:w-60">
                        <Image
                            className="w-full opacity-100"
                            src="/images/404.png"
                            width={486}
                            height={522}
                            alt=""
                        />
                    </div>
                    <div className="grow pl-32 xl:pl-28 lg:pl-16 md:pl-0 md:pt-8">
                        <div className="mb-5 text-display md:mb-4 md:text-h2">
                            Oops!
                        </div>
                        <div className="mb-10 text-h4 text-theme-tertiary xl:text-h5 md:mb-8 md:text-title-1s">
                            We couldn&apos;t find the page you were looking for
                        </div>
                        <Link className="btn-secondary" href="/">
                            <Icon name="arrow-left" />
                            <span>Go home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
