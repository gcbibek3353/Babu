import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const nextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        username: { label: "email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password",placeholder:"********" }
      },
      async authorize(credentials, req) {
        const userWithEmail = await prisma.user.findUnique({
          where : {email : credentials?.username}
        })
        const isPasswordCorrect = await bcrypt.compare(credentials?.password as string,userWithEmail?.password as string);

        if(isPasswordCorrect){
          const { password, ...newUser } = userWithEmail;
          const formattedUser = {
            ...newUser,
            id: newUser.id.toString(), // Convert id to a string
          };
          return formattedUser;
        }
        else{
          console.log("Incorrect password");
          return null;
        }
        
      }
    })
    // ...add more providers here
  ],
}