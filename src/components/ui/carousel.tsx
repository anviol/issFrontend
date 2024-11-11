'use client';

import * as React from 'react';
export { default as FadePlugin } from 'embla-carousel-fade';
export { default as AutoplayPlugin } from 'embla-carousel-autoplay';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type ThumbButton = React.ReactElement<
	React.ButtonHTMLAttributes<HTMLButtonElement>
>;

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
	thumbs?: ThumbButton[];
	thumbsClassName?: string;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = 'horizontal',
			opts,
			setApi,
			plugins,
			className,
			children,
			thumbs,
			thumbsClassName,
			...props
		},
		ref,
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === 'horizontal' ? 'x' : 'y',
			},
			plugins,
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === 'ArrowRight') {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext],
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on('reInit', onSelect);
			api.on('select', onSelect);

			return () => {
				api?.off('select', onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn('relative', className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>

				{thumbs && (
					<Thumb className={thumbsClassName} emblaMainApi={api}>
						{thumbs}
					</Thumb>
				)}
			</CarouselContext.Provider>
		);
	},
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();
	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
					className,
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			role="group"
			aria-roledescription="slide"
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'pl-4' : 'pt-4',
				className,
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute rounded-full p-2',
				orientation === 'horizontal'
					? `${size === 'lg' ? '-left-16' : '-left-12'} top-1/2 -translate-y-1/2`
					: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ChevronLeftIcon className="min-h-8 min-w-8" />
			<span className="sr-only">Slide anterior</span>
		</Button>
	);
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute rounded-full p-2',
				orientation === 'horizontal'
					? `${size === 'lg' ? '-right-16' : '-right-12'} top-1/2 -translate-y-1/2`
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ChevronRightIcon className="min-h-8 min-w-8" />
			<span className="sr-only">Próximo slide</span>
		</Button>
	);
});
CarouselNext.displayName = 'CarouselNext';

type DotsProps = React.ComponentPropsWithRef<'button'> & {
	dotClassName?: string;
};

const Dots: React.FC<DotsProps> = (props) => {
	const { children, className, dotClassName, ...restProps } = props;
	const { api: emblaApi } = useCarousel();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

	const onDotsClick = React.useCallback(
		(index: number) => {
			if (!emblaApi) return;
			emblaApi.scrollTo(index);
		},
		[emblaApi],
	);

	const onInit = React.useCallback((emblaApi: CarouselApi) => {
		if (emblaApi) {
			setScrollSnaps(emblaApi.scrollSnapList());
		}
	}, []);

	const onSelect = React.useCallback((emblaApi: CarouselApi) => {
		if (emblaApi) {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		}
	}, []);

	React.useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		onSelect(emblaApi);
		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onInit, onSelect]);

	return (
		<ul className={cn('flex gap-2', className)}>
			{scrollSnaps.map((_, index) => (
				<li key={String(index)}>
					<button
						type="button"
						data-current={selectedIndex === index ? 'true' : 'false'}
						className={cn(
							'cursor-pointer rounded-md border border-issYellow p-1 px-3 transition-colors duration-500 data-[current=true]:bg-issYellow',
							dotClassName,
						)}
						onClick={() => onDotsClick(index)}
						{...restProps}
					>
						{children}
					</button>
				</li>
			))}
		</ul>
	);
};

type ThumbProps = {
	children: ThumbButton[];
	emblaMainApi: CarouselApi;
	className?: string;
};

const Thumb: React.FC<ThumbProps> = (props) => {
	const { children, emblaMainApi, className } = props;
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel();
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const clonedButtons = children.map((child, index) =>
		React.cloneElement(child, {
			onClick: () => onThumbClick(index),
			style: {
				border: selectedIndex === index ? '3px solid #FBBA16' : undefined,
			},
			key: index,
		}),
	);

	const onThumbClick = React.useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
			setSelectedIndex(index);
		},
		[emblaMainApi, emblaThumbsApi],
	);

	return (
		<Carousel ref={emblaThumbsRef}>
			<CarouselContent className={className}>{clonedButtons}</CarouselContent>
		</Carousel>
	);
};

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	Dots,
};
