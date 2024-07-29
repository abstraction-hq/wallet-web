import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import Image from "@/components/Image";

type LoginProps = {
  title: string;
  description?: string;
  image: string;
  signIn?: boolean;
  verifyCode?: boolean;
  allowToggle?: boolean;
  children: React.ReactNode;
};

const Login = ({
  title,
  description,
  image,
  signIn,
  verifyCode,
  children,
  allowToggle,
}: LoginProps) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <div className="relative flex min-h-svh p-4 bg-theme-on-surface-1 lg:pt-24 lg:pb-12 md:px-6 md:pt-20 md:pb-8">
      <div className="flex grow justify-center items-center px-12 py-14 lg:p-0">
        <div className="max-w-[32.5rem] w-full 2xl:max-w-[28rem] xl:max-w-[28rem]">
          <div className="mb-10 2xl:mb-8">
            <div className="flex md:justify-center md:items-center md:h-full">
              <Link
                  className="absolute top-10 left-10 z-2 2xl:top-8 2xl:right-8 lg:top-10 lg:right-10 md:static md:inline-block md:mb-5 flex md:justify-center md:items-center"
                  href="/"
              >
                <Image
                    className="opacity-100 w-10 h-10 md:w-20 md:h-20"
                    src={
                      colorMode === "light"
                          ? "/images/logo-dark.svg"
                          : "/images/logo-light.svg"
                    }
                    width={40}
                    height={40}
                    alt=""
                />
              </Link>
            </div>
            <div className="relative text-h1 2xl:text-h2 md:text-h3 md:text-center">
              {title}
              {verifyCode && (
                <div className="absolute -top-12 right-4.5 pointer-events-none md:hidden">
                  <Image
                    src="/images/confetti.svg"
                    width={213}
                    height={163}
                    alt=""
                  />
                </div>
              )}
            </div>
            {description && (
              <div className="mt-5 text-title-1s text-theme-tertiary md:mt-4 md:text-base-1s md:text-center">
                {description}
              </div>
            )}
          </div>
          {children}
          {/* <div className="text-caption-1 text-theme-secondary">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
