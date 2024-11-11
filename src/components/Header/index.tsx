import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu } from './NavMenu';
import { NavigationMenuMobile } from './NavMenuMobile';

const Header = () => {
	return (
		<header className="sticky left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/90">
			<NavigationMenuMobile />

			<div className="flex flex-1 justify-center p-4">
				<Link href={'/'}>
					<Image
						width={1024}
						height={1024}
						src="/assets/ISS (Branca).svg"
						alt="Lôgo ISS"
						className="aspect-auto w-16 md:w-28 md:min-w-16"
					/>
				</Link>
			</div>

			<NavigationMenu />

			<div className="flex justify-center p-6 md:flex-1"></div>
		</header>
	);
};

export { Header };
