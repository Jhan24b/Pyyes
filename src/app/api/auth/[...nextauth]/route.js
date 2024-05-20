import mongoose from "mongoose";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { getServerSession } from "next-auth";
// import Providers from "next-auth/providers";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "pyyes@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        console.log("aqui no es", user);
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          console.log("devolviendo....");
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true, // habilita JWT para la persistencia de la sesión
  },
};

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return Boolean(userInfo.admin);
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// export default NextAuth(authOptions);