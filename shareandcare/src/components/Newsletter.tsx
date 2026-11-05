"use client";

import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thanks for subscribing!");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-12 text-center text-white sm:px-12">
        <Mail className="mx-auto size-8" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Stay in the loop</h2>
        <p className="mx-auto mt-2 max-w-lg text-emerald-50/90">
          Get a short email when new community drives are announced near you.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            className="border-0 bg-white text-black placeholder:text-gray-500"
          />
          <Button type="submit" className="bg-emerald-950 text-white hover:bg-emerald-900">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}