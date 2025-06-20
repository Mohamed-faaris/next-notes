"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (form: { email: string; password: string }) => {
      const res = await signIn("credentials", { ...form ,redirect: false });
      if (res?.error) throw new Error(`Invalid email or password ${JSON.stringify(res)}`);
      return res;
    },
    onError: (error) => {
      console.log(error.message);
      setError("Invalid email or password");
    },
    onSuccess:()=>{
      console.log("Sign in successful");
      router.push("/dashboard");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate(form);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto mt-8 max-w-md">
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-3" autoComplete="on">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="block w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="block w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {mutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
