export type TProductImage = {
	data: {
		id: number;
		attributes: {
			name: string;
			alternativeText: string | null;
			width: number;
			height: number;
			url: string;
			previewUrl: string | null;
		};
	} | null;
};

export type TDownloadable = {
	data: {
		id: number;
		attributes: {
			name: string;
			alternativeText: string | null;
			url: string;
			ext: string;
			mime: string;
			size: number;
		};
	} | null;
};

export type TProductSupply = {
	type: string;
	children: {
		text: string;
		type: string;
	}[];
};

export type TProductAttributes = {
	nome: string;
	serie: string;
	breveDecricao: string;
	suprimentos: TProductSupply[];
	descricaoDetalhadaMD: string;
	principal: TProductImage;
	secundaria1: TProductImage;
	secundaria2: TProductImage;
	secundaria3: TProductImage;
	secundaria4: TProductImage;
	[key: `secundaria${number}`]: TProductImage | undefined;
	catalogo: TDownloadable;
	drive: TDownloadable;
};

export type TProductAPI = {
	data: {
		id: number;
		attributes: TProductAttributes;
	}[];
};
