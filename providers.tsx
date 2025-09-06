'use client'

import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'wagmi/chains'
import { config } from './lib/wagmi' // veya '@/lib/wagmi'
import React from 'react'

export function Providers({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: any
}) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
