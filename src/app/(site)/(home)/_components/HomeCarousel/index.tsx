import { notFound } from 'next/navigation';
import { api } from '@/company-api/api';
import { TImage } from '@/@types/products';
import { CarouselClient } from './CarouselClient';
import { WithPagination } from '@/@types/api';

export type TBanners = {
	id: number;
	attributes: {
		titulo: string | null;
		texto: string | null;
		imagem: TImage;
	};
};

const HomeCarousel = async () => {
	const data = await getData();

	return (
		<div className="relative mx-auto w-full md:my-8 md:max-w-[min(1200px,95%)]">
			<CarouselClient data={data} />
		</div>
	);
};

const getData = async () => {
	const { error, data } = await api<WithPagination<TBanners>>({
		url: '/banners',
		strapiQueryParams: ['populate=*'],
		fetchOptions: {
			next: {
				revalidate: 3600,
			},
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
		throw new Error(error.message);
	}

	return data;
};

export { HomeCarousel };
