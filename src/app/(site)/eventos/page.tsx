import { Image } from 'react-grid-gallery';
import { api } from '@/company-api/api';
import { Section } from '../(home)/_components/Section';
import { EventGallery } from './EventGallery';
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
			<EventGallery images={data} enableImageSelection={false} />
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

	const images: Image[] = [];

	data.forEach(({ attributes: evento }) => {
		evento.fotos.data.forEach(({ attributes: image }) => {
			images.push({
				height: image.height,
				width: image.width,
				src: `${process.env.NEXT_PUBLIC_API_URL}${image.url}`,
				customOverlay: (
					<div className="flex h-full flex-col justify-end">
						<div className="bg-white/80">
							<div>{evento.nome_evento}</div>
						</div>
					</div>
				),
			});
		});
	});

	return images;
}
