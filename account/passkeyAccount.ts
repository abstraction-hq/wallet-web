import { computePasskeyModuleAddress } from "@/utils/create2";
import { BaseAccount } from "./baseAccount";
import { Address, Hex, encodeAbiParameters, parseAbiParameters, toBytes, toHex } from "viem";
import { client, utils } from "@passwordless-id/webauthn";
import { AuthenticateOptions, AuthenticationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import { WebAuthnUtils } from "@/utils/webauthn";

export default class PasskeyAccount extends BaseAccount {
  singerAddress: Address;

  constructor(x: bigint, y: bigint) {
    super();
    this.singerAddress = computePasskeyModuleAddress(x, y);
  }

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
