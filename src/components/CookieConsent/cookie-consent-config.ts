import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const getConfig = () => {
	const config: CookieConsentConfig = {
		// Aumente ao criar uma categoria: quem já respondeu precisa ser perguntado de novo.
		revision: 1,
		cookie: {
			name: 'cc_cookie',
			domain: location.hostname,
			path: '/',
			sameSite: 'Lax',
			// Com 0 dias o cookie dura a sessão: quem recusa algo responde de novo na próxima visita.
			expiresAfterDays: (acceptType) => (acceptType === 'all' ? 365 : 0),
		},
		guiOptions: {
			consentModal: {
				layout: 'box inline',
				position: 'bottom left',
				equalWeightButtons: true,
				flipButtons: false,
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: true,
				flipButtons: false,
			},
		},
		categories: {
			necessary: {
				enabled: true, // this category is enabled by default
				readOnly: true, // this category cannot be disabled
			},
			analytics: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/, // regex: match all cookies starting with '_ga'
						},
					],
					// O gtag.js já carregado só para de rodar com uma página nova.
					reloadPage: true,
				},
			},
			instagram: {},
		},
		language: {
			default: 'ptBR',
			translations: {
				ptBR: {
					consentModal: {
						title: 'Nós utilizamos cookies',
						description:
							'Os cookies necessários mantêm o site funcionando. Com a sua autorização, também medimos a audiência com o Google Analytics e exibimos publicações do Instagram. O que você recusar fica desligado até o fim desta sessão.',
						acceptAllBtn: 'Aceitar tudo',
						acceptNecessaryBtn: 'Recusar',
						showPreferencesBtn: 'Escolher',
						footer: `
                        <a href="/documentos/termo-de-uso">Termos de Uso</a>
                        <a href="/documentos/politica-privacidade">Política de Privacidade</a>
                    `,
					},
					preferencesModal: {
						title: 'Preferências de cookies',
						acceptAllBtn: 'Aceitar tudo',
						acceptNecessaryBtn: 'Recusar tudo',
						savePreferencesBtn: 'Salvar escolhas',
						closeIconLabel: 'Fechar',
						sections: [
							{
								title: 'Sua escolha',
								description:
									'O que ficar desligado não é carregado, e a recusa vale até o fim desta sessão. Você pode mudar de ideia quando quiser em "Preferências de cookies", no rodapé do site.',
							},
							{
								title: 'Necessários',
								description:
									'Guardam a sua resposta a este aviso e não podem ser desligados.',
								//this field will generate a toggle linked to the 'necessary' category
								linkedCategory: 'necessary',
							},
							{
								title: 'Medição de audiência',
								description:
									'O Google Analytics nos mostra quantas pessoas visitam o site e quais páginas acessam.',
								linkedCategory: 'analytics',
							},
							{
								title: 'Publicações do Instagram',
								description:
									'A página inicial exibe publicações carregadas dos servidores da Meta, que pode definir cookies próprios.',
								linkedCategory: 'instagram',
							},
							{
								title: 'Mais informações',
								description:
									'Veja a <a href="/documentos/politica-privacidade">Política de Privacidade</a>.',
							},
						],
					},
				},
			},
		},
	};

	return config;
};

export default getConfig;
