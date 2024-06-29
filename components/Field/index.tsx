import { ChangeEvent } from "react";
import Icon from "@/components/Icon";

type FieldProps = {
    className?: string;
    classInput?: string;
    label?: string;
    note?: string;
    icon?: string;
    textarea?: boolean;
    type?: string;
    success?: boolean;
    error?: boolean;
};

const Field = ({
    className,
    classInput,
    label,
    note,
    icon,
    textarea,
    type,
    success,
    error,
    ...inputProps
}: FieldProps &
    React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <div className={`${className || ""}`}>
            {label && <div className="mb-2 text-base-2">{label}</div>}
            <div className={`relative ${textarea ? "text-0" : ""}`}>
                {icon && (
                    <Icon
                        className="absolute top-1/2 left-3 z-2 -translate-y-1/2 fill-theme-secondary pointer-events-none"
                        name={icon}
                    />
                )}
                {textarea ? (
                    <textarea
                        className={`w-full h-[8.75rem] px-4 py-3 bg-theme-on-surface border border-transparent rounded-xl font-sans text-base-2 text-theme-primary resize-none placeholder:text-theme-tertiary transition-colors focus:bg-theme-on-surface-1 focus:border-brand-500 outline-none md:text-[1rem] ${
                            classInput || ""
                        } ${
                            success
                                ? "!border-primary-2 !bg-theme-green-100 !text-primary-2 placeholder:!text-primary-2"
                                : ""
                        } ${
                            error
                                ? "!border-primary-3 !bg-theme-red-100 !text-theme-red placeholder:!text-theme-red"
                                : ""
                        } ${icon ? "pl-12" : ""}`}
                        {...inputProps}
                    ></textarea>
                ) : (
                    <input
                        className={`w-full h-12 px-4 bg-theme-on-surface border border-transparent rounded-xl font-sans text-base-2 text-theme-primary placeholder:text-theme-tertiary transition-colors focus:bg-theme-on-surface-1 focus:border-brand-500 outline-none md:text-[1rem] ${
                            classInput || ""
                        } ${
                            success
                                ? "!border-primary-2 !bg-theme-green-100 !text-primary-2 placeholder:!text-primary-2"
                                : ""
                        } ${
                            error
                                ? "!border-primary-3 !bg-theme-red-100 !text-theme-red placeholder:!text-theme-red"
                                : ""
                        } ${icon ? "pl-12" : ""}`}
                        type={type || "text"}
                        {...inputProps}
                    />
                )}
            </div>
            {note && (
                <div className="mt-2 text-caption-2m text-theme-tertiary">
                    {note}
                </div>
            )}
        </div>
    );
};

export default Field;
