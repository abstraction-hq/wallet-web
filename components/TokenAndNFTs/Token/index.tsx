import { use, useState } from "react";

type TokenProps = {
  asset: any;
};

const Token = ({ asset }: TokenProps) => {

  return (
      <div className="space-y-1">
        <div className="relative mt-4 mb-6">
          <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none"
              placeholder="Search"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <img src={asset.logo} alt="VIC" className="w-8 h-8" />
              <div className="flex flex-col items-start">
                  <span className="font-bold">{asset.name}</span>
                  <span className="text-gray-500">0xbBE6...aD39</span>
              </div>
          </div>
          <div className="text-right">
            <span className="block font-bold">$3.12</span>
            <span className="block text-gray-500">0.00102 VIC</span>
          </div>
        </div>
      </div>
  );
};

export default Token;
