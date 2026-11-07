'use client';

import { ReactNode } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

type Props = {
	className?: string;
	children: ReactNode;
};

export const PreferencesButton = ({ className, children }: Props) => (
	<button
		type="button"
		className={className}
		onClick={() => CookieConsent.showPreferences()}
	>
		{children}
	</button>
);
