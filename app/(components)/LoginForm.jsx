"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen pl-0 p-14">
      <section
        className={`py-20 w-full h-full bg-cover bg-right rounded-2xl ${
          theme === "light" ? "bg-hero-pattern4" : "bg-hero-pattern2"
        }`}
      >
        <div className="container mx-auto px-4 ">
          <div className="md:flex md:items-center ">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <div className="flex flex-row gap-1">
                  <div className="pt-1">
                    <MoonIcon width={41} height={41} transform="scale(-1,1)" />
                  </div>
                  <div>CrescentByte</div>
                </div>
                is the Best Way to
                <br />
                Learn Trading
              </h1>
              <p className=" mb-8">
                CrescentByte presents its cutting edge stock learning and
                simulating platform. Compete for the monthly leaderboard prize
                and learn to become the next Warren Buffett!
              </p>
              <div className="flex flex-row items-center">
                <a
                  href="https://app.swaggerhub.com/apis-docs/JAMJAMESHE1/CrescentByte/1.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-3 rounded-full text-lg tracking-wide "
                >
                  <u>Learn More</u>
                </a>
                <div className="pl-2">
                  <ModeToggle />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <div className=" rounded-lg p-4 h-96 flex flex-col justify-between">
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]"
                >
                  <h1 className="text-3xl md:text-3xl font-bold">
                    Welcome to CrescentByte!
                  </h1>
                  <h1 className="text-sm">Login to get started.</h1>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <div className="flex items-center justify-between">
                    <Link className="text-sm " href="/">
                      <u>Forgot Password?</u>
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className={`rounded-md bg-blue-600 py-2 hover:bg-blue-500 ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    Login
                  </Button>
                  {error && (
                    <Alert className="bg-red-100 border-red-400 text-red-700 p-4 rounded-md">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <AlertTitle className="font-medium">Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="text-center text-sm">
                    Dont have an account?
                    <Link href="/register" className="pl-1">
                      <u>Sign up here!</u>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
