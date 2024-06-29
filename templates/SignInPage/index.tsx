"use client";

import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";

const SignInPage = () => {
    const { colorMode } = useColorMode();
    const [email, setEmail] = useState("");

    return (
        <Login title="Sign in" image="/images/login-pic-1.png" signIn>
            <div className="mb-5 text-base-2">Sign up with Open account</div>
            <div className="flex mb-8 pb-8 border-b-2 border-theme-stroke space-x-2">
                <button className="btn-stroke flex-1 rounded-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g clip-path="url(#A)">
                            <path
                                d="M23.744 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                                fill="#4285f4"
                            />
                            <path
                                d="M12.253 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.513 21.3 7.563 24 12.253 24z"
                                fill="#34a853"
                            />
                            <path
                                d="M5.524 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
                                fill="#fbbc05"
                            />
                            <path
                                d="M12.253 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.203 1.19 15.493 0 12.253 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                                fill="#ea4335"
                            />
                        </g>
                        <defs>
                            <clipPath id="A">
                                <path fill="#fff" d="M0 0h24v24H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Google</span>
                </button>
                <button className="btn-stroke flex-1 rounded-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19.451 12.672c.023 2.361 1.395 3.705 2.375 4.365.521.351.833.971.59 1.539a13.34 13.34 0 0 1-1.345 2.422c-1.039 1.472-2.117 2.939-3.816 2.969-1.669.03-2.206-.959-4.114-.959s-2.504.929-4.084.989c-1.64.06-2.888-1.592-3.936-3.059-2.141-3-3.776-8.478-1.58-12.176C4.634 6.927 6.584 5.764 8.7 5.735c1.61-.03 3.13 1.05 4.114 1.05s2.83-1.299 4.772-1.108c.667.027 2.325.224 3.707 1.444.525.463.338 1.251-.168 1.734-.77.734-1.69 1.993-1.674 3.817zm-3.137-8.98c.639-.749 1.124-1.714 1.274-2.734.093-.629-.494-1.111-1.116-.913-.946.301-1.895.895-2.533 1.62-.618.693-1.177 1.704-1.319 2.763-.076.566.425 1.025 1 .905 1.048-.219 2.033-.864 2.695-1.641z"
                            fill={colorMode === "light" ? "#1a1d1f" : "#fff"}
                        />
                    </svg>
                    <span>Apple ID</span>
                </button>
            </div>
            <div className="mb-5 text-base-2">
                Or continue with email address
            </div>
            <Field
                className="mb-3"
                placeholder="Enter your email"
                icon="envelope"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-3"
                placeholder="Enter your password"
                icon="password"
                type="password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button className="btn-primary w-full mb-3">Start trading</button>
        </Login>
    );
};

export default SignInPage;
