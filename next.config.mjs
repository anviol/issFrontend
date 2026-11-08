/** @type {import('next').NextConfig} */

const [protocol, rest] = process.env.NEXT_PUBLIC_API_URL.split('://');
const [hostname, port] = rest.split(':');

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol,
				hostname,
				port,
			},
		],
		// Desde o Next 16 o otimizador recusa endereços de rede interna. O Strapi fica em um
		// deles no desenvolvimento (localhost) e no e2e (iss.test). O risco que a trava evita
		// não existe aqui: remotePatterns só deixa buscar imagem do próprio Strapi.
		dangerouslyAllowLocalIP: true,
	},
};

export default nextConfig;
