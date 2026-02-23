# THEMING COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## THEMING COMPONENTS AND FEATURES

### ColorSchemes

# Color schemes

[MantineProvider](https://mantine.dev/theming/mantine-provider/) manages color scheme context in your application.
You can configure the default color scheme value with `defaultColorScheme` prop, possible values are `light`,
`dark` and `auto` (system color scheme is used). The default value is `light`.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## data-mantine-color-scheme attribute

When the [MantineProvider](https://mantine.dev/theming/mantine-provider/) is mounted, it sets a `data-mantine-color-scheme`
attribute on the `<html />` element to the value that the user has selected previously or to the value of `defaultColorScheme` prop.
The `data-mantine-color-scheme` attribute is used in all components' styles to determine which colors the component should use.

## use-mantine-color-scheme hook

`useMantineColorScheme` hook can be used to get and set current color scheme value:

```tsx
function useMantineColorScheme(): {
  /** Current color scheme value */
  colorScheme: 'dark' | 'light' | 'auto';

  /** Sets colors scheme to given value */
  setColorScheme: (colorScheme: 'dark' | 'light' | 'auto') => void;

  /** Toggle color scheme to the opposite value, if value is 'auto', color scheme is inferred from the OS settings */
  toggleColorScheme: () => void;

  /** Clears color scheme value from storage and sets it to `defaultColorScheme` */
  clearColorScheme: () => void;
};
```

#### Example: colorScheme

```tsx
import { useMantineColorScheme, Button, Group } from '@mantine/core';

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
```


## use-computed-color-scheme hook

`useComputedColorScheme` returns a computed color scheme value, it returns either `light` or `dark`.
It can be used to implement color scheme toggle logic:

```tsx
import {
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

function Demo() {
  // -> colorScheme is 'auto' | 'light' | 'dark'
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // -> computedColorScheme is 'light' | 'dark', argument is the default value
  const computedColorScheme = useComputedColorScheme('light');

  // Incorrect color scheme toggle implementation
  // If colorScheme is 'auto', then it is not possible to
  // change color scheme correctly in all cases:
  // 'auto' can mean both light and dark
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  // Correct color scheme toggle implementation
  // computedColorScheme is always either 'light' or 'dark'
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };
}
```

## Transitions during color scheme change

By default, transitions on all elements are disabled when color scheme changes to avoid
inconsistent animations. To enable transitions during color scheme change, set `keepTransitions: true`
option on `useMantineColorScheme` hook:

```tsx
import { useMantineColorScheme } from '@mantine/core';

function Demo() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
}
```

## Color scheme value caveats

By default, the color scheme value is stored in local storage, and its value is saved in state
before the component is mounted to avoid flash of inaccurate color scheme. This means that
color scheme value can be different on client and server, as server does not have access
to local storage and always uses the default value.

If you have server side rendering in your application (for example, if you use [Next.js](https://mantine.dev/guides/next) or [React Router](https://mantine.dev/guides/react-router)), then you cannot use `colorScheme`
value in your application to avoid hydration issues. Instead, you can use `dark` and `light`
mixins from [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) to generate styles that will
hide elements based on color scheme value:

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


> **colorScheme for client only applications**
>
> You can safely use `colorScheme` value in client only applications (for example, Vite or create-react-app applications).
> In this case, there is no hydration, and thus hydration error cannot occur.

## ColorSchemeScript

`ColorSchemeScript` component renders script tag that sets `data-mantine-color-scheme` attribute
on `<html />` element to user selected value or to `defaultColorScheme` prop value before
hydration. It is used to avoid flash of inaccurate color scheme in server side rendered applications,
for example [Next.js](https://mantine.dev/guides/next) or [React Router](https://mantine.dev/guides/react-router). Follows framework specific guides
to learn where to render `ColorSchemeScript` component.

You can add any additional props to the `<script />` tag generated by `ColorSchemeScript` component,
for example, you can add [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) attribute:

```tsx
import { ColorSchemeScript } from '@mantine/core';

function Demo() {
  return (
    <ColorSchemeScript
      nonce="8IBTHwOdqNKAWeKl7plt8g=="
      defaultColorScheme="dark"
    />
  );
}
```

## Auto color scheme

Set `defaultColorScheme="auto"` on `MantineProvider` and `ColorSchemeScript` to use system color scheme.
In this case color scheme value will be controlled by the user OS:

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

## Color scheme manager

By default, color scheme value is stored in local storage, but you can implement your own
color scheme manager to store the value in any other external storage.

Color scheme manager must have the following methods:

```tsx
interface MantineColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get: (defaultValue: MantineColorScheme) => MantineColorScheme;

  /** Function to set color scheme value in external storage, for example window.localStorage */
  set: (value: MantineColorScheme) => void;

  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe: (
    onUpdate: (colorScheme: MantineColorScheme) => void
  ) => void;

  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe: () => void;

  /** Function to clear value from external storage */
  clear: () => void;
}
```

Usually, it is better to wrap color scheme manager in a creator function to provide a way to
configure it. Default local storage based color scheme manager example:

```tsx
import {
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
} from '@mantine/core';

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme` by default */
  key?: string;
}

export function localStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        return (
          (window.localStorage.getItem(key) as MantineColorScheme) ||
          defaultValue
        );
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@mantine/core] Local storage color scheme manager was unable to save color scheme.',
          error
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (
          event.storageArea === window.localStorage &&
          event.key === key
        ) {
          isMantineColorScheme(event.newValue) &&
            onUpdate(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
```

Then custom color scheme manager can be passed to [MantineProvider](https://mantine.dev/theming/mantine-provider):

```tsx
import { MantineProvider } from '@mantine/core';
import { localStorageColorSchemeManager } from './localStorageColorSchemeManager';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-color-scheme',
});

function Demo() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Default color scheme

The default color scheme value is used when the user has not selected any color scheme yet.
It is required to be set both on [MantineProvider](https://mantine.dev/theming/mantine-provider/) and
`ColorSchemeScript`. If `defaultColorScheme` is not set, then `light` is used.

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider defaultColorScheme="dark">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

## Force color scheme

You can force the color scheme value to be either `light` or `dark` with `forceColorScheme` prop.
It is required to be set both on [MantineProvider](https://mantine.dev/theming/mantine-provider/) and
`ColorSchemeScript`. If `forceColorScheme` is set, then `defaultColorScheme` and `colorSchemeManager` are ignored.
When `forceColorScheme` is set, it is not possible to change color scheme value with `setColorScheme` function.

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider forceColorScheme="light">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

## lightHidden and darkHidden props

All Mantine components support `lightHidden` and `darkHidden` props that can be used to hide
component in specific color scheme:

#### Example: lightDarkHidden

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Button color="cyan" lightHidden>
        Visible in dark color scheme only
      </Button>

      <Button color="pink" darkHidden>
        Visible in light color scheme only
      </Button>
    </>
  );
}
```


## With disabled JavaScript

If you need to support users with disabled JavaScript, you need to set `data-mantine-color-scheme`
attribute on the `<html />` element manually.

Example with Next.js app router that supports disabled JavaScript:

```tsx
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

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
    <html lang="en" data-mantine-color-scheme="light">
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


--------------------------------------------------------------------------------

### Colors

# Colors

Mantine uses [open-color](https://yeun.github.io/open-color/) in default theme with some additions.
Each color has 10 shades.

Colors are exposed on the [theme object](https://mantine.dev/theming/theme-object) as an array of strings,
you can access color shade by color name and index (0-9), colors with larger index are darker:

```tsx
import { useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.blue[1],
        color: theme.colors.blue[9],
      }}
    >
      This is a blue theme
    </div>
  );
}
```

Colors are also exposed as [CSS variables](https://mantine.dev/styles/css-variables):

```scss
.demo {
  color: var(--mantine-color-red-5);
  background: var(--mantine-color-grape-9);
  border: 1px solid var(--mantine-color-blue-1);
}
```

## Adding extra colors

You can add any number of extra colors to `theme.colors` object.
This will allow you to use them in all components that support `color` prop, for example
[Button](https://mantine.dev/core/button), [Badge](https://mantine.dev/core/badge) and [Switch](https://mantine.dev/core/switch).

#### Example: colorsOverride

```tsx
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button color="ocean-blue">Ocean blue button</Button>
        <Button color="bright-pink" variant="filled">
          Bright pink button
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


> **10 shades per color**
>
> Colors override must include **at least 10 shades per color**. Otherwise, you will get a TypeScript error
> and some variants will not have proper colors. If you only have one color value, you can either
> pick the remaining colors manually or use the [colors generator tool](https://mantine.dev/colors-generator).
>
> You can add more than 10 shades per color: these values will not be used by Mantine components with the default colors resolver,
> but you can still reference them by index, for example, `color="blue.11"`.

## Virtual colors

Virtual color is a special color which values should be different for light and dark color schemes.
To define a virtual color, use `virtualColor` function which accepts an object with the following
properties as a single argument:

* `name` – color name, must be the same as the key in `theme.colors` object
* `light` – a key of `theme.colors` object for light color scheme
* `dark` – a key of `theme.colors` object for dark color scheme

To see the demo in action, switch between light and dark color schemes (`Ctrl + J`):

#### Example: virtualColors

```tsx
// App.tsx
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import { Demo } from './Demo';

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Demo />
    </MantineProvider>
  );
}

// Demo.tsx
import { Box } from '@mantine/core';

export function Demo() {
  return (
    <Box bg="primary" c="white" p="md" fw={700}>
      This box has virtual background color,
      it is pink in dark mode and cyan in light mode
    </Box>
  );
}
```


## colorsTuple

Use `colorsTuple` function to:

* Use single color as the same color for all shades
* Transform dynamic string arrays to Mantine color tuple (the array should still have 10 values)

```tsx
import { colorsTuple, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    custom: colorsTuple('#FFC0CB'),
    dynamic: colorsTuple(
      Array.from({ length: 10 }, (_, index) => '#FFC0CB')
    ),
  },
});
```

## Supported color formats

You can use the following color formats in `theme.colors`:

* HEX: `#fff`, `#ffffff`
* RGB: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`
* HSL: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%, 0.5)`
* OKLCH: `oklch(96.27% 0.0217 238.66)`, `oklch(96.27% 0.0217 238.66 / 0.5)`

Example of adding oklch color to theme:

#### Example: oklch

```tsx
import { MantineProvider, createTheme, Group, Button } from '@mantine/core';

const theme = createTheme({
  colors: {
    'oklch-blue': [
      'oklch(96.27% 0.0217 238.66)',
      'oklch(92.66% 0.0429 240.01)',
      'oklch(86.02% 0.0827 241.66)',
      'oklch(78.2% 0.13 243.83)',
      'oklch(71.8% 0.1686 246.06)',
      'oklch(66.89% 0.1986 248.32)',
      'oklch(62.59% 0.2247 250.29)',
      'oklch(58.56% 0.2209 251.26)',
      'oklch(54.26% 0.2067 251.67)',
      'oklch(49.72% 0.1888 251.59)',
    ],
  }
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button color="oklch-blue">Filled</Button>
        <Button color="oklch-blue" variant="outline">
          Outline
        </Button>
        <Button color="oklch-blue" variant="light">
          Light
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


## primaryColor

`theme.primaryColor` is a key of `theme.colors`, it is used:

* As a default value for most of the components that support `color` prop
* To set default focus ring outline color

#### Example: primaryColor

```tsx
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: {
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Primary button</Button>
        <Button color="blue">Blue button</Button>
      </Group>
    </MantineProvider>
  );
}
```


> **CSS color values at `theme.primaryColor`**
>
> Value of `theme.primaryColor` must be a key of `theme.colors` object. For example, `blue`, `orange` or `green`.
> You cannot assign CSS color values, for example, the following code will throw an error during theme merging:
>
> ```tsx
> import { MantineProvider } from '@mantine/core';
>
> function Demo() {
>   return (
>     <MantineProvider
>       theme={{
>         primaryColor: '#CEFEDC', // This will throw an error
>       }}
>     >
>       {/* Your app here */}
>     </MantineProvider>
>   );
> }
> ```

## primaryShade

`theme.primaryShade` is a number from 0 to 9. It determines which shade will be used for the components that have `color` prop.

#### Example: primaryShadeConfigurator

```tsx
import { MantineProvider, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ primaryShade:  }}>
      <Group>
        <Button>Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="outline">Outline</Button>
      </Group>
    </MantineProvider>
  );
}
```


You can also customize primary shade for dark and light color schemes separately:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ primaryShade: { light: 6, dark: 8 } }}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Color prop

Components that support changing their color have `color` prop. This prop supports the following values:

* Key of `theme.colors`, for example, `blue` or `green`
* Key of `theme.colors` with color index, for example, `blue.5` or `green.9`
* CSS color value, for example, `#fff` or `rgba(0, 0, 0, 0.5)`

