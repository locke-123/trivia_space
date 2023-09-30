import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
          return { ...token, ...user, ...account, ...profile };
        },
        async session({ session, token }) {
          session.user = token as any;
          console.log("-------")
          console.log(session);
          console.log(token)
          console.log("-------")
          return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      //signIn: '/auth/signin',
      //signOut: '/auth/signout',
      //error: '/auth/error', // Error code passed in query string as ?error=
      //verifyRequest: '/auth/verify-request', // (used for check email message)
      //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
})