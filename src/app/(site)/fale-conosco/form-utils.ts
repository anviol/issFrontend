import { z } from 'zod';
import { TFormOptions } from '@/@types/form';

// Monta dinamicamente o schema de validação do formulário de contato a partir
// dos campos configurados no CMS. `email` e `message` são sempre obrigatórios;
// os demais campos seguem a flag `obrigatorio` e, no caso de telefone/whatsapp,
// validam o formato.
export function buildSchema(fields: TFormOptions['data']) {
	const schemaShape: Record<string, z.ZodTypeAny> = {
		email: z.string({ message: 'campo obrigatório' }).email(`e-mail inválido.`),
		message: z
			.string({ message: 'campo obrigatório' })
			.min(10, {
				message: 'Deve conter pelo menos 10 caracteres.',
			})
			.max(250, {
				message: 'Deve conter no máximo 250 caracteres.',
			}),
	};

	const phoneNumberRegex = /^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/;

	fields.forEach(({ attributes }) => {
		let schema;

		const { campo, obrigatorio } = attributes;

		switch (campo) {
			case 'Telefone':
			case 'Whatsapp':
				schema = z
					.string({ message: 'campo obrigatório' })
					.regex(phoneNumberRegex, `formato de telefone inválido`);
				break;
			default:
				schema = z.string({ message: 'campo obrigatório' });
		}

		schemaShape[campo] = obrigatorio ? schema : schema.optional();
	});

	return z.object(schemaShape);
}

// Recebe o nome do campo e devolve a máscara de input correspondente
// (string vazia quando o campo não possui máscara).
export function maskByInputName(inputName: string) {
	const phoneMask = '(##) #####-####';
	const cpfMask = '###.###.###-##';
	const cnpjMask = '##.###.###/####-##';
	const cepMask = '#####-###';

	switch (inputName.toLowerCase()) {
		case 'telefone':
		case 'whatsapp':
			return phoneMask;
		case 'cpf':
			return cpfMask;
		case 'cnpj':
			return cnpjMask;
		case 'cep':
			return cepMask;
		default:
			return '';
	}
}
