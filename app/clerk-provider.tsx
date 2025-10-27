"use client";

import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.warn('Clerk publishable key is missing');
  }
  
  return (
    <ClerkProviderBase publishableKey={publishableKey || ''}>
      {children}
    </ClerkProviderBase>
  );
}

