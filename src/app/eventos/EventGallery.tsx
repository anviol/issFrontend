'use client';
import { useRef, useState } from 'react';
import { CircleX } from 'lucide-react';
import { Gallery, GalleryProps } from 'react-grid-gallery';
import { useScrollLock, useOnClickOutside } from 'usehooks-ts';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Dots,
} from '@/components/ui/carousel';

export const EventGallery = ({ images }: GalleryProps) => {
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
				images={images}
				onClick={(idx) => {
					setImgToOpen(idx);
					setOpenModal(true);
					lock();
				}}
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
							{images.map((image, idx) => {
								return (
									<CarouselItem key={String(idx)} className="bg-black">
										<img
											src={image.src}
											alt={image.alt || ''}
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
