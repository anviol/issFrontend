import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mail } from 'lucide-react';

import { api } from '@/company-api/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TProductAPI, TProductAttributes, TImage } from '@/@types/products';
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
	const { usages, ...product } = await getData(slug);
	const {
		principal: { data: principal },
	} = product;

	return (
		<div className="mx-auto mt-8 max-w-page">
			<h2 className="flex items-center gap-2 text-2xl font-medium text-muted-foreground sm:text-3xl">
				{product.serie}{' '}
				<Separator orientation="vertical" className="h-8 w-0.5" />
				<span className="text-black"> {product.nome}</span>
			</h2>
			<hr className="mt-4 border" />

			<div className="flex items-center justify-center p-8">
				<Image
					src={`${baseUrl}${principal?.attributes.url}`}
					alt={principal?.attributes.alternativeText || ''}
					width={principal?.attributes.width}
					height={principal?.attributes.height}
					className={`h-[${principal?.attributes.width}] w-[${principal?.attributes.height}] object-contain`}
				/>
			</div>

			<div className="mt-8 flex sm:justify-end md:mt-0">
				<Link
					href={`/contato/${product.nome}`}
					className="flex w-full items-center justify-center gap-2 rounded-md bg-issYellow p-4 transition-all hover:brightness-90 sm:w-auto"
				>
					<Mail className="h-6 w-6" />
					Solicitar Orçamento
				</Link>
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
							<MainContent
								data={product.descricaoDetalhadaMD}
								usages={usages}
								productName={`${product.serie}-${product.nome}`}
							/>
						</TabsContent>
						<TabsContent key={tabs[1].id} value={tabs[1].id}>
							<Supplies data={product.suprimentos || ''} />
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
		if (!product.suprimentos) return true;
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
	const usages: NonNullable<TImage['data']>[] = [];

	(Object.keys(attributes) as Array<keyof TProductAttributes>).map((key) => {
		if (key.startsWith('secundaria')) {
			if ((attributes[key] as TImage).data?.attributes.url) {
				const data = (attributes[key] as TImage)['data'];

				if (data) {
					usages.push(data);
				}
			}
		}
	});

	return {
		...attributes,
		usages,
	};
};
