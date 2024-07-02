import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_SECRET_GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)