# X COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## X COMPONENTS AND FEATURES
Primary Package: @mantine/x

### Carousel
Package: @mantine/carousel
Import: import { Carousel } from '@mantine/carousel';
Description: Embla based carousel component

## Installation

```bash
yarn add embla-carousel@^8.5.2 embla-carousel-react@^8.5.2 @mantine/carousel
```

```bash
npm install embla-carousel@^8.5.2 embla-carousel-react@^8.5.2 @mantine/carousel
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
```

## Do not forget to import styles

Followed installation instructions above but something is not working
(Carousel slides are rendered vertically, no controls or indicators)?
You've fallen into the trap of not importing carousel styles!
To fix the issue, import carousel styles at the root of your application:

```tsx
import '@mantine/carousel/styles.css';
```

## Documentation demos

Demos on this page use a blue background color for demonstration purposes. To simplify
the demos, background color and other demo-only styles are not included in the code.
If you copy-paste demo code into your project, it will not have a blue background color.

## Usage

`@mantine/carousel` package is based on [embla carousel](https://www.embla-carousel.com/):

#### Example: usage

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Options

#### Example: configurator

```tsx
import { Carousel } from '@mantine/carousel';


function Demo() {
  return (
    <Carousel
      slideSize="70%"
      height={200}
      
    >
      {/* ...slides */}
    </Carousel>
  );
}
```


## Embla options

You can pass configuration options directly to embla carousel with `emblaOptions` prop.
You can find embla options description in [embla options reference](https://www.embla-carousel.com/api/options/).

Example of passing `loop`, `dragFree` and `align` options:

#### Example: emblaOptions

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      slideSize="70%"
      height={200}
      emblaOptions={{
        loop: ,
        dragFree: ,
        align: ''
      }}
    >
      {/* ...slides */}
    </Carousel>
  );
}
```


## Size and gap

Set `slideSize` and `slideGap` on `Carousel` component to control size and gap of every slide:

#### Example: multiple

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Responsive styles

`slideSize` and `slideGap` props work the same way as [style props](https://mantine.dev/styles/style-props/),
you can pass an object with values for different breakpoints:

#### Example: breakpoints

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md' }}
      emblaOptions={{ loop: true, align: 'start' }}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, slides size and gap
will be adjusted based on the container width, not the viewport width.

Note that, when using container queries, `slideSize` and `slideGap` props cannot
reference `theme.breakpoints` values in keys. It is required to use exact px or em values.

To see how the slides size and gap changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

#### Example: container

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // It is not required in real projects
    <div
      style={{
        resize: 'horizontal',
        overflow: 'hidden',
        maxWidth: '100%',
        minWidth: 250,
        padding: 10,
      }}
    >
      <Carousel
        withIndicators
        height={200}
        type="container"
        slideSize={{ base: '100%', '300px': '50%', '500px': '33.333333%' }}
        slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
        emblaOptions={{ loop: true, align: 'start' }}
      >
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
    </div>
  );
}
```


## Drag free

`dragFree` will disable slides snap points – user will be able to stop dragging at any position:

#### Example: dragFree

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      emblaOptions={{ dragFree: true, align: 'start' }}
      slideGap="md"
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Vertical orientation

Carousel with `orientation="vertical"` requires `height` prop to be set:

#### Example: vertical

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel orientation="vertical" height={200} withIndicators>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Controls icons

You can replace default next/previous controls icons with any React nodes:

#### Example: icons

```tsx
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

function Demo() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## 100% height

Set `height="100%"` to make Carousel take 100% height of the container. Note that in this case:

* container element must have `display: flex` styles
* carousel root element must have `flex: 1` styles
* container element must have fixed height

```tsx
import { Carousel } from '@mantine/carousel';

export function PercentageHeight() {
  return (
    <div style={{ height: 400, display: 'flex' }}>
      <Carousel withIndicators height="100%" flex={1}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    </div>
  );
}
```

## Get embla instance

You can get [embla instance](https://www.embla-carousel.com/api/methods/) with `getEmblaApi` prop.
You will be able enhance carousel with additional logic after that using embla api methods:

#### Example: progress

```tsx
import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { Carousel } from '@mantine/carousel';
import { Progress } from '@mantine/core';

function Demo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) {
      return;
    }
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <>
      <Carousel
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="md"
        height={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        <Slides count={12} />
      </Carousel>
      <Progress value={scrollProgress} maw={320} size="sm" mt="xl" mx="auto" />
    </>
  );
}
```


## Embla plugins

Set `plugins` prop to enhance carousel with [embla plugins](https://www.embla-carousel.com/plugins/).
Note that plugins are not installed with `@mantine/carousel` package and you will need to
install them on your side.

Example with [autoplay plugin](https://www.embla-carousel.com/plugins/autoplay/):

```bash
yarn add embla-carousel-autoplay@^8.5.2
```

```bash
npm install embla-carousel-autoplay@^8.5.2
```

#### Example: autoplay

```tsx
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';

function Demo() {
  const autoplay = useRef(Autoplay({ delay: 1000 }));

  return (
    <Carousel
      withIndicators
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
    >
      <Slides count={5} />
    </Carousel>
  );
}
```


#### Example: stylesApi

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
    </Carousel>
  );
}
```


## Indicator styles

#### Example: indicatorStyles

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel withIndicators height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.indicator {
  width: 12px;
  height: 4px;
  transition: width 250ms ease;

  &[data-active] {
    width: 40px;
  }
}
```


## Hide inactive controls

#### Example: controlsStyles

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.control {
  &[data-inactive] {
    opacity: 0;
    cursor: default;
  }
}
```


## Show controls on hover

#### Example: controlsHover

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.controls {
  transition: opacity 150ms ease;
  opacity: 0;
}

.root {
  &:hover {
    .controls {
      opacity: 1;
    }
  }
}
```


## Example: Images carousel

#### Example: images

```tsx
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

function Demo() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel withIndicators height={200}>
      {slides}
    </Carousel>
  );
}
```


## Example: Cards carousel

#### Example: cards

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import classes from './Demo.module.css';

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

function Demo() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 2 }}
    >
      {slides}
    </Carousel>
  );
}

// Demo.module.css
.card {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
}

.title {
  font-weight: 900;
  color: var(--mantine-color-white);
  line-height: 1.2;
  font-size: 32px;
  margin-top: var(--mantine-spacing-xs);
  cursor: default;
}

.category {
  color: var(--mantine-color-white);
  opacity: 0.7;
  font-weight: 700;
  text-transform: uppercase;
  cursor: default;
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | <code>Carousel.Slide</code> components |
| controlSize | React.CSSProperties["width"] | - | Controls size of the next and previous controls |
| controlsOffset | MantineSpacing | - | Controls position of the next and previous controls, key of <code>theme.spacing</code> or any valid CSS value |
| emblaOptions | Partial<OptionsType> | - | Options passed down to embla carousel |
| getEmblaApi | (embla: EmblaCarouselType) => void | - | Get embla API as ref |
| height | Height<string | number> | - | Slides container <code>height</code>, required for vertical orientation |
| includeGapInSize | boolean | - | Determines whether gap between slides should be treated as part of the slide size |
| initialSlide | number | - | Index of initial slide |
| nextControlIcon | React.ReactNode | - | Icon of the next control |
| nextControlProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to next control |
| onNextSlide | () => void | - | Called when next slide is shown |
| onPreviousSlide | () => void | - | Called when previous slider is shown |
| onSlideChange | (index: number) => void | - | Called with slide index when slide changes |
| orientation | "horizontal" | "vertical" | - | Carousel orientation |
| plugins | CreatePluginType<LoosePluginType, {}>[] | - | A list of embla plugins |
| previousControlIcon | React.ReactNode | - | Icon of the previous control |
| previousControlProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to previous control |
| slideGap | StyleProp<MantineSpacing> | - | Key of theme.spacing or number to set gap between slides |
| slideSize | StyleProp<string | number> | - | Controls slide width based on viewport width |
| type | "media" | "container" | - | Determines type of queries used for responsive styles |
| withControls | boolean | - | Determines whether next/previous controls should be displayed |
| withIndicators | boolean | - | Determines whether indicators should be displayed |
| withKeyboardEvents | boolean | - | Determines whether arrow key should switch slides |


#### Styles API

Carousel component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Carousel selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Carousel-root | Root element |
| slide | .mantine-Carousel-slide | `Carousel.Slide` root element |
| container | .mantine-Carousel-container | Slides container |
| viewport | .mantine-Carousel-viewport | Main element, contains slides container and all controls |
| controls | .mantine-Carousel-controls | Next/previous controls container |
| control | .mantine-Carousel-control | Next/previous control |
| indicators | .mantine-Carousel-indicators | Indicators container |
| indicator | .mantine-Carousel-indicator | Indicator button |

**Carousel CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --carousel-control-size | Controls `width` and `height` of the next/previous buttons |
| root | --carousel-controls-offset | Controls offsets of the next/previous buttons |
| root | --carousel-height | Controls height of the carousel |

**Carousel data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-orientation | - | Value of  |
| root | data-include-gap-in-size | - | - |
| control | data-inactive | No previous/next slides are available | - |
| indicator | data-active | Associated slide is active | - |


--------------------------------------------------------------------------------

### CodeHighlight
Package: @mantine/code-highlight
Import: import { CodeHighlight } from '@mantine/code-highlight';
Description: Highlight code with shiki or highlight.js

## Installation

```bash
yarn add @mantine/code-highlight
```

```bash
npm install @mantine/code-highlight
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import code-highlight styles after core package styles
import '@mantine/code-highlight/styles.css';
```

## Example

`CodeHighlight` component is used to display code snippets with syntax highlighting.
It provides a flexible adapter system that allows using any code highlighting library
of your choice.

Example of code highlighting with [shiki](https://shiki.matsu.io/):


```tsx
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
```

#### Example: usage

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" radius="md" />;
}
```


