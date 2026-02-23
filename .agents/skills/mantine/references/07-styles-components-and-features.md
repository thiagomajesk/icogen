# STYLES COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## STYLES COMPONENTS AND FEATURES

### ColorFunctions

# Color functions

`@mantine/core` package exports several functions that can be used to manipulate colors
or extract information before using them as CSS value.

## darken and lighten

`darken` and `lighten` functions can be used to manipulate color brightness,
they accept color in any format as first argument and the amount of lightness to add/remove as second argument.

```tsx
import { darken, lighten } from '@mantine/core';

lighten('#228BE6', 0.1); // lighten by 10%
// -> rgba(56, 151, 233, 1)

darken('rgb(245, 159, 0)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, 1)

darken('rgba(245, 159, 0, .3)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, 1, .3)

lighten('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), white 74%)
```

## alpha

`alpha` function converts color to rgba format with a given alpha channel,
it is usually used to make colors more transparent. If it is not possible to convert color to rgba
format (for example if color is a CSS variable), the function will use [color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix).
Note that `color-mix` is not supported in some older browsers, you can check [caniuse](https://caniuse.com/mdn-css_types_color_color-mix)
for more information.

```tsx
import { alpha } from '@mantine/core';

alpha('#4578FC', 0.45); // -> rgba(69, 120, 252, 0.45)
alpha('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), transparent 26%)
```

## parseThemeColor

`parseThemeColor` function returns information about a given color in the following format:

```tsx
interface ParseThemeColorResult {
  /**
   * True if given color is theme color, for example
   * `blue`, `orange.9`, `pink.3` are theme colors
   * `#fff`, `rgba(0, 0, 0, .5)` are not
   */
  isThemeColor: boolean;

  /**
   * Key of `theme.colors` if given color is theme color, for example
   * if given color is `blue` it will be `blue`,
   * if given color is `orange.9` it will be `orange`
   */
  color: string;

  /**
   * Resolved color value, for example
   * if given color is `blue.7` it will be value of `theme.colors.blue[7]`,
   * if given color is `#fff` it will be `#fff`
   */
  value: string;

  /**
   * If given color is theme color, this will be shade of that color
   * for example if given color is `blue.7` it will be `7`,
   * if given color does not have index or is not theme color then it will be `undefined`
   */
  shade: MantineColorShade | undefined;

  /**
   * Color CSS variable, for example
   * `blue.7` – `--mantine-color-blue-7`,
   * `red` – `--mantine-color-red-filled`,
   * `white` – `--mantine-color-white`
   * `#fff` – `undefined`
   */
  variable: CssVariable | undefined;
}
```

`parseThemeColor` function can be used everywhere `theme` object is available,
for example in [CSS variables resolver](https://mantine.dev/styles/css-variables), [variant color resolver](https://mantine.dev/theming/colors#colors-variant-resolver)
or component body:

```tsx
import {
  MantineColor,
  parseThemeColor,
  useMantineTheme,
} from '@mantine/core';

interface DemoProps {
  color: MantineColor;
}

function Demo({ color }: DemoProps) {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color, theme });

  return (
    <div
      style={{
        backgroundColor: parsedColor.isThemeColor
          ? `var(${parsedColor.variable})`
          : parsedColor.value,
      }}
    />
  );
}
```

## getThemeColor

`getThemeColor` is a simpler version of `parseThemeColor` function, it accepts a color string
as first argument and theme object as second argument. It returns parsed color value or CSS variable:

```tsx
import { getThemeColor, useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  getThemeColor('blue', theme); // -> var(--mantine-color-blue-filled)
  getThemeColor('blue.7', theme); // -> var(--mantine-color-blue-7)
  getThemeColor('white', theme); // -> var(--mantine-color-white)
  getThemeColor('#DF78E4', theme); // -> #DF78E4
}
```

## getGradient

`getGradient` function transforms given `MantineGradient` object to CSS gradient string:

```tsx
import { getGradient, useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  getGradient({ deg: 180, from: 'blue', to: 'cyan.7' }, theme);
  // -> `linear-gradient(180deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-cyan-7) 100%)`
}
```

## isLightColor

`isLightColor` function can be used to achieve better contrast between text and background:

```tsx
import { Box, isLightColor } from '@mantine/core';

interface DemoProps {
  color: string;
}

export function Demo({ color }: DemoProps) {
  return (
    <Box bg={color} c={isLightColor(color) ? 'black' : 'white'}>
      Box with contrast text
    </Box>
  );
}
```

## luminance

`luminance` function returns color luminance, it can be used to check colors contrast:

```tsx
import { luminance } from '@mantine/core';

luminance('#fff'); // -> 1
luminance('#000'); // -> 0
luminance('#4578FC'); // -> 0.21726425554966
```


--------------------------------------------------------------------------------

### CSSFilesList

# CSS files list

This page contains a list of CSS files that you can import from `@mantine/core` package
as a replacement for `@mantine/core/styles.css`.

## Components dependencies

Some components require additional styles to work properly. For example, [Button](https://mantine.dev/core/button/)
component is based on [UnstyledButton](https://mantine.dev/core/unstyled-button/). If you want to use [Button](https://mantine.dev/core/button/),
you need to import styles for `UnstyledButton` as well.

```tsx
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

Some components like [Select](https://mantine.dev/core/select/) do not have any styles on their own – they are built
on top of other components. To find out which components are used in a particular component, check
the component source code.

If you are not sure which components are used in a particular component, you can import
all styles for components that are reused in other components:

```tsx
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/FloatingIndicator.css';
import '@mantine/core/styles/ActionIcon.css';
```

## Global styles

All Mantine components depend on global styles, you need to import them before
all other styles:

* `baseline.css` – a minimal CSS reset, sets `box-sizing: border-box` and changes font properties
* `default-css-variables.css` – contains all CSS variables generated from the default theme
* `global.css` – global classes used in Mantine components

```tsx
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

## Import order

It is important to keep correct styles import order. For example, if you want to use
[Button](https://mantine.dev/core/button/) component, you need to import styles for
[UnstyledButton](https://mantine.dev/core/unstyled-button/) first and then import styles for [Button](https://mantine.dev/core/button/).

```tsx
// ✅ Correct order – Button styles will override UnstyledButton styles
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

```tsx
// ❌ Incorrect order – UnstyledButton styles will override Button styles
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
```

## Files list

Note that if you cannot find a particular file in the list below, it means that
the component does not have any styles on its own or it is built on top of other components.

<CssFilesList />


--------------------------------------------------------------------------------

### CSSModules

# CSS modules

All Mantine components use CSS modules for styling.
It is recommended to use CSS modules in your project as well, but it is not required –
Mantine components are fully compatible with any third-party styling solution and native CSS.

## Usage

CSS modules are supported out of the box by all major frameworks and build tools. Usually, all you need
to do is to create `*.module.css` file:

```css
/* Button.module.css */
.button {
  color: red;
}
```

And then import it in your component:

```tsx
import classes from './Button.module.css';

function Demo() {
  return (
    <button className={classes.button} type="button">
      Button
    </button>
  );
}
```

## How CSS modules work

When you create a `*.module.css` file, your build tool will generate a unique class name for each class in your file.
For example, when you import the following file in your `.js`/`.ts` file:

```css
/* Button.module.css */
.button {
  color: red;
}

.text {
  color: blue;
}
```

You will get an object with unique class names:

```tsx
import classes from './Button.module.css';

console.log(classes);
// -> Object of scoped class names: key is a class name, value is a generated unique class name
// { button: 'button-Xh3s7ER', text: 'text-js65s3Se' }
// Note that generated class names may vary depending on your build tool
```

With CSS modules, you do not need to worry about class name collisions, you can use any class name you want.

## Referencing global class names

To reference global class names in CSS Modules, you can use `:global` selector:

```scss
.test {
  & :global(.global-class-name) {
    color: red;
  }
}
```

The code above will compile to the following CSS:

```css
.m-dj3w33 .global-class-name {
  color: red;
}
```

## Adding styles to Mantine components

You can add styles to most of Mantine components using `className` prop
– the same way as you would do with a regular HTML element.
To set properties to your [theme](https://mantine.dev/theming/theme-object) values, you can use [Mantine CSS variables](https://mantine.dev/styles/css-variables):

#### Example: className

```tsx
import { Box } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}
```


To apply styles to inner elements of Mantine components with CSS modules, you can use `classNames` prop
(see [Styles API](https://mantine.dev/styles/styles-api) for more information):

#### Example: classNames

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```


## Styling Mantine components without CSS modules

All Mantine components are fully compatible with any third-party styling solution and native CSS.
There are two main strategies to apply styles with a third-party library:

* `className`, `classNames`, `style` and `styles` props
* with static selectors, for example `.mantine-Text-root`

Example of applying styles with a utility CSS library:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      classNames={{
        root: 'mt-4',
        input: 'bg-red-500 text-white',
      }}
    />
  );
}
```

Example of applying styles with global CSS:

```css
/* styles.css */

/* Note that these styles are not scoped and
   will be applied to all TextInput components */
.mantine-TextInput-root {
  margin-top: 0.8rem;
}

.mantine-TextInput-input {
  background-color: var(--mantine-color-red-filled);
  color: var(--mantine-color-white);
}
```

You can combine both approaches to achieve desired results, for example,
`@emotion/styled` and `styled-components` packages will pass `className` prop to
a given component, and you can use static selectors to style inner elements:

```tsx
import styled from '@emotion/styled';
import { Slider } from '@mantine/core';

const StyledSlider = styled(Slider)`
  & .mantine-Slider-bar {
    background-color: var(--mantine-color-pink-5);
  }

  & .mantine-Slider-thumb {
    border-color: var(--mantine-color-pink-5);
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function Demo() {
  return <StyledSlider defaultValue={40} />;
}
```

> **Consider using CSS modules first**
>
> CSS modules are the recommended way of styling Mantine components.
> Before choosing another styling solution, make sure that CSS modules do not fit your needs.
> Other solutions have limitations, for example:
>
> * It is hard to customize styles based on [data-\* attributes](https://mantine.dev/styles/data-attributes) when using utility-based CSS libraries
> * It is impossible to style inner elements of Mantine components with static selectors when using styled-components and other similar libraries if component uses [Portal](https://mantine.dev/core/portal) because some elements will be rendered outside of the component root and inner elements are not part of the component tree


--------------------------------------------------------------------------------

### CSSVariablesList

# Default CSS variables list

This page contains a list of all Mantine CSS variables that are generated from default theme.

<CssVariablesList />


--------------------------------------------------------------------------------

### CssVariables

# Mantine CSS variables

[MantineProvider](https://mantine.dev/theming/mantine-provider) exposes all Mantine CSS variables based on the given [theme](https://mantine.dev/theming/theme-object).
You can use these variables in [CSS](https://mantine.dev/styles/css-modules) files, [style prop](https://mantine.dev/styles/style) or any other styles.
Note that not all values are documented on this page, you can find full list of variables on [this page](https://mantine.dev/styles/css-variables-list).

## Typography variables

Typography variables control font family, font size, line height, font weight, and other text-related properties
of all Mantine components.

### Font family

The following CSS variables are used to assign font families to all Mantine components:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-font-family',
      description:
        'Controls font-family property of most Mantine components',
      defaultValue: 'system sans-serif fonts',
    },
    {
      variable: '--mantine-font-family-monospace',
      description: 'Controls font-family property of code blocks',
      defaultValue: 'system monospace fonts',
    },
    {
      variable: '--mantine-font-family-headings',
      description: 'Controls font-family property of headings',
      defaultValue: 'system sans-serif fonts',
    },
  ]}
/>

You can control these variables in the [theme](https://mantine.dev/theming/theme-object). Note that if
`theme.headings.fontFamily` is not set, `--mantine-font-family-headings` value
will be the same as `--mantine-font-family`.

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  // Controls --mantine-font-family
  fontFamily: 'Arial, sans-serif',

  // Controls --mantine-font-family-monospace
  fontFamilyMonospace: 'Courier New, monospace',

  headings: {
    // Controls --mantine-font-family-headings
    fontFamily: 'Georgia, serif',
  },
});
```

If you want to use system fonts as a fallback for custom fonts, you can reference `DEFAULT_THEME`
value instead of defining it manually:

```tsx
import { createTheme, DEFAULT_THEME } from '@mantine/core';

const theme = createTheme({
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
});
```

You can reference font family variables in your CSS:

```scss
.text {
  font-family: var(--mantine-font-family);
}

.code {
  font-family: var(--mantine-font-family-monospace);
}

.heading {
  font-family: var(--mantine-font-family-headings);
}
```

And in [ff style prop](https://mantine.dev/styles/style-props):

* `ff="text"` will use `--mantine-font-family` variable
* `ff="monospace"` will use `--mantine-font-family-monospace` variable
* `ff="heading"` will use `--mantine-font-family-headings` variable

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text ff="monospace">
      This text uses --mantine-font-family-monospace variable
    </Text>
  );
}
```

### Font size

Font size variables are used in most Mantine components to control text size. The
variable that is chosen depends on the component and its `size` prop.

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-font-size-xs',
      defaultValue: '0.75rem (12px)',
    },
    {
      variable: '--mantine-font-size-sm',
      defaultValue: '0.875rem (14px)',
    },
    {
      variable: '--mantine-font-size-md',
      defaultValue: '1rem (16px)',
    },
    {
      variable: '--mantine-font-size-lg',
      defaultValue: '1.125rem (18px)',
    },
    {
      variable: '--mantine-font-size-xl',
      defaultValue: '1.25rem (20px)',
    },
  ]}
/>

You can reference font size variables in CSS:

```scss
.demo {
  font-size: var(--mantine-font-size-md);
}
```

And in [fz style prop](https://mantine.dev/styles/style-props):

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text fz="xl">
      This text uses --mantine-font-size-xl variable
    </Text>
  );
}
```

To define custom font sizes, can use `theme.fontSizes` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
});
```

Note that `theme.fontSizes` object is merged with the `DEFAULT_THEME.fontSizes` –
it is not required to define all values, only those that you want to change.

```tsx
import { createTheme } from '@mantine/core';

// Changes only xs font size,
// other values will be taken from the DEFAULT_THEME
const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
  },
});
```

You can add any number of additional font sizes to the `theme.fontSizes` object.
These values will be defined as CSS variables in `--mantine-font-size-{size}` format:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xxs: '0.125rem',
    xxl: '2rem',
  },
});
```

