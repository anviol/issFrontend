import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Mail } from 'lucide-react';

import { api } from '@/company-api/api';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	TProductAPI,
	TProductAttributes,
	TProductImage,
} from '@/@types/products';
import { MainContent } from './content/MainContent';
import { Downloads } from './content/Downloads';
import { Supplies } from './content/Supplies';
import { Separator } from '@/components/ui/separator';

type Props = {
	params: { slug: string };
};

const tabs = [
	{ id: '1', label: 'Principal' },
	{ id: '2', label: 'Suprimentos' },
	{ id: '3', label: 'Downloads' },
];

const baseUrl = process.env.API_URL;

export default async function ProductDetail({ params: { slug } }: Props) {
	const { imagens, ...product } = await getData(slug);

	return (
		<div className="mx-auto mt-8 max-w-page">
			<h2 className="flex items-center gap-2 text-2xl font-medium text-muted-foreground sm:text-3xl">
				{product.serie}{' '}
				<Separator orientation="vertical" className="h-8 w-0.5" />
				<span className="text-black"> {product.nome}</span>
			</h2>
			<hr className="mt-4 border" />

			<div className="mt-8">
				<Carousel
					thumbs={imagens.map(({ attributes }, id) => (
						<button
							key={String(id)}
							className="z-30 h-11 w-11 overflow-hidden rounded border"
						>
							<Image
								src={`${baseUrl}${attributes.url}`}
								alt={attributes.alternativeText || ''}
								width={140}
								height={140}
								className="h-full w-full object-cover"
							/>
						</button>
					))}
					thumbsClassName="px-8 space-x-2"
				>
					<CarouselContent className="mx-auto max-w-full">
						{imagens.map(({ attributes }, id) => (
							<CarouselItem key={id} className="p-4">
								<div className="h-80 w-auto overflow-hidden rounded-lg border">
									<Image
										src={`${baseUrl}${attributes.url}`}
										alt={attributes.alternativeText || ''}
										width={attributes.width}
										height={attributes.height}
										className="h-full w-full bg-black/70 object-contain"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className="mt-8 flex sm:justify-end md:mt-0">
				<button className="flex w-full items-center justify-center gap-2 rounded-md bg-issYellow p-4 transition-all hover:brightness-90 sm:w-auto">
					<Mail className="h-6 w-6" /> Solicitar Orçamento
				</button>
			</div>

			<div className="mb-16 mt-8">
				<Tabs defaultValue={tabs[0].id} className="w-full">
					<TabsList>
						{tabs.map(({ id, label }) => (
							<TabsTrigger
								key={id}
								value={id}
								disabled={disableTab(label, product)}
							>
								{label}
							</TabsTrigger>
						))}
					</TabsList>
					<div className="min-h-96 pb-10 sm:px-4">
						<TabsContent key={tabs[0].id} value={tabs[0].id}>
							<MainContent data={product.descricaoDetalhadaMD} />
						</TabsContent>
						<TabsContent key={tabs[1].id} value={tabs[1].id}>
							<Supplies data={product.suprimentos} />
						</TabsContent>
						<TabsContent key={tabs[2].id} value={tabs[2].id}>
							<Downloads data={[product.catalogo, product.drive]} />
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	);
}

function disableTab(label: string, product: TProductAttributes) {
	if (label === 'Downloads') {
		if (!product.catalogo.data && !product.drive.data) return true;
	} else if (label === 'Suprimentos') {
		if (
			product.suprimentos.length <= 1 &&
			product.suprimentos[0].children.every((e) => !e.text)
		)
			return true;
	}

	return false;
}

const getData = async (slug: string) => {
	const { error, data } = await api<TProductAPI>({
		url: '/produtos',
		strapiQueryParams: [
			'populate=*',
			'pagination[limit]=1000',
			`filters[nome][$eq]=${slug}`,
		],
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
		throw new Error(error.message);
	}

	const { attributes } = data[0];
	const imagens: (TProductImage['data'] & { principal: boolean })[] = [];

	(Object.keys(attributes) as Array<keyof TProductAttributes>).map((key) => {
		const isMainImage = key === 'principal';

		if (key.startsWith('secundaria') || isMainImage) {
			if ((attributes[key] as TProductImage).data?.attributes.url) {
				const data = (attributes[key] as TProductImage)['data'];

				if (data) {
					imagens.push({
						principal: isMainImage,
						...data,
					});
				}
			}
		}
	});

	return {
		...attributes,
		imagens: imagens.sort((e) => {
			if (e.principal) return 1;
			return 0;
		}),
	};
};
