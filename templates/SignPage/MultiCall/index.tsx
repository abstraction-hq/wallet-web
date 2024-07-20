"use client";
import { useWalletStore } from "@/stores/walletStore";
import React, { useEffect, useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";

type MultiCallProps = {
  signData: any;
  loading: boolean;
  onConfirm: () => void;
  onReject: () => void;
};

const MultiCall = ({
  loading,
  onConfirm,
  onReject,
  signData,
}: MultiCallProps) => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const params = signData?.params[0];
  const dappInfo = signData?.dappInfo || {};
  const [activeId, setActiveId] = useState("0");

  console.log("params", params);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[28.5rem] w-full p-6 text-white">
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">Requested from</div>
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full`}
            >
              <Image src={dappInfo.icon} width={48} height={48} alt="" />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">
                {dappInfo.title}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  {dappInfo.hostname}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 space-y-1">
          <div className="text-base-2 text-theme-secondary">
            Est. Transaction detail
          </div>
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full bg-theme-brand-100`}
            >
              <Image
                src={`/images/viction.jpeg`}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="grow">
              <div className="text-3xl text-theme-primary font-medium">{`- ${parseInt(
                params.value || 0,
                16
              )} VIC`}</div>
              <div className="flex justify-between items-center">
                <div className="text-base-2 text-theme-secondary">
                  {`≈ ${0}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 text-sm">
          <div className="flex items-center border-t border-theme-stroke py-3 justify-between">
            <div className="text-left">
              <div className="flex items-center">
                <Image
                  src="/images/viction.jpeg"
                  width={24}
                  height={24}
                  alt="Viction"
                  className="mr-2"
                />
                <div className="text-base-1 text-theme-secondary">
                  Viction Est network fee
                </div>
              </div>
              {/* <div className="text-title-1m font-medium text-theme-primary">
                  Average
                </div> */}
              <div className="text-base-1s font-medium text-theme-primary">
                <span className="line-through mr-1 ml-1">
                  0.000025 VIC ≈ $0.00001
                </span>
                <span className="text-green-600">(Sponsor by Abstraction)</span>
              </div>
              {/* <div className="text-base-1 text-theme-secondary">
                  The max network fee is 0.0002536 VIC ($0.7817)
                </div> */}
            </div>
            {/* <Icon
                className="ml-3 fill-theme-primary md:ml-1.5"
                name="arrow-next"
              /> */}
          </div>
          <div className="flex items-center border-t border-theme-stroke py-3">
            <div className="flex flex-col text-left w-4/5">
              <div className="flex items-center">
                <div className="text-base-1 text-theme-secondary">
                  Wallet used
                </div>
              </div>
              <div className="text-base-1s font-medium text-theme-primary">
                {wallet?.senderAddress}
              </div>
            </div>
            <div className="flex justify-end w-1/5">
              <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
            </div>
          </div>
          <div className="mb-2 text-xl text-center font-semibold text-theme-primary">
            Action Calls
          </div>
          <div className="pt-1 mt-3 scrollbar-none justify-center scroll-smooth h-96 overflow-y-auto">
            {params.calls.map((call: any, index: number) => (
                <div key={index} className="px-2">
                  <div className="font-semibold text-theme-primary">
                    Call {index + 1}
                  </div>
                  <div className="border-theme-stroke border-t mt-1">
                    <div className="flex items-center py-1 mt-1">
                      <div className="flex flex-col text-left w-4/5">
                        <div className="flex items-center">
                          <div className="text-base-1 text-theme-secondary">Interact with</div>
                        </div>
                        <div className="text-base-1s font-medium text-theme-primary">{call.to}</div>
                      </div>
                      <div className="flex justify-end w-1/5">
                        <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
                      </div>
                    </div>
                    <div className="flex items-center py-1">
                      <div className="flex flex-col text-left w-4/5">
                        <div className="flex items-center">
                          <div className="text-base-1 text-theme-secondary">Data</div>
                        </div>
                        <div className="text-base-1s font-medium text-theme-primary">{call.data}</div>
                      </div>
                      <div className="flex justify-end w-1/5">
                        <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
                      </div>
                    </div>
                    <div className="flex items-center py-1">
                      <div className="flex flex-col text-left w-4/5">
                        <div className="flex items-center">
                          <div className="text-base-1 text-theme-secondary">Value</div>
                        </div>
                        <div className="text-base-1s font-medium text-theme-primary">
                          {call.value.toString()}
                        </div>
                      </div>
                      <div className="flex justify-end w-1/5">
                        <Icon className="fill-theme-primary md:ml-1.5" name="copy" />
                      </div>
                    </div>
                    <div className="border-theme-stroke border-t mb-2"/>
                  </div>
                </div>
            ))}
            {/*{params.calls.map((call: any, index: number) => (*/}
            {/*    <div key={index} className="border-t scrollbar-none scroll-smooth border-theme-stroke">*/}
            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">*/}
            {/*              Interact with*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.to}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">Data</div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.data}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">Data</div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.data}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">Data</div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.data}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">Data</div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.data}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}

            {/*      <div className="flex items-center py-3">*/}
            {/*        <div className="flex flex-col text-left w-4/5">*/}
            {/*          <div className="flex items-center">*/}
            {/*            <div className="text-base-1 text-theme-secondary">*/}
            {/*              Value*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <div className="text-base-1s font-medium text-theme-primary">*/}
            {/*            {call.value.toString()}*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-end w-1/5">*/}
            {/*          <Icon className="fill-theme-primary md:ml-1.5" name="copy" />*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*))}*/}

          </div>

        </div>
        {loading ? (
          <div className="flex justify-center w-full mt-6">
            <button className="p-2 w-full btn-gray">
              <Loading />
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full mt-6">
            <button
              onClick={onConfirm}
              className="btn-secondary mr-2 w-1/2 px-4"
            >
              Confirm
            </button>
            <button onClick={onReject} className="btn-gray w-1/2 px-4">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiCall;
