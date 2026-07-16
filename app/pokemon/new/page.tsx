"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPokemonPage() {
  const router = useRouter();

  const [species, setSpecies] = useState("");
  const [nickname, setNickname] = useState("");
  const [nature, setNature] = useState("");
  const [level, setLevel] = useState(1);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        species,
        nickname,
        nature,
        level,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      router.push("/pokemon");
    } else {
      setLoading(false);
      alert(data.message);
    }
  }
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Add Pokemon</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Pokemon Species
          </label>

          <input
            className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-800"
            placeholder="Example: Pikachu"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nickname
          </label>

          <input
            className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-800"
            placeholder="Optional"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nature
          </label>

          <input
            className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-800"
            placeholder="Example: Jolly"
            value={nature}
            onChange={(e) => setNature(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Level
          </label>

          <input
            type="number"
            min="1"
            max="100"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-800"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
        >
          {loading ? "Saving..." : "Save Pokemon"}
        </button>
      </form>
    </div>
  );
}
