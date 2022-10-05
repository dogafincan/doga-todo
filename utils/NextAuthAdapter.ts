import type { Adapter } from "next-auth/adapters";
import type { XataClient } from "@utils/xata";

// TODO: use the official Xata next-auth adapter once it gets released.
export function XataAdapter(client: XataClient): Adapter {
  return {
    async createUser(user) {
      const newUser = await client.db.nextauth_users.create(user);
      return { ...newUser, emailVerified: newUser.emailVerified ?? null };
    },
    async getUser(id) {
      const user = await client.db.nextauth_users.filter({ id }).getFirst();

      return user
        ? { ...user, emailVerified: user.emailVerified ?? null }
        : null;
    },
    async getUserByEmail(email) {
      const user = await client.db.nextauth_users.filter({ email }).getFirst();

      return user
        ? { ...user, emailVerified: user.emailVerified ?? null }
        : null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const result = await client.db.nextauth_users_accounts
        .select(["user.*"])
        .filter({
          "account.providerAccountId": providerAccountId,
          "account.provider": provider,
        })
        .getFirst();

      const user = result?.user;
      return user
        ? { ...user, emailVerified: user.emailVerified ?? null }
        : null;
    },
    async updateUser(user) {
      const result = await client.db.nextauth_users.update(user.id!, user);

      return {
        ...result,
        id: result!.id,
        emailVerified: result!.emailVerified ?? null,
      };
    },
    async linkAccount(initialAccount) {
      const { userId, ...account } = initialAccount;

      const newXataAccount = await client.db.nextauth_accounts.create({
        ...account,
        user: { id: userId },
      });

      await client.db.nextauth_users_accounts.create({
        user: { id: userId },
        account: { id: newXataAccount.id },
      });
    },
    async createSession(initialSession) {
      const { userId, ...session } = initialSession;

      const newXataSession = await client.db.nextauth_sessions.create({
        ...session,
        user: { id: userId },
      });

      await client.db.nextauth_users_sessions.create({
        user: { id: userId },
        session: { id: newXataSession.id },
      });

      return { ...newXataSession, ...session, userId };
    },
    async getSessionAndUser(sessionToken) {
      const result = await client.db.nextauth_users_sessions
        .select(["user.*", "session.*"])
        .filter({ "session.sessionToken": sessionToken })
        .getFirst();

      if (!result?.session || !result?.user) {
        return null;
      }

      return {
        session: {
          ...result.session,
          sessionToken: result.session.sessionToken!,
          expires: result.session.expires!,
          userId: result.user.id,
        },
        user: {
          ...result.user,
          emailVerified: result.user.emailVerified ?? null,
        },
      };
    },
    async updateSession({ sessionToken, ...data }) {
      const session = await client.db.nextauth_sessions
        .filter({ sessionToken })
        .getFirst();

      if (!session) {
        return null;
      }

      await client.db.nextauth_sessions.update({ ...session, ...data });

      return {
        ...session,
        sessionToken,
        userId: data.userId!,
        expires: data.expires!,
      };
    },

    async deleteSession(sessionToken) {
      /**
       * @todo refactor this when we support DELETE WHERE.
       */
      const session = await client.db.nextauth_sessions
        .filter({ sessionToken })
        .getFirst();

      if (!session) {
        return;
      }

      const connectedSession = await client.db.nextauth_users_sessions
        .filter({ "session.sessionToken": sessionToken })
        .getFirst();

      if (!connectedSession) {
        return;
      }

      await client.db.nextauth_sessions.delete(session.id);
      await client.db.nextauth_users_sessions.delete(connectedSession.id);
    },
  };
}
