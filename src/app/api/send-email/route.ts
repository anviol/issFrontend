import { NextResponse } from 'next/server';
import { SendEmailResponse } from '@/@types/form';
import { api } from '@/company-api/api';
import * as contactTemplate from '@/lib/templates/contact';

const NAO_INFORMADO = 'Não informado';

// O formulário envia o texto 'undefined' nos campos opcionais que não foram tocados.
function limpar(value: FormDataEntryValue | null) {
	const texto = typeof value === 'string' ? value.trim() : '';
	return texto === 'undefined' ? '' : texto;
}

export async function POST(
	request: Request,
): Promise<NextResponse<SendEmailResponse | { error: string }>> {
	const formData = await request.formData().catch(() => null);

	if (!formData) {
		return NextResponse.json(
			{ error: 'Requisição inválida.' },
			{ status: 400 },
		);
	}

	const templateData: Record<string, unknown> = {};

	formData.forEach((value, key) => {
		if (key !== 'message' && key !== 'Produto') {
			templateData[key] = limpar(value) || NAO_INFORMADO;
		}
	});

	const mensagem = limpar(formData.get('message'));
	const temDados = Object.values(templateData).some(
		(value) => value !== NAO_INFORMADO,
	);

	if (!mensagem && !temDados) {
		return NextResponse.json(
			{ error: 'Formulário sem dados.' },
			{ status: 400 },
		);
	}

	const product = limpar(formData.get('Produto'));
	if (product) {
		templateData['Produto'] = product;
	}

	const message = mensagem
		? `<p><strong>Mensagem: </strong>${contactTemplate.escapeHtml(mensagem)}</p>`
		: '';

	const template = contactTemplate.createTemplate(templateData);

	const data = new Date().toLocaleString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
	});

	// Sem destinatário: o Strapi envia para os e-mails publicados em "Email de envio".
	const body = new FormData();
	body.append(
		'subject',
		`${product ? 'Solicitação de Orçamento via Site' : 'Solicitação de Contato via Site'} (${data})`,
	);

	const greeting = `<p>Mensagem enviada pelo formulário do site.</p>`;
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
