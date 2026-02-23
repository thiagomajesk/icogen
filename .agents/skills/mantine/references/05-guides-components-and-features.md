# GUIDES COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## GUIDES COMPONENTS AND FEATURES

### SixToSeven

# 6.x → 7.x migration guide

This guide is intended to help you migrate your project styles from 6.x to 7.x.
It is not intended to be a comprehensive guide to all the changes in 7.x.
For that, please see the [7.0.0 changelog](https://mantine.dev/changelog/7-0-0).

## Migration to @mantine/emotion

`@mantine/emotion` package is available starting from version 7.9. If you do not want
to use CSS modules, have a lot of styles created with `createStyles`, `sx` and `styles`
props, or just prefer CSS-in-JS syntax, you can migrate to `@mantine/emotion`. To view
the full documentation for `@mantine/emotion` package, visit [this page](https://mantine.dev/styles/emotion).

### createStyles and Global component

`createStyles` function and `Global` component are no longer available in `@mantine/core` package. Change imports
to `@mantine/emotion`:

```tsx
// 6.x
import { createStyles, Global } from '@mantine/core';

// 7.x
import { createStyles, Global } from '@mantine/emotion';
```

### sx and styles props

`sx` and styles props available in 7.x the same way as in 6.x after [setup](https://mantine.dev/styles/emotion):

```tsx
// 6.x and 7.x, no changes
import { Box, Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        sx={(theme) => ({ backgroundColor: theme.colors.red[5] })}
      />
      <Button styles={{ root: { height: 50 } }} />
    </>
  );
}
```

### theme.colorScheme

In v7 color scheme value is managed by [MantineProvider](https://mantine.dev/theming/mantine-provider),
[theme object](https://mantine.dev/theming/theme-object) no longer includes `colorScheme` property.
Although it is still possible to access color scheme value in components with
[useMantineColorScheme](https://mantine.dev/theming/color-schemes#use-mantine-color-scheme-hook) hook,
it is not recommended to base your styles on its value. Instead, use `light`/`dark`
[utilities](https://mantine.dev/styles/emotion#utilities).

Example of 6.x `createStyles` with `theme.colorScheme` migration to 7.0:

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));
```

```tsx
// 7.x
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  root: {
    [u.dark] {
      backgroundColor: theme.colors.dark[6];
      color: theme.white;
    },

    [u.light]: {
      backgroundColor: theme.colors.gray[0];
      color: theme.black;
    },
  },
}));
```

## Migration to CSS modules

Before getting started, it is recommended to go through [styles](https://mantine.dev/styles/css-modules) documentation.
Most notable parts:

* [CSS Modules](https://mantine.dev/styles/css-modules)
* [Mantine PostCSS preset](https://mantine.dev/styles/postcss-preset)
* [CSS variables](https://mantine.dev/styles/css-variables)
* [data-\* attributes](https://mantine.dev/styles/data-attributes)
* [Styles API](https://mantine.dev/styles/styles-api)
* [Responsive styles](https://mantine.dev/styles/responsive)

Note that this guide assumes that you have [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) installed and configured
in your project.

### createStyles

`createStyles` function is no longer available in 7.0. Use [CSS Modules](https://mantine.dev/styles/css-modules) instead.

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.red[5],
  },
}));
```

```scss
/* 7.0 */
.root {
  background-color: var(--mantine-color-red-5);
}
```

### sx prop

`sx` and prop is no longer available in 7.0. Use `className` or [style prop](https://mantine.dev/styles/style) instead.

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.red[5] })} />
  );
}
```

```tsx
// 7.0
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box style={{ backgroundColor: 'var(--mantine-color-red-5)' }} />
  );
}
```

Nested selectors are not supported in [style prop](https://mantine.dev/styles/style), use `className` instead:

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return <Box sx={{ '&:hover': { background: 'red' } }} />;
}
```

```scss
.box {
  &:hover {
    background: red;
  }
}
```

### styles prop

`styles` prop no longer supports nested selectors. Use
`classNames` instead to apply styles to nested elements.

```tsx
// 6.x – nested selectors
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      styles={{
        input: {
          '&:focus': {
            color: 'red',
          },
        },
      }}
    />
  );
}
```

```scss
/* 7.0 */
.input {
  &:focus {
    color: red;
  }
}
```

Regular selectors are still supported:

```tsx
// Works both in 6.x and 7.x
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      styles={{
        input: {
          color: 'red',
        },
      }}
    />
  );
}
```

### Global styles

`Global` component and global styles on theme are not available in 7.0. Instead,
create a global stylesheet (`.css` file) and import it in your application entry point.

```tsx
// 6.x
import { Global } from '@mantine/core';

function Demo() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.white,
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[0]
              : theme.black,
          lineHeight: theme.lineHeight,
        },

        '.your-class': {
          backgroundColor: 'red',
        },

        '#your-id > [data-active]': {
          backgroundColor: 'pink',
        },
      })}
    />
  );
}
```

```scss
/* 7.0 */
/* src/index.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background-color: light-dark(
    var(--mantine-color-white),
    var(--mantine-color-dark-7)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  line-height: var(--mantine-line-height);
}

.your-class {
  background-color: red;
}

#your-id > [data-active] {
  background-color: pink;
}
```

### theme referencing

All [theme](https://mantine.dev/theming/theme-object) properties are now available as [CSS variables](https://mantine.dev/styles/css-variables). It is recommended to use
[CSS variables](https://mantine.dev/styles/css-variables) instead of referencing theme object in styles.

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.red[6],
        color: theme.white,
        padding: `calc(${theme.spacing.xl} * 2)`,
      })}
    />
  );
}
```

```scss
/* 7.0 */
.box {
  background-color: var(--mantine-color-red-6);
  color: var(--mantine-color-white);
  padding: calc(var(--mantine-spacing-xl) * 2);
}
```

### theme.colorScheme

Color scheme value is managed by [MantineProvider](https://mantine.dev/theming/mantine-provider),
[theme object](https://mantine.dev/theming/theme-object) no longer includes `colorScheme` property.
Although it is still possible to access color scheme value in components with
[useMantineColorScheme](https://mantine.dev/theming/color-schemes#use-mantine-color-scheme-hook) hook,
it is not recommended to base your styles on its value. Instead, use `light`/`dark`
[mixins](https://mantine.dev/styles/postcss-preset) or `light-dark` CSS [function](https://mantine.dev/styles/postcss-preset#light-dark-function).

Example of 6.x `createStyles` with `theme.colorScheme` migration to 7.0:

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));
```

