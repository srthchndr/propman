import type { NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from '@auth/core/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        //@ts-ignore
        CredentialsProvider({
            async authorize(credentials) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)
              const user = await prisma.user.findUnique({
                  where: {email: credentials.email as string}
                });
                
                // If no error and we have user data, return it
                if (!!user) {
                console.log('Inside Authorize', user);
                return user
              }
              // Return null if user data could not be retrieved
              return null
            },
        }),
    ],
    session: { strategy: 'jwt'}
}