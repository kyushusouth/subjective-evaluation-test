// "use client";

// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from "next/navigation";

// export default function LoginButton() {
//     const { data: session, status } = useSession()
//     const router = useRouter();

//     if (session) {
//         return (
//             <div>
//                 Signed in as {session.user.name} <br />
//                 <button onClick={() => signOut()}>Sign out</button>
//             </div>
//         )
//     }
//     return (
//         <div>
//             Not signed in <br />
//             <button onClick={() => signIn()}>Sign in</button>
//         </div>
//     )
// }