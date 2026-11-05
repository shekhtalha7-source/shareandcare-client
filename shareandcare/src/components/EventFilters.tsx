"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Food Distribution",
  "Education",
  "Health Camp",
  "Other",
];

export default function EventFilters({
  initialSearch,
  initialType,
}: {
  initialSearch: string;
  initialType: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);

  function apply(nextSearch: string, nextType: string) {
    const params = new URLSearchParams();
    if (nextSearch.trim()) params.set("search", nextSearch.trim());
    if (nextType) params.set("type", nextType);
    const qs = params.toString();
    router.push(qs ? `/events?${qs}` : "/events");
  }

  function selectType(t: string) {
    // একই টাইপে আবার ক্লিক করলে ফিল্টার উঠে যাবে
    const next = type === t ? "" : t;
    setType(next);
    apply(search, next);
  }

  return (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
    <div className="relative lg:w-64">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && apply(search, type)}
        placeholder="Search events by title"
        className="w-full rounded-lg border bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
      {["", ...TYPES].map((t) => (
        <button
          key={t || "all"}
          onClick={() => selectType(t)}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
            type === t
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "text-muted-foreground hover:border-emerald-500 hover:text-emerald-500"
          }`}
        >
          {t || "All"}
        </button>
      ))}
    </div>

    <button
      onClick={() => apply(search, type)}
      className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
    >
      Search
    </button>
  </div>
);
}