```scss
/* 7.0 */

/* With light-dark function */
.root {
  background-color: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-6)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
}

/* With light/dark mixins */
.root {
  background-color: var(--mantine-color-gray-0);
  color: var(--mantine-color-black);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    color: var(--mantine-color-white);
  }
}
```

Note that if your application has server-side rendering, you should not render any
elements based on its value ([more info](https://mantine.dev/theming/color-schemes#color-scheme-value-caveats)).
Instead, use `light`/`dark` mixins or `light-dark` function to hide/display elements based
on color scheme value.

Color scheme toggle example:

#### Example: colorSchemeControl

```tsx
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './Demo.module.css';

function Demo() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
```



--------------------------------------------------------------------------------

### SevenToEight

# 7.x → 8.x migration guide

## Global styles imports

If you used separate styles imports from `@mantine/core/styles/global.css` , you need to update imports to use new files.
Note that if you previously imported `@mantine/core/styles.css`, no changes are required – all new files are already included in `styles.css`.

7.x version import:

```tsx
// ❌ No longer includes all global styles
import '@mantine/core/styles/global.css';
```

8.x version import:

```tsx
// ✅ Import all global styles separately
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

If you used `@mantine/core/styles.css`, no changes are required,
the import works the same in 7.x and 8.x versions:

```tsx
// 👍 No changes needed if you used styles.css
import '@mantine/core/styles.css';
```

## Portal reuseTargetNode

`reuseTargetNode` prop of [Portal](https://mantine.dev/core/portal) component is now enabled by default.
This option improves performance by reusing the target node between portal renders, but
in some edge cases, it might cause issues with `z-index` stacking context.

If you experience issues with `z-index`, change `reuseTargetNode` prop to `false` in theme:

```tsx
import { createTheme, Portal } from '@mantine/core';

export const theme = createTheme({
  components: {
    Portal: Portal.extend({
      defaultProps: {
        // ✅ Disable reuseTargetNode by default if your application has z-index issues
        reuseTargetNode: false,
      },
    }),
  }
});
```

## Switch withThumbIndicator

[Switch](https://mantine.dev/core/switch) component default styles were updated, it now
includes checked state indicator inside the thumb. If you want to use
old styles without indicator, set `withThumbIndicator` prop to `false` in theme:

```tsx
import { createTheme, Switch } from '@mantine/core';

export const theme = createTheme({
  components: {
    Switch: Switch.extend({
      defaultProps: {
        // ✅ Disable withThumbIndicator if you want to use old styles
        withThumbIndicator: false,
      },
    }),
  }
});
```

## Date string values

`@mantine/dates` components now use date string values in `onChange` and other callbacks.
If you want to continue using `@mantine/dates` components the same way as in 7.x, you need
to convert callback values to `Date` objects:

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

export function Demo7x() {
  const [value, setValue] = useState<Date | null>(null);
  // ⛔ 7.x – onChange is called with Date object
  return <DatePicker value={value} onChange={setValue} />
}

export function Demo8x() {
  const [value, setValue] = useState<Date | null>(null);
  // ✅ 8.x – onChange is called with string date value (for example '1994-08-21')
  // You can either
  // 1. Convert it to Date object to preserve old behavior
  // 2. Update your code to use date string values instead
  return <DatePicker value={value} onChange={val => setValue(new Date(val))} />
}
```

## DatesProvider timezone

`DatesProvider` component no longer supports `timezone` option:

```tsx
import { DatesProvider } from '@mantine/dates';

function Demo7x() {
  // ❌ timezone option is no longer supported
  return (
    <DatesProvider settings={{ timezone: 'UTC', consistentWeeks: true }}>
      App
    </DatesProvider>
  );
}

function Demo8x() {
  // ✅ Remove timezone option
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      App
    </DatesProvider>
  );
}
```

If you need to handle timezones in your application, you can use a dedicated dates library
([dayjs](https://day.js.org/), [luxon](https://moment.github.io/luxon/#/), [date-fns](https://date-fns.org/))
to update timezone values. Example of using Mantine components with [dayjs](https://day.js.org/):

```tsx
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>('2022-08-21');

  // Mantine components use strings as values, you can pass these
  // strings to a dates library of your choice to assign timezone
  const dateWithTimeZone = dayjs(value).tz("America/Toronto").toDate();

  return <DatePicker value={value} onChange={setValue} />;
}
```

## DateTimePicker timeInputProps

[DateTimePicker](https://mantine.dev/dates/date-time-picker) component no longer accepts `timeInputProps` prop,
as the underlying [TimeInput](https://mantine.dev/dates/time-input) component was replaced with [TimePicker](https://mantine.dev/dates/time-picker).
To pass props down to [TimePicker](https://mantine.dev/dates/time-picker) component, use `timePickerProps` prop instead.

7.x version:

```tsx
import { DateTimePicker } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';

function Demo() {
  return (
    <DateTimePicker
      // ❌ timeInputProps is no longer available
      timeInputProps={{
        leftSection: <IconClock size={16} stroke={1.5} />,
      }}
    />
  );
}
```

8.x version:

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      // ✅ Use timePickerProps instead of timeInputProps
      timePickerProps={{
        leftSection: <IconClock size={16} stroke={1.5} />,
        minutesStep: 5,
        withDropdown: true,
      }}
    />
  );
}
```

## CodeHighlight usage

[@mantine/code-highlight](https://mantine.dev/x/code-highlight) package no longer depends on [highlight.js](https://highlightjs.org).
You can follow the [updated documentation](https://mantine.dev/x/code-highlight/) to set up syntax highlighting with [shiki](https://shiki.matsu.io/).

If you want to continue using [highlight.js](https://highlightjs.org/), in your application,
install `highlight.js` package:

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

After that, you can use `CodeHighlight` component in your application the same way you did in 7.x version.

## Menu data-hovered attribute

[Menu.Item](https://mantine.dev/core/menu) no longer uses `data-hovered` attribute to indicate hovered state.
If you used `data-hovered` in your styles, you need to change it `:hover` and `:focus` selectors
instead:

```scss
// ❌ 7.x – styles with `data-hovered`,
// no longer works in 8.x
.item {
  &[data-hovered] {
    background-color: red;
  }
}

// ✅ 8.x – use styles with `:hover` and `:focus`
.item {
  &:hover,
  &:focus {
    background-color: red;
  }
}
```

## Popover hideDetached

[Popover](https://mantine.dev/core/popover) now supports `hideDetached` prop to automatically close popover when target element is removed from the DOM:

#### Example: hideDetached

```tsx
import { Box, Button, Group, Popover } from '@mantine/core';

function Demo() {
  return (
    <Box
      bd="1px solid var(--mantine-color-dimmed)"
      p="xl"
      w={{ base: 340, sm: 400 }}
      h={200}
      style={{ overflow: 'auto' }}
    >
      <Box w={1000} h={400}>
        <Group>
          <Popover width="target" position="bottom" opened>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is hidden when detached</Popover.Dropdown>
          </Popover>

          <Popover width="target" position="bottom" opened hideDetached={false}>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is visible when detached</Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Box>
  );
}
```


By default, `hideDetached` is enabled – the behavior has changed from 7.x version.
If you prefer to keep the old behavior, you can disable `hideDetached` for all components:

```tsx
import { createTheme, Popover } from '@mantine/core';

export const theme = createTheme({
  components: {
    Popover: Popover.extend({
      defaultProps: {
        // ✅ Disable hideDetached by default
        // if you want to keep the old behavior
        hideDetached: false,
      },
    }),
  }
});
```

## Carousel changes

Starting from 8.x version, [@mantine/carousel](https://mantine.dev/x/carousel) package requires
`embla-carousel` and `embla-carousel-react` packages with version 8.x.

You need to update embla dependencies:

```bash
yarn add embla-carousel@^8.5.2 embla-carousel-react@^8.5.2
```

```bash
npm install embla-carousel@^8.5.2 embla-carousel-react@^8.5.2
```

Update embla props that were previously passed to `Carousel` component
to `emblaOptions`. Full list of props:

* `loop`
* `align`
* `slidesToScroll`
* `dragFree`
* `inViewThreshold`
* `skipSnaps`
* `containScroll`
* `speed` and `draggable` props were removed – they are no longer supported by embla

```tsx
import { Carousel } from '@mantine/carousel';

// ❌ 7.x – embla options passed as props,
// no longer works in 8.x
function Demo7x() {
  return <Carousel loop dragFree align="start" />
}

// ✅ 8.x – use emblaOptions to pass options to embla
function Demo8x() {
  return <Carousel emblaOptions={{ loop: true, dragFree: true, align: 'start' }} />
}
```

`useAnimationOffsetEffect` hook was removed, it is no longer required, you need to
remove it from your code:

```tsx
// ❌ 7.x – useAnimationOffsetEffect is no longer available in 8.x
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

function Demo7x() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return <Carousel getEmblaApi={setEmbla} />;
}

// ✅ 8.x – remove useAnimationOffsetEffect entirely, it is not required
import { Carousel } from '@mantine/carousel';

function Demo8x() {
  return <Carousel />;
}
```

`Embla` type is no longer exported from `@mantine/carousel` package,
you need to change this import to reference `embla-carousel` package instead:

```tsx
// ❌ 7.x – Embla type is no longer available in 8.x
import { Carousel, Embla } from '@mantine/carousel';

function Demo7x() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  return <Carousel getEmblaApi={setEmbla} />;
}

// ✅ 8.x – replace Embla type import
import { Carousel } from '@mantine/carousel';
import { EmblaCarouselType } from 'embla-carousel';

function Demo8x() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  return <Carousel getEmblaApi={setEmbla} />;
}
```


--------------------------------------------------------------------------------

### FunctionsReference

# Functions reference

This guides contains a list of functions exported from Mantine packages that
are not documented anywhere else.

## clamp

`clamp` function is exported from `@mantine/hooks`.
It clamps number within the inclusive lower and upper bounds.

```tsx
import { clamp } from '@mantine/hooks';

// With both min and max boundaries
clamp(10, 0, 5); // 5
clamp(100, 0, 5); // 5
clamp(-100, 0, 5); // 0

// With only min boundary
clamp(10, 0, undefined); // 10
clamp(-100, 0, undefined); // 0

// With only max boundary
clamp(0, undefined, 5); // 0
clamp(10, undefined, 5); // 5
```

## lowerFirst

`lowerFirst` function is exported from `@mantine/hooks`.
It converts first character of a string to lower case.

```tsx
import { lowerFirst } from '@mantine/hooks';

lowerFirst('Mantine'); // mantine
lowerFirst('mantine'); // mantine
```

## upperFirst

`upperFirst` function is exported from `@mantine/hooks`.
It converts first character of a string to upper case.

```tsx
import { upperFirst } from '@mantine/hooks';

upperFirst('Mantine'); // Mantine
upperFirst('mantine'); // Mantine
```

## randomId

`randomId` function is exported from `@mantine/hooks`.
It generates random id with `mantine-` prefix.

```tsx
import { randomId } from '@mantine/hooks';

randomId(); // mantine-d7h137oav
randomId(); // mantine-1q2j3j4j5
```

## range

`range` function is exported from `@mantine/hooks`.
It generates array of numbers from `start` to `end` (inclusive).

```tsx
import { range } from '@mantine/hooks';

range(0, 5); // [0, 1, 2, 3, 4, 5]
range(5, 0); // [5, 4, 3, 2, 1, 0]
```

## shallowEqual

`shallowEqual` function is exported from `@mantine/hooks`.
It performs shallow equal check of two objects.

```tsx
import { shallowEqual } from '@mantine/hooks';

shallowEqual({ a: 1 }, { a: 1 }); // true
shallowEqual({ a: 1 }, { a: 2 }); // false
```


--------------------------------------------------------------------------------

### Gatsby

# Usage with Gatsby

<GetTemplates type="gatsby" />

## Generate new application

Follow [Gatsby quick start](https://www.gatsbyjs.com/docs/quick-start/) guide to
create new Gatsby application:

<NpmScript yarnScript="yarn create gatsby" npmScript="npm init gatsby" />

When asked "Would you like to install a styling system?", select `PostCSS`.

## Installation

<PackagesInstallation />

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create `postcss.config.cjs` file at the root of your application with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup

Create `src/theme.ts` file with your theme override:

```tsx
// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... other theme override properties
});
```

Create `gatsby-ssr.tsx` with the following content:

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './src/theme';

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  replaceHeadComponents([
    ...headComponents,
    <ColorSchemeScript key="color-scheme-script" />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <MantineProvider theme={theme}>{element}</MantineProvider>;
};
```

Create `gatsby-browser.tsx` with the following content:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './src/theme';

export const wrapPageElement = ({ element }) => {
  return <MantineProvider theme={theme}>{element}</MantineProvider>;
};
```

All set! Start development server:

```bash
npm run develop
```

## CSS modules

By default, Gatsby has different syntax for importing CSS modules:

```tsx
// Default syntax – will not work in Gatsby
import classes from './Demo.module.css';

// Gatsby syntax
import * as classes from './Demo.module.css';
```


--------------------------------------------------------------------------------

### Icons

# Icons libraries with Mantine

You can use any icons library with Mantine components, most popular options are:

* [Tabler icons](https://tabler-icons.io/)
* [Feather icons](https://feathericons.com/)
* [Radix icons](https://icons.radix-ui.com/)
* [react-icons](https://react-icons.github.io/react-icons/)
* [Font Awesome](https://fontawesome.com/v5/docs/web/use-with/react)

## Tabler icons

[Tabler icons](https://tabler-icons.io/) are used in Mantine demos, documentation
and some `@mantine/` packages depend on them. If you do not know which icons library
to use, we recommend [Tabler icons](https://tabler-icons.io/).

## Icons size

Most of the icons libraries support `size` prop (or similar `width` and `height` props) which allows changing
icon width and height. Usually, it is a number in pixels.

#### Example: icon

```tsx
import { IconBrandMantine } from '@tabler/icons-react';

function Demo() {
  return (
    <IconBrandMantine
      size={80}
      stroke={1.5}
      color="var(--mantine-color-blue-filled)"
    />
  );
}
```


> **rem units in size prop**
>
> Icons `size` prop is usually converted to `width` and `height` props under the hood.
> If you set `size={16}` it will be converted to `width="16"` and `height="16"` attributes
> on svg element.
>
> You can use rem units in `size` prop: `size="1rem"` will be converted to `width="1rem"` and `height="1rem"`,
> but it is not recommended as it is prohibited by SVG standard – some browsers (Firefox) will show a warning in the console.

## Custom icons

It is recommended to use icons as React components. In this case, you will be able to use
`currentColor` in the `fill` and `stroke` prop. This will change icon color based on the context
it is used in.

#### Example: customIcon

```tsx
// AddressBookIcon.tsx
interface AddressBookIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function AddressBookIcon({ size, style, ...others }: AddressBookIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M20 6v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2zM10 16h6" />
      <path d="M11 11a2 2 0 104 0 2 2 0 10-4 0M4 8h3M4 12h3M4 16h3" />
    </svg>
  );
}

