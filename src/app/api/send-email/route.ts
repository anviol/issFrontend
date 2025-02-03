import { NextResponse } from 'next/server';
import { SendEmailResponse } from '@/@types/form';
import { api } from '@/company-api/api';
import * as contactTemplate from '@/lib/templates/contact';

export async function POST(
	request: Request,
): Promise<NextResponse<SendEmailResponse>> {
	const formData = await request.formData();
	const greeting = `<p>Mensagem enviada pelo formulário do site.</p>`;

	const templateData: Record<string, unknown> = {};

	formData.forEach((value, key) => {
		if (key !== 'message' && key !== 'Produto') {
			templateData[key] = value === 'undefined' ? 'Não informado' : value;
		}
	});

	const product = formData.get('Produto');
	if (product) {
		templateData['Produto'] = product;
	}

	const message = `<p><strong>Mensagem: </strong>${formData.get('message')}</p>`;

	const template = contactTemplate.createTemplate(templateData);

	const body = new FormData();
	body.append('to', process.env.EMAIL_TO || '');
	body.append(
		'subject',
		`${product ? 'Solicitação de Orçamento via Site' : 'Solicitação de Contato via Site'} (${new Date().toLocaleString()})`,
	);
	body.append('message', greeting + template + message);

	const resp = await api<SendEmailResponse>({
		url: '/email/send',
		fetchOptions: {
			method: 'POST',
			body,
		},
	});

	return NextResponse.json(resp);
}
