/** @type {import('next').NextConfig} */
const nextConfig = {
	// Proxy API routes to the backend service when the frontend receives relative requests
	async rewrites() {
		return [
			{
				source: '/patterns',
				destination: 'http://backend:3000/patterns',
			},
			{
				source: '/patterns/:id',
				destination: 'http://backend:3000/patterns/:id',
			},
			{
				source: '/update/:id',
				destination: 'http://backend:3000/update/:id',
			},
		];
	},
};

export default nextConfig;
