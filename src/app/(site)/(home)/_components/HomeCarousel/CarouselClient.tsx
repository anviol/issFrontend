'use client';
import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	AutoplayPlugin,
	Dots,
} from '@/components/ui/carousel';
import { TBanners } from '.';

export const CarouselClient = ({ data }: { data: TBanners[] }) => {
	return (
		<Carousel
			className="w-full md:px-14"
			plugins={[AutoplayPlugin()]}
			opts={{ loop: true }}
		>
			<CarouselContent>
				{data.map((item) => (
					<CarouselItem
						key={item.id}
						className="relative before:absolute before:inset-0"
					>
						<Image
							width={1200}
							height={550}
							src={`${(process.env.NEXT_PUBLIC_API_URL || '') + item.attributes.imagem.data?.attributes.url || ''}`}
							alt={item.attributes.titulo || ''}
							className="h-auto w-svw overflow-hidden object-fill object-center md:rounded-2xl"
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="hidden justify-center md:flex">
				<Dots />
			</div>
		</Carousel>
	);
};
