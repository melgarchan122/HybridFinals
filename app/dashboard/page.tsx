"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [stats, setStats] = useState({
    pokemonCount: 0,
    trainingCount: 0,
    totalEV: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      const res = await fetch("/api/dashboard");

      if (res.ok) {
        const data = await res.json();

        setStats(data);
      }
    }

    loadDashboard();
  }, []);

  if (status === "loading") {
    return <div className="text-slate-700">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome, {session.user?.name || "Trainer"}
      </h1>

      <p className="mt-2 text-slate-600">
        Manage your Pokemon EV training progress.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-700">Pokemon</h2>

          <p className="text-3xl font-bold mt-3 text-slate-900">
            {stats.pokemonCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-700">
            Training Sessions
          </h2>

          <p className="text-3xl font-bold mt-3 text-slate-900">
            {stats.trainingCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-700">EV Points</h2>

          <p className="text-3xl font-bold mt-3 text-slate-900">
            {stats.totalEV}
          </p>
        </div>
      </div>
    </div>
  );
}
