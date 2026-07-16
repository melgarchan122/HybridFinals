"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Pokemon EV HUB</h1>

          <p className="text-slate-500 mt-2">Trainer Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 text-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 text-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
