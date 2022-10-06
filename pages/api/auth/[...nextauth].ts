import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { XataAdapter } from "@utils/XataAdapter";
import { getXataClient } from "@utils/xata";

const xataClient = getXataClient();

export const authOptions: NextAuthOptions = {
  adapter: XataAdapter(xataClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
