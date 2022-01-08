# Solid [Blurhash](https://blurha.sh/)

[![CodeFactor](https://www.codefactor.io/repository/github/n0texisting/solid-blurhash/badge)](https://www.codefactor.io/repository/github/n0texisting/solid-blurhash)
[![Codacy](https://app.codacy.com/project/badge/Grade/2eba27a478864092aa4c5094a2f4bbe0)](https://www.codacy.com/gh/N0tExisting/solid-blurhash/dashboard?utm_source=github.com&utm_medium=referral&utm_content=N0tExisting/solid-blurhash&utm_campaign=Badge_Grade)
[![CI](https://github.com/N0tExisting/solid-blurhash/actions/workflows/CI.yml/badge.svg?event=push)](https://github.com/N0tExisting/solid-blurhash/actions/workflows/CI.yml)

---

Solid blurhash is a library for [blurhashing](https://blurha.sh/) images.

<!--* SEE: https://github.com/woltapp/react-blurhash -->

## Quick start

### 1. Install it

```bash
pnpm i solid-blurhash
```

### 2. Use it

```tsx
import Img from 'solid-blurhash';

<Img src="/assets/example.jpeg" hash="your-hash" resX={4} resY={3} />;
```

### or, if you want to have more control over the img tag

```tsx
import { Blurhash } from 'solid-blurhash';
import { createSignal, Switch, Match } from 'solid-js';

const Img = () => {
	const [loaded, setLoaded] = createSignal(false);
	return (
		<Switch>
			<Match when={!loaded()}>
				<Blurhash hash="your-hash" resX={4} resY={3} />
			</Match>
			<Match when={loaded()}>
				<img
					src="/your/image.png"
					alt="Don't Forget Alt!"
					onLoad={() => setLoaded(true)}
				/>
			</Match>
		</Switch>
	);
};
```
