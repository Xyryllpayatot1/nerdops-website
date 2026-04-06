import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authLimiter, getClientIP } from '@/lib/rate-limit';
import { headers } from 'next/headers';

function secureCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const len = Math.max(a.length, b.length);
  const aPadded = a.padEnd(len, '\0');
  const bPadded = b.padEnd(len, '\0');
  let result = 0;
  for (let i = 0; i < len; i++) {
    result |= aPadded.charCodeAt(i) ^ bPadded.charCodeAt(i);
  }
  return result === 0 && a.length === b.length;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Rate limit by IP
        const headersList = await headers();
        const ip = getClientIP(headersList);

        const limit = authLimiter(ip);
        if (!limit.success) {
          throw new Error('RateLimited');
        }

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
          console.error('Admin credentials not configured');
          return null;
        }

        const usernameMatch = secureCompare(credentials.username, adminUsername);
        const passwordMatch = secureCompare(credentials.password, adminPassword);

        if (usernameMatch && passwordMatch) {
          return { id: '1', name: 'Admin', email: 'admin@zeronerds.com', role: 'admin' };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/login',
    error: '/dashboard/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
