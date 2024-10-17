import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';
import { extraLinks } from './menu-links';
import { Brand4P, BrandMimaki } from './MenuProductArea';

export function NavigationMenu() {
	return (
		<NavMenu.NavigationMenu className="z-300 hidden text-white md:block lg:text-lg">
			<NavMenu.NavigationMenuList className="flex justify-center gap-2 px-4 min-[1200px]:gap-9 min-[1200px]:px-8">
				<NavMenuLink href="/" legacyBehavior passHref>
					Início
				</NavMenuLink>

				<NavMenuItem className="relative py-0" noUnderline>
					<NavMenu.NavigationMenuTrigger className="-skew-x-12 rounded bg-white px-4 py-2 text-black transition-colors hover:bg-issYellow">
						<div className="skew-x-12">Produtos</div>
					</NavMenu.NavigationMenuTrigger>

					<NavMenu.NavigationMenuContent className="absolute -left-1 mt-7 overflow-hidden rounded-md bg-white">
						<ul className="flex w-[600px] flex-col divide-y p-0">
							<li className="flex-1">
								<BrandMimaki />
							</li>
							<li className="flex-1">
								<Brand4P />
							</li>
						</ul>
					</NavMenu.NavigationMenuContent>
				</NavMenuItem>

				{extraLinks.map((item) => (
					<NavMenuLink key={item.id} href={item.href} legacyBehavior passHref>
						{item.title}
					</NavMenuLink>
				))}
			</NavMenu.NavigationMenuList>
		</NavMenu.NavigationMenu>
	);
}

const NavMenuItem = ({
	className,
	children,
	noUnderline,
	...props
}: NavMenu.NavigationMenuItemProps & { noUnderline?: boolean }) => {
	return (
		<NavMenu.NavigationMenuItem
			className={cn(
				'group relative border-none py-2 hover:border-none focus:outline-none',
				className,
			)}
			{...props}
		>
			{children}
			{!noUnderline && (
				<span className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-issYellow transition-transform duration-200 group-hover:scale-x-100" />
			)}
		</NavMenu.NavigationMenuItem>
	);
};

const NavMenuLink = (props: LinkProps & { children: React.ReactNode }) => {
	return (
		<NavMenuItem>
			<Link {...props}>
				<NavMenu.NavigationMenuLink>
					{props.children}
				</NavMenu.NavigationMenuLink>
			</Link>
		</NavMenuItem>
	);
};
