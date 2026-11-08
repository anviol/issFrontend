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
	turbopack: {
		resolveAlias: {
			// O react-grid-gallery manda o navegador para um build UMD que embute o jsx-runtime
			// do React 17. Ele lê uma variável interna que o React 19 removeu, e a galeria quebra.
			// O build ESM do mesmo pacote importa o React do projeto.
			'react-grid-gallery': './node_modules/react-grid-gallery/dist/react-grid-gallery.esm.js',
		},
	},
};

export default nextConfig;
