import startDb from "../../../../lib/db";
import UserModel from "../../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const authOptions = {
  session: {
    strategy: "jwt",
    jwt: {
      secret: process.env.JWT_SECRET,
      encryption: true,
      signingKey: {
        alg: "HS512",
        use: "sig",
        kty: "oct",
        k: process.env.JWT_SIGNING_PRIVATE_KEY,
      },
      verificationOptions: {
        algorithms: ["HS512"],
      },
      // Add refresh token options
      refreshToken: {
        secret: process.env.JWT_REFRESH_SECRET,
        encryption: true,
        signingKey: {
          alg: "HS512",
          use: "sig",
          kty: "oct",
          k: process.env.JWT_REFRESH_SIGNING_PRIVATE_KEY,
        },
        // Token expiry in seconds (7 days)
        maxAge: 7 * 24 * 60 * 60,
      },
      expiresIn: 3600,
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await startDb();

        const user = await UserModel.findOne({ email });
        if (!user) throw Error("email/password doesn't match!");

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw Error("email/password tidak cocok!");

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      //return final token
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    logout: "/auth",
  },
  events: {
    async signOut({ event, account }) {
      if (event === "signout") {
        cookies.removeItem("next-auth.session-token");
      }
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
