"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
};

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPokemon() {
    const response = await fetch("/api/pokemon");

    if (response.ok) {
      const data = await response.json();

      setPokemon(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  if (loading) {
    return <div className="text-slate-700">Loading Pokemon...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">My Pokemon</h1>

        <Link
          href="/pokemon/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Pokemon
        </Link>
      </div>

      {pokemon.length === 0 ? (
        <p className="text-slate-600">No Pokemon found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemon.map((poke) => (
            <div key={poke.id} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {poke.species}
              </h2>

              <p className="text-slate-600 mt-2">
                Nickname: {poke.nickname || "None"}
              </p>

              <p className="text-slate-600">Nature: {poke.nature}</p>

              <p className="text-slate-600">Level: {poke.level}</p>

              <div className="mt-4 border-t pt-4">
                <h3 className="font-bold text-slate-900">EV Stats</h3>

                <p className="text-slate-600">
                  Attack: {poke.evRecord?.attack ?? 0}
                </p>

                <p className="text-slate-600">
                  Speed: {poke.evRecord?.speed ?? 0}
                </p>
              </div>

              <Link
                href={`/pokemon/${poke.id}`}
                className="block mt-5 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
