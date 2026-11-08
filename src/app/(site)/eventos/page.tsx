import { api } from '@/company-api/api';
import { Section } from '../(home)/_components/Section';
import { EventGallery } from './EventGallery';
import { Photo } from './PhotoGrid';
import { notFound } from 'next/navigation';
import { TImage } from '@/@types/products';

type TEventImages = {
	data: {
		id: number;
		attributes: {
			nome_evento: string;
			fotos: {
				data: NonNullable<TImage['data']>[];
			};
		};
	}[];
};

export default async function Events() {
	const data = await getData();

	return (
		<Section title="Mídias" className="min-h-[800px]">
			<EventGallery images={data} />
		</Section>
	);
}

async function getData() {
	const { error, data } = await api<TEventImages>({
		url: '/historico-eventos',
		strapiQueryParams: ['populate=*', 'pagination[limit]=50'],
		fetchOptions: {
			next: {
				revalidate: 3600 * 24 * 7,
			},
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
	}

	const images: {
		small: Photo[];
		medium: {
			height: number;
			width: number;
			src: string;
			alt: string;
		}[];
	} = {
		small: [],
		medium: [],
	};

	data.forEach(({ attributes: evento }) => {
		evento.fotos.data.forEach(({ attributes: image }) => {
			const small = image.formats?.small ?? image;
			const medium = image.formats?.medium ?? image;

			images.small.push({
				height: small.height,
				width: small.width,
				src: `${process.env.NEXT_PUBLIC_API_URL}${small.url}`,
				album: evento.nome_evento,
			});
			images.medium.push({
				height: medium.height,
				width: medium.width,
				src: `${process.env.NEXT_PUBLIC_API_URL}${medium.url}`,
				alt: image.alternativeText || image.name,
			});
		});
	});

	return images;
}