## Adapters

`@mantine/code-highlight` package does not depend on any specific code highlighting library.
You can choose one of the default adapters provided by the package or create your own.

Default adapters:

* `createShikiAdapter` – creates [shiki](https://shiki.matsu.io/) adapter
* `createHighlightJsAdapter` – creates [highlight.js](https://highlightjs.org/) adapter
* `plainTextAdapter` – does not highlight code, just displays it as plain text (used by default if no adapter provided)

## Usage with shiki

[Shiki](https://shiki.matsu.io/) library provides the most advanced syntax highlighting
for TypeScript and CSS/Sass code. It uses textmate grammars to highlight code (same as in VSCode).
Shiki adapter is recommended if you need to highlight advanced TypeScript (generics, jsx nested in props) or CSS code (custom syntaxes, newest features).
Shiki adapter is used for all code highlighting in Mantine documentation.

To use shiki adapter you need to install `shiki` package:

```bash
yarn add shiki
```

```bash
npm install shiki
```

Then wrap your app with `CodeHighlightAdapterProvider` and provide `createShikiAdapter` as `adapter` prop:

```tsx
import { MantineProvider } from '@mantine/core';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';

// Shiki requires async code to load the highlighter
async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    // You can load supported themes here
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

function App() {
  return (
    <MantineProvider>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        {/* Your app here */}
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
```

After that, you can use `CodeHighlight` component in your application:


```tsx
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
```

#### Example: usage

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" radius="md" />;
}
```


All further code highlighting examples on this page are using shiki adapter.

## Usage with highlight.js

[Highlight.js](https://highlightjs.org/) provides less accurate highlighting compared to shiki,
but it has smaller bundle size and better performance. Choose highlight.js adapter if you need
to highlight basic JavaScript, HTML, and CSS code.

To use highlight.js adapter you need to install `highlight.js` package:

```bash
yarn add highlight.js
```

```bash
npm install highlight.js
```

Then wrap your app with `CodeHighlightAdapterProvider` and provide `createHighlightJsAdapter` as `adapter` prop:

```tsx
import { MantineProvider } from '@mantine/core';
import { CodeHighlightAdapterProvider, createHighlightJsAdapter } from '@mantine/code-highlight';
import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', tsLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

function App() {
  return (
    <MantineProvider>
      <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
        {/* Your app here */}
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
```

Then you need to add styles of one of the highlight.js themes to your application.
You can do that by importing css file from `highlight.js` package or adding it via
CDN link to the head of your application:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
/>
```

After that, you can use `CodeHighlight` component in your application.

## Create custom adapter

You can create a custom adapter if you want to enhance the default behavior of the code highlighting
or use a different library.

Example of creating a custom shiki adapter with custom themes and logic:

```tsx
import { type CodeHighlightAdapter, stripShikiCodeBlocks } from '@mantine/code-highlight';

// Shiki transformers can be used to highlight diffs and other notations
// https://shiki.style/packages/transformers
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

// Shiki themes as objects, you can use any VSCode themes
import { darkTheme, lightTheme } from './shiki-themes';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

// Pass this adapter to CodeHighlightAdapterProvider component
export const customShikiAdapter: CodeHighlightAdapter = {
  // loadContext is called on client side to load shiki highlighter
  // It is required to be used if your library requires async initialization
  // The value returned from loadContext is passed to getHighlighter as ctx argument
  loadContext: loadShiki,

  // ctx is the value returned from loadContext
  // or null if loadContext is not used or has not resolved yet
  getHighlighter: (ctx) => {
    if (!ctx) {
      return ({ code }) => ({ highlightedCode: code, isHighlighted: false });
    }

    return ({ code, language, colorScheme }) => ({
      isHighlighted: true,
      // stripShikiCodeBlocks removes <pre> and <code> tags from highlighted code
      highlightedCode: stripShikiCodeBlocks(
        ctx.codeToHtml(code, {
          lang: language,
          theme: (colorScheme === 'light' ? lightTheme : darkTheme) as any,
          transformers: [transformerNotationDiff(), transformerNotationHighlight()],
        })
      ),
    });
  },
};
```

## Copy button

You can customize copy button labels with `copyLabel` and `copiedLabel` props.
In case you need to remove the copy button, set `withCopyButton={false}`.


```tsx
function Button() {
  return <button>Click me</button>;
}
```

#### Example: copy

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
function Button() {
  return <button>Click me</button>;
}
`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={`// Custom copy label
function Button() {
  return <button>Click me</button>;
}
`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        radius="md"
      />
      <CodeHighlight
        code={`// Without copy button
function Button() {
  return <button>Click me</button>;
}
`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}
```


## With tabs

`CodeHighlightTabs` component allows organizing multiple code blocks into tabs:

#### Example: tabs

```tsx
// Demo.tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { tsxCode, cssCode } from './code';

function Demo() {
  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        { fileName: 'Demo.tsx', code: tsxCode, language: 'tsx' },
        { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
      ]}
    />
  );
}

// code.ts
export const tsxCode = `
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
`;

export const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
`;
```


## Tabs with icons

You can use any React node as tab icon. The example below uses TypeScript and CSS
icons from the `@mantinex/dev-icons` package, but you can use any other icons library or custom
icons:

#### Example: tabsIcons

```tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { TypeScriptIcon, CssIcon } from '@mantinex/dev-icons';

const tsxCode = `
function Button() {
  return <button>Click me</button>;
}
`;

const cssCode = `
.button {
  background-color: transparent;
  color: var(--mantine-color-blue-9);
}
`;

function Demo() {
  const tsIcon = <TypeScriptIcon size={14} />;
  const cssIcon = <CssIcon size={14} />;

  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        {
          fileName: 'Button.tsx',
          code: tsxCode,
          language: 'tsx',
          icon: tsIcon,
        },
        {
          fileName: 'Button.module.css',
          code: cssCode,
          language: 'scss',
          icon: cssIcon,
        },
      ]}
    />
  );
}
```


## Tabs icons based on file name

As an alternative to providing icons manually for each tab, you can use `getFileIcon` prop
to assign icons based on file name. `getFileIcon` accepts file name and must React node
or `null`.

#### Example: tabsGetIcons

```tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { TypeScriptIcon, CssIcon } from '@mantinex/dev-icons';

const tsxCode = `
function Button() {
  return <button>Click me</button>;
}
`;

const cssCode = `
.button {
  background-color: transparent;
  color: var(--mantine-color-blue-9);
}
`;

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
    return <TypeScriptIcon size={14} />;
  }

  if (fileName.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  return null;
}

function Demo() {
  return (
    <CodeHighlightTabs
      getFileIcon={getFileIcon}
      radius="md"
      code={[
        {
          fileName: 'Button.tsx',
          code: tsxCode,
          language: 'tsx',
        },
        {
          fileName: 'Button.module.css',
          code: cssCode,
          language: 'scss',
        },
      ]}
    />
  );
}
```


## Expandable code

If the code snippet is too long, you can make it expandable with `withExpandButton`
and `defaultExpanded={false}` props. To change label of the expand/collapse control
tooltip, use `expandCodeLabel` and `collapseCodeLabel`.

#### Example: expand

```tsx
// Demo.tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { tsxCode, cssCode } from './code';

