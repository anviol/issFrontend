'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

import { useCookieCategory } from './useCookieCategory';

export const Analytics = ({ gaId }: { gaId?: string }) => {
	const accepted = useCookieCategory('analytics');

	if (!gaId || !accepted) return null;

	return <GoogleAnalytics gaId={gaId} />;
};