#### Example: colorProp

```tsx
import { Group, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm" mb={5} fw={500}>
        Filled variant
      </Text>
      <Group>
        <Button color="cyan">Theme color</Button>
        <Button color="#1D72FE">Hex color</Button>
      </Group>

      <Text size="sm" mb={5} mt="md" fw={500}>
        Light variant
      </Text>
      <Group>
        <Button variant="light" color="cyan">
          Theme color
        </Button>
        <Button variant="light" color="#1D72FE">
          Hex color
        </Button>
      </Group>

      <Text size="sm" mb={5} mt="md" fw={500}>
        Outline variant
      </Text>
      <Group>
        <Button variant="outline" color="cyan">
          Theme color
        </Button>
        <Button variant="outline" color="#1D72FE">
          Hex color
        </Button>
      </Group>
    </>
  );
}
```


## Colors index reference

You can reference colors by index in `color` prop and [style props](https://mantine.dev/styles/style-props), for example `c` prop:

#### Example: colorsIndexConfigurator

```tsx
import { Button, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text c="blue.">Text with blue. color</Text>
      <Button color="cyan.">Button</Button>
    </>
  );
}
```


## Difference between color and c props

`color` prop is used to control multiple CSS properties of the component. These properties can vary across different components,
but usually `color` prop controls `background`, `color` and `border-color` CSS properties. For example,
when you set `color="#C3FF36"` on [Button](https://mantine.dev/core/button) component (with `variant="filled"`), it will set the following CSS properties:

* `background-color` to `#C3FF36`
* `background-color` when button is hovered to `#B0E631` (`#C3FF36` darkened by 10%)
* `color` to `var(--mantine-color-white)`
* `border-color` to `transparent`

`c` is a [style prop](https://mantine.dev/styles/style-props) – it is responsible for setting a single CSS property `color` (color of the text).
You can combine both props to achieve better contrast between text and background. In the following example:

* `color` prop sets all `background: #C3FF36` and `color: var(--mantine-color-white)`
* `c` prop overrides color styles to `color: var(--mantine-color-black)`

#### Example: colorAndCProps

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button color="#C3FF36" c="black">
      Button with color and c props
    </Button>
  );
}
```


## Colors variant resolver

`theme.variantColorResolver` is a function that is used to determine which colors will be used
in different variants in the following components: [Alert](https://mantine.dev/core/alert), [Avatar](https://mantine.dev/core/avatar), [Button](https://mantine.dev/core/button), [Badge](https://mantine.dev/core/badge) and [ActionIcon](https://mantine.dev/core/action-icon).

It accepts an object argument with the following properties:

```tsx
interface VariantColorsResolverInput {
  /** `color` prop passed to component */
  color: MantineColor | undefined;

  /** `variant` prop passed to component */
  variant: string;

  /** `gradient` prop passed to component, used only for gradient variant by default */
  gradient?: MantineGradient;

  /** Theme object */
  theme: MantineTheme;
}
```

`theme.variantColorResolver` must return an object with the following properties:

```tsx
interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
}
```

You can use `theme.variantColorResolver` to customize colors handling by default variants
or to add new variants support:

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


## Colors generation

You can use [colors generator](https://mantine.dev/colors-generator) to generate 10 shades of color based on a single value
or install `@mantine/colors-generator` package to generate dynamic colors in your application:

```bash
yarn add chroma-js @mantine/colors-generator
```

```bash
npm install chroma-js @mantine/colors-generator
```

The package exports `generateColors` function that accepts a color value and returns an array of 10 shades.
Note that `generateColors` function works best with darker colors (blue, violet, red) and may produce
colors with poor contrast for lighter colors (yellow, teal, orange). Usually, it is better to generate
colors in advance to avoid contrast issues.

```tsx
import { generateColors } from '@mantine/colors-generator';
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider
      theme={{
        colors: {
          'pale-blue': generateColors('#375EAC'),
        },
      }}
    >
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Default colors

