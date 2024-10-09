'use client';
import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { useResizeObserver, useScrollLock } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { extraLinks } from './menu-links';
import { BurgerIconAnim } from './BurgerIconAnim';

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
		<NavMenu.NavigationMenu className="z-300 text-lg text-white md:hidden">
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
						className="absolute left-0 h-dvh w-auto min-w-[100vw] overflow-y-auto bg-white pt-4 text-black shadow-2xl"
					>
						<NavMenu.Sub>
							<NavMenu.NavigationMenuList className="flex flex-col justify-center gap-2 px-4">
								<NavMenuLink href="/" legacyBehavior passHref>
									Início
								</NavMenuLink>

								<NavMenuItem className="relative -left-4">
									<NavMenu.NavigationMenuTrigger className="rounded bg-issYellow px-4 py-2 text-black">
										<div className="text-left">Produtos</div>
									</NavMenu.NavigationMenuTrigger>
									<NavMenu.NavigationMenuContent className="left-0 mt-2 rounded-md bg-slate-400">
										<ul className="flex flex-col gap-3 p-4 md:w-[400px] lg:w-[500px]">
											<li className="row-span-3 flex-1">
												<NavMenu.NavigationMenuLink asChild>
													<a
														className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
														href="/"
													>
														<div className="mb-2 mt-4 text-lg font-medium">
															Mimaki
														</div>
														<p className="text-sm leading-tight text-muted-foreground">
															Lorem ipsum dolor, sit amet consectetur
															adipisicing elit. Dolores quaerat accusantium
															adipisci a maxime incidunt corrupti ipsam
															architecto dolore nostrum, totam eius enim fuga
															unde tempora? Dicta repellendus blanditiis magni.
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
														<div className="mb-2 mt-4 text-lg font-medium">
															4P
														</div>
														<p className="text-sm leading-tight text-muted-foreground">
															Lorem ipsum dolor, sit amet consectetur
															adipisicing elit. Dolores quaerat accusantium
															adipisci a maxime incidunt corrupti ipsam
															architecto dolore nostrum, totam eius enim fuga
															unde tempora? Dicta repellendus blanditiis magni.
														</p>
													</a>
												</NavMenu.NavigationMenuLink>
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
				'border-none px-4 py-2 font-semibold hover:border-none focus:outline-none',
				className,
			)}
			{...props}
		>
			{children}
		</NavMenu.NavigationMenuItem>
	);
};

const NavMenuLink = (props: LinkProps & { children: React.ReactNode }) => {
	return (
		<NavMenuItem>
			<Link {...props} legacyBehavior passHref>
				<NavMenu.NavigationMenuLink>
					{props.children}
				</NavMenu.NavigationMenuLink>
			</Link>
		</NavMenuItem>
	);
};
