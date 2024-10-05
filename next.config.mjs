/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.isscomercio.com.br',
				port: '',
			},
		],
	},
};

export default nextConfig;
