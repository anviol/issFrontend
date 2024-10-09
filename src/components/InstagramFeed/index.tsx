import { Embed } from './Embed';

type InstagramMedia = {
	id: string;
	permalink: string;
};

const InstagramFeed = async () => {
	const { data } = await getData();

	return (
		<div>
			Instagram
			{data.map((item) => (
				<Embed
					key={String(item.id)}
					url={data[0].permalink}
					width={350}
					captioned
				/>
			))}
		</div>
	);
};

const getData = async (): Promise<{ data: InstagramMedia[] }> => {
	try {
		const fields = 'id,permalink';

		const resp = await fetch(
			`https://graph.facebook.com/v21.0/${process.env.IG_ACCOUNT_ID}/media?access_token=${process.env.IG_TOKEN}&fields=${fields}&limit=3`,
			{
				method: 'GET',
				cache: 'no-store',
			},
		);

		if (resp.status >= 300) throw new Error(resp.statusText);

		return resp.json();
	} catch (error) {
		console.log(error);
		return { data: [] };
	}
};

export { InstagramFeed };
