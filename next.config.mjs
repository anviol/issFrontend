/** @type {import('next').NextConfig} */

const [protocol, rest] = process.env.API_URL.split('://');
const [hostname, port] = rest.split(':');

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol,
				hostname,
				port,
			},
			{
				protocol: 'https',
				hostname: 'www.isscomercio.com.br',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'd3j3imors9xf8g.cloudfront.net',
				port: '',
			},
		],
	},
};

export default nextConfig;
