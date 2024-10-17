import * as NavMenu from '@radix-ui/react-navigation-menu';

type ProductAreaProps = {
	title: string;
	href: string;
	imageUrl?: string;
};

export const BrandMimaki = () => (
	<ProductArea title="Mimaki" href="#" imageUrl="/assets/logo_mimaki.svg" />
);

export const Brand4P = () => (
	<ProductArea title="4P" href="#" imageUrl="/assets/4P.png" />
);

export const ProductArea = ({ title, href, imageUrl }: ProductAreaProps) => {
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
					<p className="text-justify text-sm text-black">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error,
						itaque quod dolorum aut vero quo eaque animi, nesciunt officiis
						distinctio architecto.
					</p>
				</div>
			</a>
		</NavMenu.NavigationMenuLink>
	);
};