<ThemeColors />

## Add custom colors types

TypeScript will only autocomplete Mantine's default colors when accessing the theme. To add your custom colors to the MantineColor type, you can use TypeScript module declaration.

```ts
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


#### Styles API

Colors component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Colorswatch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Colorswatch-root | Root element |
| alphaOverlay | .mantine-Colorswatch-alphaOverlay | Overlay with checkerboard pattern |
| shadowOverlay | .mantine-Colorswatch-shadowOverlay | Overlay with inner box-shadow |
| colorOverlay | .mantine-Colorswatch-colorOverlay | Overlay with given color background |
| childrenOverlay | .mantine-Colorswatch-childrenOverlay | Overlay with `children` inside |

**Colorswatch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cs-radius | Controls `border-radius` of all overlays and `root` element |
| root | --cs-size | Controls `width`, `height`, `min-width` and `min-height` of the `root` element |


--------------------------------------------------------------------------------

### DefaultProps

# Default props

You can define default props for every Mantine component by setting `theme.components`.
These props will be used by default by all components of your application unless they are overridden by component props:

#### Example: defaultProps

```tsx
import { MantineProvider, Button, Group, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


## Default props with MantineThemeProvider

You can also use `MantineThemeProvider` to define default props
for a part of your application:

```tsx
import {
  Button,
  createTheme,
  MantineThemeProvider,
} from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <>
      <MantineThemeProvider theme={theme}>
        {/* Part of the app with theme */}
      </MantineThemeProvider>

      {/* Another part without theme */}
    </>
  );
}
```

## Default props for compound components

Some components like [Menu](https://mantine.dev/core/menu/) and [Tabs](https://mantine.dev/core/tabs/) have associated compound components:
`Menu.Item`, `Tabs.List`, etc.. You can add default props to these components by omitting the dot from component name:

```tsx
import {
  createTheme,
  MantineProvider,
  Menu,
  Tabs,
} from '@mantine/core';

const theme = createTheme({
  components: {
    MenuItem: Menu.Item.extend({
      defaultProps: { color: 'red' },
    }),

    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: 'center',
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

## useProps hook

You can use `useProps` hook to add default props support to any custom component.
`useProps` accepts three arguments:

* component name (string) – it is used to connect component with theme
* `defaultProps` – default props on component level – these props are used when default props are not defined on theme
* `props` – props passed to component

#### Example: usePropsHook

```tsx
import { useProps, MantineThemeProvider, createTheme } from '@mantine/core';

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>Default color</CustomComponent>

      <MantineThemeProvider theme={theme}>
        <CustomComponent>Provider color</CustomComponent>
        <CustomComponent color="blue">Prop color</CustomComponent>
      </MantineThemeProvider>
    </div>
  );
}
```


## withProps function

All Mantine components have `withProps` static function that can be used to
add default props to the component:

```tsx
import { IMaskInput } from 'react-imask';
import { Button, InputBase } from '@mantine/core';

