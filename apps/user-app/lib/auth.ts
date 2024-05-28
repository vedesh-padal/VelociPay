import { PrismaClient } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const db = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "89743142311" },
        password: { label: "Password",  type: "password" }
      },
      // todo: user credentials type from next-auth
      async authorize(credentials: any) {
        // zod validation and otp validation to do here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email
            }
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword
            }
          });
          
          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number
          }
        } catch (e) {
          console.log('ERROR when CREATING THE USER: ', e);
        }

        return null;
      },
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: using good ts type
    async session({ token, session }: any)  {
      session.user.id = token.sub;

      return session;
    }
  }
}
