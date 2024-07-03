import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import TabsSame from "@/components/TabsSame";
import Modal from "@/components/Modal";
import Send from "./Send";
import Receive from "./Receive";

type SendAndReceiveProps = {
  visibleModal: boolean;
  asset?: any;
  onClose: () => void;
};

const SendAndReceive = ({
  visibleModal,
  onClose,
  asset,
}: SendAndReceiveProps) => {
  const [type, setType] = useState<string>("send");

  if (!asset) {
    asset = {
      id: "0",
      logo: "/images/dcr.svg",
      symbol: "VIC",
      name: "Viction",
      decimals: 18,
    };
  }

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
      {type === "send" && <Send asset={asset} />}
      {type === "receive" && <Receive />}
    </Modal>
  );

  // return mounted && isTablet ? (
  //   <Modal
  //     classWrap="max-w-[28.5rem] rounded-3xl"
  //     visible={visibleModal}
  //     onClose={onClose}
  //   >
  //     <TabsSame
  //       className="mb-6"
  //       items={typeTasks}
  //       value={type}
  //       setValue={setType}
  //     />
  //     {type === "send" && <Send />}
  //     {type === "receive" && <Receive />}
  //   </Modal>
  // ) : (
  //   <div className="card-sidebar">
  //     <TabsSame
  //       className="mb-6"
  //       items={typeTasks}
  //       value={type}
  //       setValue={setType}
  //     />
  //     {type === "send" && <Send />}
  //     {type === "receive" && <Receive />}
  //   </div>
  // );
};

export default SendAndReceive;
