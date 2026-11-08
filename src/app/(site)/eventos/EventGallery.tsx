'use client';
import { RefObject, useRef, useState } from 'react';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useScrollLock, useOnClickOutside } from 'usehooks-ts';

import { Photo, PhotoGrid } from './PhotoGrid';

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
		small: Photo[];
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
	const [openModal, setOpenModal] = useState(false);
	const [imgToOpen, setImgToOpen] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	// O usehooks-ts ainda tipa a ref como no React 18, sem o null do React 19.
	useOnClickOutside(carouselRef as RefObject<HTMLDivElement>, () => {
		unlock();
		setOpenModal(false);
	});

	return (
		<div className="max-w-full overflow-x-hidden">
			<PhotoGrid
				photos={images.small}
				onOpen={(idx) => {
					setImgToOpen(idx);
					setOpenModal(true);
					lock();
				}}
			/>

			{openModal && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Foto ampliada"
					className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/90"
				>
					<button
						onClick={() => {
							unlock();
							setOpenModal(false);
						}}
						aria-label="Fechar foto"
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
