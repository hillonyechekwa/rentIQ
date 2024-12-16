import { BACKEND_URL } from "@/lib/constants"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

async function validateUser(credentials: {
  username: string;
  email: string;
  password: string
}) {

  try {
    const validate = await fetch(`${BACKEND_URL}/auth/validateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const result = await validate.json()
    return {
      id: result.userId,
      username: credentials.username,
      email: credentials.email
    }
  } catch (error) {
    console.error("User creation: error", error);
    return null;
  }
  
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jynx@theundercity.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;
        console.log("email", email)
        const res = await fetch(BACKEND_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.statusText === "401") {
          console.log(res.statusText)
          return null;
        }

        const user = await res.json();
        console.log("first-user", user);
        return user;
      },
    }),
    CredentialsProvider({
      name: "signupcredentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "jynx",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jynx@theundercity.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.email || !credentials?.password) return null;

        const user = await validateUser(credentials)

        // const { email, password } = credentials;
        // console.log("email", email)
        // const res = await fetch(BACKEND_URL + "/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     email,
        //     password,
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // if (res.statusText === "401") {
        //   console.log(res.statusText)
        //   return null;
        // }

        // const user = await res.json();
        // console.log("first-user", user);
        return user;
      },
    }),
  ],
  pages: {
      signIn: "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token);

      if (user) return { ...token, ...user };

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      console.log("session", session);
      return session
    },
  },
};



const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}