/** @type {import('next').NextConfig} */

const [protocol, rest] = process.env.NEXT_PUBLIC_API_URL.split('://');
const [hostname, port] = rest.split(':');

const nextConfig = {
	// O next dev só aceita localhost. Para abri-lo por outro endereço, como o IP do computador
	// num celular da rede ou o dev.iss.test do e2e, liste em NEXT_DEV_ORIGINS, separados por
	// vírgula. Não afeta o site em produção.
	allowedDevOrigins: process.env.NEXT_DEV_ORIGINS?.split(',').filter(Boolean),
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
