"use client";

import { useState } from "react";

export default function ClientRoute({ children }: { children: React.ReactNode }) {
  const [mounted] = useState(() => typeof window !== "undefined");
  return <div suppressHydrationWarning>{mounted ? children : <main className="min-h-screen bg-[#f8f3e8] px-6 py-20 text-[#263e34]" aria-busy="true"><div className="mx-auto max-w-3xl"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a07136]">King Solomon Tours and Travels</p><h1 className="mt-4 font-display text-5xl leading-tight">Kenya tours, safaris, and Lake Victoria boat rides.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#665d51]">Discover memorable journeys across Kenya, including boat rides to Takawiri Island, Mfangano, and Mbasa Island.</p><nav className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[#315b49]"><a href="/tours">Explore Kenya tours</a><a href="/operators">Meet operators</a><a href="/planner">Plan My Trip</a></nav></div></main>}</div>;
}
