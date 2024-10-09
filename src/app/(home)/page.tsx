import { HomeCarousel } from './_components/HomeCarousel';
import { Products } from './_components/Products';
import { Section } from './_components/Section';
import { WaveDivide } from './_components/WaveDivide';
import { InstagramFeed } from '@/components/InstagramFeed';

export default function Home() {
	return (
		<main className="flex flex-col">
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

			<Section title="Destaques">
				<Products />
			</Section>

			<div className="mt-44 py-20">
				<Section title="Acompanhe a ISS nas redes sociais">
					<InstagramFeed />
				</Section>
			</div>
		</main>
	);
}
