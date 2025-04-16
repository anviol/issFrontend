'use client';
import { useRef, useState } from 'react';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { Gallery, Image as IImage } from 'react-grid-gallery';
import { useScrollLock, useOnClickOutside } from 'usehooks-ts';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Dots,
} from '@/components/ui/carousel';

type Props = {
	images: {
		small: IImage[];
		medium: {
			height: number;
			width: number;
			src: string;
			alt: string;
		}[];
	};
};

export const EventGallery = ({ images }: Props) => {
	const { lock, unlock } = useScrollLock({
		autoLock: false,
	});
	const carouselRef = useRef(null);
	useOnClickOutside(carouselRef, () => {
		unlock();
		setOpenModal(false);
	});
	const [openModal, setOpenModal] = useState(false);
	const [imgToOpen, setImgToOpen] = useState(0);

	return (
		<div className="max-w-full overflow-x-hidden">
			<Gallery
				images={images.small}
				onClick={(idx) => {
					setImgToOpen(idx);
					setOpenModal(true);
					lock();
				}}
				enableImageSelection={false}
			/>

			{openModal && (
				<div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/90">
					<button
						onClick={() => {
							unlock();
							setOpenModal(false);
						}}
						className="absolute right-0 top-10 p-2 sm:right-10"
					>
						<CircleX className="h-10 w-10 min-w-10 text-white hover:brightness-75" />
					</button>

					<Carousel
						ref={carouselRef}
						className="sm:w-[70%]"
						opts={{
							startIndex: imgToOpen,
						}}
					>
						<CarouselContent className="max-h-[70vh]">
							{images.medium.map((image, idx) => {
								return (
									<CarouselItem key={String(idx)} className="bg-black">
										<Image
											src={image.src}
											alt={image.alt || ''}
											width={image.width}
											height={image.height}
											className="h-full w-full object-contain"
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<CarouselNext className="hidden sm:flex" />
						<CarouselPrevious className="hidden sm:flex" />
						<Dots className="justify-center sm:hidden" />
					</Carousel>
				</div>
			)}
		</div>
	);
};
