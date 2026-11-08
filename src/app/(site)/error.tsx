'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	// O reset sozinho redesenha o que já veio do servidor, com o mesmo erro. O refresh busca
	// a página de novo, e o reset troca o aviso por ela quando der certo.
	const tentarDeNovo = () =>
		startTransition(() => {
			router.refresh();
			reset();
		});

	return (
		<div className="flex h-96 flex-col items-center justify-center gap-6 pb-8">
			<h2 className="text-3xl font-medium">{'Algo deu errado :('}</h2>
			<button
				className="rounded-md border-2 border-muted-foreground p-2 transition-colors hover:bg-muted-foreground hover:text-white"
				onClick={tentarDeNovo}
			>
				Tentar novamente
			</button>
		</div>
	);
}
