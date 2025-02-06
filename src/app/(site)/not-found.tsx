import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex h-96 flex-col items-center justify-center gap-2 pb-8">
			<h2 className="text-3xl font-bold">Página não encontrada!</h2>
			<p>Verifique se o endereço da página está correto</p>
			<Link
				href="/"
				className="mt-2 rounded-md border-2 border-muted-foreground p-2 transition-colors hover:bg-muted-foreground hover:text-white"
			>
				Ir para inicio
			</Link>
		</div>
	);
}
