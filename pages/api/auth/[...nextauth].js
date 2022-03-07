import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientSecret = process.env.MASTER_SECRET;
const clientId = process.env.MASTER_ID;
const wellKnown = process.env.MASTER_WELL_KNOWN;
const scope = process.env.MASTER_SCOPE;

export default NextAuth({
  // Configure one or more authentication providers
  pages: {
    signIn: "/seleksi-jpt/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(`${url?.baseUrl}${process.env.BASE_PATH}`);
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.id = account?.providerAccountId;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
});
