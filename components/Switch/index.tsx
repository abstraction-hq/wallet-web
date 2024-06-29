import { Switch as SwitchReact } from "@headlessui/react";

type SwitchProps = {
    className?: string;
    value: any;
    setValue: any;
    small?: boolean;
    theme?: boolean;
};

const Switch = ({ className, value, setValue, small, theme }: SwitchProps) => (
    <div className={`inline-flex shrink-0 ${className || ""}`}>
        <SwitchReact
            className={`relative inline-flex cursor-pointer rounded-full transition-colors outline-none ${
                small ? "w-12 h-6 border-2" : "w-14 h-8 border-4"
            } ${
                (theme ? value === "dark" : value)
                    ? "bg-theme-brand border-theme-brand"
                    : "bg-theme-on-surface-3 border-theme-on-surface-3"
            }`}
            checked={value}
            onChange={setValue}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block rounded-full bg-theme-white-fixed transition-all ${
                    small ? "w-5 h-5" : "w-6 h-6"
                } ${
                    (theme ? value === "dark" : value)
                        ? "translate-x-6"
                        : "translate-x-0"
                }`}
            />
        </SwitchReact>
    </div>
);

export default Switch;
