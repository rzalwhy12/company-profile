"use client";
import * as React from "react";
import Image from "next/image";
import AccountImage from "../../../public/access_account.svg";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/core/FormInput";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helper/apiCall";
import BackgroundSlider from "@/components/BackgroundSlider";
import FloatingParticles from "@/components/FloatingParticles";

const SignUpPage: React.FunctionComponent = () => {
  const router = useRouter();

  // Refs for all input fields
  const inUsernameRef = React.useRef<HTMLInputElement>(null);
  const inEmailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confPasswordRef = React.useRef<HTMLInputElement>(null);

  const onSignUp = async () => {
    try {
      // Get values from form inputs
      const username = inUsernameRef.current?.value;
      const email = inEmailRef.current?.value;
      const password = passwordRef.current?.value;
      const confPassword = confPasswordRef.current?.value;

      // Check if all fields are filled
      if (!username || !email || !password || !confPassword) {
        alert("Please fill all fields");
        return;
      }

      // Check password match
      if (password !== confPassword) {
        alert("Password and confirmation don't match");
        return;
      }

      // Save data to backendless
      const response = await apiCall.post("/accounts", {
        username,
        email,
        password,
      });

      alert("Account created successfully!");
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      alert("Failed to create account");
    }
  };

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

      <div className="relative z-30 flex items-center justify-center p-4 mt-15 min-h-screen">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Branding */}
            <div className="w-full md:w-1/2 bg-blue-800 text-white p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">BPR Sumber Dana Anda</h1>
                <p className="text-xl">Join our community and share your News</p>
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

            {/* Right side - Registration Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create Account</h2>
                
                <form className="space-y-4">
                  <div className="space-y-4">
                    <div className="w-full px-4 py-3">
                      <FormInput
                        type="text"
                        name="username"
                        label="Username"
                        ref={inUsernameRef}
                        placeholder="Enter your username"
                        id="username-input"
                      />
                    </div>
                    <div className="w-full px-4 py-3">
                      <FormInput
                        type="email"
                        name="email"
                        label="Email"
                        ref={inEmailRef}
                        placeholder="Enter your email"
                        id="email-input"
                      />
                    </div>
                    <div className="w-full px-4 py-3">
                      <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        ref={passwordRef}
                        placeholder="Create password"
                        id="password-input"
                      />
                    </div>
                    <div className="w-full px-4 py-3">
                      <FormInput
                        type="password"
                        name="confPassword"
                        label="Confirm Password"
                        ref={confPasswordRef}
                        placeholder="Confirm your password"
                        id="confPassword-input"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                    onClick={onSignUp}
                  >
                    Sign Up
                  </Button>

                  <div className="border-t border-gray-300 pt-6 text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        className="text-blue-600 font-semibold hover:underline focus:outline-none"
                        onClick={() => router.push("/sign-in")}
                      >
                        Sign in
                      </button>
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

export default SignUpPage;