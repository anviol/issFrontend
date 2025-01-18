import { Carousel, CarouselContent, CarouselItem, Dots } from '../ui/carousel';
import { Embed } from './Embed';

type InstagramMedia = {
	id: string;
	url: string;
};

const InstagramFeed = async () => {
	const data = await getData();

	return (
		<Carousel
			className="max-w-full"
			opts={{
				align: 'start',
			}}
		>
			<CarouselContent>
				{data.map((item) => (
					<CarouselItem
						key={String(item.id)}
						className="w-full max-w-full sm:max-w-[50%] lg:max-w-[33%]"
					>
						<div className="mx-auto lg:max-w-[350px]">
							<div className="overflow-hidden rounded-xl border">
								<Embed
									url={item.url}
									captioned={false}
									className="-mb-[56px] -ml-1 -mr-1 -mt-[55px]"
								/>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<Dots className="absolute -bottom-10 left-1/2 -translate-x-1/2" />
		</Carousel>
	);
};

const getData = async (): Promise<InstagramMedia[]> => {
	try {
		return [
			{ id: '1', url: 'https://www.instagram.com/p/C3tNFxJrQY9/' },
			{ id: '2', url: 'https://www.instagram.com/p/C8wqHKXPxy2/' },
			{ id: '3', url: 'https://www.instagram.com/p/DA53-yyRq9S/' },
		];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export { InstagramFeed };
