import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, MapPin, Plus } from 'lucide-react';

import { extraLinks } from '../Header/menu-links';
import * as SocialIcons from '../SocialIcons';
import { FooterSections } from './FooterSection';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Footer = async () => {
	const socials = await getSocials();
	const { address, contacts } = await getContacts();

	return (
		<>
			<div className="flex flex-col bg-foreground p-10 text-white">
				<div className="mx-auto flex w-full max-w-page flex-col items-center justify-between gap-16 py-10 md:flex-row">
					<div>
						<Image
							width={1024}
							height={1024}
							src="/assets/ISS MMK(Branca).svg"
							alt="Lôgo ISS"
							className="aspect-square w-52 object-contain"
						/>
						<ul className="flex w-full justify-between gap-2">
							{socials.map((social) => (
								<li key={String(social.id)}>
									<Link href={social.url}>
										{getSocialIcon(social.title, 'h-5 w-5 fill-white')}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex w-full flex-col gap-8 md:max-w-[60%] md:flex-row md:justify-around">
						<FooterSections
							title="Institucional"
							data={extraLinks.filter((e) => !e.isProductsLink)}
						/>
						<FooterSections
							title="Produtos"
							data={extraLinks.find((e) => e.isProductsLink)?.brands ?? []}
						/>
						<FooterSections
							title="Contato"
							data={contacts.map((contact) => ({
								id: contact.id,
								href:
									contact.type === 'telefone'
										? `tel:${contact.value}`
										: `https://api.whatsapp.com/send?phone=${contact.value}`,
								title: contact.title,
								icon:
									contact.type === 'telefone' ? (
										<PhoneIcon className="h-5 w-5" />
									) : (
										<SocialIcons.WhatsApp className="h-5 w-5" />
									),
								targetBlank: true,
							}))}
						/>
					</div>
				</div>

				<Separator className="my-10 mb-5 opacity-50" />

				<div className="mx-auto my-4 flex items-center space-x-2 text-center text-sm text-white">
					<Link
						href="#"
						className="opacity-60 hover:underline hover:opacity-90"
					>
						Termos de Uso
					</Link>
					<Separator className="h-4 opacity-60" orientation="vertical" />
					<Link
						href="#"
						className="opacity-60 hover:underline hover:opacity-90"
					>
						Política de Privacidade
					</Link>
				</div>

				<address className="mx-auto flex gap-2 text-center opacity-70">
					<MapPin className="hidden sm:block" /> {address}
				</address>
			</div>
			<Popover>
				<PopoverTrigger className="fixed bottom-10 right-[2vw] z-10 aspect-square rounded-full border-2 border-issYellow bg-white p-2 shadow-xl">
					<Plus className="w-11 min-w-11" />
				</PopoverTrigger>
				<PopoverContent className="w-min" sideOffset={20}>
					<ul className="flex w-full flex-col justify-between gap-8">
						{socials.map((social) => (
							<li key={String(social.id)}>
								<Link href={social.url} title={social.title}>
									{getSocialIcon(social.title, 'h-7 w-7 fill-issYellow')}
								</Link>
							</li>
						))}
					</ul>
				</PopoverContent>
			</Popover>
		</>
	);
};

const getSocialIcon = (icon: string, className?: string) => {
	if (icon.toLowerCase() === 'instagram')
		return <SocialIcons.Instagram className={className} />;
	if (icon.toLowerCase() === 'linkedin')
		return <SocialIcons.LinkedIn className={className} />;
	if (icon.toLowerCase() === 'youtube')
		return <SocialIcons.Youtube className={className} />;
	if (icon.toLowerCase() === 'x')
		return <SocialIcons.X className={className} />;
	if (icon.toLowerCase() === 'facebook')
		return <SocialIcons.Facebook className={className} />;
};

const getSocials = async () => {
	return [
		{ id: '1', title: 'Instagram', url: '#' },
		{ id: '2', title: 'LinkedIn', url: '#' },
		{ id: '3', title: 'Youtube', url: '#' },
		{ id: '4', title: 'X', url: '#' },
		{ id: '6', title: 'Facebook', url: '#' },
	];
};

const getContacts = async () => {
	const contacts = [
		{
			id: '1',
			title: '(31) 3643-4662',
			value: '553136434662',
			type: 'telefone',
		},
		{
			id: '2',
			title: '(31) 9990-1378',
			value: '553199901378',
			type: 'telefone',
		},
		{
			id: '3',
			title: '(31) 99901-3782',
			value: '5531999013782',
			type: 'whatsapp',
		},
	];

	const address = 'Rua Matutina 244 - Santa Inês - Belo Horizonte/MG';

	return { address, contacts };
};

export { Footer };
