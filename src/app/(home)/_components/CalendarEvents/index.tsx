import { api } from '@/company-api/api';
import { Section } from '../Section';
import { SelectEvent } from './SelectEvent';
import { notFound } from 'next/navigation';

export type TEvent = {
	id: 1;
	attributes: {
		titulo: string;
		descricao: string;
		inicio: string;
		fim: string;
		horariodata: string;
		localizacao: string;
	};
};

const CalendarEvents = async () => {
	const data = await getDate();

	return (
		<>
			{data.length > 0 && (
				<Section title="Próximos eventos">
					<SelectEvent data={data} />
				</Section>
			)}
		</>
	);
};

const getDate = async () => {
	const { error, data } = await api<{ data: TEvent[] }>({
		url: '/eventos',
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

export { CalendarEvents };
