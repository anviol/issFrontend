import { ArrowUpRight } from 'lucide-react';

// Assinatura de quem produz e mantém o site, com as cores da SociallBR
// (verde #12372a, papel #f6f1e7, ouro #c9a66b). A animação é só CSS, sem
// fonte nem script a mais. Sem noreferrer, para a visita chegar com origem.
const SOCIALL_URL =
	'https://www.sociallbr.com.br/?utm_source=isscomercio.com.br&utm_medium=referral&utm_campaign=assinatura-rodape';

export function SociallSignature() {
	return (
		<a
			href={SOCIALL_URL}
			target="_blank"
			rel="noopener"
			aria-label="Site produzido e mantido pela SociallBR. Quer um site assim? Abre em nova aba."
			className="group mx-auto mb-16 mt-10 flex max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-2 pl-2 pr-4 text-left text-xs text-white/60 transition-colors duration-300 hover:border-[#c9a66b]/40 hover:bg-white/[0.06] hover:text-white/90 focus-visible:border-[#c9a66b]/70 focus-visible:text-white/90 focus-visible:outline-none motion-reduce:transition-none sm:mb-0 sm:rounded-full"
		>
			<Seal />
			<span className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-0">
				<span>
					Produzido e mantido pela{' '}
					<span className="font-semibold tracking-[0.16em] text-white">
						SOCIALL<span className="text-[#c9a66b]">BR</span>
					</span>
				</span>

				{/* Em telas com mouse, o convite abre no hover. No toque, fica sempre à mostra. */}
				<span className="grid transition-[grid-template-columns,opacity] duration-500 ease-out group-hover:grid-cols-[1fr] group-hover:opacity-100 group-focus-visible:grid-cols-[1fr] group-focus-visible:opacity-100 motion-reduce:transition-none sm:[@media(hover:hover)]:grid-cols-[0fr] sm:[@media(hover:hover)]:opacity-0">
					<span className="overflow-hidden">
						<span className="flex items-center gap-0.5 whitespace-nowrap text-[#c9a66b] sm:pl-3">
							Quer um site assim?
							<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
						</span>
					</span>
				</span>
			</span>
		</a>
	);
}

// Selo do site da SociallBR: o anel dourado se fecha em volta do "S" no hover.
function Seal() {
	return (
		<svg
			viewBox="0 0 108 108"
			aria-hidden="true"
			className="h-8 w-8 shrink-0 transition duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(201,166,107,0.35)] motion-reduce:transition-none"
		>
			<circle cx="54" cy="54" r="54" fill="#12372a" />
			<circle
				cx="54"
				cy="54"
				r="45.25"
				fill="none"
				stroke="#c9a66b"
				strokeOpacity="0.3"
				strokeWidth="5"
			/>
			<circle
				cx="54"
				cy="54"
				r="45.25"
				fill="none"
				stroke="#c9a66b"
				strokeWidth="5"
				pathLength={1}
				strokeDasharray="1"
				transform="rotate(-90 54 54)"
				className="transition-[stroke-dashoffset] duration-700 ease-out [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none"
			/>
			<path
				fill="#f6f1e7"
				transform="translate(0 2)"
				d="M55.72 73.05Q53.16 73.05 51.39 72.39Q49.63 71.74 48.56 71.09Q47.49 70.44 47.02 70.44Q46.6 70.44 46.25 70.84Q45.9 71.24 45.57 71.77Q45.23 72.3 44.87 72.7Q44.52 73.11 44.08 73.11Q43.65 73.11 43.36 72.83Q43.07 72.56 42.95 71.98L40.83 61.84Q40.74 61.39 40.92 61.07Q41.09 60.74 41.52 60.6Q41.98 60.43 42.33 60.62Q42.69 60.8 42.95 61.31Q44.73 64.96 46.73 67.08Q48.73 69.2 50.88 70.11Q53.03 71.01 55.24 71.01Q58.38 71.01 60.2 69.32Q62.01 67.62 62.02 64.71Q62.03 62.89 61.22 61.36Q60.41 59.83 58.23 58.43Q56.05 57.03 51.97 55.65Q47.56 54.13 44.91 52.25Q42.25 50.38 41.07 47.96Q39.88 45.55 39.88 42.45Q39.88 39.01 41.53 36.41Q43.18 33.81 46.13 32.37Q49.08 30.92 52.94 30.92Q55.57 30.92 57.27 31.51Q58.97 32.1 60.01 32.69Q61.04 33.29 61.65 33.29Q62.21 33.29 62.61 32.69Q63.01 32.08 63.43 31.47Q63.86 30.86 64.47 30.86Q64.91 30.86 65.2 31.13Q65.49 31.41 65.7 32.14L68.56 42.42Q68.71 42.94 68.54 43.34Q68.37 43.74 67.93 43.9Q67.47 44.05 67.11 43.86Q66.75 43.68 66.5 43.21Q64.55 39.32 62.45 37.08Q60.35 34.84 58.13 33.9Q55.9 32.95 53.57 32.95Q50.41 32.95 48.49 34.81Q46.56 36.67 46.56 39.8Q46.56 41.66 47.37 43.25Q48.18 44.84 50.3 46.29Q52.41 47.74 56.32 49.18Q60.88 50.85 63.54 52.72Q66.19 54.59 67.33 56.86Q68.48 59.13 68.47 61.99Q68.46 65.04 66.95 67.55Q65.45 70.07 62.61 71.56Q59.78 73.05 55.72 73.05Z"
			/>
		</svg>
	);
}
