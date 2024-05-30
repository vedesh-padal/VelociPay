import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "tel", placeholder: "9999999999", pattern:"[0-9]{10}", require: "true" },
        fullName: { label: "Full Name", type: "text", placeholder: "(optional)", require: "false" },
        emailId: { label: "Email ID", type: "email", require: "false" },
        password: { label: "Password",  type: "password", require: "true" }
      },
      // todo: user credentials type from next-auth
      async authorize(credentials: any) {
        // zod validation and otp validation to do here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            mobileNumber: credentials.phone
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
              mobileNumber: credentials.phone,
              password: hashedPassword,
              Balance: {
                create: {
                    amount: 15055,
                    locked: 0
                }
              },
            }
          });


          
          return {
            id: user.id.toString(),
            name: user.name,
            mobileNumber: user.mobileNumber
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
