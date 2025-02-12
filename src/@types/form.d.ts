export type TFormOptions = {
	data: {
		id: number;
		attributes: {
			campo: string;
			obrigatorio: boolean;
		};
	}[];
};

export type SendEmailResponse = {
	info: {
		response: string;
	};
};
