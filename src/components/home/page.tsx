"use client";
import { SessionProvider, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session, status, 'Session');
  }, [session, status])
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {session && <div>Authenticated</div>} 
        {!session && <div>Not Authenticated</div>}
      </main>
  )
}
