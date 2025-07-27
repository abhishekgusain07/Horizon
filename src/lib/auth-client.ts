import { createAuthClient } from "better-auth/react"

const isProd = process.env.NODE_ENV === 'production';

export const authClient = createAuthClient({
    baseURL: isProd 
        ? typeof window !== 'undefined' ? window.location.origin : '' 
        : 'http://localhost:3000' 
})

export const { signIn, signUp, signOut, useSession } = authClient