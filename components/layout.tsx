import "styles/tailwind.css"
import { Theme } from "@radix-ui/themes"
import Head from 'next/head'
import { RecoilRoot, useRecoilState } from "recoil"

// State
import { appearanceState } from "../app/models/appearance"

function ThemeLayout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, _] = useRecoilState(appearanceState)
  return <Theme appearance={isDarkMode ? "dark" : "light"}>{children}</Theme>
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>WeatherWeb</title>
        <link rel="icon" href="assets/favicon.ico" sizes="any" />
      </Head>
      <body>
        <RecoilRoot>
          <ThemeLayout>{children}</ThemeLayout>
        </RecoilRoot>
      </body>
    </html>
  )
}