const LinkButton = Button.withProps({
  component: 'a',
  target: '_blank',
  rel: 'noreferrer',
  variant: 'subtle',
});

const PhoneInput = InputBase.withProps({
  mask: '+7 (000) 000-0000',
  component: IMaskInput,
  label: 'Your phone number',
  placeholder: 'Your phone number',
});

function Demo() {
  return (
    <>
      {/* You can pass additional props to components created with `withProps` */}
      <LinkButton href="https://mantine.dev">
        Mantine website
      </LinkButton>

      {/* Component props override default props defined in `withProps` */}
      <PhoneInput placeholder="Personal phone" />
    </>
  );
}
```


--------------------------------------------------------------------------------

### MantineProvider

# MantineProvider

`MantineProvider` provides a [theme object](https://mantine.dev/theming/theme-object) context value, manages color scheme
changes and injects [CSS variables](https://mantine.dev/styles/css-variables/). It must be rendered at the root of your
application and should be used only once.

## Usage

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Your theme override here */
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## MantineProvider props

`MantineProvider` supports the following props:

```tsx
interface MantineProviderProps {
  /** Theme override object */
  theme?: MantineThemeOverride;

  /** Used to retrieve/set color scheme value in external storage, by default uses `window.localStorage` */
  colorSchemeManager?: MantineColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `light` by default */
  defaultColorScheme?: MantineColorScheme;

  /** Forces color scheme value, if set, MantineProvider ignores `colorSchemeManager` and `defaultColorScheme` */
  forceColorScheme?: 'light' | 'dark';

  /** CSS selector to which CSS variables should be added, by default variables are applied to `:root` and `:host` */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`, `true` by default */
  withCssVariables?: boolean;

  /** Determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime. `true` by default. */
  deduplicateCssVariables?: boolean;

  /** Function to resolve root element to set `data-mantine-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
  getRootElement?: () => HTMLElement | undefined;

  /** A prefix for components static classes (for example {selector}-Text-root), `mantine` by default */
  classNamesPrefix?: string;

  /** Function to generate nonce attribute added to all generated `<style />` tags */
  getStyleNonce?: () => string;

  /** Function to generate CSS variables based on theme object */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Determines whether components should have static classes, for example, `mantine-Button-root`. `true` by default */
  withStaticClasses?: boolean;

  /** Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work. `true` by default. */
  withGlobalClasses?: boolean;

  /** Environment at which the provider is used, `'test'` environment disables all transitions and portals */
  env?: 'default' | 'test';

  /** Your application */
  children?: React.ReactNode;
}
```

### theme

Pass [theme object](https://mantine.dev/theming/theme-object) override to `theme` prop. It will be merged with the default
theme and used in all components.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### colorSchemeManager

`colorSchemeManager` is used to retrieve and set color scheme value in external storage. By default,
`MantineProvider` uses `window.localStorage` to store color scheme value, but you can pass your own
implementation to `colorSchemeManager` prop. You can learn more about color scheme management in the
[color schemes guide](https://mantine.dev/theming/color-schemes).

```tsx
import {
  localStorageColorSchemeManager,
  MantineProvider,
} from '@mantine/core';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

