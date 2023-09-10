"use client";
import Home from '@/components/home/page';
import { SessionProvider, useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect } from 'react';

export default function App(children: React.ReactNode) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Home/>
    </main>
  )
}
