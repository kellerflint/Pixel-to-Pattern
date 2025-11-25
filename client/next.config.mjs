/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

		return [
			{
				source: "/patterns",
				destination: `${apiBase}/patterns`,
			},
			{
				source: "/patterns/:id",
				destination: `${apiBase}/patterns/:id`,
			},
			{
				source: "/update/:id",
				destination: `${apiBase}/update/:id`,
			},
		];
	},
};

export default nextConfig;