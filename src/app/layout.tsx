import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import { CookieConsentComponent } from '@/components/CookieConsent';

export const metadata: Metadata = {
	title: 'ISS Comércio',
	description: 'A ISS trabalha com soluções para impressão digital',
};

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700', '900'],
	subsets: ['latin'],
	variable: '--font-poppins',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${poppins.className} antialiased`}>{children}</body>
			<CookieConsentComponent />
		</html>
	);
}
