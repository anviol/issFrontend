import { NextResponse } from 'next/server';
import { SendEmailResponse } from '@/@types/form';
import { api } from '@/company-api/api';

export async function POST(
	request: Request,
): Promise<NextResponse<SendEmailResponse>> {
	const formData = await request.formData();
	let html = `<p>Mensagem enviada pelo formulário do site.</p>`;

	const product = formData.get('Produto');

	formData.forEach((value, key) => {
		if (key !== 'message' && key !== 'Produto') {
			html += `<p><strong>${key}</strong>: ${value === 'undefined' ? 'Não informado' : value}</p>`;
		}
	});

	if (product) {
		html += `<p><strong>Produto</strong>: ${product}</p>`;
	}

	html += `<p><strong>Mensagem</strong>: ${formData.get('message') || ''}</p>`;

	const body = new FormData();
	body.append('to', process.env.EMAIL_TO || '');
	body.append(
		'subject',
		`${product ? 'Solicitação de Orçamento via Site' : 'Solicitação de Contato via Site'} (${new Date().toLocaleString()})`,
	);
	body.append('message', html);

	const resp = await api<SendEmailResponse>({
		url: '/email/send',
		fetchOptions: {
			method: 'POST',
			body,
		},
	});

	return NextResponse.json(resp);
}
