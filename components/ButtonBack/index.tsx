import Icon from "@/components/Icon";

type ButtonBackProps = {
    className?: string;
    title: string;
    onClick: () => void;
};

const ButtonBack = ({ className, title, onClick }: ButtonBackProps) => (
    <button
        className={`group inline-flex items-center h-14 mb-6 text-h5 md:h-10 md:text-title-1s ${
            className || ""
        }`}
        onClick={onClick}
    >
        <div className="flex justify-center items-center w-10 h-10 mr-3">
            <Icon
                className="fill-theme-secondary transition-transform group-hover:-translate-x-0.5"
                name="arrow-left"
            />
        </div>
        {title}
    </button>
);

export default ButtonBack;
