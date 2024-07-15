"use client"
import { computePasskeyModuleAddress } from "@/utils/create2";
import { BaseAccount } from "./baseAccount";
import {
  Address,
  Hex,
  PublicClient,
  concat,
  encodeAbiParameters,
  encodeFunctionData,
  hashMessage,
  parseAbiParameters,
  toBytes,
  toHex,
} from "viem";
import { client, utils } from "@passwordless-id/webauthn";
import {
  AuthenticateOptions,
  AuthenticationEncoded,
} from "@passwordless-id/webauthn/dist/esm/types";
import { WebAuthnUtils } from "@/utils/webauthn";
import { BOOTSTRAP, PASSKEY, WALLET_FACTORY } from "@/constants";
import Factory from "@/abis/Factory.json";
import Bootstrap from "@/abis/Bootstrap.json";

const WebAuthnAuth = [
  {
    components: [
      {
        name: "authenticatorData",
        type: "bytes",
      },
      {
        name: "clientDataJSON",
        type: "string",
      },
      {
        name: "challengeIndex",
        type: "uint256",
      },
      {
        name: "typeIndex",
        type: "uint256",
      },
      {
        name: "r",
        type: "uint256",
      },
      {
        name: "s",
        type: "uint256",
      },
    ],
    name: "webAuthnAuth",
    type: "tuple",
  },
];

export default class PasskeyAccount extends BaseAccount {
  credentialId: string;
  x: bigint;
  y: bigint;

  constructor(credentialId: string, x: bigint, y: bigint) {
    const salt: Hex = hashMessage(credentialId);
    super(salt);
    this.credentialId = credentialId;
    this.x = x;
    this.y = y;
  }

  getInitCode = async (client: PublicClient): Promise<Hex> => {
    const sender = this.getSender();
    const walletCode: string | undefined = await client.getBytecode({
      address: sender,
    });
    if (walletCode != undefined) {
      this.initCode = "0x";
    } else {
      console.log(this.salt, this.x, this.y)
      const bootstrapInitData = encodeFunctionData({
        abi: Bootstrap.abi,
        functionName: "init",
        args: [this.salt, this.x, this.y],
      });
      const bootstrapData = encodeAbiParameters(
        parseAbiParameters("address, bytes memory"),
        [BOOTSTRAP, bootstrapInitData]
      );
      console.log(bootstrapData)
      this.initCode = concat([
        WALLET_FACTORY,
        encodeFunctionData({
          abi: Factory.abi,
          functionName: "createWallet",
          args: [bootstrapData, this.salt],
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
    return PASSKEY;
  };

  signMessage = async (message: any): Promise<Hex> => {
    const challenge = utils.toBase64url(toBytes(message));
    const authData = await this.authenticate(challenge, [this.credentialId], {
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
    const res = encodeAbiParameters(WebAuthnAuth, [
      {
        authenticatorData: toHex(authenticatorData),
        clientDataJSON,
        challengeIndex: 23n,
        typeIndex: 1n,
        r: sig[0] as bigint,
        s: sig[1] as bigint,
      },
    ]);

    return encodeAbiParameters(parseAbiParameters("bytes32, bytes"), [
      this.salt,
      res,
    ]);
  };
}
