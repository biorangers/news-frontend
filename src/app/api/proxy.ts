// pages/api/proxy.js

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function handler(req: any, res: any) {
	try {
		const response = await fetch(`http://localhost:5074${req.url}`, {
			next: {
				revalidate: 60,
				tags: ["news"],
			},
		});
		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		console.error('API isteği sırasında hata oluştu:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
