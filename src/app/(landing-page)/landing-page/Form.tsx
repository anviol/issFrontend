'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendEmailResponse, TFormOptions } from '@/@types/form';

type BuiltSchema = {
	email: string;
	message: string;
	[key: string]: string;
};

type Props = {
	fields: TFormOptions['data'];
};

export const ClientForm = ({ fields }: Props) => {
	const formSchema = buildSchema(fields);

	const form = useForm<Valores>({
		resolver: zodResolver(formSchema),
		// Começar com texto vazio, e não com undefined, é o que faz o reset apagar o que está na tela.
		defaultValues: valoresVazios([
			'message',
			...fields.map(({ attributes }) => attributes.campo),
		]),
	});

	async function onSubmit(values: Valores) {
		try {
			await toast.promise(sendMail(values as BuiltSchema), {
				pending: 'Enviando sua requisição',
				success: 'Requisição enviada com sucesso!',
				error:
					'Não foi possível enviar sua requisição. Por favor, tente novamente.',
			});
			form.reset();
		} catch {
			// O toast já avisou do erro, e os campos continuam preenchidos para o cliente tentar de novo.
		}
	}

	const sendMail = useCallback(async (props: BuiltSchema) => {
		const { email, ...formData } = props;

		const body = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			body.append(key, value);
		});

		const resp = await fetch(`/api/send-email`, {
			method: 'POST',
			body: body,
		});

		const respJson: SendEmailResponse & { error: string } = await resp.json();

		const { info, error } = respJson;

		if (error || !info.response.startsWith('250')) {
			throw new Error('Erro ao enviar email');
		}
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				{fields.map(({ id, attributes }) => {
					const { campo, obrigatorio } = attributes;
					const placeholder =
						campo === 'Telefone' || campo === 'Whatsapp'
							? '(DD) 99999-9999, DD999999999'
							: campo;

					return (
						<FormField
							key={String(id)}
							control={form.control}
							name={campo}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{campo}
										{obrigatorio && <span className="text-red-500"> *</span>}
									</FormLabel>
									<FormControl>
										<Input placeholder={placeholder} {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem className="flex h-full flex-col space-y-1">
							<FormLabel>Mensagem</FormLabel>
							<FormControl>
								<Textarea
									className="min-h-32 max-w-full"
									placeholder="Digite sua mensagem"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					size="lg"
					className="w-full bg-black px-10 text-lg text-white hover:bg-gray-800"
					type="submit"
				>
					Enviar
				</Button>
			</form>
		</Form>
	);
};

// Campo vazio conta como não preenchido: o opcional passa, e o obrigatório pede o preenchimento,
// em vez de reclamar do formato. Vale para o campo apagado e para o formulário limpo após o envio.
const vazioParaUndefined = (value: string | undefined) =>
	value !== undefined && !value.trim() ? undefined : value;

const valoresVazios = (nomes: string[]): Valores =>
	Object.fromEntries(nomes.map((nome) => [nome, '']));

// Todo campo recebe texto e devolve texto, ou nada quando é opcional e ficou vazio.
type Campo = z.ZodType<string | undefined, string | undefined>;
type Valores = Record<string, string | undefined>;

function buildSchema(fields: TFormOptions['data']) {
	const schemaShape: Record<string, Campo> = {};
	const phoneNumberRegex = /^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/;

	fields.forEach(({ attributes }) => {
		let schema;

		const { campo, obrigatorio } = attributes;

		switch (campo) {
			case 'E-mail':
				schema = z
					.string({ message: 'campo obrigatório' })
					.email(`e-mail inválido.`);
				break;
			case 'Telefone':
			case 'Whatsapp':
				schema = z
					.string({ message: 'campo obrigatório' })
					.regex(phoneNumberRegex, `formato de telefone inválido`);
				break;
			default:
				schema = z
					.string({ message: 'campo obrigatório' })
					.trim()
					.min(1, { message: 'campo obrigatório' });
		}

		schemaShape[campo] = z.preprocess(
			vazioParaUndefined,
			obrigatorio ? schema : schema.optional(),
		);
	});

	schemaShape['message'] = z.preprocess(
		vazioParaUndefined,
		z
			.string()
			.min(10, {
				message: 'Deve conter pelo menos 10 caracteres.',
			})
			.max(200, {
				message: 'Deve conter no máximo 200 caracteres.',
			})
			.optional(),
	);

	return z.object(schemaShape);
}
