"use client"
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth/next";

const handler = NextAuth({
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET

  }),
],
secret:process.env.NEXTAUTH_kEY,
});
 export {handler as GET ,handler as POST};