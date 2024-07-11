import PasskeyAccount from "@/account/passkeyAccount";
import Login from "@/components/Login";
import { CHAINS } from "@/constants/chain";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import { WebAuthnUtils } from "@/utils/webauthn";
import { client, parsers, utils } from "@passwordless-id/webauthn";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import Link from "next/link";
import { createPublicClient, http } from "viem";

type SignUpHandleProps = {
  afterCreateWallet?: () => void;
  allowToggle?: boolean;
};

const SignUpHandle = ({ afterCreateWallet, allowToggle }: SignUpHandleProps) => {
  const createWallet = useWalletStore((state) => state.onCreateWallet);

  const onCreateWallet = async () => {
    const passkeyName = "passkey";

    const payload = utils.randomChallenge();

    const regData: RegistrationEncoded = await client.register(
      passkeyName,
      payload,
      {
        authenticatorType: "both",
        userVerification: "required",
      }
    );
    const parsedData = parsers.parseRegistration(regData);

    let passkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey
    );

    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
    );

    const [initWalletOp] = await account.sendTransactionOperation(ethClient, [
      {
        target: account.getSender(),
        value: 0n,
        data: "",
      },
    ]);

    console.log(await handleUserOp(initWalletOp));
    createWallet({
      id: 0,
      name: "Account 0",
      senderAddress: account.getSender(),
      passkeyCredentialId: parsedData.credential.id,
    });

    if (afterCreateWallet) {
      afterCreateWallet();
    }
  };

  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
      allowToggle={allowToggle}
    >
      <button className="btn-primary w-full mb-3" onClick={onCreateWallet}>
        Create wallet
      </button>
      <div className="text-caption-1 text-theme-secondary">
        By signing up, you agree to the{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Terms of Use
        </Link>
        ,{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Privacy Notice
        </Link>
        , and{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Cookie Notice
        </Link>
        .
      </div>
    </Login>
  );
};

export default SignUpHandle;
