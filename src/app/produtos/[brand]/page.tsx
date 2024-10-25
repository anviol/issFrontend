import { notFound } from 'next/navigation';

import { WithPagination } from '@/@types/api';
import { api } from '@/company-api/api';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

import { MoreButton } from '@/components/MoreButton';
import { Pagination } from '@/components/PaginationController';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
	params: { brand: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

type ProductShort = {
	id: number;
	attributes: {
		nome: string;
		serie: string;
		breveDecricao: string;
	};
};

const filters = [
	{
		id: '2',
		title: 'Tipos',
		options: [
			{ id: '1', label: 'Impressora Solvente' },
			{ id: '2', label: 'Impressora Têxtil' },
			{ id: '3', label: 'Rolo a Rolo' },
			{ id: '4', label: 'Impressora UV' },
			{ id: '5', label: 'Impressora Sublimática' },
			{ id: '6', label: 'Impressão e Corte' },
			{ id: '7', label: 'Impressora Látex' },
			{ id: '8', label: 'Impressora DTF' },
			{ id: '9', label: 'Mesa Plana' }
		]
	}
];

export default async function BrandCatalog({ params: { brand }, searchParams }: Props) {
	const { pagina } = searchParams;

	const page =
		typeof pagina === 'string' ? pagina : '1';

	const { meta, data } = await getData(brand, page);

	return (
		<div>
			<div className='max-w-[min(1100px,95%)] mx-auto mt-16 flex gap-4 items-end'>
				<img src='/assets/logo_mimaki.svg' alt={`Lôgo ${brand}`} className='h-11' />
				{/* <h2 className='text-2xl font-medium sm:text-3xl'>Produtos</h2> */}
			</div>

			<div className='flex py-16 gap-y-8 justify-center'>
				<div className='flex-1 flex justify-end px-4'>
					<Card className='h-min pb-12'>
						<CardHeader>
							<CardTitle>Filtros</CardTitle>
						</CardHeader>

						<CardContent className='min-w-64'>
							{
								filters.map((category) => {
									return <div key={category.id} className='space-y-4'>
										<span className='text-sm font-medium'>{category.title}</span>
										<div className='flex flex-col gap-4'>
											{category.options.map((option) => {
												return <div key={option.id} className="flex items-center space-x-2">
													<Checkbox id={`${category.id}-${option.id}`} className='w-5 h-5' />
													<label
														htmlFor={`${category.id}-${option.id}`}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														{option.label}
													</label>
												</div>
											})}
										</div>
									</div>
								})}

						</CardContent>
					</Card>
				</div>

				<ul className="grid grid-cols-2 max-w-[min(1100px,95%)] gap-8">
					{data.map(({ id, attributes }) => {
						return (
							<li key={String(id)}>
								<Card className="flex max-h-72">
									<img
										src="https://d3j3imors9xf8g.cloudfront.net/archives/002/202311/0fb7ef60d132203ee40ad654e426179c85775843c859bf5cf33c0ff062f3bcde.png"
										alt="Impressora Mimaki"
										className="h-60 w-60 border-r object-contain"
									/>
									<div className="flex flex-col">
										<CardHeader>
											<CardTitle>{attributes.nome}</CardTitle>
										</CardHeader>

										<CardContent className="line-clamp-6">
											<p>
												<strong className="font-semibold opacity-90">
													Serie:
												</strong>{' '}
												{attributes.serie}
											</p>
											<CardDescription className="text-justify">
												{attributes.breveDecricao}
											</CardDescription>
										</CardContent>

										<CardFooter className="mt-auto">
											<MoreButton
												title="Ver detalhes"
												className="text-sm"
												href={brand + '/' + attributes.nome.replace(' ', '-')}
											/>
										</CardFooter>
									</div>
								</Card>
							</li>
						);
					})}
				</ul>

				<div className='flex-1'></div>
			</div>

			<div className='my-16'>
				<Pagination length={meta.pagination.total} />
			</div>
		</div>
	);
}

async function getData(brand: string, page: string) {
	// const { meta, error } = await api<WithPagination<ProductShort>>({
	// 	url: '/produtos',
	// 	fetchOptions: {
	// 		cache: 'no-cache',
	// 	},
	// 	strapiQueryParams: ['pagination[pageSize]=10', `pagination[page]=${page}`],
	// });

	// if (error) {
	// 	if (error.status === 404) return notFound();
	// 	throw new Error(error.message);
	// }

	const data = [
		{
			id: 1,
			attributes: {
				nome: 'UJV100-160Plus',
				serie: 'UJV100',
				breveDecricao:
					'Alto desempenho e qualidade\nEquipamento de impressão UV de entrada: Evolução alcançada com "baixo consumo de energia" e "três funções adicionais"',
			},
		},
		{
			id: 2,
			attributes: {
				nome: 'JV330',
				serie: 'JV330 Series',
				breveDecricao:
					'A série "JV330" são impressoras a jato de tinta solvente e eco-solvente que foram adicionadas recentemente à nova linha de impressoras Mimaki, para atender às necessidades dos clientes.',
			},
		},
		{
			id: 3,
			attributes: {
				nome: 'UJV100-160Plus',
				serie: 'UJV100',
				breveDecricao:
					'Alto desempenho e qualidade\nEquipamento de impressão UV de entrada: Evolução alcançada com "baixo consumo de energia" e "três funções adicionais"',
			},
		},
		{
			id: 4,
			attributes: {
				nome: 'JV330',
				serie: 'JV330 Series',
				breveDecricao:
					'A série "JV330" são impressoras a jato de tinta solvente e eco-solvente que foram adicionadas recentemente à nova linha de impressoras Mimaki, para atender às necessidades dos clientes. A série "JV330" são impressoras a jato de tinta solvente e eco-solvente que foram adicionadas recentemente à nova linha de impressoras Mimaki, para atender às necessidades dos clientes.',
			},
		},
		{
			id: 5,
			attributes: {
				nome: 'UJV100-160Plus',
				serie: 'UJV100',
				breveDecricao:
					'Alto desempenho e qualidade\nEquipamento de impressão UV de entrada: Evolução alcançada com "baixo consumo de energia" e "três funções adicionais"',
			},
		},
		{
			id: 6,
			attributes: {
				nome: 'JV330',
				serie: 'JV330 Series',
				breveDecricao:
					'A série "JV330" são impressoras a jato de tinta solvente e eco-solvente que foram adicionadas recentemente à nova linha de impressoras Mimaki, para atender às necessidades dos clientes. A série "JV330" são impressoras a jato de tinta solvente e eco-solvente que foram adicionadas recentemente à nova linha de impressoras Mimaki, para atender às necessidades dos clientes.',
			},
		},
	];

	const meta = {
		pagination: {
			page: 1,
			pageSize: 25,
			pageCount: 1,
			total: 1,
		},
	};
	return { meta, data };
}
