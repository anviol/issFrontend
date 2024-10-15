import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';
import { extraLinks } from './menu-links';

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

					<NavMenu.NavigationMenuContent className="absolute -left-1 mt-2 rounded-md bg-slate-400">
						<ul className="flex gap-3 p-4 md:w-[400px] lg:w-[800px]">
							<li className="row-span-3 flex-1">
								<NavMenu.NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<div className="mb-2 mt-4 text-lg font-medium text-black">
											Mimaki
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Dolores quaerat accusantium adipisci a maxime incidunt
											corrupti ipsam architecto dolore nostrum, totam eius enim
											fuga unde tempora? Dicta repellendus blanditiis magni.
										</p>
									</a>
								</NavMenu.NavigationMenuLink>
							</li>
							<li className="row-span-3 flex-1">
								<NavMenu.NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<div className="mb-2 mt-4 text-lg font-medium text-black">
											4P
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Dolores quaerat accusantium adipisci a maxime incidunt
											corrupti ipsam architecto dolore nostrum, totam eius enim
											fuga unde tempora? Dicta repellendus blanditiis magni.
										</p>
									</a>
								</NavMenu.NavigationMenuLink>
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
