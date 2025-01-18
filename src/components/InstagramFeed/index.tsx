import { api } from '@/company-api/api';
import { Carousel, CarouselContent, CarouselItem, Dots } from '../ui/carousel';
import { Embed } from './Embed';
import { WithPagination } from '@/@types/api';

type InstagramMedia = {
	id: number;
	attributes: { link: string };
};

const InstagramFeed = async () => {
	const data = await getData();

	return (
		<Carousel className="max-w-full" opts={{ align: 'start' }}>
			<CarouselContent>
				{data.map(({ id, attributes }) => (
					<CarouselItem
						key={String(id)}
						className="w-full max-w-full sm:max-w-[50%] lg:max-w-[33%]"
					>
						<div className="mx-auto lg:max-w-[350px]">
							<div className="overflow-hidden rounded-xl border">
								<Embed
									url={attributes.link}
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

const getData = async () => {
	const { data, error } = await api<WithPagination<InstagramMedia>>({
		url: '/instagrams',
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return [];
	}

	return data;
};

export { InstagramFeed };
