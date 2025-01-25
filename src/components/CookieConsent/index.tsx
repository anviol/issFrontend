'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import getConfig from './cookie-consent-config';

export const CookieConsentComponent = () => {
	useEffect(() => {
		CookieConsent.run(getConfig());
	}, []);

	return <></>;
};
