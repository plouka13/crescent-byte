"use client";
import { useTheme } from "next-themes";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
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
                  <h1 className="text-sm">Register for an account.</h1>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                  />
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
                  <Button
                    type="submit"
                    className="rounded-md bg-blue-600  hover:bg-blue-500"
                  >
                    Register
                  </Button>
                  {error && (
                    <Alert className="bg-red-100 border-red-400 text-red-700 p-4 rounded-md">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <AlertTitle className="font-medium">Error</AlertTitle>
                      <AlertDescription>Email already exists</AlertDescription>
                    </Alert>
                  )}
                  <div className="text-center text-sm">
                    Already have an account?
                    <Link href="/" className="pl-1">
                      <u>Login here!</u>
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
