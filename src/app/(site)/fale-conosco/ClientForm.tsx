'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';

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
import { Section } from '../(home)/_components/Section';
import { Label } from '@/components/ui/label';
import { TFormOptions } from '@/@types/form';

type Props = {
	fields: TFormOptions['data'];
	product: string | null;
};

export const ClientForm = ({ fields, product }: Props) => {
	const formSchema = buildSchema(fields);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Section title="Entre em contato conosco" className="pb-40">
			{product && (
				<div className="mb-8">
					<Label htmlFor="product">{'Produto'}</Label>
					<Input id={'product'} value={product} readOnly disabled />
				</div>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					{fields.map(({ id, attributes }) => {
						const { campo, obrigatorio } = attributes;
						const placeholder =
							campo === 'Telefone' || campo === 'Whatsapp'
								? '(DD) 99999-9999'
								: campo;

						const format = maskByInputName(campo);

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
											{format ? (
												<PatternFormat
													format={format}
													{...field}
													placeholder={placeholder}
													customInput={Input}
												/>
											) : (
												<Input placeholder={placeholder} {...field} />
											)}
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
										className="min-h-44 max-w-full"
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
						className="w-full bg-issYellow px-10 text-lg text-black hover:bg-issYellow hover:brightness-90 md:w-auto"
						type="submit"
					>
						Enviar
					</Button>
				</form>
			</Form>
		</Section>
	);
};

function buildSchema(fields: TFormOptions['data']) {
	const schemaShape: Record<string, z.ZodTypeAny> = {};
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
				schema = z.string({ message: 'campo obrigatório' });
		}

		schemaShape[campo] = obrigatorio ? schema : schema.optional();
	});

	schemaShape['message'] = z
		.string()
		.min(10, {
			message: 'Deve conter pelo menos 10 caracteres.',
		})
		.max(250, {
			message: 'Deve conter no máximo 250 caracteres.',
		})
		.optional();

	return z.object(schemaShape);
}

// receive input name and return input mask pattern based on the name
function maskByInputName(inputName: string) {
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
