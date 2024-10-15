import Link from 'next/link';
import { AboutUs } from './_components/AboutUs';
import { Advantages } from './_components/Advantages';
import { CalendarEvents } from './_components/CalendarEvents';
import { HomeCarousel } from './_components/HomeCarousel';
import { Products } from './_components/Products';
import { Section } from './_components/Section';
import { WaveDivide } from './_components/WaveDivide';
import { InstagramFeed } from '@/components/InstagramFeed';
import { ArrowUpRightFromCircle } from 'lucide-react';

export default function Home() {
	return (
		<main className="flex flex-col">
			<div className="relative w-full">
				<HomeCarousel />
				<div className="absolute bottom-[45%] flex w-full justify-center">
					<div className="relative p-8">
						<div className="absolute inset-0 bg-black/70 blur-3xl" />
						<h1 className="relative whitespace-pre-line text-center text-4xl text-white md:text-5xl">
							{'A ISS trabalha com soluções para\nimpressão digital'}
						</h1>
						<Link
							href={'#'}
							className="group relative mx-auto mt-12 block w-min overflow-hidden rounded-md"
						>
							<div className="relative z-10 flex w-min items-center gap-3 whitespace-nowrap rounded-md border-2 p-6 py-3 pr-4 font-medium text-white transition-colors duration-200 hover:border-issYellow hover:text-black">
								ENTRE EM CONTATO
								<ArrowUpRightFromCircle className="h-5 w-5 text-current" />
							</div>
							<span className="pointer-events-none absolute bottom-0 left-0 top-0 w-full origin-left scale-x-0 rounded-md bg-issYellow transition-transform duration-200 group-hover:scale-x-100" />
						</Link>
					</div>
				</div>
				<WaveDivide className="absolute -bottom-1 z-10 h-[calc(1rem_+_8svw)] w-full" />
			</div>

			<Section title="Sobre nós">
				<AboutUs />
			</Section>

			{/* <div className="bg-gray-200">
				<Section title="Nosso diferencial">
					<Advantages />
				</Section>
			</div> */}

			<Section title="Destaques">
				<Products />
			</Section>

			<div className="bg-gray-200">
				<Section title="Próximos eventos">
					<CalendarEvents />
				</Section>
			</div>

			<Section title="Acompanhe a ISS nas redes sociais">
				<InstagramFeed />
			</Section>
		</main>
	);
}
