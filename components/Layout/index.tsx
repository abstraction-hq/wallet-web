import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import FooterBar from "@/components/FooterBar";

type LayoutProps = {
    title: string;
    children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const isDesktop = useMediaQuery({
        query: "(max-width: 1259px)",
    });

    const isMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });

    useEffect(() => {
        setVisible(isMobile || !isDesktop);
    }, [isMobile, isDesktop]);

    return (
        <div
            className={`min-h-screen ${
                visible
                    ? "pl-[17.25rem] 2xl:pl-76 xl:pl-20 md:pl-0"
                    : "pl-20 md:pl-0"
            }`}
        >
            {!isMobile && (
                <Sidebar
                    className={`md:transition-transform ${
                        showMenu ? "md:translate-x-0" : "md:-translate-x-full"
                    }`}
                    visible={visible}
                    onClick={() => setVisible(!visible)}
                />
            )}
            <div className="">
                <div className="max-w-[80rem] mx-auto pt-24 px-10 pb-10 lg:px-6 md:pt-20 md:px-4 md:pb-8">
                    <Header
                        visible={visible}
                        title={title}
                        onClickBurger={() => setShowMenu(!showMenu)}
                        showMenu={showMenu}
                        view={isMobile ? "mobile" : "desktop"}
                    />
                    {/* {title && (
                        <div className="hidden md:flex items-center h-16 mb-2 px-4 bg-theme-on-surface-1 rounded-2xl text-h5">
                            {title}
                        </div>
                    )} */}
                    {children}
                </div>
                {isMobile && (
                    <FooterBar
                        visible={visible}
                        onClick={() => setVisible(!visible)}
                    />
                )}
            </div>
        </div>
    );
};

export default Layout;
