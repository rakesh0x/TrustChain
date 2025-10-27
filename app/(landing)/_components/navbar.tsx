"use client";
import Logo from "../../../components/ui/Logo";
import { Button } from "../../../components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ConnectWalletButton } from "../../../components/ui/connect-wallet-button";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
			<div className="flex items-center justify-between px-6 sm:px-10 py-4">
				{/* Logo */}
				
				<div className="flex items-center w-32 sm:w-44">
					<Logo />
				</div>
				<div className="justify-center items-center border-red-500">
					<AnimatedThemeToggler />
				</div>


				{/* Desktop menu */}
				<div className="hidden sm:flex items-center gap-4 flex-1 justify-center">
					<div className="h-14 flex-1 border-x border-border bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_5px)]"></div>
				</div>

				{/* Desktop actions */}
				<div className="hidden sm:flex items-center gap-2 w-44 justify-end">
					<ConnectWalletButton />
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
				</div>

				{/* Mobile menu button */}
				<div className="flex sm:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</Button>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="sm:hidden bg-background border-t border-border p-4 flex flex-col gap-2">
					<ConnectWalletButton />
					<AnimatedThemeToggler />
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
				</div>
			)}
		</div>
	);
};

export default Navbar;
