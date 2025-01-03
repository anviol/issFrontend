'use client';
import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	AutoplayPlugin,
} from '@/components/ui/carousel';
import { TBanners } from '.';

export const CarouselClient = ({ data }: { data: TBanners[] }) => {
	return (
		<Carousel
			className="w-full md:px-14"
			plugins={[AutoplayPlugin()]}
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{data.map((item) => (
					<CarouselItem
						key={item.id}
						className="relative before:absolute before:inset-0"
					>
						<Image
							width={1200}
							height={50}
							src={`${(process.env.API_URL || '') + item.attributes.imagem.data?.attributes.url || ''}`}
							alt={item.attributes.titulo || ''}
							className="h-auto w-svw overflow-hidden object-fill object-center md:rounded-2xl"
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious
				size={'lg'}
				className="left-0 z-10 hidden border-black bg-transparent md:block"
			/>
			<CarouselNext
				size={'lg'}
				className="right-0 z-10 hidden border-black bg-transparent md:block"
			/>
		</Carousel>
	);
};