// Demo.tsx
import { Button } from '@mantine/core';
import { AddressBookIcon } from './AddressBookIcon';

function Demo() {
  return <Button leftSection={<AddressBookIcon size={18} />}>Demo</Button>;
}
```



--------------------------------------------------------------------------------

### JavaScript

# Usage with JavaScript

## Is it possible to use Mantine with JavaScript?

Yes, it is possible to use all `@mantine/*` packages (as well as all other npm packages) with JavaScript.
`@mantine/*` packages are written in TypeScript and have type definitions, so you will get some the benefits
of TypeScript (like autocompletion in your IDE) when using them with JavaScript.

## Transforming demos code to JavaScript

All demos in Mantine documentation are written in TypeScript. In most cases there is no difference between
TypeScript and JavaScript code – you do not have to do anything.

To transform TypeScript code to JavaScript you can use [TypeScript playground](https://www.typescriptlang.org/play?jsx=1\&preserveValueImports=false#code/Q)
– paste demo code into the playground and all types will be removed. Note that you will also need
to remove type imports from the code.

Example of transformed code:

```tsx
// TypeScript code
import { Button, ButtonProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps {
  myProp: string;
}

function MyButton({ myProp, ...others }: MyButtonProps) {
  return <Button {...others} />;
}
```

```tsx
// JavaScript code
import { Button } from '@mantine/core';

function MyButton({ myProp, ...others }) {
  return <Button {...others} />;
}
```

## Should Mantine be used with JavaScript?

It is recommended to use Mantine with TypeScript, it does not require deep knowledge of TypeScript
and will make your code more robust and easier to maintain. For example, you will get type errors
when you pass invalid props to components or when you use non-existing props. TypeScript will also
help you during migration to new versions of Mantine – you will get type errors when props/components
that you have in your code are removed/renamed/changed.

If you are not familiar with TypeScript yet, using Mantine with TypeScript will be a great opportunity
to learn it. You can use any of [templates](https://mantine.dev/getting-started) to get started – all of them include
TypeScript support out of the box.


--------------------------------------------------------------------------------

### Jest

# Testing with Jest

This guide will help you setup [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for your project.
Note that this guide only covers shared logic that can be applied to any framework, and
it does not cover initial setup of [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) as it may vary depending on the framework you are using.

## Custom render

All Mantine components require [MantineProvider](https://mantine.dev/theming/mantine-provider/) to be present in the component tree.
To add [MantineProvider](https://mantine.dev/theming/mantine-provider/) to the component tree in your tests, create a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
function:

```tsx
// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme} env="test">{children}</MantineProvider>
    ),
  });
}
```

It is usually more convenient to export all `@testing-library/*` functions that you are planning to use
from `./testing-utils/index.ts` file:

```tsx
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
export { userEvent };
```

Then you should import all testing utilities from `./testing-utils` instead of `@testing-library/react`:

```tsx
import { render, screen } from '../test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
```

## Mock WEB APIs

Most of Mantine components depend on browser APIs like `window.matchMedia` or `ResizeObserver`.
These APIs are not available in `jest-environment-jsdom` environment and you will need to mock them in your tests.

Create `jest.setup.js` file in your project root and add the following code to it:

```tsx
import '@testing-library/jest-dom';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

Then add it as a setup file in your `jest.config.js`:

```js
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // ... rest of your config
};
```

## Framework specific setup

Jest setup for different frameworks may vary and usually change over time.
To learn how to setup Jest for your framework, either check [Jest](https://jestjs.io/docs/getting-started)
and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) documentation
or check one of the premade [templates](https://mantine.dev/getting-started). Most of the templates include Jest setup, and
you can use them as a reference.

## Testing examples

You can find testing examples in Mantine Help Center:

* [How can I test Modal/Drawer/Popover components?](https://help.mantine.dev/q/portals-testing)
* [How can I test Select/MultiSelect components?](https://help.mantine.dev/q/combobox-testing)


--------------------------------------------------------------------------------

### LLMDocumentation

# LLMs.txt

Mantine provides LLM-friendly documentation to help AI tools like **Cursor**, **Windsurf**, **GitHub Copilot**, **ChatGPT**, and **Claude** understand and work with the Mantine UI library.

`llms.txt` documentation is updated with every Mantine release.

## Documentation

Links:

* [llms.txt](https://mantine.dev/llms.txt) – compact
* [Download](https://mantine.dev/llms-full.txt) full documentation in single document (~1.8MB)

The LLM documentation includes:

* **Getting Started** - Installation and setup guides
* **Components** - All Mantine components with props, examples, and usage
* **Hooks** - Complete hooks documentation with examples
* **Theming** - Theme customization and MantineProvider setup
* **Styles** - CSS modules, CSS variables, and styling approaches
* **Frequently Asked Questions** - Common questions and solutions

## Cursor

In Cursor, you can reference the documentation using the `@Docs` feature:

1. Type `@Docs` in your prompt
2. Reference the Mantine documentation URL: `https://mantine.dev/llms.txt`
3. Ask questions about Mantine components, styling, or implementation

## Windsurf

For Windsurf users:

1. Reference the documentation using `@https://mantine.dev/llms.txt`
2. Or add it to your `.windsurfrules` file for persistent access

## ChatGPT and Claude

When using ChatGPT or Claude:

1. Mention that you're using Mantine v8
2. Reference the documentation URL: `https://mantine.dev/llms.txt`
3. The AI will fetch and use the documentation to provide accurate answers

### GitHub Copilot

While Copilot doesn't directly support external documentation, you can:

1. Include relevant documentation snippets in your comments
2. Reference component names and props accurately for better suggestions

## Example prompts

Here are some example prompts you can use with AI tools:

* "Using Mantine v8, how do I create a dark mode toggle?"
* "Show me how to use the AppShell component with a collapsible navbar"
* "How can I customize the theme colors in MantineProvider?"
* "Create a form with validation using Mantine's form hooks"
* "How to align input with a button in a flex container?"

## Documentation Generation

The LLM documentation is automatically generated from our source files using a compilation script. It includes:

* Component documentation from MDX files
* Props tables and types
* Code examples and demos
* Styles API documentation
* FAQ content from help.mantine.dev

There are two generated formats:

* `llms.txt` – the default compact index that links to per-page `.md` files under the `/llms` path
* `llms-full.txt` – a single large file with all documentation content

To ensure you have the latest documentation, we regenerate these files with each release. The files follow the [LLMs.txt](https://llmstxt.org/) standard for better compatibility with AI tools.

## Contributing

If you find any issues with the LLM documentation or have suggestions for improvement, please [open an issue](https://github.com/mantinedev/mantine/issues) on our GitHub repository.


--------------------------------------------------------------------------------

### NextJs

# Usage with Next.js

<GetTemplates type="next" />

## Generate new application

Follow [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) guide to
create new Next.js application:

<NpmScript yarnScript="yarn create next-app --typescript" npmScript="npx create-next-app@latest --typescript" />

## Installation

<PackagesInstallation />

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create `postcss.config.cjs` file at the root of your application with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup with pages router

Add styles imports and [MantineProvider](https://mantine.dev/theming/mantine-provider) to the `pages/_app.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
```

Create `pages/_document.tsx` file with [ColorSchemeScript](https://mantine.dev/theming/color-schemes) component.
Note that it is required even if you use only one color scheme in your application.

```tsx
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

All set! Start development server:

```bash
npm run dev
```

## Setup with app router

Add [MantineProvider](https://mantine.dev/theming/mantine-provider), [ColorSchemeScript](https://mantine.dev/theming/color-schemes)
and styles imports to the `app/layout.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```

All set! Start development server:

```bash
npm run dev
```

## app + pages router together

If you use both app and pages router in one application, you need to setup both `pages/_app.tsx`
and `app/layout.tsx` files as described above.

## Next.js Link with polymorphic components

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## Server components

All Mantine components use `useContext` hook to support [default props](https://mantine.dev/theming/default-props)
and [Styles API](https://mantine.dev/styles/styles-api). Mantine components cannot be used as server components.
It means that components will render both on the server and client.

Entry points of all `@mantine/*` packages (`index.js` files) have `'use client';` directive at the
top of the file – you do not need to add `'use client';` to your pages/layouts/components.

## Compound components in server components

Some components like [Popover](https://mantine.dev/core/popover) have associated compound components (`Component.XXX`),
where `XXX` is a compound component name. Compound components cannot be used in server components.
Instead, use `ComponentXXX` syntax or add `'use client';` directive to the top of the file.

Example that will not work in server components:

```tsx
import { Popover } from '@mantine/core';

// This will throw an error
export default function Page() {
  return (
    <Popover>
      <Popover.Target>Target</Popover.Target>
      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Example with `'use client';` directive:

```tsx
'use client';

import { Popover } from '@mantine/core';

// No error
export default function Page() {
  return (
    <Popover>
      <Popover.Target>Target</Popover.Target>
      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Example with `ComponentXXX` syntax:

```tsx
import {
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';

// No error
export default function Page() {
  return (
    <Popover>
      <PopoverTarget>Trigger</PopoverTarget>
      <PopoverDropdown>Dropdown</PopoverDropdown>
    </Popover>
  );
}
```

## app router tree shaking

To enable tree shaking with app router, enable experimental `optimizePackageImports` feature in
your `next.config.mjs`:

```tsx
export default {
  // ...other configuration
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};
```

## Troubleshooting

If you have any issues with Mantine in your Next.js application, please check
[Help Center article](https://help.mantine.dev/q/server-components) that covers
most common issues with app router and server components.


--------------------------------------------------------------------------------

### Polymorphic

# Polymorphic components

## What is a polymorphic component

A polymorphic component is a component which root element can be changed with `component` prop.
All polymorphic components have a default element which is used when `component` prop is not provided.
For example, the [Button](https://mantine.dev/core/button) component default element is `button` and
it can be changed to `a` or any other element or component:

#### Example: polymorphic

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component="a" href="https://mantine.dev/" target="_blank">
      Mantine website
    </Button>
  );
}
```


## renderRoot prop

`renderRoot` is an alternative to the `component` prop, which accepts a function that should return
a React element. It is useful in cases when `component` prop cannot be used, for example,
when the component that you want to pass to the `component` is generic
(accepts type or infers it from props, for example `<Link<'/'> />`).

Example of using `renderRoot` prop, the result is the same as in the previous demo:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      renderRoot={(props) => (
        <a href="https://mantine.dev/" target="_blank" {...props} />
      )}
    >
      Mantine website
    </Button>
  );
}
```

**!important** It is required to spread `props` argument into the root element. Otherwise
there will be no styles and the component might not be accessible.

## Polymorphic components as other React components

You can pass any other React component to `component` prop.
For example, you can pass `Link` component from `react-router-dom`:

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} to="/react-router">
      React router link
    </Button>
  );
}
```

## Polymorphic components as Next.js Link

Next.js link does not work in the same way as other similar components in all Next.js versions.

With Next.js 12 and below:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Link href="/hello" passHref>
      <Button component="a">Next link button</Button>
    </Link>
  );
}
```

With Next.js 13 and above:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## Polymorphic components with generic components

You cannot pass generic components to `component` prop because it is not possible to infer generic types
from the component prop. For example, you cannot pass [typed Next.js Link](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
to `component` prop because it is not possible to infer `href` type from the component prop. The component itself
will work correctly, but you will have a TypeScript error.

To make generic components work with polymorphic components, use `renderRoot` prop instead of `component`:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button renderRoot={(props) => <Link href="/hello" {...props} />}>
      Typed Next link button
    </Button>
  );
}
```

## Polymorphic components with react-router NavLink

[react-router-dom](https://reactrouter.com/en/main) [NavLink](https://reactrouter.com/en/main/components/nav-link) component
`className` prop accepts a function based on which you can add an active class to the link. This feature is
incompatible with Mantine `component` prop, but you can use `renderRoot` prop instead:

```tsx
import cx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      renderRoot={({ className, ...others }) => (
        <NavLink
          className={({ isActive }) =>
            cx(className, { 'active-class': isActive })
          }
          {...others}
        />
      )}
    >
      React router NavLink
    </Button>
  );
}
```

## Wrapping polymorphic components

Non-polymorphic components include `React.ComponentPropsWithoutRef<'x'>` as a part of their props type,
where `x` is a root element of the component. For example, [Container](https://mantine.dev/core/container) component
is not polymorphic – its root element is always `div`, so its props type includes `React.ComponentPropsWithoutRef<'div'>`.

Polymorphic components do not include `React.ComponentPropsWithoutRef<'x'>` as a part of their props type
because their root element can be changed, and thus props type can be inferred only after the component was rendered.

Example of creating a non-polymorphic wrapper component for Mantine polymorphic component:

#### Example: staticPolymorphic

```tsx
import { forwardRef } from 'react';
import { Button, ButtonProps } from '@mantine/core';

interface LinkButtonProps
  extends ButtonProps,
    Omit<React.ComponentPropsWithoutRef<'a'>, keyof ButtonProps> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => (
  <Button {...props} ref={ref} component="a" />
));

function Demo() {
  return (
    <LinkButton href="https://mantine.dev" target="_blank">
      Mantine website
    </LinkButton>
  );
}
```


Example of creating a polymorphic wrapper component for Mantine polymorphic component:

#### Example: createPolymorphic

```tsx
import { forwardRef } from 'react';
import { createPolymorphicComponent, Button, ButtonProps, Group } from '@mantine/core';

interface CustomButtonProps extends ButtonProps {
  label: string;
}

// Default root element is 'button', but it can be changed with 'component' prop
const CustomButton = createPolymorphicComponent<'button', CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(({ label, ...others }, ref) => (
    <Button {...others} ref={ref}>
      {label}
    </Button>
  ))
);

// Default root element is 'a', but it can be changed with 'component' prop
const CustomButtonAnchor = createPolymorphicComponent<'a', CustomButtonProps>(
  forwardRef<HTMLAnchorElement, CustomButtonProps>(({ label, ...others }, ref) => (
    <Button component="a" {...others} ref={ref}>
      {label}
    </Button>
  ))
);

function Demo() {
  return (
    <Group>
      <CustomButton label="Button by default" color="cyan" />
      <CustomButtonAnchor label="Anchor by default" href="https://mantine.dev" target="_blank" />
    </Group>
  );
}
```


## Dynamic component prop

You can use dynamic value in the `component` prop, but in this case, you need to either provide types manually
or disable type checking by passing `any` as a type argument to the polymorphic component:

```tsx
import { Box } from '@mantine/core';

function KeepTypes() {
  return (
    <Box<'input'>
      component={(Math.random() > 0.5 ? 'input' : 'div') as any}
    />
  );
}

function NukeTypes() {
  return (
    <Box<any> component={Math.random() > 0.5 ? 'input' : 'div'} />
  );
}
```

## Create your own polymorphic components

Use `createPolymorphicComponent` function and [Box](https://mantine.dev/core/box) component to create new polymorphic components:

#### Example: newPolymorphic

```tsx
import { forwardRef } from 'react';
import { Box, BoxProps, createPolymorphicComponent, Group } from '@mantine/core';

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = createPolymorphicComponent<'button', MyButtonProps>(
  forwardRef<HTMLButtonElement, MyButtonProps>(({ label, ...others }, ref) => (
    <Box component="button" {...others} ref={ref}>
      {label}
    </Box>
  ))
);

function Demo() {
  return (
    <Group>
      <MyButton label="Button by default" />
      <MyButton
        label="MyButton as anchor"
        component="a"
        href="https://mantine.dev"
        target="_blank"
      />
    </Group>
  );
}
```


## Make Mantine component polymorphic

Polymorphic components have performance overhead for tsserver (no impact on runtime performance),
because of that not all Mantine components have polymorphic types, but all components still
accept `component` prop – root element can be changed.

To make Mantine component polymorphic, use `createPolymorphicComponent` function the same way
as in the previous example:

```tsx
import {
  createPolymorphicComponent,
  Group,
  GroupProps,
} from '@mantine/core';

const PolymorphicGroup = createPolymorphicComponent<
  'button',
  GroupProps
>(Group);

function Demo() {
  return (
    <PolymorphicGroup component="a" href="https://mantine.dev" />
  );
}
```


--------------------------------------------------------------------------------

### ReactRouter

# Usage with React Router

## Generate new application

Follow [React Router getting started guide](https://reactrouter.com/start/framework/installation) guide to create new React Router application:

```bash
npx create-react-router@latest my-react-router-app
```

## Installation

<PackagesInstallation />

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create `postcss.config.cjs` file at the root of your application with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup

Add styles imports, [MantineProvider](https://mantine.dev/theming/mantine-provider/) and [ColorSchemeScript](https://mantine.dev/theming/color-schemes) to `app/root.tsx`:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ... other app/root.tsx content
```

All set! Start development server:

```bash
npm run dev
```


--------------------------------------------------------------------------------

### Redwood

# Usage with RedwoodJS

<GetTemplates type="redwood" />

## Generate new application

Follow [Redwood getting started guide](https://redwoodjs.com/docs/quick-start) guide to
create new Redwood application:

```bash
yarn create redwood-app my-redwood-project --typescript
```

## Installation

**Note that it is recommended to use `yarn` instead of `npm` to install dependencies.**

Open `web` directory before installing dependencies:

```bash
cd web
```

<PackagesInstallation />

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create `postcss.config.js` file in `web` directory with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup

Add styles imports, [MantineProvider](https://mantine.dev/theming/mantine-provider) and [ColorSchemeScript](https://mantine.dev/theming/color-schemes)
to `web/src/App.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorSchemeScript />
      <MantineProvider>
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
```

All set! Start development server:

```bash
yarn rw dev
```


--------------------------------------------------------------------------------

### Storybook

# Setup Mantine in Storybook

Note that this guide covers only Storybook 10.0+ integration. If you are using older version of Storybook,
it will not work for you.

## Add Storybook to your application

If you already have Storybook in your application, you can skip this step.

Follow [Storybook getting started](https://storybook.js.org/docs/react/get-started/install/) guide
to add Storybook to your application:

```bash
npx storybook@latest init
```

## Configure addons

Install `@storybook/addon-themes` Storybook addon:

```bash
yarn add @storybook/addon-themes
```

```bash
npm install @storybook/addon-themes
```

Add addons to `.storybook/main.ts`:

```tsx
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ... other config properties
  addons: ['@storybook/addon-themes'],
};

export default config;
```

## Theme object

To shared [theme object](https://mantine.dev/theming/theme-object) between your application and Storybook, create
`src/theme.ts` (or any other path in your application) file with your theme override:

```tsx
// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... other theme override properties
});
```

Then you will be able to use the same theme both in your application and Storybook:

```tsx
// In your application

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

function App() {
  return <MantineProvider theme={theme}>{/* ... */}</MantineProvider>;
}
```

## Storybook preview

If `.storybook/preview.tsx` file does not exist, create it and add
the following content:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
    storySort: (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
  },
  backgrounds: { disable: true },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Mantine color scheme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

export const decorators = [
  (renderStory: any, context: any) => {
    const scheme = (context.globals.theme || 'light') as 'light' | 'dark';
    return (
      <MantineProvider theme={theme} forceColorScheme={scheme}>
        <ColorSchemeScript />
        {renderStory()}
      </MantineProvider>
    );
  },
];
```

