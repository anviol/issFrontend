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

const formSchema = z.object({
	username: z.string().min(3, {
		message: 'Deve conter pelo menos 2 caracteres.',
	}),
	email: z.string().email({
		message: 'Email inválido.',
	}),
	message: z
		.string()
		.min(10, {
			message: 'Deve conter pelo menos 2 caracteres.',
		})
		.max(200, {
			message: 'Deve conter no máximo 200 caracteres.',
		}),
	whatsapp: z
		.string()
		.regex(/^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/, {
			message: 'Formato do telefone inválido.',
		})
		.optional(),
});

export const ContactForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			message: '',
			whatsapp: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-wrap gap-8">
					<div className="w-full min-w-72 flex-1 md:max-w-96">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="whatsapp"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Whatsapp (Opcional)</FormLabel>
									<FormControl>
										<Input
											placeholder="(DD)999999999"
											type={'tel'}
											minLength={11}
											maxLength={15}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="min-h-full max-w-full">
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem className="flex h-full flex-col">
									<FormLabel>Mensagem</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-44 w-[600px] max-w-full"
											placeholder="Digite sua mensagem"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button
					size="lg"
					className="mt-12 w-full bg-issYellow px-10 text-lg text-black hover:bg-issYellow hover:brightness-90 md:w-auto"
					type="submit"
				>
					Enviar
				</Button>
			</form>
		</Form>
	);
};
