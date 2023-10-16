'use client'
import { useSession } from "next-auth/react"

export default function ProtectedPage() {
    const session = useSession()
    console.log(session)
    return (
        <div>
            <h1> This page is restricted </h1>
        </div>
    )
}
