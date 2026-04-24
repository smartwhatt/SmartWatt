"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/types";

const ContentContext = createContext<SiteContent | null>(null);

export function useContent() {
  const content = useContext(ContentContext);

  if (!content) {
    throw new Error("useContent must be used within SiteContentProvider");
  }

  return content;
}

export function SiteContentProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial: SiteContent;
}) {
  return (
    <ContentContext.Provider value={initial}>{children}</ContentContext.Provider>
  );
}
