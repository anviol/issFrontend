import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
	title: 'ISS Comércio',
	description: 'A ISS trabalha com soluções para impressão digital',
};

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700', '900'],
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${poppins.className} antialiased`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
