import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Pokemon EV HUB
        </h1>

        <p className="text-slate-600 text-lg mb-8">
          Track your Pokemon training, manage EVs, and improve your team.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