function Demo() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### defaultColorScheme

`defaultColorScheme` value is used when `colorSchemeManager` cannot retrieve the value from external
storage, for example during server side rendering or when the user hasn't selected a preferred color scheme.
Possible values are `light`, `dark` and `auto`. By default, color scheme value is `light`.
You can learn more about color scheme management in the [color schemes guide](https://mantine.dev/theming/color-schemes).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### cssVariablesSelector

`cssVariablesSelector` is a CSS selector to which [CSS variables](https://mantine.dev/styles/css-variables/) should be added.
By default, variables are applied to `:root` and `:host`. `MantineProvider` generates CSS variables based
on given [theme override](https://mantine.dev/theming/theme-object/) and `cssVariablesResolver`, then these variables are
rendered into `<style />` tag next to your application.
You can learn more about Mantine CSS variables in the [CSS variables guide](https://mantine.dev/styles/css-variables/).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider cssVariablesSelector="html">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### withCssVariables

`withCssVariables` determines whether theme CSS variables should be added to given `cssVariablesSelector`.
By default, it is set to `true`, you should not change it unless you want to manage CSS variables
via `.css` file (Note that in this case you will need to generate all theme tokens
that are not a part of the default theme on your side).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withCssVariables={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### deduplicateCssVariables

`deduplicateCssVariables` determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime.
By default, it is set to `true`. If set to `false`, all Mantine CSS variables will be added in `<style />` tag
even if they have the same value as in the default theme.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider deduplicateCssVariables={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### getRootElement

`getRootElement` is a function that returns the root application (usually `html`) element to set `data-mantine-color-scheme` attribute.
Default value is `() => document.documentElement` which means that `data-mantine-color-scheme`
attribute will be added to `<html />` tag. You can learn more about color scheme management in the
[color schemes guide](https://mantine.dev/theming/color-schemes).

```tsx
import { MantineProvider } from '@mantine/core';

const getRootElement = () =>
  typeof window === 'undefined' ? undefined : document.body;

function Demo() {
  return (
    <MantineProvider getRootElement={getRootElement}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### classNamesPrefix

`classNamesPrefix` is a prefix for components static classes (for example `{selector}-Text-root`).
Default value is `mantine` – all components will have `mantine-` prefix in their **static classes**.

```tsx
import { MantineProvider, Text } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider>
      <Text>Just some text</Text>
    </MantineProvider>
  );
}
```

In this case (default `classNamesPrefix`), [Text](https://mantine.dev/core/text) component will have the following classes:

* `mantine-focus-auto` – global utility class
* `m-3nrA4eL` – component class, usually a random string, with this class library styles are applied
* `mantine-Text-root` – component static class, part of [Styles API](https://mantine.dev/styles/styles-api)

With `classNamesPrefix` you can change only **static class**:

```tsx
import { MantineProvider, Text } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider classNamesPrefix="app">
      <Text>Just some text</Text>
    </MantineProvider>
  );
}
```

Now [Text](https://mantine.dev/core/text) component will have the following classes:

* `mantine-focus-auto` – `classNamesPrefix` does not impact global utility classes – it is static and **cannot be changed**
* `m-3nrA4eL` – `classNamesPrefix` does not impact library class – it is static and **cannot be changed**
* `app-Text-root` – component static class has `classNamesPrefix` instead of `mantine`

### withStaticClasses

`withStaticClasses` determines whether components should have static classes, for example, `mantine-Button-root`.
By default, static classes are enabled, to disable them set `withStaticClasses` to `false`:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withStaticClasses={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### withGlobalClasses

`withGlobalClasses` determines whether global classes should be added with `<style />` tag.
Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work.
By default, global classes are enabled, to disable them set `withGlobalClasses` to `false`. Note that
disabling global classes may break styles of some components.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withGlobalClasses={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### getStyleNonce

`getStyleNonce` is a function to generate [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) attribute added to dynamic generated `<style />` tags.

### cssVariablesResolver

`cssVariablesResolver` is a function to generate CSS variables styles based on the [theme object](https://mantine.dev/theming/theme-object).
You can learn more about Mantine CSS variables in the [CSS variables guide](https://mantine.dev/styles/css-variables#css-variables-resolver).

### env

`env` prop can be used in test environment to disable some features that
might impact tests and/or make it harder to test components:

* transitions that mount/unmount child component with delay
* portals that render child component in a different part of the DOM

To enable test environment, set `env` to `test`:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider env="test">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Note that `env="test"` is indented to be used in test environment only with [Jest](https://mantine.dev/guides/jest) or [Vitest](https://mantine.dev/guides/vitest), do not use it in
the development or production environments. It is also not recommended to be used with
end-to-end testing tools like [Cypress](https://mantine.dev/guides/cypress) or [Playwright](https://mantine.dev/guides/playwright).


--------------------------------------------------------------------------------

### ThemeObject

# Theme object

Mantine theme is an object where your application's colors, fonts, spacing, border-radius and other design tokens are stored.

```tsx
interface MantineTheme {
  /** Controls focus ring styles. Supports the following options:
   *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
   *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
   *  - `never` – focus ring is always hidden (not recommended)
   */
  focusRing: 'auto' | 'always' | 'never';

  /** rem units scale, change if you customize font-size of `<html />` element
   *  default value is `1` (for `100%`/`16px` font-size on `<html />`)
   */
  scale: number;

  /** Determines whether `font-smoothing` property should be set on the body, `true` by default */
  fontSmoothing: boolean;

  /** White color */
  white: string;

  /** Black color */
  black: string;

  /** Object of colors, key is color name, value is an array of at least 10 strings (colors) */
  colors: MantineThemeColors;

  /** Index of theme.colors[color].
   *  Primary shade is used in all components to determine which color from theme.colors[color] should be used.
   *  Can be either a number (0–9) or an object to specify different color shades for light and dark color schemes.
   *  Default value `{ light: 6, dark: 8 }`
   *
   *  For example,
   *  { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
   *  { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
   * */
  primaryShade: MantineColorShade | MantinePrimaryShade;

  /** Key of `theme.colors`, hex/rgb/hsl values are not supported.
   *  Determines which color will be used in all components by default.
   *  Default value – `blue`.
   * */
  primaryColor: string;

  /** Function to resolve colors based on variant.
   *  Can be used to deeply customize how colors are applied to `Button`, `ActionIcon`, `ThemeIcon`
   *  and other components that use colors from theme.
   * */
  variantColorResolver: VariantColorsResolver;

  /** Determines whether text color must be changed based on the given `color` prop in filled variant
   *  For example, if you pass `color="blue.1"` to Button component, text color will be changed to `var(--mantine-color-black)`
   *  Default value – `false`
   * */
  autoContrast: boolean;

  /** Determines which luminance value is used to determine if text color should be light or dark.
   *  Used only if `theme.autoContrast` is set to `true`.
   *  Default value is `0.3`
   * */
  luminanceThreshold: number;

  /** font-family used in all components, system fonts by default */
  fontFamily: string;

  /** Monospace font-family, used in code and other similar components, system fonts by default  */
  fontFamilyMonospace: string;

  /** Controls various styles of h1-h6 elements, used in Typography and Title components */
  headings: {
    fontFamily: string;
    fontWeight: string;
    textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };

  /** Object of values that are used to set `border-radius` in all components that support it */
  radius: MantineRadiusValues;

  /** Key of `theme.radius` or any valid CSS value. Default `border-radius` used by most components */
  defaultRadius: MantineRadius;

  /** Object of values that are used to set various CSS properties that control spacing between elements */
  spacing: MantineSpacingValues;

  /** Object of values that are used to control `font-size` property in all components */
  fontSizes: MantineFontSizesValues;

  /** Object of values that are used to control `line-height` property in `Text` component */
  lineHeights: MantineLineHeightValues;

  /** Object of values that are used to control breakpoints in all components,
   *  values are expected to be defined in em
   * */
  breakpoints: MantineBreakpointsValues;

  /** Object of values that are used to add `box-shadow` styles to components that support `shadow` prop */
  shadows: MantineShadowsValues;

  /** Determines whether user OS settings to reduce motion should be respected, `false` by default */
  respectReducedMotion: boolean;

  /** Determines which cursor type will be used for interactive elements
   * - `default` – cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
   * - `pointer` – sets `cursor: pointer` on interactive elements that do not have these styles by default
   */
  cursorType: 'default' | 'pointer';

  /** Default gradient configuration for components that support `variant="gradient"` */
  defaultGradient: MantineGradient;

  /** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
  activeClassName: string;

  /** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
   *  Overrides `theme.focusRing` property.
   */
  focusClassName: string;

  /** Allows adding `classNames`, `styles` and `defaultProps` to any component */
  components: MantineThemeComponents;

  /** Any other properties that you want to access with the theme objects */
  other: MantineThemeOther;
}
```

## Usage

To customize theme, pass theme override object to [MantineProvider](https://mantine.dev/theming/mantine-provider/) `theme` prop.
Theme override will be deeply merged with the default theme.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  colors: {
    // Add your color
    deepBlue: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
    // or replace default theme color
    blue: [
      '#eef3ff',
      '#dee2f2',
      '#bdc2de',
      '#98a0ca',
      '#7a84ba',
      '#6672b0',
      '#5c68ac',
      '#4c5897',
      '#424e88',
      '#364379',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '36px' },
    },
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

## Theme properties

### autoContrast

`autoContrast` controls whether text color should be changed based on the given `color` prop
in the following components:

* [ActionIcon](https://mantine.dev/core/action-icon) with `variant="filled"` only
* [Alert](https://mantine.dev/core/alert) with `variant="filled"` only
* [Avatar](https://mantine.dev/core/avatar) with `variant="filled"` only
* [Badge](https://mantine.dev/core/badge) with `variant="filled"` only
* [Button](https://mantine.dev/core/button) with `variant="filled"` only
* [Chip](https://mantine.dev/core/chip) with `variant="filled"` only
* [NavLink](https://mantine.dev/core/nav-link) with `variant="filled"` only
* [ThemeIcon](https://mantine.dev/core/theme-icon) with `variant="filled"` only
* [Checkbox](https://mantine.dev/core/checkbox) with `variant="filled"` only
* [Radio](https://mantine.dev/core/radio) with `variant="filled"` only
* [Tabs](https://mantine.dev/core/tabs) with `variant="pills"` only
* [SegmentedControl](https://mantine.dev/core/segmented-control)
* [Stepper](https://mantine.dev/core/stepper)
* [Pagination](https://mantine.dev/core/pagination)
* [Progress](https://mantine.dev/core/progress)
* [Indicator](https://mantine.dev/core/indicator)
* [Timeline](https://mantine.dev/core/timeline)
* [Spotlight](https://mantine.dev/x/spotlight)
* All [@mantine/dates](https://mantine.dev/dates/getting-started) components that are based on [Calendar](https://mantine.dev/dates/calendar) component

`autoContrast` checks whether the given color luminosity is above or below the `luminanceThreshold` value
and changes text color to either `theme.white` or `theme.black` accordingly.

`autoContrast` can be set globally on the theme level or individually for each component via `autoContrast` prop,
except for [Spotlight](https://mantine.dev/x/spotlight) and [@mantine/dates](https://mantine.dev/dates/getting-started) components which only support global theme setting.

#### Example: autoContrast

```tsx
import { Button, Code, Group } from '@mantine/core';

function Demo() {
  return (
    <>
      <Code>autoContrast: true</Code>
      <Group mt="xs" mb="lg">
        <Button color="lime.4" autoContrast>
          Lime.4 button
        </Button>
        <Button color="blue.2" autoContrast>
          Blue.2 button
        </Button>
        <Button color="orange.3" autoContrast>
          Orange.3 button
        </Button>
      </Group>

      <Code>autoContrast: false</Code>
      <Group mt="xs">
        <Button color="lime.4">Lime.4 button</Button>
        <Button color="blue.2">Blue.2 button</Button>
        <Button color="orange.3">Orange.3 button</Button>
      </Group>
    </>
  );
}
```


### luminanceThreshold

`luminanceThreshold` controls which luminance value is used to determine if text color should be light or dark.
It is used only if `theme.autoContrast` is set to `true`. Default value is `0.3`.

#### Example: luminanceThreshold

```tsx
import { Button, createTheme, MantineProvider, Stack } from '@mantine/core';

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: ,
});

function Wrapper(props: any) {
  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color=${
          parseThemeColor({ theme: DEFAULT_THEME, color: props.color }).isThemeColor
            ?
```


### focusRing

`theme.focusRing` controls focus ring styles, it supports the following values:

* `auto` (default and recommended) – focus ring is visible only when the user navigates with keyboard, this is the default browser behavior for native interactive elements
* `always` – focus ring is visible when user navigates with keyboard and mouse, for example, the focus ring will be visible when user clicks on a button
* `never` – focus ring is always hidden, it is not recommended – users who navigate with keyboard will not have visual indication of the current focused element

#### Example: focusRing

```tsx
function Demo() {
  return (
    <>
      <Text>
        Focus ring: <Code>auto</Code>
      </Text>

      <Group mt="xs">
        <Button size="xs">Button 1</Button>
        <Button size="xs">Button 2</Button>
      </Group>

      <MantineThemeProvider inherit theme={{ focusRing: 'always' }}>
        <Text mt="lg">
          Focus ring: <Code>always</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </MantineThemeProvider>

      <MantineThemeProvider inherit theme={{ focusRing: 'never' }}>
        <Text mt="lg">
          Focus ring: <Code>never</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </MantineThemeProvider>
    </>
  );
}
```


### focusClassName

`theme.focusClassName` is a CSS class that is added to elements that have focus styles, for example, [Button](https://mantine.dev/core/button) or [ActionIcon](https://mantine.dev/core/action-icon/).
It can be used to customize focus ring styles of all interactive components except inputs. Note that when `theme.focusClassName` is set, `theme.focusRing` is ignored.



> **:focus-visible selector**
>
> `:focus-visible` selector is supported by more than [91% of browsers](https://caniuse.com/css-focus-visible) (data from April 2023).
> Safari browsers added support for it in version 15.4 (released in March 2022). If you need to support Safari 15.3 and older, you can use [focus-visible polyfill](https://github.com/WICG/focus-visible)
> or provide a [fallback](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#providing_a_focus_fallback) with `:focus` pseudo-class.

### activeClassName

`theme.activeClassName` is a CSS class that is added to elements that have active styles, for example, [Button](https://mantine.dev/core/button) or [ActionIcon](https://mantine.dev/core/action-icon/).
It can be used to customize active styles of all interactive components.



To disable active styles for all components, set `theme.activeClassName` to an empty string:

#### Example: activeClassNameEmpty

```tsx
import { MantineProvider, Button } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </MantineProvider>
  );
}
```


### defaultRadius

`theme.defaultRadius` controls the default `border-radius` property in most components, for example, [Button](https://mantine.dev/core/button) or [TextInput](https://mantine.dev/core/text-input).
You can set to either one of the values from `theme.radius` or a number/string to use exact value. Note that numbers are treated as pixels, but
converted to rem. For example, `theme.defaultRadius: 4` will be converted to `0.25rem`.
You can learn more about rem conversion in the [rem units guide](https://mantine.dev/styles/rem).

#### Example: defaultRadiusConfigurator

```tsx
import { MantineProvider, TextInput, Button } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ defaultRadius: '' }}>
      <Button fullWidth>Button with defaultRadius</Button>
      <TextInput mt="sm" label="TextInput with defaultRadius" placeholder="TextInput with default radius" />
    </MantineProvider>
  );
}
```


### cursorType

`theme.cursorType` controls the default cursor type for interactive elements,
that do not have `cursor: pointer` styles by default. For example, [Checkbox](https://mantine.dev/core/checkbox) and [NativeSelect](https://mantine.dev/core/native-select).

#### Example: cursorType

```tsx
import { MantineProvider, createTheme, Checkbox } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <MantineProvider theme={theme}>
        <Checkbox label="Pointer cursor" mt="md" />
      </MantineProvider>
    </>
  );
}
```


### defaultGradient

`theme.defaultGradient` controls the default gradient configuration for components that support `variant="gradient"`
([Button](https://mantine.dev/core/button), [ActionIcon](https://mantine.dev/core/action-icon), [Badge](https://mantine.dev/core/badge), etc.).

#### Example: defaultGradient

```tsx
import { MantineProvider, createTheme, Button } from '@mantine/core';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </MantineProvider>
  );
}
```


### components

`theme.components` allows to override components [default props](https://mantine.dev/theming/default-props) and styles with `classNames` and `styles` properties.
You can learn more about these features in [default props](https://mantine.dev/theming/default-props) and [Styles API](https://mantine.dev/styles/styles-api) guides.

### other

`theme.other` is an object that can be used to store any other properties that you want to access with the theme objects.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  other: {
    charcoal: '#333333',
    primaryHeadingSize: 45,
    fontWeights: {
      bold: 700,
      extraBold: 900,
    },
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

## Store theme override object in a variable

To store theme override object in a variable, use `createTheme` function:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const myTheme = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

function Demo() {
  return (
    <MantineProvider theme={myTheme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Merge multiple theme overrides

Use `mergeThemeOverrides` function to merge multiple themes into one theme override object:

```tsx
import {
  createTheme,
  MantineProvider,
  mergeThemeOverrides,
} from '@mantine/core';

