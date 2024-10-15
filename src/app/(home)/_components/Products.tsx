import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
	CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type TProduct = {
	id: string;
	name: string;
	img: string;
	category: string;
	description: string;
};

const Products = async () => {
	const data = await getData();

	return (
		<div className="grid max-w-full grid-cols-1 gap-4 xsm:grid-cols-2 md:grid-cols-4">
			{data.map((item) => (
				<Link href="#" key={item.id}>
					<ProductCard data={item} />
				</Link>
			))}
		</div>
	);
};

function ProductCard({ data }: { data: TProduct }) {
	return (
		<Card className="group h-full">
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
			</CardHeader>
			<CardContent className="overflow-hidden">
				<Image
					src={data.img}
					alt={data.name}
					width={500}
					height={500}
					className="h-full w-full transition-transform duration-500 group-hover:scale-125"
				/>
			</CardContent>
			<CardFooter>
				<CardDescription className="max-w-full break-words">
					<strong className="mb-2 inline-block">
						Tipo: <span className="font-normal">{data.category}</span>
					</strong>
					{data.description}
				</CardDescription>
			</CardFooter>
		</Card>
	);
}

const getData = async (): Promise<TProduct[]> => {
	try {
		return [
			{
				id: '1',
				name: 'UJV100-160',
				img: 'https://www.isscomercio.com.br/images/produto/ujv100-160-1.jpg',
				category: 'Impressora a jato de tinta',
				description:
					'Com duas novas cabeças de impressão, o equipamento UJV100-160 possibilita alta qualidade,produtividade e operação estável.',
			},
			{
				id: '2',
				name: 'JFX200-2513',
				img: 'https://www.isscomercio.com.br/images/produto/jfx200-2513-8.jpg',
				category: 'Plotter de recorte',
				description:
					'Melhor máquina da categoria, corta com pressão de até 500g, possibilitando um maior número de aplicações.',
			},
			{
				id: '3',
				name: 'SWJ-320EA',
				img: 'https://www.isscomercio.com.br/images/produto/swj-320ea-3.jpg',
				category: 'Impressora a jato de tinta',
				description:
					'Alto Contraste series é um perfil de cor especializado para fotografias, que suprimem granulação e requerem gradação mais suave.',
			},
			{
				id: '4',
				name: 'CG-SRIII Series',
				img: 'https://www.isscomercio.com.br/images/produto/jv300-plus-series-2.jpg',
				category: 'Plotter de recorte',
				description:
					'Desenvolvida usando a Tecnologia Mimaki, a JFX200-2513 é a melhor alternativa em equipamento UV do mercado, trazendo qualidade de impressão, facilidade operacional, alinhada ao melhor custo-benefício.',
			},
		];
	} catch (error) {
		return [];
	}
};

export { Products };
