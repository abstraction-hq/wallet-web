import { computePasskeyModuleAddress } from "@/utils/create2";
import { BaseAccount } from "./baseAccount";
import { Address, Hex, PublicClient, concat, encodeAbiParameters, encodeFunctionData, hashMessage, parseAbiParameters, toBytes, toHex } from "viem";
import { client, utils } from "@passwordless-id/webauthn";
import { AuthenticateOptions, AuthenticationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import { WebAuthnUtils } from "@/utils/webauthn";
import { WALLET_FACTORY } from "@/constants";
import Factory from "@/abis/Factory.json";

export default class PasskeyAccount extends BaseAccount {
  singerAddress: Address;
  x: bigint;
  y: bigint;

  constructor(credentialIs: string, x: bigint, y: bigint) {
    const salt = hashMessage(credentialIs);
    super(salt);
    this.singerAddress = computePasskeyModuleAddress(salt);
    this.x = x
    this.y = y
  }

  test = async () => {

  }

  getInitCode = async (client: PublicClient): Promise<Hex> => {
    if (this.initCode != undefined) {
      return this.initCode;
    }
    const sender = this.getSender();
    const walletCode: string | undefined = await client.getBytecode({
      address: sender,
    });
    if (walletCode != undefined) {
      this.initCode = "0x";
    } else {
      this.initCode = concat([
        WALLET_FACTORY,
        encodeFunctionData({
          abi: Factory.abi,
          functionName: "createWalletWithPasskey",
          args: [this.x, this.y, this.salt],
        }),
      ]);
    }

    return this.initCode;
  };

  authenticate = (
    challenge: string,
    keyid?: string[] | undefined,
    options?: AuthenticateOptions
  ): Promise<AuthenticationEncoded> => {
    return client.authenticate(keyid ? keyid : [], challenge, options);
  };

  getSignerAddress = (): Address => {
    return this.singerAddress;
  };

  signMessage = async (message: any): Promise<Hex> => {
    console.log(message)
    const challenge = utils.toBase64url(toBytes(message)).replace(/=/g, "");
    const authData = await this.authenticate(challenge, [], {
      userVerification: "required",
      authenticatorType: "both",
    });
    const sig = WebAuthnUtils.getMessageSignature(authData.signature);
    const clientDataJSON = new TextDecoder().decode(
      utils.parseBase64url(authData.clientData)
    );
    const authenticatorData = new Uint8Array(
      utils.parseBase64url(authData.authenticatorData)
    );
    return encodeAbiParameters(
      parseAbiParameters("bytes, string, uint256, uint256, uint256, uint256"),
      [
        toHex(authenticatorData),
        clientDataJSON,
        23n,
        1n,
        sig[0] as bigint,
        sig[1] as bigint,
      ]
    );
  };
}
