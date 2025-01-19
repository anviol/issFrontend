type ResponseData = object;

type ResponseError = {
	error?: {
		status: number;
		name: string;
		message: string;
		details: Record<string, unknown>;
	};
};

export async function api<T = ResponseData>(options: {
	url: string;
	strapiQueryParams?: string[];
	fetchOptions?: RequestInit;
}): Promise<T & ResponseError> {
	const { url, fetchOptions, strapiQueryParams = [] } = options;
	const baseUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api${url}`);

	const params = new URLSearchParams(strapiQueryParams.join('&'));
	baseUrl.search = params.toString();

	const resp = await fetch(baseUrl.toString(), {
		headers: {
			Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
		},
		...fetchOptions,
	});

	const data = await resp.json();
	return data as T & ResponseError;
}
