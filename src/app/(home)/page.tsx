import { HomeCarousel } from './_components/HomeCarousel';
import { WaveDivide } from './_components/WaveDivide';
import { InstagramFeed } from '@/components/InstagramFeed';

export default function Home() {
	return (
		<main className="flex flex-col justify-center">
			<div className="relative w-full">
				<HomeCarousel />
				<div className="absolute bottom-1/2 flex w-full justify-center">
					<div className="relative px-8">
						<div className="absolute inset-0 bg-black/90 blur-3xl" />
						<h1 className="relative whitespace-pre-line text-center text-4xl font-light leading-normal text-white md:text-5xl">
							{'A ISS trabalha com soluções para\nimpressão digital'}
						</h1>
					</div>
				</div>
				<WaveDivide className="absolute -bottom-1 z-10 h-[calc(1rem_+_8svw)] w-full" />
			</div>

			{/* <div className="h-[900px] w-full border">
				<InstagramFeed />
			</div> */}
		</main>
	);
}
