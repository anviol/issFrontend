import * as NavMenu from '@radix-ui/react-navigation-menu';

/** Descrição de cada marca no menu Produtos, pelo `nome` do fornecedor no CMS. */
export type DescricoesDasMarcas = Record<string, string | undefined>;

type ProductAreaProps = {
	title: string;
	href: string;
	imageUrl?: string;
	description?: string;
};

type BrandProps = {
	description?: string;
};

export const BrandMimaki = ({ description }: BrandProps) => (
	<ProductArea
		title="Mimaki"
		href="/produtos/Mimaki"
		imageUrl="/assets/logo_mimaki.svg"
		description={description}
	/>
);

export const Brand4P = ({ description }: BrandProps) => (
	<ProductArea
		title="4P"
		href="/produtos/4P"
		imageUrl="/assets/4P.svg"
		description={description}
	/>
);

export const ProductArea = ({
	title,
	href,
	imageUrl,
	description,
}: ProductAreaProps) => {
	return (
		<NavMenu.NavigationMenuLink asChild>
			<a
				className="flex items-start gap-4 p-6 no-underline transition-colors duration-500 hover:bg-gray-100"
				href={href}
			>
				<img
					src={imageUrl}
					alt={title}
					className="h-24 w-24 min-w-24 rounded-md border bg-gray-100 object-contain p-2 shadow-md"
				/>
				<div>
					<span className="font-semibold text-black">{title}</span>
					{description && (
						<p className="text-justify text-sm text-black">{description}</p>
					)}
				</div>
			</a>
		</NavMenu.NavigationMenuLink>
	);
};
