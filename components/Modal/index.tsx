import { Fragment } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/Icon";
import ButtonBack from "@/components/ButtonBack";

type ModalProps = {
    className?: string;
    classWrap?: string;
    classOverlay?: string;
    classButtonClose?: string;
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showTextClose?: string;
    showButtonClose?: boolean;
};

const Modal = ({
    className,
    classWrap,
    classOverlay,
    classButtonClose,
    visible,
    onClose,
    children,
    showTextClose,
    showButtonClose,
}: ModalProps) => {
    return (
        <Transition show={visible} as={Fragment}>
            <Dialog
                className={`fixed inset-0 z-50 flex p-6 overflow-auto scroll-smooth md:p-4 ${
                    className || ""
                }`}
                onClose={onClose}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={`fixed inset-0 bg-n-8/20 dark:bg-n-6/90 ${
                            classOverlay || ""
                        }`}
                        aria-hidden="true"
                    />
                </TransitionChild>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel
                        className={twMerge(
                            `relative z-10 max-w-[32rem] w-full m-auto p-8 bg-theme-on-surface-1 border border-theme-stroke rounded-[2.5rem] shadow-depth-1 md:p-6 md:rounded-2xl ${
                                classWrap || ""
                            }`
                        )}
                    >
                        {showTextClose && (
                            <ButtonBack
                                title={showTextClose}
                                onClick={onClose}
                            />
                        )}
                        {children}
                        {showButtonClose && (
                            <button
                                className={twMerge(
                                    `group absolute top-4 right-4 text-0 ${
                                        classButtonClose || ""
                                    }`
                                )}
                                onClick={onClose}
                            >
                                <Icon
                                    className="fill-theme-tertiary transition-colors group-hover:fill-theme-primary"
                                    name="close-circle"
                                />
                            </button>
                        )}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
};

export default Modal;
