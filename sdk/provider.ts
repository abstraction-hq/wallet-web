import EventEmitter from "eventemitter3";
import { Address } from "viem";
import { Communicator, Message } from "./communicator/communicator";
import { supportedMethods } from "./constants/supportedMethod";

type MethodCategory = keyof typeof supportedMethods;
export type Method<C extends MethodCategory = MethodCategory> =
  (typeof supportedMethods)[C][number];

export interface RequestArguments {
  readonly method: Method | string;
  readonly params?: readonly unknown[] | object;
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ProviderMessage {
  type: string;
  data: unknown;
}

function determineMethodCategory(method: string): MethodCategory | undefined {
  for (const c in supportedMethods) {
    const category = c as MethodCategory;
    if ((supportedMethods[category] as readonly string[]).includes(method)) {
      return category;
    }
  }
  return undefined;
}

export interface IProvider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
  disconnect(): Promise<void>;
  on(event: "connect", listener: (info: ProviderConnectInfo) => void): this;
  on(event: "disconnect", listener: (error: ProviderRpcError) => void): this;
  on(event: "chainChanged", listener: (chainId: string) => void): this;
  on(event: "accountsChanged", listener: (accounts: string[]) => void): this;
  on(event: "message", listener: (message: ProviderMessage) => void): this;
}

export class AbstractionProvider extends EventEmitter implements IProvider {
  communicator: Communicator;
  accounts: Address[] = [];
  isAbstractionWallet: boolean = true;

  constructor() {
    super();
    this.communicator = new Communicator(null);
  }

  public get connected() {
    return this.accounts.length > 0;
  }

  public async request<T>(args: RequestArguments): Promise<T> {
    const methodCategory = determineMethodCategory(args.method) ?? "fetch";
    return this.handlers[methodCategory](args) as unknown as T;
  }

  public async disconnect(): Promise<void> {
    this.accounts = [];
  }

  protected handlers = {
    handshake: async (args: RequestArguments) => {
      if (this.connected) {
        this.emit("connect", { chainId: "1" });
        return this.accounts;
      }

      return new Promise<Address[]>(async (resolve, reject) => {
        const [handshakePopup]: [Communicator, string] =
          await this.communicator.openPopup("connect");
        const handshakeResponse: Message =
          await handshakePopup.sendRequestMessage(args);
        this.accounts = handshakeResponse.payload as Address[];

        this.emit("connect", { chainId: "1" });
        resolve(this.accounts);
      });
    },
    sign: async (args: RequestArguments) => {
      console.log(this.accounts)
      if (!this.connected) {
        throw new Error("Not connected");
      }

      return new Promise(async (resolve, reject) => {
        const [signPopup]: [Communicator, string] =
          await this.communicator.openPopup("sign");
        const signResponse: Message =
          await signPopup.sendRequestMessage(args);
        resolve(signResponse.payload);
      })
    },
    fetch: async (args: RequestArguments) => {},
    state: async (args: RequestArguments) => {},
    deprecated: async (args: RequestArguments) => {},
    unsupported: ({ method }: RequestArguments) => {
      // throw standardErrors.rpc.methodNotSupported(`Method ${method} is not supported.`);
    },
  };
}
