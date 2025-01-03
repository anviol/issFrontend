import { api } from '@/company-api/api';
import { TimeLine } from './TimeLine';
import { notFound } from 'next/navigation';

export type TTimeLine = {
	data: {
		id: number;
		attributes: {
			ano: number;
			acontecimento: string;
		};
	}[];
};

export default async function AboutUs() {
	const data = await getData();

	return (
		<main className="h-full bg-[pageBgGray]">
			<div
				className="mb-32 h-72 w-full bg-cover bg-fixed bg-no-repeat [background-position:0%_20%]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://www.isscomercio.com.br/images/contato-01.jpg')",
				}}
			/>

			<div className="mx-auto mb-16 max-w-page">
				<h2 className="text-4xl font-medium">Nossa história</h2>
			</div>

			<TimeLine data={data} />
		</main>
	);
}

const getData = async () => {
	const { error, data } = await api<TTimeLine>({
		url: '/historias',
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
