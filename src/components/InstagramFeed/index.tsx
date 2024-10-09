import { Carousel, CarouselContent, CarouselItem, Dots } from '../ui/carousel';
import { Embed } from './Embed';

type InstagramMedia = {
	id: string;
	permalink: string;
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
						className="w-full max-w-full py-1 sm:max-w-[50%] lg:max-w-[33%]"
					>
						<Embed url={item.url} captioned={false} />
					</CarouselItem>
				))}
			</CarouselContent>
			<Dots className="absolute -bottom-10 left-1/2 -translate-x-1/2" />
		</Carousel>
	);
};

const getData = async (): Promise<{ id: string; url: string }[]> => {
	try {
		// const fields = 'id,permalink';

		// const resp = await fetch(
		// 	`https://graph.facebook.com/v21.0/${process.env.IG_ACCOUNT_ID}/media?access_token=${process.env.IG_TOKEN}&fields=${fields}&limit=3`,
		// 	{
		// 		method: 'GET',
		// 		cache: 'no-store',
		// 	},
		// );

		// if (resp.status >= 300) throw new Error(resp.statusText);

		// return resp.json();
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
