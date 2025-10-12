"use client";

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { siEthereum, siNextdotjs, siReact, siShadcnui, siWagmi, siEthers, siSolidity, } from 'simple-icons'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: 'blur(12px)',
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			y: 0,
		},
	},
};

// Reusable animated link component
export const AnimatedLink = ({ href, text }: { href: string; text: string }) => (
	<AnimatedGroup variants={transitionVariants}>
		<Link
			href={href}
			className='hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950'
		>
			<span className='text-foreground text-sm'>{text}</span>
			<span className='dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700'></span>

			<div className='bg-background group-hover:bg-muted size-6 overflow-hidden duration-500'>
				<div className='flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0'>
					<span className='flex size-6'>
						<ArrowRight className='m-auto size-3' />
					</span>
					<span className='flex size-6'>
						<ArrowRight className='m-auto size-3' />
					</span>
				</div>
			</div>
		</Link>
	</AnimatedGroup>
);

// Reusable call-to-action buttons component
const CTAButtons = () => (
	<AnimatedGroup
		variants={{
			container: {
				visible: {
					transition: {
						staggerChildren: 0.05,
						delayChildren: 0.75,
					},
				},
			},
			...transitionVariants,
		}}
		className='mt-10 flex flex-col items-center justify-center gap-2 md:flex-row'
	>
		<div
			key={1}
			className='bg-foreground/10 border p-0.5'
		>
			<Button
				asChild
				size='lg'
				className='rounded-none px-4 text-sm'
			>
				<Link href='/smart-contracts'>
					<span className='text-nowrap'>Start Uploading</span>
				</Link>
			</Button>
		</div>
		<Button
			key={2}
			asChild
			size='lg'
			variant='outline'
			className='h-10 rounded-none px-4 text-sm'
		>
			<Link href='/smart-contracts'>
				<span className='text-nowrap'>Get Started</span>
			</Link>
		</Button>
	</AnimatedGroup>
);

// Reusable tech slider component
const TechSlider = () => {
	const icons = [
		siEthereum,
		siNextdotjs,
		siReact,
		siShadcnui,
		siWagmi,
		siEthers,
		siSolidity,
	];
	return (
		<div className='relative py-6 md:w-[calc(100%-11rem)]'>
			<InfiniteSlider
				speedOnHover={20}
				speed={40}
				gap={80}
			>
				{icons.map((icon, index) => (
					<SimpleIcon key={index} icon={icon} />
				))}
			</InfiniteSlider>

			<div className='bg-linear-to-r from-background absolute inset-y-0 left-0 w-20'></div>
			<div className='bg-linear-to-l from-background absolute inset-y-0 right-0 w-20'></div>
			<ProgressiveBlur
				className='pointer-events-none absolute left-0 top-0 h-full w-20'
				direction='left'
				blurIntensity={1}
			/>
			<ProgressiveBlur
				className='pointer-events-none absolute right-0 top-0 h-full w-20'
				direction='right'
				blurIntensity={1}
			/>
		</div>
	);
};

// New SimpleIcon component to render simple-icons SVGs
const SimpleIcon = ({ icon }: { icon: any }) => (
	<div className='flex items-center justify-center h-8 w-8 dark:invert'>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={icon.hex ? `#${icon.hex}` : 'currentColor'}
			className='h-full w-full'
			dangerouslySetInnerHTML={{ __html: icon.svg }}
		/>
	</div>
);

export const Hero = () => {
	return (
		<>
			<section className=''>
				<div className='relative pt-24 '>
					<div className='mx-auto max-w-7xl px-6'>
						<div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
							<AnimatedLink
								href='#link'
								text='Get your documents on-chain'
							/>

							<h1 className='mt-8 text-balance text-6xl lg:mt-16 text-wrap'>
								Trust Chain: On-Chain Proof. Off-Chain Trust.
							</h1>
							<p className='mx-auto mt-6 max-w-3xl text-balance text-base'>
								Blockchain powered doucments store, where you can Register, verify, and secure credentials with zero chance of tampering.
							</p>

							<CTAButtons />
						</div>
					</div>
				</div>
			</section>
			<section className='bg-background overflow-hidden py-16 w-full  my-20'>
				<AnimatedGroup
					variants={{
						container: {
							visible: {
								transition: {
									staggerChildren: 0.05,
									delayChildren: 0.75,
								},
							},
						},
						...transitionVariants,
					}}
				>
					<div className='group relative m-auto max-w-7xl px-6'>
						<div className='flex flex-col items-center md:flex-row'>
							<div className='md:max-w-44 md:border-r md:pr-6'>
								<p className='text-end text-sm'>Powering the app by</p>
							</div>
							<TechSlider />
						</div>
					</div>
				</AnimatedGroup>
			</section>
		</>
	);
};

export default Hero;