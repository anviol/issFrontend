import { api } from '@/company-api/api';
import { ClientForm } from '../ClientForm';
import { notFound } from 'next/navigation';

export type TFormOptions = {
	data: {
		id: number;
		attributes: {
			campo: string;
			obrigatorio: boolean;
		};
	}[];
};

export default async function Contact({
	params,
}: {
	params: { product?: string[] };
}) {
	const data = await getDate();

	return (
		<div>
			<ClientForm
				fields={data}
				product={(params.product && params.product[0]) || null}
			/>
		</div>
	);
}

const getDate = async () => {
	const { error, data } = await api<TFormOptions>({
		url: '/formularios',
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
