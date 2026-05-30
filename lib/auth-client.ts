import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // If NEXT_PUBLIC_APP_URL is not set at build-time, Better Auth will dynamically 
    // resolve calls relative to the browser's current domain (window.location.origin).
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
