'use client';

import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

type CookieCategory = 'analytics' | 'instagram';

/** Sem resposta do visitante, e no servidor, a categoria conta como recusada. */
export function useCookieCategory(category: CookieCategory) {
	const [accepted, setAccepted] = useState(false);

	useEffect(() => {
		const update = () => setAccepted(CookieConsent.acceptedCategory(category));

		update();
		window.addEventListener('cc:onConsent', update);
		window.addEventListener('cc:onChange', update);

		return () => {
			window.removeEventListener('cc:onConsent', update);
			window.removeEventListener('cc:onChange', update);
		};
	}, [category]);

	return accepted;
}
