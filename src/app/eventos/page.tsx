import { Section } from '../(home)/_components/Section';
import { EventGallery } from './EventGallery';
import { images as IMAGES } from './images';

const images = IMAGES.map((image) => ({
	...image,
	customOverlay: (
		<div className="flex h-full flex-col justify-end">
			<div className="bg-white/80">
				<div>{image.caption}</div>
			</div>
		</div>
	),
}));

export default function Events() {
	return (
		<Section title="Mídias" className="min-h-[800px]">
			<EventGallery images={images} enableImageSelection={false} />
		</Section>
	);
}
