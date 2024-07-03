import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Trade from "@/components/Trade";
import User from "@/components/User";
import Image from "@/components/Image";
import Notifications from "./Notifications";
import Search from "./Search";

type HeaderProps = {
  title: string;
  visible?: boolean;
  showMenu?: boolean;
  onClickBurger?: () => void;
};

const Header = ({ title, visible, showMenu, onClickBurger }: HeaderProps) => {
  const router = useRouter();
  const [visibleModalSearch, setVisibleModalSearch] = useState<boolean>(false);
  const [visibleModalTrade, setVisibleModalTrade] = useState<boolean>(false);
  const [visibleModalSendReceive, setVisibleModalSendReceive] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  return (
    <>
      <div
        className={`fixed top-0 right-0 z-10 bg-theme-n-8 md:z-30 md:px-4 md:py-2 md:transition-colors ${
          visible
            ? "left-[17.25rem] 2xl:left-76 xl:left-20 md:left-0"
            : "left-20 md:left-0"
        } ${showMenu ? "md:!bg-theme-on-surface-1" : ""}`}
      >
        <div
          className={`flex items-center h-24 max-w-[80rem] mx-auto px-10 lg:px-6 md:h-16 md:px-4 md:bg-theme-on-surface-1 md:rounded-2xl md:transition-shadow ${
            showMenu
              ? "shadow-depth-1 dark:shadow-[inset_0_0_0_0.125rem_#272B30]"
              : ""
          }`}
        >
          <Link className="hidden md:block mr-auto" href="/">
            <Image
              className="w-9 opacity-100"
              src={
                colorMode === "light"
                  ? "/images/logo-dark.svg"
                  : "/images/logo-light.svg"
              }
              width={96}
              height={96}
              alt=""
            />
          </Link>
          <button
            className="group inline-flex items-center mr-auto text-h5 md:hidden"
            onClick={() => router.back()}
          >
            <div className="flex justify-center items-center w-10 h-10 mr-3.5 lg:mr-1">
              <Icon
                className="fill-theme-primary transition-transform group-hover:-translate-x-0.5"
                name="arrow-left"
              />
            </div>
            {title}
          </button>
          <div className="flex items-center ml-auto space-x-6">
            <button
              className="btn-primary"
              onClick={() => setVisibleModalSendReceive(true)}
            >
              Send & Receive
            </button>
            <button
              className="group w-12 h-12 outline-none md:w-8 md:h-8"
              onClick={() => setVisibleModalSearch(true)}
            >
              <Icon
                className="fill-theme-secondary transition-colors group-hover:fill-theme-primary"
                name="search"
              />
            </button>
            <Notifications />
            <button
              className={`hidden rounded-full transition-shadow md:block ${
                showMenu ? "shadow-[0_0_0_0.125rem_#0C68E9]" : ""
              }`}
              onClick={onClickBurger}
            >
              <Image
                className="w-8 h-8 object-cover rounded-full opacity-100"
                src="/images/avatar.jpg"
                width={32}
                height={32}
                alt=""
              />
            </button>
            <User className="md:hidden" />
          </div>
        </div>
      </div>
      <Modal
        classWrap="max-w-[40rem] !p-0 rounded-3xl overflow-hidden"
        visible={visibleModalSearch}
        onClose={() => setVisibleModalSearch(false)}
      >
        <Search />
      </Modal>
      <Modal
        classWrap="p-8 md:!px-4 md:!py-6"
        visible={visibleModalSendReceive}
        onClose={() => setVisibleModalSendReceive(false)}
      >
        <Trade />
      </Modal>
    </>
  );
};

export default Header;
