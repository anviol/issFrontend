'use client';

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex h-96 flex-col items-center justify-center gap-6 pb-8">
			<h2 className="text-3xl font-medium">{'Algo deu errado :('}</h2>
			<button
				className="rounded-md border-2 border-muted-foreground p-2 transition-colors hover:bg-muted-foreground hover:text-white"
				onClick={() => reset()}
			>
				Tentar novamente
			</button>
		</div>
	);
}
