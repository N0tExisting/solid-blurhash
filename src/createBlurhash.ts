import { createSignal, createEffect, onCleanup } from 'solid-js';
import { decode } from 'blurhash';

const createBlurhash = (
	blurhash: string,
	width: number,
	height: number,
	punch = 1,
) => {
	let isCancelled = false;
	const [url, setUrl] = createSignal(null as string | null);

	createEffect(() => {
		onCleanup(function cleanupBlurhash() {
			isCancelled = true;
			setUrl((oldUrl) => {
				if (oldUrl) {
					URL.revokeObjectURL(oldUrl);
				}
				return null;
			});
		});

		const pixels = decode(blurhash, width, height, punch);

		// HACK: temporary canvas to create a blob from decoded ImageData, doesn't work with SSR
		const canvas = document?.createElement('canvas'); // as HTMLCanvasElement | undefined;
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext('2d')!;
		const imageData = context.createImageData(width, height);
		imageData.data.set(pixels);
		context.putImageData(imageData, 0, 0);
		canvas.toBlob((blob) => {
			if (!isCancelled) {
				setUrl((oldUrl) => {
					if (oldUrl) {
						URL.revokeObjectURL(oldUrl);
					}
					return blob == null ? null : URL.createObjectURL(blob);
				});
			}
		});
	});

	return url;
};

export default createBlurhash;
