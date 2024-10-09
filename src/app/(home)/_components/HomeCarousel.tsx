'use client';
import * as React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	FadePlugin,
	AutoplayPlugin,
	Dots,
} from '@/components/ui/carousel';
import Image from 'next/image';

const HomeCarousel = () => {
	return (
		<Carousel
			className="w-full"
			plugins={[AutoplayPlugin(), FadePlugin()]}
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{Array.from({ length: 3 }).map((_, index) => (
					<CarouselItem key={index}>
						<Image
							width={1920}
							height={1080}
							src="https://www.isscomercio.com.br/images/banner/slide-001-7.jpg"
							alt="Image printer"
							className="h-svh w-svw object-cover"
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<Dots className="absolute bottom-[calc(8rem_+_8svw)] left-1/2 -translate-x-1/2" />
		</Carousel>
	);
};

export { HomeCarousel };
