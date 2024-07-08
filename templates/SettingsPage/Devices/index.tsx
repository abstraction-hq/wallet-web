import { devices } from "@/mocks/devices";
import Image from "@/components/Image";
import React from "react";
import { Icon } from "@chakra-ui/react";
import { getCurrentBrowser } from "@/utils/browser";

type DevicesProps = {};

const DeviceLogo: any = {
  "Chrome": "/images/chrome.png",
  "Safari": "/images/safari.png",
};

const Devices = ({}: DevicesProps) => {
  const currentBrowser = getCurrentBrowser()
  const browserLogo = DeviceLogo[currentBrowser.name as string] as string
  return (
    <div className="mt-5 -mx-6 md:-mx-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="pl-6 py-3 text-left text-caption-2m text-theme-secondary md:pl-4">
              Name
            </th>
            <th className="pl-4 py-3 pr-6 text-left text-caption-2m text-theme-secondary md:pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr className="" key={device.id}>
              <td className="border-t border-theme-stroke pl-6 py-3 md:pl-4">
                <div className="inline-flex items-center text-base-1s">
                  <div className="crypto-logo shrink-0 mr-4">
                    <Image
                      className="w-8 opacity-100"
                      src={browserLogo || device.logo}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </div>
                  {currentBrowser.name}@{currentBrowser.version}
                </div>
              </td>
              <td className="border-t border-theme-stroke pl-4 py-3 pr-6 text-right md:pr-4">
                <div className="inline-flex space-x-2">
                  <button className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0 cursor-not-allowed disabled:transform-none">
                    <span className="md:hidden">Logout</span>
                    <Icon
                      className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                      name="plus"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Devices;