After defining `theme.fontSizes`, you can reference these variables in your CSS:

```scss
.demo {
  font-size: var(--mantine-font-size-xxs);
}
```

> **Case conversion**
>
> Case conversion (camelCase to kebab-case) is not automatically applied to custom font sizes.
> If you define `theme.fontSizes` with camelCase keys, you need to reference them in camelCase format.
> For example, if you define `{ customSize: '1rem' }`, you need to reference it as `--mantine-font-size-customSize`.

### Line height

Line height variables are used in [Text](https://mantine.dev/core/text) component. In other components,
line-height is either calculated based on font size or set to `--mantine-line-height`,
which is an alias for `--mantine-line-height-md`.

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-line-height',
      defaultValue: '1.55',
    },
    {
      variable: '--mantine-line-height-xs',
      defaultValue: '1.4',
    },
    {
      variable: '--mantine-line-height-sm',
      defaultValue: '1.45',
    },
    {
      variable: '--mantine-line-height-md',
      defaultValue: '1.55',
    },
    {
      variable: '--mantine-line-height-lg',
      defaultValue: '1.6',
    },
    {
      variable: '--mantine-line-height-xl',
      defaultValue: '1.65',
    },
  ]}
/>

You can reference line height variables in your CSS:

```scss
.demo {
  line-height: var(--mantine-line-height-md);
}
```

And in [lh style prop](https://mantine.dev/styles/style-props):

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text lh="xl">
      This text uses --mantine-line-height-xl variable
    </Text>
  );
}
```

To define custom line heights, you can use `theme.lineHeights` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  lineHeights: {
    xs: '1.2',
    sm: '1.3',
    md: '1.4',
    lg: '1.5',
    xl: '1.6',
  },
});
```

### Headings

`theme.headings` controls font-size, line-height, font-weight and text-wrap CSS properties
of headings in [Title](https://mantine.dev/core/title) and [Typography](https://mantine.dev/core/typography) components.

<CssVariablesGroup
  data={[
    { group: 'General variables' },
    {
      variable: '--mantine-heading-font-weight',
      description:
        'Controls font-weight property of all headings if not overridden',
      defaultValue: '700',
    },
    {
      variable: '--mantine-heading-text-wrap',
      description: 'Controls text-wrap property of all headings',
      defaultValue: 'wrap',
    },
    { group: 'h1 heading' },
    {
      variable: '--mantine-h1-font-size',
      defaultValue: '2.125rem (34px)',
    },
    {
      variable: '--mantine-h1-line-height',
      defaultValue: '1.3',
    },
    {
      variable: '--mantine-h1-font-weight',
      defaultValue: '700',
    },
    { group: 'h2 heading' },
    {
      variable: '--mantine-h2-font-size',
      defaultValue: '1.625rem (26px)',
    },
    {
      variable: '--mantine-h2-line-height',
      defaultValue: '1.35',
    },
    {
      variable: '--mantine-h2-font-weight',
      defaultValue: '700',
    },
    { group: 'h3 heading' },
    {
      variable: '--mantine-h3-font-size',
      defaultValue: '1.375rem (22px)',
    },
    {
      variable: '--mantine-h3-line-height',
      defaultValue: '1.4',
    },
    {
      variable: '--mantine-h3-font-weight',
      defaultValue: '700',
    },
    { group: 'h4 heading' },
    {
      variable: '--mantine-h4-font-size',
      defaultValue: '1.125rem (18px)',
    },
    {
      variable: '--mantine-h4-line-height',
      defaultValue: '1.45',
    },
    {
      variable: '--mantine-h4-font-weight',
      defaultValue: '700',
    },
    { group: 'h5 heading' },
    {
      variable: '--mantine-h5-font-size',
      defaultValue: '1rem (16px)',
    },
    {
      variable: '--mantine-h5-line-height',
      defaultValue: '1.5',
    },
    {
      variable: '--mantine-h5-font-weight',
      defaultValue: '700',
    },
    { group: 'h6 heading' },
    {
      variable: '--mantine-h6-font-size',
      defaultValue: '0.875rem (14px)',
    },
    {
      variable: '--mantine-h6-line-height',
      defaultValue: '1.5',
    },
    {
      variable: '--mantine-h6-font-weight',
      defaultValue: '700',
    },
  ]}
/>

These variables are used in [Title](https://mantine.dev/core/title) component, `order` prop
controls which heading level to use. For example, `order={3}` Title will use:

* `--mantine-h3-font-size`
* `--mantine-h3-line-height`
* `--mantine-h3-font-weight`

#### Example: usage

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={1}>This is h1 title</Title>
      <Title order={2}>This is h2 title</Title>
      <Title order={3}>This is h3 title</Title>
      <Title order={4}>This is h4 title</Title>
      <Title order={5}>This is h5 title</Title>
      <Title order={6}>This is h6 title</Title>
    </>
  );
}
```


You can reference heading variables in your CSS:

```scss
.h1 {
  font-size: var(--mantine-h1-font-size);
  line-height: var(--mantine-h1-line-height);
  font-weight: var(--mantine-h1-font-weight);
}
```

And in [fz and lh style props](https://mantine.dev/styles/style-props):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box fz="h1" lh="h1">
      This text uses --mantine-h1-* variables
    </Box>
  );
}
```

To change heading styles, can use `theme.headings` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
        lineHeight: '1.5',
        fontWeight: '500',
      },
      h2: {
        fontSize: '1.5rem',
        lineHeight: '1.6',
        fontWeight: '500',
      },
    },
    // ...
  },
});
```

`theme.headings` object is deeply merged with the `DEFAULT_THEME.headings` object –
it is not required to define all values, only those that you want to change.

```tsx
import { createTheme } from '@mantine/core';

// Changes only font-size of h1,
// other values will be taken from the DEFAULT_THEME
const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
      },
    },
  },
});
```

### Font smoothing

Font smoothing variables control [-webkit-font-smoothing and moz-osx-font-smoothing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
CSS properties. These variables are used to make text look better on screens with high pixel density.

Font smoothing variables are controlled by `theme.fontSmoothing` [theme](https://mantine.dev/theming/theme-object) property, it is `true` by default. If `theme.fontSmoothing` is `false`, both variables will be set to `unset`.

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-webkit-font-smoothing',
      description: 'Controls -webkit-font-smoothing CSS property',
      defaultValue: 'antialiased',
    },
    {
      variable: '--mantine-moz-font-smoothing',
      description: 'Controls -moz-osx-font-smoothing CSS property',
      defaultValue: 'grayscale',
    },
  ]}
/>

If you need to override font smoothing values, the best way is to disable `theme.fontSmoothing` and set [global styles](https://mantine.dev/styles/global-styles/#add-global-styles-in-your-application)
on the body element:

```tsx
import { createTheme } from '@mantine/core';

// Disable font smoothing in your theme
const theme = createTheme({
  fontSmoothing: false,
});
```

```scss
// Add global styles to your project with desired font smoothing values
body {
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}
```

## Colors variables

Colors variables are controlled by `theme.colors` and `theme.primaryColor`. Each color
defined in `theme.colors` object is required to have 10 shades. Theme color can be
referenced by its name and shade index, for example, `--mantine-color-red-6`.

You can define new colors on the theme object or override existing colors:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    demo: [
      '#FF0000',
      '#FF3333',
      '#FF6666',
      '#FF9999',
      '#FFCCCC',
      '#FFEEEE',
      '#FFFAFA',
      '#FFF5F5',
      '#FFF0F0',
      '#FFEBEB',
    ],
  },
});
```

The code above will define the following CSS variables:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-color-demo-0',
      defaultValue: '#FF0000',
    },
    {
      variable: '--mantine-color-demo-1',
      defaultValue: '#FF3333',
    },
    {
      variable: '--mantine-color-demo-2',
      defaultValue: '#FF6666',
    },
    {
      variable: '--mantine-color-demo-3',
      defaultValue: '#FF9999',
    },
    {
      variable: '--mantine-color-demo-4',
      defaultValue: '#FFCCCC',
    },
    {
      variable: '--mantine-color-demo-5',
      defaultValue: '#FFEEEE',
    },
    {
      variable: '--mantine-color-demo-6',
      defaultValue: '#FFFAFA',
    },
    {
      variable: '--mantine-color-demo-7',
      defaultValue: '#FFF5F5',
    },
    {
      variable: '--mantine-color-demo-8',
      defaultValue: '#FFF0F0',
    },
    {
      variable: '--mantine-color-demo-9',
      defaultValue: '#FFEBEB',
    },
  ]}
/>

### Variant colors

Some Mantine components like [Button](https://mantine.dev/core/button) or [Badge](https://mantine.dev/core/badge) have `variant` prop
that in combination with `color` prop controls the component text, background and border colors.
For each variant and color, Mantine defines a set of CSS variables that control these colors.
For example, for the default `blue` color the following CSS variables are defined:

<CssVariablesGroup
  data={[
    { group: 'Filled variant' },
    {
      variable: '--mantine-color-blue-filled',
      description: 'Background color of filled variant',
      defaultValue: 'var(--mantine-color-blue-6)',
    },
    {
      variable: '--mantine-color-blue-filled-hover',
      description: 'Background color of filled variant on hover',
      defaultValue: 'var(--mantine-color-blue-7)',
    },
    { group: 'Light variant' },
    {
      variable: '--mantine-color-blue-light',
      description: 'Background color of light variant',
      defaultValue: 'rgba(34, 139, 230, 0.1)',
    },
    {
      variable: '--mantine-color-blue-light-hover',
      description: 'Background color of light variant on hover',
      defaultValue: 'rgba(34, 139, 230, 0.12)',
    },
    {
      variable: '--mantine-color-blue-light-color',
      description: 'Text color of light variant',
      defaultValue: 'var(--mantine-color-blue-6)',
    },
    { group: 'Outline variant' },
    {
      variable: '--mantine-color-blue-outline',
      description: 'Border color of outline variant',
      defaultValue: 'var(--mantine-color-blue-6)',
    },
    {
      variable: '--mantine-color-blue-outline-hover',
      description: 'Border color of outline variant',
      defaultValue: 'rgba(34, 139, 230, 0.05)',
    },
  ]}
/>

For example, if you use [Button](https://mantine.dev/core/button) component the following way:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button color="pink" variant="filled">
      Filled pink button
    </Button>
  );
}
```

The component will have the following styles:

* Background color will be `var(--mantine-color-pink-filled)`
* Background color on hover will be `var(--mantine-color-pink-filled-hover)`
* Text color will be `var(--mantine-color-white)`
* Border color will be `transparent`

Note that the variables above are not static, they are generated based on the values of
`theme.colors` and `theme.primaryShade`. Additionally, their values are different for
dark and light color schemes.

Variant colors variables are used in all components that support `color` prop, for example,
[Button](https://mantine.dev/core/button), [Badge](https://mantine.dev/core/badge), [Avatar](https://mantine.dev/core/avatar) and [Pagination](https://mantine.dev/core/pagination).
Colors values that are used by these components are determined by `cssVariablesResolver` described below
and [variantColorResolver](https://mantine.dev/styles/variants-sizes/#variantcolorresolver).

### Primary color variables

Primary color variables are defined by `theme.primaryColor` (which must be a key of `theme.colors`).
The following CSS variables are defined for the primary color:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-primary-color-{shade}',
      description:
        'Shade is 0-9 to reference specific primary color shade',
      defaultValue: 'var(--mantine-color-{primaryColor}-{shade})',
    },
    {
      variable: '--mantine-primary-color-filled',
      description: 'Background color of filled variant',
      defaultValue: 'var(--mantine-color-{primaryColor}-filled)',
    },
    {
      variable: '--mantine-primary-color-filled-hover',
      description: 'Background color of filled variant on hover',
      defaultValue:
        'var(--mantine-color-{primaryColor}-filled-hover)',
    },
    {
      variable: '--mantine-primary-color-light',
      description: 'Background color of light variant',
      defaultValue: 'var(--mantine-color-{primaryColor}-light)',
    },
    {
      variable: '--mantine-primary-color-light-hover',
      description: 'Background color of light variant on hover',
      defaultValue: 'var(--mantine-color-{primaryColor}-light-hover)',
    },
    {
      variable: '--mantine-primary-color-light-color',
      description: 'Text color of light variant',
      defaultValue: 'var(--mantine-color-{primaryColor}-light-color)',
    },
  ]}
/>

You can reference primary color variables in CSS:

```scss
.demo {
  color: var(--mantine-primary-color-0);
  background-color: var(--mantine-primary-color-filled);
}
```

### Other color variables

The following colors are used in various Mantine components. Note that default values
are provided for the light color scheme, dark color scheme values are different.

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-color-white',
      description: 'Value of theme.white',
      defaultValue: '#fff',
    },
    {
      variable: '--mantine-color-black',
      description: 'Value of theme.black',
      defaultValue: '#000',
    },
    {
      variable: '--mantine-color-text',
      description: 'Color used for text in the body element',
      defaultValue: 'var(--mantine-color-black)',
    },
    {
      variable: '--mantine-color-body',
      description: 'Body background color',
      defaultValue: 'var(--mantine-color-white)',
    },
    {
      variable: '--mantine-color-error',
      description: 'Color used for error messages and states',
      defaultValue: 'var(--mantine-color-red-6)',
    },
    {
      variable: '--mantine-color-placeholder',
      description: 'Color used for input placeholders',
      defaultValue: 'var(--mantine-color-gray-5)',
    },
    {
      variable: '--mantine-color-dimmed',
      description: 'Color used for dimmed text',
      defaultValue: 'var(--mantine-color-gray-6)',
    },
    {
      variable: '--mantine-color-bright',
      description: 'Color used for bright text',
      defaultValue: 'var(--mantine-color-black)',
    },
    {
      variable: '--mantine-color-anchor',
      description: 'Color used for links',
      defaultValue: 'var(--mantine-primary-color-6)',
    },
    {
      variable: '--mantine-color-default',
      description: 'Background color of default variant',
      defaultValue: 'var(--mantine-color-white)',
    },
    {
      variable: '--mantine-color-default-hover',
      description: 'Background color of default variant on hover',
      defaultValue: 'var(--mantine-color-gray-0)',
    },
    {
      variable: '--mantine-color-default-color',
      description: 'Text color of default variant',
      defaultValue: 'var(--mantine-color-black)',
    },
    {
      variable: '--mantine-color-default-border',
      description: 'Border color of default variant',
      defaultValue: 'var(--mantine-color-gray-4)',
    },
    {
      variable: '--mantine-color-disabled',
      description: 'Background color of disabled elements',
      defaultValue: 'var(--mantine-color-gray-2)',
    },
    {
      variable: '--mantine-color-disabled-color',
      description: 'Text color of disabled elements',
      defaultValue: 'var(--mantine-color-gray-5)',
    },
    {
      variable: '--mantine-color-disabled-border',
      description: 'Border color of disabled elements',
      defaultValue: 'var(--mantine-color-gray-3)',
    },
  ]}
/>

## Spacing variables

`theme.spacing` values are used in most Mantine components to control paddings, margins, and other
spacing-related properties. The following CSS variables are defined based on `theme.spacing`:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-spacing-xs',
      defaultValue: '0.625rem (10px)',
    },
    {
      variable: '--mantine-spacing-sm',
      defaultValue: '0.75rem (12px)',
    },
    {
      variable: '--mantine-spacing-md',
      defaultValue: '1rem (16px)',
    },
    {
      variable: '--mantine-spacing-lg',
      defaultValue: '1.25rem (20px)',
    },
    {
      variable: '--mantine-spacing-xl',
      defaultValue: '2rem (32px)',
    },
  ]}
/>

To define custom spacing values, use `theme.spacing` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
```