function Demo() {
  return (
    <CodeHighlightTabs
      withExpandButton
      defaultExpanded={false}
      expandLabel="Show full code"
      collapseLabel="Show less"
      code={[
        { fileName: 'Demo.tsx', code: tsxCode, language: 'tsx' },
        { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
      ]}
    />
  );
}

// code.ts
export const tsxCode = `
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
`;

export const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
`;
```


## Custom controls

Use `controls` prop with `CodeHighlightControl` component to add custom controls
to the code block:


```tsx
function greet() {
  return 'Hello, World!';
}
```

#### Example: customControl

```tsx
import { IconBrandCodesandbox, IconMessage2 } from '@tabler/icons-react';
import { CodeHighlight, CodeHighlightControl } from '@mantine/code-highlight';

const exampleCode = `
function greet() {
  return 'Hello, World!';
}
`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="Open on codesandbox"
          key="sandbox"
        >
          <IconBrandCodesandbox />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="Discuss with GPT" key="gpt">
          <IconMessage2 />
        </CodeHighlightControl>,
      ]}
    />
  );
}
```


## Inline code

`InlineCodeHighlight` component allows highlighting inline code snippets:

#### Example: inline

```tsx
import { Text } from '@mantine/core';
import { InlineCodeHighlight } from '@mantine/code-highlight';

function Demo() {
  return (
    <Text>
      You can highlight code inline:{' '}
      <InlineCodeHighlight
        code='<InlineCodeHighlight code="" language="tsx" />'
        language="tsx"
        withBorder
      />
      . Is that not cool?
    </Text>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | MantineColor | - | Controls background color of the code. By default, the value depends on color scheme. |
| code | string | required | Code to highlight |
| codeColorScheme | (string & {}) | "dark" | "light" | - | Set to use dark or light color scheme. When using shiki adapter, you can use loaded themes here |
| collapseCodeLabel | string | - | Label for collapse button |
| controls | ReactNode[] | - | Extra controls to display in the controls list |
| copiedLabel | string | - | Label for copy button in copied state |
| copyLabel | string | - | Label for copy button in default state |
| defaultExpanded | boolean | - | Uncontrolled expanded default state |
| expandCodeLabel | string | - | Label for expand button |
| expanded | boolean | - | Controlled expanded state |
| language | string | - | Language of the code, used for syntax highlighting |
| maxCollapsedHeight | string | number | - | Max height of collapsed state |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| withBorder | boolean | - | Adds border to the root element |
| withCopyButton | boolean | - | Determines whether the copy button should be displayed |
| withExpandButton | boolean | - | Determines whether the expand/collapse button should be displayed |


#### Styles API

CodeHighlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**CodeHighlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-CodeHighlight-codeHighlight | Root element |
| showCodeButton | .mantine-CodeHighlight-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-CodeHighlight-pre | Pre element, contains code element |
| code | .mantine-CodeHighlight-code | Code element |
| control | .mantine-CodeHighlight-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-CodeHighlight-controlTooltip | Root element of control tooltip |
| controls | .mantine-CodeHighlight-controls | A wrapper around controls |
| scrollarea | .mantine-CodeHighlight-scrollarea | Scroll area, contains code |

**CodeHighlight CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| codeHighlight | --ch-background | Background color |
| codeHighlight | --ch-max-height | Max height of code block in collapsed state |
| codeHighlight | --ch-radius | Border radius |

**CodeHighlight.Tabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-CodeHighlightTabs-codeHighlight | Root element of inner CodeHighlight component |
| showCodeButton | .mantine-CodeHighlightTabs-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-CodeHighlightTabs-pre | Pre element, contains code element |
| code | .mantine-CodeHighlightTabs-code | Code element |
| control | .mantine-CodeHighlightTabs-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-CodeHighlightTabs-controlTooltip | Root element of control tooltip |
| controls | .mantine-CodeHighlightTabs-controls | A wrapper around controls |
| scrollarea | .mantine-CodeHighlightTabs-scrollarea | Scroll area, contains code |
| root | .mantine-CodeHighlightTabs-root | Root element |
| filesScrollarea | .mantine-CodeHighlightTabs-filesScrollarea | Scrollarea with files list |
| files | .mantine-CodeHighlightTabs-files | Files names list |
| file | .mantine-CodeHighlightTabs-file | File name |
| fileIcon | .mantine-CodeHighlightTabs-fileIcon | File icon |


--------------------------------------------------------------------------------

### Dropzone
Package: @mantine/dropzone
Import: import { Dropzone } from '@mantine/dropzone';
Description: Capture files from user with drag and drop

## Installation

```bash
yarn add @mantine/dropzone
```

```bash
npm install @mantine/dropzone
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import dropzone styles after core package styles
import '@mantine/dropzone/styles.css';
```

## Usage

`Dropzone` lets you capture one or more files from user.
Component is based on [react-dropzone](https://react-dropzone.js.org/) and support all of its core features:

* Accepts/rejects files based on provided mime types
* Limits individual file size
* Renders given children and provides context based component to display elements based on current status

#### Example: usage

```tsx
import { Group, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function BaseDemo(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
```


## Dropzone.Accept, Dropzone.Reject and Dropzone.Idle

`Dropzone.Accept`, `Dropzone.Reject` and `Dropzone.Idle` components are visible only when the user performs certain action:

* `Dropzone.Accept` is visible only when the user drags file that can be accepted over the dropzone
* `Dropzone.Reject` is visible only when the user drags file that cannot be accepted over the dropzone
* `Dropzone.Idle` is visible when the user does not drag anything over dropzone

## Loading state

Set `loading` prop to indicate loading state with [LoadingOverlay](https://mantine.dev/core/loading-overlay/) component.
When `loading` props is true user cannot drop or select new files (`Dropzone` becomes disabled):

#### Example: loading

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone loading onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```


## Disabled state

If you want to implement your own loading state you can disable `Dropzone` without `LoadingOverlay`.
Same as with `loading`, when `Dropzone` is disabled user cannot drop or select new files:

#### Example: disabled

```tsx
// Demo.tsx
import { Dropzone } from '@mantine/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone disabled className={classes.disabled} onDrop={() => {}}>
      {/* children... */}
    </Dropzone>
  );
}

// Demo.module.css
.disabled {
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  border-color: light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
  cursor: not-allowed;

  & * {
    color: light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3));
  }
}
```


## Open file browser manually

To open files browser from outside of component use `openRef` prop to get function that will trigger file browser:

#### Example: manual

```tsx
import { useRef } from 'react';
import { Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <Dropzone openRef={openRef} onDrop={() => {}}>
        {/* children */}
      </Dropzone>

      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>
    </>
  );
}
```


## Enable child pointer event

By default, Dropzone disables pointer events on its children for dragging events to work. When `activateOnClick={false}`,
clicking on any children inside Dropzone will not do anything.
However, you can set style `pointerEvents: 'all'` to make children clickable.
Note that you need to set these styles only on interactive elements, such as buttons or links.

#### Example: enableChildPointerEvent

```tsx
import { useRef } from 'react';
import { Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false}>
      <Group justify="center">
        <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
          Select files
        </Button>
      </Group>
    </Dropzone>
  );
}
```


## Mime types

To specify file types provide an object with the keys set to the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
and the values as an array of file extensions. Find more examples of accepting specific file types
in the [react-dropzone documentation](https://react-dropzone.js.org/#section-accepting-specific-file-types).

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={{
        'image/*': [], // All images
        'text/html': ['.html', '.htm'],
      }}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

You can also specify file types by providing an array of mime types to `accept` prop:

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif',
      ]}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

To save some research time you can use `MIME_TYPES` variable exported from `@mantine/dropzone`:

```tsx
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.svg,
        MIME_TYPES.gif,
      ]}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

`MIME_TYPES` includes following data:

Additionally you can use grouped mime types:

```tsx
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone accept={IMAGE_MIME_TYPE} onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```

## Styles API

`Dropzone` root element has the following data attributes to change styles based on current status:

* `data-loading` – when `loading` prop is `true`
* `data-accept` – when user drags files that can be accepted over the dropzone
* `data-reject` – when user drags files that cannot be accepted over the dropzone
* `data-idle` – default state – user does not drag any files over dropzone

#### Example: stylesApi

```tsx
// Demo.tsx
import { Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">Drop images here</Text>
    </Dropzone>
  );
}

// Demo.module.css
.root {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));

  &[data-accept] {
    color: var(--mantine-color-white);
    background-color: var(--mantine-color-blue-6);
  }

  &[data-reject] {
    color: var(--mantine-color-white);
    background-color: var(--mantine-color-red-6);
  }
}
```


## Images previews

#### Example: preview

```tsx
import { useState } from 'react';
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
}
```


## Get ref

```tsx
import { useEffect, useRef } from 'react';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dropzoneRef.current?.focus();
  }, []);

  return (
    <Dropzone ref={dropzoneRef} onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```

## Dropzone.FullScreen component

`Dropzone.FullScreen` lets you capture files dropped to browser window instead of specific area.
It supports the same props as `Dropzone` component.

To preview component click button and drop images to browser window:

#### Example: fullScreen

```tsx
import { useState } from 'react';
import { Group, Text, Button } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function Demo() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Group justify="center">
        <Button color={active ? 'red' : 'blue'} onClick={() => setActive((d) => !d)}>
          {active ? 'Deactivate' : 'Activate'} full screen dropzone
        </Button>
      </Group>

      <Dropzone.FullScreen
        active={active}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          console.log(files);
          setActive(false);
        }}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone.FullScreen>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string[] | Accept | - | Mime types of the files that dropzone can accepts. By default, dropzone accepts all file types. |
| acceptColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set colors of <code>Dropzone.Accept</code> |
| activateOnClick | boolean | - | If <code>false</code>, disables click to open the native file selection dialog |
| activateOnDrag | boolean | - | If <code>false</code>, disables drag 'n' drop |
| activateOnKeyboard | boolean | - | If <code>false</code>, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. |
| autoFocus | boolean | - | Set to autofocus the root element |
| disabled | boolean | - | Determines whether files capturing should be disabled |
| dragEventsBubbling | boolean | - | If <code>false</code>, stops drag event propagation to parents |
| enablePointerEvents | boolean | - | Determines whether pointer events should be enabled on the inner element |
| getFilesFromEvent | (event: DropEvent) => Promise<(File | DataTransferItem)[]> | - | Use this to provide a custom file aggregator |
| inputProps | InputHTMLAttributes<HTMLInputElement> | - | Props passed down to the internal Input component |
| loaderProps | LoaderProps | - | Props passed down to the Loader component |
| loading | boolean | - | Determines whether a loading overlay should be displayed over the dropzone |
| maxFiles | number | - | Maximum number of files that can be picked at once |
| maxSize | number | - | Maximum file size in bytes |
| multiple | boolean | - | Determines whether multiple files can be dropped to the dropzone or selected from file system picker |
| name | string | - | Name of the form control. Submitted with the form as part of a name/value pair. |
| onDragEnter | (event: DragEvent<HTMLElement>) => void | - | Called when the <code>dragenter</code> event occurs |
| onDragLeave | (event: DragEvent<HTMLElement>) => void | - | Called when the <code>dragleave</code> event occurs |
| onDragOver | (event: DragEvent<HTMLElement>) => void | - | Called when the <code>dragover</code> event occurs |
| onDrop | (files: FileWithPath[]) => void | required | Called when valid files are dropped to the dropzone |
| onDropAny | (files: FileWithPath[], fileRejections: FileRejection[]) => void | - | Called when any files are dropped to the dropzone |
| onFileDialogCancel | () => void | - | Called when user closes the file selection dialog with no selection |
| onFileDialogOpen | () => void | - | Called when user opens the file selection dialog |
| onReject | (fileRejections: FileRejection[]) => void | - | Called when dropped files do not meet file restrictions |
| openRef | ForwardedRef<() => void> | undefined | - | A ref function which when called opens the file system file picker |
| preventDropOnDocument | boolean | - | If <code>false</code>, allow dropped items to take over the current browser window |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| rejectColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set colors of <code>Dropzone.Reject</code> |
| useFsAccessApi | boolean | - | Set to true to use the File System Access API to open the file picker instead of using an <code>input type="file"</code> click event |
| validator | <T extends File>(file: T) => FileError | FileError[] | null | - | Custom validation function. It must return null if there's no errors. |


