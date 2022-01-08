// @see https://github.com/woltapp/react-blurhash/issues/3
import {
	type ComponentProps,
	type JSX,
	splitProps,
	mergeProps,
	createMemo,
	createSignal,
} from 'solid-js';
import createBlurhash from './createBlurhash';

export interface BlurImgProps extends Omit<ComponentProps<'img'>, 'onload'> {
	hash: string;
	resX: number;
	resY: number;
	punch?: number;
}

const BlurImg = (allProps: BlurImgProps) => {
	const [blur, p, rest] = splitProps(
		mergeProps({ loading: 'lazy' }, allProps),
		['hash', 'resX', 'resY', 'punch'],
		['style', 'onLoad'],
	);
	const [loaded, setLoaded] = createSignal(false);
	const blurhash = createBlurhash(blur.hash, blur.resX, blur.resY, blur.punch);
	const style = createMemo((): JSX.CSSProperties | string | undefined => {
		const hash = blurhash();

		if (loaded() || hash == null) {
			return p.style;
		} else {
			const baseStyles: JSX.CSSProperties = {
				'background-image': `url(${hash})`,
				// HACK: Make this more like https://gist.github.com/ngbrown/d62eb518753378eb0a9bf02bb4723235
				'background-size': `cover`,
			};

			if (typeof p.style === 'string') {
				return `${p.style};background-image:url(${hash});background-size:cover;`;
			} else if (typeof p.style == null) {
				return baseStyles;
			} else {
				return {
					...p.style,
					...baseStyles,
				};
			}
		}
	});
	return (
		// eslint-disable-next-line jsx-a11y/alt-text -- its the consumer's job to provide alt text
		<img
			{...rest}
			style={style()}
			onLoad={(e) => {
				setLoaded(true);
				if (p.onLoad) {
					if (typeof p.onLoad === 'function') {
						p.onLoad(e);
					} else {
						p.onLoad[0](p.onLoad[1], e);
					}
				}
			}}
		/>
	);
};

export default BlurImg;
