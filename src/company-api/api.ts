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
	// No servidor de produção, API_INTERNAL_URL evita sair pela internet até o próprio VPS.
	const host = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;
	const baseUrl = new URL(`${host}/api${url}`);

	const params = new URLSearchParams(strapiQueryParams.join('&'));
	baseUrl.search = params.toString();

	const resp = await fetch(baseUrl.toString(), {
		headers: {
			Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
			'cache-control': 'no-cache',
		},
		...fetchOptions,
	});

	const data = await resp.json();
	return data as T & ResponseError;
}
