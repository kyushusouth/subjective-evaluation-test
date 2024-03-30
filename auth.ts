import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

export const config = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "回答者名", type: "text" },
                password: { label: "パスワード", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3000/api/auth/authCredentials", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user.data
                } else {
                    return null
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    basePath: "/auth",
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)