'use client';
import * as React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	AutoplayPlugin,
} from '@/components/ui/carousel';
import Image from 'next/image';

const HomeCarousel = async () => {
	const data = await getData();

	return (
		<div className="relative mx-auto w-full py-10 md:my-8 md:max-w-[min(1200px,95%)]">
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
								src={item.url}
								alt="Image printer"
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
		</div>
	);
};

const getData = async () => {
	return [
		{
			id: '1',
			url: 'https://d3j3imors9xf8g.cloudfront.net/archives/108/202312/ffee4a8ad3e82c41701ff65c747559133b904186f64c505a10abbec5daa3403e.jpg',
		},
		{
			id: '3',
			url: 'https://d3j3imors9xf8g.cloudfront.net/archives/108/202405/614254b3d5629a7f7cd4ea7fecebc53ee429c3fbf64f00fa7642a64944c5663a.jpg',
		},
		{
			id: '4',
			url: 'https://d3j3imors9xf8g.cloudfront.net/archives/108/202403/35e7ac9ec47ba7c0c1dd4444867e57ead2f809d9dd26ce12ec12dc382ec20543.jpg',
		},
	];
};

export { HomeCarousel };
