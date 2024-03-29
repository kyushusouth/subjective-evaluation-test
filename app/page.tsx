"use client";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Index() {
  const { data: session, status } = useSession()

  return (
    <div>
      {
        session ? (
          <div>
            Signed in as {session.user.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        )
      }
    </div>
  )
}