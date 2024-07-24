"use client";
import Login from "@/components/Login";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
    >
      <button className="btn-primary w-full mb-3">
        <Link href="/create">Create new wallet</Link>{" "}
      </button>
      <button className="btn-secondary w-full mb-3">
        <Link href="/login">Login with exited wallet</Link>{" "}
      </button>
      <div className="mt-5 text-title-1s text-theme-tertiary md:mt-4 md:text-base-1s">
        Lost your wallet?{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/recover"
        >
          Recover
        </Link>{" "}
      </div>
    </Login>
  );
};

export default WelcomePage;
