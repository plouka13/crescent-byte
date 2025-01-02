import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/(models)/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ session, token, user, trigger }) {
      if (trigger === "update" && session?.achievements) {
        token.achievements = session.achievements;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { achievements: token.achievements },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.stocks) {
        token.stocks = session.stocks;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { watched_stocks: token.stocks },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.curr_inv) {
        token.curr_inv = session.curr_inv;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { curr_investments: token.curr_inv },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.prev_inv) {
        token.prev_inv = session.prev_inv;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { prev_investments: token.prev_inv },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.pend_inv) {
        token.pend_inv = session.pend_inv;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { pending_investments: token.pend_inv },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.curr_holdings) {
        token.curr_holdings = session.curr_holdings;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { curr_holdings: token.curr_holdings },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.experience) {
        token.experience = session.experience;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { experience: token.experience },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.opt_in) {
        token.opt_in = session.opt_in;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { opt_in: token.opt_in },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.balance) {
        token.balance = session.balance;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { balance: token.balance },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.level) {
        token.level = session.level;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { level: token.level },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.avatar) {
        token.avatar = session.avatar;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { avatar: token.avatar },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.border) {
        token.border = session.border;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { border: token.border },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.displayBadge) {
        token.displayBadge = session.displayBadge;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { displayBadge: token.displayBadge },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (trigger === "update" && session?.first_login == false) {
        token.first_login = session.first_login;

        const updatedUser = await User.findOneAndUpdate(
          { _id: token.id },
          { first_login: token.first_login },
          { new: true }
        );

        if (updatedUser) {
          console.log("not fail fish");
        } else {
          console.log("fail fish");
        }
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          stocks: user.watched_stocks,
          experience: user.experience,
          achievements: user.achievements,
          first_login: user.first_login,
          pend_inv: user.pending_investments,
          curr_inv: user.curr_investments,
          prev_inv: user.prev_investments,
          curr_holdings: user.curr_holdings,
          balance: user.balance,
          level: user.level,
          avatar: user.avatar,
          border: user.border,
          opt_in: user.opt_in,
          displayBadge: user.displayBadge,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          stocks: token.stocks,
          curr_inv: token.curr_inv,
          balance: token.balance,
          experience: token.experience,
          achievements: token.achievements,
          first_login: token.first_login,
          pend_inv: token.pend_inv,
          prev_inv: token.prev_inv,
          curr_holdings: token.curr_holdings,
          level: token.level,
          avatar: token.avatar,
          border: token.border,
          opt_in: token.opt_in,
          displayBadge: token.displayBadge,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
