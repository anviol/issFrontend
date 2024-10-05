import { HomeCarousel } from './_components/HomeCarousel';
import { WaveDivide } from './_components/WaveDivide';

export default function Home() {
	return (
		<main className="flex flex-col justify-center">
			<div className="relative w-full">
				<HomeCarousel />
				<WaveDivide className="absolute -bottom-1 z-10 h-[8vw] w-full" />
			</div>

			<div className="h-[900px] w-full border"></div>
		</main>
	);
}
