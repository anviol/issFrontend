import * as NavMenu from '@radix-ui/react-navigation-menu';

type ProductAreaProps = {
	title: string;
	href: string;
	imageUrl?: string;
	children?: React.ReactNode;
};

export const BrandMimaki = () => (
	<ProductArea
		title="Mimaki"
		href="/produtos/Mimaki"
		imageUrl="/assets/logo_mimaki.svg"
	>
		As Impressoras a jato de tinta de grandes formatos, oferecem versatilidade e
		variedade de aplicações para expandir o seu negócio.
	</ProductArea>
);

export const Brand4P = () => (
	<ProductArea title="4P" href="/produtos/4P" imageUrl="/assets/4P.svg">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi atque, ab
		soluta non, minus ipsam nobis eius labore veritatis eum quidem laboriosam
		rem repudiandae
	</ProductArea>
);

export const ProductArea = ({
	title,
	href,
	imageUrl,
	children,
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
					<p className="text-justify text-sm text-black">{children}</p>
				</div>
			</a>
		</NavMenu.NavigationMenuLink>
	);
};
