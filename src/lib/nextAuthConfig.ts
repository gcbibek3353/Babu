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
      async authorize(credentials) {
        const userWithEmail = await prisma.user.findUnique({
          where : {email : credentials?.username}
        })
        const isPasswordCorrect = await bcrypt.compare(credentials?.password as string,userWithEmail?.password as string);

        if(isPasswordCorrect){
          const {...newUser } = userWithEmail;
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

  callbacks: {
    async signIn({ user, profile }) {
      // Check if user exists in your database
      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // If not, create a new user
      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            name: user.name || profile.login,
            phone : 0,
            email : user.email,
            password : "GithubUser",
            city : "GithubUser",
            address : "GithubUser"},
        });
      }
      // Attach userId to the token
      user.id = existingUser.id;

      return true; // Allow sign-in
    },
    async session({ session, token }) {
      // Attach the user ID to the session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach userId from database to the token
      }
      return token;
    },
  },
}