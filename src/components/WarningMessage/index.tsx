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

	if (data.data && !estaVigente(data.data.attributes)) return null;

	return <WarningToast {...data} />;
}

function estaVigente({
	inicio,
	fim,
}: WarningMessageProps['data']['attributes']) {
	const agora = Date.now();

	return (
		(!inicio || new Date(inicio).getTime() <= agora) &&
		(!fim || agora <= new Date(fim).getTime())
	);
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