#### Styles API

Dropzone component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Dropzone selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dropzone-root | Dropzone root element |
| inner | .mantine-Dropzone-inner | Dropzone inner element (wraps children) |

**Dropzone CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --dropzone-accept-bg | Controls `background-color` when file is accepted |
| root | --dropzone-reject-bg | Controls `background-color` when file is rejected |
| root | --dropzone-accept-color | Controls `color` when file is accepted |
| root | --dropzone-reject-color | Controls `color` when file is rejected |
| root | --dropzone-radius | Controls `border-radius` |

**Dropzone data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-accept | Files that are dragged over the dropzone are accepted | - |
| root | data-reject | Files that are dragged over the dropzone are rejected | - |
| root | data-idle | Dropzone is idle | - |
| root | data-loading | - | - |
| root | data-disabled | - | - |
| root | data-activate-on-click | - | - |

**Dropzonefullscreen selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dropzonefullscreen-root | Dropzone root element |
| inner | .mantine-Dropzonefullscreen-inner | Dropzone inner element (wraps children) |
| fullScreen | .mantine-Dropzonefullscreen-fullScreen | Dropzone.Fullscreen root element |


--------------------------------------------------------------------------------

### ExtensionsPackage
Package: @mantine/x
Import: import { ExtensionsPackage } from '@mantine/x';

# Mantine extensions

Extensions are packages that provide additional functionality like
new components, hooks, or other features. They are built on top of
`@mantine/hooks` and `@mantine/core` packages.

## Official extensions

Official extensions are built by the maintainers of Mantine, these extensions have `@mantine/` scope
in their package names, for example `@mantine/dates` or `@mantine/carousel`.

Official extensions list:

