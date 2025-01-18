import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PhoneIcon, MapPin, Plus } from 'lucide-react';

import { extraLinks } from '../Header/menu-links';
import * as SocialIcons from '../SocialIcons';
import { FooterSections } from './FooterSection';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { api } from '@/company-api/api';
import { WithPagination } from '@/@types/api';

type TSocialLink = {
	id: number;
	attributes: {
		rede: string;
		link: string;
	};
};

type TContactInfo = {
	data: {
		id: number;
		attributes: {
			celular: string;
			whatsapp: string;
			endereco: string;
			telefone: string;
		};
	};
};

const Footer = async () => {
	const socials = await getSocials();
	const contacts = await getContacts();

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
							{socials.map(({ id, attributes: social }) => (
								<li key={String(id)}>
									<a href={social.link} target="_blank">
										{getSocialIcon(social.rede, 'h-5 w-5 fill-white')}
									</a>
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
							data={[
								{
									id: 'telefone',
									href: `tel:${contacts.telefone}`,
									title: contacts.telefone,
									icon: <PhoneIcon className="h-5 w-5" />,
									external: true,
								},
								{
									id: 'celular',
									href: `tel:${contacts.celular}`,
									title: contacts.celular,
									icon: <PhoneIcon className="h-5 w-5" />,
									external: true,
								},
								{
									id: 'whatsapp',
									href: `https://api.whatsapp.com/send?phone=${contacts.whatsapp}`,
									title: contacts.whatsapp,
									icon: <SocialIcons.WhatsApp className="h-5 w-5" />,
									external: true,
								},
							]}
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
					<MapPin className="hidden sm:block" />
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.endereco)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{contacts.endereco}
					</a>
				</address>
			</div>
			<Popover>
				<PopoverTrigger className="fixed bottom-10 right-[2vw] z-10 aspect-square rounded-full border-2 border-issYellow bg-white p-2 shadow-xl">
					<Plus className="w-11 min-w-11" />
				</PopoverTrigger>
				<PopoverContent className="w-min" sideOffset={20}>
					<ul className="flex w-full flex-col justify-between gap-8">
						{socials.map(({ id, attributes: social }) => (
							<li key={String(id)}>
								<Link href={social.link} title={social.rede} target="_blank">
									{getSocialIcon(social.rede, 'h-7 w-7 fill-slate-500')}
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
	const { data, error } = await api<WithPagination<TSocialLink>>({
		url: '/rede-socials',
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return [];
	}

	return data;
};

const getContacts = async () => {
	const { data, error } = await api<TContactInfo>({
		url: '/rodape',
		fetchOptions: {
			next: { revalidate: 3600 * 24 },
		},
	});

	if (error) {
		if (error.status === 404) notFound();
	}

	return data.attributes;
};

export { Footer };
