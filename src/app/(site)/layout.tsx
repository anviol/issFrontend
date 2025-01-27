import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
			<ToastContainer position="top-center" theme="colored" />
		</>
	);
}
