"use client";

import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If no key is provided, just render children without Clerk
  if (!publishableKey || publishableKey === '') {
    console.warn('Clerk publishable key is missing - rendering without Clerk');
    return <>{children}</>;
  }
  
  return (
    <ClerkProviderBase publishableKey={publishableKey}>
      {children}
    </ClerkProviderBase>
  );
}

