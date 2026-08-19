"use client";

import { useState } from "react";

export default function ClientRoute({ children }: { children: React.ReactNode }) {
  const [mounted] = useState(() => typeof window !== "undefined");
  return <div suppressHydrationWarning>{mounted ? children : <main className="min-h-screen bg-[#f8f3e8]" aria-busy="true" />}</div>;
}
