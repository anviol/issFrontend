import { twMerge } from 'tailwind-merge';

const Advantages = () => {
	return (
		<div className="flex flex-col items-start gap-y-12 sm:gap-y-0">
			<div className="flex flex-col items-center justify-center gap-x-10 sm:flex-row">
				<img
					src={'/assets/drawings/savings.svg'}
					alt="Preços diferenciado"
					className="h-[220px] w-[160px] sm:w-[220px]"
				/>
				<div className="max-w-[600px]">
					<Title>Preço</Title>
					<Content>
						Com as melhores tintas do mercado para comunicação visual, grandes
						formatos, sublimação e UV
					</Content>
				</div>
			</div>

			<div className="ml-auto flex flex-col items-center justify-center gap-x-10 sm:flex-row">
				<div className="max-w-[600px]">
					<Title className="sm:text-right">Suporte ao Cliente</Title>
					<Content>
						Além do nosso excelente relacionamento com nossos clientes,
						trabalhamos em parceria com o que há de melhor no mercado em termos
						de tintas
					</Content>
				</div>
				<img
					src={'/assets/drawings/connecting_teams.svg'}
					alt="Suporte ao Cliente"
					className="-order-1 h-[300px] w-[220px] sm:order-none sm:w-[300px]"
				/>
			</div>

			<div className="flex flex-col items-center justify-center gap-x-8 sm:flex-row">
				<img
					src={'/assets/drawings/printing.svg'}
					alt="Produtos Importados"
					className="h-[300px] w-[300px]"
				/>
				<div className="max-w-[600px]">
					<Title>Produtos Importados</Title>
					<Content>
						Peças e equipamentos importados, com parceiros conceituados no
						mercado, oferecendo produtos de qualidade, garantia e confiabilidade
					</Content>
				</div>
			</div>
		</div>
	);
};

function Title({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h4
			className={twMerge(
				'my-5 text-center text-2xl font-semibold sm:text-left',
				className,
			)}
		>
			{children}
		</h4>
	);
}

function Content({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p
			className={twMerge(
				'px-2 text-center leading-7 sm:text-justify',
				className,
			)}
		>
			{children}
		</p>
	);
}
export { Advantages };
