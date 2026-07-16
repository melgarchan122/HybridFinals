"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type TrainingSession = {
  id: number;
  stat: string;
  evGained: number;
  method: string;
  createdAt: string;
};

type Pokemon = {
  id: number;
  species: string;
  nickname: string | null;
  nature: string;
  level: number;

  evRecord: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  } | null;

  trainingSessions: TrainingSession[];
};

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nature, setNature] = useState("");
  const [level, setLevel] = useState(1);

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [stat, setStat] = useState("attack");
  const [evGained, setEvGained] = useState(1);
  const [method, setMethod] = useState("Battle");
  const [loading, setLoading] = useState(false);

  async function loadPokemon() {
    const response = await fetch(`/api/pokemon/${id}`);

    if (response.ok) {
      const data = await response.json();

      setPokemon(data);

      setNickname(data.nickname ?? "");
      setNature(data.nature);
      setLevel(data.level);
    }
  }

  useEffect(() => {
    loadPokemon();
  }, [id]);

  async function updatePokemon() {
    const response = await fetch(`/api/pokemon/${pokemon?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname,
        nature,
        level,
      }),
    });

    if (response.ok) {
      alert("Pokemon updated successfully!");

      setEditing(false);

      await loadPokemon();
    } else {
      alert("Failed to update Pokemon.");
    }
  }

  async function deletePokemon() {
    if (!confirm("Delete this Pokemon?")) {
      return;
    }

    const response = await fetch(`/api/pokemon/${pokemon?.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Pokemon deleted!");

      router.push("/pokemon");
    } else {
      alert("Failed to delete Pokemon.");
    }
  }

  async function addTraining() {
    setLoading(true);

    const response = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonId: pokemon?.id,
        stat,
        evGained,
        method,
      }),
    });

    if (response.ok) {
      await loadPokemon();
      alert("Training added successfully!");
    } else {
      alert("Failed to add training.");
    }

    setLoading(false);
  }

  if (!pokemon) {
    return <div className="text-slate-700">Loading Pokemon...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-slate-900">{pokemon.species}</h1>

        <p className="text-slate-600 mt-2">Pokemon Details</p>

        <div className="mt-6">
          {!editing ? (
            <>
              <div className="space-y-2 text-slate-700">
                <p>
                  <b>Nickname:</b> {pokemon.nickname || "None"}
                </p>

                <p>
                  <b>Nature:</b> {pokemon.nature}
                </p>

                <p>
                  <b>Level:</b> {pokemon.level}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={deletePokemon}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full border rounded-lg p-3 text-slate-900"
              />

              <input
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                placeholder="Nature"
                className="w-full border rounded-lg p-3 text-slate-900"
              />

              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full border rounded-lg p-3 text-slate-900"
              />

              <div className="flex gap-3">
                <button
                  onClick={updatePokemon}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 border-t pt-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3">EV Stats</h2>

          <div className="grid grid-cols-2 gap-3 text-slate-700">
            <p>HP: {pokemon.evRecord?.hp ?? 0}</p>
            <p>Attack: {pokemon.evRecord?.attack ?? 0}</p>
            <p>Defense: {pokemon.evRecord?.defense ?? 0}</p>
            <p>Sp. Attack: {pokemon.evRecord?.spAttack ?? 0}</p>
            <p>Sp. Defense: {pokemon.evRecord?.spDefense ?? 0}</p>
            <p>Speed: {pokemon.evRecord?.speed ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Add Training Session
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={stat}
            onChange={(e) => setStat(e.target.value)}
            className="border rounded-lg p-3 text-slate-900"
          >
            <option value="hp">HP</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="spAttack">Sp. Attack</option>
            <option value="spDefense">Sp. Defense</option>
            <option value="speed">Speed</option>
          </select>

          <input
            type="number"
            value={evGained}
            onChange={(e) => setEvGained(Number(e.target.value))}
            className="border rounded-lg p-3 text-slate-900"
          />

          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border rounded-lg p-3 text-slate-900"
          />
        </div>

        <button
          onClick={addTraining}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Add Training"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Training History
        </h2>

        {pokemon.trainingSessions.length === 0 ? (
          <p className="text-slate-500">No training sessions yet.</p>
        ) : (
          <div className="space-y-4">
            {pokemon.trainingSessions.map((training) => (
              <div
                key={training.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {training.method}
                  </p>

                  <p className="text-slate-600">
                    {training.stat} (+{training.evGained} EV)
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  {new Date(training.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
