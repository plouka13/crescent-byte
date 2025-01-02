"use client";

import { SessionProvider } from "next-auth/react";

// top level gives client side provider
export const AuthProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
