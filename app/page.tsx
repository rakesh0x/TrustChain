import Features from "./(landing)/_components/features";
import Hero from "./(landing)/_components/hero";
import Navbar from "./(landing)/_components/navbar";
import CTA from "./(landing)/_components/cts";
import Footer from "./(landing)/_components/footer";
import Pricing from "@/components/pricing";
import { WagmiProvider } from "wagmi";
import { config } from './config';

const page = () => {
	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 2xl:px-48 relative">
				<div className=" inset-0 inset-y-0 justify-center h-full  bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_5px)] opacity-50 absolute" />
				<main className="flex z-10 flex-col items-center justify-center  bg-background w-full max-w-7xl border-x border-border pt-20 opacity-100 ">
					<Hero />
					<Features />
					<Pricing/>
					<CTA />
				</main>
			</div>
			<Footer />
		</>
	);
};
export default page;