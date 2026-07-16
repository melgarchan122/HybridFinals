"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    setMessage(data.message);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Pokemon EV HUB</h1>

          <p className="mt-2 text-slate-500">Create your trainer account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your trainer name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        {message && (
          <div className="mt-5 text-center text-sm text-slate-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
