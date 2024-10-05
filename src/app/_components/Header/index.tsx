import Image from 'next/image';
import { NavigationMenu } from './NavMenu';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { NavigationMenuMobile } from './NavMenuMobile';

const Header = () => {
	return (
		<header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/70">
			<NavigationMenuMobile />

			<div className="flex flex-1 justify-center p-4">
				<Image
					width={1024}
					height={1024}
					src="/assets/Logo ISS Branca.png"
					alt="Lôgo ISS"
					className="aspect-auto w-16 md:w-28 md:min-w-16"
				/>
			</div>

			<NavigationMenu />

			<div className="flex justify-center p-6 md:flex-1">
				<Link href={'/buscar'}>
					<Search className="h-6 w-6 min-w-6 text-white hover:text-issYellow" />
				</Link>
			</div>
		</header>
	);
};

export { Header };
