import Link from "next/link";
import Icon from "@/components/Icon";

type NavLinkProps = {
    url: string;
    target?: string;
    icon: string;
    title: string;
};

const NavLink = ({ url, icon, title, target }: NavLinkProps) => (
    <Link
        className="group flex items-center h-12 px-4 rounded-xl text-base-1s text-theme-secondary transition-colors hover:bg-theme-on-surface-2 hover:text-theme-primary"
        target={target}
        href={url}
    >
        <Icon
            className="shrink-0 mr-4 fill-theme-secondary transition-colors group-hover:fill-theme-primary"
            name={icon}
        />
        {title}
    </Link>
);

export default NavLink;
