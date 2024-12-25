"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MemberProvider } from "./warga/member-provider"
import { WaterBillProvider } from "./watter-bill/water-bill-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
        <MemberProvider>
          <WaterBillProvider>
              {children}
          </WaterBillProvider>
        </MemberProvider>
    </NextThemesProvider>
  )
}
