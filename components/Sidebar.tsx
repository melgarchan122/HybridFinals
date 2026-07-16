"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
      {" "}
      <div className="p-6 border-b border-slate-700">
        {" "}
        <h1 className="text-xl font-bold">Pokemon EV HUB</h1>{" "}
        <p className="text-sm text-slate-400">
          Effort Value Training Manager
        </p>{" "}
      </div>{" "}
      <nav className="flex flex-col p-4 space-y-2">
        {" "}
        <Link
          href="/dashboard"
          className="rounded-md px-4 py-2 hover:bg-slate-800 transition"
        >
          {" "}
          Dashboard{" "}
        </Link>{" "}
        <Link
          href="/pokemon"
          className="rounded-md px-4 py-2 hover:bg-slate-800 transition"
        >
          {" "}
          My Pokemon{" "}
        </Link>{" "}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-left rounded-md px-4 py-2 hover:bg-red-700 transition"
        >
          {" "}
          Logout{" "}
        </button>{" "}
      </nav>{" "}
    </aside>
  );
}
