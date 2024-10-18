"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

function RootProvides({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default RootProvides;
