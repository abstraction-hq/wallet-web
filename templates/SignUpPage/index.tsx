"use client";
import { useRouter } from "next/navigation";
import SignUpHandle from "./SignUpHandle";

const SignUpPage = () => {
  const route = useRouter();

  const afterCreateWallet = () => {
    route.replace("/");
  }

  return (
    <SignUpHandle afterCreateWallet={afterCreateWallet} allowToggle />
  )
};

export default SignUpPage;
