"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

export default function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/users");
    const users = await response.json();

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === "employer"
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successful")
      router.push(`/employer/work-distribution`);
    } else {
      setError("Invalid credentials");
      toast.error("Login Failed")
    }
  };

  return (
    <div className="shadow-xl border-t-4 border-t-blue-200 gap-3 rounded-lg py-5 px-6">
      <div className="flex flex-col w-full  justify-center items-center ">
        <h2 className="text-2xl font-medium pb-3 border-b-2">Employer Login</h2>
      </div>
      {/* this is content */}
      <div className="flex flex-col w-full gap-3 py-4">
        <div className="">
          <label className="label">
            <span className="text-base label-text">Email</span>
          </label>
          <Input
            type="text"
            placeholder="Email"
            className="w-full input input-bordered"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>

          <Input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="p">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
          onClick={handleLogin}
          type="submit"
        >
          Login
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="pt-1">
        <span>
          Don't have an account?{" "}
          <Link href={`/employer/register`}>
            {" "}
            <span className="text-blue-500">Sign up</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
