import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { WithPagination } from '@/@types/api';
import { TImage } from '@/@types/products';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import { api } from '@/company-api/api';

type TCategories = {
	id: number;
	attributes: {
		titulo: string;
		imagem: TImage;
	};
};

const Categories = async () => {
	const data = await getData();

	return (
		<div className="grid max-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
			{data.map(({ id, attributes }) => (
				<Link
					href={
						attributes.titulo.toUpperCase().includes('4P')
							? '/produtos/4P'
							: `/produtos/Mimaki`
					}
					key={String(id)}
				>
					<ProductCard data={attributes} />
				</Link>
			))}
		</div>
	);
};

function ProductCard({ data }: { data: TCategories['attributes'] }) {
	const image = data.imagem.data?.attributes;

	return (
		<Card className="group h-full overflow-hidden transition-transform ease-in hover:scale-105">
			<CardHeader>
				<CardTitle className="text-xl">{data.titulo}</CardTitle>
			</CardHeader>
			<CardContent className="overflow-hidden p-0">
				<Image
					src={`${process.env.API_URL}${image?.url}`}
					alt={image?.alternativeText || ''}
					width={500}
					height={500}
					className="h-full w-full object-cover transition-transform duration-500"
				/>
			</CardContent>
		</Card>
	);
}

const getData = async () => {
	const { error, data } = await api<WithPagination<TCategories>>({
		url: '/categorias-destaques',
		strapiQueryParams: ['populate=*', 'pagination[limit]=1000'],
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
		throw new Error(error.message);
	}

	return data;
};

export { Categories };