const theme1 = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

const theme2 = createTheme({
  cursorType: 'pointer',
});

// Note: It is better to to store theme override outside of component body
// to prevent unnecessary re-renders
const myTheme = mergeThemeOverrides(theme1, theme2);

function Demo() {
  return (
    <MantineProvider theme={myTheme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## use-mantine-theme hook

`useMantineTheme` hook returns theme object from [MantineProvider](https://mantine.dev/theming/mantine-provider) context:

```tsx
import { useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();
  return <div style={{ background: theme.colors.blue[5] }} />;
}
```

## Default theme

You can import default theme object from `@mantine/core` package. It includes
all theme properties with default values. When you pass theme override to
[MantineProvider](https://mantine.dev/theming/mantine-provider), it will be deeply merged with
the default theme.

```tsx
import { DEFAULT_THEME } from '@mantine/core';
```

## Access theme outside of components

To access theme outside of components, you need to create a full theme object
(your theme override merged with the default theme).

```tsx
// theme.ts
import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from '@mantine/core';

const themeOverride = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
```

Then you will be able to import it anywhere in your application:

```tsx
import { theme } from './theme';
```


--------------------------------------------------------------------------------

### Typography
Package: @mantine/core
Import: import { Typography } from '@mantine/core';
Description: Styles provider for html content

# Typography

## Change fonts

You can change fonts and other text styles for headings, code and all other components with the following theme properties:

* `theme.fontFamily` – controls font-family in all components except [Title](https://mantine.dev/core/title/), [Code](https://mantine.dev/core/code/) and [Kbd](https://mantine.dev/core/kbd/)
* `theme.fontFamilyMonospace` – controls font-family of components that require monospace font: [Code](https://mantine.dev/core/code/), [Kbd](https://mantine.dev/core/kbd/) and [CodeHighlight](https://mantine.dev/x/code-highlight/)
* `theme.headings.fontFamily` – controls font-family of h1-h6 tags in [Title](https://mantine.dev/core/title/) and [Typography](https://mantine.dev/core/typography/) components, fallbacks to `theme.fontFamily` if not defined

#### Example: fonts

```tsx
import { Button, Code, Title, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Title order={3}>Outfit or sans-serif title</Title>
      <Button>Verdana button</Button>
      <Code>Monaco, Courier Code</Code>
    </MantineProvider>
  );
}
```


## System fonts

By default, Mantine uses system fonts. It means that different devices will display components based on available font,
for example, macOS and iOS users will see [San Francisco font](https://developer.apple.com/fonts/),
Windows users will see [Segoe UI font](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui),
Android users will see [Roboto font](https://fonts.google.com/specimen/Roboto) and so on.
This approach provides a familiar experience to the users and allows avoiding common problems
related to custom fonts loading (layout shift, invisible text, etc.), if you do not have strict
requirements, it is recommended to use system fonts for better performance.

Default values for theme properties:

* Default value for `theme.fontFamily` and `theme.headings.fontFamily` is `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`
* Default value for `theme.fontFamilyMonospace` is `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

## Font sizes

#### Example: fontSizeConfigurator

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text fz="" lh="">
      Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid
      body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest
      and has sharp claws at the tips. There are five specks on its forehead and three teeth on
      either side of its mouth. It has circular eyes with large pseudopupils.
    </Text>
  );
}
```


`theme.fontSizes` property defines font-size values for all Mantine components:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xs: 10,
    sm: 11,
    md: 14,
    lg: 16,
    xl: 20,
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

Default `theme.fontSizes` values:

## Line heights

`theme.lineHeights` property defines line-height values for [Text](https://mantine.dev/core/text) component,
most other components use `theme.lineHeights.md` by default:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
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

Default `theme.lineHeights` values:

## h1-h6 styles

To customize headings styles in [Title](https://mantine.dev/core/title/) and [Typography](https://mantine.dev/core/typography/) components
set `theme.headings`:

```tsx
import { createTheme, MantineProvider, rem } from '@mantine/core';

const theme = createTheme({
  headings: {
    // properties for all headings
    fontWeight: '400',
    fontFamily: 'Roboto',

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontWeight: '100',
        fontSize: 36,
        lineHeight: '1.4',
      },
      h2: { fontSize: 30, lineHeight: '1.5' },
      // ...up to h6
      h6: { fontWeight: '900' },
    },
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

With `theme.headings` you can customize font-size, font-weight and line-height per heading level.
If you need more control over styles, use [:is selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)
with [Styles API](https://mantine.dev/styles/styles-api) to target specific heading level:

#### Example: headingsStyles

```tsx
import { Title, MantineProvider } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Title order={1}>Heading 1</Title>
      <Title order={2}>Heading 2</Title>
      <Title order={3}>Heading 3</Title>
      <Title order={4}>Heading 4</Title>
      <Title order={5}>Heading 5</Title>
      <Title order={6}>Heading 6</Title>
    </MantineThemeProvider>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Typography component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Typography selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Typography-root | Root element |


--------------------------------------------------------------------------------

