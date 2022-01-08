# solid-blurhash

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