## Border radius variables

Mantine components that support `radius` prop use border radius variables to control border radius.
The following CSS variables are defined based on `theme.radius`:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-radius-xs',
      defaultValue: '0.125rem (2px)',
    },
    {
      variable: '--mantine-radius-sm',
      defaultValue: '0.25rem (4px)',
    },
    {
      variable: '--mantine-radius-md',
      defaultValue: '0.5rem (8px)',
    },
    {
      variable: '--mantine-radius-lg',
      defaultValue: '1rem (16px)',
    },
    {
      variable: '--mantine-radius-xl',
      defaultValue: '2rem (32px)',
    },
  ]}
/>

Additionally, `--mantine-radius-default` variable is defined based on `theme.defaultRadius`
value. If `radius` prop on components is not set explicitly, `--mantine-radius-default` is used instead.

To define custom border radius values, use `theme.radius` and `theme.defaultRadius` properties:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  defaultRadius: 'sm',
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
});
```

## Shadow variables

Shadow variables are used in all Mantine components that support `shadow` prop. The following CSS
variables are defined based on `theme.shadows`:

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-shadow-xs',
      defaultValue:
        '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    {
      variable: '--mantine-shadow-sm',
      defaultValue:
        '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 10px 15px -5px, rgba(0, 0, 0, 0.04) 0 7px 7px -5px',
    },
    {
      variable: '--mantine-shadow-md',
      defaultValue:
        '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px',
    },
    {
      variable: '--mantine-shadow-lg',
      defaultValue:
        '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 28px 23px -7px, rgba(0, 0, 0, 0.04) 0 12px 12px -7px',
    },
    {
      variable: '--mantine-shadow-xl',
      defaultValue:
        '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 36px 28px -7px, rgba(0, 0, 0, 0.04) 0 17px 17px -7px',
    },
  ]}
/>

To define custom shadow values, use `theme.shadows` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
});
```

## z-index variables

z-index variables are defined in `@mantine/core/styles.css`. Unlike other variables,
z-index variables are not controlled by the theme and are not exposed in the theme object.

<CssVariablesGroup
  data={[
    {
      variable: '--mantine-z-index-app',
      defaultValue: '100',
    },
    {
      variable: '--mantine-z-index-modal',
      defaultValue: '200',
    },
    {
      variable: '--mantine-z-index-popover',
      defaultValue: '300',
    },
    {
      variable: '--mantine-z-index-overlay',
      defaultValue: '400',
    },
    {
      variable: '--mantine-z-index-max',
      defaultValue: '9999',
    },
  ]}
/>

You can reference z-index variables in CSS:

```css
/* Display content above the modal */
.my-content {
  z-index: calc(var(--mantine-z-index-modal) + 1);
}
```

And in components by referencing CSS variable:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return (
    <Modal
      zIndex="var(--mantine-z-index-max)"
      opened
      onClose={() => {}}
    >
      Modal content
    </Modal>
  );
}
```

## CSS variables resolver

`cssVariablesResolver` prop on [MantineProvider](https://mantine.dev/theming/mantine-provider) allows you to
modify values of Mantine CSS variables or even add your own variables.
`cssVariablesResolver` is a function that accepts [theme](https://mantine.dev/theming/theme-object) as a single
argument and returns an object with CSS variables divided into three groups:

* `variables` – variables that do not depend on color scheme
* `light` – variables for light color scheme only
* `dark` – variables for dark color scheme only

Example of adding new CSS variables based on `theme.other`:

```tsx
import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
} from '@mantine/core';

const themeOverride = createTheme({
  other: {
    deepOrangeLight: '#E17900',
    deepOrangeDark: '#FC8C0C',
    heroHeight: 400,
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-hero-height': theme.other.heroHeight,
  },
  light: {
    '--mantine-color-deep-orange': theme.other.deepOrangeLight,
  },
  dark: {
    '--mantine-color-deep-orange': theme.other.deepOrangeDark,
  },
});

