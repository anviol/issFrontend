'use client';
import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { useResizeObserver, useScrollLock } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { extraLinks } from './menu-links';
import { BurgerIconAnim } from './BurgerIconAnim';
import { Brand4P, BrandMimaki } from './MenuProductArea';

export function NavigationMenuMobile() {
	const { lock, unlock } = useScrollLock({
		autoLock: false,
	});
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const { height = 0 } = useResizeObserver({
		ref: triggerRef,
		box: 'border-box',
	});

	React.useEffect(() => {
		const handleStateChange: MutationCallback = (mutationsList) => {
			for (const mutation of mutationsList) {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-state'
				) {
					const isOpen =
						triggerRef.current?.getAttribute('data-state') === 'open';
					if (isOpen) lock();
					else unlock();
				}
			}
		};

		const observer = new MutationObserver(handleStateChange);

		if (triggerRef.current) {
			observer.observe(triggerRef.current, { attributes: true });
		}

		return () => {
			observer.disconnect();
		};
	}, [lock, unlock]);

	return (
		<NavMenu.NavigationMenu className="z-300 text-xl md:hidden">
			<NavMenu.NavigationMenuList>
				<NavMenu.NavigationMenuItem>
					<NavMenu.NavigationMenuTrigger
						ref={triggerRef}
						className="group min-h-[72px] p-6"
					>
						<BurgerIconAnim />
					</NavMenu.NavigationMenuTrigger>

					<NavMenu.NavigationMenuContent
						style={{ top: height * 1, paddingBottom: height * 2 }}
						className="absolute left-0 h-dvh w-auto min-w-[100vw] overflow-y-auto bg-gray-200 pt-12 text-black"
					>
						<NavMenu.Sub>
							<NavMenu.NavigationMenuList className="flex flex-col justify-center gap-2 px-4">
								<NavMenuLink href="/" legacyBehavior passHref>
									Início
								</NavMenuLink>

								<NavMenuItem className="relative">
									<NavMenu.NavigationMenuTrigger className="relative -left-10 -skew-x-12 rounded-r-md bg-issYellow px-12 py-3 pr-24 text-black">
										<div className="skew-x-12 text-left">Produtos</div>
									</NavMenu.NavigationMenuTrigger>

									<NavMenu.NavigationMenuContent className="left-0 -ml-8 mt-1 rounded-md border bg-gray-100">
										<ul className="flex flex-col gap-3 divide-y-2 py-2 md:w-[400px] lg:w-[500px]">
											<li className="row-span-3 flex-1">
												<BrandMimaki />
											</li>
											<li className="row-span-3 flex-1">
												<Brand4P />
											</li>
										</ul>
									</NavMenu.NavigationMenuContent>
								</NavMenuItem>

								{extraLinks.map((item) => (
									<NavMenuLink key={item.id} href={item.href}>
										{item.title}
									</NavMenuLink>
								))}
							</NavMenu.NavigationMenuList>
						</NavMenu.Sub>
					</NavMenu.NavigationMenuContent>
				</NavMenu.NavigationMenuItem>
			</NavMenu.NavigationMenuList>
		</NavMenu.NavigationMenu>
	);
}

const NavMenuItem = ({
	className,
	children,
	...props
}: NavMenu.NavigationMenuItemProps) => {
	return (
		<NavMenu.NavigationMenuItem
			className={cn(
				'px-4 py-2 font-medium hover:border-none focus:outline-none md:border-none',
				className,
			)}
			{...props}
		>
			{children}
		</NavMenu.NavigationMenuItem>
	);
};

const NavMenuLink = ({
	className,
	...props
}: LinkProps & { children: React.ReactNode; className?: string }) => {
	return (
		<NavMenuItem className={className}>
			<Link {...props} legacyBehavior passHref>
				<NavMenu.NavigationMenuLink>
					{props.children}
				</NavMenu.NavigationMenuLink>
			</Link>
		</NavMenuItem>
	);
};
