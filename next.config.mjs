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
	},
};

export default nextConfig;
