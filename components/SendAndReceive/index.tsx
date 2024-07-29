import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import TabsSame from "@/components/TabsSame";
import Modal from "@/components/Modal";
import Send from "./Send";
import Receive from "./Receive";

type SendAndReceiveProps = {
  visibleModal: boolean;
  selectedAsset?: any;
  onClose: () => void;
};

const SendAndReceive = ({
  visibleModal,
  onClose,
  selectedAsset
}: SendAndReceiveProps) => {
  const [type, setType] = useState<string>("send");
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

  return (
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
      {type === "send" && <Send preSelectedAsset={selectedAsset} />}
      {type === "receive" && <Receive />}
    </Modal>

  );
};

export default SendAndReceive;
