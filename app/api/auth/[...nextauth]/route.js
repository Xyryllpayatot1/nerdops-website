import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Enter username' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter password' },
      },
      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;

        // Check if env vars are set
        if (!username || !password) {
          console.error('Admin credentials not configured in environment');
          return null;
        }

        // Constant-time comparison to prevent timing attacks
        const usernameMatch = secureCompare(credentials.username, username);
        const passwordMatch = secureCompare(credentials.password, password);

        if (usernameMatch && passwordMatch) {
          return { 
            id: '1', 
            name: 'Admin', 
            email: 'admin@zeronerds.com',
            role: 'admin'
          };
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
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

// Constant-time string comparison to prevent timing attacks
function secureCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  // Ensure same length by padding shorter string
  const lenA = a.length;
  const lenB = b.length;
  const len = Math.max(lenA, lenB);
  
  // Pad strings to same length
  const aPadded = a.padEnd(len, '\0');
  const bPadded = b.padEnd(len, '\0');
  
  let result = 0;
  for (let i = 0; i < len; i++) {
    result |= aPadded.charCodeAt(i) ^ bPadded.charCodeAt(i);
  }
  return result === 0 && lenA === lenB;
}

export { handler as GET, handler as POST };
