declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role?: string
      kycStatus?: string
    }
  }

  interface User {
    role?: string
    kycStatus?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
    kycStatus?: string
  }
}

