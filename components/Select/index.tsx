import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import Icon from "@/components/Icon";

type ItemsType = {
    id: string;
    title: string;
};

type SelectProps = {
    className?: string;
    classButton?: string;
    classOption?: string;
    label?: string;
    placeholder?: string;
    value: any;
    onChange: any;
    items: ItemsType[];
};

const Select = ({
    className,
    classButton,
    classOption,
    label,
    placeholder,
    value,
    onChange,
    items,
}: SelectProps) => (
    <div className={`${className || ""}`}>
        {label && <div className="mb-2">{label}</div>}
        <Listbox
            className="relative"
            value={value}
            onChange={onChange}
            as="div"
        >
            <ListboxButton
                className={`flex justify-between items-center w-full h-10 px-3.5 rounded-xl border-2 border-theme-stroke text-base-2 outline-none transition-colors ui-open:border-theme-border-brand ${
                    value ? "text-theme-secondary" : "text-theme-secondary"
                } ${classButton || ""}`}
            >
                <div className="truncate">
                    {value ? value.title : placeholder}
                </div>
                <Icon
                    className="shrink-0 !w-4 !h-4 ml-4 fill-theme-secondary transition-transform ui-open:rotate-180"
                    name="arrow-down"
                />
            </ListboxButton>
            <Transition
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-300 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <ListboxOptions className="absolute top-full left-0 right-0 z-2 mt-0.5 border-2 border-theme-stroke bg-theme-on-surface-1 rounded-xl outline-none overflow-hidden">
                    {items.map((item) => (
                        <ListboxOption
                            className={`px-3.5 py-2 text-base-2 text-theme-secondary transition-colors cursor-pointer hover:bg-theme-on-surface ui-selected:bg-theme-on-surface-2 ui-selected:text-theme-primary ${
                                classOption || ""
                            }`}
                            key={item.id}
                            value={item}
                        >
                            {item.title}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </Listbox>
    </div>
);

export default Select;
