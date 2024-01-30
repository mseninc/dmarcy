import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import React from "react";

export const metadata: Metadata = {
  title: "DMARCy - DMARC report viewer",
  description: "Simple DMARC report viewer",
};

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="ja" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0 }}>
        <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
