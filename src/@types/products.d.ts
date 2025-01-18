export type TImage = {
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

export type TProductAttributes = {
	nome: string;
	serie: string;
	breveDecricao: string;
	suprimentos: string | null;
	descricaoDetalhadaMD: string;
	principal: TImage;
	secundaria1: TImage;
	secundaria2: TImage;
	secundaria3: TImage;
	secundaria4: TImage;
	[key: `secundaria${number}`]: TImage | undefined;
	catalogo: TDownloadable;
	drive: TDownloadable;
};

export type TProductAPI = {
	data: {
		id: number;
		attributes: TProductAttributes;
	}[];
};