* [@mantine/dates](https://mantine.dev/dates/getting-started) – date and time pickers, calendars, other date-related components
* [@mantine/charts](https://mantine.dev/charts/getting-started) – charts and data visualization components based on recharts
* [@mantine/notifications](https://mantine.dev/x/notifications) – notifications system
* [@mantine/code-highlight](https://mantine.dev/x/code-highlight) – code highlight component used on Mantine websites
* [@mantine/spotlight](https://mantine.dev/x/spotlight) – control center (`Ctrl + K` search bar), can be used for search
* [@mantine/carousel](https://mantine.dev/x/carousel) – carousel component based on embla-carousel
* [@mantine/dropzone](https://mantine.dev/x/dropzone) – captures files with drag and drop, based on react-dropzone
* [@mantine/modals](https://mantine.dev/x/modals) – modals manager
* [@mantine/tiptap](https://mantine.dev/x/tiptap) – rich text editor based on tiptap
* [@mantine/nprogress](https://mantine.dev/x/nprogress) – navigation progress component

## Community extensions

Community extensions are built by the community, they are maintained
by the community members and are updated independently from the core
Mantine packages and extensions.

Community extensions list:

* [BlockNote](https://www.blocknotejs.org/) – block-based rich text editor
* [ContextMenu](https://icflorescu.github.io/mantine-contextmenu/) – context menu component
* [DataTable](https://icflorescu.github.io/mantine-datatable/) – data table component without dependencies
* [MantineReactTable](https://v2.mantine-react-table.com/) – data table component based on TanStack table package
* [BorderAnimate](https://gfazioli.github.io/mantine-border-animate/) – border animation styles (beam, glow, more...)
* [Clock](https://gfazioli.github.io/mantine-clock/) - analog clock component
* [Compare](https://gfazioli.github.io/mantine-compare/) - image comparison slider component
* [Flip](https://gfazioli.github.io/mantine-flip/) – flip animation component
* [SplitPane](https://gfazioli.github.io/mantine-split-pane/) – resizable split pane component
* [Marquee](https://gfazioli.github.io/mantine-marquee/) – marquee component
* [Onboarding](https://gfazioli.github.io/mantine-onboarding-tour/) – onboarding / tour component
* [Parallax](https://gfazioli.github.io/mantine-parallax/) – parallax component
* [Picker](https://gfazioli.github.io/mantine-picker/) – animated picker for color, date, emoji, and other pickers
* [TextAnimate](https://gfazioli.github.io/mantine-text-animate/) – text animation component
* [Window](https://gfazioli.github.io/mantine-window/) - window component with drag and resize functionalities
* [Mantine Form Builder](https://pradip-v2.github.io/mantine-form-builder/) – form builder and viewer components
* [Mantine Choropleth Map](https://maetes.github.io/mantine-choropleth/) - Choropleth Map component for GeoJson

## Create your own extension

You are welcome to create your own extension and share it with the community
in the list above. To submit a new extension to be featured on this page:

* Create and publish extension on npm. You can choose any name for your package, for example `mantine-oklch-color-picker` or `@rtivital/mantine-emoji-picker`.
* If you are not sure how to get started with extension development, use [extension template](https://github.com/mantinedev/extension-template), it provides full development environment with tests, documentation, and examples.
* Submit a pull request to the [main Mantine repository](https://github.com/mantinedev/mantine) with a link to your extension and a short description to be featured on this page.


--------------------------------------------------------------------------------

### Modals manager
Package: @mantine/modals
Import: import { Modals manager } from '@mantine/modals';
Description: Centralized modals manager with option to handle state of multi-step modals

## Installation

```bash
yarn add @mantine/modals
```

```bash
npm install @mantine/modals
```

## Setup ModalsProvider

Wrap your app with `ModalsProvider` component:

```tsx
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

function Demo() {
  return (
    <MantineProvider>
      <ModalsProvider>{/* Your app here */}</ModalsProvider>
    </MantineProvider>
  );
}
```

## Confirm modal

@mantine/modals package includes special modal that can be used for confirmations.
Component includes confirm and cancel buttons and supports children to display additional
information about action. Use `openConfirmModal` function to open a confirm modal:

#### Example: confirm

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
```


`openConfirmModal` function accepts one argument with following properties:

* `modalId` – modal id, defaults to random id, can be used to close modal programmatically
* `children` – additional modal content displayed before actions
* `onCancel` – called when cancel button is clicked
* `onConfirm` – called when confirm button is clicked
* `closeOnConfirm` – should modal be closed when confirm button is clicked, defaults to `true`
* `closeOnCancel` – should modal be closed when cancel button is clicked, defaults to `true`
* `cancelProps` – cancel button props
* `confirmProps` – confirm button props
* `groupProps` – buttons [Group](https://mantine.dev/core/group/) props
* `labels` – cancel and confirm buttons labels, can be defined on ModalsProvider

Using this properties you can customize confirm modal to match current context requirements:

#### Example: confirmCustomize

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return <Button onClick={openDeleteModal} color="red">Delete account</Button>;
}
```


To setup shared labels for confirm modals set `labels` on `ModalsProvider`:

```tsx
import { ModalsProvider } from '@mantine/modals';

function Demo() {
  return (
    <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

## Context modals

You can define any amount of modals in ModalsProvider context:

```tsx
import { Button, Text } from '@mantine/core';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

And then open one of these modals with `modals.openContextModal` function.
`modals.openContextModal` function accepts 2 arguments: modal key (should match one defined on ModalsProvider) and modal props:

#### Example: context

```tsx
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openContextModal({
          modal: 'demonstration',
          title: 'Test modal from context',
          innerProps: {
            modalBody:
              'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
          },
        })
      }
    >
      Open demonstration context modal
    </Button>
  );
}
```


## Typesafe context modals

By default `innerProps` and `modal` are not typesafe. You can add typesafety with a Typescript module declaration.

```tsx
const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);
const modals = {
  demonstration: TestModal,
  /* ...other modals */
};
declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
function Demo() {
  return (
    <ModalsProvider modals={modals}>
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

Typesafe context modals will force you to use the correct types for `openContextModal`:

```tsx
import { closeModal, openContextModal } from '@mantine/modals';

openContextModal({
  modal: 'demonstration',
  title: 'Test modal from context',
  innerProps: {
    modalBody:
      'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
  },
});
closeModal('demonstration');
```

## Content modals

With `modals.open` function you can open a modal with any content:

#### Example: content

```tsx
import { TextInput, Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        modals.open({
          title: 'Subscribe to newsletter',
          children: (
            <>
              <TextInput label="Your email" placeholder="Your email" data-autofocus />
              <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                Submit
              </Button>
            </>
          ),
        });
      }}
    >
      Open content modal
    </Button>
  );
}
```


## Multiple opened modals

You can open multiple layers of modals. Every opened modal is added as first element in modals queue.
To close all opened modals call `modals.closeAll()` function:

#### Example: multipleSteps

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openConfirmModal({
          title: 'Please confirm your action',
          closeOnConfirm: false,
          labels: { confirm: 'Next modal', cancel: 'Close modal' },
          children: (
            <Text size="sm">
              This action is so important that you are required to confirm it with a modal. Please
              click one of these buttons to proceed.
            </Text>
          ),
          onConfirm: () =>
            modals.openConfirmModal({
              title: 'This is modal at second layer',
              labels: { confirm: 'Close modal', cancel: 'Back' },
              closeOnConfirm: false,
              children: (
                <Text size="sm">
                  When this modal is closed modals state will revert to first modal
                </Text>
              ),
              onConfirm: modals.closeAll,
            }),
        })
      }
    >
      Open multiple steps modal
    </Button>
  );
}
```


## Modal props

You can pass props down to the [Modal](https://mantine.dev/core/modal) component by adding them to the
argument of every `modals.x` function. Example of setting `radius`, `size` and `withCloseButton`
props:

#### Example: modalProps

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    size: 'sm',
    radius: 'md',
    withCloseButton: false,
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
```


## Dynamic Content and the modals manager

The Modals manager allows you to dynamically update the content and properties of both standard and context modals after they are opened.

To update regular modals, use the `modals.updateModal` function:

#### Example: updateModal

```tsx
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text>This text will update in 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: (
              <Text size="sm" c="dimmed">
                This is the updated content of the modal.
              </Text>
            ),
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}
```


Context modals can also be updated dynamically using `modals.updateContextModal`:

#### Example: updateContextModal

```tsx
import { Button, Text, Stack, Center, Loader } from '@mantine/core';
import { modals, ContextModalProps, ModalsProvider } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string, loading: boolean }>) => (
  <>
    <Stack>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Center>
        {innerProps.loading ? (
          <Loader size={32}/>
        ): (
          <IconCheck size={23} color="var(--mantine-color-teal-6)" />
        )}
      </Center>
    </Stack>
    <Button fullWidth mt="md" disabled={innerProps.loading} onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      <Button
        onClick={() => {
          const modalId = modals.openContextModal({
            modal: 'asyncDemonstration',
            title: 'Processing...',
            closeOnEscape: false,
            closeOnClickOutside: false,
            closeButtonProps:{ disabled:true },
            innerProps: {
              modalBody:
                'You cannot close this modal until 2 seconds have passed.',
              loading: true,
            },
          });

          setTimeout(() => {
            modals.updateContextModal({
              modalId,
              title: "Processing Complete!",
              closeOnEscape: true,
              closeOnClickOutside: true,
              closeButtonProps:{ disabled: false },
              innerProps: {
                modalBody:
                  'You can now close the modal.',
                loading: false,
              },
            })
          }, 2000);
        }}
      >
        Open updating context modal
      </Button>
    </ModalsProvider>
  );
}
```



--------------------------------------------------------------------------------

### Notifications system
Package: @mantine/notifications
Import: import { Notifications system } from '@mantine/notifications';
Description: Mantine notifications system

## Installation

```bash
yarn add @mantine/notifications
```

```bash
npm install @mantine/notifications
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
```

Add `Notifications` component anywhere in your application. Note that:

* It is required to render `Notifications` component inside [MantineProvider](https://mantine.dev/theming/mantine-provider/)
* You do not need to wrap your application with `Notifications` component – it is not a provider, it is a regular component
* You should not render multiple `Notifications` components – if you do that, your notifications will be duplicated

```tsx
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function Demo() {
  return (
    <MantineProvider>
      <Notifications />
      {/* Your app here */}
    </MantineProvider>
  );
}
```

All set! You can now use all notifications system features.

#### Example: base

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}
```


## Do not forget to import styles

Followed installation instructions above but something is not working
(`position` prop not working, notifications are stuck at the bottom)?
You've fallen into the trap of not importing notifications styles!
To fix the issue, import notifications styles at the root of your application:

```tsx
import '@mantine/notifications/styles.css';
```

## Functions

`@mantine/notifications` package exports `notifications` object with the following functions:

* `notifications.show` – adds given notification to the notifications list or queue, depending on the current state and `limit`
* `notifications.hide` – removes notification with given `id` from the notifications state and queue
* `notifications.update` – updates notification that was previously added to the state or queue
* `notifications.updateState` – executes given callback with current notifications state and queue as an argument and updates state with returned value
* `notifications.clean` – removes all notifications from the notifications state and queue
* `notifications.cleanQueue` – removes all notifications from the queue

All functions can be imported from `@mantine/notifications` package and can be used in any part of your application:

```tsx
import { notifications } from '@mantine/notifications';
```

You can also import these functions separately:

```tsx
// alias functions
import {
  cleanNotifications, // notifications.clean
  cleanNotificationsQueue, // notifications.cleanQueue
  hideNotification, // notifications.hide
  showNotification, // notifications.show
  updateNotification, // notifications.update
  updateNotificationsState, // notifications.updateState
} from '@mantine/notifications';
```

## Notification props

`notifications.show` and `notification.update` functions can be called with an object that has the following properties:

* `id` – notification id, it is used to update and remove notifications, by default `id` is randomly generated
* `position` – notification position, by default the value from the `position` prop of the `Notifications` component is used
* `withBorder` – determines whether notification should have a border
* `withCloseButton` – determines whether the close button should be visible
* `onClose` – calls when notification is unmounted
* `onOpen` – calls when notification is mounted
* `autoClose` – defines timeout in ms on which notification will be automatically closed, use `false` to disable auto close
* `message` – required notification body
* `color, icon, title, radius, className, style, loading` – props passed down to the [Notification](https://mantine.dev/core/notification/) component

All properties except `message` are optional.

```tsx
import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

// Bare minimum – message is required for all notifications
notifications.show({ message: 'Hello' });

// Most used notification props
notifications.show({
  id: 'hello-there',
  position: 'bottom-center',
  withCloseButton: true,
  onClose: () => console.log('unmounted'),
  onOpen: () => console.log('mounted'),
  autoClose: 5000,
  title: "You've been compromised",
  message: 'Leave the building immediately',
  color: 'red',
  icon: <IconX />,
  className: 'my-notification-class',
  style: { backgroundColor: 'red' },
  loading: false,
});
```

Notifications preview (`message` prop used as `children`):

#### Example: configurator

```tsx
import { Notification } from '@mantine/core';

function Demo() {
  return (
    <Notification>
      {{children}}
    </Notification>
  );
}
```


## Customize notification styles

You can use `style`, `className` or [Styles API](https://mantine.dev/styles/styles-api/) `classNames`, `styles` props to customize notification styles.
Usually, it is better to override [Notification](https://mantine.dev/core/notification) styles with `classNames` prop in the [theme object](https://mantine.dev/theming/theme-object/).

#### Example: customize

```tsx
// Demo.tsx
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: 'Notification with custom styles',
            message: 'It is default blue',
            classNames: classes,
          })
        }
      >
        Default notification
      </Button>

      <Button
        color="red"
        onClick={() =>
          notifications.show({
            color: 'red',
            title: 'Notification with custom styles',
            message: 'It is red',
            classNames: classes,
          })
        }
      >
        Error notification
      </Button>
    </Group>
  );
}

// Demo.module.css
.root {
  background-color: var(--notification-color, var(--mantine-primary-color-filled));

  &::before {
    background-color: var(--mantine-color-white);
  }
}

.description,
.title {
  color: var(--mantine-color-white);
}

.closeButton {
  color: var(--mantine-color-white);

  @mixin hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
```


## Notifications container position

You can define notification position in `notifications.show` function. Possible `position` values:

* `top-left`
* `top-right`
* `top-center`
* `bottom-left`
* `bottom-right`
* `bottom-center`

#### Example: position

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
] as const;

function Demo() {
  const buttons = positions.map((position) => (
    <Button
      key={position}
      onClick={() =>
        notifications.show({
          title: `Notification at ${position}`,
          message: `Notification at ${position} message`,
          position,
        })
      }
    >
      {position}
    </Button>
  ));

  return <Group>{buttons}</Group>;
}
```


The `position` can be defined on the `Notifications` component.
In the following example, notifications will be displayed in the top right corner of the screen
if `position` is not defined in `notifications.show` function:

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications position="top-right" zIndex={1000} />;
}
```

## Limit and queue

You can limit maximum number of notifications that are displayed at a time by setting
`limit` prop on `Notifications`:

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications limit={5} />;
}
```

All notifications added after the `limit` was reached are added to the queue
and displayed when notification from current state is hidden.

#### Example: limit

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() => {
        Array(10).fill(0).forEach((_, index) => {
          setTimeout(() => {
            notifications.show({
              title: `Notification ${index + 1}`,
              message: 'Most notifications are added to queue',
            });
          }, 200 * index);
        });
      }}
    >
      Show 10 notifications
    </Button>
  );
}
```


## Remove notifications from state and queue

To remove specific notification from state or queue use `notifications.hide` function:

```tsx
import { notifications } from '@mantine/notifications';

const id = notifications.show({ message: 'Hello!' });
notifications.hide(id);
```

Use `notifications.cleanQueue` function to remove all notifications from the queue and
`notifications.clean` to remove all notifications both from the state and queue:

#### Example: clean

```tsx
import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => {
          Array(10)
            .fill(0)
            .forEach((_, index) => {
              notifications.show({
                title: `Notification ${index + 1}`,
                message: 'Most notifications are added to queue',
                autoClose: false,
              });
            });
        }}
      >
        Show 10 notifications
      </Button>

      <Button variant="default" onClick={() => notifications.cleanQueue()}>
        Clean queue
      </Button>

      <Button variant="outline" color="red" onClick={() => notifications.clean()}>
        Clean all
      </Button>
    </Group>
  );
}
```


## Update notification

#### Example: update

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

function Demo() {
  return (
    <Button
      onClick={() => {
        const id = notifications.show({
          loading: true,
          title: 'Loading your data',
          message: 'Data will be loaded in 3 seconds, you cannot close this yet',
          autoClose: false,
          withCloseButton: false,
        });

        setTimeout(() => {
          notifications.update({
            id,
            color: 'teal',
            title: 'Data was loaded',
            message: 'Notification will close in 2 seconds, you can close this notification now',
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
          });
        }, 3000);
      }}
    >
      Show update notification
    </Button>
  );
}
```


## Auto close

You can configure auto close timeout with `Notifications`:

```tsx
import { Notifications } from '@mantine/notifications';

// All notifications will be closed automatically in 4000ms
function Demo() {
  return <Notifications autoClose={4000} />;
}
```

Or per notification in `notifications.show`/`notifications.update` functions:

```tsx
import { notifications } from '@mantine/notifications';

notifications.show({
  message: 'I will close in 500ms seconds',
  autoClose: 500,
});

notifications.update({
  id: 'hello',
  message: 'I will never close',
  autoClose: false,
});
```

`notifications.show` and `notifications.update` functions `autoClose` prop has higher priority.

#### Example: autoclose

```tsx
import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => notifications.show({ message: 'I will close in 4 seconds' })}
      >
        Notifications Provider timeout
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            message: 'I will close in 500ms',
            autoClose: 500,
          })
        }
      >
        Closes in 500ms
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            color: 'blue',
            title: 'I will never close',
            message: 'unless you click X',
            autoClose: false,
          })
        }
      >
        Never closes automatically
      </Button>
    </Group>
  );
}
```


## Subscribe to notifications state

You can subscribe to notifications state changes with `useNotifications` hook.
The hook returns an object with `notifications` and `queue` arrays. `notifications`
array contains all notifications that are currently displayed, `queue` contains
notifications that are waiting to be displayed.

#### Example: store

```tsx
function Demo() {
  const [counter, { increment }] = useCounter();
  const notificationsStore = useNotifications();

  const showNotification = () => {
    notifications.show({
      title: `Notification ${counter}`,
      message: 'Most notifications are added to queue',
    });

    increment();
  };

  return (
    <>
      <Button onClick={showNotification} mb="md">
        Show notification
      </Button>

      <Text>Notifications state</Text>
      <Code block>{JSON.stringify(notificationsStore.notifications, null, 2)}</Code>

      <Text mt="md">Notifications queue</Text>
      <Code block>{JSON.stringify(notificationsStore.queue, null, 2)}</Code>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoClose | number | false | - | Auto close timeout for all notifications in ms, <code>false</code> to disable auto close, can be overwritten for individual notifications in <code>notifications.show</code> function |
| containerWidth | string | number | - | Notification width, cannot exceed 100% |
| limit | number | - | Maximum number of notifications displayed at a time, other new notifications will be added to queue |
| notificationMaxHeight | string | number | - | Notification <code>max-height</code>, used for transitions |
| portalProps | BasePortalProps | - | Props passed down to the <code>Portal</code> component |
| position | NotificationPosition | - | Notifications default position |
| store | NotificationsStore | - | Store for notifications state, can be used to create multiple instances of notifications system in your application |
| transitionDuration | number | - | Notification transition duration in ms |
| withinPortal | boolean | - | Determines whether notifications container should be rendered inside <code>Portal</code> |
| zIndex | string | number | - | Notifications container z-index |


#### Styles API

Notifications component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Notifications selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Notifications-root | Notifications container, contains all notifications |
| notification | .mantine-Notifications-notification | Single notification |

**Notifications CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --notifications-container-width | Controls notifications container `max-width` |
| root | --notifications-z-index | Controls notifications container `z-index` |


--------------------------------------------------------------------------------

### NavigationProgress
Package: @mantine/nprogress
Import: import { NavigationProgress } from '@mantine/nprogress';
Description: Navigation progress bar

## Installation

```bash
yarn add @mantine/nprogress
```

```bash
npm install @mantine/nprogress
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import nprogress styles after core package styles
import '@mantine/nprogress/styles.css';
```

## Setup NavigationProgress

Render `NavigationProgress` anywhere in your app within [MantineProvider](https://mantine.dev/theming/mantine-provider/):

```tsx
import { MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';

function Demo() {
  return (
    <MantineProvider>
      <NavigationProgress />
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Usage




--------------------------------------------------------------------------------

### Spotlight
Package: @mantine/spotlight
Import: import { Spotlight } from '@mantine/spotlight';
Description: Command center for your application

## Installation

```bash
yarn add @mantine/spotlight
```

```bash
npm install @mantine/spotlight
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import spotlight styles after core package styles
import '@mantine/spotlight/styles.css';
```

## Usage

`Spotlight` component can be used as a search or as a command center of your application.
It is used as a search on mantine.dev website, you can trigger it with `Ctrl + K` shortcut.
`Spotlight` is based on [Modal](https://mantine.dev/core/modal) component and supports most of its props.

#### Example: usage

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons-react';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <IconHome size={24} stroke={1.5} />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <IconDashboard size={24} stroke={1.5} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <IconFileText size={24} stroke={1.5} />,
  },
];

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Actions

`@mantine/spotlight` package exports an object with actions that can be used to control the spotlight:

```tsx
import { spotlight } from '@mantine/spotlight';

spotlight.open(); // -> opens spotlight
spotlight.close(); // -> closes spotlight
spotlight.toggle(); // -> toggles spotlight opened state
```

These actions can be passed to event listeners or used anywhere in your application
(not limited to React components):

```tsx
import { Button } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';

function Demo() {
  return <Button onClick={spotlight.open}>Open spotlight</Button>;
}
```

You can also import actions directly from the `@mantine/spotlight` package, if you prefer this syntax:

```tsx
import {
  closeSpotlight,
  openSpotlight,
  toggleSpotlight,
} from '@mantine/spotlight';

openSpotlight(); // same as spotlight.open()
closeSpotlight(); // same as spotlight.close()
toggleSpotlight(); // same as spotlight.toggle()
```

## Spotlight store

`spotlight` object documented above uses the default store, it works fine if you have only one spotlight
in your application. In case you need multiple spotlights, you need to create your own store for each of them:

```tsx
import { Button } from '@mantine/core';
import { createSpotlight, Spotlight } from '@mantine/spotlight';

// You can import `firstSpotlight` and `secondSpotlight` anywhere
// in your application and use `open`, `close` and `toggle` actions
// to control spotlight the same way as with default `spotlight` object
export const [firstStore, firstSpotlight] = createSpotlight();
export const [secondStore, secondSpotlight] = createSpotlight();

function Demo() {
  return (
    <>
      <Button onClick={firstSpotlight.open}>
        Open first spotlight
      </Button>
      <Button onClick={secondSpotlight.open}>
        Open second spotlight
      </Button>

      <Spotlight store={firstStore} actions={[]} />
      <Spotlight store={secondStore} actions={[]} />
    </>
  );
}
```

## Keyboard shortcuts

`Spotlight` uses [use-hotkeys](https://mantine.dev/hooks/use-hotkeys) hook to handle keyboard shortcuts.
By default, `Ctrl + K` and `Cmd + K` shortcuts are used to open spotlight, you can change them
with `shortcut` prop:

```tsx
import { Spotlight } from '@mantine/spotlight';

function SingleShortcut() {
  return <Spotlight shortcut="mod + J" actions={[]} />;
}

// Same as on mantine.dev
function MultipleShortcuts() {
  return (
    <Spotlight shortcut={['mod + K', 'mod + P', '/']} actions={[]} />
  );
}

// Disable shortcut
function NoShortcut() {
  return <Spotlight shortcut={null} actions={[]} />;
}
```

## Limit prop

Use `limit` prop to limit the maximum number of actions that can be displayed at a time.
Usually, 5–7 actions is a good number. `limit` prop is crucial for performance in case
you have a lot of actions, it will prevent the spotlight from rendering all of them at once.

The example below renders 3000 actions, but only 7 of them are displayed at a time:

#### Example: limit

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

const actions: SpotlightActionData[] = Array(3000)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Scrollable actions list

By default, `Spotlight` actions list is not scrollable. If you have a lot of actions that
you need to display at a time, set `scrollable` and `maxHeight` props. Note that there are
caveats with both approaches:

* When the `scrollable` prop is not set, actions list height is not limited and the spotlight
  body will grow to fit all actions. This can result in a very long spotlight body that will
  overflow the viewport. To prevent this, use `limit` prop to define the maximum number of actions
  that can be displayed at a time. Usually, 5–7 actions is a good number.
* When the `scrollable` prop is set, actions list height will always equal to the value of `maxHeight` prop
  (it will not shrink if there are not enough actions to fill the space). When there are more
  actions than can fit into the list, it will become scrollable. Scrolling logic is handled
  by [ScrollArea](https://mantine.dev/core/scroll-area) component.

In other words, if you want the actions list to shrink, do not set `scrollable` prop and use `limit`
prop. If you want the actions list to always have a fixed height, set `scrollable` and `maxHeight` props.

#### Example: scrollable

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

const actions: SpotlightActionData[] = Array(100)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        scrollable
        maxHeight={350}
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Actions groups

`Spotlight` supports actions groups, you can use them to group actions by category:

#### Example: groups

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: 'Pages',
    actions: [
      { id: 'home', label: 'Home page', description: 'Where we present the product' },
      { id: 'careers', label: 'Careers page', description: 'Where we list open positions' },
      { id: 'about-us', label: 'About us page', description: 'Where we tell what we do' },
    ],
  },

  {
    group: 'Apps',
    actions: [
      { id: 'svg-compressor', label: 'SVG compressor', description: 'Compress SVG images' },
      { id: 'base64', label: 'Base 64 converter', description: 'Convert data to base 64 format' },
      { id: 'fake-data', label: 'Fake data generator', description: 'Lorem ipsum generator' },
    ],
  },
];

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Compound components

If you need more control over spotlight rendering and logic, use compound components.
Available components:

* `Spotlight.Root` – root component, should be used as a wrapper for all other components, accepts all props to customize logic
* `Spotlight.Search` – search input
* `Spotlight.ActionsList` – list of actions, required to wrap all actions and actions groups
* `Spotlight.Action` – action button
* `Spotlight.ActionsGroup` - group of actions
* `Spotlight.Empty` – empty state (nothing found)

#### Example: compound

```tsx
import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke={1.5} />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
```


For example, with compound components pattern you can customize actions contents:

#### Example: customAction

```tsx
import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Badge, Button, Center, Group, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
  },
];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
  .map((item) => (
    <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
      <Group wrap="nowrap" w="100%">
        {item.image && (
          <Center>
            <img src={item.image} alt={item.title} width={50} height={50} />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{item.title}</Text>

          {item.description && (
            <Text opacity={0.6} size="xs">
              {item.description}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">new</Badge>}
      </Group>
    </Spotlight.Action>
  ));

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke={1.5} />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
```


## Fixed elements offset

`Spotlight` component uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. To properly size these `elements` add a `className` to them ([documentation](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)):

```tsx
import { RemoveScroll } from '@mantine/core';

function Demo() {
  return (
    <>
      <div className={RemoveScroll.classNames.fullWidth}>
        width: 100%
      </div>
      <div className={RemoveScroll.classNames.zeroRight}>
        right: 0
      </div>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | SpotlightActions[] | required | Actions data, passed down to <code>Spotlight.Action</code> component |
| centered | boolean | - | If set, the modal is centered vertically |
| children | React.ReactNode | - | Modal content |
| clearQueryOnClose | boolean | - | Determines whether the search query should be cleared when the spotlight is closed |
| closeOnActionTrigger | boolean | - | Determines whether spotlight should be closed when one of the actions is triggered |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, <code>onClose</code> is called when user presses the escape key |
| disabled | boolean | - | If set, spotlight will not be rendered |
| filter | SpotlightFilterFunction | - | Function to filter actions data based on search query, by default actions are filtered by title, description and keywords |
| forceOpened | boolean | - | Forces opened state, useful for tests |
| fullScreen | boolean | - | If set, the modal takes the entire screen |
| highlightQuery | boolean | - | Determines whether search query should be highlighted in action label |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. <code>display: none</code> styles are applied instead. |
| limit | number | - | Maximum number of actions displayed at a time |
| lockScroll | boolean | - | If set, scroll is locked when <code>opened={true}</code> |
| maxHeight | MaxHeight<string | number> | - | Spotlight content max-height. Ignored unless <code>scrollable</code> prop is set. |
| nothingFound | React.ReactNode | - | Message displayed when none of the actions match given <code>filter</code> |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onQueryChange | (query: string) => void | - | Called when query changes |
| onSpotlightClose | () => void | - | Called when spotlight closes |
| onSpotlightOpen | () => void | - | Called when spotlight opens |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the <code>Overlay</code> component, use to configure opacity, <code>background-color</code>, styles and other properties |
| padding | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when <code>withinPortal</code> is set |
| query | string | - | Controlled Spotlight search query |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when <code>onClose</code> is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| scrollAreaProps | Partial<ScrollAreaAutosizeProps> | - | Props passed down to the <code>ScrollArea</code> component |
| scrollable | boolean | - | Determines whether the actions list should be scrollable. If not set, <code>maxHeight</code> is ignored |
| searchProps | SpotlightSearchProps | - | Props passed down to the <code>Spotlight.Search</code> |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS box-shadow value |
| shortcut | string | string[] | null | - | Keyboard shortcut or a list of shortcuts to trigger spotlight |
| size | number | MantineSize | (string & {}) | - | Controls width of the content area |
| stackId | string | - | Id of the modal in the <code>Modal.Stack</code> |
| store | SpotlightStore | - | Spotlight store, can be used to create multiple instances of spotlight |
| tagsToIgnore | string[] | - | A list of tags which when focused will be ignored by shortcut |
| title | React.ReactNode | - | Modal title |
| transitionProps | TransitionProps | - | Props added to the <code>Transition</code> component that used to animate overlay and body, use to configure duration and animation type, <code>{ duration: 200, transition: 'fade-down' }</code> by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| triggerOnContentEditable | boolean | - | Determines whether shortcut should trigger based in contentEditable |
| withOverlay | boolean | - | If set, the overlay is rendered |
| withinPortal | boolean | - | If set, the component is rendered inside <code>Portal</code> |
| xOffset | MarginLeft<string | number> | - | Left/right modal offset |
| yOffset | MarginTop<string | number> | - | Top/bottom modal offset |
| zIndex | string | number | - | <code>z-index</code> CSS property of the root element |


#### Styles API

Spotlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Spotlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Spotlight-root | Root element |
| inner | .mantine-Spotlight-inner | Element used to center modal, has fixed position, takes entire screen |
| content | .mantine-Spotlight-content | `Modal.Content` root element |
| header | .mantine-Spotlight-header | Contains title and close button |
| overlay | .mantine-Spotlight-overlay | Overlay displayed under the `Modal.Content` |
| title | .mantine-Spotlight-title | Modal title (h2 tag), displayed in the header |
| body | .mantine-Spotlight-body | Modal body, displayed after header |
| close | .mantine-Spotlight-close | Close button |
| search | .mantine-Spotlight-search | Search input (`Spotlight.Search`) |
| actionsList | .mantine-Spotlight-actionsList | Actions list (`Spotlight.ActionsList`) |
| empty | .mantine-Spotlight-empty | Empty state (`Spotlight.Empty`) |
| footer | .mantine-Spotlight-footer | Footer (`Spotlight.Footer`) |
| action | .mantine-Spotlight-action | Action (`Spotlight.Action`) |
| actionBody | .mantine-Spotlight-actionBody | Body of the action, contains label and description |
| actionLabel | .mantine-Spotlight-actionLabel | `Spotlight.Action` label |
| actionDescription | .mantine-Spotlight-actionDescription | `Spotlight.Action` description |
| actionSection | .mantine-Spotlight-actionSection | `Spotlight.Action` left and right sections |
| actionsGroup | .mantine-Spotlight-actionsGroup | `Spotlight.ActionsGroup` root element |

**Spotlight data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| action | data-selected | Action is selected with up/down keys | - |
| actionSection | data-position | - | Section position: left or right |
| actionSection | data-dimmed | - | - |


--------------------------------------------------------------------------------

### Rich text editor
Package: @mantine/tiptap
Import: import { Rich text editor } from '@mantine/tiptap';
Description: Tiptap based rich text editor

## Installation

Install with yarn:

```bash
yarn add @mantine/tiptap @mantine/core @mantine/hooks @tiptap/react @tiptap/pm @tiptap/extension-link @tiptap/starter-kit
```

```bash
npm install @mantine/tiptap @mantine/core @mantine/hooks @tiptap/react @tiptap/pm @tiptap/extension-link @tiptap/starter-kit
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import tiptap styles after core package styles
import '@mantine/tiptap/styles.css';
```

## TipTap editor

`@mantine/tiptap` provides a UI for [Tiptap](https://tiptap.dev/). `RichTextEditor` component
works with [Editor](https://tiptap.dev/api/editor) instance of tiptap.
This means that you have full control over the editor [state and configuration](https://tiptap.dev/guide/configuration)
with [useEditor hook](https://tiptap.dev/installation/react).

In other words, `RichTextEditor` component does not manage state for you,
controls just execute operations on the `Editor` instance. If you want to
implement something that is related to state or component value (for example, controlled mode, value transforms to HTML/Markdown),
you should look for documentation on [tiptap.dev](https://tiptap.dev/) website.

## Usage



## Subtle variant

`variant="subtle"` removes borders from the controls groups, makes controls
larger and reduces spacing of the toolbar:



## Controlled

To control editor state, create a wrapper component and pass `onChange` handler
to `useEditor` hook:

```tsx
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <MantineRichTextEditor editor={editor}>
      <MantineRichTextEditor.Toolbar>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
}
```

## Controls and extensions

Some controls require installation of additional [Tiptap extensions](https://tiptap.dev/extensions).
For example, if you want to use `RichTextEditor.Superscript` control, you will need to install `@tiptap/extension-superscript` package:

```bash
yarn add @tiptap/extension-superscript
```

```bash
npm install @tiptap/extension-superscript
```

Included with `@tiptap/starter-kit` (should be installed by default):

* `RichTextEditor.H1`
* `RichTextEditor.H2`
* `RichTextEditor.H3`
* `RichTextEditor.H4`
* `RichTextEditor.H5`
* `RichTextEditor.H6`
* `RichTextEditor.BulletList`
* `RichTextEditor.OrderedList`
* `RichTextEditor.Bold`
* `RichTextEditor.Italic`
* `RichTextEditor.Strikethrough`
* `RichTextEditor.ClearFormatting`
* `RichTextEditor.Blockquote`
* `RichTextEditor.Code`
* `RichTextEditor.CodeBlock`
* `RichTextEditor.Hr`
* `RichTextEditor.Undo`
* `RichTextEditor.Redo`
* `RichTextEditor.Underline`
* `RichTextEditor.Unlink`

Controls that require [@tiptap/extension-text-align](https://www.npmjs.com/package/@tiptap/extension-text-align) extension:

* `RichTextEditor.AlignLeft`
* `RichTextEditor.AlignRight`
* `RichTextEditor.AlignCenter`
* `RichTextEditor.AlignJustify`

Controls that require [@tiptap/extension-color](https://www.npmjs.com/package/@tiptap/extension-color) and [@tiptap/extension-text-style](https://www.npmjs.com/package/@tiptap/extension-text-style) extensions:

* `RichTextEditor.ColorPicker`
* `RichTextEditor.Color`
* `RichTextEditor.UnsetColor`

Other controls with required extensions:

* `RichTextEditor.Superscript` requires [@tiptap/extension-superscript](https://www.npmjs.com/package/@tiptap/extension-superscript)
* `RichTextEditor.Subscript` requires [@tiptap/extension-subscript](https://www.npmjs.com/package/@tiptap/extension-subscript)
* `RichTextEditor.Highlight` requires [@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)

## Placeholder

To use placeholder you will need to install [@tiptap/extension-placeholder](https://www.npmjs.com/package/@tiptap/extension-placeholder) package:

```bash
yarn add @tiptap/extension-placeholder
```

```bash
npm install @tiptap/extension-placeholder
```



## Link extension

`@mantine/tiptap` provides custom `Link` extension that is required to be used instead of
`@tiptap/extension-link` in order for `Ctrl + K` keyboard shortcut to work:

```tsx
// Use Link extension exported from the @mantine/tiptap package
import { useEditor } from '@tiptap/react';
import { Link, RichTextEditor } from '@mantine/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      Link,
      // ... other extensions
    ],
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

## Text color

To use text color you will need to install additional packages:

```bash
yarn add @tiptap/extension-color @tiptap/extension-text-style
```

```bash
npm install @tiptap/extension-color @tiptap/extension-text-style
```

You can use the following controls to change text color:

* `RichTextEditor.ColorPicker` – allows to pick colors from given predefined color swatches and with [ColorPicker](https://mantine.dev/core/color-picker/) component
* `RichTextEditor.Color` – allows to apply given color with one click
* `RichTextEditor.UnsetColor` – clears color styles



## Code highlight

To use code highlight you will need to install additional packages:

```bash
yarn add lowlight @tiptap/extension-code-block-lowlight
```

```bash
npm install lowlight @tiptap/extension-code-block-lowlight
```



## Source code mode

You can use the following control to see and edit source code of editor content:

* `RichTextEditor.SourceCode` – allows switching on/off source code mode



## Tasks

To use tasks you will need to install additional packages:

```bash
yarn add @tiptap/extension-task-item @tiptap/extension-task-list
```

```bash
npm install @tiptap/extension-task-item @tiptap/extension-task-list
```



## Typography styles

By default, `RichTextEditor` renders content with [Typography](https://mantine.dev/core/typography/) and some additional styles.
You can disable these styles by setting `withTypographyStyles={false}`:

```tsx
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      // ... your extensions
    ],
  });

  return (
    <RichTextEditor editor={editor} withTypographyStyles={false}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

Then you will be able to add your own styles either with [global styles](https://mantine.dev/styles/global-styles/)
or with [Styles API](https://mantine.dev/styles/styles-api/):



## Bubble menu

You can use [BubbleMenu](https://tiptap.dev/api/extensions/bubble-menu) component
with any `RichTextEditor` controls. Bubble menu will appear near a selection of text:



## Floating menu

You can use [FloatingMenu](https://tiptap.dev/api/extensions/floating-menu) component
with any `RichTextEditor` controls. Floating menu will appear in an empty line:



## Sticky toolbar

Set `sticky` prop on `RichTextEditor.Toolbar` component to make toolbar sticky,
control `top` property with `stickyOffset`. For example, on mantine.dev documentation
website there is a header with `var(--docs-header-height)` height, in this case we will need to
set `stickyOffset="var(--docs-header-height)"` to make sticky position correctly with fixed positioned element.



## Editor context

Use `useRichTextEditorContext` hook to get [Editor](https://tiptap.dev/api/editor) from
the context. This hook can be used to create custom control or run any operations supported
by the Tiptap [editor API](https://tiptap.dev/api/editor).

```tsx
import { Button } from '@mantine/core';
import { useRichTextEditorContext } from '@mantine/tiptap';

function Demo() {
  const { editor } = useRichTextEditorContext();
  return (
    <Button
      onClick={() => editor?.chain().focus().toggleBold().run()}
    >
      Make bold
    </Button>
  );
}
```

## Custom controls

Use `RichTextEditor.Control` component to create custom controls. It supports all
props supported by `button` element and has `active` prop to indicate active state.
Note that you will need to set `aria-label` attribute to make control visible for screen readers.



## Change icons

You can change icon of control by setting `icon` prop. It accepts a component
that must handle `size` prop:



## Labels and localization

`RichTextEditor` supports changing labels for all controls with `labels` prop:

```tsx
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      // ... your extensions
    ],
  });

  return (
    <RichTextEditor
      editor={editor}
      labels={{
        boldControlLabel: 'Make text bold',
        italicControlLabel: 'Make text bold',
        // ...other labels
      }}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

Most labels are used to add `aria-label` and `title` attributes to controls, some of the labels
can be a function that returns string. If you do not provide all labels, then they will be merged with
the default labels.

All available labels:

```tsx
// RichTextEditorLabels type can be imported from @mantine/tiptap package
export interface RichTextEditorLabels {
  /** RichTextEditor.Bold control aria-label */
  boldControlLabel: string;

  /** RichTextEditor.Hr control aria-label */
  hrControlLabel: string;

  /** RichTextEditor.Italic control aria-label */
  italicControlLabel: string;

  /** RichTextEditor.Underline control aria-label */
  underlineControlLabel: string;

  /** RichTextEditor.Strike control aria-label */
  strikeControlLabel: string;

  /** RichTextEditor.ClearFormatting control aria-label */
  clearFormattingControlLabel: string;

  /** RichTextEditor.Link control aria-label */
  linkControlLabel: string;

  /** RichTextEditor.Unlink control aria-label */
  unlinkControlLabel: string;

  /** RichTextEditor.BulletList control aria-label */
  bulletListControlLabel: string;

  /** RichTextEditor.OrderedList control aria-label */
  orderedListControlLabel: string;

  /** RichTextEditor.H1 control aria-label */
  h1ControlLabel: string;

  /** RichTextEditor.H2 control aria-label */
  h2ControlLabel: string;

  /** RichTextEditor.H3 control aria-label */
  h3ControlLabel: string;

  /** RichTextEditor.H4 control aria-label */
  h4ControlLabel: string;

  /** RichTextEditor.H5 control aria-label */
  h5ControlLabel: string;

  /** RichTextEditor.H6 control aria-label */
  h6ControlLabel: string;

  /** RichTextEditor.Blockquote control aria-label */
  blockquoteControlLabel: string;

  /** RichTextEditor.AlignLeft control aria-label */
  alignLeftControlLabel: string;

  /** RichTextEditor.AlignCenter control aria-label */
  alignCenterControlLabel: string;

  /** RichTextEditor.AlignRight control aria-label */
  alignRightControlLabel: string;

  /** RichTextEditor.AlignJustify control aria-label */
  alignJustifyControlLabel: string;

  /** RichTextEditor.Code control aria-label */
  codeControlLabel: string;

  /** RichTextEditor.CodeBlock control aria-label */
  codeBlockControlLabel: string;

  /** RichTextEditor.Subscript control aria-label */
  subscriptControlLabel: string;

  /** RichTextEditor.Superscript control aria-label */
  superscriptControlLabel: string;

  /** RichTextEditor.ColorPicker control aria-label */
  colorPickerControlLabel: string;

  /** RichTextEditor.UnsetColor control aria-label */
  unsetColorControlLabel: string;

  /** RichTextEditor.Highlight control aria-label */
  highlightControlLabel: string;

  /** RichTextEditor.Undo control aria-label */
  undoControlLabel: string;

  /** RichTextEditor.Redo control aria-label */
  redoControlLabel: string;

  /** A function go get RichTextEditor.Color control aria-label based on color that control applies */
  colorControlLabel: (color: string) => string;

  /** aria-label for link editor url input */
  linkEditorInputLabel: string;

  /** placeholder for link editor url input */
  linkEditorInputPlaceholder: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in a new tab */
  linkEditorExternalLink: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in the same tab */
  linkEditorInternalLink: string;

  /** Save button content in link editor */
  linkEditorSave: string;

  /** Cancel button title text in color picker control */
  colorPickerCancel: string;

  /** Clear button title text in color picker control */
  colorPickerClear: string;

  /** Color picker button title text in color picker control */
  colorPickerColorPicker: string;

  /** Palette button title text in color picker control */
  colorPickerPalette: string;

  /** Save button title text in color picker control */
  colorPickerSave: string;

  /** aria-label for color palette colors */
  colorPickerColorLabel: (color: string) => string;
}
```

Default labels (can be imported from `@mantine/tiptap` package):

```tsx
import { RichTextEditorLabels } from '@mantine/tiptap';

export const DEFAULT_LABELS: RichTextEditorLabels = {
  // Controls labels
  linkControlLabel: 'Link',
  colorPickerControlLabel: 'Text color',
  highlightControlLabel: 'Highlight text',
  colorControlLabel: (color) => `Set text color ${color}`,
  boldControlLabel: 'Bold',
  italicControlLabel: 'Italic',
  underlineControlLabel: 'Underline',
  strikeControlLabel: 'Strikethrough',
  clearFormattingControlLabel: 'Clear formatting',
  unlinkControlLabel: 'Remove link',
  bulletListControlLabel: 'Bullet list',
  orderedListControlLabel: 'Ordered list',
  h1ControlLabel: 'Heading 1',
  h2ControlLabel: 'Heading 2',
  h3ControlLabel: 'Heading 3',
  h4ControlLabel: 'Heading 4',
  h5ControlLabel: 'Heading 5',
  h6ControlLabel: 'Heading 6',
  blockquoteControlLabel: 'Blockquote',
  alignLeftControlLabel: 'Align text: left',
  alignCenterControlLabel: 'Align text: center',
  alignRightControlLabel: 'Align text: right',
  alignJustifyControlLabel: 'Align text: justify',
  codeControlLabel: 'Code',
  codeBlockControlLabel: 'Code block',
  subscriptControlLabel: 'Subscript',
  superscriptControlLabel: 'Superscript',
  unsetColorControlLabel: 'Unset color',
  hrControlLabel: 'Horizontal line',
  undoControlLabel: 'Undo',
  redoControlLabel: 'Redo',

  // Task list
  tasksControlLabel: 'Task list',
  tasksSinkLabel: 'Decrease task level',
  tasksLiftLabel: 'Increase task level',

  // Link editor
  linkEditorInputLabel: 'Enter URL',
  linkEditorInputPlaceholder: 'https://example.com/',
  linkEditorExternalLink: 'Open link in a new tab',
  linkEditorInternalLink: 'Open link in the same tab',
  linkEditorSave: 'Save',

  // Color picker control
  colorPickerCancel: 'Cancel',
  colorPickerClear: 'Clear color',
  colorPickerColorPicker: 'Color picker',
  colorPickerPalette: 'Color palette',
  colorPickerSave: 'Save',
  colorPickerColorLabel: (color) => `Set text color ${color}`,
};
```


--------------------------------------------------------------------------------

