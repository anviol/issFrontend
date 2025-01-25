import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu } from './NavMenu';
import { NavigationMenuMobile } from './NavMenuMobile';
import { api } from '@/company-api/api';
import { NavLinks } from './menu-links';

type ThirdPartyLink = {
	data: {
		id: number;
		attributes: {
			link: string;
		};
	};
};

const Header = async () => {
	const { boletosNavData, chamadosNavData } = await getData();

	return (
		<header className="sticky left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/90">
			<NavigationMenuMobile
				boletosNavData={boletosNavData}
				chamadosNavData={chamadosNavData}
			/>

			<div className="flex flex-1 justify-center p-4">
				<Link href={'/'}>
					<Image
						width={512}
						height={512}
						src="/assets/ISS (Branca).svg"
						alt="Lôgo ISS"
						priority
						className="aspect-auto w-16 md:w-28 md:min-w-16"
					/>
				</Link>
			</div>

			<NavigationMenu
				boletosNavData={boletosNavData}
				chamadosNavData={chamadosNavData}
			/>

			<div className="flex justify-center p-6 md:flex-1"></div>
		</header>
	);
};

async function getData() {
	const { data: boletosLink } = await api<ThirdPartyLink>({
		url: '/segunda-via-boleto',
		fetchOptions: {
			next: {
				revalidate: 3600,
			},
		},
	});

	const { data: chamadosLink } = await api<ThirdPartyLink>({
		url: '/chamado',
		fetchOptions: {
			next: {
				revalidate: 3600,
			},
		},
	});

	const chamadosNavData: NavLinks = {
		id: String(chamadosLink.id + 10),
		href: chamadosLink.attributes.link,
		title: 'Chamados',
		external: true,
	};

	const boletosNavData: NavLinks = {
		id: String(boletosLink.id + 10),
		href: boletosLink.attributes.link,
		title: 'Boletos',
		external: true,
	};

	return { chamadosNavData, boletosNavData };
}

export { Header };