All set! Start Storybook:

```bash
npm run storybook
```


--------------------------------------------------------------------------------

### Tiptap3Migration

# Migration guide Tiptap 2 → Tiptap 3

This guide will help you update [TipTap](https://tiptap.dev/docs) from version 2 to version 3.

## shouldRerenderOnTransaction

Set `shouldRerenderOnTransaction: true` in `useEditor`. It is required to have active control
highlight.

```tsx
const editor = useEditor({
  shouldRerenderOnTransaction: true,
  // ... other options
});
```

## immediatelyRender

Set `immediatelyRender: false` if you use Next.js or other framework with server-side rendering.
It is required to prevent hydration mismatches.

```tsx
const editor = useEditor({
  immediatelyRender: false,
  // ... other options
});
```

## StarterKit changes

`StarterKit` now includes underline and link extensions out of the box:

* You no longer need to add underline extension manually
* You must disable the default link extension to use extension provided by Mantine

```tsx
// With tiptap 2.x – ❌ no longer works with tiptap 3.x
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@mantine/tiptap';

const editor = useEditor({
  extensions: [StarterKit, Underline, Link],
});

// With tiptap 3x – ✅ new usage example
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@mantine/tiptap';

const editor = useEditor({
  // Remove underline and link extensions
  extensions: [StarterKit.configure({ link: false }), Link],
});
```

## Import paths

Change import paths for floating and bubble menu components:

```tsx
// With tiptap 2.x – ❌ no longer works with tiptap 3.x
import { BubbleMenu, FloatingMenu } from '@tiptap/react';

// With tiptap 3.x – ✅ new usage example
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
```


--------------------------------------------------------------------------------

### TypeScript

# Usage with TypeScript

All `@mantine/*` packages are fully compatible with TypeScript. All examples in the documentation
are written in TypeScript – you can copy-paste them to your project without any changes.

This guide will help you get familiar with types that `@mantine/core` package exports.

## Components props types

Each `@mantine/` package that exports components, exports props types for these components as well.
You can import component props types by adding `Props` to the component name,
for example, you can import Button and DatePicker components props like so:

```tsx
import type { ButtonProps } from '@mantine/core';
import type { DatePickerProps } from '@mantine/dates';
```

Note that there are two variations of props types: for polymorphic components and for regular components.
Regular components props types include `React.ComponentPropsWithoutRef<'X'>`, where `X` is the root element
type, for example `'div'`.

Example of extending regular component props:

```tsx
import { Group, GroupProps } from '@mantine/core';

// Interface includes `React.ComponentPropsWithoutRef<'div'>`
interface MyGroupProps extends GroupProps {
  spacing: number;
}

function MyGroup({ spacing, ...others }: MyGroupProps) {
  return <Group my={spacing} {...others} />;
}
```

[Polymorphic components](https://mantine.dev/guides/polymorphic) props types do not include `React.ComponentPropsWithoutRef<'X'>`
because their root element depends on the `component` prop value.

Example of extending [polymorphic components](https://mantine.dev/guides/polymorphic) props:

```tsx
import { Button, ButtonProps, ElementProps } from '@mantine/core';

interface MyButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  height: number;
}

function MyButton({ height, ...others }: MyButtonProps) {
  return <Button style={{ height }} {...others} />;
}
```

## ElementProps type

`ElementProps` is a utility type similar to `React.ComponentPropsWithoutRef`, but with additional
features. It replaces native elements `style` prop with Mantine [style prop](https://mantine.dev/styles/style) and
allows omitting properties that are passed as a second type.

```tsx
import { ButtonProps, ElementProps } from '@mantine/core';

// Equivalent of `React.ComponentPropsWithoutRef<'button'>`
type ButtonElementProps = ElementProps<'button'>;

// Equivalent of `Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'onClick'>`
type OmitColor = ElementProps<'button', 'color' | 'onClick'>;

// Removes all Mantine component props from React component props
// to avoid props types conflicts
// Equivalent of `Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonProps>`
type OmitButtonProps = ElementProps<'button', keyof ButtonProps>;
```

## MantineTheme type

`MantineTheme` is a type of [theme object](https://mantine.dev/theming/theme-object). You can use it to add types
to functions that accept theme object as an argument:

```tsx
import { MantineTheme, useMantineTheme } from '@mantine/core';

function getPrimaryColor(theme: MantineTheme) {
  return theme.colors.blue[5];
}

function Demo() {
  const theme = useMantineTheme();
  return <div style={{ color: getPrimaryColor(theme) }} />;
}
```

## MantineThemeOverride type

`MantineThemeOverride` type is a deep partial of `MantineTheme`. It can be used in functions
that accept theme override as an argument:

```tsx
import {
  createTheme,
  MantineThemeOverride,
  mergeThemeOverrides,
} from '@mantine/core';

const baseTheme = createTheme({
  fontFamily: 'Helvetica, sans-serif',
});

function mergeThemes(themes: MantineThemeOverride[]) {
  return mergeThemeOverrides(baseTheme, ...themes);
}

const overrideTheme = createTheme({
  primaryColor: 'blue',
});

const overrideTheme2 = createTheme({
  cursorType: 'pointer',
});

const mergedTheme = mergeThemes([overrideTheme, overrideTheme2]);
```

## MantineColorScheme type

`MantineColorScheme` is a union of `'light' | 'dark' | 'auto'` values. You can use to add types
to function that accept color scheme as an argument:

```tsx
import {
  MantineColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

function getComputedColorScheme(colorScheme: MantineColorScheme) {
  return colorScheme === 'auto' ? 'light' : colorScheme;
}

function Demo() {
  const { colorScheme } = useMantineColorScheme();
  const computed = getComputedColorScheme(colorScheme);
}
```

## MantineSize type

`MantineSize` type is a union of `'xs' | 'sm' | 'md' | 'lg' | 'xl'` values. You can use to add types
to various props that accept size as an argument, for example, `radius`, `shadow`, `p`.

```tsx
import { MantineSize, Paper } from '@mantine/core';

interface DemoProps {
  size: MantineSize;
  radius: MantineSize | (string & {}) | number;
  shadow: MantineSize | string;
}

function Demo({ size, radius, shadow }: DemoProps) {
  return <Paper radius={radius} shadow={shadow} p={size} m={size} />;
}
```

## Theme object declarations

You can change `theme.other` and `theme.colors` types by extending `MantineTheme` interface
in `.d.ts` file. Create `mantine.d.ts` anywhere in your project (must be included in `tsconfig.json`)
to extend theme object types.

To override `theme.other`:

```tsx
// mantine.d.ts
declare module '@mantine/core' {
  export interface MantineThemeOther {
    myCustomProperty: string;
    myCustomFunction: () => void;
  }
}
```

To override `theme.colors`:

```tsx
import {
  DefaultMantineColor,
  MantineColorsTuple,
} from '@mantine/core';

type ExtendedCustomColors =
  | 'primaryColorName'
  | 'secondaryColorName'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
```

You can also customize size related types for `theme.spacing`, `theme.radius`,
`theme.breakpoints`, `theme.fontSizes`, `theme.lineHeights`, and `theme.shadows` similarly.

To override `theme.spacing` and `theme.radius`

```tsx
import {
  DefaultMantineSize,
  MantineThemeSizesOverride,
} from '@mantine/core';

type ExtendedCustomSpacing =
  | 'xxl'
  | 'xxxs'
  | DefaultMantineSize;

type ExtendedCustomRadius =
  | 'xxs'
  | DefaultMantineSize;

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    spacing: Record<ExtendedCustomSpacing, string>;
    radius: Record<ExtendedCustomRadius, string>;
  }
}
```

Note that extending theme type is not required, it is only needed if you want to
make your theme object types more strict and add autocomplete in your editor.

## Custom variants types

You can define types for custom [variants](https://mantine.dev/styles/variants-sizes) by
extending `{x}Props` interface with the new variant type in your `mantine.d.ts` file.

Example of adding custom variant type to [Button](https://mantine.dev/core/button) component:

```tsx
import { ButtonVariant, MantineSize } from '@mantine/core';

type ExtendedButtonVariant = ButtonVariant | 'contrast' | 'radial-gradient';

declare module '@mantine/core' {
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
}
```


--------------------------------------------------------------------------------

### Vite

# Usage with Vite

<GetTemplates type="vite" />

## Generate new application

Follow [Vite getting started](https://vitejs.dev/guide/) guide to create new Vite application:

<NpmScript yarnScript="yarn create vite" npmScript="npm create vite@latest" />

## Installation

<PackagesInstallation />

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create `postcss.config.cjs` file at the root of your application with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup

Add styles imports and [MantineProvider](https://mantine.dev/theming/mantine-provider/) to your application root component (usually `App.tsx`):

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export default function App() {
  return <MantineProvider>{/* Your app here */}</MantineProvider>;
}
```

All set! Start development server:

```bash
npm run dev
```


--------------------------------------------------------------------------------

### Vitest

# Testing with Vitest

This guide will help you setup [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for your project.
Note that this guide intended for projects that use [Vite](https://vitejs.dev/) as a bundler, if you are using
other frameworks/bundlers, it is recommended to use [Jest](https://mantine.dev/guides/jest/) instead.

## Installation

Install vitest and react testing library:

```bash
yarn add vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

```bash
npm install vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

If you want to run tests from your IDE, install one of the [extensions](https://vitest.dev/guide/ide).

## Configuration

Add vitest configuration to your Vite config file:

```tsx
import { defineConfig } from 'vite';

export default defineConfig({
  // ... rest of your config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
```

Then create `vitest.setup.mjs` file in your project root and add the following code to it:

```tsx
import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

The code above mocks `window.matchMedia` and `ResizeObserver` APIs that are not available
in `jsdom` environment but are required by some Mantine components.

Optionally you can add vitest scripts to your `package.json`:

```json
{
  "scripts": {
    "vitest": "vitest run",
    "vitest:watch": "vitest"
  }
}
```

## Custom render

All Mantine components require [MantineProvider](https://mantine.dev/theming/mantine-provider/) to be present in the component tree.
To add [MantineProvider](https://mantine.dev/theming/mantine-provider/) to the component tree in your tests, create a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
function:

```tsx
// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme} env="test">{children}</MantineProvider>
    ),
  });
}
```

It is usually more convenient to export all `@testing-library/*` functions that you are planning to use
from `./testing-utils/index.ts` file:

```tsx
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
export { userEvent };
```

Then you should import all testing utilities from `./testing-utils` instead of `@testing-library/react`:

```tsx
import { render, screen } from '../test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
```

## Example of a full setup

You can find an example with a full Vitest setup in [mantine-vite-template](https://github.com/mantinedev/vite-template).


--------------------------------------------------------------------------------

