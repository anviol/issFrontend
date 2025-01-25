import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const getConfig = () => {
	const config: CookieConsentConfig = {
		cookie: {
			name: 'cc_cookie',
			domain: location.hostname,
			path: '/',
			sameSite: 'Lax',
			expiresAfterDays: 365,
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
				},
			},
		},
		language: {
			default: 'ptBR',
			translations: {
				ptBR: {
					consentModal: {
						title: 'Nós utilizamos cookies',
						description:
							'Queremos garantir a melhor navegação e personalizar sua experiência no nosso site. Por isso, coletamos informações pessoais de preferências e interesses por meio de cookies e outras tecnologias semelhantes.',
						acceptAllBtn: 'Aceitar',
						footer: `
                        <a href="/documentos/termo-de-uso">Termos de Uso</a>
                        <a href="/documentos/politica-privacidade">Política de Privacidade</a>
                    `,
					},
					preferencesModal: {
						title: 'Manage cookie preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Accept current selection',
						closeIconLabel: 'Close modal',
						serviceCounterLabel: 'Service|Services',
						sections: [
							{
								title: 'Your Privacy Choices',
								description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
							},
							{
								title: 'Strictly Necessary',
								description:
									'These cookies are essential for the proper functioning of the website and cannot be disabled.',
								//this field will generate a toggle linked to the 'necessary' category
								linkedCategory: 'necessary',
							},
							{
								title: 'Performance and Analytics',
								description:
									'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
								linkedCategory: 'analytics',
								cookieTable: {
									caption: 'Cookie table',
									headers: {
										name: 'Cookie',
										domain: 'Domain',
										desc: 'Description',
									},
									body: [
										{
											name: '_ga',
											domain: location.hostname,
											desc: 'Description 1',
										},
										{
											name: '_gid',
											domain: location.hostname,
											desc: 'Description 2',
										},
									],
								},
							},
							{
								title: 'Targeting and Advertising',
								description:
									'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
								linkedCategory: 'ads',
							},
							{
								title: 'More information',
								description:
									'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
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
