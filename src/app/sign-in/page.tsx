"use client";
import FormInput from "@/components/core/FormInput";
import * as React from "react";
import AccountImage from "../../../public/access_account.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/helper/apiCall";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setSignIn } from "@/lib/redux/features/userSlice";
import BackgroundSlider from "@/components/BackgroundSlider";
import FloatingParticles from "@/components/FloatingParticles";

const SignInPage: React.FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Refs for form inputs
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  
  const onSignIn = async () => {
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email && !password) {
        alert("Please fill all fields");
        return;
      }
      const res = await apiCall.get("/accounts", {
        params: {
          where: `email = '${email}' AND password = '${password}'`,
        },
      });
      dispatch(setSignIn(res.data[0]));

      // Store objectId to localStorage
      localStorage.setItem("tkn", res.data[0].objectId);

      alert("Welcome back!");
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("tkn")) {
      router.replace("/");
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundSlider />
        <FloatingParticles />
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none z-25">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/80 to-transparent"></div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-blue-400/80 to-transparent"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-purple-400/80 to-transparent"></div>
      </div>
      <div className="absolute inset-0 bg-gray-950/50" />

      <div className="relative z-30 flex items-center justify-center mt-15 p-4 sm:p-6 min-h-screen">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden mt-8 sm:mt-0">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Branding */}
            <div className="w-full md:w-1/2 bg-blue-800 text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">BPR Sumber Dana Anda</h1>
                <p className="text-base sm:text-xl">Connect and share News</p>
              </div>
              <div className="hidden md:block">
                <Image
                  src={AccountImage}
                  alt="Social connection"
                  width={400}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800">Sign In</h2>
                
                <form className="space-y-3 sm:space-y-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
                      <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        ref={emailRef}
                        placeholder="Enter your email"
                        id="email-input"
                      />
                    </div>
                    <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
                      <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        ref={passwordRef}
                        placeholder="Enter your password"
                        id="password-input"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200"
                    onClick={onSignIn}
                  >
                    Log In
                  </Button>

                  <div className="text-center pt-3 sm:pt-4">
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                      Forgot password?
                    </a>
                  </div>

                  <div className="border-t border-gray-300 pt-4 sm:pt-6 text-center">
                    <p className="text-gray-600 text-sm sm:text-base">
                      Don't have an account?{' '}
                      <a href="/sign-up" className="text-blue-600 font-semibold hover:underline">
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;