import { handler } from "@/auth"

// import NextAuth from "next-auth"
// import { authOptions } from "@/app/lib/auth";

// // import type { NextAuthOptions } from "next-auth"

// // import CredentialsProvider from "next-auth/providers/credentials"

// // export const authOptions: NextAuthOptions = {
// //     providers: [
// //         CredentialsProvider({
// //             name: 'Credentials',
// //             credentials: {
// //                 name: { label: "回答者名", type: "text" },
// //                 password: { label: "パスワード", type: "password" }
// //             },
// //             async authorize(credentials, req) {
// //                 const res = await fetch("http://localhost:3000/api/auth/authCredentials", {
// //                     method: 'POST',
// //                     body: JSON.stringify(credentials),
// //                     headers: { "Content-Type": "application/json" }
// //                 })
// //                 const user = await res.json()
// //                 if (res.ok && user) {
// //                     return user.data
// //                 } else {
// //                     return null
// //                 }
// //             }
// //         }),
// //     ],
// //     secret: process.env.NEXTAUTH_SECRET,
// // };

// const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
