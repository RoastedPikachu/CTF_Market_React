import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/store/provider';

import "react-responsive-carousel/lib/styles/carousel.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CTF Market',
  description: 'CTFMarket - онлайн мерч шоп, для самых прошаренных в ИБ сфере',
  keywords: 'CTF, CTFMarket, CTF-Market, СТФ-Маркет, СТФ, СТФМаркет, мерч, онлайн-магазин, мерч-шоп, информационная безопасность, ИБ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
