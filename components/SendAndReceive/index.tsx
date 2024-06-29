import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import TabsSame from "@/components/TabsSame";
import Modal from "@/components/Modal";
import Send from "./Send";
import Receive from "./Receive";

type SendAndReceiveProps = {
    visibleModal: boolean;
    onClose: () => void;
};

const SendAndReceive = ({ visibleModal, onClose }: SendAndReceiveProps) => {
    const [type, setType] = useState<string>("send");
    const [mounted, setMounted] = useState(false);
    const isTablet = useMediaQuery({
        query: "(max-width: 1023px)",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const typeTasks = [
        {
            title: "Send",
            value: "send",
        },
        {
            title: "Receive",
            value: "receive",
        },
    ];

    return mounted && isTablet ? (
        <Modal
            classWrap="max-w-[28.5rem] rounded-3xl"
            visible={visibleModal}
            onClose={onClose}
        >
            <TabsSame
                className="mb-6"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            {type === "send" && <Send />}
            {type === "receive" && <Receive />}
        </Modal>
    ) : (
        <div className="card-sidebar">
            <TabsSame
                className="mb-6"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            {type === "send" && <Send />}
            {type === "receive" && <Receive />}
        </div>
    );
};

export default SendAndReceive;
