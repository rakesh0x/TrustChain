"use client";

import { Bell, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export function Navbar() {
  return (
    <header className="border-border bg-card/50 sticky top-0 h-16 w-full border-b backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="truncate text-3xl font-semibold text-[#E4BAD1]">
          TrustChain
        </h1>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Clerk Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="ghost" size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/dashboard" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}