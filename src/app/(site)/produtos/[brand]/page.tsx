import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { WithPagination } from '@/@types/api';
import { TImage } from '@/@types/products';
import { api } from '@/company-api/api';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type Props = {
	params: { brand: string };
};

type TProductShort = {
	id: number;
	attributes: {
		nome: string;
		serie: string;
		breveDecricao: string;
		principal: TImage;
	};
};

type TCategories = {
	id: number;
	attributes: {
		nome: string;
		produtos: {
			data: TProductShort[];
		};
	};
};

export default async function BrandCatalog({ params: { brand } }: Props) {
	const data = await getCategories(brand);

	return (
		<div className="pb-8">
			<div className="mx-auto flex max-w-[min(1100px,95%)] items-end gap-4">
				{brand === 'Mimaki' ? (
					<img
						src={'/assets/logo_mimaki.svg'}
						alt={`Lôgo Mimaki`}
						className="my-16 h-11"
					/>
				) : (
					<div className="flex items-center">
						<img
							src={'/assets/4P.svg'}
							alt={`Lôgo 4P`}
							className="my-8 h-28 w-28 bg-center object-cover"
						/>
						<h2 className="text-2xl font-medium sm:text-3xl">4P</h2>
					</div>
				)}
			</div>

			{data.length === 0 && (
				<div className="mx-auto mb-16 max-w-[min(1100px,95%)] border-t-4 border-issYellow pb-40 pt-16">
					<img
						src={'/assets/drawings/search.svg'}
						className="mx-auto h-44 w-44 object-contain opacity-50"
						alt="produto não encontrado"
					/>
					<h3 className="text-center text-xl">
						Nenhum produto encontrado da marca selecionada.
					</h3>
				</div>
			)}

			{data.map((category) => {
				const {
					nome: categoryName,
					produtos: { data: produtos },
				} = category.attributes;

				if (produtos.length === 0) return undefined;

				return (
					<div
						key={String(category.id)}
						className="mx-auto mb-16 max-w-[min(1100px,95%)]"
					>
						<h3 className="mb-4 rounded border-t-4 border-issYellow py-3 text-xl font-medium">
							{categoryName}
						</h3>
						<ul className="grid gap-8 md:grid-cols-2">
							{produtos.map(({ id, attributes: att }) => {
								return (
									<li key={String(id)}>
										<Link href={brand + '/' + att.nome.replace(' ', '-')}>
											<Card className="flex max-h-72 transition-transform hover:scale-[1.03]">
												<Image
													height={att.principal.data?.attributes.height}
													width={att.principal.data?.attributes.width}
													src={
														(process.env.NEXT_PUBLIC_API_URL || '') +
														att.principal.data?.attributes.url
													}
													alt={
														att.principal.data?.attributes.alternativeText ?? ''
													}
													className={`h-52 w-40 max-w-full border-r object-contain p-1 lg:w-52`}
												/>
												<div className="flex flex-col">
													<CardHeader>
														<CardTitle>{att.nome}</CardTitle>
													</CardHeader>

													<CardContent className="line-clamp-6">
														<p>
															<strong className="font-semibold opacity-90">
																Serie:
															</strong>{' '}
															{att.serie}
														</p>
														<CardDescription className="text-justify">
															{att.breveDecricao}
														</CardDescription>
													</CardContent>
												</div>
											</Card>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

async function getCategories(brand: string) {
	const { data, error } = await api<WithPagination<TCategories>>({
		url: '/catalogo-produtos-por-marcas',
		strapiQueryParams: [
			'populate=produtos.principal,*',
			'pagination[limit]=1000',
			`filters[fornecedor][nome][$eq]=${brand}`,
		],
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
		throw new Error(error.message);
	}

	return data;
}