function Demo() {
  return (
    <MantineProvider
      theme={themeOverride}
      cssVariablesResolver={resolver}
    >
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Then you will be able to use `--mantine-hero-height` and `--mantine-color-deep-orange` variables
in any part of your application:

```css
.hero {
  height: var(--mantine-hero-height);

  /* background color will automatically change based on color scheme */
  background-color: var(--mantine-color-deep-orange);
}
```


--------------------------------------------------------------------------------

### DataAttributes

# data attributes

Mantine components use `data-*` attributes to apply styles. These attributes are used as
a modifier to apply styles based on component state. General rule of Mantine components
styles: one class with shared styles and any number of `data-*` attributes as modifiers.

Example of applying styles with `data-*` attributes:

#### Example: dataAttributes

```tsx
// Demo.module.css
.root {
  border-top-left-radius: var(--mantine-radius-xl);
  border-bottom-left-radius: var(--mantine-radius-xl);
  padding-left: 4px;

  /* The following styles will be applied only when button is disabled */
  &[data-disabled] {
    /* You can use Mantine PostCSS mixins inside data attributes */
    @mixin light {
      border: 1px solid var(--mantine-color-gray-2);
    }

    @mixin dark {
      border: 1px solid var(--mantine-color-dark-4);
    }

    /* You can target child elements that are inside .root[data-disabled] */
    & .section[data-position='left'] {
      opacity: 0.6;
    }
  }
}

.section {
  /* Apply styles only to left section */
  &[data-position='left'] {
    --section-size: calc(var(--button-height) - 8px);

    background-color: var(--mantine-color-body);
    color: var(--mantine-color-text);
    height: var(--section-size);
    width: var(--section-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--mantine-radius-xl);
  }

  &[data-position='right'] {
    @mixin rtl {
      transform: rotate(180deg);
    }
  }
}

// Demo.tsx
import { Button, ButtonProps, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Demo.module.css';

function SendFilesButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button {...props} radius="md" classNames={classes} />;
}

function Demo() {
  return (
    <Group>
      <SendFilesButton
        leftSection="12"
        rightSection={<IconArrowRight size={18} />}
      >
        Send files
      </SendFilesButton>
      <SendFilesButton
        leftSection="3"
        rightSection={<IconArrowRight size={18} />}
        disabled
      >
        Send files
      </SendFilesButton>
    </Group>
  );
}
```


## data attributes values

Most of the `data-*` attributes do not have associated values, they represent boolean
state or a feature. For example, when the `disabled` prop on [Button](https://mantine.dev/core/button) is set,
the `data-disabled` attribute is added to the `<button />` element:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button disabled className="my-button">
      Disabled button
    </Button>
  );
}
```

Will output the following HTML:

```html
<button class="my-button" data-disabled>Disabled button</button>
```

You can then use this attribute to apply styles to the disabled button:

```css
.my-button {
  color: var(--mantine-color-black);

  &[data-disabled] {
    color: var(--mantine-color-gray-5);
  }
}
```

When the `disabled` prop is not set, then the `data-disabled` attribute is not added to the
button:

```html
<button class="my-button">Not disabled button</button>
```

In some cases, `data-*` attributes have associated values, for example, a [Button](https://mantine.dev/core/button)
component's `section` element has an associated `data-position` attribute which can be
`left` or `right`. The following example will render two `section` elements, one with
`data-position="left"` and another with `data-position="right"`:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button leftSection="L" rightSection="R">
      Label
    </Button>
  );
}
```

Will output the following HTML:

```html
<button>
  <span class="section" data-position="left">L</span>
  Label
  <span class="section" data-position="right">R</span>
</button>
```

You can then use this attribute to apply styles to the left and right sections:

```css
.section {
  /* Styles applied to both sections */
  width: 2rem;

  /* Styles applied only to left section */
  &[data-position='left'] {
    background-color: red;
  }

  /* Styles applied only to right section */
  &[data-position='right'] {
    background-color: blue;
  }
}
```

## Components data attributes documentation

Every component that uses `data-*` attributes has a dedicated section under the `Styles API` tab.

[Button](https://mantine.dev/core/button) component `data-*` attributes table:

<ModifiersTable data={ButtonStylesApi} withTableBorder={false} my="xl" fixedLayout={false} />

How to read the table:

* `selector` column – [Styles API](https://mantine.dev/styles/styles-api) selector (or multiple selectors) to which data attribute is added
* `attribute` column – data attribute name
* `condition` column – condition based on which the data attribute is added to the element
* `value` column – value of the data attribute

## mod prop

All components support `mod` prop, which allows adding data attributes to
the root element:

```tsx
import { Box } from '@mantine/core';

<Box mod="data-button" />;
// -> <div data-button />

<Box mod={{ opened: true }} />;
// -> <div data-opened />

<Box mod={{ opened: false }} />;
// -> <div />

<Box mod={['button', { opened: true }]} />;
// -> <div data-button data-opened />

<Box mod={{ orientation: 'horizontal' }} />;
// -> <div data-orientation="horizontal" />
```


--------------------------------------------------------------------------------

### Emotion

# Usage with Emotion

Prior to version 7.0 Mantine used [Emotion](https://emotion.sh/) as a styling solution.
It was replaced with [CSS modules](https://mantine.dev/styles/css-modules/) in version 7.0, but you can still
use Emotion with Mantine if you prefer it over CSS modules.

Note that `createStyles` function, `sx` and `styles` prop work different from the same
features in [version 6.x](https://v6.mantine.dev/styles/create-styles/). If you are planning
to upgrade from version 6.x to 7.x, follow the [migration guide](https://mantine.dev/guides/6x-to-7x/).

`@mantine/emotion` package is compatible with `@mantine/core` 7.9.0 and higher. Before
installing, make sure that you are using the latest version of all `@mantine/*` packages.

## Caveats and support

[Emotion](https://emotion.sh/) is a runtime CSS-in-JS library – styles are generated
and injected into the DOM at runtime. This approach has some limitations:

* **Limited server-side rendering support** – modern frameworks like Next.js with app router
  do not fully support emotion or require additional configuration.
* **Runtime overhead** – styles are generated and injected at runtime, which can lead to
  performance issues on pages with a lot of components.
* **Additional bundle size** – your bundle will include `@emotion/react` (21.2kB minified),
  `@mantine/emotion` (~2kb minified) and all styles that you use in your components.

`@mantine/emotion` package can be used with the following frameworks:

* **Vite** and **CRA** with basic setup
* **Next.js with pages router** with additional setup for server side rendering provided by the package
* **Next.js with app router** with additional setup for server side rendering provided by Emotion
* Any other framework that does not require server-side rendering with basic setup

There is no official support (the package probably can be used but it's not tested and documentation is not provided) for:

* **React Router**
* **Gatsby**
* **Redwood**
* Any other framework that has server-side rendering

Note that Emotion is not recommended for new projects, if you are starting a new project with Mantine,
consider using [CSS modules](https://mantine.dev/styles/css-modules/) instead.

## Usage with Vite

[View example repository with full setup](https://github.com/mantinedev/vite-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils
```

Create `emotion.d.ts` file in `src` directory to add types support for `sx` and `styles` props:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Wrap your application with `MantineEmotionProvider` and add `emotionTransform` to `MantineProvider`:

```tsx
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';

export default function App() {
  return (
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>App</MantineEmotionProvider>
    </MantineProvider>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## Usage with Next.js pages router

[View example repository with full setup](https://github.com/mantinedev/next-pages-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

Create `emotion` folder with `cache.ts` and `emotion.d.ts` files.

`cache.ts` file:

```tsx
import createCache from '@emotion/cache';

export const emotionCache = createCache({ key: 'css' });
```

`emotion.d.ts` file:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Add the following content to `pages/_document.tsx` file:

```tsx
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/emotion';
// Import cache created in the previous step
import { emotionCache } from '../emotion/cache';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const stylesServer = createEmotionServer(emotionCache);

Document.getInitialProps = createGetInitialProps(
  NextDocument,
  stylesServer
);
```

Add `MantineEmotionProvider` and `emotionTransform` to `pages/_app.tsx` file:

```tsx
import '@mantine/core/styles.css';

import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import { emotionCache } from '../emotion/cache';

export default function App({ Component, pageProps }: any) {
  return (
    <MantineEmotionProvider cache={emotionCache}>
      <MantineProvider stylesTransform={emotionTransform}>
        <Head>
          <title>Mantine Template</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </MantineEmotionProvider>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## Usage with Next.js app router

[View example repository with full setup](https://github.com/mantinedev/next-app-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

Create `app/emotion.d.ts` file with the following content:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Create `app/EmotionRootStyleRegistry.tsx` file with the following content:

```tsx
'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'my' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
```

Add `RootStyleRegistry`, `MantineEmotionProvider` and `emotionTransform` to `app/layout.tsx`.
It should look something like this:

```tsx
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import { RootStyleRegistry } from './EmotionRootStyleRegistry';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <RootStyleRegistry>
          <MantineEmotionProvider>
            <MantineProvider stylesTransform={emotionTransform}>
              {children}
            </MantineProvider>
          </MantineEmotionProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application.
Note that `'use client'` is required in most components that use `sx`, `styles` or `createStyles`:

```tsx
'use client';

import { Box } from '@mantine/core';

export default function HomePage() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## sx prop

With the setup above you can use `sx` prop in all Mantine components.
`sx` prop allows adding styles to the root element of the component.
It accepts either a styles object or a function that receives theme, utilities and returns styles object:

```tsx
import { Box, Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        sx={{
          padding: 40,
          '&:hover': { padding: 80 },
        }}
      >
        Box with object sx
      </Box>

      <Button
        sx={(theme, u) => ({
          padding: 10,

          [u.light]: {
            backgroundColor: theme.colors.blue[0],
            color: theme.colors.blue[9],
            '&:hover': {
              backgroundColor: theme.colors.blue[1],
            },
          },

          [u.dark]: {
            backgroundColor: theme.colors.blue[9],
            color: theme.colors.blue[0],
            '&:hover': {
              backgroundColor: theme.colors.blue[8],
            },
          },
        })}
      >
        Button with function sx
      </Button>
    </>
  );
}
```

### mergeSx function

You can use the `mergeSx` function to merge multiple `sx` props into one. This
can be useful for merging `sx` prop provided to a custom component with its
own `sx`, like so:

```tsx
import { Box } from '@mantine/core'
import { EmotionSx, mergeSx } from '@mantine/emotion'

interface MyCustomBoxProps {
  sx?: EmotionSx
}

function MyCustomBox({ sx }: MyCustomBoxProps) {
  return (
    <Box sx={mergeSx(theme => ({ ... }), sx)}>...</Box>
  )
}

function App() {
  return (
    <MyCustomBox sx={(theme) => ({ ... })} />
  )
}
```

## styles prop

`styles` prop works similar to `sx` prop, but it allows adding styles to all
nested elements of the components that are specified in the Styles API table.
`styles` prop accepts either an object of styles objects or a function that
receives theme, component props, utilities and returns styles object:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      color="red"
      styles={(theme, { color }, u) => ({
        root: {
          padding: 10,
          backgroundColor: theme.colors[color || 'blue'][7],
          color: theme.white,

          '&:hover': {
            backgroundColor: theme.colors[color || 'blue'][8],
          },
        },

        label: {
          [u.light]: {
            border: `1px solid ${theme.black}`,
          },
          [u.dark]: {
            border: `1px solid ${theme.white}`,
          },
        },
      })}
    >
      Button with styles prop
    </Button>
  );
}
```

## styles in theme

You can add styles to Mantine components with [Styles API](https://mantine.dev/styles/styles-api/) using
Emotion with `styles` prop. Note that to avoid types collisions, you should not use
`Component.extend` method and just pass component configuration object directly.

```tsx
import { createTheme, MantineTheme, TextProps } from '@mantine/core';
import { EmotionHelpers } from '@mantine/emotion';

export const theme = createTheme({
  components: {
    Text: {
      styles: (
        theme: MantineTheme,
        _props: TextProps,
        u: EmotionHelpers
      ) => ({
        root: {
          [u.light]: {
            color: theme.colors.blue[7],
          },
        },
      }),
    },
  },
});
```

## createStyles

`createStyles` function accepts a function to generate styles with [Emotion](https://emotion.sh/).
The function receives 3 arguments that will be described more detailed in the following demos:

* `theme` – [Mantine theme object](https://mantine.dev/theming/theme-object)
* `params` – object with additional parameters that can be passed to the function in `useStyles` hook
* `u` - object with utilities to generate selectors

`createStyles` function returns `useStyles` hook that should be called in the component
that uses given styles:

#### Example: usage

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  wrapper: {
    maxWidth: 400,
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: theme.radius.sm,

    // Use light and dark selectors to change styles based on color scheme
    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[5],
    },

    // Reference theme.breakpoints in smallerThan and largerThan functions
    [u.smallerThan('sm')]: {
      // Child reference in nested selectors via ref
      [`& .${u.ref('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // Assign selector to a ref to reference it in other styles
    ref: u.ref('child'),
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,

    [u.light]: {
      backgroundColor: theme.white,
      color: theme.black,
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[8],
      color: theme.white,
    },
  },
}));

function Demo() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.child}>createStyles demo</div>
    </div>
  );
}
```


### Pseudo-classes

You can add pseudo-classes the same way as in any css-preprocessor like Sass:

#### Example: pseudo

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.blue[6],
    border: 0,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    cursor: 'pointer',
    margin: theme.spacing.md,

    // Use pseudo-classes just like you would in Sass
    '&:hover': {
      backgroundColor: theme.colors.blue[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.violet[6],

      // pseudo-classes can be nested
      '&:hover': {
        backgroundColor: theme.colors.violet[9],
      },
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return (
    <div>
      <button type="button" className={classes.button}>
        First
      </button>
      <button type="button" className={classes.button}>
        Second
      </button>
      <button type="button" className={classes.button}>
        Third
      </button>
    </div>
  );
}
```


### Styles parameters

You can receive any amount of parameters as second argument of `createStyles` function,
latter you will need to pass those parameters as argument to `useStyles` hook:

#### Example: parameters

```tsx
import { createStyles } from '@mantine/emotion';

interface ButtonProps {
  color: 'blue' | 'violet';
  radius: number;
}

const useStyles = createStyles((theme, { color, radius }: ButtonProps) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors[color][6],
    borderRadius: radius,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    border: 0,
    cursor: 'pointer',
  },
}));

function Button({ color, radius }: ButtonProps) {
  const { classes } = useStyles({ color, radius });
  return (
    <button type="button" className={classes.button}>
      {color} button with {radius} radius
    </button>
  );
}

function Demo() {
  return (
    <>
      <Button color="blue" radius={5} />
      <Button color="violet" radius={50} />
    </>
  );
}
```


### Composition and nested selectors

Since `createStyles` produces scoped class names you will need to create a reference to selector
in order to get static selector. Use `u.ref` function to assign static selectors:

#### Example: composition

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  button: {
    // assign reference to selector
    ref: u.ref('button'),

    // and add any other properties
    backgroundColor: theme.colors.blue[6],
    color: theme.white,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    border: 0,
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.xl,

    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[8],
    },

    // reference button with nested selector
    [`&:hover .${u.ref('button')}`]: {
      backgroundColor: theme.colors.violet[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <button className={classes.button} type="button">
        Hover container to change button color
      </button>
    </div>
  );
}
```


### Classes merging (cx function)

To merge class names use `cx` function, it has the same api as [clsx](https://www.npmjs.com/package/clsx) package.

**!important:** Do not use external libraries like [classnames](https://www.npmjs.com/package/classnames)
or [clsx](https://www.npmjs.com/package/clsx) with class names created with `createStyles` function
as it will produce styles collisions.

#### Example: cx

```tsx
import { useState } from 'react';
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  button: {
    border: 0,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    cursor: 'pointer',
    margin: theme.spacing.md,
    lineHeight: 1,

    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[5],
    },
  },

  active: {
    color: theme.white,

    [u.light]: {
      backgroundColor: theme.colors.blue[6],
    },
    [u.dark]: {
      backgroundColor: theme.colors.blue[8],
    },
  },
}));

function Demo() {
  const [active, setActive] = useState(0);
  const { classes, cx } = useStyles();

  return (
    <div>
      <button
        className={cx(classes.button, { [classes.active]: active === 0 })}
        onClick={() => setActive(0)}
        type="button"
      >
        First
      </button>
      <button
        className={cx(classes.button, { [classes.active]: active === 1 })}
        onClick={() => setActive(1)}
        type="button"
      >
        Second
      </button>
    </div>
  );
}
```


### Media queries

You can use nested media queries like in Sass. Within query body you can use `theme.breakpoints`
defined with [MantineProvider](https://mantine.dev/theming/mantine-provider) or just static values:

#### Example: media

```tsx
import { em, getBreakpointValue } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  container: {
    height: 100,
    backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl, theme.breakpoints) - 1)})`]: {
      backgroundColor: theme.colors.pink[6],
    },

    // Simplify media query writing with theme functions
    [u.smallerThan('lg')]: {
      backgroundColor: theme.colors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      backgroundColor: theme.colors.orange[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container} />;
}
```


### Keyframes

#### Example: keyframes

```tsx
import { createStyles, keyframes } from '@mantine/emotion';

// Export animation to reuse it in other components
export const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
  '70%': { transform: 'translate3d(0, -15px, 0)' },
  '90%': { transform: 'translate3d(0, -4px, 0)' },
});

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    animation: `${bounce} 3s ease-in-out infinite`,
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container}>Keyframes demo</div>;
}
```


## Utilities

`sx`, `styles` and `createStyles` callback functions receive `u` object with utilities
to generate selectors. `u` object contains the following properties:

```tsx
const u = {
  light: '[data-mantine-color-scheme="light"] &',
  dark: '[data-mantine-color-scheme="dark"] &',
  rtl: '[dir="rtl"] &',
  ltr: '[dir="ltr"] &',
  notRtl: '[dir="ltr"] &',
  notLtr: '[dir="rtl"] &',
  ref: getStylesRef,
  smallerThan: (breakpoint: MantineBreakpoint | number) =>
    `@media (max-width: ${em(getBreakpointValue(theme, breakpoint) - 0.1)})`,
  largerThan: (breakpoint: MantineBreakpoint | number) =>
    `@media (min-width: ${em(getBreakpointValue(theme, breakpoint))})`,
};
```

All utilities except `ref` can be used as selectors in styles object:

```tsx
const styles = {
  root: {
    [u.dark]: { color: 'white' },
    [u.rtl]: { padding: 10 },
    [u.smallerThan('md')]: { lineHeight: 20 },
  },
};
```


--------------------------------------------------------------------------------

### GlobalStyles

# Global styles

`@mantine/core` package includes some global styles that are required for components to work correctly.
If you override these styles, some components might not work as expected.

Global styles are automatically imported with:

```tsx
import '@mantine/core/styles.css';
```

If you want to import styles [per component](https://mantine.dev/styles/css-files-list), you need to import all global
styles manually:

```tsx
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

## CSS reset

`@mantine/core` package includes minimal CSS reset – it includes only basic styles required for components to work
in modern browsers. If you need to support older browsers, you can additionally include [normalize.css](https://necolas.github.io/normalize.css/)
or any other CSS reset of your choice.

```css
body {
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

input,
button,
textarea,
select {
  font: inherit;
}

button,
select {
  text-transform: none;
}
```

## Body and :root elements styles

`@mantine/core` package includes the following `body` and `:root` elements styles:

```css
:root {
  color-scheme: var(--mantine-color-scheme);
}

body {
  font-family: var(--mantine-font-family);
  font-size: var(--mantine-font-size-md);
  line-height: var(--mantine-line-height);
  background-color: var(--mantine-color-body);
  color: var(--mantine-color-text);

  -webkit-font-smoothing: var(--mantine-webkit-font-smoothing);
  -moz-osx-font-smoothing: var(--mantine-moz-font-smoothing);
}
```

## Static classes

`@mantine/core` package includes the following static classes:

* `mantine-active` – contains `:active` styles
* `mantine-focus-auto` – contains `:focus-visible` styles
* `mantine-focus-always` – contains `:focus` styles
* `mantine-focus-never` – removes default browser focus ring
* `mantine-visible-from-{breakpoint}` – shows element when screen width is greater than breakpoint, for example `mantine-visible-from-sm`
* `mantine-hidden-from-{breakpoint}` – hides element when screen width is greater than breakpoint, for example `mantine-hidden-from-sm`

You can use these classes with any components or elements:

#### Example: globalClasses

```tsx
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <button type="button" className="mantine-focus-auto">
        Focus auto
      </button>
      <button type="button" className="mantine-focus-always">
        Focus always
      </button>
      <button type="button" className="mantine-focus-never">
        Focus never
      </button>
      <button type="button" className="mantine-active">
        Active
      </button>
    </Group>
  );
}
```


## Add global styles in your application

It is recommended to use [CSS modules](https://mantine.dev/styles/css-modules) to apply styles to Mantine components
with `className` prop or with [Styles API](https://mantine.dev/styles/styles-api). CSS modules files names usually
end with `.module.css`, if you want to add global styles to your application, create a file with
`.css` extension but without `.module` part, for example `global.css`.

In global `.css` files you can reference all Mantine [CSS variables](https://mantine.dev/styles/css-variables) and
change styles of `<body />`, `:root` and other elements. For example, to change body background-color:

```css
body {
  background-color: var(--mantine-color-red-filled);
}
```


--------------------------------------------------------------------------------

### MantineStyles

# Mantine styles

This guide explains how to import styles of `@mantine/*` packages in your application
and how to override them with [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
in case you do not have a way to control the order of stylesheets in your application.

## Mantine components styles

All Mantine components are built with CSS modules, but all styles are bundled before publishing to npm.
To include these styles, you need to import `@mantine/{package}/styles.css` file in your application.
Example with `@mantine/core` package:

```tsx
import '@mantine/core/styles.css';
```

By adding this import, you will have all styles of `@mantine/core` components in your application.

## Import styles per component

If you want to reduce CSS bundle size, you can import styles per component. Note that some components
have dependencies, for example, [Button](https://mantine.dev/core/button) component uses [UnstyledButton](https://mantine.dev/core/unstyled-button)
component internally, so you need to import styles for both components. You can find a full list of
exported styles from `@mantine/core` package and additional instructions on [this page](https://mantine.dev/styles/css-files-list).

```tsx
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

Note that individual component styles are available only for `@mantine/core` package.
Other packages have minimal styles that can be imported with `@mantine/{package}/styles.css` import.

## Styles import order

It is important to keep the correct styles import order. `@mantine/core` package
styles must always be imported before any other Mantine package styles:

```tsx
// ✅ Correct order
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
// ❌ Incorrect order
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
```

Your application styles must always be imported after all `@mantine/*` packages styles:

```tsx
// ✅ Correct order - your styles will override Mantine styles
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './Demo.module.css';

// ❌ Incorrect order – Mantine styles will override your styles
import classes from './Demo.module.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
```

## CSS layers

Some bundlers and frameworks do not allow you to control the order of stylesheets in your application.
For example, Next.js does not guarantee [styles import order](https://github.com/vercel/next.js/issues/16630).
In this case, you can use [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to ensure
that your styles will always override Mantine styles.

All `@mantine/*` packages that export styles have an additional file in which all styles are wrapped in
`@layer mantine` directive.

```tsx
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';

// ... other styles
```

These files contain the same styles as `styles.css` files, but wrapped in `@layer mantine` directive.
Make sure that you do not import both `styles.css` and `styles.layer.css` files in your application.

```tsx
// ❌ Do not import both styles.css and styles.layer.css
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
```

Similar to package styles, you can import individual component styles with `@layer mantine` directive:

```tsx
import '@mantine/core/styles/UnstyledButton.layer.css';
import '@mantine/core/styles/Button.layer.css';

// ... other styles
```

## How CSS layers work

CSS rules within a layer are grouped together and applied before rules without a layer. This means that
even if you do not have control over styles import order, you can still override Mantine styles with
regular styles.

```tsx
// ✅ If your styles are not wrapped in @layer directive,
// they will be applied after Mantine styles
import classes from './Demo.module.css';

import '@mantine/core/styles.layer.css';
```

CSS layers are also useful if you want to combine Mantine components with other libraries which also
provide styles. You can use `@layer` directive to control the order of styles:

```scss
@layer base, mantine, components;
```

In this example, Mantine styles will take precedence over other library `base` styles, but other library
`components` styles will take precedence over Mantine component styles.

As of January 2026, CSS layers are supported in all modern browsers and have [95% browser support](https://caniuse.com/css-cascade-layers).

## Loading styles from CDN

You can also load Mantine styles from unpkg CDN. Note that in this case it is
recommended to specify exact version of `@mantine/*` packages both in your
`package.json` and in CDN links.

```html
<!-- Regular styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@7.4.2/styles.css"
/>

<!-- Styles with @layer directive -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@7.4.2/styles.layer.css"
/>
```

Styles on unpkg CDN are available for all Mantine packages that export styles.


--------------------------------------------------------------------------------

### PostCSSPreset

# Mantine PostCSS preset

`postcss-preset-mantine` provides several CSS functions and mixins to help you write styles.
It is not required to use it, but highly recommended. All demos that feature styles
assume that you have this preset installed.

`postcss-preset-mantine` includes the following PostCSS plugins:

* [postcss-nested](https://www.npmjs.com/package/postcss-nested)
* [postcss-mixins](https://www.npmjs.com/package/postcss-mixins) with Mantine specific mixins
* Custom plugin with `em`/`rem` functions

## Installation

Install `postcss-preset-mantine` as a dev dependency:

```bash
yarn add postcss-preset-mantine
```

```bash
npm install postcss-preset-mantine
```

## Usage

Note that setting up PostCSS may be different depending on your build tool/framework, check
a [dedicated framework guide](https://mantine.dev/getting-started) to learn more.
Add `postcss-preset-mantine` to your `postcss.config.cjs` file (usually it is located in the root of your project):

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
  },
};
```

All done! You can now use all the features of the preset.

## rem/em functions

`rem` and `em` functions can be used to convert pixels to rem/em units.
`16px = 1rem` and `16px = 1em`, `em` values are supposed to be used in media queries,
`rem` everywhere else. You can learn more about units conversions in [this guide](https://mantine.dev/styles/rem).

```scss
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

Will be transformed to:

```scss
.demo {
  font-size: calc(1rem * var(--mantine-scale));

  @media (min-width: 20em) {
    font-size: calc(2rem * var(--mantine-scale));
  }
}
```

## Auto convert px to rem

`autoRem` option can be used to automatically convert all pixel values to rem units
in `.css` files:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};
```

This option works similar to `rem` function. The following code:

```scss
.demo {
  font-size: 16px;

  @media (min-width: 320px) {
    font-size: 32px;
  }
}
```

Will be transformed to:

```scss
.demo {
  font-size: calc(1rem * var(--mantine-scale));

  @media (min-width: 320px) {
    font-size: calc(2rem * var(--mantine-scale));
  }
}
```

Note that `autoRem` converts only CSS properties, values in `@media` queries are
not converted automatically – you still need to use `em` function to convert them.

`autoRem` option does not convert values in the following cases:

* Values in `calc()`, `var()`, `clamp()` and `url()` functions
* Values in `content` property
* Values that contain `rgb()`, `rgba()`, `hsl()`, `hsla()` colors

If you want to convert above values to rem units, use `rem` function manually.

## dark and light mixins

`dark` and `light` mixins can be used to create styles that will be applied only in dark or light color scheme.

```scss
.demo {
  @mixin light {
    color: red;
  }

  @mixin dark {
    color: blue;
  }
}
```

Will be transformed to:

```scss
[data-mantine-color-scheme='light'] .demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that usually you do not need to use both `light` and `dark` mixins at the same time.
It is easier to define styles for light color scheme and then use `dark` mixin to override them in dark color scheme.

```scss
.demo {
  // Value for light color scheme
  color: red;

  @mixin dark {
    // Value for dark color scheme
    color: blue;
  }
}
```

To define values for light/dark color scheme on the `:root`/`html` element, use `light-root` and `dark-root` mixins instead:

```scss
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## smaller-than and larger-than mixins

`smaller-than` and `larger-than` mixins can be used to create styles that will be applied only when the screen is smaller or larger than specified breakpoint.

```scss
.demo {
  @mixin smaller-than 320px {
    color: red;
  }

  @mixin larger-than 320px {
    color: blue;
  }
}
```

Will be transformed to:

```scss
// Breakpoint values are converted to em units
// In smaller-than mixin 0.1px is subtracted from breakpoint value
// to avoid intersection with larger-than mixin
@media (max-width: 19.99375em) {
  .demo {
    color: red;
  }
}

@media (min-width: 20em) {
  .demo {
    color: blue;
  }
}
```

You can also use `smaller-than` and `larger-than` mixins with [mantine breakpoints](https://mantine.dev/styles/responsive/#breakpoints-variables-in-css-modules):

```scss
.demo {
  @mixin smaller-than $mantine-breakpoint-sm {
    color: red;
  }

  @mixin larger-than $mantine-breakpoint-sm {
    color: blue;
  }
}
```

## light-dark function

`light-dark` function is an alternative to `light` and `dark` mixins. It accepts two arguments:
first argument is rule that will be applied in light color scheme, second argument is rule that will be applied in dark color scheme.

```css
.demo {
  color: light-dark(red, blue);
}
```

Will be transformed to:

```css
.demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that `light-dark` function does not work on `:root`/`html` element. Use `light-root` and `dark-root` mixins instead:

```scss
// ❌ Does not work
:root {
  --color: light-dark(red, blue);
}

// ✅ Works
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## alpha function

`alpha` function can be used to add alpha channel to color. Note that it uses [color-mix](https://caniuse.com/mdn-css_types_color_color-mix) which is not supported in some older browsers.

```scss
.demo {
  color: alpha(var(--mantine-color-red-4), 0.5);
  border: 1px solid alpha(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(
    in srgb,
    var(--mantine-color-red-4),
    transparent 50%
  );
  border: 1px solid color-mix(in srgb, #ffc, transparent 80%);
}
```

## lighten and darken functions

`lighten` and `darken` functions work similar to `alpha` function, but instead of adding alpha channel they add white or black color to the color with [color-mix](https://caniuse.com/mdn-css_types_color_color-mix).

```scss
.demo {
  color: lighten(var(--mantine-color-red-4), 0.5);
  border: 1px solid darken(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(in srgb, var(--mantine-color-red-4), white 50%);
  border: 1px solid color-mix(in srgb, #ffc, black 20%);
}
```

## hover mixin

`hover` mixin can be used to create styles that will be applied on hover.

```css
.demo {
  @mixin hover {
    color: orange;
  }
}
```

Will be transformed to:

```css
@media (hover: hover) {
  .demo:hover {
    color: orange;
  }
}

@media (hover: none) {
  .demo:active {
    color: orange;
  }
}
```

## rtl/ltr mixins

`rtl` mixin can be used to create styles that will be applied when `dir="rtl"` is set on parent element (usually `<html />`).

```scss
.demo {
  margin-left: 1rem;

  @mixin rtl {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='rtl'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

`ltr` mixin works the same way, but for `dir="ltr"`:

```scss
.demo {
  margin-left: 1rem;

  @mixin ltr {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='ltr'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

## not-rtl/not-ltr mixins

`not-rtl`/`not-ltr` mixins can be used to create styles that will be applied when the direction is set to the opposite value or not set at all.
For example, `not-rtl` styles will be applied when `dir="ltr"` or when `dir` is not set at all.

```scss
.demo {
  @mixin not-rtl {
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
:root:not([dir='rtl']) .demo {
  margin-right: 1rem;
}
```

## where-\* mixins

`where-*` mixins are alternative to `light`, `dark`, `rlt` and `hover` mixins.
They work exactly the same, but produced CSS is less specific. These mixins are
useful when you want to easily override styles, for example, when you are building
a library or extension.

Example of using `where-light` mixin:

```scss
.demo {
  @mixin where-light {
    color: red;
  }
}
```

Will be transformed to:

```scss
:where([data-mantine-color-scheme='light']) .demo {
  color: red;
}
```

## Custom mixins

You can define custom mixins that are not included in the preset by specifying them
in the `mixins` option. To learn about mixins syntax, follow [postcss-mixins documentation](https://github.com/postcss/postcss-mixins#readme).

Example of adding `clearfix` and `circle` mixins:

```tsx
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      mixins: {
        clearfix: {
          '&::after': {
            content: '""',
            display: 'table',
            clear: 'both',
          },
        },
        circle: (_mixin, size) => ({
          borderRadius: '50%',
          width: size,
          height: size,
        }),
      },
    },
    // ... Other plugins
  },
};
```

Then you can use these mixins in your styles:

```scss
.demo {
  @mixin clearfix;
  @mixin circle 100px;
}
```

## Disable specific features

You can disable specific features of the preset by setting them to `false`:

```tsx
module.exports = {
  'postcss-preset-mantine': {
    features: {
      // Turn off `light-dark` function
      lightDarkFunction: false,

      // Turn off `postcss-nested` plugin
      nested: false,

      // Turn off `lighten`, `darken` and `alpha` functions
      colorMixAlpha: false,

      // Turn off `rem` and `em` functions
      remEmFunctions: false,

      // Turn off `postcss-mixins` plugin
      mixins: false,
    },
  },
};
```


--------------------------------------------------------------------------------

### Rem

# rem, em and px units

## rem units

All Mantine components use `rem` units to apply size styles (`margin`, `padding`, `width`, etc.).
By default, `1rem` is considered to be `16px` as it is a default setting in most browsers.
All components scale based on the user's browser font-size settings or font-size of `html`/`:root`.

#### Example: remSlider

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}
```


## rem units scaling

If you want to change font-size of `:root`/`html` element and preserve Mantine components sizes,
set `scale` on [theme](https://mantine.dev/theming/theme-object) to the value of `1 / htmlFontSize`.

For example, if you set `html` font-size to `10px` and want to scale Mantine components accordingly, you need
to set `scale` to `1 / (10 / 16)` (16 – default font-size) = `1 / 0.625` = `1.6`:

```css
:root {
  font-size: 10px;
}
```

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  scale: 1.6,
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## em units

`em` units are used in media queries the same way as `rem` units, but they are not affected by font-size specified on `html`/`:root` element.
`1em` is considered to be `16px`.

## px conversions

You can use numbers in some Mantine components props. Numbers are treated as `px` and converted to `rem`, for example:

```tsx
import { ColorSwatch } from '@mantine/core';

function DemoPx() {
  // Specify ColorSwatch size in px, it will be automatically converted to rem
  // Width and height of ColorSwatch in this case will be 32px / 16 = 2rem
  return <ColorSwatch color="#000" size={32} />;
}

function DemoRem() {
  // This demo will have the same size as previous one
  return <ColorSwatch color="#000" size="2rem" />;
}
```

The same conversion happens in [style props](https://mantine.dev/styles/style-props/):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  // width: calc(2rem * var(--mantine-scale))
  // height: calc(1rem * var(--mantine-scale))
  return <Box w={32} h={16} />;
}
```

## rem and em function

`@mantine/core` package exports `rem` and `em` function that can be used to convert `px` into `rem`/`em`:

```tsx
import { em, rem } from '@mantine/core';

// numbers and values in px are converted to rem
rem(32); // -> calc(2rem * var(--mantine-scale))
em(32); // -> 2em
rem('16px'); // -> calc(1rem * var(--mantine-scale))
em('16px'); // -> 1em

rem('2rem'); // -> 2rem
em('2rem'); // -> 2rem

rem('50%'); // -> 50%
em('50%'); // -> 50%

rem('5vh'); // -> 5vh
em('5vh'); // -> 5vh

// mixed values are converted to rem
rem('16px 2rem'); // -> calc(1rem * var(--mantine-scale)) 2rem
```

## Convert rem to px

To convert `rem`/`em` to `px` use `px` function exported from `@mantine/core`:

```tsx
import { px } from '@mantine/core';

px('2rem'); // -> 32
px('10rem'); // -> 160
```

## rem/em functions in css files

You can use `rem` and `em` function in [css files](https://mantine.dev/styles/css-modules) if
[postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) is installed:

```css
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

## Convert px to rem automatically in css files

To convert `px` to `rem` automatically in css files, enable `autoRem` option in
[postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) configuration:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};
```


--------------------------------------------------------------------------------

### ResponsiveStyles

# Responsive styles

## Media queries

#### Example: responsive

```tsx
// Demo.module.css
.demo {
  background-color: var(--mantine-color-blue-filled);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);
  text-align: center;

  @media (min-width: em(750px)) {
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>Demo</div>;
}
```


## Configure breakpoints

`theme.breakpoints` are used in all responsive Mantine components. Breakpoints are expected to be set in `em` units.
You can configure these values with [MantineProvider](https://mantine.dev/theming/mantine-provider/):

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Default `theme.breakpoints` values:

## Breakpoints variables in CSS modules

It is not possible to use CSS variables inside media queries – these values cannot be dynamically
generated by [MantineProvider](https://mantine.dev/theming/mantine-provider). To use Mantine theme breakpoints
in your `.css` files, you will need `postcss-simple-vars` package:

```bash
yarn add postcss-simple-vars
```

```bash
npm install postcss-simple-vars
```

Add it to your [PostCSS config](https://mantine.dev/styles/postcss-preset) in `postcss.config.cjs`:

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

Then you will be able to access these variables in your `.css` files:

```css
.demo {
  @media (max-width: $mantine-breakpoint-xs) {
    background-color: red;
  }
}
```

Will be transformed to:

```css
@media (max-width: 36em) {
  .demo {
    background-color: red;
  }
}
```

> **Dynamic breakpoints are not supported**
>
> Values that are defined in `postcss-simple-vars` config are static and
> are not connected to the [theme](https://mantine.dev/theming/theme-object) – if values change,
> you will need to update them manually in both theme override and postcss config.

## hiddenFrom and visibleFrom props

All Mantine components that have a root element support `hiddenFrom` and `visibleFrom` props.
These props accept breakpoint (`xs`, `sm`, `md`, `lg`, `xl`) and hide the component when
viewport width is less than or greater than the specified breakpoint:

#### Example: hiddenVisible

```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Button hiddenFrom="sm" color="orange">
        Hidden from sm
      </Button>
      <Button visibleFrom="sm" color="cyan">
        Visible from sm
      </Button>
      <Button visibleFrom="md" color="pink">
        Visible from md
      </Button>
    </Group>
  );
}
```


## Hidden and visible from as classes

If you are building a custom component and want to use the same logic as in `hiddenFrom` and `visibleFrom` props
but you do not want to use Mantine components, you can use `mantine-hidden-from-{x}` and `mantine-visible-from-{x}`
classes.

```tsx
function CustomComponent() {
  return (
    <>
      <div className="mantine-hidden-from-md">Hidden from md</div>
      <div className="mantine-visible-from-xl">Visible from xl</div>
    </>
  );
}
```

## Component size based on media query

Some components support `size` prop, which changes various aspects of component appearance.
`size` prop is not responsive – it is not possible to define different component sizes for different
screen sizes. Instead, you can render multiple components with different sizes and show/hide them
based on media query with `className` or `hiddenFrom`/`visibleFrom` props:

#### Example: sizesMedia

```tsx
// Demo.tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TextInput size="xs" hiddenFrom="sm" label="My input" placeholder="My input" />
      <TextInput size="xl" visibleFrom="sm" label="My input" placeholder="My input" />
    </>
  );
}
```


## use-media-query hook

You can use [use-media-query hook](https://mantine.dev/hooks/use-media-query/) to change some of component props
based on media query. Note that this approach is not recommended for most of the cases if you have
ssr in your application (you use Next.js, React Router, Gatsby or any other framework that includes ssr)
as it may cause hydration mismatch. If you do not have ssr in your application (for example, if you use Vite),
then you can safely use this hook to change props of components or conditionally render components
based on hook return value.

[use-media-query hook](https://mantine.dev/hooks/use-media-query/) can be safely used to change props of components that are not rendered
on server side (modals, tooltips, etc.). In the following example, it is safe to use `useMediaQuery` hook to
change [Tooltip](https://mantine.dev/core/tooltip) props as it is not rendered on server side:

#### Example: useMediaQueryHook

```tsx
import { Tooltip, Button, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```


## use-matches hook

`use-matches` hook exported from `@mantine/core` is an alternative to [use-media-query](https://mantine.dev/hooks/use-media-query/)
if you need to match multiple media queries and values. It accepts an object with media queries as keys and
values at given breakpoint as values.

Note that `use-matches` hook uses the same logic as [use-media-query](https://mantine.dev/hooks/use-media-query/) under the hood,
it is not recommended to be used as a primary source of responsive styles, especially if you have ssr in your application.

In the following example:

* Starting from `theme.breakpoints.lg`, color will be `red.9`
* Between `theme.breakpoints.sm` and `theme.breakpoints.lg`, color will be `orange.9`
* Below `theme.breakpoints.sm`, color will be `blue.9`

#### Example: useMatchesHook

```tsx
import { Box, useMatches } from '@mantine/core';

function Demo() {
  const color = useMatches({
    base: 'blue.9',
    sm: 'orange.9',
    lg: 'red.9',
  });

  return (
    <Box bg={color} c="white" p="xl">
      Box with color that changes based on screen size
    </Box>
  );
}
```


## Container queries

[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
enable you to apply styles to an element based on the size of the element's container.
If, for example, a container has less space available in the surrounding context,
you can hide certain elements or use smaller fonts. Container queries are supported
in [all modern browsers](https://caniuse.com/css-container-queries).

You can use `rem` and `em` functions from [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset/#remem-functions)
in container queries. Note that CSS variables do not work in container queries and because of that
[rem scaling](https://mantine.dev/styles/rem/#rem-units-scaling) feature is not available. If you rely on this feature,
it is better to define breakpoints in `px` units.

#### Example: containers

```tsx
// Demo.module.css
.root {
  min-width: 200px;
  max-width: 100%;
  min-height: 120px;
  container-type: inline-size;
  overflow: auto;
  resize: horizontal;
}

.child {
  background-color: var(--mantine-color-dimmed);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);

  @container (max-width: 500px) {
    background-color: var(--mantine-color-blue-filled);
  }

  @container (max-width: 300px) {
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>Resize parent element to see container query in action</div>
    </div>
  );
}
```


## Responsive style props

You can use object syntax to add responsive styles with [style props](https://mantine.dev/styles/style-props).
Note that responsive style props are [less performant](https://mantine.dev/styles/styles-performance) than regular style props,
it is not recommended to use them in large lists of elements.

#### Example: responsiveStyleProps

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      w={{ base: 200, sm: 400, lg: 500 }}
      py={{ base: 'xs', sm: 'md', lg: 'xl' }}
      bg={{ base: 'blue.7', sm: 'red.7', lg: 'green.7' }}
      c="#fff"
      ta="center"
      mx="auto"
    >
      Box with responsive style props
    </Box>
  );
}
```


Responsive values are calculated the following way:

* `base` value is used when none of breakpoint values are applied
* `xs`, `sm`, `md`, `lg`, `xl` values are used when the viewport width is larger that the value of corresponding breakpoint specified in [theme.breakpoints](https://mantine.dev/styles/responsive/)

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

In this case the element will have the following styles:

```css
/* Base styles added to element and then get overwritten with responsive values */
.element {
  width: 20rem;
}

/* 48em is theme.breakpoints.sm by default */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em is theme.breakpoints.lg by default */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```


--------------------------------------------------------------------------------

### Rtl

# Right-to-left direction

All Mantine components support right-to-left direction out of the box.
You can preview how components work with RTL direction by clicking direction control
in the top right corner or pressing `Ctrl + Shift + L`.

## DirectionProvider

`DirectionProvider` component is used to set direction for all components inside it.
It is required to wrap your application with `DirectionProvider` if you are planning to
either use RTL direction or change direction dynamically.

`DirectionProvider` supports the following props:

```tsx
export interface DirectionProviderProps {
  /** Your application */
  children: React.ReactNode;

  /** Direction set as a default value, `ltr` by default */
  initialDirection?: 'rtl' | 'ltr';

  /** Determines whether direction should be updated on mount based on `dir` attribute set on root element (usually html element), `true` by default  */
  detectDirection?: boolean;
}
```

Setup `DirectionProvider` in your application:

```tsx
import { DirectionProvider, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <DirectionProvider>
      <MantineProvider>{/* Your app here */}</MantineProvider>
    </DirectionProvider>
  );
}
```

## dir attribute

It is required to set `dir` attribute on the root element of your application, usually it is `html` element.
`DirectionProvider` will use its value to set direction on mount if `detectDirection` prop is set to `true`.
Note that this guide does not cover setting `dir` attribute for different frameworks – follow your framework
documentation to learn how to do it.

```html
<!doctype html>
<!-- Set direction attribute on html element -->
<html dir="rtl">
  <head></head>
  <body></body>
</html>
```

## useDirection hook

`useDirection` returns an object with the following properties:

* `dir` – current direction
* `setDirection` – function to set direction
* `toggleDirection` – function to change direction to the opposite value

You can use it to create direction control in your application:

#### Example: directionControl

```tsx
import { ActionIcon, useDirection } from '@mantine/core';
import { IconTextDirectionLtr, IconTextDirectionRtl } from '@tabler/icons-react';

function Demo() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" radius="md" size="lg">
      {dir === 'rtl' ? (
        <IconTextDirectionLtr stroke={1.5} />
      ) : (
        <IconTextDirectionRtl stroke={1.5} />
      )}
    </ActionIcon>
  );
}
```


## rtl mixin

If you have [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) installed then you can use `rtl` mixin in `.css` files:

#### Example: rtlMixin

```tsx
// Demo.module.css
.demo {
  text-align: center;
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);

  /* LTR styles */
  background-color: var(--mantine-color-blue-filled);

  @mixin rtl {
    /* RTL styles override LTR styles */
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>Demo</div>;
}
```



--------------------------------------------------------------------------------

### UsageWithSass

# Usage with Sass

This guide will explain how to use [Sass](https://sass-lang.com/) in combination with
[postcss-preset-mantine](https://mantine.dev/styles/postcss-preset). Note that examples on mantine.dev website
use only `postcss-preset-mantine` – you will need to modify them to use with Sass.

## Sass modules

You can use Sass modules the same way as [CSS modules](https://mantine.dev/styles/css-modules):

* Use `*.module.scss`/`*.module.sass` extension for your files to enable modules
* Use `*.scss`/`*.sass` extension for global styles

## Usage with Vite

Install `sass`:

```bash
yarn add sass-embedded
```

```bash
npm install sass-embedded
```

Add mantine resources in your `vite.config.js` file:

```tsx
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.join(process.cwd(), 'src/_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    },
  },
});
```

Create `src/_mantine.scss` file:

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$mantine-breakpoint-xs: '36em';
$mantine-breakpoint-sm: '48em';
$mantine-breakpoint-md: '62em';
$mantine-breakpoint-lg: '75em';
$mantine-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-mantine-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-mantine-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

All done! you can now use breakpoint variables, `rem` function, `hover`, `light`/`dark` mixins:

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  font-size: mantine.rem(100px);
  font-weight: 900;
  letter-spacing: mantine.rem(-2px);

  @include mantine.light {
    background-color: red;
  }

  @include mantine.dark {
    background-color: blue;
  }

  @include mantine.smaller-than(mantine.$mantine-breakpoint-md) {
    font-size: mantine.rem(50px);
  }
}
```

## Usage with Next.js

Install `sass`:

```bash
yarn add sass-embedded
```

```bash
npm install sass-embedded
```

Add mantine resources in your `next.config.mjs` file:

```tsx
import path from 'node:path';

export default {
  // ...other config
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), '_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
};
```

Create `_mantine.scss` file in the root folder of your project:

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$mantine-breakpoint-xs: '36em';
$mantine-breakpoint-sm: '48em';
$mantine-breakpoint-md: '62em';
$mantine-breakpoint-lg: '75em';
$mantine-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-mantine-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-mantine-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

All done! you can now use breakpoint variables, `rem` function, `hover`, `light`/`dark` mixins:

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  font-size: mantine.rem(100px);
  font-weight: 900;
  letter-spacing: mantine.rem(-2px);

  @include mantine.light {
    background-color: red;
  }

  @include mantine.dark {
    background-color: blue;
  }

  @include mantine.smaller-than(mantine.$mantine-breakpoint-md) {
    font-size: mantine.rem(50px);
  }
}
```


--------------------------------------------------------------------------------

### StyleProps

# Style props

With style props, you can add inline styles to any Mantine component.
Style props add styles to the **root** element, if you need to style nested elements,
use [Styles API](https://mantine.dev/styles/styles-api/) instead.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box mx="auto" maw={400} c="blue.6" bg="#fff">
      Your component
    </Box>
  );
}
```

## Supported props

All Mantine components that have root element support the following style props:

<StylePropsTable />

## Theme values

Some style props can reference values from theme, for example `mt` will use `theme.spacing` value
if you set `xs`, `sm`, `md`, `lg`, `xl`:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* margin-top: theme.spacing.xs */}
      <Box mt="xs" />

      {/* margin-top: theme.spacing.md * -1 */}
      <Box mt="-md" />

      {/* margin-top: auto */}
      <Box mt="auto" />

      {/* margin-top: 1rem */}
      <Box mt={16} />

      {/* margin-top: 5rem */}
      <Box mt="5rem" />
    </>
  );
}
```

In `c`, `bd` and `bg` props you can reference colors from `theme.colors`:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* color: theme.colors.blue[theme.primaryShade] */}
      <Box c="blue" />

      {/* background: theme.colors.orange[1] */}
      <Box bg="orange.1" />

      {/* border: 1px solid theme.colors.red[6] */}
      <Box bd="1px solid red.6" />

      {/* color: if colorScheme is dark `var(--mantine-color-dark-2)`,
      if color scheme is light `var(--mantine-color-gray-6)` */}
      <Box c="dimmed" />

      {/* color: if colorScheme is dark `var(--mantine-color-white)`,
      if color scheme is light `var(--mantine-color-black)` */}
      <Box c="bright" />

      {/* background: #EDFEFF */}
      <Box bg="#EDFEFF" />

      {/* background: rgba(0, 34, 45, 0.6) */}
      <Box bg="rgba(0, 34, 45, 0.6)" />
    </>
  );
}
```

## Responsive styles

You can use object syntax to add responsive styles with style props.
Note that responsive style props are [less performant](https://mantine.dev/styles/styles-performance) than regular style props,
it is not recommended to use them in large lists of elements.

#### Example: responsiveStyleProps

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      w={{ base: 200, sm: 400, lg: 500 }}
      py={{ base: 'xs', sm: 'md', lg: 'xl' }}
      bg={{ base: 'blue.7', sm: 'red.7', lg: 'green.7' }}
      c="#fff"
      ta="center"
      mx="auto"
    >
      Box with responsive style props
    </Box>
  );
}
```


Responsive values are calculated the following way:

* `base` value is used when none of breakpoint values are applied
* `xs`, `sm`, `md`, `lg`, `xl` values are used when the viewport width is larger that the value of corresponding breakpoint specified in [theme.breakpoints](https://mantine.dev/styles/responsive/)

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

In this case the element will have the following styles:

```css
/* Base styles added to element and then get overwritten with responsive values */
.element {
  width: 20rem;
}

/* 48em is theme.breakpoints.sm by default */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em is theme.breakpoints.lg by default */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```


--------------------------------------------------------------------------------

### StyleProp

# Style prop

All Mantine components that have root element support `style` prop.
It works similar to React `style` prop, but with some additional features.

## Style object

You can pass a style object to the `style` prop – in this case it works the same way
as React `style` prop. You can use Mantine [CSS variables](https://mantine.dev/styles/css-variables) in style object
the same way as in [.css files](https://mantine.dev/styles/css-modules).

```tsx
import { Box, rem } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={{
        color: 'var(--mantine-color-red-5)',
        fontSize: rem(12),
      }}
    />
  );
}
```

## Define CSS variables in style prop

You can define CSS variables in the style prop. Note that it only works with Mantine components:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={{ '--radius': '0.5rem', borderRadius: 'var(--radius)' }}
    />
  );
}
```

## Style function

You can pass a style function to the `style` prop – in this case it will be called with [theme](https://mantine.dev/theming/theme-object/).
It is useful when you need to access [theme](https://mantine.dev/theming/theme-object/) properties that are not exposed as [CSS variables](https://mantine.dev/styles/css-variables),
for example, properties from `theme.other`.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={(theme) => ({
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.xs,
      })}
    />
  );
}
```

## Styles array

You can pass an array of style objects and/or functions to `style` prop – in this case, all styles will be merged into one object.
It is useful when you want to create a wrapper around Mantine component, add inline styles and keep the option to pass
`style` prop to it.

```tsx
import { Box, MantineStyleProp } from '@mantine/core';

interface DemoProps {
  style?: MantineStyleProp;
}

function Demo({ style }: DemoProps) {
  return <Box style={[{ color: 'red' }, style]} />;
}
```


--------------------------------------------------------------------------------

### StylesApi

# Styles API

## What is Styles API

The styles API is a set of props and techniques that allows you to customize the style of any element
inside a Mantine component – inline or using the [theme object](https://mantine.dev/theming/theme-object). All Mantine components that
have styles support Styles API.

## Styles API selectors

Every Mantine component that supports the styles API has a set of element names that can be used to
apply styles to inner elements inside the component. For simplicity, these elements names are called
selectors in Mantine documentation. You can find selectors information under the `Styles API` tab
in a component's documentation.

Example of [Button](https://mantine.dev/core/button) component selectors:

<SelectorsTable data={ButtonStylesApi} component="Button" withTableBorder={false} fixedLayout={false} />

You can use these selectors in `classNames` and `styles` in, both, component props and `theme.components`:

```tsx
import { Button, createTheme, MantineProvider } from '@mantine/core';

function ClassNamesDemo() {
  return (
    <Button
      classNames={{
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      }}
    >
      Button
    </Button>
  );
}

function StylesDemo() {
  return (
    <Button
      styles={{
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      }}
    >
      Button
    </Button>
  );
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      },
      styles: {
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      },
    }),
  },
});

function ProviderDemo() {
  return (
    <MantineProvider theme={theme}>
      <Button>Button</Button>
    </MantineProvider>
  );
}
```

## classNames prop

With the `classNames` prop you can add classes to inner elements of Mantine components. It accepts
an object with element names as keys and classes as values:

#### Example: classNames

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```


## classNames in theme.components

You can also define `classNames` in [`theme.components`](https://mantine.dev/theming/theme-object) to apply them to all
components of a specific type:

```tsx
import { useState } from 'react';
import {
  createTheme,
  MantineProvider,
  TextInput,
} from '@mantine/core';
// Styles are the same as in previous example
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: {
        root: classes.root,
        input: classes.input,
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Components CSS variables

Most of Mantine components use CSS variables to define colors, sizes, paddings and other
properties. You can override these values using a custom CSS variables resolver function
in [theme.components](https://mantine.dev/theming/theme-object) or by passing it to the `vars` prop.

You can find CSS variables information under the `Styles API` tab in a component's documentation.
Example of [Button](https://mantine.dev/core/button) component CSS variables:

<VariablesTable data={ButtonStylesApi} withTableBorder={false} fixedLayout={false} />

Example of a custom CSS variables resolver function used to add more sizes to the [Button](https://mantine.dev/core/button) component:

#### Example: vars

```tsx
// MantineProvider.tsx
import { Button, Group, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL Button</Button>
        <Button size="xxs">XXS Button</Button>
      </Group>
    </MantineProvider>
  );
}

// Inline.tsx
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@mantine/core';

const varsResolver: PartialVarsResolver<ButtonFactory> = (theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}
```


## styles prop

The `styles` prop works the same way as `classNames`, but applies inline styles. Note that inline
styles have higher specificity than classes, so you will not be able to override them with classes
without using `!important`. You cannot use pseudo-classes (for example, `:hover`, `:first-of-type`)
and media queries inside the `styles` prop.

#### Example: styles

```tsx
import { Button } from '@mantine/core';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

  return (
    <Button
      radius="md"
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--mantine-spacing-md)',
          paddingRight: 'var(--mantine-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}
```


> **styles prop usage**
>
> Some examples and demos in the documentation use the `styles` prop for convenience, but it is not
> recommended to use the `styles` prop as the primary means of styling components, as the `classNames`
> prop is more flexible and has [better performance](https://mantine.dev/styles/styles-performance).

## Styles API based on component props

You can also pass a callback function to `classNames` and `styles`. This function will receive
[theme](https://mantine.dev/theming/theme-object) as first argument and component props as second. It should return
an object of classes (for `classNames`) or styles (for `styles`).

You can use this feature to conditionally apply styles based on component props. For example,
you can change the [TextInput](https://mantine.dev/core/text-input) label color if the input is required or change the input
background color if the input is wrong:

#### Example: classNamesProps

```tsx
// Demo.tsx
import cx from 'clsx';
import { MantineProvider, createTheme, TextInput } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput required label="Required input" placeholder="Required input" />
      <TextInput error label="Input with error" placeholder="Input with error" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.labelRequired {
  color: var(--mantine-color-red-filled);
}

.inputError {
  background-color: var(--mantine-color-red-light);
}
```


## Static classes

Every component that supports Styles API also includes static classes that can be used to style
component without using `classNames` or `styles` props. By default, static classes have
`.mantine-{ComponentName}-{selector}` format. For example, `root` selector of [Button](https://mantine.dev/core/button)
component will have `.mantine-Button-root` class.

You can use static classes to style a component with CSS or [any other styling solution](https://mantine.dev/styles/css-modules#styling-mantine-components-without-css-modules):

```css
.mantine-Button-root {
  background-color: red;
}
```

The prefix of static classes can be changed with `classNamesPrefix` of [MantineProvider](https://mantine.dev/theming/mantine-provider#classnamesprefix).

## Components classes

Classes of each component are available in the `Component.classes` object. For example, you can
find the classes of [Button](https://mantine.dev/core/button) in `Button.classes`:

You can use these classes to create components with the same styles as Mantine components:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <button type="button" className={Button.classes.root} />;
}
```

## Attributes

You can pass attributes to inner elements of Mantine components using the `attributes` prop.
For example, it can be used to add data attributes for testing purposes:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      attributes={{
        root: { 'data-test-id': 'root' },
        label: { 'data-test-id': 'label' },
        inner: { 'data-test-id': 'inner' },
      }}
    >
      Button
    </Button>
  );
}
```


--------------------------------------------------------------------------------

### StylesOverview

# Styles overview

This guide will help you understand how to apply styles to Mantine and custom components.

## Component specific props

Most of the components provide props that allow you to customize their styles. For example,
[Button](https://mantine.dev/core/button/) component has `color`, `variant`, `size` and `radius` props that control its
appearance:

#### Example: configurator

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button>Button</Button>;
}
```


These props usually control multiple CSS properties, for example `color` and variant props control `color`,
`background-color` and `border` properties. In most cases, changing components props is the most optimal way to customize Mantine components.

## Style props

[Style props](https://mantine.dev/styles/style-props/) work similar to component specific props, but with several differences:

* Style props are not component specific, they can be used with any component.
* Style props always control a single CSS property. For example, `c` prop controls CSS `color` property, while `color` prop controls a set of properties: `color`, `background-color` and `border-color`.
* Style props are set in `style` attribute. It is not possible to override them with CSS without using `!important`.

[Style props](https://mantine.dev/styles/style-props/) are useful when you need to change a single CSS property without creating a separate file for styles.
Some of the most common use cases are:

* Changing text color and font-size

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <div>
      <Text c="blue.8" fz="lg">
        Card title
      </Text>
      <Text c="dimmed" fz="sm">
        Card description
      </Text>
    </div>
  );
}
```

* Applying margins to inputs inside a form:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <form>
      <TextInput label="First name" />
      <TextInput label="Last name" mt="md" />
      <TextInput label="Email" mt="md" />
    </form>
  );
}
```

* Adding padding to various elements:

```tsx
import { Paper } from '@mantine/core';

function Demo() {
  return <Paper p="xl">My custom card</Paper>;
}
```

Note that [style props](https://mantine.dev/styles/style-props/) were never intended to be used
as a primary way of styling components. In most cases, it is better to limit
the number of style props used per component to 3-4. If you find yourself using
more than 4 style props, consider creating a separate file with styles – it
will be easier to maintain and will be more [performant](https://mantine.dev/styles/styles-performance/).

## Style prop

[Style prop](https://mantine.dev/styles/style/) is supported by all Mantine components and allows setting
CSS properties as well as CSS variables. It is useful in the following cases:

* You want to apply a single CSS property to a component:

```tsx
import { Button, Flex } from '@mantine/core';

function Demo() {
  return (
    <Flex>
      <Button style={{ flex: 1 }}>Large button</Button>
      <Button>Small button</Button>
    </Flex>
  );
}
```

* You want to set a CSS variable based on component prop:

```tsx
import { Box } from '@mantine/core';

function Demo({ color }: { color: string }) {
  // Later you will be able to use var(--my-color) in any nested element
  return <Box style={{ '--my-color': color }}>My box</Box>;
}
```

[Style prop](https://mantine.dev/styles/style/) works the same way as React `style` prop. It is not
recommended to use it as a primary way of styling components. In most cases, it is
better to create a separate file with styles – it will be easier to maintain and
will be more [performant](https://mantine.dev/styles/styles-performance/).

## CSS modules

[CSS modules](https://mantine.dev/styles/css-modules/) is the recommended way of applying most of the styles to Mantine components.
CSS modules are the most performant and flexible way of styling components.

```scss
// Demo.module.css

.root {
  padding-right: 100px;

  &[data-collapsed] {
    padding-right: 40px;

    & .control {
      max-width: 200px;
    }
  }
}

.control {
  background-color: var(--mantine-color-blue-1);
  color: var(--mantine-color-blue-filled);
  padding: var(--mantine-spacing-xl);
  margin-left: 40px;

  @media (max-width: $mantine-breakpoint-sm) {
    margin-left: 0;
    margin-top: var(--mantine-spacing-md);
  }

  @mixin hover {
    background-color: light-dark(
      var(--mantine-color-blue-1),
      var(--mantine-color-blue-9)
    );
  }
}
```

```tsx
// Demo.tsx
import classes from './Demo.module.css';

function Demo({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={classes.root}
      data-collapsed={collapsed || undefined}
    >
      <button type="button" className={classes.control}>
        Control
      </button>
    </div>
  );
}
```

## Theme tokens

You can reference Mantine [theme](https://mantine.dev/theming/theme-object/) values in any styles with
[CSS variables](https://mantine.dev/styles/css-variables/):

* In [CSS modules](https://mantine.dev/styles/css-modules/):

```scss
.root {
  // references theme.colors.red[5]
  background: var(--mantine-color-red-5);

  // references theme.spacing.md
  margin-top: var(--mantine-spacing-md);

  // references theme.headings.fontFamily
  font-family: var(--mantine-font-family-headings);
}
```

* In [style props](https://mantine.dev/styles/style-props/):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  // bg="red.5" references theme.colors.red[5]
  // "red.5" is a shorthand for var(--mantine-color-red-5)

  // mt="xl" references theme.spacing.xl
  // "xl" is a shorthand for var(--mantine-spacing-xl)
  return (
    <Box bg="red.5" mt="xl">
      My box
    </Box>
  );
}
```

* In [style prop](https://mantine.dev/styles/style/):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        style={{
          margin: 'var(--mantine-spacing-xl)',
          color: 'var(--mantine-color-orange-5)',
        }}
      >
        With CSS variables
      </Box>

      <Box
        style={(theme) => ({
          margin: theme.spacing.xl,
          color: theme.colors.orange[5],
        })}
      >
        With theme object
      </Box>
    </>
  );
}
```


--------------------------------------------------------------------------------

### StylesPerformance

# Styles performance

## CSS modules

[CSS modules](https://mantine.dev/styles/css-modules) is the most performant way to apply styles –
this approach generates static CSS that is never re-evaluated. 99% of Mantine components
styles are generated with CSS modules – components are optimized out of the box.

In most cases, it is recommended to use [CSS modules](https://mantine.dev/styles/css-modules) to style your components as well.
You can apply styles to HTML elements with `className` prop and to Mantine components with `className`,
`classNames` props.

Applying styles with `className`:

#### Example: className

```tsx
import { Box } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}
```


Applying styles with `classNames` (see [Styles API guide](https://mantine.dev/styles/styles-api) to learn more):

#### Example: classNames

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```


## Inline styles

Inline styles (`style` and `styles` props) are less performant than CSS modules, but still
performant enough to be used in most cases if it is your preferred way of styling in your project.

Inline styles caveats:

* Styles are not reused between components, each component will generate its own styles, for example,
  if you have 100 buttons with the same styles, CSS modules will generate 1 class for all of them,
  inline styles will generate 100 `style` attributes
* If inline styles are overused, it can increase bundle size and output HTML size
* *Not performance related*: inline styles have higher specificity than CSS modules, so if you want
  to override inline styles you will have to use `!important` or use another inline styles

Example of inline styles:

#### Example: styles

```tsx
import { Button } from '@mantine/core';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

  return (
    <Button
      radius="md"
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--mantine-spacing-md)',
          paddingRight: 'var(--mantine-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}
```


## Style props

[Style props](https://mantine.dev/styles/style-props) transform component props into inline styles. Style props have
the same caveats as inline styles, it is not recommended to use them as the primary means of styling
your components. Usually, style props are used to apply 1–3 styles to a component – using them
this way does not impact performance.

## Responsive style props

Responsive [style props](https://mantine.dev/styles/style-props) have worse performance than regular style props
because they require injecting `<style />` tag next to the component. It is fine to use responsive
style props to apply styles to several components, but it is not recommended to use
them in large lists of components, for example, if you have 1000 inputs with responsive margins,
it is better to refactor to use `classNames` prop:

```tsx
import { TextInput } from '@mantine/core';

// Ok, style props are used to apply margin-top property to several components
function StyleProps() {
  return (
    <>
      <TextInput label="Input 1" />
      <TextInput label="Input 2" mt={{ base: 10, md: 20 }} />
      <TextInput label="Input 3" mt={{ base: 10, md: 20 }} />
    </>
  );
}

// Worse, 1000 separate `<style />` tags will be generated
// Better to refactor to use className prop
function StylePropsArray() {
  const inputs = Array(1000)
    .fill(0)
    .map((_, index) => (
      <TextInput
        key={index}
        label={`Input ${index}`}
        mt={{ base: 10, md: 20 }}
      />
    ));

  return <>{inputs}</>;
}
```

## Components responsive props

Some components, like [SimpleGrid](https://mantine.dev/core/simple-grid) and [Grid](https://mantine.dev/core/grid)
rely on the same mechanism as responsive style props to apply styles. The limitations are the same
– it is fine to use these several of these components on a page, but it is not recommended to use
them in large lists of components.


--------------------------------------------------------------------------------

### UnstyledComponents

# Unstyled components

## Using Mantine as a headless UI library

You can use Mantine as a headless UI library. To do that, simply do not import `@mantine/*/styles.css`
in your application. Then you will be able to apply styles to Mantine components using [Styles API](https://mantine.dev/styles/styles-api/)
with a styling solution of your choice.

## HeadlessMantineProvider

`HeadlessMantineProvider` is an alternative to [MantineProvider](https://mantine.dev/theming/mantine-provider)
that should be used when you want to use Mantine as a headless UI library. It removes all
features that are related to Mantine styles:

* Mantine classes are not applied to components
* Inline CSS variables are not added with `style` attribute
* All color scheme related features are removed
* Global styles are not generated

Limitations of `HeadlessMantineProvider`:

* [Color scheme switching](https://mantine.dev/theming/color-schemes/) will not work. If your application has a dark mode, you will need to implement it on your side.
* Props that are related to styles in all components (`color`, `radius`, `size`, etc.) will have no effect.
* Some components that rely on styles will become unusable ([Grid](https://mantine.dev/core/grid), [SimpleGrid](https://mantine.dev/core/simple-grid), [Container](https://mantine.dev/core/container), etc.).
* `lightHidden`/`darkHidden`, `visibleFrom`/`hiddenFrom` props will not work.
* [Style props](https://mantine.dev/styles/style-props/) will work only with explicit values, for example `mt="xs"` will not work, but `mt={5}` will.

To use `HeadlessMantineProvider`, follow [getting started guide](https://mantine.dev/getting-started/) and replace `MantineProvider` with `HeadlessMantineProvider`.
Note that you do not need to use [ColorSchemeScript](https://mantine.dev/theming/color-schemes/#colorschemescript) in your application, it will not have any effect,
you can ignore this part of the guide.

```tsx
import { HeadlessMantineProvider } from '@mantine/core';

function App() {
  return (
    <HeadlessMantineProvider>
      {/* Your application */}
    </HeadlessMantineProvider>
  );
}
```

## unstyled prop

Most of Mantine components support `unstyled` prop that removes library styles from the component and allows you to style it
from scratch. Note that `unstyled` prop is not supported by compound components (`Tabs.Tab`, `Menu.Dropdown`, `Accordion.Control`, etc.)
– it only works on root component (`Tabs`, `Menu`, `Accordion`, etc.).

Unstyled [Tabs](https://mantine.dev/core/tabs) component:

#### Example: unstyled

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" unstyled>
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat">Chat panel</Tabs.Panel>
      <Tabs.Panel value="gallery">Gallery panel</Tabs.Panel>
      <Tabs.Panel value="account">Account panel</Tabs.Panel>
    </Tabs>
  );
}
```


> **Choosing between unstyled prop and headless components**
>
> `unstyled` prop is useful when you want to remove library styles from a single component,
> but keep styles for other components. For example, if [Tabs](https://mantine.dev/core/tabs) component does
> not meet your design system requirements, but all other components do, you can use `unstyled`
> prop to remove styles from Tabs and style it from scratch, while keeping all other components
> styled with Mantine styles.
>
> Note that `unstyled` prop does not remove Mantine library styles from your `.css` bundle –
> it only does not apply them to component with `unstyled` prop.


--------------------------------------------------------------------------------

### VanillaExtract

# Vanilla extract integration

[Vanilla extract](https://vanilla-extract.style/) is a TypeScript CSS preprocessor that generates static CSS files at build time.
It is a great alternative to [CSS Modules](https://mantine.dev/styles/css-modules) if you prefer to write your styles in TypeScript.

## Vanilla extract vs CSS Modules

[Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/styles/css-modules) do the same thing,
but with different syntax. Common features of [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/styles/css-modules):

* Styles are generated at build time – no runtime and performance overhead
* Classes names are scoped to the styles file

Differences between [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/styles/css-modules):

* Vanilla extract styles are type safe
* You can use any JavaScript/TypeScript code in Vanilla extract styles, including [color functions](https://mantine.dev/styles/color-functions)
* With Vanilla extract you do not have access to [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) features like `light-dark` function and `hover` mixin.
  Because of this, you will not be able to copy-paste all demos from Mantine documentation and use them with Vanilla extract.
* Vanilla extract requires additional configuration and setup that may not be available for your build tool/framework.
  Most popular tools like [Next.js](https://nextjs.org/) and [Vite](https://vitejs.dev/) have plugins for Vanilla extract,
  but if you are using something more niche, you might need to configure it yourself.

Note that you can use both [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/styles/css-modules) in the same project,
it will not cause any issues: performance will be the same and the bundle size will not be impacted.

## Installation

Follow the [installation instructions](https://vanilla-extract.style/documentation/getting-started) to install vanilla extract.
Then install `@mantine/vanilla-extract` package, it exports `themeToVars` function to convert Mantine theme to CSS variables:

```bash
yarn add @mantine/vanilla-extract
```

```bash
npm install @mantine/vanilla-extract
```

## Templates

You can use one of the following templates to get started or a reference for your own setup.
Note that all templates include only minimal setup.

<TemplatesList
  name={[
    'vite-vanilla-extract-template',
    'next-vanilla-extract-template',
  ]}
/>

## Theming

Vanilla extract provides [createTheme](https://vanilla-extract.style/documentation/theming/)
function which converts given theme object into CSS variables and assigns them to `:root` or other selector.
You should not use Vanilla extract `createTheme` to generate Mantine theme tokens – all Mantine [theme](https://mantine.dev/theming/theme-object)
properties are already exposed as CSS variables. Instead, use `themeToVars` function from `@mantine/vanilla-extract` package
to create an object with CSS variables from Mantine theme:

```tsx
// theme.ts
import { createTheme } from '@mantine/core';

// Do not forget to pass theme to MantineProvider
export const theme = createTheme({
  fontFamily: 'serif',
  primaryColor: 'cyan',
});
```

```tsx
// theme.css.ts
import { theme } from './theme';
import { themeToVars } from '@mantine/vanilla-extract';

// CSS variables object, can be access in *.css.ts files
export const vars = themeToVars(theme);
```

## Styling

Import `vars` object in `*.css.ts` files to access Mantine [CSS variables](https://mantine.dev/styles/css-variables):

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,
});
```

## rem and em

To convert px to [rem or em](https://mantine.dev/styles/rem) use `rem` and `em` functions from `@mantine/core` package:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const demo = style({
  fontSize: rem(16),

  '@media': {
    [`(min-width: ${em(768)})`]: {
      fontSize: rem(18),
    },
  },
});
```

## light and dark selectors

`vars` object contains `lightSelector` and `darkSelector` properties which can be used to
apply styles only in light or dark color scheme:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,

  selectors: {
    [vars.lightSelector]: {
      backgroundColor: vars.colors.red[5],
      color: vars.colors.white,
    },

    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

Note that usually it is more convenient to use only one of them:
apply styles for light color scheme and then override them for dark color scheme
with `vars.darkSelector` (or vice versa):

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,

  selectors: {
    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

## largerThan and smallerThan

`vars` object contains `largerThan` and `smallerThan` properties which can be used in
`@media` as a shorthand for `min-width` and `max-width`:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.sm,

  '@media': {
    // equivalent to `(min-width: 640px)` converted to em
    // -> `(min-width: 40em)`
    [vars.largerThan(640)]: {
      fontSize: vars.fontSizes.md,
    },

    // equivalent to `(max-width: 640px)` converted to em
    // -> `(max-width: 40em)`
    [vars.smallerThan(640)]: {
      fontSize: vars.fontSizes.xs,
    },

    // You can reference `theme.breakpoints` values
    [vars.largerThan('sm')]: {
      fontSize: vars.fontSizes.md,
    },
  },
});
```

## rtl selector

Use `vars.rtlSelector` to apply styles only in rtl direction:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  paddingRight: vars.spacing.md,

  selectors: {
    [vars.rtlSelector]: {
      paddingLeft: vars.spacing.md,
      paddingRight: 0,
    },
  },
});
```


--------------------------------------------------------------------------------

### VariantsAndSizes

# Variants and sizes

## Adding custom variants

Most of Mantine components support `variant` prop, it can be used in CSS variables resolver,
and it is also exposed as `data-variant="{value}"` attribute on the root element of the component.
The easiest way to add custom variants is to add styles that use `[data-variant="{value}"]`.

Example of adding a new variant to the [Input](https://mantine.dev/core/input) component:

* `underline` variant styles are added
* `filled` variant is a default variant – you do not need to define any additional styles for it

#### Example: customVariant

```tsx
// Demo.tsx
import { Input, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

// It is better to add new variants in theme.components
// This way you will be able to use them in anywhere in the app
const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  }
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Input variant="underline" placeholder="Underline input" />
      <Input variant="filled" placeholder="Filled input" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.input {
  &[data-variant='underline'] {
    border-bottom: 2px solid;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;

    @mixin light {
      border-color: var(--mantine-color-gray-3);
    }

    @mixin dark {
      border-color: var(--mantine-color-dark-3);
    }

    &:focus {
      border-color: var(--mantine-color-blue-filled);
    }
  }
}
```


Note that you can add custom variants to every Mantine component that supports [Styles API](https://mantine.dev/styles/styles-api)
even if there are no variants defined on the library side.

> **Overriding existing variants styles**
>
> Apart from adding new variants, you can also override existing ones, for example, you can change the
> `filled` variant of the [Input](https://mantine.dev/core/input) component with `.input[data-variant="filled"]` selector.

## Custom variants types

You can define types for custom variants by creating `mantine.d.ts` file
in your project and extending `{x}Props` interface with the new variant type.

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

## variantColorResolver

[Button](https://mantine.dev/core/button), [Badge](https://mantine.dev/core/badge), [ActionIcon](https://mantine.dev/core/action-icon) and other
components support custom variants with [variantColorResolver](https://mantine.dev/theming/colors#colors-variant-resolver)
– it supports both changing colors and adding new variants. Note that `theme.variantColorResolver` is
responsible only for colors, if you need to change other properties, use `data-variant` attribute.

#### Example: variantColorsResolver

```tsx
import {
  Button,
  Group,
  MantineProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
      hoverColor: 'var(--mantine-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-9)',
      hover: 'var(--mantine-color-red-8)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <MantineProvider theme={{ variantColorResolver }}>
      <Group>
        <Button color="lime.4" variant="filled">
          Lime filled button
        </Button>

        <Button color="orange" variant="light">
          Orange light button
        </Button>

        <Button variant="danger">Danger button</Button>
      </Group>
    </MantineProvider>
  );
}
```


## Sizes with components CSS variables

You can add custom sizes to any component that supports `size` prop by providing a custom
CSS variables resolver, usually it is done in `theme.components`:

#### Example: vars

```tsx
// MantineProvider.tsx
import { Button, Group, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL Button</Button>
        <Button size="xxs">XXS Button</Button>
      </Group>
    </MantineProvider>
  );
}

// Inline.tsx
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@mantine/core';

const varsResolver: PartialVarsResolver<ButtonFactory> = (theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}
```


## Sizes with data-size attribute

Every component that supports `size` prop exposes it as `data-size="{value}"` attribute on the root element.
You can use it to add custom sizes:

#### Example: dataSize

```tsx
// Demo.tsx
import { Input, createTheme, MantineProvider } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Input placeholder="Size XXL" size="xxl" />
      <Input placeholder="Size XXS" size="xxs" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.wrapper {
  &[data-size='xxl'] {
    & .input {
      padding-left: 28px;
      padding-right: 28px;
      height: 68px;
      font-size: 28px;
    }
  }

  &[data-size='xxs'] {
    & .input {
      padding-left: 10px;
      padding-right: 10px;
      height: 28px;
      font-size: 10px;
    }
  }
}
```


## Sizes with static CSS variables

Mantine components sizes are defined with CSS variables (usually on root element), for example,
[ActionIcon](https://mantine.dev/core/action-icon) component has the following CSS variables:

```css
.root {
  --ai-size-xs: 18px;
  --ai-size-sm: 22px;
  --ai-size-md: 28px;
  --ai-size-lg: 34px;
  --ai-size-xl: 44px;
}
```

You can override these values with [Styles API](https://mantine.dev/styles/styles-api) or add new sizes values:

#### Example: customSize

```tsx
// Demo.tsx
import { ActionIcon, createTheme, Group, MantineThemeProvider } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <IconHeart size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <IconHeart size={32} />
        </ActionIcon>
      </Group>
    </MantineThemeProvider>
  );
}

// Demo.module.css
.root {
  --ai-size-xxs: 16px;
  --ai-size-xxl: 50px;
}
```


Note that some components have more than one CSS variable for size, for example,
the [Button](https://mantine.dev/core/button) component has the following CSS variables:

```css
.root {
  --button-height-xs: 30px;
  --button-height-sm: 36px;
  --button-height-md: 42px;
  --button-height-lg: 50px;
  --button-height-xl: 60px;

  --button-height-compact-xs: 22px;
  --button-height-compact-sm: 26px;
  --button-height-compact-md: 30px;
  --button-height-compact-lg: 34px;
  --button-height-compact-xl: 40px;

  --button-padding-x-xs: 14px;
  --button-padding-x-sm: 18px;
  --button-padding-x-md: 22px;
  --button-padding-x-lg: 26px;
  --button-padding-x-xl: 32px;

  --button-padding-x-compact-xs: 7px;
  --button-padding-x-compact-sm: 8px;
  --button-padding-x-compact-md: 10px;
  --button-padding-x-compact-lg: 12px;
  --button-padding-x-compact-xl: 14px;
}
```

Usually, it is more convenient to use `data-size` attribute or `vars` on [theme](https://mantine.dev/theming/theme-object)
to customize sizes in this case.


--------------------------------------------------------------------------------

