import { mergeProps, Switch, Match, createSignal } from 'solid-js';
import BlurhashCanvas from './Canvas';

//extends JSX.HTMLAttributes<HTMLImageElement | HTMLCanvasElement>
export interface BlurhashImgProps {
	src: string;
	hash: string;
	resX: number;
	resY: number;
	punch?: number;
	/**
	 * CSS height,
	 * @default 128
	 */
	height?: number | string | 'auto';
	/**
	 * CSS width
	 * @default 128
	 */
	width?: number | string | 'auto';
	alt?: string;
}

const Img = (props: BlurhashImgProps) => {
	const p = mergeProps({ width: 128, height: 128 }, props);
	const [loaded, setLoaded] = createSignal(false);
	return (
		<Switch>
			<Match when={!loaded()}>
				<BlurhashCanvas {...p} />
			</Match>
			<Match when={loaded()}>
				<img {...p} alt={p.alt} onLoad={() => setLoaded(true)} />
			</Match>
		</Switch>
	);
};

export default Img;
