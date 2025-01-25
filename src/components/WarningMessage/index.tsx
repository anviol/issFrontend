import { api } from '@/company-api/api';
import { WarningToast } from './MessageToast';

export type WarningMessageProps = {
	data: {
		id: number;
		attributes: {
			inicio: string;
			fim: string;
			titulo: string;
			texto: string;
		};
	};
};

export async function WarningMessage() {
	const data = await getData();

	return <WarningToast {...data} />;
}

async function getData() {
	const resp = await api<WarningMessageProps>({
		url: '/aviso',
		fetchOptions: {
			cache: 'no-store',
		},
	});

	return resp;
}
