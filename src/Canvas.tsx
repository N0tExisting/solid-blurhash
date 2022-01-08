import { decode } from 'blurhash';
import {
	onMount,
	createComputed,
	splitProps,
	createSignal,
	type ComponentProps,
} from 'solid-js';

export interface BlurhashProps extends ComponentProps<'canvas'> {
	hash: string;
	resX: number;
	resY: number;
	punch?: number;
}

const BlurhashCanvas = (props: BlurhashProps) => {
	const [p, other] = splitProps(props, [
		'hash',
		'resX',
		'resY',
		'punch',
		'ref',
	]);
	const [ref, setRef] = createSignal<HTMLCanvasElement | null>(null);
	onMount(() => {
		createComputed(() => {
			const canvas = ref();
			const { hash, resX, resY, punch } = p;
			if (canvas != null) {
				const pixels = decode(hash, resX, resY, punch);
				const ctx = canvas.getContext('2d');
				if (ctx != null) {
					const imageData = ctx.createImageData(resX, resY);
					imageData.data.set(pixels);
					ctx.putImageData(imageData, 0, 0);
				}
			}
		});
	});
	const handleRef = (ref: HTMLCanvasElement) => {
		setRef(ref);
		if (props.ref != null) {
			if (typeof props.ref === 'function') {
				props.ref(ref);
			} else {
				props.ref = ref;
			}
		}
	};
	return <canvas {...other} ref={handleRef} />;
};

export default BlurhashCanvas;
