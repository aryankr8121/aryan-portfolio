import './globals.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'AryanGPT - Portfolio',
  description: 'Chat-style AI portfolio by Aryan ⚙️',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
