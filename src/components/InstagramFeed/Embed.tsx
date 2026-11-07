'use client';
import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed';

import { PreferencesButton } from '../CookieConsent/PreferencesButton';
import { useCookieCategory } from '../CookieConsent/useCookieCategory';
import { Instagram } from '../SocialIcons';
import { ensureHttps } from '@/lib/utils';

export const Embed = (props: InstagramEmbedProps) => {
	const accepted = useCookieCategory('instagram');

	if (accepted) return <InstagramEmbed {...props} />;

	return (
		<div className="flex flex-col items-center gap-4 bg-white p-8 text-center">
			<Instagram className="h-8 w-8" />
			<p className="text-sm">
				Para ver esta publicação aqui, autorize o conteúdo do Instagram nas
				preferências de cookies.
			</p>
			<PreferencesButton className="rounded-md bg-issYellow px-4 py-2 text-sm font-semibold text-black">
				Abrir preferências
			</PreferencesButton>
			<a
				href={ensureHttps(props.url)}
				target="_blank"
				rel="noopener noreferrer"
				className="text-sm underline"
			>
				Ver no Instagram
			</a>
		</div>
	);
};
