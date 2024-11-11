'use client';

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
import { Section } from '../(home)/_components/Section';
import { TFormOptions } from './page';

type Props = {
	fields: TFormOptions['data'];
};

export const ClientForm = ({ fields }: Props) => {
	const formSchema = buildSchema(fields);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Section title="Entre em contato conosco" className="pb-40">
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
		.max(200, {
			message: 'Deve conter no máximo 200 caracteres.',
		})
		.optional();

	return z.object(schemaShape);
}
