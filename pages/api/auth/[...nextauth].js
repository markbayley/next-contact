import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.AUTH_SECRET_GITHUB_SECRET,

      secret: process.env.SECRET
    }),
  ],
}

export default NextAuth(authOptions)