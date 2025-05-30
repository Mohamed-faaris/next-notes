"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (form: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      if (data.redirect) router.push(data.redirect);
      return data;
    },
    onSuccess: () => {
      setMessage("Registration successful! You can now sign in.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    },
    onError: (error: any) => {
      setMessage(error.message || "Registration failed");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!form.name.trim()) {
      setMessage("Name is required");
      return;
    }
    if (!form.email.trim()) {
      setMessage("Email is required");
      return;
    }
    if (!form.password) {
      setMessage("Password is required");
      return;
    }
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    registerMutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto mt-8 max-w-md">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-3" autoComplete="on">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="block w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
          />
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
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            className="block w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            className="block w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
          />
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {registerMutation.isPending ? "Registering..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p className="mt-3 text-center text-sm text-blue-700">{message}</p>
        )}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
