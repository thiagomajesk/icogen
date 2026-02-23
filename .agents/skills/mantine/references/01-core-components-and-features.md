# CORE COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## CORE COMPONENTS AND FEATURES
Primary Package: @mantine/core

### Accordion
Package: @mantine/core
Import: import { Accordion } from '@mantine/core';
Description: Divide content into collapsible sections

## Usage

Accordion allows users to expand and collapse sections of content.
It helps manage large amounts of information in a limited space
by showing only the section headers initially and revealing content on interaction.

Accordion is commonly used for:

* FAQ sections: displaying questions as headers with answers revealed on click
* Forms: organizing long forms into sections, for example, personal info, shipping, and payment
* Menus: nested navigation in sidebars or mobile views

#### Example: configurator

```tsx
// Demo.tsx
import { Accordion } from '@mantine/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion defaultValue="Apples">
      {items}
    </Accordion>
  );
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## Change chevron

Use the `chevron` prop to change the chevron icon. When `chevron` is set,
`chevronIconSize` prop is ignored. To remove the chevron icon, use `chevron={null}`.

To customize chevron styles, use [Styles API](https://mantine.dev/styles/styles-api/) with
[data-rotate](https://mantine.dev/styles/data-attributes/) attribute. It is set when the item
is opened if the `disableChevronRotation` prop is not set.

Example of a custom chevron icon with rotation styles:

#### Example: chevron

```tsx
// Demo.module.css
.chevron {
  &[data-rotate] {
    transform: rotate(45deg);
  }
}

.icon {
  width: 16px;
  height: 16px;
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## Custom control label

You can use any React node as a label for `Accordion.Control` component.
When you use nested elements in `Accordion.Control`, it is recommended to
set `aria-label` attribute to make the control accessible for screen readers.

#### Example: label

```tsx
import { Group, Avatar, Text, Accordion } from '@mantine/core';

const charactersList = [
  {
    id: 'bender',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    content: "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: 'carol',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
    content: "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: 'homer',
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    content: 'Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.',
  },
];

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function Demo() {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control aria-label={item.label}>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained" radius="md">
      {items}
    </Accordion>
  );
}
```


## With icons

Use `icon` prop to display any element on the left section of the `Accordion.Control`:

#### Example: icons

```tsx
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons-react';
import { Accordion } from '@mantine/core';

function Demo() {
  return (
    <Accordion variant="filled" radius="md" defaultValue="photos">
      <Accordion.Item value="photos">
        <Accordion.Control
          icon={<IconPhoto size={22} stroke={1.5} color="var(--mantine-color-dimmed)" />}
        >
          Recent photos
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="print">
        <Accordion.Control
          icon={<IconPrinter size={22} stroke={1.5} color="var(--mantine-color-dimmed)" />}
        >
          Print photos
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control
          icon={<IconCameraSelfie size={22} stroke={1.5} color="var(--mantine-color-dimmed)" />}
        >
          Camera settings
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```


## Change transition

To change transition duration, set `transitionDuration` prop:



To disable transitions, set `transitionDuration` to 0:



## Default opened items

For `multiple={false}`, set `defaultValue` as string:

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  // Second item will be opened by default
  return (
    <Accordion defaultValue="item-2">
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

For `multiple={true}`, set `defaultValue` as an array of strings:

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  // Both items are opened by default
  return (
    <Accordion multiple defaultValue={['item-1', 'item-2']}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

## Control opened state

For `multiple={false}`, set `value` as string:

```tsx
import { useState } from 'react';
import { Accordion } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Accordion value={value} onChange={setValue}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

For `multiple={true}`, set `value` as an array of strings:

```tsx
import { useState } from 'react';
import { Accordion } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion multiple value={value} onChange={setValue}>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

## Compose controls

Putting a button or a link inside `Accordion.Control` is a common mistake when
using Accordion. `Accordion.Control` root element is `button`. Putting interactive
elements inside other interactive elements is forbidden – you will receive a DOM
validation error from React if you try to implement the following component:

```tsx
import { Accordion } from '@mantine/core';

// ❌ Incorrect usage: do not do this
function Demo() {
  return (
    <Accordion.Item value="item-1">
      <Accordion.Control>
        <Group>
          <span>Control 1</span>
          <button>My action</button>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>Panel 1</Accordion.Panel>
    </Accordion.Item>
  );
}
```

Instead of putting interactive elements inside the `Accordion.Control`, render them
next to it. For example, you can add [ActionIcon](https://mantine.dev/core/action-icon/) or [Menu](https://mantine.dev/core/menu/)
on the right side of the original control. If you need to display an interactive element
over the `Accordion.Control`, use `position: absolute` instead.

#### Example: sideControls

```tsx
import { Accordion, ActionIcon, AccordionControlProps, Center } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

function AccordionControl(props: AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon size="lg" variant="subtle" color="gray">
        <IconDots size={20} />
      </ActionIcon>
    </Center>
  );
}

function Demo() {
  return (
    <Accordion chevronPosition="left">
      <Accordion.Item value="item-1">
        <AccordionControl>Control 1</AccordionControl>
        <Accordion.Panel>Panel 1</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <AccordionControl>Control 2</AccordionControl>
        <Accordion.Panel>Panel 2</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-3">
        <AccordionControl>Control 3</AccordionControl>
        <Accordion.Panel>Panel 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```


## Disabled items

Set the `disabled` prop on the `Accordion.Control` component to disable it.
When you disable items, users cannot activate them with mouse or keyboard,
and arrow key navigation will skip them:

#### Example: disabled

```tsx
// Demo.tsx
import { Accordion } from '@mantine/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji} disabled={item.value === 'Bananas'}>
        {item.value}
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion maw={400} defaultValue="Apples">
      {items}
    </Accordion>
  );
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## Unstyled Accordion

Set the `unstyled` prop on the Accordion component to remove all non-essential
library styles. Use `unstyled` prop to style the component with
[Styles API](https://mantine.dev/styles/styles-api/) without overriding any styles.

#### Example: unstyled

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  return (
    <Accordion unstyled>
      {/* ... Accordion items */}
    </Accordion>
  );
}
```


#### Example: stylesApi

```tsx
import { Accordion } from '@mantine/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion value="Apples" order={2}>
      {items}
    </Accordion>
  );
}
```


Example of using [Styles API](https://mantine.dev/styles/styles-api/) to customize Accordion styles:

#### Example: customize

```tsx
// Demo.module.css
.root {
  border-radius: var(--mantine-radius-sm);
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
}

.item {
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  border: 1px solid transparent;
  position: relative;
  z-index: 0;
  transition: transform 150ms ease;

  &[data-active] {
    transform: scale(1.03);
    z-index: 1;
    background-color: var(--mantine-color-body);
    border-color: light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4));
    box-shadow: var(--mantine-shadow-md);
    border-radius: var(--mantine-radius-md);
  }
}

.chevron {
  &[data-rotate] {
    transform: rotate(-90deg);
  }
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## TypeScript

`AccordionProps` type exported from `@mantine/core` is a generic, it accepts boolean type that
describes `multiple` state:

```tsx
import type { AccordionProps } from '@mantine/core';

type MultipleAccordionProps = AccordionProps<true>;
type DefaultAccordionProps = AccordionProps<false>;
```

## Accessibility

Accordion component implement [WAI-ARIA accessibility recommendations](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html).

Set `order` on `Accordion` component to wrap accordion controls with `h2`-`h6` headings.
The following example wraps controls with `h3` tags:

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  return <Accordion order={3}>{/* ...items */}</Accordion>;
}
```

Keyboard interactions:


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| chevron | React.ReactNode | - | Custom chevron icon |
| chevronIconSize | string | number | - | Size of the default chevron icon. Ignored when <code>chevron</code> prop is set. |
| chevronPosition | AccordionChevronPosition | - | Position of the chevron relative to the item label |
| chevronSize | string | number | - | Size of the chevron icon container |
| defaultValue | string | string[] | null | - | Uncontrolled component default value |
| disableChevronRotation | boolean | - | If set, chevron rotation is disabled |
| loop | boolean | - | If set, arrow keys loop though items (first to last and last to first) |
| multiple | boolean | - | If set, multiple items can be opened at the same time |
| onChange | (value: AccordionValue<Multiple>) => void | - | Called when value changes, payload type depends on <code>multiple</code> prop |
| order | 2 | 3 | 4 | 5 | 6 | - | Heading order, has no effect on visuals |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| transitionDuration | number | - | Transition duration in ms |
| value | string | string[] | null | - | Controlled component value |


#### Styles API

Accordion component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Accordion selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Accordion-root | Root element |
| item | .mantine-Accordion-item | `Accordion.Item` root element |
| control | .mantine-Accordion-control | `Accordion.Control` root element |
| chevron | .mantine-Accordion-chevron | `Accordion.Control` chevron container element |
| label | .mantine-Accordion-label | `Accordion.Control` label |
| icon | .mantine-Accordion-icon | `Accordion.Control` icon |
| itemTitle | .mantine-Accordion-itemTitle | `Accordion.Control` title (h2-h6) tag |
| panel | .mantine-Accordion-panel | `Accordion.Panel` root element |
| content | .mantine-Accordion-content | Wrapper element of `Accordion.Panel` `children` |

**Accordion CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --accordion-chevron-size | Controls chevron container element `width` and `min-width` |
| root | --accordion-radius | Controls `border-radius` in various elements, depending on variant |
| root | --accordion-transition-duration | Controls all animations `transition-duration` |


--------------------------------------------------------------------------------

### ActionIcon
Package: @mantine/core
Import: import { ActionIcon } from '@mantine/core';
Description: Icon button

## Usage

#### Example: usage

```tsx
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

function Demo() {
  return (
    <ActionIcon aria-label="Settings">
      <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
```


<Gradient component="ActionIcon" />

## Gradient

ActionIcon supports Mantine color format in color prop. Color can be specified as:
- Mantine color name (e.g., 'blue')
- CSS color value (e.g., '#fff', 'rgba(255, 255, 255, 0.8)')
- Gradient string (e.g., 'linear-gradient(45deg, blue, red)')

#### Example: gradient

```tsx
import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
    >
      <IconHeart />
    </ActionIcon>
  );
}
```


## Size

You can use any valid CSS value in `size` prop, it is used to set `width`, `min-width`, `min-height` and `height`
properties. Note that `size` prop does not control child [icon](https://mantine.dev/guides/icons) size, you need to
set it manually on icon component. When `size` is a number, the value is treated as `px` units and
converted to [rem](https://mantine.dev/styles/rem) units.

#### Example: size

```tsx
import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <IconHeart size={24} />
    </ActionIcon>
  );
}
```


If you want `ActionIcon` to have the same size as Mantine inputs, use `size="input-sm"` prop:

#### Example: inputSize

```tsx
import { ActionIcon, Group, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <TextInput placeholder="sm size input" size="sm" />
      <ActionIcon size="input-sm" variant="default" aria-label="ActionIcon the same size as inputs">
        SM
      </ActionIcon>
    </Group>
  );
}
```


## Disabled state

To make `ActionIcon` disabled set `disabled` prop, this will prevent any interactions with the button
and add disabled styles. If you want the button to just look disabled but still be interactive,
set `data-disabled` prop instead. Note that disabled styles are the same for all variants.

#### Example: disabled

```tsx
import { ActionIcon, Group } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <IconHeart />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <IconHeart />
      </ActionIcon>
    </Group>
  );
}
```


## Disabled state when ActionIcon is link

`<a />` element does not support `disabled` attribute. To make `ActionIcon` disabled when it is
rendered as a link, set `data-disabled` attribute instead and prevent default behavior in
`onClick` event handler.

#### Example: disabledLink

```tsx
import { ActionIcon } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="https://mantine.dev"
      data-disabled
      size="xl"
      aria-label="Open in a new tab"
      onClick={(event) => event.preventDefault()}
    >
      <IconExternalLink />
    </ActionIcon>
  );
}
```


## Customize disabled styles

To customize disabled styles, it is recommended to use both `&:disabled` and `&[data-disabled]`
selectors:

* `&:disabled` is used to style the button when `disabled` prop is set and
  also when the button is disabled by the parent component (for example, when `disabled` prop is set on a
  `<fieldset />` element which contains `ActionIcon`).
* `&[data-disabled]` is used to style the button when it is not actually disabled but should look like
  it is (for example, `data-disabled` should be used if you need to use [Tooltip](https://mantine.dev/core/tooltip) with disabled `ActionIcon`
  or when `ActionIcon` is used as a link)

#### Example: disabledStyles

```tsx
// Demo.module.css
.button {
  &:disabled,
  &[data-disabled] {
    border-color: light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
    background-color: transparent;
  }
}

// Demo.tsx
import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <IconHeart />
    </ActionIcon>
  );
}
```


## Disabled button with Tooltip

`onMouseLeave` event [is not triggered](https://github.com/facebook/react/issues/18753) when `ActionIcon` is disabled, so if you need to use
[Tooltip](https://mantine.dev/core/tooltip) with disabled `ActionIcon` you need to set `data-disabled` prop on `ActionIcon`
instead of `disabled`. Note that it is also required to change `onClick` event handler to
`(event) => event.preventDefault()` as `ActionIcon` is not actually disabled and will still trigger
`onClick` event.

#### Example: disabledTooltip

```tsx
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <ActionIcon size="xl" data-disabled onClick={(event) => event.preventDefault()}>
        <IconHeart />
      </ActionIcon>
    </Tooltip>
  );
}
```


## Loading state

When `loading` prop is set, `ActionIcon` will be disabled and [Loader](https://mantine.dev/core/loader) with overlay will be rendered
in the center of the button. [Loader](https://mantine.dev/core/loader) color depends on `ActionIcon` variant.

#### Example: loading

```tsx
import { ActionIcon, Group, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading}>
          <IconHeart size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading}>
          <IconHeart size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading}>
          <IconHeart size={18} stroke={1.5} />
        </ActionIcon>
      </Group>

      <Switch checked={loading} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}
```


## Loader props

You can customize [Loader](https://mantine.dev/core/loader) with `loaderProps` prop, it accepts all props that
[Loader](https://mantine.dev/core/loader) component has:

#### Example: loaderProps

```tsx
import { ActionIcon } from '@mantine/core';

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} />;
}
```


## Add custom variants

To add new `ActionIcon` variants, use [data-variant](https://mantine.dev/styles/variants-sizes) attribute.
Usually new variants are added on [theme](https://mantine.dev/theming/theme-object), this way they are
available in all `ActionIcon` components in your application.

#### Example: customVariant

```tsx
// Demo.tsx
import { Group, ActionIcon, MantineProvider, createTheme } from '@mantine/core';
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
    <MantineProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xl" variant="danger" aria-label="Danger variant">
          <IconHeart />
        </ActionIcon>
        <ActionIcon size="xl" variant="primary" aria-label="Primary variant">
          <IconHeart />
        </ActionIcon>
      </Group>
    </MantineProvider>
  );
}

// Demo.module.css
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
```


## Customize variants colors

You can customize colors for `ActionIcon` and other components variants by adding
[variantColorResolver](https://mantine.dev/theming/colors#colors-variant-resolver) to your theme.

#### Example: variantColorsResolver

```tsx
import { IconPhoto, IconFingerprint, IconError404 } from '@tabler/icons-react';
import {
  ActionIcon,
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
        <ActionIcon color="lime.4" variant="filled">
          <IconPhoto size={20} />
        </ActionIcon>

        <ActionIcon color="orange" variant="light">
          <IconFingerprint size={20} />
        </ActionIcon>

        <ActionIcon variant="danger">
          <IconError404 size={20} />
        </ActionIcon>
      </Group>
    </MantineProvider>
  );
}
```


<AutoContrast component="ActionIcon" />

## autoContrast

ActionIcon supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on ActionIcon or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ActionIcon aria-label="default action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
      <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
    </Group>
  );
}
```


## Add custom sizes

`ActionIcon` sizes are defined by `--ai-size-{x}` CSS variables. The easiest way to add new sizes is to
define additional `--ai-size-{x}` variables on the `root` element:

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


## ActionIcon.Group

#### Example: group

```tsx
import { ActionIcon } from '@mantine/core';
import { IconPhoto, IconSettings, IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <ActionIcon.Group>
      <ActionIcon variant="default" size="lg" aria-label="Gallery">
        <IconPhoto size={20} stroke={1.5} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Settings">
        <IconSettings size={20} stroke={1.5} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Likes">
        <IconHeart size={20} stroke={1.5} />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
```


Note that you must not wrap child `ActionIcon` components with any additional elements:

```tsx
import { ActionIcon } from '@mantine/core';

// Will not work correctly
function Demo() {
  return (
    <ActionIcon.Group>
      <div>
        <ActionIcon>This will not work</ActionIcon>
      </div>
      <ActionIcon>ActionIcons will have incorrect borders</ActionIcon>
    </ActionIcon.Group>
  );
}
```

## ActionIcon.GroupSection

Use `ActionIcon.GroupSection` component to render sections that are not `ActionIcon` inside `ActionIcon.Group`:

#### Example: groupSection

```tsx
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <ActionIcon.Group>
      <ActionIcon variant="default" size="lg" radius="md" onClick={decrement}>
        <IconChevronDown color="var(--mantine-color-red-text)" />
      </ActionIcon>
      <ActionIcon.GroupSection variant="default" size="lg" bg="var(--mantine-color-body)" miw={60}>
        {value}
      </ActionIcon.GroupSection>
      <ActionIcon variant="default" size="lg" radius="md" onClick={increment}>
        <IconChevronUp color="var(--mantine-color-teal-text)" />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
```


<Polymorphic defaultElement="button" changeToElement="a" component="ActionIcon" withNext />

## Polymorphic component

ActionIcon is a polymorphic component – its default root element is button, but it can be changed to any other element or component with component prop:

```tsx
import { ActionIcon } from '@mantine/core';

function Demo() {
  return <ActionIcon component="a" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { ActionIcon } from '@mantine/core';

function Demo() {
  return <ActionIcon component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, ActionIconProps does not extend React.ComponentPropsWithoutRef<'button'> although button is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

<GetElementRef component="ActionIcon" refType="button" />

## Get element ref

```tsx
import { useRef } from 'react';
import { ActionIcon } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <ActionIcon ref={ref} />;
}
```

## Accessibility

To make `ActionIcon` accessible for screen readers, you need to either set `aria-label` or
use [VisuallyHidden](https://mantine.dev/core/visually-hidden) component:

```tsx
import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <ActionIcon aria-label="Like post">
        <IconHeart />
      </ActionIcon>

      <ActionIcon>
        <VisuallyHidden>Like post</VisuallyHidden>
        <IconHeart />
      </ActionIcon>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Icon element |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color. |
| disabled | boolean | - | Sets <code>disabled</code> attribute, prevents interactions |
| gradient | MantineGradient | - | Gradient values used with <code>variant="gradient"</code>. |
| loaderProps | LoaderProps | - | Props passed down to the <code>Loader</code> component. Ignored when <code>loading</code> prop is not set. |
| loading | boolean | - | If set, <code>Loader</code> component is displayed instead of the <code>children</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| size | number | MantineSize | (string & {}) | "input-xs" | "input-sm" | "input-md" | "input-lg" | "input-xl" | - | Controls width and height of the button. Numbers are converted to rem. |


#### Styles API

ActionIcon component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ActionIcon selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ActionIcon-root | Root element |
| loader | .mantine-ActionIcon-loader | `Loader` component, rendered inside root element when `loading` prop is set |
| icon | .mantine-ActionIcon-icon | Inner icon wrapper |

**ActionIcon CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ai-bg | Controls `background` |
| root | --ai-hover | Controls `background` when hovered |
| root | --ai-bd | Controls `border` |
| root | --ai-color | Controls icon `color` |
| root | --ai-hover-color | Controls icon `color` when hovered |
| root | --ai-radius | Controls `border-radius` |
| root | --ai-size | Controls `width`, `height`, `min-width` and `min-height` styles |

**ActionIcon data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-disabled | - | - |

**ActionIcon.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-ActionIconGroup-group | Root element |

**ActionIcon.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|

**ActionIcon.Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| group | data-orientation | - | Value of  |


--------------------------------------------------------------------------------

### Affix
Package: @mantine/core
Import: import { Affix } from '@mantine/core';
Description: Renders children inside portal at fixed position

## Usage

`Affix` renders a div element with a fixed position inside the [Portal](https://mantine.dev/core/portal) component.
Use it to display elements fixed at any position on the screen, for example, scroll to top button:

#### Example: usage

```tsx
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition } from '@mantine/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Text ta="center">Affix is located at the bottom of the screen, scroll to see it</Text>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| portalProps | BasePortalProps | - | Props passed down to the <code>Portal</code> component. Ignored when <code>withinPortal</code> is <code>false</code>. |
| position | AffixPosition | - | Affix position on screen |
| withinPortal | boolean | - | Determines whether the component is rendered within <code>Portal</code> |
| zIndex | React.CSSProperties["zIndex"] | - | Root element <code>z-index</code> property |


#### Styles API

Affix component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Affix selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Affix-root | Root element |

**Affix CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --affix-z-index | Controls `z-index` property |
| root | --affix-top | Controls `top` property |
| root | --affix-bottom | Controls `bottom` property |
| root | --affix-left | Controls `left` property |
| root | --affix-right | Controls `right` property |


--------------------------------------------------------------------------------

### Alert
Package: @mantine/core
Import: import { Alert } from '@mantine/core';
Description: Attract user attention with important static message

## Usage

#### Example: configurator

```tsx
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

function Demo() {
  const icon = <IconInfoCircle />;
  return (
    <Alert icon={icon}>
      {{children}}
    </Alert>
  );
}
```


#### Example: stylesApi

```tsx
import { Alert } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './Demo.module.css';

function Demo() {
  const icon = <IconHeart />;

  return (
    <Alert title="Alert title" icon={icon} withCloseButton>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt corporis natus veniam quis
      cupiditate enim architecto mollitia numquam temporibus, consectetur nam laboriosam voluptates
      nemo facilis? Exercitationem aut praesentium quibusdam reiciendis.
    </Alert>
  );
}
```


## Accessibility

* Root element role set to `alert`
* `aria-describedby` set to body element id, `aria-labelledby` set to title element id if `title` is provided
* Set `closeButtonLabel` prop to make close button accessible

```tsx
import { Alert } from '@mantine/core';

function Invalid() {
  // -> not ok
  return <Alert withCloseButton />;
}

function Valid() {
  // -> ok
  return <Alert withCloseButton closeButtonLabel="Dismiss" />;
}

function AlsoValid() {
  // -> ok, without close button, closeButtonLabel is not needed
  return <Alert />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| closeButtonLabel | string | - | Close button <code>aria-label</code> |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |
| icon | React.ReactNode | - | Icon displayed next to the title |
| onClose | () => void | - | Called when the close button is clicked |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| title | React.ReactNode | - | Alert title |
| withCloseButton | boolean | - | Determines whether close button should be displayed |


#### Styles API

Alert component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Alert selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Alert-root | Root element |
| wrapper | .mantine-Alert-wrapper | Wrapper around `body` and `icon` |
| body | .mantine-Alert-body | Body element, contains `title` and `message` |
| title | .mantine-Alert-title | Title element, contains `label` and `icon` |
| label | .mantine-Alert-label | Title label |
| message | .mantine-Alert-message | Alert message |
| icon | .mantine-Alert-icon | Icon element |
| closeButton | .mantine-Alert-closeButton | Close button |

**Alert CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --alert-bd | Controls `border` |
| root | --alert-bg | Controls `background` |
| root | --alert-color | Controls `color` |
| root | --alert-radius | Controls `border-radius` |

**Alert data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| title | data-with-close-button | - | - |


--------------------------------------------------------------------------------

### Anchor
Package: @mantine/core
Import: import { Anchor } from '@mantine/core';
Description: Display link with theme styles

## Usage

#### Example: usage

```tsx
import { Anchor } from '@mantine/core';

function Demo() {
  return (
    <Anchor href="https://mantine.dev/" target="_blank">
      Anchor component
    </Anchor>
  );
}
```


## Underline

Use `underline` prop to configure `text-decoration` property. It accepts the following values:

* `always` - link is always underlined
* `hover` - link is underlined on hover
* `never` - link is never underlined
* `not-hover` - link is underlined when not hovered

#### Example: decoration

```tsx
import { Anchor, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="https://mantine.dev/" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}
```


You can also configure `underline` prop for all `Anchor` components with [default props](https://mantine.dev/theming/default-props):

```tsx
import { Anchor, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'always',
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

## Text props

`Anchor` components supports all [Text](https://mantine.dev/core/text) component props.
For example, you can use gradient variant:

#### Example: textProps

```tsx
import { Anchor } from '@mantine/core';

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}
```


<Polymorphic defaultElement="a" changeToElement="button" component="Anchor" withNext />

## Polymorphic component

Anchor is a polymorphic component – its default root element is a, but it can be changed to any other element or component with component prop:

```tsx
import { Anchor } from '@mantine/core';

function Demo() {
  return <Anchor component="button" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Anchor } from '@mantine/core';

function Demo() {
  return <Anchor component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, AnchorProps does not extend React.ComponentPropsWithoutRef<'a'> although a is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

<GetElementRef component="Anchor" refType="a" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Anchor } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLAnchorElement>(null);
  return <Anchor ref={ref} />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | @deprecated Use <code>c</code> prop instead |
| gradient | MantineGradient | - | Gradient configuration, ignored when <code>variant</code> is not <code>gradient</code> |
| inherit | boolean | - | Determines whether font properties should be inherited from the parent |
| inline | boolean | - | Sets <code>line-height</code> to 1 for centering |
| lineClamp | number | - | Number of lines after which Text will be truncated |
| size | MantineSize | (string & {}) | - | Controls <code>font-size</code> and <code>line-height</code> |
| truncate | TextTruncate | - | Side on which Text must be truncated, if <code>true</code>, text is truncated from the start |
| underline | "always" | "hover" | "not-hover" | "never" | - | Defines when <code>text-decoration: underline</code> styles are applied. |


--------------------------------------------------------------------------------

### AngleSlider
Package: @mantine/core
Import: import { AngleSlider } from '@mantine/core';
Description: Pick angle value between 0 and 360

## Usage

Use `AngleSlider` component to pick angle value between 0 and 360:

#### Example: usage

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" />;
}
```


## Controlled

`AngleSlider` value is a number between 0 and 360.

```tsx
import { useState } from 'react';
import { AngleSlider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(180);
  return <AngleSlider value={value} onChange={setValue} />;
}
```

## formatLabel

Use the `formatLabel` prop to change the angle label format.
It accepts a function that takes the angle value and returns a React node:

#### Example: formatLabel

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => `${value}°`} />;
}
```


## Marks

Set the `marks` prop to display marks on the slider.
Mark is an object of value (required, number between 0 and 360) and label (optional, React node).
To restrict selection to marks only, set the `restrictToMarks` prop:

#### Example: marks

```tsx
import { AngleSlider, Group } from '@mantine/core';

function Demo() {
  return (
    <Group p="lg" gap={50}>
      <AngleSlider
        aria-label="Angle slider"
        formatLabel={(value) => `${value}°`}
        size={100}
        restrictToMarks
        marks={[
          { value: 0 },
          { value: 45 },
          { value: 90 },
          { value: 135 },
          { value: 180 },
          { value: 225 },
          { value: 270 },
          { value: 315 },
        ]}
      />

      <AngleSlider
        aria-label="Angle slider"
        formatLabel={(value) => `${value}°`}
        size={100}
        marks={[
          { value: 0, label: '0°' },
          { value: 45, label: '45°' },
          { value: 90, label: '90°' },
          { value: 135, label: '135°' },
          { value: 180, label: '180°' },
          { value: 225, label: '225°' },
          { value: 270, label: '270°' },
          { value: 315, label: '315°' },
        ]}
      />
    </Group>
  );
}
```


## onChangeEnd

The `onChangeEnd` callback fires when the user stops dragging the slider or changes its value with the keyboard.
Use it as a debounced callback to prevent frequent updates.

#### Example: onChangeEnd

```tsx
import { useState } from 'react';
import { AngleSlider, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(0);
  const [endValue, setEndValue] = useState(0);

  return (
    <>
      <AngleSlider value={value} onChange={setValue} onChangeEnd={setEndValue} />
      <Text mt="md">Current value: {value}</Text>
      <Text>End value: {endValue}</Text>
    </>
  );
}
```


## disabled

`disabled` prop disables the component and prevents user interaction:

#### Example: disabled

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}
```


## Accessibility

To make the component accessible for screen readers, set the `aria-label` prop:

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Gradient angle" />;
}
```

Keyboard interactions when the component is focused:

## Based on use-radial-move

`AngleSlider` is based on the [use-radial-move](https://mantine.dev/hooks/use-radial-move) hook.
You can build a custom radial slider using this hook if you need more control over the component's behavior.




#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | number | - | Uncontrolled component default value |
| disabled | boolean | - | Sets <code>data-disabled</code> attribute, disables interactions |
| formatLabel | (value: number) => ReactNode | - | A function to format label based on the current value |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| marks | { value: number; label?: string; }[] | undefined | - | Array of marks displayed on the slider |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: number) => void | - | Called on value change |
| onChangeEnd | (value: number) => void | - | Called after the selection is finished |
| onScrubEnd | () => void | - | Called in <code>onMouseUp</code> and <code>onTouchEnd</code> |
| onScrubStart | () => void | - | Called in <code>onMouseDown</code> and <code>onTouchStart</code> |
| restrictToMarks | boolean | - | If set, the selection is allowed only from the given marks array |
| size | number | - | Slider size in px |
| step | number | - | Step between values |
| thumbSize | number | - | Size of the thumb in px. Calculated based on the <code>size</code> value by default. |
| value | number | - | Controlled component value |
| withLabel | boolean | - | If set, the label is displayed inside the slider |


#### Styles API

AngleSlider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AngleSlider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AngleSlider-root | Root element |
| label | .mantine-AngleSlider-label | Label inside the slider |
| marks | .mantine-AngleSlider-marks | Wrapper for all marks |
| mark | .mantine-AngleSlider-mark | Mark element |
| thumb | .mantine-AngleSlider-thumb | Slider thumb |

**AngleSlider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --slider-size | Controls slider width and height |
| root | --thumb-size | Controls thumb size |

**AngleSlider data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | disabled | - | - |


--------------------------------------------------------------------------------

### AppShell
Package: @mantine/core
Import: import { AppShell } from '@mantine/core';
Description: Responsive shell for your application with header, navbar, aside and footer

## Examples

This page includes only documentation. All associated `AppShell` components have a fixed
position; examples are included in a separate documentation section.

<ExamplesButton link="/app-shell?e=BasicAppShell" label="Open AppShell examples page" />

## Usage

`AppShell` is a layout component that can be used to implement a common Header / Navbar / Footer / Aside
layout pattern. All `AppShell` components have `position: fixed` style, so they do not scroll with
the page.

[Basic AppShell example](https://mantine.dev/app-shell?e=BasicAppShell) with header and navbar.
The navbar is hidden on mobile by default and toggled with the burger button.

```tsx
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
```

## AppShell components

* `AppShell` – root component that wraps all other sections and configures the overall layout.
* `AppShell.Header` – fixed header at the top, controlled by the `header` prop.
* `AppShell.Navbar` – fixed navbar on the left, controlled by the `navbar` prop.
* `AppShell.Aside` – fixed aside on the right, controlled by the `aside` prop.
* `AppShell.Footer` – fixed footer at the bottom, controlled by the `footer` prop.
* `AppShell.Main` – main content area, statically positioned and offset by the other sections.
* `AppShell.Section` – utility for grouping content inside `AppShell.Navbar` or `AppShell.Aside`, useful for scrollable areas.

## Configuration

The `AppShell` component accepts `header`, `footer`, `navbar`, and `aside` props to configure the corresponding sections.
You must set these props if you want to use the associated components.
For example, to use the `AppShell.Header` component, you need to set the `header` prop on the `AppShell` component.

`header` and `footer` configuration objects share the same type:

```tsx
interface Configuration {
  /** Height of the section: number, string or
   ** object with breakpoints as keys and height as values */
  height: AppShellSize | AppShellResponsiveSize;

  /** When collapsed is true, the section is hidden
   ** from the viewport and doesn't affect AppShell.Main offset */
  collapsed?: boolean;

  /** Controls whether AppShell.Main should be offset by this section.
   ** Useful for scenarios like hiding a header based on scroll position. */
  offset?: boolean;
}
```

`navbar` and `aside` configuration objects type:

```tsx
interface Configuration {
  /** Width of the section: number, string, or
   ** object with breakpoints as keys and widths as values */
  width: AppShellSize | AppShellResponsiveSize;

  /** Breakpoint at which section switches to mobile mode.
   ** In mobile mode, the section always has 100% width and its
   ** collapsed state is controlled by `collapsed.mobile`
   ** instead of `collapsed.desktop` */
  breakpoint: MantineBreakpoint | (string & {}) | number;

  /** Determines whether the section should be collapsed */
  collapsed?: { desktop?: boolean; mobile?: boolean };
}
```

## layout prop

`layout` prop controls how `AppShell.Header`/`AppShell.Footer` and `AppShell.Navbar`/`AppShell.Aside`
are positioned relative to each other. It accepts `alt` and `default` values:

* `alt` – `AppShell.Navbar`/`AppShell.Aside` extends the full viewport height, while `AppShell.Header`/`AppShell.Footer` width equals the viewport width minus the width of `AppShell.Navbar` and `AppShell.Aside` ([example](https://mantine.dev/app-shell?e=AltLayout))
* `default` – `AppShell.Navbar`/`AppShell.Aside` height equals the viewport height minus `AppShell.Header`/`AppShell.Footer` height, and `AppShell.Header`/`AppShell.Footer` spans the full viewport width ([example](https://mantine.dev/app-shell?e=FullLayout))

## Height configuration

`height` property in `header` and `footer` configuration objects works the following way:

* If you pass a number, the value will be converted to [rem](https://mantine.dev/styles/rem) and used as
  height at all viewport sizes.
* To change height based on viewport width, use an object with breakpoints as keys and height as
  values. This works the same way as [style props](https://mantine.dev/styles/style-props#responsive-styles).

Example with height as a number: `height` is converted to [rem](https://mantine.dev/styles/rem),
`height` is the same at all viewport sizes:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell header={{ height: 48 }}>
      <AppShell.Header>Header</AppShell.Header>
    </AppShell>
  );
}
```

Example with height as an object with breakpoints:

* `height` is 48 when viewport width is \< `theme.breakpoints.sm`
* `height` is 60 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `height` is 76 when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell header={{ height: { base: 48, sm: 60, lg: 76 } }}>
      <AppShell.Header>Header</AppShell.Header>
    </AppShell>
  );
}
```

## Width configuration

`width` property in `navbar` and `aside` configuration objects works the following way:

* If you pass a number, the value will be converted to [rem](https://mantine.dev/styles/rem) and used as
  width when the viewport is larger than `breakpoint`.
* To change width based on viewport width, use an object with breakpoints as keys and width as
  values. This works the same way as [style props](https://mantine.dev/styles/style-props#responsive-styles).
  Note that width is always 100% when the viewport is smaller than `breakpoint`.

Example with width as a number: `width` is converted to [rem](https://mantine.dev/styles/rem),
`width` is the same at viewport sizes larger than `breakpoint`,
`width` is 100% when viewport width is less than `breakpoint`:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell navbar={{ width: 48, breakpoint: 'sm' }}>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
    </AppShell>
  );
}
```

Example with width as an object with breakpoints:

* `width` is 100% when viewport width is \< `theme.breakpoints.sm`
* `width` is 200 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `width` is 300 when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell
      navbar={{ width: { sm: 200, lg: 300 }, breakpoint: 'sm' }}
    >
      <AppShell.Navbar>Navbar</AppShell.Navbar>
    </AppShell>
  );
}
```

## padding prop

The `padding` prop controls the padding of the `AppShell.Main` component. It's important to use this prop
instead of setting padding directly on `AppShell.Main` because this padding is also used to offset
the `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, and `AppShell.Footer` components.

The `padding` prop works the same way as [style props](https://mantine.dev/styles/style-props#responsive-styles) and
accepts numbers, strings, and objects with breakpoints as keys and padding values. You can
reference `theme.spacing` values or use any valid CSS values.

Example with static `padding` prop:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return <AppShell padding="md">{/* AppShell content */}</AppShell>;
}
```

Example with responsive `padding` prop:

* `padding` is 10 when viewport width is \< `theme.breakpoints.sm`
* `padding` is 15 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `padding` is `theme.spacing.xl` when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell padding={{ base: 10, sm: 15, lg: 'xl' }}>
      {/* AppShell content */}
    </AppShell>
  );
}
```

## Header offset configuration

The `header` prop includes an `offset` property that allows you to control
whether the `AppShell.Main` component is offset by the header's height.
This is particularly useful when you want to collapse the `AppShell.Header`
based on scroll position. For example, you can use the [use-headroom](https://mantine.dev/hooks/use-headroom)
hook to hide the header when the user scrolls down and show it when
scrolling up ([example](https://mantine.dev/app-shell?e=Headroom)).

```tsx
import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

function Demo() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>Header</AppShell.Header>

      <AppShell.Main
        pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
      >
        {/* Content */}
      </AppShell.Main>
    </AppShell>
  );
}
```

## Collapsed navbar/aside configuration

The `navbar` and `aside` props include a `collapsed` property that accepts an object with the format `{ mobile: boolean; desktop: boolean }`.
This allows you to configure the collapsed state differently based on viewport width.

[Example](https://mantine.dev/app-shell?e=CollapseDesktop) with separate collapsed states for mobile and desktop:

```tsx
import { AppShell, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] =
    useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
```

## withBorder prop

The `withBorder` prop is available on `AppShell` and associated sections: `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside` and `AppShell.Footer`.
By default, `withBorder` prop is `true` – all components have a border on the side that is adjacent to the `AppShell.Main` component.
For example, `AppShell.Header` is located at the top of the page – it has a border on the bottom side,
`AppShell.Navbar` is located on the left side of the page – it has a border on the right side.

To remove the border from all components, set `withBorder={false}` on the `AppShell`:

```tsx
import { AppShell } from '@mantine/core';

// None of the components will have a border
function Demo() {
  return (
    <AppShell withBorder={false}>{/* AppShell content */}</AppShell>
  );
}
```

To remove the border from a specific component, set `withBorder={false}` on that component:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell>
      <AppShell.Header withBorder={false}>Header</AppShell.Header>
    </AppShell>
  );
}
```

## zIndex prop

The `zIndex` prop is available on `AppShell` and its associated sections: `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, and `AppShell.Footer`.
By default, all sections have a `z-index` of `100`.

To change the `z-index` of all sections, set the `zIndex` prop on the `AppShell` component:

```tsx
import { AppShell } from '@mantine/core';

// All sections will have z-index of 200
function Demo() {
  return <AppShell zIndex={200}>{/* AppShell content */}</AppShell>;
}
```

To change `z-index` of a specific section, set `zIndex` prop on that section:

```tsx
import { AppShell } from '@mantine/core';

// AppShell.Header has z-index of 100
// AppShell.Navbar and AppShell.Aside have z-index of 300
function Demo() {
  return (
    <AppShell>
      <AppShell.Header zIndex={100}>Header</AppShell.Header>
      <AppShell.Navbar zIndex={300}>Navbar</AppShell.Navbar>
      <AppShell.Aside zIndex={300}>Aside</AppShell.Aside>
    </AppShell>
  );
}
```

## Control transitions

Use the `transitionDuration` and `transitionTimingFunction` props on the `AppShell` component to control section animations:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {/* AppShell content */}
    </AppShell>
  );
}
```

## disabled prop

Set the `disabled` prop on the `AppShell` component to prevent all sections except `AppShell.Main` from rendering.
This is useful when you want to hide the shell on certain pages of your application.

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return <AppShell disabled>{/* AppShell content */}</AppShell>;
}
```

## AppShell.Section component

`AppShell.Section` is used to create organized areas within `AppShell.Navbar` and `AppShell.Aside`.
Since these components are flexbox containers with `flex-direction: column`, the `AppShell.Section`
component with the `grow` prop will expand to fill available space and can be made scrollable by setting
`component={ScrollArea}`.

In the following example:

* The first and last sections (header and footer) take only the space needed for their content
* The middle section with `grow` takes all remaining space and becomes scrollable when content exceeds the available height

```tsx
import { AppShell, ScrollArea } from '@mantine/core';

function Demo() {
  return (
    <AppShell navbar={{ width: 300, breakpoint: 0 }}>
      <AppShell.Navbar>
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          Navbar main section, it will
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
```

## Semantic elements

Important: do not use `<main>` inside `AppShell.Main`, it is allowed
to use only one `<main>` element per page.

## CSS variables

Example of using CSS variables in styles:

```scss
.main {
  min-height: calc(100dvh - var(--app-shell-header-height));
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| aside | AppShellAsideConfiguration | - | <code>Aside</code> configuration, controls width, breakpoints and collapsed state. Required if you use <code>Aside</code> component. |
| disabled | boolean | - | If set, <code>Navbar</code>, <code>Aside</code>, <code>Header</code> and <code>Footer</code> components are hidden |
| footer | AppShellFooterConfiguration | - | <code>Footer</code> configuration, controls height, offset and collapsed state. Required if you use <code>Footer</code> component. |
| header | AppShellHeaderConfiguration | - | <code>Header</code> configuration, controls height, offset and collapsed state. Required if you use <code>Header</code> component. |
| layout | "default" | "alt" | - | Determines how <code>Navbar</code>/<code>Aside</code> are arranged relative to <code>Header</code>/<code>Footer</code> |
| mode | "fixed" | "static" | - | Determines positioning mode of all sections |
| navbar | AppShellNavbarConfiguration | - | <code>Navbar</code> configuration, controls width, breakpoints and collapsed state. Required if you use <code>Navbar</code> component. |
| offsetScrollbars | boolean | - | If set, <code>Header</code> and <code>Footer</code> components include styles to offset scrollbars. Based on <code>react-remove-scroll</code>. |
| padding | MantineSpacing | AppShellResponsiveSize | - | Padding of the main section. Important: use <code>padding</code> prop instead of <code>p</code>. |
| transitionDuration | number | - | Duration of all transitions in ms |
| transitionTimingFunction | TransitionTimingFunction | - | Timing function of all transitions |
| withBorder | boolean | - | If set, the associated components have a border |
| zIndex | string | number | - | <code>z-index</code> of all associated elements |


#### Styles API

AppShell component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AppShell selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AppShell-root | Root element (`AppShell` component) |
| navbar | .mantine-AppShell-navbar | `AppShell.Navbar` root element |
| header | .mantine-AppShell-header | `AppShell.Header` root element |
| main | .mantine-AppShell-main | `AppShell.Main` root element |
| aside | .mantine-AppShell-aside | `AppShell.Aside` root element |
| footer | .mantine-AppShell-footer | `AppShell.Footer` root element |
| section | .mantine-AppShell-section | `AppShell.Section` root element |

**AppShell CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --app-shell-transition-duration | Controls transition duration of all children |

**AppShell data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-resizing | User is resizing the window | - |
| root | data-layout | - | Value of the  |
| root | data-disabled | - | - |


--------------------------------------------------------------------------------

### AspectRatio
Package: @mantine/core
Import: import { AspectRatio } from '@mantine/core';
Description: Maintain responsive consistent width/height ratio

## Usage

`AspectRatio` maintains a consistent width/height ratio.
It can be used to display images, maps, videos and other media.

#### Example: image

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}
```


## Map embed

#### Example: map

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.04668908358428!3d40.68924937933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty%20National%20Monument!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
        title="Google map"
        style={{ border: 0 }}
      />
    </AspectRatio>
  );
}
```


## Video embed

#### Example: video

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://www.youtube.com/embed/mzJ4vCjSt28"
        title="YouTube video player"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
}
```


## Inside flex container

By default, `AspectRatio` does not have fixed width and height, it will take as much space as possible
in a regular container. However, when used inside a flex container, it will not stretch to fill the available space.
To make it work inside flexbox container, you need to set `width` or `flex` property.

#### Example: flex

```tsx
import { AspectRatio, Image } from '@mantine/core';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <AspectRatio ratio={1} flex="0 0 100px">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png"
          alt="Avatar"
        />
      </AspectRatio>
    </div>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ratio | number | - | Aspect ratio, for example, <code>16 / 9</code>, <code>4 / 3</code>, <code>1920 / 1080</code> |


#### Styles API

AspectRatio component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AspectRatio selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AspectRatio-root | Root element |

**AspectRatio CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ar-ratio | Aspect ratio |


--------------------------------------------------------------------------------

### Autocomplete
Package: @mantine/core
Import: import { Autocomplete } from '@mantine/core';
Description: Autocomplete user input with any list of options

<ComboboxDisclaimer component="Autocomplete" />

## Not a searchable select

`Autocomplete` is not a searchable select, it is a text input with suggestions.
Values are not enforced to be one of the suggestions, user can type anything.
If you need a searchable select, use [Select](https://mantine.dev/core/select) component instead.
To learn more about the differences between `Autocomplete` and `Select`, check
[help center article](https://help.mantine.dev/q/select-autocomplete-difference).

## Usage

`Autocomplete` provides user a list of suggestions based on the input,
however user is not limited to suggestions and can type anything.

#### Example: usage

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Controlled

`Autocomplete` value must be a string, other types are not supported.
`onChange` function is called with a string value as a single argument.

```tsx
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <Autocomplete data={[]} value={value} onChange={setValue} />;
}
```

## Select first option on change

Set the `selectFirstOptionOnChange` prop to automatically select the first option in the dropdown when the input value changes.
This feature allows users to type a value and immediately press `Enter` to select the first matching option,
without needing to press the arrow down key first.

#### Example: selectFirstOptionOnChange

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      selectFirstOptionOnChange
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## autoSelectOnBlur

Set `autoSelectOnBlur` prop to automatically select the highlighted option when the input loses focus.
To see this feature in action: select an option with up/down arrows, then click outside the input:

#### Example: autoSelectOnBlur

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      autoSelectOnBlur
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


<ComboboxData component="Autocomplete" />

## Data prop

Data that is used in Autocomplete must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

<ComboboxFiltering component="Autocomplete" />

## Filtering

Autocomplete provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

#### Example: search

```tsx
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <Autocomplete
      label="Your country"
      placeholder="Pick value or enter anything"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with `filter` function:

#### Example: sort

```tsx
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
    />
  );
}
```


<ComboboxLargeData component="Autocomplete" />

## Large datasets

Autocomplete can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

#### Example: limit

```tsx
import { Autocomplete } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <Autocomplete
      label="100 000 options autocomplete"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
    />
  );
}
```


## renderOption

`renderOption` callback allows you to customize option rendering. It is called with option object.
The function must return a React node.

#### Example: renderOption

```tsx
import { Autocomplete, AutocompleteProps, Avatar, Group, Text } from '@mantine/core';

const usersData: Record<string, { image: string; email: string }> = {
  'Emily Johnson': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    email: 'emily92@gmail.com',
  },
  'Ava Rodriguez': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    email: 'ava_rose@gmail.com',
  },
  'Olivia Chen': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    email: 'livvy_globe@gmail.com',
  },
  'Ethan Barnes': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    email: 'ethan_explorer@gmail.com',
  },
  'Mason Taylor': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    email: 'mason_musician@gmail.com',
  },
};

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].image} size={36} radius="xl" />
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <Autocomplete
      data={['Emily Johnson', 'Ava Rodriguez', 'Olivia Chen', 'Ethan Barnes', 'Mason Taylor']}
      renderOption={renderAutocompleteOption}
      maxDropdownHeight={300}
      label="Employee of the month"
      placeholder="Search for employee"
    />
  );
}
```


## Nothing found message

`Autocomplete` component does not support nothing found message. It is designed to
accept any string as a value, so it does not make sense to show nothing found message.
If you want to limit user input to suggestions, you can use searchable [Select](https://mantine.dev/core/select)
component instead. To learn more about the differences between `Autocomplete` and `Select`, check
[help center article](https://help.mantine.dev/q/select-autocomplete-difference).

## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/core/scroll-area).
You can control dropdown max-height with `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change dropdown styles with [Styles API](https://mantine.dev/styles/styles-api).

#### Example: scrollArea

```tsx
import { Autocomplete } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <Autocomplete
        label="With scroll area (default)"
        placeholder="Pick value or enter anything"
        data={data}
        maxDropdownHeight={200}
      />

      <Autocomplete
        label="With native scroll"
        placeholder="Pick value or enter anything"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

#### Example: groups

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When option is disabled, it cannot be selected and is ignored in keyboard navigation.

#### Example: disabledOptions

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={[
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Vue', disabled: true },
        { value: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


<ComboboxProps component="Autocomplete" />

## Inside Popover

To use `Autocomplete` inside popover, you need to set `withinPortal: false`:

#### Example: withinPopover

```tsx
import { Popover, Button, Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Autocomplete
          label="Your favorite library"
          placeholder="Pick value or enter anything"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Clearable

Set `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

#### Example: clearable

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      clearable
      defaultValue="React"
      data={['React', 'Angular']}
      label="Clearable autocomplete"
      placeholder="Clearable autocomplete"
    />
  );
}
```


## Control dropdown opened state

You can control dropdown opened state with `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

#### Example: dropdownOpened

```tsx
import { Autocomplete, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <Autocomplete
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/core/popover) component.

Example of dropdown that is always displayed above the input:

#### Example: dropdownPosition

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/core/transition) component.

#### Example: dropdownAnimation

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown padding

#### Example: dropdownPadding

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <>
      <Autocomplete
        label="Zero padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Autocomplete
        mt="md"
        label="10px padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

#### Example: dropdownShadow

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


<InputSections component="Autocomplete" />

## Input sections

Autocomplete supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { Autocomplete } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

function Demo() {
  const icon = <IconComponents size={16} />;
  return (
    <>
      <Autocomplete
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <Autocomplete
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
    </>
  );
}
```


## Input props

<InputFeatures component="Autocomplete" element="input" />

Autocomplete component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. Autocomplete documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { Autocomplete } from '@mantine/core';


function Demo() {
  return (
    <Autocomplete
      
      placeholder="Autocomplete placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`Autocomplete` will not show suggestions and will not call `onChange` function.

#### Example: readOnly

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      readOnly
    />
  );
}
```


## Disabled

Set `disabled` to disable the input. When `disabled` is set,
user cannot interact with the input and `Autocomplete` will not show suggestions.

#### Example: disabled

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
```


## Error state

#### Example: error

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <>
      <Autocomplete
        label="Boolean error"
        placeholder="Boolean error"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Autocomplete
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
     
      leftSection={<IconAt size={18} stroke={1.5} />}
      label="Autocomplete"
      description="Description"
      error="Error"
      placeholder="Autocomplete"
      data={['React', 'Angular']}
    />
  );
}
```


<GetElementRef component="Autocomplete" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Autocomplete } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Autocomplete ref={ref} />;
}
```

<InputAccessibility component="Autocomplete" />

## Accessibility

Autocomplete provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoSelectOnBlur | boolean | - | If set, the highlighted option is selected when the input loses focus |
| clearButtonProps | InputClearButtonProps | - | Props passed to the clear button |
| clearable | boolean | - | If set, the clear button is displayed when the component has a value |
| comboboxProps | ComboboxProps | - | Props passed down to <code>Combobox</code> component |
| data | ComboboxStringData | - | Data used to display options. Values must be unique. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultValue | string | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| filter | OptionsFilter | - | Function based on which items are filtered and sorted |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| limit | number | - | Maximum number of options displayed at a time, <code>Infinity</code> by default |
| maxDropdownHeight | string | number | - | <code>max-height</code> of the dropdown, only applicable when <code>withScrollArea</code> prop is <code>true</code>, <code>250</code> by default |
| onChange | (value: string) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: string) => void | - | Called when option is submitted from dropdown with mouse click or <code>Enter</code> key |
| openOnFocus | boolean | - | If set, the dropdown opens when the input receives focus |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| renderOption | RenderAutocompleteOption | - | Function to render custom option content |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed to the underlying <code>ScrollArea</code> component in the dropdown |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, <code>false</code> by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, <code>false</code> by default |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with <code>ScrollArea.AutoSize</code>, <code>true</code> by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

Autocomplete component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Autocomplete selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Autocomplete-wrapper | Root element of the Input |
| input | .mantine-Autocomplete-input | Input element |
| section | .mantine-Autocomplete-section | Left and right sections |
| root | .mantine-Autocomplete-root | Root element |
| label | .mantine-Autocomplete-label | Label element |
| required | .mantine-Autocomplete-required | Required asterisk element, rendered inside label |
| description | .mantine-Autocomplete-description | Description element |
| error | .mantine-Autocomplete-error | Error element |

**Autocomplete data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### Avatar
Package: @mantine/core
Import: import { Avatar } from '@mantine/core';
Description: Display user profile image, initials or fallback icon

## Usage

#### Example: usage

```tsx
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      {/* With image */}
      <Avatar src="avatar.png" alt="it's me" />

      {/* Default placeholder */}
      <Avatar radius="xl" />

      {/* Letters with xl radius */}
      <Avatar color="cyan" radius="xl">MK</Avatar>

      {/* Custom placeholder icon */}
      <Avatar color="blue" radius="sm">
        <IconStar size={20} />
      </Avatar>
    </>
  );
}
```


## Initials

To display initials instead of the default placeholder, set `name` prop
to the name of the person, for example, `name="John Doe"`. If the name
is set, you can use `color="initials"` to generate color based on the name:

#### Example: initials

```tsx
import { Avatar, Group } from '@mantine/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}
```


## Allowed initials colors

By default, all colors from the default theme are allowed for initials, you can restrict them
by providing `allowedInitialsColors` prop with an array of colors. Note that the default colors
array does not include custom colors defined in the theme, you need to provide them manually
if needed.

#### Example: allowedColors

```tsx
import { Avatar, Group } from '@mantine/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => (
    <Avatar key={name} name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}
```


## Placeholder

If the image cannot be loaded or not provided, `Avatar` will display a placeholder instead. By default,
placeholder is an icon, but it can be changed to any React node:

#### Example: placeholders

```tsx
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      {/* Default placeholder */}
      <Avatar src={null} alt="no image here" />

      {/* Default placeholder with custom color */}
      <Avatar src={null} alt="no image here" color="indigo" />

      {/* Placeholder with initials */}
      <Avatar src={null} alt="Vitaly Rtishchev" color="red">VR</Avatar>

      {/* Placeholder with custom icon */}
      <Avatar color="blue" radius="xl">
        <IconStar size={20} />
      </Avatar>
    </>
  );
}
```


## Variants

#### Example: configurator

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return <Avatar />;
}
```


## Avatar.Group

`Avatar.Group` component combines multiple avatars into a stack:

#### Example: group

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return (
    <Avatar.Group>
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar>+5</Avatar>
    </Avatar.Group>
  );
}
```


Note that you must not wrap child `Avatar` components with any additional elements,
but you can use wrap `Avatar` with components that do not render any HTML elements
in the current tree, for example [Tooltip](https://mantine.dev/core/tooltip).

```tsx
import { Avatar } from '@mantine/core';

// Will not work correctly
function Demo() {
  return (
    <Avatar.Group spacing="sm">
      <div>
        <Avatar src="image.png" radius="xl" />
      </div>
      <Avatar src="image.png" radius="xl" />
      <Avatar src="image.png" radius="xl" />
      <Avatar radius="xl">+5</Avatar>
    </Avatar.Group>
  );
}
```

Example of usage with [Tooltip](https://mantine.dev/core/tooltip/):

#### Example: groupTooltip

```tsx
import { Avatar, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="Salazar Troop" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Bandit Crimes" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Jane Rata" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
        >
          <Avatar radius="xl">+2</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="button" component="Avatar" withNext />

## Polymorphic component

Avatar is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return <Avatar component="button" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Avatar } from '@mantine/core';

function Demo() {
  return <Avatar component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, AvatarProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

Example using `Avatar` as a link:

#### Example: link

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src="avatar.png"
      alt="it's me"
    />
  );
}
```


## Accessibility

Avatar renders `<img />` HTML element. Set `alt` prop to describe image,
it is also used as `title` attribute for avatar placeholder when the image cannot be loaded.

```tsx
import { Avatar } from '@mantine/core';

function NotOk() {
  // ❌ No alt for image
  return <Avatar src="./image.png" />;
}

function Ok() {
  // ✅ alt is set
  return <Avatar src="./image.png" alt="Rob Johnson" />;
}

function Ehh() {
  // ✅ title is not required, but still recommended
  return <Avatar>RJ</Avatar>;
}

function OkPlaceholder() {
  // ✅ title is set on placeholder
  return <Avatar alt="Rob Johnson">RJ</Avatar>;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowedInitialsColors | DefaultMantineColor[] | - | A list of colors that is used for autogenerated initials. By default, all default Mantine colors can be used except gray and dark. |
| alt | string | - | Image <code>alt</code> attribute, also used as <code>title</code> attribute for placeholder |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Avatar placeholder, displayed when <code>src={null}</code> or when the image cannot be loaded |
| color | DefaultMantineColor | "initials" | - | Key of <code>theme.colors</code> or any valid CSS color |
| gradient | MantineGradient | - | Gradient configuration for <code>variant="gradient"</code> |
| imageProps | React.ComponentPropsWithoutRef<"img"> | - | Attributes passed down to <code>img</code> element |
| name | string | - | Name of the user. When <code>src</code> is not set, used to display initials and to generate color when <code>color="initials"</code> is set. |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| size | number | MantineSize | (string & {}) | - | Width and height of the avatar, numbers are converted to rem |
| src | string | null | - | Image url, if the image cannot be loaded or <code>src={null}</code>, then placeholder is displayed instead |


#### Styles API

Avatar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Avatar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Avatar-root | Root element |
| image | .mantine-Avatar-image | `img` element |
| placeholder | .mantine-Avatar-placeholder | Avatar placeholder, displayed when the image cannot be loaded |

**Avatar CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --avatar-bd | Controls placeholder `border` |
| root | --avatar-bg | Controls placeholder `background` |
| root | --avatar-color | Controls placeholder text `color` |
| root | --avatar-size | Controls `width`, `min-width` and `height` |
| root | --avatar-radius | Controls `border-radius` |

**Avatar.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-AvatarGroup-group | Root element |

**Avatar.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --ag-spacing | Controls negative spacing between avatars |


--------------------------------------------------------------------------------

### BackgroundImage
Package: @mantine/core
Import: import { BackgroundImage } from '@mantine/core';
Description: Displays image as background

## Usage

#### Example: usage

```tsx
import { BackgroundImage, Center, Text, Box } from '@mantine/core';


function Demo() {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="button" component="BackgroundImage" />

## Polymorphic component

BackgroundImage is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { BackgroundImage } from '@mantine/core';

function Demo() {
  return <BackgroundImage component="button" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, BackgroundImageProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius, numbers are converted to rem |
| src | string | required | Image url |


#### Styles API

BackgroundImage component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**BackgroundImage selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-BackgroundImage-root | Root element |

**BackgroundImage CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bi-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### Badge
Package: @mantine/core
Import: import { Badge } from '@mantine/core';
Description: Display badge, pill or tag

## Usage

#### Example: usage

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge>Badge</Badge>;
}
```


<Gradient component="Badge" />

## Gradient

Badge supports Mantine color format in color prop. Color can be specified as:
- Mantine color name (e.g., 'blue')
- CSS color value (e.g., '#fff', 'rgba(255, 255, 255, 0.8)')
- Gradient string (e.g., 'linear-gradient(45deg, blue, red)')

#### Example: gradient

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
    >
      Gradient badge
    </Badge>
  );
}
```


## Rounded

Set `circle` prop, to reduce horizontal padding and make badge width equal to its height:

#### Example: rounded

```tsx
import { Badge, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Badge size="xs" circle>
        1
      </Badge>
      <Badge size="sm" circle>
        7
      </Badge>
      <Badge size="md" circle>
        9
      </Badge>
      <Badge size="lg" circle>
        3
      </Badge>
      <Badge size="xl" circle>
        8
      </Badge>
    </Group>
  );
}
```


## Left and right sections

#### Example: sections

```tsx
import { Badge, Group } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  const icon = <IconAt size={12} />;
  return (
    <Group>
      <Badge leftSection={icon}>With left section</Badge>
      <Badge rightSection={icon}>With right section</Badge>
    </Group>
  );
}
```


## Full width

Set `fullWidth` to make badge span full width of its parent element:

#### Example: fullWidth

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge fullWidth>Full width badge</Badge>;
}
```


## Customize variants colors

You can customize colors for `Badge` and other components variants by adding
[variantColorResolver](https://mantine.dev/theming/colors#colors-variant-resolver) to your theme.

#### Example: variantColorsResolver

```tsx
import { IconPhoto, IconFingerprint, IconError404 } from '@tabler/icons-react';
import {
  Badge,
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
        <Badge color="lime.4" variant="filled">
          Lime filled
        </Badge>

        <Badge color="orange" variant="light">
          Orange light
        </Badge>

        <Badge variant="danger">
          Danger
        </Badge>
      </Group>
    </MantineProvider>
  );
}
```


<AutoContrast component="Badge" />

## autoContrast

Badge supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on Badge or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { Badge, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Badge size="lg" color="lime.4">
        Default
      </Badge>
      <Badge autoContrast size="lg" color="lime.4">
        Auto contrast
      </Badge>
    </Group>
  );
}
```


#### Example: stylesApi

```tsx
import { Badge } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  const icon = <IconAt size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon}>
      Badge component
    </Badge>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="a" component="Badge" withNext />

## Polymorphic component

Badge is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge component="a" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, BadgeProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Main badge content |
| circle | boolean | - | If set, badge <code>min-width</code> becomes equal to its <code>height</code> and horizontal padding is removed |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |
| fullWidth | boolean | - | Determines whether Badge should take 100% of its parent width |
| gradient | MantineGradient | - | Gradient configuration used when <code>variant=\"gradient\"</code> |
| leftSection | React.ReactNode | - | Content displayed on the left side of the badge label |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| rightSection | React.ReactNode | - | Content displayed on the right side of the badge label |
| size | MantineSize | (string & {}) | - | Controls <code>font-size</code>, <code>height</code> and horizontal <code>padding</code> |


#### Styles API

Badge component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Badge selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Badge-root | Root element |
| section | .mantine-Badge-section | Left and right sections |
| label | .mantine-Badge-label | Badge children |

**Badge CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --badge-bd | Controls `border` |
| root | --badge-bg | Controls `background` |
| root | --badge-color | Controls text `color` |
| root | --badge-dot-color | Controls dot `color`, only applicable when `variant="dot"` |
| root | --badge-fz | Controls `font-size` |
| root | --badge-height | Controls `height` |
| root | --badge-padding-x | Controls horizontal `padding` |
| root | --badge-radius | Controls `border-radius` |

**Badge data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-block | - | - |
| section | data-position | - | Section position: left or right |


--------------------------------------------------------------------------------

### Blockquote
Package: @mantine/core
Import: import { Blockquote } from '@mantine/core';
Description: Blockquote with optional cite

## Usage

#### Example: usage

```tsx
import { Blockquote } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

function Demo() {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote cite="– Forrest Gump" icon={icon} mt="xl">
      Life is like an npm install – you never know what you are going to get.
    </Blockquote>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cite | React.ReactNode | - | Reference to a cited quote |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |
| icon | React.ReactNode | - | Blockquote icon, displayed at the top left side |
| iconSize | string | number | - | Controls icon <code>width</code> and <code>height</code>, numbers are converted to rem |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |


#### Styles API

Blockquote component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Blockquote selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Blockquote-root | Root element |
| icon | .mantine-Blockquote-icon | Icon element |
| cite | .mantine-Blockquote-cite | Cite element |

**Blockquote CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bq-bd | Controls `border` |
| root | --bq-bg-dark | Controls `background-color` in dark color scheme |
| root | --bq-bg-light | Controls `background-color` in light color scheme |
| root | --bq-icon-size | Controls `width` and `height` of the icon |
| root | --bq-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### Box
Package: @mantine/core
Import: import { Box } from '@mantine/core';
Description: Base component for all Mantine components

## Usage

`Box` component is used as a base for all other components. `Box` supports the following features:

* [component prop](https://mantine.dev/guides/polymorphic)
* [style props](https://mantine.dev/styles/style-props)
* [style prop](https://mantine.dev/styles/style)

You can use `Box` as a base for your own components or as a replacement for HTML elements:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box bg="red.5" my="xl" component="a" href="/">
      My component
    </Box>
  );
}
```


--------------------------------------------------------------------------------

### Breadcrumbs
Package: @mantine/core
Import: import { Breadcrumbs } from '@mantine/core';
Description: Separates list of react nodes with given separator

## Usage

`Breadcrumbs` component accepts any number of React nodes as children
and adds a given separator (defaults to `/`) between them:

#### Example: usage

```tsx
import { Breadcrumbs, Anchor } from '@mantine/core';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | React nodes that should be separated with <code>separator</code> |
| separator | React.ReactNode | - | Separator between children |
| separatorMargin | MantineSpacing | - | Controls spacing between separator and breadcrumb |


#### Styles API

Breadcrumbs component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Breadcrumbs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Breadcrumbs-root | Root element |
| separator | .mantine-Breadcrumbs-separator | Separator between children |
| breadcrumb | .mantine-Breadcrumbs-breadcrumb | Breadcrumb item |

**Breadcrumbs CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bc-separator-margin | Control left and right `margin` of separator |


--------------------------------------------------------------------------------

### Burger
Package: @mantine/core
Import: import { Burger } from '@mantine/core';
Description: Open/close navigation button

## Usage

`Burger` component renders open/close menu button.
Set `opened` and `onClick` props to control component state.
If `opened` prop is set, cross will be rendered, otherwise – burger.

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
```


## Change lines size

#### Example: lineWidth

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
```


<GetElementRef component="Burger" refType="button" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Burger } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <Burger ref={ref} />;
}
```

## Accessibility

To make `Burger` accessible for screen readers, you need to either set `aria-label` or
use [VisuallyHidden](https://mantine.dev/core/visually-hidden) component:

```tsx
import { Burger, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <Burger aria-label="Toggle navigation" />

      <Burger>
        <VisuallyHidden>Toggle navigation</VisuallyHidden>
      </Burger>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> of any valid CSS value, by default <code>theme.white</code> in dark color scheme and <code>theme.black</code> in light |
| lineSize | string | number | - | Controls height of lines, by default calculated based on <code>size</code> prop |
| opened | boolean | - | State of the burger, when <code>true</code> burger is transformed into X |
| size | number | MantineSize | (string & {}) | - | Controls burger <code>width</code> and <code>height</code>, numbers are converted to rem |
| transitionDuration | number | - | <code>transition-duration</code> property value in ms |
| transitionTimingFunction | string | - | <code>transition-timing-function</code> property value |


#### Styles API

Burger component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Burger selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Burger-root | Root element (button) |
| burger | .mantine-Burger-burger | Inner element that contains burger lines |

**Burger CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --burger-line-size | Controls height of lines |
| root | --burger-color | Controls background-color of lines |
| root | --burger-size | Controls width and height of the button |
| root | --burger-transition-duration | Controls transition-duration of lines |
| root | --burger-transition-timing-function | Controls transition-timing-function of lines |

**Burger data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| burger | data-opened | opened prop is set | - |


--------------------------------------------------------------------------------

### Button
Package: @mantine/core
Import: import { Button } from '@mantine/core';
Description: Button component to render button or link

## Usage

#### Example: configurator

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button>Button</Button>;
}
```


## Full width

If `fullWidth` prop is set `Button` will take 100% of parent width:

#### Example: fullWidth

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}
```


## Left and right sections

`leftSection` and `rightSection` allow adding icons or any other element to the left and right side of the button.
When a section is added, padding on the corresponding side is reduced.

Note that `leftSection` and `rightSection` are flipped in [RTL](https://mantine.dev/styles/rtl) mode
(`leftSection` is displayed on the right and `rightSection` is displayed on the left).

#### Example: sections

```tsx
import { Group, Button } from '@mantine/core';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<IconPhoto size={14} />} variant="default">
        Gallery
      </Button>

      <Button rightSection={<IconDownload size={14} />}>Download</Button>

      <Button
        variant="light"
        leftSection={<IconPhoto size={14} />}
        rightSection={<IconArrowRight size={14} />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}
```


## Sections position

`justify` prop sets `justify-content` of `inner` element. You can use it to change the alignment of
left and right sections. For example, to spread them across the button set `justify="space-between"`.

If you need to align just one section to the side of the button set `justify` to `space-between`
and add empty `<span />` to the opposite section.

#### Example: sectionsJustify

```tsx
import { Button } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

function Demo() {
  const icon = <IconPhoto size={14} />;
  return (
    <>
      <Button justify="" fullWidth leftSection={icon} rightSection={icon} variant="default">
        Button label
      </Button>

      <Button justify="" fullWidth leftSection={icon} variant="default" mt="md">
        Button label
      </Button>

      <Button justify="" fullWidth rightSection={icon} variant="default" mt="md">
        Button label
      </Button>

      <Button
        justify=""
        fullWidth
        rightSection={icon}
        leftSection={<span />}
        variant="default"
        mt="md"
      >
        Button label
      </Button>
    </>
  );
}
```


## Compact size

`Button` supports `xs` – `xl` and `compact-xs` – `compact-xl` sizes. `compact` sizes have
the same font-size as `xs` – `xl` but reduced padding and height.

#### Example: compact

```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Button size="md">Regular md</Button>
      <Button size="compact-md">Compact md</Button>
    </Group>
  );
}
```


<Gradient component="Button" />

## Gradient

Button supports Mantine color format in color prop. Color can be specified as:
- Mantine color name (e.g., 'blue')
- CSS color value (e.g., '#fff', 'rgba(255, 255, 255, 0.8)')
- Gradient string (e.g., 'linear-gradient(45deg, blue, red)')

#### Example: gradient

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      variant="gradient"
      gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
    >
      Gradient button
    </Button>
  );
}
```


## Disabled state

To make `Button` disabled, set `disabled` prop, this will prevent any interactions with the button
and add disabled styles. If you want the button to just look disabled but still be interactive,
set `data-disabled` prop instead. Note that disabled styles are the same for all variants.

#### Example: disabled

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button disabled>Disabled button</Button>;
}
```


## Disabled state when Button is link

`<a />` element does not support `disabled` attribute. To make `Button` disabled when it is
rendered as a link, set `data-disabled` attribute instead and prevent default behavior in
`onClick` event handler.

#### Example: disabledLink

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      component="a"
      href="https://mantine.dev"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      Disabled link
    </Button>
  );
}
```


## Customize disabled styles

To customize disabled styles, it is recommended to use both `&:disabled` and `&[data-disabled]`
selectors:

* `&:disabled` is used to style the button when `disabled` prop is set and
  also when the button is disabled by the parent component (for example, when `disabled` prop is set on a
  `<fieldset />` element which contains `Button`).
* `&[data-disabled]` is used to style the button when it is not actually disabled but should look like
  it is (for example, `data-disabled` should be used if you need to use [Tooltip](https://mantine.dev/core/tooltip) with disabled `Button`
  or when `Button` is used as a link)

#### Example: disabledStyles

```tsx
// Demo.module.css
.button {
  &:disabled,
  &[data-disabled] {
    border-color: light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
    background-color: transparent;
  }
}

// Demo.tsx
import { Button } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Button className={classes.button} disabled>
      Disabled with styles
    </Button>
  );
}
```


## Disabled button with Tooltip

`onMouseLeave` event [is not triggered](https://github.com/facebook/react/issues/18753) when `Button` is disabled, so if you need to use
[Tooltip](https://mantine.dev/core/tooltip) with disabled `Button` you need to set `data-disabled` prop on `Button`
instead of `disabled`. Note that it is also required to change `onClick` event handler to
`(event) => event.preventDefault()` as `Button` is not actually disabled and will still trigger
`onClick` event.

#### Example: disabledTooltip

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <Button data-disabled onClick={(event) => event.preventDefault()}>
        Disabled button with tooltip
      </Button>
    </Tooltip>
  );
}
```


## Loading state

When `loading` prop is set, `Button` will be disabled and [Loader](https://mantine.dev/core/loader) with overlay will be rendered
in the center of the button. [Loader](https://mantine.dev/core/loader) color depends on `Button` variant.

#### Example: loading

```tsx
import { Button, Group, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <Button loading={loading}>Filled button</Button>
        <Button variant="light" loading={loading}>
          Light button
        </Button>
        <Button variant="outline" loading={loading}>
          Outline button
        </Button>
      </Group>

      <Switch checked={loading} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}
```


## Loader props

You can customize [Loader](https://mantine.dev/core/loader) with `loaderProps` prop, it accepts all props that
[Loader](https://mantine.dev/core/loader) component has:

#### Example: loaderProps

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button loading loaderProps={{ type: 'dots' }}>
      Loading button
    </Button>
  );
}
```


#### Example: stylesApi

```tsx
import { Button } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  return <Button leftSection={<IconAt size={16} />}>Your email</Button>;
}
```


Example of customizing `Button` with [Styles API](https://mantine.dev/styles/styles-api) and [data-\* attributes](https://mantine.dev/styles/data-attributes):

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


## Custom variants

To add new `Button` variants, use [data-variant](https://mantine.dev/styles/variants-sizes) attribute.
Usually new variants are added on [theme](https://mantine.dev/theming/theme-object), this way they are
available in all `Button` components in your application.

#### Example: customVariant

```tsx
// Demo.tsx
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

// Demo.module.css
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
    border-width: 0;
  }
}
```


## Customize variants colors

You can customize colors for `Button` and other components variants by adding
[variantColorResolver](https://mantine.dev/theming/colors#colors-variant-resolver) to your theme.

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


<AutoContrast component="Button" />

## autoContrast

Button supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on Button or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button color="lime.4">Default</Button>
      <Button color="lime.4" autoContrast>
        Auto contrast
      </Button>
    </Group>
  );
}
```


## Button.Group

#### Example: group

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button.Group>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Button.Group>
  );
}
```


Note that you must not wrap child `Button` components with any additional elements:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button.Group>
      <div>
        <Button>This will not work</Button>
      </div>
      <Button>Buttons will have incorrect borders</Button>
    </Button.Group>
  );
}
```

## Button.GroupSection

Use `Button.GroupSection` component to render sections that are not buttons inside `Button.Group`:

#### Example: groupSection

```tsx
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" radius="md" onClick={decrement}>
        <IconChevronDown color="var(--mantine-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--mantine-color-body)" miw={80}>
        {value}
      </Button.GroupSection>
      <Button variant="default" radius="md" onClick={increment}>
        <IconChevronUp color="var(--mantine-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}
```


<Polymorphic defaultElement="button" changeToElement="a" component="Button" withNext />

## Polymorphic component

Button is a polymorphic component – its default root element is button, but it can be changed to any other element or component with component prop:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button component="a" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return <Button component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, ButtonProps does not extend React.ComponentPropsWithoutRef<'button'> although button is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

<GetElementRef component="Button" refType="button" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Button } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <Button ref={ref} />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Button content |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |
| disabled | boolean | - | Sets <code>disabled</code> attribute, applies disabled styles |
| fullWidth | boolean | - | If set, the button takes 100% width of its parent container |
| gradient | MantineGradient | - | Gradient configuration used when <code>variant="gradient"</code> |
| justify | JustifyContent | - | Sets <code>justify-content</code> of <code>inner</code> element, can be used to change distribution of sections and label |
| leftSection | React.ReactNode | - | Content displayed on the left side of the button label |
| loaderProps | LoaderProps | - | Props added to the <code>Loader</code> component (only visible when <code>loading</code> prop is set) |
| loading | boolean | - | If set, the <code>Loader</code> component is displayed over the button |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| rightSection | React.ReactNode | - | Content displayed on the right side of the button label |
| size | MantineSize | (string & {}) | "compact-xs" | "compact-sm" | "compact-md" | "compact-lg" | "compact-xl" | - | Controls button <code>height</code>, <code>font-size</code> and horizontal <code>padding</code> |


#### Styles API

Button component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Button selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Button-root | Root element |
| loader | .mantine-Button-loader | Loader component, displayed only when `loading` prop is set |
| inner | .mantine-Button-inner | Contains all other elements, child of the `root` element |
| section | .mantine-Button-section | Left and right sections of the button |
| label | .mantine-Button-label | Button children |

**Button CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --button-bg | Controls `background` |
| root | --button-bd | Control `border` |
| root | --button-hover | Controls `background` when hovered |
| root | --button-color | Control text `color` |
| root | --button-hover-color | Control text `color` when hovered |
| root | --button-radius | Controls `border-radius` |
| root | --button-height | Controls `height` of the button |
| root | --button-padding-x | Controls horizontal `padding` of the button |
| root | --button-fz | Controls `font-size` of the button |
| root | --button-justify | Controls `justify-content` of `inner` element |

**Button data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-disabled | - | - |

**Button.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-ButtonGroup-group | Root element |

**Button.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --button-border-width | `border-width` of child `Button` components |

**Button.Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| group | data-orientation | - | Value of  |


--------------------------------------------------------------------------------

### Card
Package: @mantine/core
Import: import { Card } from '@mantine/core';
Description: Card with sections

## Usage

`Card` is a wrapper around [Paper](https://mantine.dev/core/paper/) component with some additional styles and `Card.Section`
component that allows to split card into sections. If you do not need sections, you use [Paper](https://mantine.dev/core/paper/) component instead.

#### Example: usage

```tsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
```


## Polymorphic component

Card is a [polymorphic component](https://mantine.dev/guides/polymorphic/) component, you can change its root element:

#### Example: link

```tsx
import { Card, Image, Text } from '@mantine/core';

function Demo() {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          h={160}
          alt="No way!"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        You&apos;ve won a million dollars in cash!
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
      </Text>
    </Card>
  );
}
```


## Card.Section

`Card.Section` is a special component that is used to remove Card padding from its children while other elements still have horizontal spacing.
`Card.Section` works the following way:

* If component is the first child in Card, then it has negative top, left and right margins
* If it is the last child in Card, then it has negative bottom, left and right margins
* If it is in the middle then, only the left and right margins will be negative

```tsx
import { Card, Text } from '@mantine/core';

function Demo() {
  return (
    <Card padding="xl">
      {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>First section</Card.Section>

      {/* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card */}
      <Text>Some other content</Text>

      {/* right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>Middle section</Card.Section>

      {/* bottom, right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>Last section</Card.Section>
    </Card>
  );
}
```

Note that `Card` relies on mapping direct children and you cannot use fragments or other wrappers for `Card.Section`:

```tsx
import { Card } from '@mantine/core';

function Demo() {
  return (
    <Card padding="xl">
      <div>
        <Card.Section>Won't work</Card.Section>
      </div>

      <>
        <Card.Section>Won't work either</Card.Section>
      </>

      <Card.Section>Works fine</Card.Section>
    </Card>
  );
}
```

## Polymorphic Card.Section

`Card.Section` is a [polymorphic component](https://mantine.dev/guides/polymorphic/) component, you can change its root element:

#### Example: linkSection

```tsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
```


## withBorder and inheritPadding props

* `withBorder` prop adds top and bottom border to `Card.Section` depending on its position relative to other content and sections
* `inheritPadding` prop adds the same left and right padding to `Card.Section` as set in `Card` component

#### Example: section

```tsx
import { ActionIcon, Card, Group, Image, Menu, SimpleGrid, Text } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
];

function Demo() {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Review pictures</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconFileZip size={14} />}>
                Download zip
              </Menu.Item>
              <Menu.Item leftSection={<IconEye size={14} />}>
                Preview all
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={14} />}
                color="red"
              >
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text mt="sm" c="dimmed" size="sm">
        <Text span inherit c="var(--mantine-color-anchor)">
          200+ images uploaded
        </Text>{' '}
        since last visit, review them to select which one should be added to your gallery
      </Text>

      <Card.Section mt="sm">
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image) => (
            <Image src={image} key={image} radius="sm" />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Card content |
| padding | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set padding |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS value to set <code>box-shadow</code> |
| withBorder | boolean | - | Adds border to the card |


#### Styles API

Card component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Card-root | Root element |
| section | .mantine-Card-section | `Card.Section` root element |

**Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|

**Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| section | data-first-section | - | - |
| section | data-last-section | - | - |
| root | data-with-border | - | - |
| section | data-with-border | - | - |
| section | data-inherit-padding | - | - |


--------------------------------------------------------------------------------

### Center
Package: @mantine/core
Import: import { Center } from '@mantine/core';
Description: Centers content vertically and horizontally

## Usage

#### Example: usage

```tsx
import { Center, Box } from '@mantine/core';

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
      <Box bg="var(--mantine-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}
```


## Inline

To use `Center` with inline elements set `inline` prop.
For example, you can center link icon and label:

#### Example: inline

```tsx
import { Center, Anchor, Box } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <IconArrowLeft size={12} />
        <Box ml={5}>Back to Mantine website</Box>
      </Center>
    </Anchor>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="button" component="Center" />

## Polymorphic component

Center is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { Center } from '@mantine/core';

function Demo() {
  return <Center component="button" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, CenterProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Content to center |
| inline | boolean | - | If set, <code>inline-flex</code> is used instead of <code>flex</code> |


#### Styles API

Center component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Center selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Center-root | Root element |


--------------------------------------------------------------------------------

### Checkbox
Package: @mantine/core
Import: import { Checkbox } from '@mantine/core';
Description: Capture boolean input from user

## Usage

#### Example: configurator

```tsx
import { Checkbox } from '@mantine/core';


function Demo() {
  return (
    <Checkbox
      defaultChecked
      
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## States

#### Example: states

```tsx
import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Checkbox checked={false} onChange={() => {}} label="Default checkbox" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate checkbox" />
      <Checkbox checked onChange={() => {}} label="Checked checkbox" />
      <Checkbox checked variant="outline" onChange={() => {}} label="Outline checked checkbox" />
      <Checkbox
        variant="outline"
        onChange={() => {}}
        indeterminate
        label="Outline indeterminate checkbox"
      />
      <Checkbox disabled label="Disabled checkbox" />
      <Checkbox disabled checked onChange={() => {}} label="Disabled checked checkbox" />
      <Checkbox disabled indeterminate label="Disabled indeterminate checkbox" />
    </Stack>
  );
}
```


## Change icons

#### Example: icon

```tsx
import { Checkbox, CheckboxProps } from '@mantine/core';
import { IconBiohazard, IconRadioactive } from '@tabler/icons-react';

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) =>
  indeterminate ? <IconRadioactive {...others} /> : <IconBiohazard {...others} />;

function Demo() {
  return (
    <>
      <Checkbox icon={CheckboxIcon} label="Custom icon" defaultChecked />
      <Checkbox icon={CheckboxIcon} label="Custom icon: indeterminate" indeterminate mt="sm" />
    </>
  );
}
```


## Change icon color

Use `iconColor` prop to change icon color. You can reference colors from `theme.colors` or use any valid CSS color:

#### Example: iconColor

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}
```


## Indeterminate state

`Checkbox` supports indeterminate state. When `indeterminate` prop is set,
`checked` prop is ignored (checkbox always has checked styles):

#### Example: indeterminate

```tsx
import { useListState, randomId } from '@mantine/hooks';
import { Checkbox } from '@mantine/core';

const initialValues = [
  { label: 'Receive email notifications', checked: false, key: randomId() },
  { label: 'Receive sms notifications', checked: false, key: randomId() },
  { label: 'Receive push notifications', checked: false, key: randomId() },
];

export function IndeterminateCheckbox() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </>
  );
}
```


## Label with link

#### Example: anchor

```tsx
import { Checkbox, Anchor } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      label={
        <>
          I accept{' '}
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
      }
    />
  );
}
```


## Checkbox with tooltip

You can change target element to which tooltip is attached with `refProp`:

* If `refProp` is not set, the tooltip is attached to the checkbox input
* If `refProp="rootRef"` is set, the tooltip is attached to the root element (contains label, input and other elements)

#### Example: tooltip

```tsx
import { Tooltip, Checkbox } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="Checkbox with tooltip">
        <Checkbox label="Tooltip on checkbox only" />
      </Tooltip>

      <Tooltip label="Checkbox with tooltip" refProp="rootRef">
        <Checkbox label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
```


## Pointer cursor

By default, checkbox input and label have `cursor: default` (same as native `input[type="checkbox"]`).
To change cursor to pointer, set `cursorType` on [theme](https://mantine.dev/theming/theme-object/):

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


## Add custom sizes

You can add any number of custom sizes with [data-size](https://mantine.dev/styles/data-attributes/) attribute:

#### Example: customSize

```tsx
// Demo.tsx
import { MantineProvider, Checkbox, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Checkbox size="xxs" label="Extra small checkbox" />
      <Checkbox size="xxl" label="Extra large checkbox" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.root {
  --checkbox-size-xxl: 42px;
  --checkbox-size-xxs: 14px;

  &[data-size='xxl'] {
    .label {
      font-size: 22px;
      line-height: 40px;
    }
  }

  &[data-size='xxs'] {
    .label {
      font-size: 10px;
      line-height: 14px;
    }
  }
}
```


<WrapperProps component="Checkbox" />

## Wrapper props

Checkbox supports additional props that are passed to the wrapper element for more customization options.

## Checkbox.Group

#### Example: groupConfigurator

```tsx
import { Checkbox, Group } from '@mantine/core';


function Demo() {
  return (
    <Checkbox.Group
      defaultValue={['react']}
      
    >
      <Group mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}
```


## Checkbox.Group disabled



## Controlled Checkbox.Group

```tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox value="react" label="React" />
      <Checkbox value="svelte" label="Svelte" />
    </Checkbox.Group>
  );
}
```

## Checkbox.Indicator

`Checkbox.Indicator` looks exactly the same as `Checkbox` component, but it does not
have any semantic meaning, it's just a visual representation of checkbox state. You
can use it in any place where you need to display checkbox state without any interaction
related to the indicator. For example, it is useful in cards based on buttons, trees, etc.

Note that `Checkbox.Indicator` cannot be focused or selected with keyboard. It is not
accessible and should not be used as a replacement for `Checkbox` component.

#### Example: indicator

```tsx
import { Checkbox, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Checkbox.Indicator />
      <Checkbox.Indicator checked />
      <Checkbox.Indicator indeterminate />
      <Checkbox.Indicator disabled />
      <Checkbox.Indicator disabled checked />
      <Checkbox.Indicator disabled indeterminate />
    </Group>
  );
}
```


## Checkbox.Card component

`Checkbox.Card` component can be used as a replacement for `Checkbox` to build custom
cards/buttons/other things that work as checkboxes. The root element of the component
has `role="checkbox"` attribute, it is accessible by default and supports the same
keyboard interactions as `input[type="checkbox"]`.

#### Example: card

```tsx
import { useState } from 'react';
import { Checkbox, Group, Text } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Card
      className={classes.root}
      radius="md"
      checked={checked}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>@mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}
```


You can use `Checkbox.Card` with `Checkbox.Group` the same way as `Checkbox` component:

#### Example: cardGroup

```tsx
import { useState } from 'react';
import { Checkbox, Group, Stack, Text } from '@mantine/core';
import classes from './Demo.module.css';

const data = [
  {
    name: '@mantine/core',
    description: 'Core components library: inputs, buttons, overlays, etc.',
  },
  { name: '@mantine/hooks', description: 'Collection of reusable hooks for React applications.' },
  { name: '@mantine/notifications', description: 'Notifications system' },
];

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  const cards = data.map((item) => (
    <Checkbox.Card className={classes.root} radius="md" value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Checkbox.Card>
  ));

  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={setValue}
        label="Pick packages to install"
        description="Choose all packages that you will need in your application"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Checkbox.Group>

      <Text fz="xs" mt="md">
        CurrentValue: {value.join(', ') || '–'}
      </Text>
    </>
  );
}
```


<GetElementRef component="Checkbox" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Checkbox } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Checkbox ref={ref} />;
}
```

#### Example: stylesApi

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      label="Checkbox"
      description="Checkbox description"
      error="Checkbox error"
      defaultChecked
     
    />
  );
}
```


## Example: Table with row selection

#### Example: rowSelection

```tsx
import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.position)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.position]
                : selectedRows.filter((position) => position !== element.position)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```


## Example: Customize with Styles API

#### Example: customize

```tsx
// Demo.tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      classNames={classes}
      label="Checkbox button"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}

// Demo.module.css
.root {
  border: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  border-radius: var(--mantine-radius-md);
  font-weight: 500;
  transition:
    color 100ms ease,
    background-color 100ms ease,
    border-color 100ms ease;
  cursor: pointer;

  &[data-checked] {
    background-color: var(--mantine-color-blue-filled);
    border-color: var(--mantine-color-blue-filled);
    color: var(--mantine-color-white);
  }

  & * {
    pointer-events: none;
    user-select: none;
  }
}
```


## Accessibility

Set `aria-label` or `label` prop to make the checkbox accessible:

```tsx
import { Checkbox } from '@mantine/core';

// Not ok, input is not labeled
function Bad() {
  return <Checkbox />;
}

// Ok, input is labelled by aria-label
function GoodAriaLabel() {
  return <Checkbox aria-label="My checkbox" />;
}

// Ok, input is labelled by label element
function GoodLabel() {
  return <Checkbox label="My checkbox" />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set input background color in checked state |
| description | React.ReactNode | - | Description displayed below the label |
| error | React.ReactNode | - | Error message displayed below the label |
| icon | FC<{ indeterminate: boolean; className: string; }> | undefined | - | Icon displayed when checkbox is in checked or indeterminate state |
| iconColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set icon color. By default, depends on <code>theme.autoContrast</code>. |
| id | string | - | Unique input id |
| indeterminate | boolean | - | Indeterminate state of the checkbox. If set, <code>checked</code> prop is ignored. |
| label | React.ReactNode | - | <code>label</code> associated with the checkbox |
| labelPosition | "left" | "right" | - | Position of the label relative to the input |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| rootRef | ForwardedRef<HTMLDivElement> | - | Root element ref |
| size | MantineSize | (string & {}) | - | Controls size of the component |
| wrapperProps | Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & DataAttributes | - | Props passed down to the root element |


#### Styles API

Checkbox component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Checkbox selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Checkbox-root | Root element |
| input | .mantine-Checkbox-input | Input element (`input[type="checkbox"]`) |
| icon | .mantine-Checkbox-icon | Checkbox icon, used to display checkmark and indeterminate state icon |
| inner | .mantine-Checkbox-inner | Wrapper for `icon` and `input` |
| body | .mantine-Checkbox-body | Input body, contains all other elements |
| labelWrapper | .mantine-Checkbox-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Checkbox-label | Label element |
| description | .mantine-Checkbox-description | Description displayed below the label |
| error | .mantine-Checkbox-error | Error message displayed below the label |

**Checkbox CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --checkbox-color | Controls checked checkbox `background-color` |
| root | --checkbox-radius | Controls checkbox `border-radius` |
| root | --checkbox-size | Controls checkbox `width` and `height` |
| root | --checkbox-icon-color | Controls checkbox icon `color` |

**Checkbox data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-checked | - | - |
| input | data-error | - | - |
| input | data-indeterminate | - | - |
| inner | data-label-position | - | Value of  |

**Checkbox.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-CheckboxGroup-root | Root element |
| label | .mantine-CheckboxGroup-label | Label element |
| required | .mantine-CheckboxGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-CheckboxGroup-description | Description element |
| error | .mantine-CheckboxGroup-error | Error element |

**Checkbox.Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| indicator | .mantine-CheckboxIndicator-indicator | Root element |
| icon | .mantine-CheckboxIndicator-icon | Checkbox icon |

**Checkbox.Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| indicator | --checkbox-color | Controls checked checkbox `background-color` |
| indicator | --checkbox-radius | Controls checkbox `border-radius` |
| indicator | --checkbox-size | Controls checkbox `width` and `height` |
| indicator | --checkbox-icon-color | Controls checkbox icon `color` |

**Checkbox.Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| indicator | data-checked | - | - |
| indicator | data-disabled | - | - |

**Checkbox.Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| card | .mantine-CheckboxCard-card | Root element |

**Checkbox.Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| card | --card-radius | Controls card `border-radius` |

**Checkbox.Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| card | data-checked | - | - |
| card | data-with-border | - | - |


--------------------------------------------------------------------------------

### Chip
Package: @mantine/core
Import: import { Chip } from '@mantine/core';
Description: Pick one or multiple values with inline controls

## Usage

#### Example: configurator

```tsx
import { Chip } from '@mantine/core';

function Demo() {
  return <Chip defaultChecked>Awesome chip</Chip>
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Chip } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Chip checked={checked} onChange={() => setChecked((v) => !v)}>
      My chip
    </Chip>
  );
}
```

## Change checked icon

#### Example: icon

```tsx
import { Chip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

function Demo() {
  return (
    <Chip
      icon={<IconX size={16} />}
      color="red"
      variant="filled"
      defaultChecked
    >
      Forbidden
    </Chip>
  );
}
```


## States

#### Example: states

```tsx
function Demo() {
  return (
    <>
      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center">
          <Chip value="default" variant="outline">
            Outline default
          </Chip>
          <Chip value="checked" variant="outline">
            Outline checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="outline">
            Outline checked disabled
          </Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center" mt="md">
          <Chip value="default" variant="light">
            Light default
          </Chip>
          <Chip value="checked" variant="light">
            Light checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="light">
            Light checked disabled
          </Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center" mt="md">
          <Chip value="default" variant="filled">
            Filled default
          </Chip>
          <Chip value="checked" variant="filled">
            Filled checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="filled">
            Filled checked disabled
          </Chip>
        </Group>
      </Chip.Group>
    </>
  );
}
```


## Chip with tooltip

To use `Chip` with [Tooltip](https://mantine.dev/core/tooltip/) and other similar components, set `refProp="rootRef"`
on the Tooltip component:

#### Example: tooltip

```tsx
import { Tooltip, Chip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Chip tooltip" refProp="rootRef">
      <Chip defaultChecked>Chip with tooltip</Chip>
    </Tooltip>
  );
}
```


<WrapperProps component="Chip" />

## Wrapper props

Chip supports additional props that are passed to the wrapper element for more customization options.

## Chip.Group

`Chip.Group` component manages state of child Chip components,
set `multiple` prop to allow multiple chips to be selected at a time:

#### Example: group

```tsx
import { Chip, Group } from '@mantine/core';

function Demo() {
  return (
    <>
      <Chip.Group>
        <Group justify="center">
          <Chip value="1">Single chip</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple>
        <Group justify="center" mt="md">
          <Chip value="1">Multiple chips</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Group>
      </Chip.Group>
    </>
  );
}
```


## Controlled Chip.Group

```tsx
import { useState } from 'react';
import { Chip } from '@mantine/core';

function Single() {
  // string value when multiple is false (default)
  const [value, setValue] = useState('react');

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}

function Multiple() {
  // array of strings value when multiple is true
  const [value, setValue] = useState(['react']);

  return (
    <Chip.Group multiple value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}
```

## Deselect radio chip

#### Example: deselect

```tsx
import { useState } from 'react';
import { Chip, Group } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>('first');
  const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === value) {
      setValue(null);
    }
  };

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Group>
        <Chip value="first" onClick={handleChipClick}>
          First
        </Chip>
        <Chip value="second" onClick={handleChipClick}>
          Second
        </Chip>
        <Chip value="third" onClick={handleChipClick}>
          Third
        </Chip>
      </Group>
    </Chip.Group>
  );
}
```


## Accessibility

`Chip` and `Chip.Group` components are accessible by default – they are built with native radio/checkbox inputs,
all keyboard events work the same as with native controls.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| checked | boolean | - | Checked state for controlled component |
| children | React.ReactNode | required | <code>label</code> element associated with the input |
| color | MantineColor | - | Controls components colors based on <code>variant</code> prop. Key of <code>theme.colors</code> or any valid CSS color. |
| defaultChecked | boolean | - | Default checked state for uncontrolled component |
| icon | React.ReactNode | - | Any element or component to replace default icon |
| id | string | - | Unique input id |
| onChange | (checked: boolean) => void | - | Calls when checked state changes |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| rootRef | ForwardedRef<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls various properties related to component size |
| type | "checkbox" | "radio" | - | Chip input type |
| wrapperProps | Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & DataAttributes | - | Props passed down to the root element |


#### Styles API

Chip component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Chip selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Chip-root | Root element |
| checkIcon | .mantine-Chip-checkIcon | Check icon, visible when checked prop is true |
| iconWrapper | .mantine-Chip-iconWrapper | Wraps `checkIcon` for alignment |
| input | .mantine-Chip-input | Input element, hidden by default |
| label | .mantine-Chip-label | Input label, used as a chip body |

**Chip CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chip-fz | Controls `font-size` |
| root | --chip-size | Controls `height` |
| root | --chip-icon-size | Controls width and height of the icon |
| root | --chip-padding | Controls horizontal padding when chip is not checked |
| root | --chip-checked-padding | Controls horizontal padding when chip is checked |
| root | --chip-radius | Controls `border-radius` |
| root | --chip-bg | Controls `background-color` when chip is checked |
| root | --chip-hover | Controls `background-color` when chip is checked and hovered |
| root | --chip-color | Controls `color` when chip is checked |
| root | --chip-bd | Controls border when chip is checked |
| root | --chip-spacing | Controls spacing between check icon and label |

**Chip data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-checked | Chip is checked | - |
| label | data-disabled | - | - |


--------------------------------------------------------------------------------

### CloseButton
Package: @mantine/core
Import: import { CloseButton } from '@mantine/core';
Description: Button with close icon

## Usage

`CloseButton` renders a button with `X` icon inside. It is used in other Mantine components like [Drawer](https://mantine.dev/core/drawer) or [Modal](https://mantine.dev/core/modal).

#### Example: usage

```tsx
import { CloseButton } from '@mantine/core';

function Demo() {
  return <CloseButton />;
}
```


## Change icon

You can change icon by passing any react node to the `icon` prop.
It is useful when `CloseButton` is used as a part of other components,
for example, in [Drawer](https://mantine.dev/core/drawer) or [Modal](https://mantine.dev/core/modal).
Note that if you use `icon` prop, `iconSize` prop is ignored –
you will have to set icon size manually.

#### Example: icon

```tsx
import { IconXboxX } from '@tabler/icons-react';
import { CloseButton } from '@mantine/core';

function Demo() {
  return <CloseButton icon={<IconXboxX size={18} stroke={1.5} />} />;
}
```


## Accessibility

To make `CloseButton` accessible for screen readers, you need to either set `aria-label` or
use [VisuallyHidden](https://mantine.dev/core/visually-hidden) component:

```tsx
import { CloseButton, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <CloseButton aria-label="Close modal" />

      <CloseButton>
        <VisuallyHidden>Close modal</VisuallyHidden>
      </CloseButton>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Content rendered inside the button. For example <code>VisuallyHidden</code> with label for screen readers. |
| disabled | boolean | - | Sets <code>disabled</code> attribute, assigns disabled styles |
| icon | React.ReactNode | - | React node to replace the default close icon. If set, <code>iconSize</code> prop is ignored. |
| iconSize | string | number | - | <code>X</code> icon <code>width</code> and <code>height</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| size | number | MantineSize | (string & {}) | - | Controls width and height of the button. Numbers are converted to rem. |


#### Styles API

CloseButton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**CloseButton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-CloseButton-root | Root element |

**CloseButton CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cb-icon-size | Controls `width` of the `X` icon |
| root | --cb-radius | Controls `border-radius` of the button |
| root | --cb-size | Controls `width` and `height` of the button |


--------------------------------------------------------------------------------

### Code
Package: @mantine/core
Import: import { Code } from '@mantine/core';
Description: Inline and block code

## Usage

By default, Code component renders inline `code` html element:

#### Example: usage

```tsx
import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}
```


## Block code

To render code in `pre` element pass `block` prop to Code component:

#### Example: block

```tsx
import { Code } from '@mantine/core';

const codeForPreviousDemo = `import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}
```


## Custom color

By default, code color is gray, you can change it to any valid CSS color or to one
of the [theme.colors](https://mantine.dev/theming/colors):

#### Example: colors

```tsx
import { Code, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Code color="blue.9" c="white">
        React.createElement()
      </Code>
      <Code color="var(--mantine-color-blue-light)">React.createElement()</Code>
    </Group>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| block | boolean | - | If set, code is rendered in <code>pre</code> |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, controls <code>background-color</code> of the code. By default, calculated based on the color scheme. |


#### Styles API

Code component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Code selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Code-root | Root element |

**Code CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --code-bg | Controls `background-color` |

**Code data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-block | - | - |

**Codehighlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-Codehighlight-codeHighlight | Root element |
| showCodeButton | .mantine-Codehighlight-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-Codehighlight-pre | Pre element, contains code element |
| code | .mantine-Codehighlight-code | Code element |
| control | .mantine-Codehighlight-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-Codehighlight-controlTooltip | Root element of control tooltip |
| controls | .mantine-Codehighlight-controls | A wrapper around controls |
| scrollarea | .mantine-Codehighlight-scrollarea | Scroll area, contains code |

**Codehighlight CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| codeHighlight | --ch-background | Background color |
| codeHighlight | --ch-max-height | Max height of code block in collapsed state |
| codeHighlight | --ch-radius | Border radius |

**Codehighlighttabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-Codehighlighttabs-codeHighlight | Root element of inner CodeHighlight component |
| showCodeButton | .mantine-Codehighlighttabs-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-Codehighlighttabs-pre | Pre element, contains code element |
| code | .mantine-Codehighlighttabs-code | Code element |
| control | .mantine-Codehighlighttabs-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-Codehighlighttabs-controlTooltip | Root element of control tooltip |
| controls | .mantine-Codehighlighttabs-controls | A wrapper around controls |
| scrollarea | .mantine-Codehighlighttabs-scrollarea | Scroll area, contains code |
| root | .mantine-Codehighlighttabs-root | Root element |
| filesScrollarea | .mantine-Codehighlighttabs-filesScrollarea | Scrollarea with files list |
| files | .mantine-Codehighlighttabs-files | Files names list |
| file | .mantine-Codehighlighttabs-file | File name |
| fileIcon | .mantine-Codehighlighttabs-fileIcon | File icon |


--------------------------------------------------------------------------------

### Collapse
Package: @mantine/core
Import: import { Collapse } from '@mantine/core';
Description: Animate presence with slide down/up transition

## Usage

#### Example: usage

```tsx
import { Button, Group, Text, Collapse, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle content</Button>
      </Group>

      <Collapse in={opened}>
        <Text>{/* ... content */}</Text>
      </Collapse>
    </Box>
  );
}
```


## Change transition

Set following props to control transition:

* `transitionDuration` – duration in ms
* `transitionTimingFunction` – timing function (ease, linear, etc.), defaults to `ease`
* `onTransitionEnd` – called when transition ends (both open and close)

#### Example: transition

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Text, Collapse, Box } from '@mantine/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle with linear transition</Button>
      </Group>

      <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
        <Text>{/* ...content */}</Text>
      </Collapse>
    </Box>
  );
}
```


## Nested Collapse components

#### Example: nested

```tsx
function Demo() {
  return (
    <CollapsedDemo buttonProps={{ children: 'Root collapse' }}>
      <Text mt="md" size="lg" fw={700}>
        This collapse contains another collapse
      </Text>
      <Text mt="xs">{lorem}</Text>
      <CollapsedDemo buttonProps={{ variant: 'outline', children: 'Inner collapse' }}>
        <Text mt="md" size="lg" fw={700}>
          This collapse is inside another collapse
        </Text>
        <Text mt="xs">{lorem}</Text>
      </CollapsedDemo>
    </CollapsedDemo>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animateOpacity | boolean | - | Determines whether opacity should be animated |
| in | boolean | required | Opened state |
| keepMounted | boolean | - | Keep element in DOM when collapsed, useful for nested collapses |
| onTransitionEnd | () => void | - | Called each time transition ends |
| transitionDuration | number | - | Transition duration in ms |
| transitionTimingFunction | string | - | Transition timing function |


--------------------------------------------------------------------------------

### ColorInput
Package: @mantine/core
Import: import { ColorInput } from '@mantine/core';
Description: Capture color from user

## Usage

<InputFeatures component="ColorInput" element="input" />

ColorInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. ColorInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { ColorInput } from '@mantine/core';


function Demo() {
  return (
    <ColorInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { ColorInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <ColorInput value={value} onChange={setValue} />;
}
```

## Formats

Component supports hex, hexa, rgb, rgba, hsl and hsla color formats.
Slider to change opacity is displayed only for hexa, rgba and hsla formats:

#### Example: formatsConfigurator

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput defaultValue="#C5D899" />;
}
```


## Preserve invalid input

By default, `ColorInput` will revert the value on blur to the last known valid value.
To change this behavior and keep invalid value, set `fixOnBlur={false}`:

#### Example: fixOnBlur

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput fixOnBlur={false} label="Value is not fixed on blur" placeholder="May contain invalid value" />;
}
```


## onChangeEnd

`onChangeEnd` is called when user stops dragging slider or changes input value.
It is useful when you need to update color only when user finished interaction with the component:

#### Example: onChangeEnd

```tsx
import { useState } from 'react';
import { ColorInput, Text } from '@mantine/core';

function Demo() {
  const [changeEndValue, setChangeEndValue] = useState('#FFFFFF');

  return (
    <>
      <Text mb="md">
        Change end value: <b>{changeEndValue}</b>
      </Text>

      <ColorInput
        label="Pick color"
        placeholder="Pick color"
        defaultValue="#FFFFFF"
        onChangeEnd={setChangeEndValue}
      />
    </>
  );
}
```


## Disable free input

To disable free input set `disallowInput` prop:

#### Example: disallowInput

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput disallowInput />;
}
```


## With swatches

You can add any amount of predefined color swatches:

#### Example: swatches

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      format="hex"
      swatches={[${Object.keys(DEFAULT_THEME.colors)
        .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
        .join(', ')}]}
    />
  );
}
```


By default, there will be 7 swatches per row, you can change this with `swatchesPerRow` prop,
like in [ColorPicker](https://mantine.dev/core/color-picker/) component:

#### Example: swatchesConfigurator

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker format="hex" swatches={[${Object.keys(DEFAULT_THEME.colors)
      .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
      .join(', ')}]} />
  );
}
```


If you need to restrict color picking to certain colors – disable color picker and disallow free input:

#### Example: swatchesOnly

```tsx
import { ColorInput, DEFAULT_THEME } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      placeholder="Pick color"
      label="Your favorite color"
      disallowInput
      withPicker={false}
      swatches={[
        ...DEFAULT_THEME.colors.red,
        ...DEFAULT_THEME.colors.green,
        ...DEFAULT_THEME.colors.blue,
      ]}
    />
  );
}
```


## Close dropdown on color swatch click

To close the dropdown when one of the color swatches is clicked, set `closeOnColorSwatchClick` prop:

#### Example: closeOnColorSwatchClick

```tsx
import { ColorInput, DEFAULT_THEME } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      closeOnColorSwatchClick
      label="Dropdown is closed when color swatch is clicked"
      placeholder="Click color swatch"
      swatches={[
        ...DEFAULT_THEME.colors.red,
        ...DEFAULT_THEME.colors.green,
        ...DEFAULT_THEME.colors.blue,
      ]}
    />
  );
}
```


## Hide dropdown

To hide dropdown, set `withPicker={false}`:

#### Example: withPicker

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}
```


## Eye dropper

By default, if [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
is available, eye dropper icon will be displayed at the right section of the input.
To disable it, set `withEyeDropper={false}`:

#### Example: noEyeDropper

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput withEyeDropper={false} label="Without eye dropper" placeholder="Not fun" />;
}
```


## Change eye dropper icon

You can replace eye dropper icon with any React node using `eyeDropperIcon` prop:

#### Example: eyeDropperIcon

```tsx
import { ColorInput } from '@mantine/core';
import { IconFocus2 } from '@tabler/icons-react';

function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<IconFocus2 size={18} stroke={1.5} />}
      label="With custom eye dropper icon"
      placeholder="Pick color"
    />
  );
}
```


<InputSections component="ColorInput" />

## Input sections

ColorInput supports left and right sections to display icons, buttons or other content alongside the input.

Note that by default, `ColorPicker` has color preview in the left section and eye dropper button
in the right section. You can replace these elements with any React node using `leftSection`
and `rightSection` props:

#### Example: sections

```tsx
import { ColorInput } from '@mantine/core';
import { IconColorPicker } from '@tabler/icons-react';

function Demo() {
  const icon = <IconColorPicker size={18} stroke={1.5} />;

  return (
    <>
      <ColorInput
        label="With custom left section"
        placeholder="Replaces color swatch"
        leftSection={icon}
        withEyeDropper={false}
      />
      <ColorInput
        label="With custom right section"
        placeholder="Replaces eye dropper"
        rightSection={icon}
        mt="md"
      />
    </>
  );
}
```


## Error state

#### Example: error

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorInput label="Boolean error" placeholder="Boolean error" error />
      <ColorInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput disabled label="Disabled input" placeholder="Disabled input" />;
}
```


## Read only

#### Example: readOnly

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput readOnly label="Cannot modify value" defaultValue="#F0FCFE" />;
}
```


#### Example: stylesApi

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      label="Label"
      placeholder="ColorInput"
      description="Description"
      error="Error"
      withAsterisk
      swatches={['#000', '#fff', '#f00', '#0f0', '#00f']}
      format="rgba"
      
    />
  );
}
```


<GetElementRef component="ColorInput" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { ColorInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <ColorInput ref={ref} />;
}
```

<InputAccessibility component="ColorInput" />

## Accessibility

ColorInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| closeOnColorSwatchClick | boolean | - | If set, the dropdown is closed when one of the color swatches is clicked |
| defaultValue | string | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| disallowInput | boolean | - | If input is not allowed, the user can only pick value with color picker and swatches |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| eyeDropperButtonProps | Record<string, any> | - | Props passed down to the eye dropper button |
| eyeDropperIcon | React.ReactNode | - | An icon to replace the default eye dropper icon |
| fixOnBlur | boolean | - | If set, the input value resets to the last known valid value when the input loses focus |
| format | ColorFormat | - | Color format |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| onChange | (value: string) => void | - | Called when value changes |
| onChangeEnd | (value: string) => void | - | Called when the user stops dragging one of the sliders or changes the value with keyboard |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | PopoverProps | - | Props passed down to the <code>Popover</code> component |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| swatches | string[] | - | A list of colors used to display swatches list below the color picker |
| swatchesPerRow | number | - | Number of swatches per row |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withEyeDropper | boolean | - | If set, the eye dropper button is displayed in the right section |
| withPicker | boolean | - | Determines whether the color picker should be displayed |
| withPreview | boolean | - | If set, the preview color swatch is displayed in the left section of the input |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

ColorInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-ColorInput-wrapper | Root element |
| input | .mantine-ColorInput-input | Input element |
| section | .mantine-ColorInput-section | Left and right sections |
| root | .mantine-ColorInput-root | Root element |
| label | .mantine-ColorInput-label | Label element |
| required | .mantine-ColorInput-required | Required asterisk element, rendered inside label |
| description | .mantine-ColorInput-description | Description element |
| error | .mantine-ColorInput-error | Error element |
| preview | .mantine-ColorInput-preview | Color preview, displayed only when `format` supports alpha channel |
| body | .mantine-ColorInput-body | Contains alpha/hue sliders and color preview |
| slider | .mantine-ColorInput-slider | Alpha and hue sliders root |
| sliderOverlay | .mantine-ColorInput-sliderOverlay | Element used to display various overlays over hue and alpha sliders |
| saturation | .mantine-ColorInput-saturation | Saturation picker |
| saturationOverlay | .mantine-ColorInput-saturationOverlay | Element used to display various overlays over saturation picker |
| sliders | .mantine-ColorInput-sliders | Contains alpha and hue sliders |
| thumb | .mantine-ColorInput-thumb | Thumb of all sliders |
| swatch | .mantine-ColorInput-swatch | Color swatch |
| swatches | .mantine-ColorInput-swatches | Color swatches list |
| dropdown | .mantine-ColorInput-dropdown | Popover dropdown |
| colorPreview | .mantine-ColorInput-colorPreview | Color swatch preview in input left section |
| eyeDropperButton | .mantine-ColorInput-eyeDropperButton | Eye dropper button |
| eyeDropperIcon | .mantine-ColorInput-eyeDropperIcon | Default eye dropper icon |

**ColorInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| colorPreview | --ci-preview-size | Controls `width` and `height` of color preview |


--------------------------------------------------------------------------------

### ColorPicker
Package: @mantine/core
Import: import { ColorPicker } from '@mantine/core';
Description: Pick colors in hex(a), rgb(a), hsl(a) and hsv(a) formats

## Usage

#### Example: usage

```tsx
import { useState } from 'react';
import { ColorPicker, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </>
  );
}
```


## Color format

`ColorPicker` supports hex, hexa, rgb, rgba, hsl and hsla color formats.
Slider to change opacity and color preview are displayed only for hexa, rgba and hsla formats:

#### Example: formatsConfigurator

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return <ColorPicker />;
}
```


## With swatches

You can add predefined color swatches with `swatches` prop:

#### Example: swatches

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker
      format="hex"
      swatches={[${Object.keys(DEFAULT_THEME.colors)
        .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
        .join(', ')}]}
    />
  );
}
```


By default, `ColorPicker` will display 7 swatches per row, you can configure it with `swatchesPerRow` prop:

#### Example: swatchesConfigurator

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker format="hex" swatches={[${Object.keys(DEFAULT_THEME.colors)
      .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
      .join(', ')}]} />
  );
}
```


To display swatches without picker set `withPicker={false}` and `fullWidth` props:

#### Example: swatchesOnly

```tsx
import { useState } from 'react';
import { DEFAULT_THEME, ColorPicker, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState('#fff');

  return (
    <>
      <ColorPicker
        format="hex"
        value={value}
        onChange={onChange}
        withPicker={false}
        fullWidth
        swatches={[
          ...DEFAULT_THEME.colors.red.slice(0, 7),
          ...DEFAULT_THEME.colors.green.slice(0, 7),
          ...DEFAULT_THEME.colors.blue.slice(0, 7),
        ]}
      />

      <Text>{value}</Text>
    </>
  );
}
```


## Size

`ColorPicker` has 5 predefined sizes: `xs`, `sm`, `md`, `lg` and `xl`:

#### Example: sizeConfigurator

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return <ColorPicker />;
}
```


## fullWidth

Set `fullWidth` prop to stretch component to 100% of parent width. In this case the picker will not
have fixed width, but you can still use `size` prop to control sizes of sliders.

#### Example: fullWidth

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}
```


#### Example: stylesApi

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker format="rgba" size="lg" swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']} />
  );
}
```


## HueSlider component

#### Example: hueSlider

```tsx
import { useState } from 'react';
import { HueSlider, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState(250);

  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  );
}
```


## AlphaSlider component

#### Example: alphaSlider

```tsx
import { useState } from 'react';
import { AlphaSlider, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState(0.55);

  return (
    <>
      <Text>Alpha value: {value}</Text>
      <AlphaSlider color="#1c7ed6" value={value} onChange={onChange} />
    </>
  );
}
```


## Accessibility

ColorPicker component is accessible by default:

* Saturation, hue and alpha sliders are focusable
* When moused is used to interact with the slider, focus is moved to the slider
* All values can be changed with arrows

To make component accessible for screen readers, set `saturationLabel`, `hueLabel` and `alphaLabel`:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker
      saturationLabel="Saturation"
      hueLabel="Hue"
      alphaLabel="Alpha"
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alphaLabel | string | - | Alpha slider <code>aria-label</code> |
| defaultValue | string | - | Uncontrolled component default value |
| focusable | boolean | - | If set, interactive elements (sliders thumbs and swatches) are focusable with keyboard |
| format | ColorFormat | - | Color format |
| fullWidth | boolean | - | If set, the component takes 100% width of its container |
| hueLabel | string | - | Hue slider <code>aria-label</code> |
| onChange | (value: string) => void | - | Called when value changes |
| onChangeEnd | (value: string) => void | - | Called when the user stops dragging one of the sliders or changes the value with keyboard |
| onColorSwatchClick | (color: string) => void | - | Called when one of the color swatches is clicked |
| saturationLabel | string | - | Saturation slider <code>aria-label</code> |
| size | MantineSize | (string & {}) | - | Controls size of hue, alpha and saturation sliders |
| swatches | string[] | - | A list of colors used to display swatches list below the color picker |
| swatchesPerRow | number | - | Number of swatches per row |
| value | string | - | Controlled component value |
| withPicker | boolean | - | Determines whether the color picker should be displayed |


#### Styles API

ColorPicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorPicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-ColorPicker-wrapper | Root element |
| preview | .mantine-ColorPicker-preview | Color preview, displayed only when `format` supports alpha channel |
| body | .mantine-ColorPicker-body | Contains alpha/hue sliders and color preview |
| slider | .mantine-ColorPicker-slider | Alpha and hue sliders root |
| sliderOverlay | .mantine-ColorPicker-sliderOverlay | Element used to display various overlays over hue and alpha sliders |
| saturation | .mantine-ColorPicker-saturation | Saturation picker |
| saturationOverlay | .mantine-ColorPicker-saturationOverlay | Element used to display various overlays over saturation picker |
| sliders | .mantine-ColorPicker-sliders | Contains alpha and hue sliders |
| thumb | .mantine-ColorPicker-thumb | Thumb of all sliders |
| swatch | .mantine-ColorPicker-swatch | Color swatch |
| swatches | .mantine-ColorPicker-swatches | Color swatches list |

**ColorPicker CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| wrapper | --cp-body-spacing | Controls spacing between sliders and saturation |
| wrapper | --cp-preview-size | Controls size of the preview swatch |
| wrapper | --cp-width | Controls `width` of the root element |
| wrapper | --cp-swatch-size | Controls swatch `width` and `height` |
| wrapper | --cp-thumb-size | Controls thumb `width` and `height` in all sliders and saturation picker |
| wrapper | --cp-saturation-height | Controls `height` of the saturation picker |


--------------------------------------------------------------------------------

### ColorSwatch
Package: @mantine/core
Import: import { ColorSwatch } from '@mantine/core';
Description: Displays color

## Usage

#### Example: usage

```tsx
import { ColorSwatch, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ColorSwatch color="#009790" />
      <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
      <ColorSwatch color="var(--mantine-color-orange-5)" />
    </Group>
  );
}
```


## withShadow

By default, `ColorSwatch` has an inner box-shadow to make it more visible on light backgrounds,
you can disable it by setting `withShadow={false}` prop:

#### Example: shadow

```tsx
import { ColorSwatch } from '@mantine/core';

function Demo() {
  return <ColorSwatch color="rgba(255, 255, 255, 0.7)" />;
}
```


<Polymorphic defaultElement="div" changeToElement="button" component="ColorSwatch" />

## Polymorphic component

ColorSwatch is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { ColorSwatch } from '@mantine/core';

function Demo() {
  return <ColorSwatch component="button" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, ColorSwatchProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

#### Example: component

```tsx
import { useState } from 'react';
import { ColorSwatch, CheckIcon } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(true);

  return (
    <ColorSwatch
      component="button"
      color="var(--mantine-color-grape-6)"
      onClick={() => setChecked((c) => !c)}
      style={{ color: '#fff', cursor: 'pointer' }}
    >
      {checked && <CheckIcon size={12} />}
    </ColorSwatch>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Content displayed inside the swatch |
| color | string | required | Valid CSS color to display |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem. |
| size | React.CSSProperties["width"] | - | Controls <code>width</code> and <code>height</code> of the swatch, any valid CSS value, numbers are converted to rem. |
| withShadow | boolean | - | Determines whether the swatch should have inner <code>box-shadow</code> |


#### Styles API

ColorSwatch component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorSwatch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ColorSwatch-root | Root element |
| alphaOverlay | .mantine-ColorSwatch-alphaOverlay | Overlay with checkerboard pattern |
| shadowOverlay | .mantine-ColorSwatch-shadowOverlay | Overlay with inner box-shadow |
| colorOverlay | .mantine-ColorSwatch-colorOverlay | Overlay with given color background |
| childrenOverlay | .mantine-ColorSwatch-childrenOverlay | Overlay with `children` inside |

**ColorSwatch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cs-radius | Controls `border-radius` of all overlays and `root` element |
| root | --cs-size | Controls `width`, `height`, `min-width` and `min-height` of the `root` element |


--------------------------------------------------------------------------------

### Combobox
Package: @mantine/core
Import: import { Combobox } from '@mantine/core';
Description: Create custom select, autocomplete or multiselect inputs

## Examples

This page contains only a small set of examples, as the full code of the demos is long.
You can find all 50+ examples on a [separate page](https://mantine.dev/combobox?e=BasicSelect).

<ExamplesButton link="/combobox?e=BasicSelect" label="Open Combobox examples page" />

## Usage

`Combobox` provides a set of components and hooks to custom select, multiselect or autocomplete components.
The component is very flexible – you have full control of the rendering and logic.

#### Example: select

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## useCombobox hook

`useCombobox` hook provides combobox store. The store contains the current state of the component
and handlers to update it. Created store must be passed to the `store` prop of `Combobox`:

```tsx
import { Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox();
  return (
    <Combobox store={combobox}>{/* Your implementation */}</Combobox>
  );
}
```

## useCombobox options

`useCombobox` hooks accepts an options object with the following properties:

```tsx
interface UseComboboxOptions {
  /** Default value for `dropdownOpened`, `false` by default */
  defaultOpened?: boolean;

  /** Controlled `dropdownOpened` state */
  opened?: boolean;

  /** Called when `dropdownOpened` state changes */
  onOpenedChange?(opened: boolean): void;

  /** Called when dropdown closes with event source: keyboard, mouse or unknown */
  onDropdownClose?(eventSource: ComboboxDropdownEventSource): void;

  /** Called when dropdown opens with event source: keyboard, mouse or unknown */
  onDropdownOpen?(eventSource: ComboboxDropdownEventSource): void;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** `behavior` passed down to `element.scrollIntoView`, `'instant'` by default */
  scrollBehavior?: ScrollBehavior;
}
```

You can import `UseComboboxOptions` type from `@mantine/core` package:

```tsx
import type { UseComboboxOptions } from '@mantine/core';
```

## Combobox store

Combobox store is an object with the following properties:

```tsx
interface ComboboxStore {
  /** Current dropdown opened state */
  dropdownOpened: boolean;

  /** Opens dropdown */
  openDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** Closes dropdown */
  closeDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** Toggles dropdown opened state */
  toggleDropdown(
    eventSource?: 'keyboard' | 'mouse' | 'unknown'
  ): void;

  /** Selected option index */
  selectedOptionIndex: number;

  /** Selects `Combobox.Option` by index */
  selectOption(index: number): void;

  /** Selects first `Combobox.Option` with `active` prop.
   *  If there are no such options, the function does nothing.
   */
  selectActiveOption(): string | null;

  /** Selects first `Combobox.Option` that is not disabled.
   *  If there are no such options, the function does nothing.
   * */
  selectFirstOption(): string | null;

  /** Selects next `Combobox.Option` that is not disabled.
   *  If the current option is the last one, the function selects first option, if `loop` is true.
   */
  selectNextOption(): string | null;

  /** Selects previous `Combobox.Option` that is not disabled.
   *  If the current option is the first one, the function selects last option, if `loop` is true.
   * */
  selectPreviousOption(): string | null;

  /** Resets selected option index to -1, removes `data-combobox-selected` from selected option */
  resetSelectedOption(): void;

  /** Triggers `onClick` event of selected option.
   *  If there is no selected option, the function does nothing.
   */
  clickSelectedOption(): void;

  /** Updates selected option index to currently selected or active option.
   *  The function is required to be used with searchable components to update selected option index
   *  when options list changes based on search query.
   */
  updateSelectedOptionIndex(target?: 'active' | 'selected'): void;

  /** List id, used for `aria-*` attributes */
  listId: string | null;

  /** Sets list id */
  setListId(id: string): void;

  /** Ref of `Combobox.Search` input */
  searchRef: React.RefObject<HTMLInputElement | null>;

  /** Moves focus to `Combobox.Search` input */
  focusSearchInput(): void;

  /** Ref of the target element */
  targetRef: React.RefObject<HTMLElement | null>;

  /** Moves focus to the target element */
  focusTarget(): void;
}
```

You can import `ComboboxStore` type from `@mantine/core` package:

```tsx
import type { ComboboxStore } from '@mantine/core';
```

## useCombobox handlers

Combobox store handlers can be used to control `Combobox` state.
For example, to open the dropdown, call `openDropdown` handler:

```tsx
import { Button, Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox();

  return (
    <Combobox>
      <Combobox.Target>
        <Button onClick={() => combobox.openDropdown()}>
          Open dropdown
        </Button>
      </Combobox.Target>

      {/* Your implementation */}
    </Combobox>
  );
}
```

You can use store handlers in `useCombobox` options. For example, you can
call `selectFirstOption` when the dropdown is opened and `resetSelectedOption`
when it is closed:

```tsx
import { Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.selectFirstOption(),
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox store={combobox}>{/* Your implementation */}</Combobox>
  );
}
```

## Combobox.Target

`Combobox.Target` should be used as a wrapper for the target element or component.
`Combobox.Target` marks its child as a target for dropdown and sets `aria-*` attributes
and adds keyboard event listeners to it.

`Combobox.Target` requires a single child element or component. The child component
must accept `ref` and `...others` props. You can use any Mantine component as a target without
any additional configuration, for example, [Button](https://mantine.dev/core/button/), [TextInput](https://mantine.dev/core/text-input/)
or [InputBase](https://mantine.dev/core/input/#inputbase-component).

Example of using `Combobox.Target` with [TextInput](https://mantine.dev/core/text-input/) component:

#### Example: autocomplete

```tsx
import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


Example of using `Combobox.Target` with [Button](https://mantine.dev/core/button) component:

#### Example: button

```tsx
import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem || 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button onClick={() => combobox.toggleDropdown()}>Pick item</Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
```


## Split events and dropdown targets

In some cases, you might need to use different elements as an events target and as a dropdown.
Use `Combobox.EventsTarget` to add `aria-*` attributes and keyboard event handlers, and
`Combobox.DropdownTarget` to position the dropdown relative to the target.

You can have as many `Combobox.EventsTarget` as you need, but only one `Combobox.DropdownTarget`
per `Combobox`.

Example of using `Combobox.EventsTarget` and `Combobox.DropdownTarget` with [PillsInput](https://mantine.dev/core/pills-input) component
to create a searchable multiselect component:

#### Example: searchableMultiselect

```tsx
import { useState } from 'react';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Update selected option index

`updateSelectedOptionIndex` handler is required to be called when options list changes.
Usually, the options list changes when options are filtered based on the search query. In this case,
you need to call `updateSelectedOptionIndex` in `onChange` handler of the search input.

Example of using `updateSelectedOptionIndex` handler in searchable select component:

#### Example: searchableSelect

```tsx
import { useState } from 'react';
import { InputBase, Combobox, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const shouldFilterOptions = groceries.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder="Search value"
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Search input

If you prefer search input inside the dropdown, use `Combobox.Search` component.
To focus the search input, call `combobox.focusSearchInput`, usually it is done
when the dropdown is opened. To prevent focus loss after the dropdown is closed,
call `combobox.focusTarget`:

#### Example: buttonSearch

```tsx
import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem || 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button onClick={() => combobox.toggleDropdown()}>Pick item</Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          />
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
```


## Select first option

Use `combobox.selectFirstOption` function to select the first option. It is useful
if you want to select the first option when user searching for options in the list.
If there are no options available, it will do nothing.

#### Example: selectFirstOption

```tsx
import { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [value]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Active option

Set `active` prop on `Combobox.Option` component to mark it as active.
By default, an active option does not have any styles, you can use `data-combobox-active`
[data attribute](https://mantine.dev/styles/data-attributes) to style it.

`combobox.selectActiveOption` function selects active option. Usually, it is called
when the dropdown is opened:

#### Example: activeOption

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox, CheckIcon, Group } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    },
  });

  const [value, setValue] = useState<string | null>('🥦 Broccoli');

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item} active={item === value}>
      <Group gap="xs">
        {item === value && <CheckIcon size={12} />}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.updateSelectedOptionIndex('active');
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Options groups

Render `Combobox.Option` components inside `Combobox.Group` to create options group.
`Combobox.Group` label will be automatically hidden if the group does not have any
children.

#### Example: groups

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group label="Fruits">
            <Combobox.Option value="🍎 Apples">🍎 Apples</Combobox.Option>
            <Combobox.Option value="🍌 Bananas">🍌 Bananas</Combobox.Option>
            <Combobox.Option value="🍇 Grape">🍇 Grape</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="Vegetables">
            <Combobox.Option value="🥦 Broccoli">🥦 Broccoli</Combobox.Option>
            <Combobox.Option value="🥕 Carrots">🥕 Carrots</Combobox.Option>
            <Combobox.Option value="🥬 Lettuce">🥬 Lettuce</Combobox.Option>
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Scrollable list

Set `max-height` style on either `Combobox.Dropdown` or `Combobox.Options` to make the
options list scrollable. You can use `mah` [style prop](https://mantine.dev/styles/style-props) to set
`max-height`.

#### Example: nativeScroll

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
  '🍇 Grapes',
  '🍋 Lemon',
  '🥬 Lettuce',
  '🍄 Mushrooms',
  '🍊 Oranges',
  '🥔 Potatoes',
  '🍅 Tomatoes',
  '🥚 Eggs',
  '🥛 Milk',
  '🍞 Bread',
  '🍗 Chicken',
  '🍔 Hamburger',
  '🧀 Cheese',
  '🥩 Steak',
  '🍟 French Fries',
  '🍕 Pizza',
  '🥦 Cauliflower',
  '🥜 Peanuts',
  '🍦 Ice Cream',
  '🍯 Honey',
  '🥖 Baguette',
  '🍣 Sushi',
  '🥝 Kiwi',
  '🍓 Strawberries',
];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Scrollable list with ScrollArea

You can also use [ScrollArea or ScrollArea.Autosize](https://mantine.dev/core/scroll-area) components
instead of native scrollbars:

#### Example: scrollArea

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox, ScrollArea } from '@mantine/core';

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
  '🍇 Grapes',
  '🍋 Lemon',
  '🥬 Lettuce',
  '🍄 Mushrooms',
  '🍊 Oranges',
  '🥔 Potatoes',
  '🍅 Tomatoes',
  '🥚 Eggs',
  '🥛 Milk',
  '🍞 Bread',
  '🍗 Chicken',
  '🍔 Hamburger',
  '🧀 Cheese',
  '🥩 Steak',
  '🍟 French Fries',
  '🍕 Pizza',
  '🥦 Cauliflower',
  '🥜 Peanuts',
  '🍦 Ice Cream',
  '🍯 Honey',
  '🥖 Baguette',
  '🍣 Sushi',
  '🥝 Kiwi',
  '🍓 Strawberries',
];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Hide dropdown

Set `hidden` prop on `Combobox.Dropdown` to hide the dropdown. For example,
it can be useful when you want to show the dropdown only when there is at least
one option available:

#### Example: hiddenDropdown

```tsx
import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={options.length === 0}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Control dropdown opened state

To control the dropdown opened state, pass `opened` to `useCombobox` hook:

#### Example: controlledDropdown

```tsx
import { useState } from 'react';
import { TextInput, Button, Combobox, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [opened, setOpened] = useState(false);
  const combobox = useCombobox({ opened });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Button mb="md" onClick={() => setOpened((o) => !o)}>
        Toggle dropdown
      </Button>

      <Combobox store={combobox}>
        <Combobox.Target>
          <TextInput
            label="Autocomplete"
            description="Dropdown is opened/closed when button is clicked"
            placeholder="Click button to toggle dropdown"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
```


## Popover props

`Combobox` supports most of [Popover](https://mantine.dev/core/popover) props. For example,
you can control dropdown position with `position` prop and disable Floating UI
middlewares with `middlewares` prop:

#### Example: dropdownPosition

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      position="bottom"
      middlewares={{ flip: false, shift: false }}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Without dropdown

You can use `Combobox` without dropdown. To do so, use `Combobox.EventsTarget` instead
of `Combobox.Target`:

#### Example: noDropdown

```tsx
import { useState } from 'react';
import { Combobox, TextInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');

  return (
    <Combobox onOptionSubmit={setValue}>
      <Combobox.EventsTarget>
        <TextInput
          placeholder="Pick value"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Combobox.EventsTarget>

      <Combobox.Options mt="sm">
        <Combobox.Option value="First">First</Combobox.Option>
        <Combobox.Option value="Second">Second</Combobox.Option>
        <Combobox.Option value="Third">Third</Combobox.Option>
      </Combobox.Options>
    </Combobox>
  );
}
```


#### Example: stylesApi

```tsx
import { Combobox, TextInput, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox({ opened: true });

  return (
    <Combobox store={combobox}>
      <Combobox.Target>
        <TextInput placeholder="Pick value" />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Header>Combobox header</Combobox.Header>
        <Combobox.Search placeholder="Search input" />

        <Combobox.Options>
          <Combobox.Group label="First group">
            <Combobox.Option value="1">First</Combobox.Option>
            <Combobox.Option value="2">Second</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="Second group">
            <Combobox.Option value="3">Third</Combobox.Option>
            <Combobox.Option value="4">Fourth</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="Third group">
            <Combobox.Empty>Nothing found in this group...</Combobox.Empty>
          </Combobox.Group>
        </Combobox.Options>

        <Combobox.Footer>Combobox footer</Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | ArrowPosition | - | Arrow position |
| arrowRadius | number | - | Arrow <code>border-radius</code> in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | Combobox content |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| dropdownPadding | Padding<string | number> | - | Controls <code>padding</code> of the dropdown |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. <code>display: none</code> styles are added instead. |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number | FloatingAxesOffsets | - | Offset of the dropdown element |
| onClose | () => void | - | Called when dropdown closes |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: string, optionProps: ComboboxOptionProps) => void | - | Called when item is selected with the <code>Enter</code> key or by clicking it |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to <code>Overlay</code> component |
| portalProps | BasePortalProps | - | Props to pass down to the <code>Portal</code> when <code>withinPortal</code> is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| positionDependencies | any[] | - | @deprecated : Do not use, will be removed in 9.0 |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| readOnly | boolean | - | Determines whether the <code>Combobox</code> value can be changed |
| resetSelectionOnOptionHover | boolean | - | Determines whether selection should be reset when option is hovered |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any other valid CSS <code>box-shadow</code> value |
| size | MantineSize | (string & {}) | - | Controls items <code>font-size</code> and <code>padding</code> |
| store | ComboboxStore | - | Combobox store, can be used to control combobox state |
| transitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component. Use to configure duration and animation type. |
| width | PopoverWidth | - | Dropdown width, or <code>'target'</code> to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the <code>Portal</code> |
| zIndex | string | number | - | Dropdown <code>z-index</code> |


#### Styles API

Combobox component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Combobox selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| options | .mantine-Combobox-options | `Combobox.Options` component |
| dropdown | .mantine-Combobox-dropdown | `Combobox.Dropdown` component |
| option | .mantine-Combobox-option | `Combobox.Option` component |
| search | .mantine-Combobox-search | `Combobox.Search` input |
| empty | .mantine-Combobox-empty | `Combobox.Empty` component |
| header | .mantine-Combobox-header | `Combobox.Header` component |
| footer | .mantine-Combobox-footer | `Combobox.Footer` component |
| group | .mantine-Combobox-group | `Combobox.Group` component |
| groupLabel | .mantine-Combobox-groupLabel | Label of `Combobox.Group` component |

**Combobox CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| dropdown | --combobox-option-fz | Controls option `font-size` |
| dropdown | --combobox-option-padding | Controls option `padding` |
| dropdown | --combobox-padding | Controls dropdown `padding` |

**Combobox data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | - | - |
| option | data-combobox-disabled | - | - |
| dropdown | data-hidden | - | - |


--------------------------------------------------------------------------------

### Container
Package: @mantine/core
Import: import { Container } from '@mantine/core';
Description: Center content with padding and max-width

## Grid strategy

Starting from 8.2.0, `Container` supports `strategy="grid"` prop which enables more
features.

Differences from the default `strategy="block"`:

* Uses `display: grid` instead of `display: block`
* Does not include default inline padding
* Does not set `max-width` on the root element (uses grid template columns instead)

Features supported by `strategy="grid"`:

* Everything that is supported by `strategy="block"`
* Children with `data-breakout` attribute take the entire width of the container's parent element
* Children with `data-container` inside `data-breakout` have the same width as the main grid column

Example of using breakout feature:

#### Example: breakout

```tsx
import { Box, Container } from '@mantine/core';

function Demo() {
  return (
    <Container strategy="grid" size={500}>
      <Box bg="var(--mantine-color-indigo-light)" h={50}>
        Main content
      </Box>

      <Box data-breakout bg="var(--mantine-color-indigo-light)" mt="xs">
        <div>Breakout</div>

        <Box data-container bg="indigo" c="white" h={50}>
          <div>Container inside breakout</div>
        </Box>
      </Box>
    </Container>
  );
}
```


## Usage

`Container` centers content and limits its `max-width` to the value specified in `size` prop.
Note that the `size` prop does not make `max-width` responsive, for example,
when it set to `lg` it will always be `lg` regardless of screen size.

#### Example: usage

```tsx
import { Container } from '@mantine/core';

function Demo() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container {...demoProps}>Default Container</Container>

      <Container size="xs" {...demoProps}>
        xs Container
      </Container>

      <Container px={0} size={480} {...demoProps}>
        480px Container without padding
      </Container>
    </>
  );
}
```


## Fluid

Set `fluid` prop to make container fluid, it will take 100% of available width,
it is the same as setting `size="100%"`.

#### Example: fluid

```tsx
import { Container } from '@mantine/core';

function Demo() {
  return (
    <Container fluid h={50} bg="var(--mantine-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}
```


## Customize sizes

You can customize existing `Container` sizes and add new ones with [CSS variables](https://mantine.dev/styles/styles-api)
on [theme](https://mantine.dev/theming/theme-object):

#### Example: sizes

```tsx
import { Container, MantineProvider, createTheme, rem } from '@mantine/core';

const CONTAINER_SIZES: Record<string, number> = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 700,
  xl: 800,
  xxl: 900,
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Container size="xxs" bg="var(--mantine-color-blue-light)">
        Container with custom size
      </Container>
    </MantineProvider>
  );
}
```


## Responsive max-width

To make `Container` `max-width` responsive, use [Styles API](https://mantine.dev/styles/styles-api) to set
`classNames`. For example, you can add `responsive` size that will make `Container`
`max-width` different depending on screen size:

#### Example: responsive

```tsx
// Demo.tsx
import cx from 'clsx';
import { MantineProvider, Container, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Container size="responsive" bg="var(--mantine-color-blue-light)">
        Container with responsive size
      </Container>
    </MantineProvider>
  );
}

// Demo.module.css
.responsiveContainer {
  max-width: 300px;

  @media (min-width: em(400px)) {
    max-width: 400px;
  }

  @media (min-width: em(600px)) {
    max-width: 600px;
  }
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fluid | boolean | - | If set, the container takes 100% width of its parent and <code>size</code> prop is ignored. |
| size | number | MantineSize | (string & {}) | - | <code>max-width</code> of the container, value is not responsive – it is the same for all screen sizes. Numbers are converted to rem. Ignored when <code>fluid</code> prop is set. |
| strategy | "block" | "grid" | - | Centering strategy |


#### Styles API

Container component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Container selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Container-root | Root element |

**Container CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --container-size | Controls container `max-width` |


--------------------------------------------------------------------------------

### CopyButton
Package: @mantine/core
Import: import { CopyButton } from '@mantine/core';
Description: Copies given text to clipboard

## Usage

`CopyButton` is based on [use-clipboard](https://mantine.dev/hooks/use-clipboard/) hook.
Its children is a function that receives an object with the following properties:

* `copied` – boolean value that indicates that a given value was recently copied to the clipboard, it resets after a given timeout (defaults to 500ms)
* `copy` – function that should be called to copy given value to clipboard

#### Example: usage

```tsx
import { CopyButton, Button } from '@mantine/core';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
  );
}
```


## Security

Due to security reasons `CopyButton` component will not work in iframes and may not work with local files opened with `file://` protocol
(component will work fine with local websites that are using `http://` protocol). You can learn more about `navigator.clipboard` [here](https://web.dev/async-clipboard/).

## Timeout

You can provide a custom `copied` reset `timeout`:

#### Example: timeout

```tsx
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
```


<ServerComponentsIncompatible component="CopyButton" />

## Server components

CopyButton is not compatible with React Server Components as it uses useEffect and other client-side features. You can use it in client components only.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | (payload: { copied: boolean; copy: () => void; }) => ReactNode | required | Children callback, provides current status and copy function as an argument |
| timeout | number | - | Copied status timeout in ms |
| value | string | required | Value that is copied to the clipboard when the button is clicked |


--------------------------------------------------------------------------------

### Dialog
Package: @mantine/core
Import: import { Dialog } from '@mantine/core';
Description: Display a fixed overlay dialog at any side of the screen

## Usage

`Dialog` is a simplified version of [Modal](https://mantine.dev/core/modal/) component.
It does not include most of accessibility and usability [Modal](https://mantine.dev/core/modal/) features:

* Focus trap is not available
* Does not close on click outside
* Does not have overlay

Use `Dialog` to attract attention with not important information or action,
for example, you can create an email subscription form:

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';

function Demo() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}
```


## Change position

`Dialog` is rendered in [Portal](https://mantine.dev/core/portal/) and has fixed position, set `position` prop to control dialog's position:

```tsx
import { Dialog } from '@mantine/core';

function Demo() {
  return (
    <>
      <Dialog position={{ top: 20, left: 20 }} opened>
        Dialog in top left corner
      </Dialog>
      <Dialog position={{ bottom: 20, left: 20 }} opened>
        Dialog in bottom left corner
      </Dialog>
    </>
  );
}
```

## Accessibility

`Dialog` is not accessible and most likely will not be announced by screen reader,
make sure you do not put any important information. In most cases it would be better
to select [Modal](https://mantine.dev/core/modal/), [Drawer](https://mantine.dev/core/drawer/) or [Notifications](https://mantine.dev/x/notifications/).


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Dialog content |
| keepMounted | boolean | - | If set, dialog is not unmounted from the DOM when hidden, <code>display: none</code> styles are applied instead |
| onClose | () => void | - | Called when the close button is clicked |
| opened | boolean | required | Opened state |
| portalProps | BasePortalProps | - | Props passed down to the <code>Portal</code> component. Ignored when <code>withinPortal</code> is <code>false</code>. |
| position | AffixPosition | - | Affix position on screen |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS value to set <code>box-shadow</code> |
| size | number | MantineSize | (string & {}) | - | Controls <code>width</code> of the dialog |
| transitionProps | TransitionProps | - | Props passed down to the underlying <code>Transition</code> component |
| withBorder | boolean | - | Adds border to the root element |
| withCloseButton | boolean | - | If set, the close button is displayed |
| withinPortal | boolean | - | Determines whether the component is rendered within <code>Portal</code> |
| zIndex | React.CSSProperties["zIndex"] | - | Root element <code>z-index</code> property |


#### Styles API

Dialog component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Dialog selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dialog-root | Root element |
| closeButton | .mantine-Dialog-closeButton | Close button |

**Dialog CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --dialog-size | Controls `width` of the dialog |


--------------------------------------------------------------------------------

### Divider
Package: @mantine/core
Import: import { Divider } from '@mantine/core';
Description: Horizontal line with optional label or vertical divider

## Usage

#### Example: usage

```tsx
import { Text, Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>

      <Divider my="md" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>

      <Divider my="md" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>
    </>
  );
}
```


## Variants

#### Example: variants

```tsx
import { Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Divider my="sm" />
      <Divider my="sm" variant="dashed" />
      <Divider my="sm" variant="dotted" />
    </>
  );
}
```


## With label

#### Example: labels

```tsx
import { Divider, Box, Anchor } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <Divider my="xs" label="Label on the left" labelPosition="left" />
      <Divider my="xs" label="Label in the center" labelPosition="center" />
      <Divider my="xs" label="Label on the right" labelPosition="right" />
      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <IconSearch size={12} />
            <Box ml={5}>Search results</Box>
          </>
        }
      />
      <Divider
        my="xs"
        label={
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            Link label
          </Anchor>
        }
      />
    </>
  );
}
```


## Sizes

#### Example: sizes

```tsx
import { Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Divider size="xs" />
      <Divider size="sm" />
      <Divider size="md" />
      <Divider size="lg" />
      <Divider size="xl" />
      <Divider size={10} />
    </>
  );
}
```


## Vertical orientation

#### Example: orientation

```tsx
import { Divider, Group, Text } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Text>Label</Text>
      <Divider orientation="vertical" />
      <Text>Label</Text>
      <Divider size="sm" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="md" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="lg" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="xl" orientation="vertical" />
      <Text>Label</Text>
    </Group>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color value, by default value depends on color scheme |
| label | React.ReactNode | - | Divider label, visible only when <code>orientation</code> is <code>horizontal</code> |
| labelPosition | "center" | "left" | "right" | - | Controls label position |
| orientation | "horizontal" | "vertical" | - | Controls orientation |
| size | number | MantineSize | (string & {}) | - | Controls width/height (depends on orientation) |


#### Styles API

Divider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Divider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Divider-root | Root element |
| label | .mantine-Divider-label | Label element |

**Divider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --divider-border-style | Controls `border-style` |
| root | --divider-color | Controls `border-color` |
| root | --divider-size | Controls `border-width` |

**Divider data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-label | - | - |
| root | data-orientation | - | Value of  |
| label | data-position | - | Value of  |


--------------------------------------------------------------------------------

### Drawer
Package: @mantine/core
Import: import { Drawer } from '@mantine/core';
Description: Display overlay area at any side of the screen

## Usage

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Position

Drawer can be placed on `left` (default), `top`, `right` and `bottom`. Control drawer position with `position` prop,
for example `<Drawer position="top" />`.

#### Example: positions

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<'top' | 'left' | 'right' | 'bottom'>('top');
  const open = (p: typeof position) => {
    setPosition(p);
    setOpened(true);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        position={position}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">
        <Button variant="default" onClick={() => open('left')}>
          Left
        </Button>
        <Button variant="default" onClick={() => open('right')}>
          Right
        </Button>
        <Button variant="default" onClick={() => open('top')}>
          Top
        </Button>
        <Button variant="default" onClick={() => open('bottom')}>
          Bottom
        </Button>
      </Group>
    </>
  );
}
```


## Offset

Set `offset` prop to change drawer offset from the edge of the viewport:

#### Example: offset

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Customize overlay

`Drawer` uses [Overlay](https://mantine.dev/core/overlay/) component, you can set any props that [Overlay](https://mantine.dev/core/overlay/)
supports with `overlayProps`:

#### Example: overlay

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Sizes

You can change drawer width/height (depends on `position`) by setting `size` prop to predefined size or any valid width,
for example, `size="55%"` or `size={200}`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer position="right" size="xl" opened onClose={() => {}}>
      {/* Drawer content */}
    </Drawer>
  );
}
```

#### Example: sizes

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<number | string>('top');
  const open = (s: typeof size) => {
    setSize(s);
    setOpened(true);
  };

  const controls = (['xs', 'sm', 'md', 'lg', 'xl', '100%', '40rem', '25%'] as const).map((s) => (
    <Button variant="default" onClick={() => open(s)} key={s}>
      {s}
    </Button>
  ));

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size={size}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">{controls}</Group>
    </>
  );
}
```


## Remove header

To remove header set `withCloseButton={false}`

#### Example: header

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} withCloseButton={false}>
        Drawer without header, press escape or click on overlay to close
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Drawer with scroll

#### Example: overflow

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Header is sticky">
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Usage with ScrollArea

#### Example: scrollarea

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, ScrollArea } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Header is sticky"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Change transition

`Drawer` is built with [Transition](https://mantine.dev/core/transition/) component. Use `transitionProps`
prop to customize any [Transition](https://mantine.dev/core/transition/) properties:

#### Example: transitions

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## onExitTransitionEnd and onEnterTransitionEnd

`onExitTransitionEnd` and `onEnterTransitionEnd` props can be used to run code after
exit/enter transition is finished. For example, this is useful when you want to clear
data after drawer is closed:

#### Example: transitionEnd

```tsx
import { useState } from 'react';
import { Button, Group, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [drawerData, setDrawerData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>
      <Drawer
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onExitTransitionEnd
        </Button>
      </Group>
    </>
  );
}
```


## Initial focus

`Drawer` uses [FocusTrap](https://mantine.dev/core/focus-trap/) to trap focus. Add `data-autofocus`
attribute to the element that should receive initial focus.

#### Example: initialFocus

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, TextInput } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Focus demo">
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


If you do not want to focus any elements when the drawer is opened, use `FocusTrap.InitialFocus`
component to create a visually hidden element that will receive initial focus:

#### Example: initialFocusTrap

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, TextInput, FocusTrap } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Focus demo">
        <FocusTrap.InitialFocus />
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


If you do not add `data-autofocus` attribute and do not use `FocusTrap.InitialFocus`,
drawer will focus the first focusable element inside it which is usually the close button.

## Control behavior

The following props can be used to control `Drawer` behavior.
In most cases it is not recommended to turn these features off –
it will make the component less accessible.

* `trapFocus` – determines whether focus should be trapped inside drawer
* `closeOnEscape` – determines whether the drawer should be closed when `Escape` key is pressed
* `closeOnClickOutside` – determines whether the drawer should be closed when user clicks on the overlay
* `returnFocus` – determines whether focus should be returned to the element that was focused before the drawer was opened

## react-remove-scroll settings

`Drawer` uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. You can pass props down to the `RemoveScroll` component
with `removeScrollProps`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    >
      {/* Drawer content */}
    </Drawer>
  );
}
```

## Change close icon

Use `closeButtonProps` to customize close button:

#### Example: closeIcon

```tsx
import { IconXboxX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Compound components

You can use the following compound components to have full control over the `Drawer` rendering:

* `Drawer.Root` – context provider
* `Drawer.Overlay` – render [Overlay](https://mantine.dev/core/overlay/)
* `Drawer.Content` – main drawer element, should include all drawer content
* `Drawer.Header` – sticky header, usually contains `Drawer.Title` and `Drawer.CloseButton`
* `Drawer.Title` – `h2` element, `aria-labelledby` of `Drawer.Content` is pointing to this element, usually is rendered inside `Drawer.Header`
* `Drawer.CloseButton` – close button, usually rendered inside `Drawer.Header`
* `Drawer.Body` – a place for main content, `aria-describedby` of `Drawer.Content` is pointing to this element

#### Example: composition

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer title</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Drawer.Stack

Use `Drawer.Stack` component to render multiple drawers at the same time.
`Drawer.Stack` keeps track of opened drawers, manages z-index values, focus trapping
and `closeOnEscape` behavior. `Drawer.Stack` is designed to be used with `useDrawersStack` hook.

Differences from using multiple `Drawer` components:

* `Drawer.Stack` manages z-index values – drawers that are opened later will always have higher z-index value disregarding their order in the DOM
* `Drawer.Stack` disables focus trap and `Escape` key handling for all drawers except the one that is currently opened
* Drawers that are not currently opened are present in the DOM but are hidden with `opacity: 0` and `pointer-events: none`
* Only one overlay is rendered at a time

#### Example: stack

```tsx
import { Button, Group, Drawer, useDrawersStack } from '@mantine/core';

function Demo() {
  const stack = useDrawersStack(['delete-page', 'confirm-action', 'really-confirm-action']);

  return (
    <>
      <Drawer.Stack>
        <Drawer {...stack.register('delete-page')} title="Delete this page?">
          Are you sure you want to delete this page? This action cannot be undone.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('confirm-action')} color="red">
              Delete
            </Button>
          </Group>
        </Drawer>

        <Drawer {...stack.register('confirm-action')} title="Confirm action">
          Are you sure you want to perform this action? This action cannot be undone. If you are
          sure, press confirm button below.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('really-confirm-action')} color="red">
              Confirm
            </Button>
          </Group>
        </Drawer>

        <Drawer {...stack.register('really-confirm-action')} title="Really confirm action">
          Jokes aside. You have confirmed this action. This is your last chance to cancel it. After
          you press confirm button below, action will be performed and cannot be undone. For real
          this time. Are you sure you want to proceed?
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={stack.closeAll} color="red">
              Confirm
            </Button>
          </Group>
        </Drawer>
      </Drawer.Stack>

      <Button variant="default" onClick={() => stack.open('delete-page')}>
        Open drawer
      </Button>
    </>
  );
}
```


Note that `Drawer.Stack` can only be used with `Drawer` component. Components built with `Drawer.Root`
and other compound components are not compatible with `Drawer.Stack`.

## useDrawersStack hook

`useDrawersStack` hook provides an easy way to control multiple drawers at the same time.
It accepts an array of unique drawers ids and returns an object with the following properties:

```tsx
interface UseDrawersStackReturnType<T extends string> {
  // Current opened state of each drawer
  state: Record<T, boolean>;

  // Opens drawer with the given id
  open: (id: T) => void;

  // Closes drawer with the given id
  close: (id: T) => void;

  // Toggles drawer with the given id
  toggle: (id: T) => void;

  // Closes all drawers within the stack
  closeAll: () => void;

  // Returns props for drawer with the given id
  register: (id: T) => {
    opened: boolean;
    onClose: () => void;
    stackId: T;
  };
}
```

Example of using `useDrawersStack` with `Drawer` component:

```tsx
import { Drawer, useDrawersStack } from '@mantine/core';

function Demo() {
  const stack = useDrawersStack(['first', 'second']);

  return (
    <>
      <Drawer {...stack.register('first')}>First</Drawer>
      <Drawer {...stack.register('second')}>Second</Drawer>
      <Button onClick={() => stack.open('first')}>Open first</Button>
    </>
  );
}
```

## Fixed elements offset

`Drawer` component uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
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

## Accessibility

`Drawer` component follows [WAI-ARIA recommendations](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) on accessibility.

Set `title` props to make component accessible, will add `aria-labelledby` to the content element:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return <Drawer title="Drawer label" opened onClose={() => {}} />;
}
```

To set close button `aria-label` use `closeButtonProps`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer
      closeButtonProps={{ 'aria-label': 'Close drawer' }}
      opened
      onClose={() => {}}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Drawer content |
| closeButtonProps | ModalBaseCloseButtonProps | - | Props passed down to the close button |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, <code>onClose</code> is called when user presses the escape key |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. <code>display: none</code> styles are applied instead. |
| lockScroll | boolean | - | If set, scroll is locked when <code>opened={true}</code> |
| offset | string | number | - | Drawer container offset from the viewport end |
| onClose | () => void | required | Called when modal/drawer is closed |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| opened | boolean | required | Controls opened state |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the <code>Overlay</code> component, can be used to configure opacity, <code>background-color</code>, styles and other properties |
| padding | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when <code>withinPortal</code> is set |
| position | DrawerPosition | - | Side of the screen on which drawer will be opened |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when <code>onClose</code> is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS box-shadow value |
| size | number | MantineSize | (string & {}) | - | Controls width of the content area |
| stackId | string | - | Id of the drawer in the <code>Drawer.Stack</code> |
| title | React.ReactNode | - | Drawer title |
| transitionProps | TransitionProps | - | Props added to the <code>Transition</code> component that used to animate overlay and body, use to configure duration and animation type, <code>{ duration: 200, transition: 'fade-down' }</code> by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| withCloseButton | boolean | - | If set, the close button is displayed |
| withOverlay | boolean | - | If set, the overlay is displayed |
| withinPortal | boolean | - | If set, the component is rendered inside <code>Portal</code> |
| zIndex | string | number | - | <code>z-index</code> CSS property of the root element |


#### Styles API

Drawer component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Drawer selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Drawer-root | Root element |
| inner | .mantine-Drawer-inner | Element used to center modal, has fixed position, takes entire screen |
| content | .mantine-Drawer-content | `Drawer.Content` root element |
| header | .mantine-Drawer-header | Contains title and close button |
| overlay | .mantine-Drawer-overlay | Overlay displayed under the `Drawer.Content` |
| title | .mantine-Drawer-title | Drawer title (h2 tag), displayed in the header |
| body | .mantine-Drawer-body | Drawer body, displayed after header |
| close | .mantine-Drawer-close | Close button |

**Drawer CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --drawer-offset | Controls `margin` of `Drawer.Content` |
| root | --drawer-size | Controls `width` of `Drawer.Content` |
| root | --drawer-flex | Controls `flex` property of `Drawer.Content` |
| root | --drawer-align | Controls `align-items` property of `Drawer.Content` |
| root | --drawer-justify | Controls `justify-content` property of `Drawer.Content` |
| root | --drawer-height | Controls `height` property of `Drawer.Content` |


--------------------------------------------------------------------------------

### Fieldset
Package: @mantine/core
Import: import { Fieldset } from '@mantine/core';
Description: Group related elements in a form

## Usage

#### Example: usage

```tsx
import { Fieldset, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Fieldset legend="Personal information">
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}
```


## Disabled

Set `disabled` prop to disable all inputs and buttons inside the fieldset:

#### Example: disabled

```tsx
import { Fieldset, TextInput, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Fieldset legend="Personal information" disabled>
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />

      <Group justify="flex-end" mt="md">
        <Button>Submit</Button>
      </Group>
    </Fieldset>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| legend | React.ReactNode | - | Fieldset legend |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |


#### Styles API

Fieldset component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Fieldset selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Fieldset-root | Root element |
| legend | .mantine-Fieldset-legend | Legend element |

**Fieldset CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --fieldset-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### FileButton
Package: @mantine/core
Import: import { FileButton } from '@mantine/core';
Description: Open file picker with a button click

## Usage

#### Example: usage

```tsx
import { useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
```


## Multiple files

Set `multiple` prop to allow picking multiple files:

#### Example: multiple

```tsx
import { useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      )}

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </>
  );
}
```


## Reset file

`resetRef` should be used to fix issue with stale value on hidden input element as input type file cannot be controlled.
Call `resetRef` when user selection is cleared:

#### Example: reset

```tsx
import { useState, useRef } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  return (
    <>
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
```


<ServerComponentsIncompatible component="FileButton" />

## Server components

FileButton is not compatible with React Server Components as it uses useEffect and other client-side features. You can use it in client components only.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | - | File input accept attribute, for example, <code>"image/png,image/jpeg"</code> |
| capture | boolean | "user" | "environment" | - | Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. |
| children | (props: { onClick: () => void; }) => ReactNode | required | Function that receives button props and returns react node that should be rendered |
| disabled | boolean | - | Disables file picker |
| form | string | - | Input form attribute |
| inputProps | React.ComponentPropsWithoutRef<"input"> | - | Passes down props to the input element used to capture files |
| multiple | boolean | - | If set, user can pick more than one file |
| name | string | - | Input name attribute |
| onChange | (payload: Multiple extends true ? File[] : File | null) => void | required | Called when files are picked |
| resetRef | ForwardedRef<() => void> | - | Reference of the function that should be called when value changes to null or empty array |


--------------------------------------------------------------------------------

### FileInput
Package: @mantine/core
Import: import { FileInput } from '@mantine/core';
Description: Capture files from user

## Usage

<InputFeatures component="FileInput" element="input" />

FileInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. FileInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { FileInput } from '@mantine/core';


function Demo() {
  return (
    <FileInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

When `multiple` is `false`:

```tsx
import { useState } from 'react';
import { FileInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<File | null>(null);
  return <FileInput value={value} onChange={setValue} />;
}
```

When `multiple` is `true`:

```tsx
import { useState } from 'react';
import { FileInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<File[]>([]);
  return <FileInput multiple value={value} onChange={setValue} />;
}
```

## Multiple

Set `multiple` to allow user to pick more than one file:

#### Example: multiple

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput label="Upload files" placeholder="Upload files" multiple />;
}
```


## Accept

Set `accept` prop to restrict files selection to specific mime types:

#### Example: accept

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
  );
}
```


## Clearable

Set `clearable` prop to display clear button in the right section of the input
when file is selected. Note that if you define custom right section, clear button
will not be rendered.

#### Example: clearable

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}
```


## Custom value component

#### Example: valueComponent

```tsx
import { FileInput, FileInputProps, Pill } from '@mantine/core';

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

function Demo() {
  return (
    <FileInput
      label="Upload files"
      placeholder="Upload files"
      multiple
      valueComponent={ValueComponent}
    />
  );
}
```


## Error state

#### Example: error

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <FileInput label="Boolean error" placeholder="Boolean error" error />
      <FileInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput disabled label="Disabled input" placeholder="Disabled input" />;
}
```


<InputSections component="FileInput" />

## Input sections

FileInput supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { FileInput } from '@mantine/core';
import { IconFileCv } from '@tabler/icons-react';

function Demo() {
  const icon = <IconFileCv size={18} stroke={1.5} />;

  return (
    <>
      <FileInput
        leftSection={icon}
        label="Attach your CV"
        placeholder="Your CV"
        leftSectionPointerEvents="none"
      />
      <FileInput
        rightSection={icon}
        label="Attach your CV"
        placeholder="Your CV"
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <FileInput
      label="Label"
      placeholder="FileInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      
    />
  );
}
```


<GetElementRef component="FileInput" refType="button" />

## Get element ref

```tsx
import { useRef } from 'react';
import { FileInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <FileInput ref={ref} />;
}
```

<InputAccessibility component="FileInput" />

## Accessibility

FileInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.

## FileInputProps type

`FileInputProps` type is a generic interface which accepts a single type argument:
`multiple` value.

```tsx
import type { FileInputProps } from '@mantine/core';

type SingleInputProps = FileInputProps<false>;
type MultipleInputProps = FileInputProps<true>;
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | - | File input accept attribute, for example, <code>"image/png,image/jpeg"</code> |
| capture | boolean | "user" | "environment" | - | Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, the clear button is displayed in the right section |
| defaultValue | File | File[] | null | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| fileInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input element which is used to capture files |
| form | string | - | Input form attribute |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| multiple | boolean | - | If set, user can pick more than one file |
| name | string | - | Input name attribute |
| onChange | (payload: Multiple extends true ? File[] : File | null) => void | - | Called when value changes |
| placeholder | React.ReactNode | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the input value cannot be changed |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| resetRef | ForwardedRef<() => void> | - | Reference of the function that should be called when value changes to null or empty array |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| value | File | File[] | null | - | Controlled component value |
| valueComponent | FC<{ value: File | File[] | null; }> | - | Value renderer. By default, displays file name. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

FileInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FileInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-FileInput-wrapper | Root element of the Input |
| input | .mantine-FileInput-input | Input element |
| section | .mantine-FileInput-section | Left and right sections |
| root | .mantine-FileInput-root | Root element |
| label | .mantine-FileInput-label | Label element |
| required | .mantine-FileInput-required | Required asterisk element, rendered inside label |
| description | .mantine-FileInput-description | Description element |
| error | .mantine-FileInput-error | Error element |
| placeholder | .mantine-FileInput-placeholder | Placeholder text |


--------------------------------------------------------------------------------

### Flex
Package: @mantine/core
Import: import { Flex } from '@mantine/core';
Description: Compose elements in a flex container

## Usage

#### Example: configurator

```tsx
import { Flex, Button } from '@mantine/core';


function Demo() {
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
```


## Supported props

<StylePropsTable source={FLEX_STYLE_PROPS_DATA} />

## Responsive props

`Flex` component props can have responsive values the same way as other [style props](https://mantine.dev/styles/style-props/):

#### Example: responsive

```tsx
import { Flex, Button } from '@mantine/core';

function Demo() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
```


## Difference from Group and Stack

`Flex` component is an alternative to [Group](https://mantine.dev/core/group/) and [Stack](https://mantine.dev/core/stack/).
`Flex` is more flexible, it allows creating both horizontal and vertical flexbox layouts, but requires more configuration.
Unlike [Group](https://mantine.dev/core/group/) and [Stack](https://mantine.dev/core/stack/) `Flex` is [polymorphic](https://mantine.dev/guides/polymorphic/) and supports responsive props.

<FlexboxGapSupport component="Flex" />

## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | StyleProp<AlignItems> | - | <code>align-items</code> CSS property |
| columnGap | StyleProp<MantineSpacing> | - | <code>column-gap</code> CSS property |
| direction | StyleProp<FlexDirection> | - | <code>flex-direction</code> CSS property |
| gap | StyleProp<MantineSpacing> | - | <code>gap</code> CSS property |
| justify | StyleProp<JustifyContent> | - | <code>justify-content</code> CSS property |
| rowGap | StyleProp<MantineSpacing> | - | <code>row-gap</code> CSS property |
| wrap | StyleProp<FlexWrap> | - | <code>flex-wrap</code> CSS property |


#### Styles API

Flex component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Flex selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Flex-root | Root element |


--------------------------------------------------------------------------------

### FloatingIndicator
Package: @mantine/core
Import: import { FloatingIndicator } from '@mantine/core';
Description: Display a floating indicator over a group of elements

## Usage

`FloatingIndicator` is designed to highlight active element in a group.
It can be used to create custom segmented controls, tabs and other similar components.

`FloatingIndicator` renders an element over the `target` element. To calculate the position it is
required to pass `parent` element which has a relative position.

By default, `FloatingIndicator` does not have any visible styles. You can use `className` prop
or [Styles API](https://mantine.dev/styles/styles-api) to apply styles.

#### Example: segmented

```tsx
import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';

const data = ['React', 'Vue', 'Angular', 'Svelte'];

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
```


## Multiple rows

`FloatingIndicator` can be used to highlight active element in a group with multiple rows:

#### Example: direction

```tsx
import { useState } from 'react';
import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconCircle,
} from '@tabler/icons-react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState('center');

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <div className={classes.root} dir="ltr" ref={setRootRef}>
      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />

      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up-left')}
          ref={setControlRef('up-left')}
          mod={{ active: active === 'up-left' }}
        >
          <IconArrowUpLeft size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up')}
          ref={setControlRef('up')}
          mod={{ active: active === 'up' }}
        >
          <IconArrowUp size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up-right')}
          ref={setControlRef('up-right')}
          mod={{ active: active === 'up-right' }}
        >
          <IconArrowUpRight size={26} stroke={1.5} />
        </UnstyledButton>
      </div>
      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('left')}
          ref={setControlRef('left')}
          mod={{ active: active === 'left' }}
        >
          <IconArrowLeft size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('center')}
          ref={setControlRef('center')}
          mod={{ active: active === 'center' }}
        >
          <IconCircle size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('right')}
          ref={setControlRef('right')}
          mod={{ active: active === 'right' }}
        >
          <IconArrowRight size={26} stroke={1.5} />
        </UnstyledButton>
      </div>
      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down-left')}
          ref={setControlRef('down-left')}
          mod={{ active: active === 'down-left' }}
        >
          <IconArrowDownLeft size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down')}
          ref={setControlRef('down')}
          mod={{ active: active === 'down' }}
        >
          <IconArrowDown size={26} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down-right')}
          ref={setControlRef('down-right')}
          mod={{ active: active === 'down-right' }}
        >
          <IconArrowDownRight size={26} stroke={1.5} />
        </UnstyledButton>
      </div>
    </div>
  );
}
```


## Example: Tabs

#### Example: tabs

```tsx
// Demo.tsx
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Third tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
}

// Demo.module.css
.list {
  position: relative;
  margin-bottom: var(--mantine-spacing-md);
}

.indicator {
  background-color: var(--mantine-color-white);
  border-radius: var(--mantine-radius-md);
  border: 1px solid var(--mantine-color-gray-2);
  box-shadow: var(--mantine-shadow-sm);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
  }
}

.tab {
  z-index: 1;
  font-weight: 500;
  transition: color 100ms ease;
  color: var(--mantine-color-gray-7);

  &[data-active] {
    color: var(--mantine-color-black);
  }

  @mixin dark {
    color: var(--mantine-color-dark-1);

    &[data-active] {
      color: var(--mantine-color-white);
    }
  }
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| displayAfterTransitionEnd | boolean | - | If set, the indicator is displayed after transition ends.
Should be set if the component is used inside a container that has <code>transform: scale(n)</code> styles. |
| parent | HTMLElement | null | required | Parent element with relative position based on which indicator position is calculated |
| target | HTMLElement | null | required | Target element over which indicator is displayed |
| transitionDuration | string | number | - | Transition duration in ms |


#### Styles API

FloatingIndicator component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FloatingIndicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-FloatingIndicator-root | Root element |

**FloatingIndicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --transition-duration | Controls indicator transition duration |


--------------------------------------------------------------------------------

### FocusTrap
Package: @mantine/core
Import: import { FocusTrap } from '@mantine/core';
Description: Trap focus at child node

## Usage

FocusTrap is a component implementation of [use-focus-trap](https://mantine.dev/hooks/use-focus-trap/) hook,
it is used in all Mantine components that require focus trap ([Modal](https://mantine.dev/core/modal/), [DatePicker](https://mantine.dev/dates/date-picker/), [Popover](https://mantine.dev/core/popover/), etc.).

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap, TextInput, Button, Box } from '@mantine/core';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  );
}
```


## Initial focus

To define the element that will receive initial focus set `data-autofocus` attribute:

#### Example: initial

```tsx
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap, TextInput, Button, Box } from '@mantine/core';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" data-autofocus />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  );
}
```


## FocusTrap.InitialFocus

`FocusTrap.InitialFocus` is a special component that adds a visually hidden
element which will receive the focus when the focus trap is activated.
Once `FocusTrap.InitialFocus` loses focus, it is removed from the tab order.

For example, it is useful if you do not want to focus any elements inside the [Modal](https://mantine.dev/core/modal) when it is opened:

#### Example: initialFocusTrap

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, FocusTrap } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
        <FocusTrap.InitialFocus />
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Focus trapping logic

* Focus is trapped within child node if `active` prop is `true`
* When FocusTrap component is mounted or when `active` prop changes from `false` to `true` first element with `data-autofocus` attribute is focused
* If there are no elements with `data-autofocus` attribute, then the first element that supports keyboard interaction is focused
* If the target element does not have focusable elements or does not support `ref`, then the focus trap will not work
* Trap stops working when element outside of the `FocusTrap` child is focused


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | - | If set to <code>false</code>, disables focus trap |
| children | any | required | Element to trap focus at, must support ref prop |
| innerRef | ForwardedRef<any> | - | Ref to combine with the focus trap ref |
| refProp | string | - | Prop that is used to access element ref |


--------------------------------------------------------------------------------

### Grid
Package: @mantine/core
Import: import { Grid } from '@mantine/core';
Description: Responsive 12 columns grid system

## Usage

#### Example: usage

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
```


## Columns span

`Grid.Col` `span` prop controls the ratio of column width to the total width of the row.
By default, grid uses 12 columns layout, so `span` prop can be any number from 1 to 12.

Examples:

* `<Grid.Col span={3} />` – 3 / 12 = 25% of row width
* `<Grid.Col span={4} />` – 4 / 12 = 33% of row width
* `<Grid.Col span={6} />` – 6 / 12 = 50% of row width
* `<Grid.Col span={12} />` – 12 / 12 = 100% of row width

`span` prop also supports object syntax to change column width based on viewport width,
it accepts `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12. The syntax
is the same as in [style props](https://mantine.dev/styles/style-props).

In the following example `span={{ base: 12, md: 6, lg: 3 }}`:

* `base` – 12 / 12 = 100% of row width when viewport width is less than `md` breakpoint
* `md` – 6 / 12 = 50% of row width when viewport width is between `md` and `lg` breakpoints
* `lg` – 3 / 12 = 25% of row width when viewport width is greater than `lg` breakpoint

#### Example: responsive

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
    </Grid>
  );
}
```


## Gutter

Set `gutter` prop to control spacing between columns. The prop works the same
way as [style props](https://mantine.dev/styles/style-props) – you can reference `theme.spacing` values
with `xs`, `sm`, `md`, `lg` and `xl` strings and use object syntax to change gutter
based on viewport width:

#### Example: gutter

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
```


## Grow

If `grow` prop is set, column will grow to fill the remaining space in the row:

#### Example: growConfigurator

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
      <Grid.Col span={4}>5</Grid.Col>
    </Grid>
  );
}
```


## Column offset

Set `offset` prop on `Grid.Col` component to add gaps to the grid. `offset` prop
supports the same syntax as `span` prop: a number from 1 to 12 or an object with `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12.

#### Example: offset

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3}>1</Grid.Col>
      <Grid.Col span={3}>2</Grid.Col>
      <Grid.Col span={3} offset={3}>3</Grid.Col>
    </Grid>
  );
}
```


## Order

Set the `order` prop on `Grid.Col` component to change the order of columns. `order` prop
supports the same syntax as `span` prop: a number from 1 to 12 or an object with `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12.

#### Example: order

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={3} order={{ base: 3, sm: 2, lg: 2 }}>3</Grid.Col>
      <Grid.Col span={3} order={{ base: 1, sm: 3, lg: 1 }}>1</Grid.Col>
    </Grid>
  );
}
```


## Multiple rows

Once columns `span` and `offset` sum exceeds `columns` prop (12 by default),
columns are moved to the next row:

#### Example: rows

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
    </Grid>
  );
}
```


## Justify and align

You can control `justify-content` and `align-items` CSS properties with `justify` and `align` props on `Grid` component:

#### Example: flexConfigurator

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3} h={80}>1</Grid.Col>
      <Grid.Col span={3} h={120}>2</Grid.Col>
      <Grid.Col span={3} h={100}>3</Grid.Col>
    </Grid>
  );
}
```


## Auto sized columns

All columns in a row with `span="auto"` grow as much as they can to fill the row.
In the following example, the second column takes up 50% of the row while the other two columns automatically resize to fill the remaining space:

#### Example: auto

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="auto">1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span="auto">3</Grid.Col>
    </Grid>
  );
}
```


## Fit column content

If you set `span="content"`, the column's size will automatically adjust to match the width of its content:

#### Example: content

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="content">fit content</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
```


## Change columns count

By default, grid uses 12 columns layout, you can change it by setting `columns` prop on `Grid` component.
Note that in this case, columns span and offset will be calculated relative to this value.

In the following example, first column takes 50% with 12 span (12/24), second and third take 25% (6/24):

#### Example: columns

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid columns={24}>
      <Grid.Col span={12}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span={6}>3</Grid.Col>
    </Grid>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, all responsive values
are adjusted based on the container width, not the viewport width.

Note that, when using container queries, it is also required to set `breakpoints` prop
to the exact container width values.

To see how the grid changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

#### Example: container

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only.
    // It is not required in real projects.
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <Grid
        type="container"
        breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      >
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
      </Grid>
    </div>
  );
}
```


## overflow: hidden

By default, `Grid` has `overflow: visible` style on the root element. In some cases
you might want to change it to `overflow: hidden` to prevent negative margins from
overflowing the grid container. For example, if you use `Grid` without parent container
which has padding.

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid overflow="hidden">
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Sets <code>align-items</code> |
| breakpoints | GridBreakpoints | - | Breakpoints values, only used with <code>type="container"</code> |
| columns | number | - | Number of columns in each row |
| grow | boolean | - | If set, columns in the last row expand to fill all available space |
| gutter | StyleProp<MantineSpacing> | - | Gutter between columns, key of <code>theme.spacing</code> or any valid CSS value |
| justify | JustifyContent | - | Sets <code>justify-content</code> |
| overflow | Overflow | - | Sets <code>overflow</code> CSS property on the root element |
| type | "media" | "container" | - | Type of queries used for responsive styles |


#### Styles API

Grid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Grid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| container | .mantine-Grid-container | Container element, only used with `type="container"` prop |
| root | .mantine-Grid-root | Root element |
| inner | .mantine-Grid-inner | Columns wrapper |
| col | .mantine-Grid-col | `Grid.Col` root element |

**Grid CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --grid-overflow | Controls `overflow` property |
| root | --grid-align | Controls `align-items` property |
| root | --grid-justify | Controls `justify-content` property |


--------------------------------------------------------------------------------

### Group
Package: @mantine/core
Import: import { Group } from '@mantine/core';
Description: Compose elements and components in a horizontal flex container

## Usage

`Group` is a horizontal flex container. If you need a vertical flex container, use [Stack](https://mantine.dev/core/stack)
component instead. If you need to have full control over flex container properties, use [Flex](https://mantine.dev/core/flex) component.

#### Example: usage

```tsx
import { Group, Button } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Group>
  );
}
```


## preventGrowOverflow

`preventGrowOverflow` prop allows you to control how `Group` children should behave when there is not enough
space to fit them all on one line. By default, children are not allowed to take more space than
`(1 / children.length) * 100%` of parent width (`preventGrowOverflow` is set to `true`). To change
this behavior, set `preventGrowOverflow` to `false` and children will be allowed to grow and take
as much space as they need.

#### Example: preventGrowOverflow

```tsx
import { Group, Button, Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box maw={500} p="md" mx="auto" bg="var(--mantine-color-blue-light)">
        <Text size="sm" mb={5}>
          preventGrowOverflow: true – each child width is always limited to 33% of parent width
          (since there are 3 children)
        </Text>

        <Group grow wrap="nowrap">
          <Button variant="default">First button</Button>
          <Button variant="default">Second button with large content</Button>
          <Button variant="default">Third button</Button>
        </Group>

        <Text size="sm" mb={5} mt="md">
          preventGrowOverflow: false – children will grow based on their content, they can take more
          than 33% of parent width
        </Text>

        <Group grow preventGrowOverflow={false} wrap="nowrap">
          <Button variant="default">First button</Button>
          <Button variant="default">Second button with large content</Button>
          <Button variant="default">Third button</Button>
        </Group>
      </Box>
    </Box>
  );
}
```


## Group children

**!important** `Group` works correctly only with React elements.
Strings, numbers, fragments may have incorrect styles if `grow` prop is set:

```tsx
// Invalid Group usage, do not do this
import { Group } from '@mantine/core';

function InvalidDemo() {
  return (
    <Group grow>
      First string
      <>
        <div>element inside fragment</div>
        <div>another inside fragment</div>
      </>
      {20}
    </Group>
  );
}
```

<FlexboxGapSupport component="Group" />

## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Controls <code>align-items</code> CSS property |
| gap | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value for <code>gap</code>, numbers are converted to rem |
| grow | boolean | - | Determines whether each child element should have <code>flex-grow: 1</code> style |
| justify | JustifyContent | - | Controls <code>justify-content</code> CSS property |
| preventGrowOverflow | boolean | - | Determines whether children should take only dedicated amount of space (<code>max-width</code> style is set based on the number of children) |
| wrap | FlexWrap | - | Controls <code>flex-wrap</code> CSS property |


#### Styles API

Group component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Group-root | Root element |

**Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --group-align | Controls `align-items` property |
| root | --group-justify | Controls `justify-content` property |
| root | --group-gap | Controls `gap` property |
| root | --group-wrap | Controls `flex-wrap` property |

**Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-grow | - | - |


--------------------------------------------------------------------------------

### Highlight
Package: @mantine/core
Import: import { Highlight } from '@mantine/core';
Description: Highlight given part of a string with mark

## Usage

Use Highlight component to highlight a substring in a given string with a mark tag.

Pass the main string as children to Highlight component and string part that should be highlighted to `highlight` prop.
If the main string does not include `highlight` part, it will be ignored.
`Highlight` ignores trailing whitespace and highlights all matched characters sequences.

#### Example: usage

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight>
      {{children}}
    </Highlight>
  );
}
```


## Highlight multiple substrings

To highlight multiple substrings, provide an array of values:

#### Example: multiple

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}
```


## Change highlight styles

Default [Mark](https://mantine.dev/core/mark/) styles can be overwritten with `highlightStyles` prop, it accepts either a function with a subscription to theme
or an object with styles:

#### Example: styles

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight
      ta="center"
      highlight={['highlighted', 'default']}
      highlightStyles={{
        backgroundImage:
          'linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      You can change styles of highlighted part if you do not like default styles
    </Highlight>
  );
}
```


## Text props

Highlight is based on [Text](https://mantine.dev/core/text/) component, all its props are available:

#### Example: props

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--mantine-color-anchor)"
    >
      Mantine website
    </Highlight>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | string | required | String parts of which must be highlighted |
| color | string | (string & {}) | - | Key of <code>theme.colors</code> or any valid CSS color, passed to <code>Mark</code> component <code>color</code> prop |
| gradient | MantineGradient | - | Gradient configuration, ignored when <code>variant</code> is not <code>gradient</code> |
| highlight | string | string[] | required | Substring or a list of substrings to highlight in <code>children</code> |
| highlightStyles | CSSProperties | ((theme: MantineTheme) => CSSProperties) | - | Styles applied to <code>mark</code> elements |
| inherit | boolean | - | Determines whether font properties should be inherited from the parent |
| inline | boolean | - | Sets <code>line-height</code> to 1 for centering |
| lineClamp | number | - | Number of lines after which Text will be truncated |
| size | MantineSize | (string & {}) | - | Controls <code>font-size</code> and <code>line-height</code> |
| span | boolean | - | Shorthand for <code>component="span"</code> |
| truncate | TextTruncate | - | Side on which Text must be truncated, if <code>true</code>, text is truncated from the start |


#### Styles API

Highlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Highlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Highlight-root | Root element |


--------------------------------------------------------------------------------

### HoverCard
Package: @mantine/core
Import: import { HoverCard } from '@mantine/core';
Description: Display popover section when target element is hovered

## Usage

#### Example: usage

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <Button>Hover to reveal the card</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            Hover card is revealed when user hovers over target element, it will be hidden once
            mouse is not over both target and dropdown elements
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


## Delays

Set open and close delays in ms with `openDelay` and `closeDelay` props:

#### Example: delay

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard shadow="md" openDelay={1000}>
        <HoverCard.Target>
          <Button>1000ms open delay</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Opened with 1000ms delay</Text>
        </HoverCard.Dropdown>
      </HoverCard>

      <HoverCard shadow="md" closeDelay={1000}>
        <HoverCard.Target>
          <Button>1000ms close delay</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Will close with 1000ms delay</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


## HoverCard delay group

Use `HoverCard.Group` component to sync open and close delays of multiple `HoverCard` components:

#### Example: group

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <HoverCard.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>First</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">First hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>Second</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Second hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>Third</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Third hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </HoverCard.Group>
  );
}
```


## With interactive elements

`HoverCard` is displayed only when the mouse is over the target element or dropdown,
you can use anchors and buttons within dropdowns, using inputs is not recommended:

#### Example: profile

```tsx
import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
            <Stack gap={5}>
              <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                Mantine
              </Text>
              <Anchor
                href="https://x.com/mantinedev"
                c="dimmed"
                size="xs"
                style={{ lineHeight: 1 }}
              >
                @mantinedev
              </Anchor>
            </Stack>
          </Group>

          <Text size="sm" mt="md">
            Customizable React components and hooks library with focus on usability, accessibility
            and developer experience
          </Text>

          <Group mt="md" gap="xl">
            <Text size="sm">
              <b>0</b> Following
            </Text>
            <Text size="sm">
              <b>1,174</b> Followers
            </Text>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


<TargetComponent component="HoverCard" />

## Target component

The target element determines where the HoverCard will be positioned relative to.

## Accessibility

`HoverCard` is ignored by screen readers and cannot be activated with keyboard, use it to display only additional information
that is not required to understand the context.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | ArrowPosition | - | Arrow position |
| arrowRadius | number | - | Arrow <code>border-radius</code> in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | <code>Popover.Target</code> and <code>Popover.Dropdown</code> components |
| clickOutsideEvents | string[] | - | Events that trigger outside clicks |
| closeDelay | number | - | Close delay in ms |
| closeOnClickOutside | boolean | - | Determines whether dropdown should be closed on outside clicks |
| closeOnEscape | boolean | - | Determines whether dropdown should be closed when <code>Escape</code> key is pressed |
| defaultOpened | boolean | - | Initial opened state for uncontrolled component |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
| initiallyOpened | boolean | - | Initial opened state |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. <code>display: none</code> styles are added instead. |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number | FloatingAxesOffsets | - | Offset of the dropdown element |
| onClose | () => void | - | Called when the dropdown is closed |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when the dropdown is opened |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| openDelay | number | - | Open delay in ms |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to <code>Overlay</code> component |
| portalProps | BasePortalProps | - | Props to pass down to the <code>Portal</code> when <code>withinPortal</code> is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| positionDependencies | any[] | - | @deprecated : Do not use, will be removed in 9.0 |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any other valid CSS <code>box-shadow</code> value |
| transitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component. Use to configure duration and animation type. |
| trapFocus | boolean | - | Determines whether focus should be trapped within dropdown |
| width | PopoverWidth | - | Dropdown width, or <code>'target'</code> to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withRoles | boolean | - | Determines whether dropdown and target elements should have accessible roles |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the <code>Portal</code> |
| zIndex | string | number | - | Dropdown <code>z-index</code> |


--------------------------------------------------------------------------------

### Image
Package: @mantine/core
Import: import { Image } from '@mantine/core';
Description: Image with optional fallback

## Usage

`Image` is a wrapper for `img` with minimal styles. By default, the image
will take 100% of parent width. The image size can be controlled with `w`
and `h` [style props](https://mantine.dev/styles/style-props).

#### Example: usage

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
    />
  );
}
```


## Image height

In most case, you will need to set image height to prevent layout jumps when
image is loading. You can do so with `h` [style props](https://mantine.dev/styles/style-props).

#### Example: height

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
    />
  );
}
```


## Image fit

By default the image has `object-fit: cover` style - it will
resize to cover parent element. To change this behavior, set `w="auto"` and `fit="contain"` props.

#### Example: contain

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />
  );
}
```


## Fallback image

Set `fallbackSrc` prop to display fallback image when image fails to load:

#### Example: fallback

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      src={null}
      h={200}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
    />
  );
}
```


## Usage with Next.js Image

`Image` component is a [polymorphic component](https://mantine.dev/guides/polymorphic), its root element can be changed with `component` prop.
You can use it with `next/image` and other similar components.

```tsx
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import myImage from './my-image.jpg';

function Demo() {
  return <Image component={NextImage} src={myImage} alt="My image" />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fallbackSrc | string | - | Image url used as a fallback if the image cannot be loaded |
| fit | ObjectFit | - | Controls <code>object-fit</code> style |
| onError | (event: SyntheticEvent<HTMLImageElement, Event>) => void | - | Called when image fails to load |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| src | any | - | Image url |


#### Styles API

Image component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Image selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Image-root | Root element |

**Image CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --image-object-fit | Controls `object-fit` property |
| root | --image-radius | Controls `border-radius` property |

**Image data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-fallback | Image failed to load | - |


--------------------------------------------------------------------------------

### Indicator
Package: @mantine/core
Import: import { Indicator } from '@mantine/core';
Description: Display element at the corner of another element

## Usage

#### Example: configurator

```tsx
import { Indicator, Avatar } from '@mantine/core';

function Demo() {
  return (
    <Indicator>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
      />
    </Indicator>
  );
}
```


## Inline

When the target element has a fixed width, set `inline` prop to add `display: inline-block;` styles to
Indicator container. Alternatively, you can set width and height with `style` prop if you still want the root
element to keep `display: block`.

#### Example: inline

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline label="New" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}
```


## Offset

Set `offset` to change indicator position. It is useful when Indicator component is
used with children that have border-radius:

#### Example: offset

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline size={16} offset={7} position="bottom-end" color="red" withBorder>
      <Avatar
        size="lg"
        radius="xl"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
      />
    </Indicator>
  );
}
```


## Processing animation

#### Example: processing

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline processing color="red" size={12}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
      />
    </Indicator>
  );
}
```


## Disabled

Set `disabled` to hide the indicator:

#### Example: disabled

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Avatar, Indicator, Button, Stack } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>Toggle indicator</Button>
    </Stack>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color value |
| disabled | boolean | - | If set, the indicator is hidden |
| inline | boolean | - | Determines whether the indicator container should be an inline element |
| label | React.ReactNode | - | Label displayed inside the indicator, for example, notification count |
| offset | number | - | Indicator offset relative to the target element, usually used for elements with border-radius |
| position | "bottom-end" | "bottom-start" | "top-end" | "top-start" | "bottom-center" | "top-center" | "middle-center" | "middle-end" | "middle-start" | - | Indicator position relative to the target element |
| processing | boolean | - | If set, the indicator has processing animation |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| size | string | number | - | Indicator width and height |
| withBorder | boolean | - | Adds border to the root element |
| zIndex | string | number | - | Indicator z-index |


#### Styles API

Indicator component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Indicator-root | Root element |
| indicator | .mantine-Indicator-indicator | Indicator element |

**Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --indicator-bottom | Controls `bottom` style |
| root | --indicator-left | Controls `left` style |
| root | --indicator-right | Controls `right` style |
| root | --indicator-top | Controls `top` style |
| root | --indicator-radius | Controls `border-radius` |
| root | --indicator-size | Controls `min-width` and `height` |
| root | --indicator-translate-x | Controls `translateX` style, used for positioning |
| root | --indicator-translate-y | Controls `translateY` style, used for positioning |
| root | --indicator-z-index | Controls `z-index` style |
| root | --indicator-color | Controls `background-color` |
| root | --indicator-text-color | Controls `color` |

**Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-inline | - | - |
| indicator | data-with-label | - | - |
| indicator | data-with-border | - | - |
| indicator | data-processing | - | - |


--------------------------------------------------------------------------------

### Input
Package: @mantine/core
Import: import { Input } from '@mantine/core';
Description: Base component to create custom inputs

## Disclaimer

**!important:** In most cases, you should not use `Input` in your application.
`Input` is a base for other inputs and was not designed to be used directly.
Use `Input` to create custom inputs, for other cases prefer [TextInput](https://mantine.dev/core/text-input/)
or other component.

```tsx
import { Input, TextInput } from '@mantine/core';

// Incorrect usage, input is not accessible
function Incorrect() {
  return (
    <Input.Wrapper label="Input label">
      <Input />
    </Input.Wrapper>
  );
}

// Use TextInput instead of Input everywhere you want to use Input,
// it is accessible by default and includes Input.Wrapper
function Correct() {
  return (
    <TextInput label="Input label" description="Input description" />
  );
}
```

## Usage

`Input` component is used as base for some other inputs ([NativeSelect](https://mantine.dev/core/native-select/), [TextInput](https://mantine.dev/core/text-input/), [Textarea](https://mantine.dev/core/textarea/), etc.).
The purpose of the `Input` is to provide shared styles and features to other inputs.

#### Example: usage

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return <Input placeholder="Input component" />;
}
```


<InputSections component="Input" />

## Input sections

Input supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { useState } from 'react';
import { Input, CloseButton } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
      <Input placeholder="Your email" leftSection={<IconAt size={16} />} />
      <Input
        placeholder="Clearable input"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setValue('')}
            style={{ display: value ? undefined : 'none' }}
          />
        }
      />
    </>
  );
}
```


## Change input element

Input is a [polymorphic component](https://mantine.dev/guides/polymorphic), the default root element is `input`,
but it can be changed to any other element or component.

Example of using `Input` as `button` and `select`:

#### Example: component

```tsx
import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}
```


Example of using [react-imask](https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask) with `Input`:

#### Example: mask

```tsx
import { Input } from '@mantine/core';
import { IMaskInput } from 'react-imask';

function Demo() {
  return <Input component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="Your phone" />;
}
```


## Input.Wrapper component

`Input.Wrapper` component is used in all other inputs
([TextInput](https://mantine.dev/core/text-input/), [NativeSelect](https://mantine.dev/core/native-select/), [Textarea](https://mantine.dev/core/textarea/), etc.)
under the hood, you *do not need to wrap your inputs with it, as it is already included in all of them*.
Use `Input.Wrapper` only when you want to create custom inputs.

#### Example: wrapper

```tsx
import { Input } from '@mantine/core';

function Wrapper() {
  return (
    <Input.Wrapper>
      <Input placeholder="Input inside Input.Wrapper" />
    </Input.Wrapper>
  );
}
```


## inputWrapperOrder

`inputWrapperOrder` allows configuring the order of `Input.Wrapper` parts.
It accepts an array of four elements: `label`, `input`, `error` and `description`.
Note that it is not required to include all of them, you can use only those that you need
– parts that are not included will not be rendered.

#### Example: inputWrapperOrder

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TextInput
        label="Custom layout"
        placeholder="Custom layout"
        description="Description below the input"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      />
      <TextInput
        mt="xl"
        label="Custom layout"
        placeholder="Custom layout"
        description="Error and description are"
        error="both below the input"
        inputWrapperOrder={['label', 'input', 'description', 'error']}
      />
    </>
  );
}
```


## inputContainer

With `inputContainer` prop, you can enhance inputs that use `Input.Wrapper` under the hood,
for example, you can add [Tooltip](https://mantine.dev/core/tooltip/) to the [TextInput](https://mantine.dev/core/text-input/) when
the input is focused:

#### Example: inputContainer

```tsx
import { useState } from 'react';
import { TextInput, Tooltip } from '@mantine/core';

function Demo() {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      label="TextInput with tooltip"
      description="Tooltip will be relative to the input"
      placeholder="Focus me to see tooltip"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="Additional information" position="top-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
  );
}
```


## required and withAsterisk props

All components that are based on `Input.Wrapper` support `required` and `withAsterisk` props.
When set to true, both of these props will add a red asterisk to the end of the label.
The only difference is whether input element will have `required` attribute, example with
[TextInput](https://mantine.dev/core/text-input/) component:

```tsx
import { TextInput } from '@mantine/core';

// Will display required asterisk and add `required` attribute to the input element
function RequiredDemo() {
  return <TextInput label="test-label" required />;
}

// Will only display the asterisk, `required` attribute is not added to the input element
function AsteriskDemo() {
  return <TextInput label="test-label" withAsterisk />;
}
```

## error prop

All inputs that use `Input.Wrapper` under the hood support `error` prop.
When set to `true`, it will add a red border to the input. You can also pass a React node to display
an error message below the input. To only display error message without a red border, set `error` prop
to React node and `withErrorStyles={false}`:

#### Example: error

```tsx
import { TextInput } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <TextInput placeholder="Error as boolean" label="Error as boolean" error />
      <TextInput
        mt="md"
        placeholder="Error as react node"
        label="Error as react node"
        error="Something went wrong"
      />

      <TextInput
        mt="md"
        placeholder="Without error styles on input"
        label="Without error styles on input"
        error="Something went wrong"
        withErrorStyles={false}
        rightSectionPointerEvents="none"
        rightSection={
          <IconExclamationCircle
            size={20}
            color="var(--mantine-color-error)"
          />
        }
      />
    </>
  );
}
```


## Input.Label, Input.Description and Input.Error components

`Input.Label`, `Input.Error` and `Input.Description` components can be used to create custom
form layouts if the default `Input.Wrapper` layout does not meet your requirements.

#### Example: compound

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <>
      <Input.Label required>Input label</Input.Label>
      <Input.Description>Input description</Input.Description>
      <Input.Error>Input error</Input.Error>
    </>
  );
}
```


## Input.Placeholder component

`Input.Placeholder` component can be used to add placeholder to `Input` and `InputBase` components that are based on `button` element
or do not support placeholder property natively:

#### Example: placeholder

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <Input component="button" pointer>
      <Input.Placeholder>Placeholder content</Input.Placeholder>
    </Input>
  );
}
```


## Input.ClearButton component

Use `Input.ClearButton` component to add clear button to custom inputs
based on `Input` component. `size` of the clear button is automatically
inherited from the input:

#### Example: clearButton

```tsx
import { Input } from '@mantine/core';

function Demo(){
  const [value, setValue] = useState('clearable');

  return (
    <Input
      placeholder="Clearable input"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={value !== '' ? <Input.ClearButton onClick={() => setValue('')} /> : undefined}
      rightSectionPointerEvents="auto"
      size="md"
    />
  );
}
```


## Default props on theme

You can add [default props](https://mantine.dev/theming/default-props/) on [theme](https://mantine.dev/theming/theme-object/)
to `Input` and `Input.Wrapper` components. These default props will be inherited by all inputs
that use `Input` and `Input.Wrapper` under the hood ([TextInput](https://mantine.dev/core/text-input/), [NativeSelect](https://mantine.dev/core/native-select/), [Textarea](https://mantine.dev/core/textarea/), etc.):

#### Example: defaultProps

```tsx
import { TextInput, NativeSelect, MantineProvider, createTheme, Input } from '@mantine/core';

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ['label', 'input', 'description', 'error'],
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput
        label="Text input"
        placeholder="Text input"
        description="Description below the input"
      />

      <NativeSelect
        mt="md"
        label="Native select"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        description="Description below the input"
      />
    </MantineProvider>
  );
}
```


## Styles on theme

Same as with default props, you can use `Input` and `Input.Wrapper` [Styles API](https://mantine.dev/styles/styles-api/)
on [theme](https://mantine.dev/theming/theme-object/) to add styles to all inputs:

#### Example: sharedStyles

```tsx
// Demo.tsx
import { TextInput, NativeSelect, MantineProvider, createTheme, Input } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput label="Text input" placeholder="Text input" />

      <NativeSelect
        mt="md"
        label="Native select"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </MantineProvider>
  );
}

// Demo.module.css
.label {
  background-color: var(--mantine-color-blue-light);
}

.input {
  border: 1px solid var(--mantine-color-violet-filled);
}
```


## Change focus styles

Use `&:focus-within` selector to change inputs focus styles. You can apply these styles to
one component with `classNames` prop or to all inputs with [Styles API](https://mantine.dev/styles/styles-api/)
on [theme](https://mantine.dev/theming/theme-object/).

#### Example: focusStyles

```tsx
// Demo.module.css
.input {
  transition: none;

  &:focus-within {
    outline: 2px solid var(--mantine-color-blue-filled);
    border-color: transparent;
  }
}

// Demo.tsx
import { Input, TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <>
      <Input placeholder="Regular Input component" classNames={classes} />
      <TextInput
        placeholder="TextInput component"
        label="TextInput component"
        mt="md"
        classNames={classes}
      />
    </>
  );
}
```


## InputBase component

`InputBase` component combines `Input` and `Input.Wrapper` components and supports `component` prop:

#### Example: inputBase

```tsx
import { InputBase } from '@mantine/core';
import { IMaskInput } from 'react-imask';

function Demo() {
  return (
    <>
      <InputBase
        label="Your phone"
        component={IMaskInput}
        mask="+7 (000) 000-0000"
        placeholder="Your phone"
      />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}
```


## Styles API

`Input` and `Input.Wrapper` components support [Styles API](https://mantine.dev/styles/styles-api) –
you can customize styles of any inner element with `classNames` and `styles` props.

`Input` Styles API selectors:

#### Example: stylesApi

```tsx
import { Input } from '@mantine/core';

function Demo() {
  const at = <IconAt size={16} stroke={1.5} />;
  const chevron = <IconChevronDown size={16} stroke={1.5} />;
  return <Input placeholder="Input component" leftSection={at} rightSection={chevron} />;
}
```


`Input.Wrapper` Styles API selectors:

#### Example: wrapperStylesApi

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return <Input.Wrapper label="Input label" description="Input description" error="Input error" withAsterisk />;
}
```


<GetElementRef component="Input" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Input } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Input ref={ref} />;
}
```

## Accessibility

If you use `Input` component without associated label element, set `aria-label`:

```tsx
import { Input } from '@mantine/core';

// ok – the input is labelled by the aria-label
function WithAriaLabel() {
  return <Input aria-label="Your email" />;
}

// ok – the input is labelled by the label element
function WithLabel() {
  return (
    <>
      <label htmlFor="my-email">Your email</label>
      <Input id="my-email" />
    </>
  );
}
```

When you use `Input` with `Input.Wrapper` it is required to set `id` on both components
to connect label and other elements with the input:

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <Input.Wrapper label="Your email" id="your-email">
      <Input id="your-email" />
    </Input.Wrapper>
  );
}
```

You can use [use-id](https://mantine.dev/hooks/use-id) to generate unique ids:

```tsx
import { Input } from '@mantine/core';
import { useId } from '@mantine/hooks';

function Demo() {
  const id = useId();
  return (
    <Input.Wrapper label="Your email" id={id}>
      <Input id={id} />
    </Input.Wrapper>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Determines whether the input should have error styles and <code>aria-invalid</code> attribute |
| id | string | - | Input element id |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| multiline | boolean | - | Determines whether the input can have multiple lines, for example when <code>component="textarea"</code> |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Sets <code>required</code> attribute on the <code>input</code> element |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| withAria | boolean | - | Determines whether <code>aria-</code> and other accessibility attributes should be added to the input |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element of the <code>Input</code> component |


#### Styles API

Input component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Input selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Input-wrapper | Root element of the Input |
| input | .mantine-Input-input | Input element |
| section | .mantine-Input-section | Left and right sections |

**Input CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| wrapper | --input-fz | `font-size` of the input element |
| wrapper | --input-left-section-width | `width` of the left section |
| wrapper | --input-right-section-width | `width` of the right section |
| wrapper | --input-padding-y | `padding-top` and `padding-bottom` of the input element |
| wrapper | --input-radius | `border-radius` of the input element |
| wrapper | --input-left-section-pointer-events | Controls `pointer-events` of the left section |
| wrapper | --input-right-section-pointer-events | Controls `pointer-events` of the right section |

**Inputwrapper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Inputwrapper-root | Root element |
| label | .mantine-Inputwrapper-label | Label element |
| required | .mantine-Inputwrapper-required | Required asterisk element, rendered inside label |
| description | .mantine-Inputwrapper-description | Description element |
| error | .mantine-Inputwrapper-error | Error element |

**Inputwrapper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| label | --input-label-size | Controls label `font-size` |
| label | --input-asterisk-color | Controls label asterisk text `color` |

**Inputbase selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Inputbase-wrapper | Root element of the Input |
| input | .mantine-Inputbase-input | Input element |
| section | .mantine-Inputbase-section | Left and right sections |
| root | .mantine-Inputbase-root | Root element |
| label | .mantine-Inputbase-label | Label element |
| required | .mantine-Inputbase-required | Required asterisk element, rendered inside label |
| description | .mantine-Inputbase-description | Description element |
| error | .mantine-Inputbase-error | Error element |


--------------------------------------------------------------------------------

### JsonInput
Package: @mantine/core
Import: import { JsonInput } from '@mantine/core';
Description: Capture json data from user

## Usage

`JsonInput` is based on [Textarea](https://mantine.dev/core/textarea/) component,
it includes json validation logic and option to format input value on blur:

#### Example: usage

```tsx
import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <JsonInput
      label="Your package.json"
      placeholder="Textarea will autosize to fit the content"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={4}
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { JsonInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <JsonInput value={value} onChange={setValue} />;
}
```

## Input props

<InputFeatures component="JsonInput" element="textarea" />

JsonInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all textarea element props. JsonInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { JsonInput } from '@mantine/core';


function Demo() {
  return (
    <JsonInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <JsonInput disabled defaultValue='{ "a": 1, "B": 2 }' label="Disabled" placeholder="Disabled" />
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <JsonInput
      label="Label"
      placeholder="JsonInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      autosize
      
    />
  );
}
```


<GetElementRef component="JsonInput" refType="textarea" />

## Get element ref

```tsx
import { useRef } from 'react';
import { JsonInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return <JsonInput ref={ref} />;
}
```

<InputAccessibility component="JsonInput" />

## Accessibility

JsonInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autosize | boolean | - | If set, enables textarea height growing with its content |
| defaultValue | string | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| deserialize | ((text: string, reviver?: ((this: any, key: string, value: any) => any)) => any) | undefined | - | Function to deserialize string value, used for value formatting and input JSON validation, must throw error if string cannot be processed |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| formatOnBlur | boolean | - | Determines whether the value should be formatted on blur |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| maxRows | number | - | Maximum rows for autosize textarea to grow, ignored if <code>autosize</code> prop is not set |
| minRows | number | - | Minimum rows of autosize textarea, ignored if <code>autosize</code> prop is not set |
| onChange | (value: string) => void | - | Called when value changes |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| resize | Resize | - | Controls <code>resize</code> CSS property |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| serialize | { (value: any, replacer?: ((this: any, key: string, value: any) => any), space?: string | number | undefined): string; (value: any, replacer?: (string | number)[] | null | undefined, space?: string | ... 1 more ... | undefined): string; } | undefined | - | Function to serialize value into a string, used for value formatting |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| validationError | React.ReactNode | - | Error message displayed when value is not valid JSON |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

JsonInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**JsonInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-JsonInput-wrapper | Root element of the Input |
| input | .mantine-JsonInput-input | Input element |
| section | .mantine-JsonInput-section | Left and right sections |
| root | .mantine-JsonInput-root | Root element |
| label | .mantine-JsonInput-label | Label element |
| required | .mantine-JsonInput-required | Required asterisk element, rendered inside label |
| description | .mantine-JsonInput-description | Description element |
| error | .mantine-JsonInput-error | Error element |


--------------------------------------------------------------------------------

### Kbd
Package: @mantine/core
Import: import { Kbd } from '@mantine/core';
Description: Display keyboard key

## Usage



## Size

#### Example: size

```tsx
import { Kbd } from '@mantine/core';

function Demo() {
  return <Kbd>Shift</Kbd>;
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | number | MantineSize | (string & {}) | - | Controls <code>font-size</code> and <code>padding</code> |


#### Styles API

Kbd component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Kbd selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Kbd-root | Root element |

**Kbd CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --kbd-fz | Controls `font-size` |


--------------------------------------------------------------------------------

### List
Package: @mantine/core
Import: import { List } from '@mantine/core';
Description: Display ordered or unordered list

## Usage

#### Example: configurator

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List>
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item>Submit a pull request once you are done</List.Item>
    </List>
  );
}
```


## With icons

You can replace list bullets with icon. To do so provide following props:

* `icon` on List component will be used as default icon for all list elements
* `icon` on List.Item component will override context icon from List
* `spacing` – spacing between list items from theme or any valid CSS value to set spacing, defaults to `0`
* `center` – center item content with icon
* `size` – set font size from theme

#### Example: icon

```tsx
import { List, ThemeIcon } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';

function Demo() {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size={16} />
        </ThemeIcon>
      }
    >
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed size={16} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
  );
}
```


## Nested lists

Set `withPadding` prop to offset nested lists and `listStyleType` to control bullet type:

#### Example: nested

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List listStyleType="disc">
      <List.Item>First order item</List.Item>
      <List.Item>First order item</List.Item>
      <List.Item>
        First order item with list
        <List withPadding listStyleType="disc">
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
          <List.Item>
            Nested item with list
            <List withPadding listStyleType="disc">
              <List.Item>Event more nested</List.Item>
              <List.Item>Event more nested</List.Item>
            </List>
          </List.Item>
          <List.Item>Nested item</List.Item>
        </List>
      </List.Item>
      <List.Item>First order item</List.Item>
    </List>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| center | boolean | - | Determines whether items must be centered with their icon |
| children | React.ReactNode | - | <code>List.Item</code> components |
| icon | React.ReactNode | - | Icon to replace list item dot |
| listStyleType | ListStyleType | - | Controls <code>list-style-type</code>, by default inferred from <code>type</code> |
| size | MantineSize | - | Controls <code>font-size</code> and <code>line-height</code> |
| spacing | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set spacing between items |
| type | "ordered" | "unordered" | - | List type |
| withPadding | boolean | - | Determines whether list items should be offset with padding |


#### Styles API

List component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**List selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-List-root | Root element |
| item | .mantine-List-item | ListItem root element |
| itemIcon | .mantine-List-itemIcon | ListItem icon |
| itemLabel | .mantine-List-itemLabel | ListItem content |
| itemWrapper | .mantine-List-itemWrapper | ListItem wrapper element, container, icon and content |

**List CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --list-fz | Controls `font-size` |
| root | --list-lh | Controls `line-height` |
| root | --list-spacing | Controls spacing between items |

**List data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-padding | - | - |
| item | data-centered | - | - |
| item | data-with-icon | - | - |


--------------------------------------------------------------------------------

### Loader
Package: @mantine/core
Import: import { Loader } from '@mantine/core';
Description: Indicate loading state

## Usage

`Loader` component supports 3 types of loaders: `oval`, `bars` and `dots` by default. All
loaders are animated with CSS for better performance.

#### Example: configurator

```tsx
import { Loader } from '@mantine/core';

function Demo() {
  return <Loader />;
}
```


## Size prop

You can pass any valid CSS values and numbers to `size` prop. Numbers are treated as px, but
converted to [rem](https://mantine.dev/styles/rem). For example, `size={32}` will produce
`--loader-size: 2rem` CSS variable.

#### Example: size

```tsx
import { Loader } from '@mantine/core';

function Demo() {
  return <Loader />;
}
```


## Adding custom loaders

`Loader` component is used in other components ([Button](https://mantine.dev/core/button), [ActionIcon](https://mantine.dev/core/action-icon), [LoadingOverlay](https://mantine.dev/core/loading-overlay), etc.).
You can change loader type with [default props](https://mantine.dev/theming/default-props) by setting `type`.
You can also add a custom CSS or SVG loader with `loaders` [default prop](https://mantine.dev/theming/default-props).

### Custom CSS only loader

Note that in order for `size` and `color` props to work with custom loaders, you need to
use `--loader-size` and `--loader-color` CSS variables in your loader styles.

#### Example: cssLoader

```tsx
import { MantineProvider, Loader } from '@mantine/core';
import { CssLoader } from './CssLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Loader />
    </MantineThemeProvider>
  );
}
```


### Custom SVG loader

It is recommended to use CSS only loaders, as SVG based animations may have the following issues:

* High CPU usage – loader may look glitchy on low-end devices
* Loader animation may not start playing until js is loaded – user may see static loader

In your SVG loader, you need to use `--loader-size` and `--loader-color` variables the same
way as in CSS only custom loader in order for `size` and `color` props to work. Usually,
you would need to set `width` and `height` to `var(--loader-size)` and `fill`/`stroke` to
`var(--loader-color)`.

#### Example: customType

```tsx
import { MantineProvider, Loader } from '@mantine/core';
import { RingLoader } from './RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Loader />
    </MantineThemeProvider>
  );
}
```


## children prop

`Loader` supports `children` prop. If you pass anything to `children`, it will be rendered
instead of the loader. This is useful when you want to control `Loader` representation
in components that use `loaderProps`, for example [Button](https://mantine.dev/core/button/), [LoadingOverlay](https://mantine.dev/core/loading-overlay/), [Dropzone](https://mantine.dev/x/dropzone/).

#### Example: customLoader

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} loaderProps={{ children: 'Loading...' }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Overrides default loader with given content |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |
| loaders | Partial<Record<(string & {}) | "bars" | "dots" | "oval", MantineLoaderComponent>> | - | Object of loaders components, can be customized via default props or inline. |
| size | number | MantineSize | (string & {}) | - | Controls <code>width</code> and <code>height</code> of the loader. <code>Loader</code> has predefined <code>xs</code>-<code>xl</code> values. Numbers are converted to rem. |
| type | (string & {}) | "bars" | "dots" | "oval" | - | Loader type, key of <code>loaders</code> prop |


#### Styles API

Loader component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Loader selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Loader-root | Root element |

**Loader CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --loader-color | Control loader color |


--------------------------------------------------------------------------------

### LoadingOverlay
Package: @mantine/core
Import: import { LoadingOverlay } from '@mantine/core';
Description: An overlay with centered loader

## Usage

`LoadingOverlay` renders an overlay with a loader over the parent element with relative position.
It is usually used to indicate loading state of forms.
Note that elements under overlay are still focusable with keyboard, remember to add additional logic to handle this case.

`LoadingOverlay` rendering is controlled by `visible` prop:

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```


## Loader props

You can pass props down to the [Loader](https://mantine.dev/core/loader) component with `loaderProps`:

#### Example: loaderProps

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(true);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```


## Custom inline loaders

To replace default loader with any custom content, set `loaderProps={{ children: <div>Your content</div> }}`.
You can put any React node inside `loaderProps.children`:

#### Example: customLoader

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} loaderProps={{ children: 'Loading...' }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| loaderProps | LoaderProps | - | Props passed down to <code>Loader</code> component |
| overlayProps | OverlayProps | - | Props passed down to <code>Overlay</code> component |
| transitionProps | TransitionProps | - | Props passed down to <code>Transition</code> component |
| visible | boolean | - | Determines whether the overlay should be visible |
| zIndex | string | number | - | Controls overlay <code>z-index</code> |


#### Styles API

LoadingOverlay component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**LoadingOverlay selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-LoadingOverlay-root | Root element |
| overlay | .mantine-LoadingOverlay-overlay | `Overlay` component |
| loader | .mantine-LoadingOverlay-loader | `Loader` component |

**LoadingOverlay CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --lo-z-index | Controls `z-index` of the overlay and loader |


--------------------------------------------------------------------------------

### Mark
Package: @mantine/core
Import: import { Mark } from '@mantine/core';
Description: Highlight part of the text

## Usage

#### Example: usage

```tsx
import { Text, Mark } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Highlight <Mark>this chunk</Mark> of the text
    </Text>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color |


#### Styles API

Mark component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Mark selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Mark-root | Root element |

**Mark CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --mark-bg-dark | Controls `background-color` in dark color scheme |
| root | --mark-bg-light | Controls `background-color` for light color scheme |


--------------------------------------------------------------------------------

### Menu
Package: @mantine/core
Import: import { Menu } from '@mantine/core';
Description: Combine a list of secondary actions into single interactive area

## Usage

#### Example: usage

```tsx
import { Menu, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight size={14} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Submenus

#### Example: sub

```tsx
import { Button, Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu width={200} position="bottom-start">
      <Menu.Target>
        <Button>Toggle Menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Dashboard</Menu.Item>

        <Menu.Sub openDelay={120} closeDelay={150}>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Products</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>All products</Menu.Item>
            <Menu.Item>Categories</Menu.Item>
            <Menu.Item>Tags</Menu.Item>
            <Menu.Item>Attributes</Menu.Item>
            <Menu.Item>Shipping classes</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Orders</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>Open</Menu.Item>
            <Menu.Item>Completed</Menu.Item>
            <Menu.Item>Cancelled</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Settings</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Security</Menu.Item>
            <Menu.Item>Notifications</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Controlled

Dropdown opened state can be controlled with `opened` and `onChange` props:

```tsx
import { useState } from 'react';
import { Menu } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Menu opened={opened} onChange={setOpened}>
      {/* Menu content */}
    </Menu>
  );
}
```

## Show menu on hover

Set `trigger="hover"` to reveal dropdown when hovers over menu target and dropdown.
`closeDelay` and `openDelay` props can be used to control open and close delay in ms.
Note that:

* If you set `closeDelay={0}` then menu will close before user will reach dropdown, set `offset={0}` to remove space between target element and dropdown.
* Menu with `trigger="hover"` is not accessible – users that navigate with keyboard will not be able to use it. If you need click-hover hover and click triggers, use `trigger="click-hover"`.

#### Example: hover

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
```


To make `Menu` that is revealed on hover accessible on all devices, use `trigger="click-hover"` instead.
The dropdown will be revealed on hover on desktop and on click on mobile devices.

#### Example: clickHover

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
```


## Disabled items

#### Example: disabled

```tsx
import { Menu, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function Demo() {
  return (
    <Menu>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          disabled
        >
          Search
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Dropdown position

#### Example: positionConfigurator

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu>
      {/* Menu items */}
    </Menu>
  );
}
```


## Transitions

Menu dropdown can be animated with any of premade transitions from [Transition](https://mantine.dev/core/transition/) component:

#### Example: transitions

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      {/* Menu content */}
    </Menu>
  );
}
```


## Custom component as Menu.Item

By default, `Menu.Item` renders as button element, to change that set `component` prop:

#### Example: component

```tsx
import { Menu, Button } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

function Demo() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="https://mantine.dev">
          Mantine website
        </Menu.Item>
        <Menu.Item
          leftSection={<IconExternalLink size={14} />}
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```


Note that the component you pass to `component` prop should allow spreading props to its root element:

```tsx
import { Menu } from '@mantine/core';

// ❌ Will not work with Menu.Item
function IncorrectItem() {
  return <button type="button">My custom Menu item</button>;
}

// ✅ Will work correctly with Menu.Item
const CorrectItem = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, ref) => (
  <button type="button" {...props} ref={ref}>
    My custom Menu item
  </button>
));

function Demo() {
  // ❌ Will not work
  const incorrect = <Menu.Item component={IncorrectItem} />;

  // ✅ Will work
  const correct = <Menu.Item component={CorrectItem} />;
}
```

## Custom component as target

#### Example: customControl

```tsx
import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      {/* ... menu items */}
    </Menu>
  );
}
```


#### Example: stylesApi

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu {...props} opened withArrow position="left">
      {/* ... menu items */}
    </Menu>
  );
}
```


<TargetComponent component="Menu" />

## Target component

The target element determines where the Menu will be positioned relative to.

## Accessibility

Menu follows [WAI-ARIA recommendations](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/):

* Dropdown element has `role="menu"` and `aria-labelledby="target-id"` attributes
* Target element has `aria-haspopup="menu"`, `aria-expanded`, `aria-controls="dropdown-id"` attributes
* Menu item has `role="menuitem"` attribute

Whilst the dropdown is unopened, the `aria-controls` attribute will be undefined

### Supported target elements

Uncontrolled Menu with `trigger="click"` (default) will be accessible only when used with `button` element or component that renders it ([Button](https://mantine.dev/core/button/), [ActionIcon](https://mantine.dev/core/action-icon/), etc.).
Other elements will not support `Space` and `Enter` key presses.

### Hover menu

Menu with `trigger="hover"` is not accessible – it cannot be accessed with keyboard, use it only if you do not care about accessibility. If you need click-hover hover and click triggers, use `trigger="click-hover"`.

### Navigation

If you are using the Menu to build a Navigation, you can use the options from the demo below to follow the [WAI-ARIA recommendations for navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

#### Example: navigation

```tsx
import { Group, Menu } from '@mantine/core';

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((e, i) => (
      <Menu
        key={i}
        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        {/* ... menu items */}
      </Menu>
    ));
  return <Group>{menus}</Group>;
}
```


### Keyboard interactions

If you also need to support `Tab` and `Shift + Tab` then set `menuItemTabIndex={0}`.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | ArrowPosition | - | Arrow position |
| arrowRadius | number | - | Arrow <code>border-radius</code> in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | Menu children |
| clickOutsideEvents | string[] | - | Events that trigger outside clicks |
| closeDelay | number | - | Close delay in ms, applicable only to <code>trigger="hover"</code> variant |
| closeOnClickOutside | boolean | - | If set, the dropdown is closed on outside clicks |
| closeOnEscape | boolean | - | If set, the dropdown is closed when the <code>Escape</code> key is pressed |
| closeOnItemClick | boolean | - | If set, the Menu is closed when one of the items is clicked |
| defaultOpened | boolean | - | Uncontrolled menu initial opened state |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. <code>display: none</code> styles are added instead. |
| loop | boolean | - | If set, arrow key presses loop though items (first to last and last to first) |
| menuItemTabIndex | 0 | -1 | - | Set the <code>tabindex</code> on all menu items |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number | FloatingAxesOffsets | - | Offset of the dropdown element |
| onChange | (opened: boolean) => void | - | Called when menu opened state changes |
| onClose | () => void | - | Called when Menu is closed |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when Menu is opened |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| openDelay | number | - | Open delay in ms, applicable only to <code>trigger="hover"</code> variant |
| opened | boolean | - | Controlled menu opened state |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to <code>Overlay</code> component |
| portalProps | BasePortalProps | - | Props to pass down to the <code>Portal</code> when <code>withinPortal</code> is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| positionDependencies | any[] | - | @deprecated : Do not use, will be removed in 9.0 |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any other valid CSS <code>box-shadow</code> value |
| transitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component. Use to configure duration and animation type. |
| trapFocus | boolean | - | If set, focus is trapped within the menu dropdown when it is opened |
| trigger | "hover" | "click" | "click-hover" | - | Event trigger to open menu |
| width | PopoverWidth | - | Dropdown width, or <code>'target'</code> to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withInitialFocusPlaceholder | boolean | - | If set, focus placeholder element is added before items |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the <code>Portal</code> |
| zIndex | string | number | - | Dropdown <code>z-index</code> |


#### Styles API

Menu component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Menu selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| dropdown | .mantine-Menu-dropdown | Dropdown element |
| arrow | .mantine-Menu-arrow | Dropdown arrow |
| overlay | .mantine-Menu-overlay | Overlay element |
| divider | .mantine-Menu-divider | `Menu.Divider` root element |
| label | .mantine-Menu-label | `Menu.Label` root element |
| item | .mantine-Menu-item | `Menu.Item` root element |
| itemLabel | .mantine-Menu-itemLabel | Label of `Menu.Item` |
| itemSection | .mantine-Menu-itemSection | Left and right sections of `Menu.Item` |
| chevron | .mantine-Menu-chevron | Sub menu chevron |

**Menu data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| item | data-disabled | - | - |


--------------------------------------------------------------------------------

### Modal
Package: @mantine/core
Import: import { Modal } from '@mantine/core';
Description: An accessible overlay dialog

## Usage

#### Example: usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Center modal vertically

#### Example: centered

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open centered Modal
      </Button>
    </>
  );
}
```


## Remove header

To remove header set `withCloseButton={false}`:

#### Example: header

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Modal without header, press escape or click on overlay to close
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change size

You can change modal width by setting `size` prop to predefined size or any valid width, for example, `55%` or `50rem`.
`Modal` width cannot exceed `100vw`.

#### Example: sizes

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<string | number>('md');

  const buttons = SIZES.map((s) => (
    <Button
      key={s}
      variant="default"
      onClick={() => {
        setSize(s);
        setOpened(true);
      }}
    >
      {s}
    </Button>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={size}
      >
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Group justify="center">{buttons}</Group>
    </>
  );
}
```


## Size auto

`Modal` with `size="auto"` will have width to fit its content:

#### Example: sizeAuto

```tsx
import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge } from '@mantine/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Modal size auto">
        <Text>Modal with size auto will fits its content</Text>

        <Group wrap="nowrap" mt="md">
          {badges}
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>Add badge</Button>
          <Button onClick={decrement}>Remove badge</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Fullscreen

Fullscreen modal will take the entire screen, it is usually better to change transition to `fade`
when `fullScreen` prop is set:

#### Example: fullScreen

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


To switch Modal to fullscreen on devices with small screens only use [use-media-query](https://mantine.dev/hooks/use-media-query/) hook.
`size` prop is ignored if `fullScreen` prop is set:

#### Example: fullScreenMobile

```tsx
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: ${em(800)})');

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        The Modal will be full screen only on mobile
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Customize overlay

`Modal` uses [Overlay](https://mantine.dev/core/overlay/) component, you can set any props that [Overlay](https://mantine.dev/core/overlay/)
supports with `overlayProps`:

#### Example: overlay

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Modal with scroll

#### Example: overflow

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Header is sticky">
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Usage with ScrollArea

#### Example: scrollarea

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ScrollArea } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Header is sticky"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change offsets

Use `xOffset`/`yOffset` to configure horizontal/vertical content offsets:

#### Example: offset

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" yOffset="1vh" xOffset={0}>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change transitions

`Modal` is built with [Transition](https://mantine.dev/core/transition/) component. Use `transitionProps`
prop to customize any [Transition](https://mantine.dev/core/transition/) properties:

#### Example: transitions

```tsx
import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';

function Demo() {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);

  return (
    <>
      <Modal
        opened={slowTransitionOpened}
        onClose={() => setSlowTransitionOpened(false)}
        title="Please consider this"
        transitionProps={{ transition: 'rotate-left' }}
      >
        rotate-left transition
      </Modal>

      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Please consider this"
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
      >
        fade transition 600ms linear transition
      </Modal>

      <Group justify="center">
        <Button onClick={() => setSlowTransitionOpened(true)} variant="default">
          Rotate left transition
        </Button>
        <Button onClick={() => setNoTransitionOpened(true)} variant="default">
          Fade transition
        </Button>
      </Group>
    </>
  );
}
```


## onExitTransitionEnd and onEnterTransitionEnd

`onExitTransitionEnd` and `onEnterTransitionEnd` props can be used to run code after
exit/enter transition is finished. For example, this is useful when you want to clear
data after modal is closed:

#### Example: transitionEnd

```tsx
import { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Modal
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setModalData({ title: '', message: '' });
        }}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>
      <Modal
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setModalData({ title: '', message: '' })}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setModalData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setModalData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onExitTransitionEnd
        </Button>
      </Group>
    </>
  );
}
```


## Initial focus

Modal uses [FocusTrap](https://mantine.dev/core/focus-trap/) to trap focus. Add `data-autofocus`
attribute to the element that should receive initial focus.

#### Example: initialFocus

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


If you do not want to focus any elements when the modal is opened, use `FocusTrap.InitialFocus`
component to create a visually hidden element that will receive initial focus:

#### Example: initialFocusTrap

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, FocusTrap } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
        <FocusTrap.InitialFocus />
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


If you do not add `data-autofocus` attribute and do not use `FocusTrap.InitialFocus`,
modal will focus the first focusable element inside it which is usually the close button.

## Control behavior

The following props can be used to control `Modal` behavior.
In most cases, it is not recommended to turn these features off –
it will make the component less accessible.

* `trapFocus` – determines whether focus should be trapped inside modal
* `closeOnEscape` – determines whether the modal should be closed when `Escape` key is pressed
* `closeOnClickOutside` – determines whether the modal should be closed when user clicks on the overlay
* `returnFocus` – determines whether focus should be returned to the element that was focused before the modal was opened

## react-remove-scroll settings

`Modal` uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. You can pass props down to the `RemoveScroll` component
with `removeScrollProps`:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return (
    <Modal
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    />
  );
}
```

## Change close icon

Use `closeButtonProps` to customize close button:

#### Example: closeIcon

```tsx
import { IconXboxX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Compound components

You can use the following compound components to have full control over the `Modal` rendering:

* `Modal.Root` – context provider
* `Modal.Overlay` – render [Overlay](https://mantine.dev/core/overlay/)
* `Modal.Content` – main modal element, should include all modal content
* `Modal.Header` – sticky header, usually contains `Modal.Title` and `Modal.CloseButton`
* `Modal.Title` – `h2` element, `aria-labelledby` of `Modal.Content` is pointing to this element, usually is rendered inside `Modal.Header`
* `Modal.CloseButton` – close button, usually rendered inside `Modal.Header`
* `Modal.Body` – a place for main content, `aria-describedby` of `Modal.Content` is pointing to this element

#### Example: composition

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Modal.Stack

Use `Modal.Stack` component to render multiple modals at the same time.
`Modal.Stack` keeps track of opened modals, manages z-index values, focus trapping
and `closeOnEscape` behavior. `Modal.Stack` is designed to be used with `useModalsStack` hook.

Differences from using multiple `Modal` components:

* `Modal.Stack` manages z-index values – modals that are opened later will always have higher z-index value disregarding their order in the DOM
* `Modal.Stack` disables focus trap and `Escape` key handling for all modals except the one that is currently opened
* Modals that are not currently opened are present in the DOM but are hidden with `opacity: 0` and `pointer-events: none`
* Only one overlay is rendered at a time

#### Example: stack

```tsx
import { Button, Group, Modal, useModalsStack } from '@mantine/core';

function Demo() {
  const stack = useModalsStack(['delete-page', 'confirm-action', 'really-confirm-action']);

  return (
    <>
      <Modal.Stack>
        <Modal {...stack.register('delete-page')} title="Delete this page?">
          Are you sure you want to delete this page? This action cannot be undone.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('confirm-action')} color="red">
              Delete
            </Button>
          </Group>
        </Modal>

        <Modal {...stack.register('confirm-action')} title="Confirm action">
          Are you sure you want to perform this action? This action cannot be undone. If you are
          sure, press confirm button below.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('really-confirm-action')} color="red">
              Confirm
            </Button>
          </Group>
        </Modal>

        <Modal {...stack.register('really-confirm-action')} title="Really confirm action">
          Jokes aside. You have confirmed this action. This is your last chance to cancel it. After
          you press confirm button below, action will be performed and cannot be undone. For real
          this time. Are you sure you want to proceed?
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={stack.closeAll} color="red">
              Confirm
            </Button>
          </Group>
        </Modal>
      </Modal.Stack>

      <Button variant="default" onClick={() => stack.open('delete-page')}>
        Open modal
      </Button>
    </>
  );
}
```


Note that `Modal.Stack` can only be used with `Modal` component. Components built with `Modal.Root`
and other compound components are not compatible with `Modal.Stack`.

## useModalsStack hook

`useModalsStack` hook provides an easy way to control multiple modals at the same time.
It accepts an array of unique modals ids and returns an object with the following properties:

```tsx
interface UseModalsStackReturnType<T extends string> {
  // Current opened state of each modal
  state: Record<T, boolean>;

  // Opens modal with the given id
  open: (id: T) => void;

  // Closes modal with the given id
  close: (id: T) => void;

  // Toggles modal with the given id
  toggle: (id: T) => void;

  // Closes all modals within the stack
  closeAll: () => void;

  // Returns props for modal with the given id
  register: (id: T) => {
    opened: boolean;
    onClose: () => void;
    stackId: T;
  };
}
```

Example of using `useModalsStack` with `Modal` component:

```tsx
import { Modal, useModalsStack } from '@mantine/core';

function Demo() {
  const stack = useModalsStack(['first', 'second']);

  return (
    <>
      <Modal {...stack.register('first')}>First</Modal>
      <Modal {...stack.register('second')}>Second</Modal>
      <Button onClick={() => stack.open('first')}>Open first</Button>
    </>
  );
}
```

## Fixed elements offset

`Modal` component uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
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

## Accessibility

`Modal` component follows [WAI-ARIA recommendations](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) on accessibility.

Set `title` props to make component accessible, will add `aria-labelledby` to the content element:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return <Modal title="Modal label" opened onClose={() => {}} />;
}
```

To set close button `aria-label` use `closeButtonProps`:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return (
    <Modal
      closeButtonProps={{ 'aria-label': 'Close modal' }}
      opened
      onClose={() => {}}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| centered | boolean | - | If set, the modal is centered vertically |
| children | React.ReactNode | - | Modal content |
| closeButtonProps | ModalBaseCloseButtonProps | - | Props passed down to the close button |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, <code>onClose</code> is called when user presses the escape key |
| fullScreen | boolean | - | If set, the modal takes the entire screen |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. <code>display: none</code> styles are applied instead. |
| lockScroll | boolean | - | If set, scroll is locked when <code>opened={true}</code> |
| onClose | () => void | required | Called when modal/drawer is closed |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| opened | boolean | required | Controls opened state |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the <code>Overlay</code> component, use to configure opacity, <code>background-color</code>, styles and other properties |
| padding | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when <code>withinPortal</code> is set |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when <code>onClose</code> is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS box-shadow value |
| size | number | MantineSize | (string & {}) | - | Controls width of the content area |
| stackId | string | - | Id of the modal in the <code>Modal.Stack</code> |
| title | React.ReactNode | - | Modal title |
| transitionProps | TransitionProps | - | Props added to the <code>Transition</code> component that used to animate overlay and body, use to configure duration and animation type, <code>{ duration: 200, transition: 'fade-down' }</code> by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| withCloseButton | boolean | - | If set, the close button is rendered |
| withOverlay | boolean | - | If set, the overlay is rendered |
| withinPortal | boolean | - | If set, the component is rendered inside <code>Portal</code> |
| xOffset | MarginLeft<string | number> | - | Left/right modal offset |
| yOffset | MarginTop<string | number> | - | Top/bottom modal offset |
| zIndex | string | number | - | <code>z-index</code> CSS property of the root element |


#### Styles API

Modal component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Modal selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Modal-root | Root element |
| inner | .mantine-Modal-inner | Element used to center modal, has fixed position, takes entire screen |
| content | .mantine-Modal-content | `Modal.Content` root element |
| header | .mantine-Modal-header | Contains title and close button |
| overlay | .mantine-Modal-overlay | Overlay displayed under the `Modal.Content` |
| title | .mantine-Modal-title | Modal title (h2 tag), displayed in the header |
| body | .mantine-Modal-body | Modal body, displayed after header |
| close | .mantine-Modal-close | Close button |

**Modal CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --modal-radius | Controls `border-radius` of `Modal.Content` |
| root | --modal-size | Controls `width` of `Modal.Content` |

**Modal data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-full-screen | - | - |
| root | data-centered | - | - |


--------------------------------------------------------------------------------

### MultiSelect
Package: @mantine/core
Import: import { MultiSelect } from '@mantine/core';
Description: Custom searchable multi select

<ComboboxDisclaimer component="MultiSelect" />

## Usage

`MultiSelect` provides a way to enter multiple values.
`MultiSelect` is similar to [TagsInput](https://mantine.dev/core/tags-input), but it does not allow entering custom values.

#### Example: usage

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Controlled

`MultiSelect` value must be an array of strings, other types are not supported.
`onChange` function is called with an array of strings as a single argument.

```tsx
import { useState } from 'react';
import { MultiSelect } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <MultiSelect data={[]} value={value} onChange={setValue} />;
}
```

## Clearable

Set `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

#### Example: clearable

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />
  );
}
```


## Searchable

Set `searchable` prop to allow filtering options by user input:

#### Example: searchable

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}
```


## Controlled search value

You can control search value with `searchValue` and `onSearchChange` props:

```tsx
import { useState } from 'react';
import { MultiSelect } from '@mantine/core';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <MultiSelect
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

## Nothing found

Set the `nothingFoundMessage` prop to display a given message when no options match the search query
or there is no data available. If the `nothingFoundMessage` prop is not set, the `MultiSelect` dropdown will be hidden.

#### Example: nothingFound

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
      nothingFoundMessage="Nothing found..."
    />
  );
}
```


## Checked option icon

Set `checkIconPosition` prop to `left` or `right` to control position of check icon in active option.
To remove the check icon, set `withCheckIcon={false}`. To align unchecked labels with checked ones, set `withAlignedLabels` prop.

#### Example: checkIcon

```tsx
import { MultiSelect } from '@mantine/core';


function Demo() {
  return (
    <MultiSelect
      
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="Control check icon"
      placeholder="Pick value"
      defaultValue={["React"]}
    />
  );
}
```


## Max selected values

You can limit the number of selected values with `maxValues` prop. This will not allow adding more values
once the limit is reached.

#### Example: maxValues

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Select up to 2 libraries"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      maxValues={2}
    />
  );
}
```


## Hide selected options

To remove selected options from the list of available options, set `hidePickedOptions` prop:

#### Example: hidePickedOptions

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      hidePickedOptions
    />
  );
}
```


<ComboboxData component="MultiSelect" />

## Data prop

Data that is used in MultiSelect must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

<ComboboxFiltering component="MultiSelect" />

## Filtering

MultiSelect provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

#### Example: search

```tsx
import { MultiSelect, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <MultiSelect
      label="What countries have you visited?"
      placeholder="Pick values"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
      searchable
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with `filter` function:

#### Example: sort

```tsx
import { MultiSelect, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick values"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
      searchable
    />
  );
}
```


<ComboboxLargeData component="MultiSelect" />

## Large datasets

MultiSelect can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

#### Example: limit

```tsx
import { MultiSelect } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <MultiSelect
      label="100 000 options autocomplete"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
      searchable
    />
  );
}
```


## renderOption

`renderOption` callback allows you to customize option rendering. It is called with option object and
checked state. The function must return a React node.

#### Example: renderOption

```tsx
import { MultiSelect, MultiSelectProps, Avatar, Group, Text } from '@mantine/core';

const usersData: Record<string, { image: string; email: string }> = {
  'Emily Johnson': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    email: 'emily92@gmail.com',
  },
  'Ava Rodriguez': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    email: 'ava_rose@gmail.com',
  },
  'Olivia Chen': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    email: 'livvy_globe@gmail.com',
  },
  'Ethan Barnes': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    email: 'ethan_explorer@gmail.com',
  },
  'Mason Taylor': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    email: 'mason_musician@gmail.com',
  },
};

const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].image} size={36} radius="xl" />
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <MultiSelect
      data={['Emily Johnson', 'Ava Rodriguez', 'Olivia Chen', 'Ethan Barnes', 'Mason Taylor']}
      renderOption={renderMultiSelectOption}
      maxDropdownHeight={300}
      label="Employees of the month"
      placeholder="Search for employee"
      hidePickedOptions
      searchable
    />
  );
}
```


## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/core/scroll-area).
You can control dropdown max-height with `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change dropdown styles with [Styles API](https://mantine.dev/styles/styles-api).

#### Example: scrollArea

```tsx
import { MultiSelect } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <MultiSelect
        label="With scroll area (default)"
        placeholder="Pick value"
        data={data}
        maxDropdownHeight={200}
      />

      <MultiSelect
        label="With native scroll"
        placeholder="Pick value"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

#### Example: groups

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When option is disabled, it cannot be selected and is ignored in keyboard navigation.
Note that user can still enter disabled option as a value. If you want to prohibit certain values,
use controlled component and filter them out in `onChange` function.

#### Example: disabledOptions

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


<ComboboxProps component="MultiSelect" />

## Inside Popover

To use `MultiSelect` inside popover, you need to set `withinPortal: false`:

#### Example: withinPopover

```tsx
import { Popover, Button, MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <MultiSelect
          label="Your favorite libraries"
          placeholder="Pick values"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Control dropdown opened state

You can control dropdown opened state with `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

#### Example: dropdownOpened

```tsx
import { MultiSelect, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <MultiSelect
        label="Your favorite library"
        placeholder="Pick values"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/core/popover) component.

Example of dropdown that is always displayed above the input:

#### Example: dropdownPosition

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick values"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is equal to the input width.

#### Example: dropdownWidth

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
```


## Dropdown offset

To change dropdown offset, set `offset` prop in `comboboxProps`:

#### Example: dropdownOffset

```tsx
// Demo.tsx
import { MultiSelect } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite library"
      placeholder="Pick values"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      classNames={classes}
      comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false }, offset: 0 }}
    />
  );
}

// Demo.module.css
.dropdown {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
  border-top: 0;
}

.input {
  transition: none;

  &[data-expanded] {
    border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
```


## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/core/transition) component.

#### Example: dropdownAnimation

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick values"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown padding

#### Example: dropdownPadding

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <>
      <MultiSelect
        label="Zero padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <MultiSelect
        mt="md"
        label="10px padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

#### Example: dropdownShadow

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick values"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


<InputSections component="MultiSelect" />

## Input sections

MultiSelect supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { MultiSelect } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

function Demo() {
  const icon = <IconComponents size={16} />;
  return (
    <>
      <MultiSelect
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite libraries"
        placeholder="Your favorite libraries"
      />
      <MultiSelect
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite libraries"
        placeholder="Your favorite libraries"
      />
    </>
  );
}
```


## Input props

<InputFeatures component="MultiSelect" element="input" />

MultiSelect component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. MultiSelect documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { MultiSelect } from '@mantine/core';


function Demo() {
  return (
    <MultiSelect
      
      placeholder="MultiSelect placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`MultiSelect` will not show suggestions and will not call `onChange` function.

#### Example: readOnly

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      readOnly
    />
  );
}
```


## Disabled

Set `disabled` to disable the input. When `disabled` is set,
user cannot interact with the input and `MultiSelect` will not show suggestions.

#### Example: disabled

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
```


## Error state

#### Example: error

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <>
      <MultiSelect
        label="Boolean error"
        placeholder="Boolean error"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <MultiSelect
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
     
      leftSection={<IconAt size={18} stroke={1.5} />}
      label="MultiSelect"
      description="Description"
      error="Error"
      placeholder="MultiSelect"
      defaultValue={['React', 'Angular']}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}
```


<GetElementRef component="MultiSelect" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { MultiSelect } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <MultiSelect ref={ref} />;
}
```

<InputAccessibility component="MultiSelect" />

## Accessibility

MultiSelect provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.

To set `aria-label` on the clear button, use `clearButtonProps`. Note that it is required
only when `clearable` is set.

```tsx
import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      data={[]}
      clearable
      clearButtonProps={{
        'aria-label': 'Clear input',
      }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checkIconPosition | "left" | "right" | - | Position of the check icon relative to the option label |
| chevronColor | MantineColor | - | Controls color of the default chevron |
| clearButtonProps | InputClearButtonProps | - | Props passed down to the clear button |
| clearSearchOnChange | boolean | - | Clear search value when item is selected |
| clearable | boolean | - | If set, the clear button is displayed in the right section when the component has value |
| comboboxProps | ComboboxProps | - | Props passed down to <code>Combobox</code> component |
| data | ComboboxData | - | Data used to generate options. Values must be unique, otherwise an error will be thrown and component will not render. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultSearchValue | string | - | Default search value |
| defaultValue | string[] | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| filter | OptionsFilter | - | Function based on which items are filtered and sorted |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| hiddenInputValuesDivider | string | - | Divider used to separate values in the hidden input <code>value</code> attribute |
| hidePickedOptions | boolean | - | If set, picked options are removed from the options list |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| limit | number | - | Maximum number of options displayed at a time, <code>Infinity</code> by default |
| maxDropdownHeight | string | number | - | <code>max-height</code> of the dropdown, only applicable when <code>withScrollArea</code> prop is <code>true</code>, <code>250</code> by default |
| maxValues | number | - | Maximum number of values, no limit if not set |
| nothingFoundMessage | React.ReactNode | - | Message displayed when no option matches the current search query while the <code>searchable</code> prop is set or there is no data |
| onChange | (value: string[]) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: string) => void | - | Called when option is submitted from dropdown with mouse click or <code>Enter</code> key |
| onRemove | (value: string) => void | - | Called with <code>value</code> of the removed item |
| onSearchChange | (value: string) => void | - | Called when search changes |
| openOnFocus | boolean | - | If set, the dropdown opens when the input receives focus |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| renderOption | (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => ReactNode | - | A function to render content of the option, replaces the default content of the option |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed down to the underlying <code>ScrollArea</code> component in the dropdown |
| searchValue | string | - | Controlled search value |
| searchable | boolean | - | Allows searching |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, <code>false</code> by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, <code>false</code> by default |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| value | string[] | - | Controlled component value |
| withAlignedLabels | boolean | - | If set, unchecked labels are aligned with checked ones |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCheckIcon | boolean | - | If set, the check icon is displayed near the selected option label |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with <code>ScrollArea.AutoSize</code>, <code>true</code> by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

MultiSelect component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MultiSelect selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-MultiSelect-wrapper | Root element of the Input |
| input | .mantine-MultiSelect-input | Input element |
| section | .mantine-MultiSelect-section | Left and right sections |
| root | .mantine-MultiSelect-root | Root element |
| label | .mantine-MultiSelect-label | Label element |
| required | .mantine-MultiSelect-required | Required asterisk element, rendered inside label |
| description | .mantine-MultiSelect-description | Description element |
| error | .mantine-MultiSelect-error | Error element |
| pill | .mantine-MultiSelect-pill | Value pill |
| inputField | .mantine-MultiSelect-inputField | Input field |
| pillsList | .mantine-MultiSelect-pillsList | List of pills, also contains input field |

**MultiSelect data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### NativeSelect
Package: @mantine/core
Import: import { NativeSelect } from '@mantine/core';
Description: Native select element based on Input

## Usage

<InputFeatures component="NativeSelect" element="select" />

NativeSelect component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all select element props. NativeSelect documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return <NativeSelect data={['React', 'Angular', 'Vue']} />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { NativeSelect } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');

  return (
    <NativeSelect
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      data={['React', 'Angular', 'Svelte', 'Vue']}
    />
  );
}
```

## Adding options

`NativeSelect` allows passing options in two ways:

* `data` prop array
* `children` prop with `option` components

Note that if `children` is used, `data` will be ignored.

### data prop

`data` prop accepts values in one of the following formats:

1. Array of strings:

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect data={['React', 'Angular', 'Svelte', 'Vue']} />
  );
}
```

2. Array of objects with `label`, `value` and `disabled` keys:

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      data={[
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte', disabled: true },
        { label: 'Vue', value: 'vue' },
      ]}
    />
  );
}
```

3. Array of grouped options (string format):

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      data={[
        {
          group: 'Frontend libraries',
          items: ['React', 'Angular', 'Svelte', 'Vue'],
        },
        {
          group: 'Backend libraries',
          items: ['Express', 'Koa', 'Django'],
        },
      ]}
    />
  );
}
```

4. Array of grouped options (object format):

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      data={[
        {
          group: 'Frontend libraries',
          items: [
            { label: 'React', value: 'react' },
            { label: 'Angular', value: 'angular' },
            { label: 'Vue', value: 'vue', disabled: true },
          ],
        },
        {
          group: 'Backend libraries',
          items: [
            { label: 'Express', value: 'express' },
            { label: 'Koa', value: 'koa' },
            { label: 'Django', value: 'django' },
          ],
        },
      ]}
    />
  );
}
```

Example of `data` prop with array of grouped options:

#### Example: data

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      data={[
        {
          group: 'Frontend libraries',
          items: [
            { label: 'React', value: 'react' },
            { label: 'Angular', value: 'angular' },
            { label: 'Vue', value: 'vue', disabled: true },
          ],
        },
        {
          group: 'Backend libraries',
          items: [
            { label: 'Express', value: 'express' },
            { label: 'Koa', value: 'koa' },
            { label: 'Django', value: 'django' },
          ],
        },
      ]}
    />
  );
}
```


### children options

To add options with `children` prop, use `option` elements to add options and `optgroup`
elements to group them:

#### Example: options

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect label="With children options">
      <optgroup label="Frontend libraries">
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vue" disabled>
          Vue
        </option>
      </optgroup>

      <optgroup label="Backend libraries">
        <option value="express">Express</option>
        <option value="koa">Koa</option>
        <option value="django">Django</option>
      </optgroup>
    </NativeSelect>
  );
}
```


## With dividers

Use `hr` tags to add dividers between options:

#### Example: dividers

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect label="With dividers">
      <option>Select library</option>

      <hr />

      <optgroup label="Frontend libraries">
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vue">Vue</option>
      </optgroup>

      <hr />

      <optgroup label="Backend libraries">
        <option value="express">Express</option>
        <option value="koa">Koa</option>
        <option value="django">Django</option>
      </optgroup>
    </NativeSelect>
  );
}
```


<InputSections component="NativeSelect" />

## Input sections

NativeSelect supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { NativeSelect } from '@mantine/core';
import { IconChevronDown, IconHash } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <NativeSelect
        leftSection={<IconHash size={16} />}
        leftSectionPointerEvents="none"
        label="Left section"
        data={['React', 'Angular']}
      />

      <NativeSelect
        rightSection={<IconChevronDown size={16} />}
        label="Right section"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return <NativeSelect disabled data={['React', 'Angular']} label="Disabled NativeSelect" />;
}
```


## Error state

#### Example: error

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <>
      <NativeSelect error label="Boolean error" data={['React', 'Angular']} />
      <NativeSelect
        error="Error message"
        label="React node error"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { NativeSelect } from '@mantine/core';

function Demo() {
  return <NativeSelect data={['React', 'Angular']} label="NativeSelect label" description="NativeSelect description" error="NativeSelect error" withAsterisk />;
}
```


<InputAccessibility component="NativeSelect" />

## Accessibility

NativeSelect provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | ComboboxData | - | Data used to render options, can be replaced with <code>children</code> |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

NativeSelect component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**NativeSelect selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-NativeSelect-root | Root element |
| label | .mantine-NativeSelect-label | Label element |
| required | .mantine-NativeSelect-required | Required asterisk element, rendered inside label |
| description | .mantine-NativeSelect-description | Description element |
| error | .mantine-NativeSelect-error | Error element |
| wrapper | .mantine-NativeSelect-wrapper | Root element of the Input |
| input | .mantine-NativeSelect-input | Input element |
| section | .mantine-NativeSelect-section | Left and right sections |


--------------------------------------------------------------------------------

### NavLink
Package: @mantine/core
Import: import { NavLink } from '@mantine/core';
Description: Navigation link

## Usage

#### Example: usage

```tsx
import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="With icon"
        leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="With right section"
        leftSection={<IconGauge size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        href="#required-for-focus"
        label="Disabled"
        leftSection={<IconCircleOff size={16} stroke={1.5} />}
        disabled
      />
      <NavLink
        href="#required-for-focus"
        label="With description"
        description="Additional information"
        leftSection={
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        }
      />
      <NavLink
        href="#required-for-focus"
        label="Active subtle"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        variant="subtle"
        active
      />
      <NavLink
        href="#required-for-focus"
        label="Active light"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        active
      />
      <NavLink
        href="#required-for-focus"
        label="Active filled"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        variant="filled"
        active
      />
    </>
  );
}
```


## Active

Set `active` prop to add active styles to `NavLink`.

Note that if you're using a React Router `NavLink` inside `renderRoot`, the active styles will be based on the
[`aria-current` attribute that's set by React Router](https://reactrouter.com/en/main/components/nav-link#aria-current)
so you won't need to explicitly set the `active` prop.

You can customize active styles with `color` and `variant` props:

#### Example: active

```tsx
import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';

const data = [
  { icon: IconGauge, label: 'Dashboard', description: 'Item with description' },
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
  },
  { icon: IconActivity, label: 'Activity' },
];

function Demo() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} stroke={1.5} />}
      onClick={() => setActive(index)}
      
    />
  ));

  return <Box w={220}>{items}</Box>;
}
```


<AutoContrast component="NavLink" />

## autoContrast

NavLink supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on NavLink or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { NavLink } from '@mantine/core';

function Demo() {
  return (
    <>
      <NavLink color="lime.4" variant="filled" active label="Default" />
      <NavLink color="lime.4" variant="filled" active autoContrast label="Auto contrast" />
    </>
  );
}
```


## Nested NavLinks

To create nested links put `NavLink` as children of another `NavLink`:

#### Example: nested

```tsx
import { NavLink } from '@mantine/core';
import { IconGauge, IconFingerprint } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="First parent link"
        leftSection={<IconGauge size={16} stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="First child link" />
        <NavLink label="Second child link" href="#required-for-focus" />
        <NavLink label="Nested parent link" childrenOffset={28} href="#required-for-focus">
          <NavLink label="First child link" href="#required-for-focus" />
          <NavLink label="Second child link" href="#required-for-focus" />
          <NavLink label="Third child link" href="#required-for-focus" />
        </NavLink>
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Second parent link"
        leftSection={<IconFingerprint size={16} stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="First child link" href="#required-for-focus" />
        <NavLink label="Second child link" href="#required-for-focus" />
        <NavLink label="Third child link" href="#required-for-focus" />
      </NavLink>
    </>
  );
}
```


<Polymorphic defaultElement="a" changeToElement="button" component="NavLink" withNext />

## Polymorphic component

NavLink is a polymorphic component – its default root element is a, but it can be changed to any other element or component with component prop:

```tsx
import { NavLink } from '@mantine/core';

function Demo() {
  return <NavLink component="button" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { NavLink } from '@mantine/core';

function Demo() {
  return <NavLink component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, NavLinkProps does not extend React.ComponentPropsWithoutRef<'a'> although a is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

<GetElementRef component="NavLink" refType="a" />

## Get element ref

```tsx
import { useRef } from 'react';
import { NavLink } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLAnchorElement>(null);
  return <NavLink ref={ref} />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | - | Determines whether the link should have active styles |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Child <code>NavLink</code> components |
| childrenOffset | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set collapsed links <code>padding-left</code> |
| color | MantineColor | - | Key of <code>theme.colors</code> of any valid CSS color to control active styles |
| defaultOpened | boolean | - | Uncontrolled nested items collapse initial state |
| description | React.ReactNode | - | Link description, displayed below the label |
| disableRightSectionRotation | boolean | - | If set, right section will not be rotated when collapse is opened |
| disabled | boolean | - | If set, disabled styles will be added to the root element |
| label | React.ReactNode | - | Main link label |
| leftSection | React.ReactNode | - | Section displayed on the left side of the label |
| noWrap | boolean | - | If set, label and description do not wrap to the next line |
| onChange | (opened: boolean) => void | - | Called when open state changes |
| onClick | MouseEventHandler<HTMLElement> | - | Called when the root element is clicked |
| onKeyDown | KeyboardEventHandler<HTMLElement> | - | Called on keydown of the root element |
| opened | boolean | - | Controlled nested items collapse state |
| rightSection | React.ReactNode | - | Section displayed on the right side of the label |


#### Styles API

NavLink component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**NavLink selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-NavLink-root | Root element |
| body | .mantine-NavLink-body | Contains label and description |
| section | .mantine-NavLink-section | Left and right sections |
| label | .mantine-NavLink-label | NavLink label |
| description | .mantine-NavLink-description | Dimmed description displayed below the label |
| children | .mantine-NavLink-children | Wrapper around nested links |
| chevron | .mantine-NavLink-chevron | Default chevron icon |
| collapse | .mantine-NavLink-collapse | Nested links Collapse container |

**NavLink CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --nl-bg | Controls link `background-color` |
| root | --nl-color | Controls link `color` |
| root | --nl-hover | Controls link `background-color` when hovered |

**NavLink data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-active | - | - |


--------------------------------------------------------------------------------

### Notification
Package: @mantine/core
Import: import { Notification } from '@mantine/core';
Description: Show dynamic notifications and alerts to user, part of notifications system

## Usage

Notification is a base component for notification system.
Build your own or use [@mantine/notifications](https://mantine.dev/x/notifications/) package.

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


## With icon

#### Example: icon

```tsx
import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification } from '@mantine/core';

function Demo() {
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  return (
    <>
      <Notification icon={xIcon} color="red" title="Bummer!">
        Something went wrong
      </Notification>
      <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { Notification } from '@mantine/core';

function Demo() {
  return (
    <Notification title="We notify you that">
      You are now obligated to give a star to Mantine project on GitHub
    </Notification>
  );
}
```


## Accessibility

To support screen readers, set close button aria-label or title with `closeButtonProps`:

```tsx
import { Notification } from '@mantine/core';

function Demo() {
  return (
    <Notification
      closeButtonProps={{ 'aria-label': 'Hide notification' }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Main notification message |
| closeButtonProps | Record<string, any> | - | Props passed down to the close button |
| color | MantineColor | - | Controls notification line or icon color, key of <code>theme.colors</code> or any valid CSS color |
| icon | React.ReactNode | - | Notification icon, replaces color line |
| loaderProps | LoaderProps | - | Props passed down to the <code>Loader</code> component |
| loading | boolean | - | If set, the <code>Loader</code> component is displayed instead of the icon |
| onClose | () => void | - | Called when the close button is clicked |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| title | React.ReactNode | - | Notification title, displayed above the message body |
| withBorder | boolean | - | Adds border to the root element |
| withCloseButton | boolean | - | If set, the close button is visible |


#### Styles API

Notification component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Notification selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Notification-root | Root element |
| loader | .mantine-Notification-loader | Loader component, displayed only when `loading` prop is set |
| icon | .mantine-Notification-icon | Icon component, displayed only when `icon` prop is set |
| body | .mantine-Notification-body | Notification body, contains all other elements |
| title | .mantine-Notification-title | Title element, displayed only when `title` prop is set |
| description | .mantine-Notification-description | Description displayed below the title |
| closeButton | .mantine-Notification-closeButton | Close button element |

**Notification CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --notification-radius | Controls `border-radius` |
| root | --notification-color | Controls icon color or notification line color |

**Notification data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-icon | - | - |
| root | data-with-border | - | - |
| description | data-with-title | - | - |

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

### NumberFormatter
Package: @mantine/core
Import: import { NumberFormatter } from '@mantine/core';
Description: Format number with thousands/decimal separators and suffix/prefix

## Usage

Use `NumberFormatter` to format numbers. It supports the same formatting related props
as [NumberInput](https://mantine.dev/core/number-input/) component.

#### Example: usage

```tsx
import { NumberFormatter } from '@mantine/core';

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}
```


## Prefix and suffix

Set `prefix` and `suffix` props to add given string to the start or end of the value:

#### Example: prefixSuffix

```tsx
import { NumberFormatter } from '@mantine/core';

function Demo() {
  return (
    <>
      <div>
        With prefix: <NumberFormatter prefix="$ " value={100} />
      </div>
      <div>
        With suffix: <NumberFormatter value={100} suffix=" RUB" />
      </div>
    </>
  );
}
```


## Thousands separator

Set `thousandSeparator` prop to separate thousands with a character. You can control
grouping logic with `thousandsGroupStyle`, it accepts: `thousand`, `lakh`, `wan`, `none` values.

#### Example: thousandsSeparator

```tsx
import { NumberFormatter } from '@mantine/core';

function Demo() {
  return (
    <>
      <div>
        With default separator: <NumberFormatter thousandSeparator value={1000000} />
      </div>
      <div>
        With custom separator:{' '}
        <NumberFormatter thousandSeparator="." decimalSeparator="," value={1000000} />
      </div>
    </>
  );
}
```


## Decimal scale

`decimalScale` prop controls the number of allowed decimal places:

#### Example: decimalScale

```tsx
import { NumberFormatter } from '@mantine/core';

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowNegative | boolean | - | If set, negative values are allowed |
| decimalScale | number | - | Limits the number of digits that are displayed after the decimal point |
| decimalSeparator | string | - | Character used as a decimal separator, <code>'.'</code> by default |
| fixedDecimalScale | boolean | - | If set, zeros are added after <code>decimalSeparator</code> to match given <code>decimalScale</code>. |
| prefix | string | - | Prefix added before the value |
| suffix | string | - | Suffix added after the value |
| thousandSeparator | string | boolean | - | A character used to separate thousands |
| thousandsGroupStyle | "none" | "thousand" | "lakh" | "wan" | - | Defines the thousand grouping style |
| value | string | number | - | Value to format |


--------------------------------------------------------------------------------

### NumberInput
Package: @mantine/core
Import: import { NumberInput } from '@mantine/core';
Description: Capture number from user

## Usage

`NumberInput` is based on [react-number-format](https://www.npmjs.com/package/react-number-format).
It supports most of the props from the `NumericFormat` component in the original package.

<InputFeatures component="NumberInput" element="input" />

NumberInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. NumberInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { NumberInput } from '@mantine/core';


function Demo() {
  return (
    <NumberInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { NumberInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | number>('');
  return <NumberInput value={value} onChange={setValue} />;
}
```

## Value type

`value`, `defaultValue` and `onChange` props can be either string or number. In all cases
when `NumberInput` value can be represented as a number, `onChange` function is called
with a number (for example `55`, `1.28`, `-100`, etc.). But there are several cases when
it is not possible to represent value as a number:

* Empty state is represented as an empty string – `''`
* Numbers that are larger than `Number.MAX_SAFE_INTEGER - 1` or smaller than `Number.MIN_SAFE_INTEGER + 1` are represented as strings – `'90071992547409910'`
* Numbers that consist of only multiple zeros are represented as strings – `0.`, `0.0`, `-0.00`, etc.

## min and max

Set `min` and `max` props to limit the input value:

#### Example: minMax

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Enter value between 10 and 20"
      placeholder="Don't enter more than 20 and less than 10"
      min={10}
      max={20}
    />
  );
}
```


## Clamp behavior

By default, the value is clamped when the input is blurred. If you set `clampBehavior="strict"`,
it will not be possible to enter value outside of min/max range. Note that this option
may cause issues if you have tight `min` and `max`, for example `min={10}` and `max={20}`.
If you need to disable value clamping entirely, set `clampBehavior="none"`.

#### Example: strictClamp

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="You cannot enter number less than 0 or greater than 100"
      placeholder="You cannot enter number less than 0 or greater than 100"
      clampBehavior="strict"
      min={0}
      max={100}
    />
  );
}
```


## Prefix and suffix

Set `prefix` and `suffix` props to add given string to the start or end of the input value:

#### Example: prefixSuffix

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="With prefix"
        placeholder="Dollars"
        prefix="$"
        defaultValue={100}
        mb="md"
      />
      <NumberInput
        label="With suffix"
        placeholder="Percents"
        suffix="%"
        defaultValue={100}
        mt="md"
      />
    </>
  );
}
```


## Negative numbers

By default, negative numbers are allowed. Set `allowNegative={false}` to allow only positive numbers.

#### Example: allowNegative

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Negative number are not allowed"
      placeholder="Do not enter negative numbers"
      allowNegative={false}
    />
  );
}
```


## Decimal numbers

By default, decimal numbers are allowed. Set `allowDecimal={false}` to allow only integers.

#### Example: allowDecimal

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Decimals are not allowed"
      placeholder="Do not enter decimal numbers"
      allowDecimal={false}
    />
  );
}
```


## Decimal scale

`decimalScale` controls how many decimal places are allowed:

#### Example: decimalScale

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="You can enter only 2 digits after decimal point"
      placeholder="Do not enter more that 2"
      decimalScale={2}
    />
  );
}
```


## Fixed decimal scale

Set `fixedDecimalScale` to always display fixed number of decimal places:

#### Example: fixedDecimalScale

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Always show 2 digits after decimal point"
      placeholder="Do not enter more that 2"
      decimalScale={2}
      fixedDecimalScale
      defaultValue={2.2}
    />
  );
}
```


## Decimal separator

Set `decimalSeparator` to change decimal separator character:

#### Example: decimalSeparator

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Custom decimal separator"
      placeholder="You can change it"
      decimalSeparator=","
      defaultValue={20.573}
    />
  );
}
```


## Thousand separator

Set `thousandSeparator` prop to separate thousands with a character. You can control
grouping logic with `thousandsGroupStyle`, it accepts: `thousand`, `lakh`, `wan`, `none` values.

#### Example: thousandsSeparator

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="Thousands are separated with a coma"
        placeholder="Thousands are separated with a coma"
        thousandSeparator=","
        defaultValue={1_000_000}
      />

      <NumberInput
        label="Thousands are separated with a space"
        placeholder="Thousands are separated with a space"
        thousandSeparator=" "
        defaultValue={1_000_000}
        mt="md"
      />
    </>
  );
}
```


<InputSections component="NumberInput" />

## Input sections

NumberInput supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { NumberInput } from '@mantine/core';
import { IconCurrencyDram } from '@tabler/icons-react';

function Demo() {
  const icon = <IconCurrencyDram size={20} stroke={1.5} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}
```


## Increment/decrement controls

By default, the right section is occupied by increment and decrement buttons.
To hide them, set `hideControls` prop. You can also use `rightSection` prop to render anything
in the right section to replace the default controls.

#### Example: rightSection

```tsx
import { NumberInput } from '@mantine/core';
import { IconChartBubble } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <NumberInput label="Hide controls" placeholder="Hide controls" hideControls />
      <NumberInput
        label="Custom right section"
        placeholder="Custom right section"
        mt="md"
        rightSection={<IconChartBubble />}
        rightSectionPointerEvents="none"
      />
    </>
  );
}
```


## Increment/decrement on hold

Set `stepHoldDelay` and `stepHoldInterval` props to define behavior when increment/decrement controls are clicked and hold:

#### Example: hold

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="Step on hold"
        description="Step value when clicking and holding increment/decrement buttons"
        stepHoldDelay={500}
        stepHoldInterval={100}
      />

      <NumberInput
        label="Step the value with interval function"
        description="Step value will increase incrementally when control is hold"
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      />
    </>
  );
}
```


## Custom increment and decrement controls

You can get a ref with `increment` and `decrement` functions to create custom controls:

#### Example: handlers

```tsx
import { useRef } from 'react';
import { NumberInput, Group, Button, NumberInputHandlers } from '@mantine/core';

function Demo() {
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <>
      <NumberInput
        label="Click buttons to change value"
        placeholder="Click the buttons"
        handlersRef={handlersRef}
        step={2}
        min={10}
        max={20}
        defaultValue={15}
      />

      <Group mt="md" justify="center">
        <Button onClick={() => handlersRef.current?.decrement()} variant="default">
          Decrement by 2
        </Button>

        <Button onClick={() => handlersRef.current?.increment()} variant="default">
          Increment by 2
        </Button>
      </Group>
    </>
  );
}
```


## Error state

#### Example: error

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput label="Boolean error" placeholder="Boolean error" error />
      <NumberInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { NumberInput } from '@mantine/core';

function Demo() {
  return <NumberInput disabled label="Disabled input" placeholder="Disabled input" />;
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Label"
      placeholder="NumberInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      
    />
  );
}
```


<GetElementRef component="NumberInput" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { NumberInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <NumberInput ref={ref} />;
}
```

<InputAccessibility component="NumberInput" />

## Accessibility

NumberInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDecimal | boolean | - | If set, decimal values are allowed |
| allowLeadingZeros | boolean | - | Determines whether leading zeros are allowed. If set to <code>false</code>, leading zeros are removed when the input value becomes a valid number. |
| allowNegative | boolean | - | If set, negative values are allowed |
| allowedDecimalSeparators | string[] | - | Characters which when pressed result in a decimal separator |
| clampBehavior | "none" | "blur" | "strict" | - | Controls how value is clamped, <code>strict</code> – user is not allowed to enter values that are not in <code>[min, max]</code> range, <code>blur</code> – user is allowed to enter any values, but the value is clamped when the input loses focus (default behavior), <code>none</code> – lifts all restrictions, <code>[min, max]</code> range is applied only for controls and up/down keys |
| decimalScale | number | - | Limits the number of digits that can be entered after the decimal point |
| decimalSeparator | string | - | Character used as a decimal separator |
| defaultValue | string | number | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| fixedDecimalScale | boolean | - | If set, 0s are added after <code>decimalSeparator</code> to match given <code>decimalScale</code>. |
| handlersRef | ForwardedRef<NumberInputHandlers> | undefined | - | Increment/decrement handlers |
| hideControls | boolean | - | If set, the up/down controls are hidden |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| isAllowed | (values: NumberFormatValues) => boolean | - | A function to validate the input value. If this function returns <code>false</code>, the <code>onChange</code> will not be called and the input value will not change. |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| max | number | - | Maximum possible value |
| min | number | - | Minimum possible value |
| onChange | (value: string | number) => void | - | Called when value changes |
| onValueChange | OnValueChange | - | Called when value changes with <code>react-number-format</code> payload |
| prefix | string | - | Prefix added before the input value |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| startValue | number | - | Value set to the input when increment/decrement buttons are clicked or up/down arrows pressed if the input is empty |
| step | number | - | Number by which value will be incremented/decremented with up/down controls and keyboard arrows |
| stepHoldDelay | number | - | Initial delay in milliseconds before stepping the value. |
| stepHoldInterval | number | ((stepCount: number) => number) | - | Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds. |
| suffix | string | - | Suffix added after the input value |
| thousandSeparator | string | boolean | - | A character used to separate thousands |
| thousandsGroupStyle | "none" | "thousand" | "lakh" | "wan" | - | Defines the thousand grouping style. |
| trimLeadingZeroesOnBlur | boolean | - | If set, leading zeros are removed on blur. For example, <code>00100</code> -> <code>100</code> |
| type | "text" | "tel" | "password" | - | Controls input <code>type</code> attribute |
| value | string | number | - | Controlled component value |
| valueIsNumericString | boolean | - | If value is passed as string representation of numbers (unformatted) and number is used in any format props like in prefix or suffix in numeric format and format prop in pattern format then this should be passed as <code>true</code>. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withKeyboardEvents | boolean | - | If set, up/down keyboard events increment/decrement value |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

NumberInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**NumberInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-NumberInput-wrapper | Root element of the Input |
| input | .mantine-NumberInput-input | Input element |
| section | .mantine-NumberInput-section | Left and right sections |
| root | .mantine-NumberInput-root | Root element |
| label | .mantine-NumberInput-label | Label element |
| required | .mantine-NumberInput-required | Required asterisk element, rendered inside label |
| description | .mantine-NumberInput-description | Description element |
| error | .mantine-NumberInput-error | Error element |
| controls | .mantine-NumberInput-controls | Increment and decrement buttons wrapper |
| control | .mantine-NumberInput-control | Increment and decrement buttons |

**NumberInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| controls | --ni-chevron-size | Controls `width` and `height` of the default chevron icon |

**NumberInput data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-direction | - | - |


--------------------------------------------------------------------------------

### Overlay
Package: @mantine/core
Import: import { Overlay } from '@mantine/core';
Description: Overlays parent element with div element with any color and opacity

## Usage

`Overlay` takes 100% of width and height of parent container or viewport if `fixed` prop is set.
Set `color` and `backgroundOpacity` props to change `Overlay` background-color. Note that `backgroundOpacity` prop
does not change CSS opacity property, it changes background-color. For example, if you set
`color="#000"` and `backgroundOpacity={0.85}` background-color will be `rgba(0, 0, 0, 0.85)`:

#### Example: usage

```tsx
import { useState } from 'react';
import { Button, Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
          alt="Demo"
        />
        {visible && <Overlay color="#000" backgroundOpacity={0.85} />}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}
```


## Gradient

Set `gradient` prop to use background-image instead of background-color. When `gradient` prop is set,
`color` and `backgroundOpacity` props are ignored.

#### Example: gradient

```tsx
import { useState } from 'react';
import { Button, Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          alt="Demo"
        />
        {visible && (
          <Overlay
            gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.85}
          />
        )}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}
```


## Blur

Set `blur` prop to add `backdrop-filter: blur({value})` styles.
Note that `backdrop-filter` [is not supported in all browsers](https://caniuse.com/css-backdrop-filter).

#### Example: blur

```tsx
import { Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png"
        alt="Demo"
      />
      <Overlay color="#000" backgroundOpacity={0.35} />
    </AspectRatio>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="a" component="Overlay" withNext />

## Polymorphic component

Overlay is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { Overlay } from '@mantine/core';

function Demo() {
  return <Overlay component="a" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Overlay } from '@mantine/core';

function Demo() {
  return <Overlay component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, OverlayProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| backgroundOpacity | number | - | Overlay <code>background-color</code> opacity 0–1, ignored when <code>gradient</code> prop is set |
| blur | string | number | - | Overlay background blur |
| center | boolean | - | Centers content inside the overlay |
| children | React.ReactNode | - | Content inside overlay |
| color | BackgroundColor | - | Overlay <code>background-color</code> |
| fixed | boolean | - | Changes position to <code>fixed</code> |
| gradient | string | - | Changes overlay to gradient. If set, <code>color</code> prop is ignored. |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| zIndex | string | number | - | Overlay z-index |


#### Styles API

Overlay component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Overlay selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Overlay-root | Root element |

**Overlay CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --overlay-bg | Controls `background-color` |
| root | --overlay-filter | Controls `backdrop-filter` |
| root | --overlay-radius | Controls `border-radius` |
| root | --overlay-z-index | Controls `z-index` |

**Overlay data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-center | - | - |
| root | data-fixed | - | - |


--------------------------------------------------------------------------------

### CorePackage
Package: @mantine/core
Import: import { CorePackage } from '@mantine/core';

# Mantine Core components

[![npm](https://img.shields.io/npm/dm/@mantine/core)](https://www.npmjs.com/package/@mantine/core)

[@mantine/core](https://www.npmjs.com/package/@mantine/core) package
provides essential components: buttons, inputs, modals, typography and many others.
`@mantine/core` package is used internally in most of other `@mantine/*` packages –
it is required to be installed in your project to use Mantine components.

## Installation

```bash
yarn add @mantine/hooks @mantine/core
```

```bash
npm install @mantine/hooks @mantine/core
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
```

## Usage

Follow the [getting started guide](https://mantine.dev/getting-started) to learn how to
complete Mantine setup in your project. Example of using [Stepper](https://mantine.dev/core/stepper) component:

#### Example: usage

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
```


## License

MIT


--------------------------------------------------------------------------------

### Pagination
Package: @mantine/core
Import: import { Pagination } from '@mantine/core';
Description: Display active page and navigate between multiple pages

## Usage

#### Example: configurator

```tsx
import { Pagination } from '@mantine/core';

function Demo() {
  return <Pagination total={10} />;
}
```


## Example with chunked content

#### Example: withContent

```tsx
import { useState } from 'react';
import { randomId } from '@mantine/hooks';
import { Pagination, Text } from '@mantine/core';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

function Demo() {
  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((item) => (
    <Text key={item.id}>
      id: {item.id}, name: {item.name}
    </Text>
  ));

  return (
    <>
      {items}
      <Pagination total={data.length} value={activePage} onChange={setPage} mt="sm" />
    </>
  );
}
```


## Controlled

To control component state provide `value` and `onChange` props:

```tsx
import { useState } from 'react';
import { Pagination } from '@mantine/core';

function Demo() {
  const [activePage, setPage] = useState(1);
  return (
    <Pagination value={activePage} onChange={setPage} total={10} />
  );
}
```

## Siblings

Control number of active item siblings with `siblings` prop:

#### Example: siblings

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 sibling (default)</Text>
      <Pagination total={20} siblings={1} defaultValue={10} />

      <Text mb="xs" mt="xl">2 siblings</Text>
      <Pagination total={20} siblings={2} defaultValue={10} />

      <Text mb="xs" mt="xl">3 siblings</Text>
      <Pagination total={20} siblings={3} defaultValue={10} />
    </>
  );
}
```


## Boundaries

Control number of items displayed after previous and before next buttons with `boundaries` prop:

#### Example: boundaries

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 boundary (default)</Text>
      <Pagination total={20} boundaries={1} defaultValue={10} />

      <Text mt="xl" mb="xs">2 boundaries</Text>
      <Pagination total={20} boundaries={2} defaultValue={10} />

      <Text mt="xl" mb="xs">3 boundaries</Text>
      <Pagination total={20} boundaries={3} defaultValue={10} />
    </>
  );
}
```


## Hide pages controls

Set `withPages={false}` to hide pages controls:

#### Example: withPages

```tsx
import { useState } from 'react';
import { Group, Pagination, Text } from '@mantine/core';

const limit = 10;
const total = 145;
const totalPages = Math.ceil(total / limit);

function Demo() {
  const [page, setPage] = useState(1);
  const message = `Showing ${limit * (page - 1) + 1} – ${Math.min(total, limit * page)} of ${total}`;

  return (
    <Group justify="flex-end">
      <Text size="sm">{message}</Text>
      <Pagination total={totalPages} value={page} onChange={setPage} withPages={false} />
    </Group>
  );
}
```


#### Example: stylesApi

```tsx
import { Pagination } from '@mantine/core';

function Demo() {
  return <Pagination total={10} />;
}
```


## Compound components

You can use the following compound components to have full control over the `Pagination` rendering:

* `Pagination.Root` – context provider
* `Pagination.Items` – items list
* `Pagination.Next` – next control
* `Pagination.Previous` – previous control
* `Pagination.First` – first control
* `Pagination.Last` – last control

#### Example: composition

```tsx
import { Group, Pagination } from '@mantine/core';

function Demo() {
  return (
    <Pagination.Root total={10}>
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}
```


## Controls as links

#### Example: links

```tsx
import { Group, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        getItemProps={(page) => ({
          component: 'a',
          href: `#page-${page}`,
        })}
        getControlProps={(control) => {
          if (control === 'first') {
            return { component: 'a', href: '#page-0' };
          }

          if (control === 'last') {
            return { component: 'a', href: '#page-10' };
          }

          if (control === 'next') {
            return { component: 'a', href: '#page-2' };
          }

          if (control === 'previous') {
            return { component: 'a', href: '#page-1' };
          }

          return {};
        }}
      />

      {/* Compound pagination */}
      <Pagination.Root
        total={10}
        getItemProps={(page) => ({
          component: 'a',
          href: `#page-${page}`,
        })}
      >
        <Group gap={7} mt="xl">
          <Pagination.First component="a" href="#page-0" />
          <Pagination.Previous component="a" href="#page-1" />
          <Pagination.Items />
          <Pagination.Next component="a" href="#page-2" />
          <Pagination.Last component="a" href="#page-10" />
        </Group>
      </Pagination.Root>
    </>
  );
}
```


## Change icons

#### Example: icons

```tsx
import { Group, Pagination } from '@mantine/core';
import {
  IconArrowBarToRight,
  IconArrowBarToLeft,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from '@tabler/icons-react';

function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
      />

      {/* Compound pagination */}
      <Pagination.Root total={10}>
        <Group gap={7} mt="xl">
          <Pagination.First icon={IconArrowBarToLeft} />
          <Pagination.Previous icon={IconArrowLeft} />
          <Pagination.Items dotsIcon={IconGripHorizontal} />
          <Pagination.Next icon={IconArrowRight} />
          <Pagination.Last icon={IconArrowBarToRight} />
        </Group>
      </Pagination.Root>
    </>
  );
}
```


<AutoContrast component="Pagination" withVariant="[object Object]" />

## autoContrast

Pagination supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on Pagination or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { Pagination, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>autoContrast: off</Text>
      <Pagination total={10} color="lime.4" />

      <Text mt="md">autoContrast: on</Text>
      <Pagination total={10} autoContrast color="lime.4" />
    </>
  );
}
```


## use-pagination hook

If you need more flexibility `@mantine/hooks` package exports [use-pagination](https://mantine.dev/hooks/use-pagination/) hook,
you can use it to create custom pagination components.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| boundaries | number | - | Number of elements visible on the left/right edges |
| color | MantineColor | - | Key of <code>theme.colors</code>, active item color |
| defaultValue | number | - | Active page for uncontrolled component, must be an integer in [0, total] interval |
| disabled | boolean | - | Disables all controls, applies disabled styles |
| dotsIcon | PaginationIcon | - | Dots icon component |
| firstIcon | PaginationIcon | - | First control icon component |
| gap | MantineSpacing | - | Key of <code>theme.spacing</code>, gap between controls |
| getControlProps | (control: "next" | "previous" | "first" | "last") => Record<string, any> | - | Props passed down to next/previous/first/last controls |
| getItemProps | (page: number) => Record<string, any> | - | Additional props passed down to controls |
| hideWithOnePage | boolean | - | If set, the pagination is hidden when only one page is available (<code>total={1}</code>) |
| lastIcon | PaginationIcon | - | Last control icon component |
| nextIcon | PaginationIcon | - | Next control icon component |
| onChange | (value: number) => void | - | Called when page changes |
| onFirstPage | () => void | - | Called when first page control is clicked |
| onLastPage | () => void | - | Called when last page control is clicked |
| onNextPage | () => void | - | Called when next page control is clicked |
| onPreviousPage | () => void | - | Called when previous page control is clicked |
| previousIcon | PaginationIcon | - | Previous control icon component |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| siblings | number | - | Number of siblings displayed on the left/right side of the selected page |
| size | number | MantineSize | (string & {}) | - | <code>height</code> and <code>min-width</code> of controls |
| total | number | required | Total number of pages, must be an integer |
| value | number | - | Active page for controlled component, must be an integer in [0, total] interval |
| withControls | boolean | - | If set, next/previous controls are displayed |
| withEdges | boolean | - | If set, first/last controls are displayed |
| withPages | boolean | - | If set to <code>false</code>, pages controls are hidden |


#### Styles API

Pagination component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Pagination selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Pagination-root | Root element |
| control | .mantine-Pagination-control | Control element: items, next/previous, first/last buttons |
| dots | .mantine-Pagination-dots | Dots icon wrapper |

**Pagination CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pagination-active-bg | Active control `background-color` |
| root | --pagination-active-color | Active control `color` |
| root | --pagination-control-fz | Controls control `font-size` |
| root | --pagination-control-radius | Controls control `border-radius` |
| root | --pagination-control-size | Controls control `min-width` and `height` |

**Pagination data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Control is active | - |
| control | data-disabled | Control is disabled | - |


--------------------------------------------------------------------------------

### Paper
Package: @mantine/core
Import: import { Paper } from '@mantine/core';
Description: Renders white or dark background depending on color scheme

## Usage

#### Example: usage

```tsx
import { Text, Paper } from '@mantine/core';

function Demo() {
  return (
    <Paper p="xl">
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  );
}
```


<Polymorphic defaultElement="div" changeToElement="button" component="Paper" withNext />

## Polymorphic component

Paper is a polymorphic component – its default root element is div, but it can be changed to any other element or component with component prop:

```tsx
import { Paper } from '@mantine/core';

function Demo() {
  return <Paper component="button" />;
}
```

You can also use components in component prop, for example, Next.js Link:

```tsx
import Link from 'next/link';
import { Paper } from '@mantine/core';

function Demo() {
  return <Paper component={Link} href="/" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, PaperProps does not extend React.ComponentPropsWithoutRef<'div'> although div is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any valid CSS value to set <code>box-shadow</code> |
| withBorder | boolean | - | Adds border to the root element |


#### Styles API

Paper component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Paper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Paper-root | Root element |

**Paper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --paper-radius | Controls `border-radius` |
| root | --paper-shadow | Controls `box-shadow` |

**Paper data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-border | - | - |


--------------------------------------------------------------------------------

### PasswordInput
Package: @mantine/core
Import: import { PasswordInput } from '@mantine/core';
Description: Capture password data from user

## Usage

<InputFeatures component="PasswordInput" element="input" />

PasswordInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. PasswordInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { PasswordInput } from '@mantine/core';


function Demo() {
  return (
    <PasswordInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { PasswordInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## Controlled visibility toggle

Control visibility state with `visible` and `onVisibilityChange` props,
for example, the props can be used to sync visibility state between two inputs:

#### Example: controlledVisibility

```tsx
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Stack } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <Stack>
      <PasswordInput
        label="Password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
      <PasswordInput
        label="Confirm password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
    </Stack>
  );
}
```


## Change visibility toggle icon

To change visibility toggle icon, pass a React component that accepts `reveal` prop to `visibilityToggleIcon`:

#### Example: visibilityIcon

```tsx
import { PasswordInput } from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

function Demo() {
  return (
    <PasswordInput
      maw={320}
      mx="auto"
      label="Change visibility toggle icon"
      placeholder="Change visibility toggle icon"
      defaultValue="secret"
      visibilityToggleIcon={VisibilityToggleIcon}
    />
  );
}
```


## Strength meter example

Password strength meter example with [Progress](https://mantine.dev/core/progress/) and [Popover](https://mantine.dev/core/popover/) components:

#### Example: strengthMeter

```tsx
import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[DEMOPLACEHOLDER::PasswordInputDemos.strengthMeter::END+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Demo() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="Your password"
            placeholder="Your password"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Usage without visibility toggle

If you do not need visibility toggle button, use [TextInput](https://mantine.dev/core/text-input/) component instead:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return <TextInput type="password" />;
}
```

<InputSections component="PasswordInput" />

## Input sections

PasswordInput supports left and right sections to display icons, buttons or other content alongside the input.

Note that when `rightSection` prop is used, visibility toggle button is not rendered.

#### Example: sections

```tsx
import { PasswordInput } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

function Demo() {
  const icon = <IconLock size={18} stroke={1.5} />;

  return (
    <>
      <PasswordInput leftSection={icon} label="With left section" placeholder="With left section" />
      <PasswordInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}
```


## Error state

#### Example: error

```tsx
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <PasswordInput label="Boolean error" placeholder="Boolean error" error />
      <PasswordInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled

When `disabled` prop is set, visibility toggle button is hidden:

#### Example: disabled

```tsx
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <PasswordInput disabled label="Disabled password input" placeholder="Disabled password input" />
  );
}
```


#### Example: stylesApi

```tsx
import { IconLock } from '@tabler/icons-react';
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <PasswordInput
      label="Label"
      placeholder="PasswordInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconLock size={18} />}
      
    />
  );
}
```


<GetElementRef component="PasswordInput" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { PasswordInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <PasswordInput ref={ref} />;
}
```

<InputAccessibility component="PasswordInput" />

## Accessibility

PasswordInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.

To set `aria-label` on the visibility toggle button, use `visibilityToggleButtonProps` prop:

```tsx
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <PasswordInput
      label="Password"
      visibilityToggleButtonProps={{
        'aria-label': 'Toggle password visibility',
      }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultVisible | boolean | - | If set, the input value is visible by default |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| onVisibilityChange | (visible: boolean) => void | - | Called when visibility changes |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| visibilityToggleButtonProps | Record<string, any> | - | Props passed down to the visibility toggle button |
| visibilityToggleIcon | FC<{ reveal: boolean; }> | - | A component to replace the visibility toggle icon |
| visible | boolean | - | If set, the input value is visible visible |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

PasswordInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PasswordInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-PasswordInput-wrapper | Root element of the Input |
| input | .mantine-PasswordInput-input | Input element |
| section | .mantine-PasswordInput-section | Left and right sections |
| root | .mantine-PasswordInput-root | Root element |
| label | .mantine-PasswordInput-label | Label element |
| required | .mantine-PasswordInput-required | Required asterisk element, rendered inside label |
| description | .mantine-PasswordInput-description | Description element |
| error | .mantine-PasswordInput-error | Error element |
| innerInput | .mantine-PasswordInput-innerInput | Actual input element |
| visibilityToggle | .mantine-PasswordInput-visibilityToggle | Visibility toggle button |

**PasswordInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --psi-button-size | Controls visibility toggle button `width` and `height` |
| root | --psi-icon-size | Controls visibility toggle icon `width` and `height` |


--------------------------------------------------------------------------------

### Pill
Package: @mantine/core
Import: import { Pill } from '@mantine/core';
Description: Removable and non-removable tags

## Usage

#### Example: usage

```tsx
import { Pill } from '@mantine/core';

function Demo() {
  return <Pill>React</Pill>;
}
```


## Inside inputs

`Pill` component is designed to be used inside inputs. It can be used to create custom
multi select or tag inputs.

#### Example: withinInput

```tsx
import { Pill, InputBase } from '@mantine/core';

function Demo() {
  const pills = Array(10)
    .fill(0)
    .map((_, index) => (
      <Pill key={index} withRemoveButton>
        Item {index}
      </Pill>
    ));

  return (
    <InputBase component="div" multiline>
      <Pill.Group>{pills}</Pill.Group>
    </InputBase>
  );
}
```


#### Example: stylesApi

```tsx
import { Pill } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return <Pill withRemoveButton>Test pill</Pill>;
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | boolean | - | Adds disabled attribute, applies disabled styles |
| onRemove | () => void | - | Called when the remove button is clicked |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| removeButtonProps | CloseButtonProps & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> | - | Props passed down to the remove button |
| size | MantineSize | - | Controls pill <code>font-size</code> and <code>padding</code> |
| withRemoveButton | boolean | - | Controls visibility of the remove button |


#### Styles API

Pill component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Pill selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Pill-root | Root element |
| label | .mantine-Pill-label | Pill label (children) |
| remove | .mantine-Pill-remove | Remove button |

**Pill CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pill-height | Controls `height` of the pill |
| root | --pill-fz | Controls `font-size` |
| root | --pill-radius | Controls `border-radius` |

**Pill data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-remove | - | - |
| root | data-disabled | - | - |

**Pill.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-PillGroup-group | Root element |

**Pill.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --pg-gap | Controls `gap` between pills |

**Pillsinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Pillsinput-wrapper | Root element of the Input |
| input | .mantine-Pillsinput-input | Input element |
| section | .mantine-Pillsinput-section | Left and right sections |
| root | .mantine-Pillsinput-root | Root element |
| label | .mantine-Pillsinput-label | Label element |
| required | .mantine-Pillsinput-required | Required asterisk element, rendered inside label |
| description | .mantine-Pillsinput-description | Description element |
| error | .mantine-Pillsinput-error | Error element |

**Pillsinputfield selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| field | .mantine-Pillsinputfield-field | Root element |

**Pillsinputfield data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| field | data-type | - | Value of  |
| field | data-disabled | - | - |


--------------------------------------------------------------------------------

### PillsInput
Package: @mantine/core
Import: import { PillsInput } from '@mantine/core';
Description: Base component for custom tags inputs and multi selects

## Usage

`PillsInput` is a utility component that can be used to create custom tag inputs, multi selects and
other similar components. By itself it does not include any logic, it only renders given children.
Usually, `PillsInput` is used in combination with [Pill](https://mantine.dev/core/pill) component.

#### Example: usage

```tsx
import { PillsInput, Pill } from '@mantine/core';

function Demo() {
  return (
    <PillsInput label="PillsInput">
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}
```


## Input props

<InputFeatures component="PillsInput" element="div" />

PillsInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all div element props. PillsInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { PillsInput, Pill } from '@mantine/core';


function Demo() {
  return (
    <PillsInput
      
    >
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}
```


## Searchable select example

Combine `PillsInput` with [Combobox](https://mantine.dev/core/combobox) to create searchable multiselect:

#### Example: searchableMultiselect

```tsx
import { useState } from 'react';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Accessibility

If `PillsInput` is used without label prop, it will not be announced properly by screen reader:

```tsx
import { PillsInput } from '@mantine/core';

// Inaccessible input – screen reader will not announce it properly
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field />
    </PillsInput>
  );
}
```

Set `aria-label` on the `PillsInput.Field` component to make the input accessible.
In this case label will not be visible, but screen reader will announce it:

```tsx
import { PillsInput } from '@mantine/core';

// Accessible input – it has aria-label
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field aria-label="Enter tags" />
    </PillsInput>
  );
}
```

If `label` prop is set, the input will be accessible it is not required to set `aria-label`:

```tsx
import { PillsInput } from '@mantine/core';

// Accessible input – it has associated label element
function Demo() {
  return (
    <PillsInput label="Enter tags">
      <PillsInput.Field />
    </PillsInput>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

PillsInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PillsInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-PillsInput-wrapper | Root element of the Input |
| input | .mantine-PillsInput-input | Input element |
| section | .mantine-PillsInput-section | Left and right sections |
| root | .mantine-PillsInput-root | Root element |
| label | .mantine-PillsInput-label | Label element |
| required | .mantine-PillsInput-required | Required asterisk element, rendered inside label |
| description | .mantine-PillsInput-description | Description element |
| error | .mantine-PillsInput-error | Error element |

**PillsInputfield selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| field | .mantine-PillsInputfield-field | Root element |

**PillsInputfield data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| field | data-type | - | Value of  |
| field | data-disabled | - | - |


--------------------------------------------------------------------------------

### PinInput
Package: @mantine/core
Import: import { PinInput } from '@mantine/core';
Description: Capture pin code or one time password from the user

## Usage

#### Example: configurator

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return <PinInput />
}
```


## Regex type

You can use regular expression to validate user input. Characters that do not match given expression
will be disregarded. For example, to create a `PinInput` that will accept only numbers from `0` to `3`,
set `type={/^[0-3]+/}`:

#### Example: regexp

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
```


## One time code

Some operating systems expose the last received SMS code to be used by applications like your keyboard.
If the current form input asks for this code, your keyboard adapts and proposes the code as keyboard-suggestion.
Prop `oneTimeCode` makes your input setting `autocomplete="one-time-code"` which allows using that feature.

```tsx
import { PinInput } from '@mantine/core';

function OneTimeCodeInput() {
  return <PinInput oneTimeCode />;
}
```

#### Example: stylesApi

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return (
    <PinInput />
  );
}
```


## Accessibility

Inputs do not have associated labels, set `aria-label` to make component visible to the screen reader:

```tsx
import { PinInput } from '@mantine/core';

function Accessibility() {
  return <PinInput aria-label="One time code" />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabel | string | - | <code>aria-label</code> attribute |
| autoFocus | boolean | - | If set, the first input is focused when component is mounted |
| defaultValue | string | - | Uncontrolled component default value |
| disabled | boolean | - | Adds disabled attribute to all inputs |
| error | boolean | - | Sets <code>aria-invalid</code> attribute and applies error styles to all inputs |
| form | string | - | Hidden input <code>form</code> attribute |
| gap | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set <code>gap</code> between inputs, numbers are converted to rem |
| getInputProps | (index: number) => InputProps & ElementProps<"input", "size"> | - | Props added to the input element depending on its index |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| id | string | - | Base id used to generate unique ids for inputs |
| inputMode | "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | - | <code>inputmode</code> attribute, inferred from the <code>type</code> prop if not specified |
| inputType | HTMLInputTypeAttribute | - | Inputs <code>type</code> attribute, inferred from the <code>type</code> prop if not specified |
| length | number | - | Number of inputs |
| manageFocus | boolean | - | Determines whether focus should be moved automatically to the next input once filled |
| mask | boolean | - | Changes input type to <code>"password"</code> |
| name | string | - | Hidden input <code>name</code> attribute |
| onChange | (value: string) => void | - | Called when value changes |
| onComplete | (value: string) => void | - | Called when all inputs have value |
| oneTimeCode | boolean | - | Determines whether <code>autocomplete="one-time-code"</code> attribute should be set on all inputs |
| placeholder | string | - | Inputs placeholder |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the user cannot edit the value |
| rootRef | ForwardedRef<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls inputs <code>width</code> and <code>height</code> |
| type | "number" | RegExp | "alphanumeric" | - | Determines which values can be entered |
| value | string | - | Controlled component value |


#### Styles API

PinInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PinInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-PinInput-root | Root element |
| pinInput | .mantine-PinInput-pinInput | Input item wrapper |
| input | .mantine-PinInput-input | Input element |

**PinInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pin-input-size | Controls input `width` and `height` |


--------------------------------------------------------------------------------

### Popover
Package: @mantine/core
Import: import { Popover } from '@mantine/core';
Description: Display popover section relative to given target element

## Usage

#### Example: usage

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Controlled

You can control Popover state with `opened` and `onChange` props:

```tsx
import { useState } from 'react';
import { Button, Popover } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Controlled example with mouse events:

#### Example: hover

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close}>
          Hover to see popover
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="sm">This popover is shown when user hovers the target element</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Focus trap

If you need to use interactive elements (inputs, buttons, etc.) inside `Popover.Dropdown`, set `trapFocus` prop:

#### Example: form

```tsx
import { Popover, Button, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput label="Name" placeholder="Name" size="xs" />
        <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Inline elements

Enable `inline` middleware to use `Popover` with inline elements:

#### Example: inline

```tsx
import { Popover, Mark, Text } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Stantler’s magnificent antlers were traded at high prices as works of art. As a result, this
      Pokémon was hunted close to extinction by those who were after the priceless antlers.{' '}
      <Popover middlewares={{ flip: true, shift: true, inline: true }} position="top">
        <Popover.Target>
          <Mark>When visiting a junkyard</Mark>
        </Popover.Target>
        <Popover.Dropdown>Inline dropdown</Popover.Dropdown>
      </Popover>
      , you may catch sight of it having an intense fight with Murkrow over shiny objects.Ho-Oh’s
      feathers glow in seven colors depending on the angle at which they are struck by light. These
      feathers are said to bring happiness to the bearers. This Pokémon is said to live at the foot
      of a rainbow.
    </Text>
  );
}
```


## Same width

Set `width="target"` prop to make Popover dropdown take the same width as target element:

#### Example: sameWidth

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width="target" position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button w={280}>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This popover has same width as target, it is useful when you are building input dropdowns
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## offset

Set `offset` prop to a number to change dropdown position relative to the target element.
This way you can control dropdown offset on main axis only.

#### Example: offset

```tsx
import { Popover, Button, Text } from '@mantine/core';


function Demo() {
  return (
    <Popover
      width={200}
      opened
      
    >
      <Popover.Target>
        <Button>Popover target</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          Change position and offset to configure dropdown offset relative to target
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


To control offset on both axis, pass object with `mainAxis` and `crossAxis` properties:

#### Example: offsetAxis

```tsx
import { Popover, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Popover
      width={200}
      position="bottom"
      opened
      offset={{ mainAxis: , crossAxis:  }}
    >
      <Popover.Target>
        <Button>Popover target</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          Change position and offset to configure dropdown offset relative to target
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Middlewares

You can enable or disable [Floating UI](https://floating-ui.com/) middlewares with
`middlewares` prop:

* [shift](https://floating-ui.com/docs/shift) middleware shifts the dropdown to keep it in view. It is enabled by default
* [flip](https://floating-ui.com/docs/flip) middleware changes the placement of the dropdown to keep it in view. It is enabled by default.
* [inline](https://floating-ui.com/docs/inline) middleware improves positioning for inline reference elements that span over multiple lines. It is disabled by default.
* [size](https://floating-ui.com/docs/size) middleware manipulates dropdown size. It is disabled by default.

Example of turning off `shift` and `flip` middlewares:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover
      middlewares={{ flip: false, shift: false }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

## Customize middleware options

To customize [Floating UI](https://floating-ui.com/) middlewares options, pass them as
an object to the `middlewares` prop. For example, to change [shift](https://floating-ui.com/docs/shift)
middleware padding to `20px` use the following configuration:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover
      middlewares={{ shift: { padding: 20 } }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

## Dropdown arrow

Set `withArrow` prop to add an arrow to the dropdown. Arrow is a `div` element rotated with `transform: rotate(45deg)`.

`arrowPosition` prop determines how arrow is position relative to the target element when `position` is set to `*-start` and `*-end` values on `Popover` component.
By default, the value is `center` – the arrow is positioned in the center of the target element if it is possible.

If you change `arrowPosition` to `side`, then the arrow will be positioned on the side of the target element,
and you will be able to control arrow offset with `arrowOffset` prop. Note that when `arrowPosition` is set to `center`,
`arrowOffset` prop is ignored.

#### Example: arrow

```tsx
import { Popover, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} opened position="bottom-start" withArrow>
      <Popover.Target>
        <Button>Target element</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Arrow position can be changed for *-start and *-end positions</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## With overlay

Set `withOverlay` prop to add overlay behind the dropdown. You can pass additional
configuration to [Overlay](https://mantine.dev/core/overlay/) component with `overlayProps` prop:

#### Example: overlay

```tsx
import { Popover, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';

function Demo() {
  return (
    <Popover
      width={320}
      shadow="md"
      withArrow
      withOverlay
      overlayProps={{ zIndex: 10000, blur: '8px' }}
      zIndex={10001}
    >
      <Popover.Target>
        <UnstyledButton style={{ zIndex: 10001, position: 'relative' }}>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
          <Stack gap={5}>
            <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
              Mantine
            </Text>
            <Anchor href="https://x.com/mantinedev" c="dimmed" size="xs" style={{ lineHeight: 1 }}>
              @mantinedev
            </Anchor>
          </Stack>
        </Group>

        <Text size="sm" mt="md">
          Customizable React components and hooks library with focus on usability, accessibility and
          developer experience
        </Text>

        <Group mt="md" gap="xl">
          <Text size="sm">
            <b>0</b> Following
          </Text>
          <Text size="sm">
            <b>1,174</b> Followers
          </Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Hide detached

Use `hideDetached` prop to configure how the dropdown behaves when the target
element is hidden with styles (`display: none`, `visibility: hidden`, etc.),
removed from the DOM, or when the target element is scrolled out of the viewport.

By default, `hideDetached` is enabled – the dropdown is hidden with the target element.
You can change this behavior with `hideDetached={false}`. To see the difference, try to scroll
the root element of the following demo:

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


## Disabled

Set `disabled` prop to prevent `Popover.Dropdown` from rendering:

#### Example: disabled

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Disabled popover dropdown is always hidden</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Click outside

By default, `Popover` closes when you click outside of the dropdown. To disable this behavior, set `closeOnClickOutside={false}`.

You can configure events that are used for click outside detection with `clickOutsideEvents` prop.
By default, `Popover` listens to `mousedown` and `touchstart` events. You can change it to any other
events, for example, `mouseup` and `touchend`:

#### Example: clickOutsideEvents

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Popover will be closed with mouseup and touchend events</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## onDismiss

If you need to control opened state, but still want to close popover on outside clicks
and escape key presses, use `onDismiss` prop:

```tsx
import { useState } from 'react';
import { Button, Popover } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onDismiss={() => setOpened(false)}
    >
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

## Initial focus

Popover uses [FocusTrap](https://mantine.dev/core/focus-trap/) component to manage focus.
Add `data-autofocus` attribute to element that should receive initial focus:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover>
      <Popover.Target>
        <button type="button">Target</button>
      </Popover.Target>
      <Popover.Dropdown>
        <input />
        <input data-autofocus />
        <input />
      </Popover.Dropdown>
    </Popover>
  );
}
```

<TargetComponent component="Popover" />

## Target component

The target element determines where the Popover will be positioned relative to.

## Nested popovers

Nested popovers require children rendering without [Portal](https://mantine.dev/core/portal/). Usually, you
should disable portal with props of the component that renders popover content, for example,
[Select](https://mantine.dev/core/select/) has `comboboxProps={{ withinPortal: false }}` prop. Check documentation
of the component that you are using to render popover content to find out how to disable the portal.
If the portal is not disabled, outside click will close all popovers.

Example of disabling portal in [Select](https://mantine.dev/core/select/) and [DatePickerInput](https://mantine.dev/dates/date-picker-input/)
components:

#### Example: portalChildren

```tsx
import { Button, Popover, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)">
        <Select
          label="Select within Popover"
          placeholder="Select within Popover"
          comboboxProps={{ withinPortal: false }}
          data={['React', 'Angular', 'Svelte', 'Vue']}
        />
        <DatePickerInput
          label="DatePickerInput within Popover"
          placeholder="DatePickerInput within Popover"
          popoverProps={{ withinPortal: false }}
          mt="md"
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Accessibility

Popover follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal):

* Dropdown element has `role="dialog"` and `aria-labelledby="target-id"` attributes
* Target element has `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls="dropdown-id"` attributes

Whilst the dropdown is unopened, the `aria-controls` attribute will be undefined

Uncontrolled Popover will be accessible only when used with `button` element or component that renders it ([Button](https://mantine.dev/core/button/), [ActionIcon](https://mantine.dev/core/action-icon/), etc.).
Other elements will not support `Space` and `Enter` key presses.

## Keyboard interactions


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | ArrowPosition | - | Arrow position |
| arrowRadius | number | - | Arrow <code>border-radius</code> in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | <code>Popover.Target</code> and <code>Popover.Dropdown</code> components |
| clickOutsideEvents | string[] | - | Events that trigger outside clicks |
| closeOnClickOutside | boolean | - | Determines whether dropdown should be closed on outside clicks |
| closeOnEscape | boolean | - | Determines whether dropdown should be closed when <code>Escape</code> key is pressed |
| defaultOpened | boolean | - | Initial opened state for uncontrolled component |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. <code>display: none</code> styles are added instead. |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number | FloatingAxesOffsets | - | Offset of the dropdown element |
| onChange | (opened: boolean) => void | - | Called with current state when dropdown opens or closes |
| onClose | () => void | - | Called when dropdown closes |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when dropdown opens |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| opened | boolean | - | Controlled dropdown opened state |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to <code>Overlay</code> component |
| portalProps | BasePortalProps | - | Props to pass down to the <code>Portal</code> when <code>withinPortal</code> is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| positionDependencies | any[] | - | @deprecated : Do not use, will be removed in 9.0 |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of <code>theme.shadows</code> or any other valid CSS <code>box-shadow</code> value |
| transitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component. Use to configure duration and animation type. |
| trapFocus | boolean | - | Determines whether focus should be trapped within dropdown |
| width | PopoverWidth | - | Dropdown width, or <code>'target'</code> to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withRoles | boolean | - | Determines whether dropdown and target elements should have accessible roles |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the <code>Portal</code> |
| zIndex | string | number | - | Dropdown <code>z-index</code> |


#### Styles API

Popover component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Popover selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| dropdown | .mantine-Popover-dropdown | Dropdown element |
| arrow | .mantine-Popover-arrow | Dropdown arrow |
| overlay | .mantine-Popover-overlay | Overlay element |

**Popover CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| dropdown | --popover-radius | Controls dropdown border-radius |
| dropdown | --popover-shadow | Controls dropdown box-shadow |

**Popover data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| dropdown | data-position | - | Value of floating ui dropdown position |


--------------------------------------------------------------------------------

### Portal
Package: @mantine/core
Import: import { Portal } from '@mantine/core';
Description: Renders component outside of parent element tree

## Usage

Portal is a wrapper component for [ReactDOM.createPortal](https://reactjs.org/docs/portals.html) API.
Render any component or element at the end of `document.body` or at a given element. [Modal](https://mantine.dev/core/modal/) and [Drawer](https://mantine.dev/core/drawer/) components are wrapped in Portal by default.

Use Portal to render a component or an element at a different place (defaults to the end of `document.body`).
Portal is useful when you want to prevent parent styles from interfering with children,
usually all these styles are related to `position` and `z-index` properties
and portals are used for components with fixed position, for example, modals.

```tsx
import { useState } from 'react';
import { Portal } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {opened && (
        <Portal>
          <div>Your modal content</div>
        </Portal>
      )}

      <button onClick={() => setOpened(true)} type="button">
        Open modal
      </button>
    </main>
  );
}
```

In the example above, the div element is rendered outside of parent main (before closing body tag),
but still receives `opened` and `onClose` props. The element will not be affected by parent z-index.

## Reuse target node

By default, Portal creates a new target node for each instance. To change this behavior and
reuse the same target node for all instances, set `reuseTargetNode` prop. In the following
example, all three paragraphs will be rendered in the same target node:

```tsx
import { Portal } from '@mantine/core';

function Demo() {
  return (
    <>
      <Portal reuseTargetNode>
        <p>First</p>
      </Portal>

      <Portal reuseTargetNode>
        <p>Second</p>
      </Portal>

      <Portal reuseTargetNode>
        <p>Third</p>
      </Portal>
    </>
  );
}
```

## Specify target DOM node

You can specify dom node where portal will be rendered by passing `target` prop:

```tsx
import { Portal } from '@mantine/core';

const container = document.createElement('div');
document.body.appendChild(container);

function Demo() {
  return <Portal target={container}>My portal</Portal>;
}
```

Alternatively, you can specify selector to render portal in existing element:

```tsx
import { Portal } from '@mantine/core';

function Demo() {
  return <Portal target="#portal-container">My portal</Portal>;
}
```

If you don't specify the target element, new one will be created and appended to the `document.body` for each Portal component.

## Server side rendering

`createPortal` is not supported during server side rendering.
All components inside Portal are rendered only after the application was mounted to the dom.

## OptionalPortal component

`OptionalPortal` component lets you configure whether children should be rendered in `Portal`.
It accepts the same props as the `Portal` component:

```tsx
import { OptionalPortal } from '@mantine/core';

function Demo() {
  return (
    <>
      <OptionalPortal withinPortal>
        This text is rendered in Portal
      </OptionalPortal>
      <OptionalPortal withinPortal={false}>
        This text is rendered as regular child
      </OptionalPortal>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Portal children, for example, custom modal or popover |
| reuseTargetNode | boolean | - | If set, all portals are rendered in the same DOM node |
| target | string | HTMLElement | - | Element inside which portal should be created, by default a new div element is created and appended to the <code>document.body</code> |


--------------------------------------------------------------------------------

### Progress
Package: @mantine/core
Import: import { Progress } from '@mantine/core';
Description: Give user feedback for status of the task

## Usage

#### Example: usage

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return <Progress />;
}
```


## Compound components

#### Example: compound

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return (
    <Progress.Root size="xl">
      <Progress.Section value={35} color="cyan">
        <Progress.Label>Documents</Progress.Label>
      </Progress.Section>
      <Progress.Section value={28} color="pink">
        <Progress.Label>Photos</Progress.Label>
      </Progress.Section>
      <Progress.Section value={15} color="orange">
        <Progress.Label>Other</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
```


## Vertical orientation

#### Example: vertical

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Progress value={80} orientation="vertical" h={200} />
      <Progress value={60} color="orange" size="xl" orientation="vertical" h={200} animated />

      <Progress.Root size="xl" autoContrast orientation="vertical" h={200}>
        <Progress.Section value={40} color="lime.4">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="yellow.4">
          <Progress.Label>Apps</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="cyan.7">
          <Progress.Label>Other</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Group>
  );
}
```


## With tooltips

#### Example: tooltips

```tsx
import { Progress, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="Documents – 33Gb">
        <Progress.Section value={33} color="cyan">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Photos – 28Gb">
        <Progress.Section value={28} color="pink">
          <Progress.Label>Photos</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Other – 15Gb">
        <Progress.Section value={15} color="orange">
          <Progress.Label>Other</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}
```


## Section width transition

Set `transitionDuration` to a number of ms to enable width transition:

#### Example: transition

```tsx
import { useState } from 'react';
import { Button, Progress } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(50);
  return (
    <>
      <Progress value={value} size="lg" transitionDuration={200} />
      <Button onClick={() => setValue(Math.random() * 100)} mt="md">
        Set random value
      </Button>
    </>
  );
}
```


## Example: progress with segments

#### Example: segments

```tsx
import { useState } from 'react';
import { Group, PasswordInput, Progress } from '@mantine/core';

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[DEMOPLACEHOLDER::ProgressDemos.segments::END+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  if (password.length < 5) {
    return 10;
  }

  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function getStrengthColor(strength: number) {
  switch (true) {
    case strength < 30:
      return 'red';
    case strength < 50:
      return 'orange';
    case strength < 70:
      return 'yellow';
    default:
      return 'teal';
  }
}

function Demo() {
  const [value, setValue] = useState('');
  const strength = getStrength(value);
  const color = getStrengthColor(strength);

  return (
    <div>
      <PasswordInput
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Enter password"
        label="Enter password"
      />

      <Group grow gap={5} mt="xs">
        <Progress
          size="xs"
          color={color}
          value={value.length > 0 ? 100 : 0}
          transitionDuration={0}
        />
        <Progress size="xs" color={color} transitionDuration={0} value={strength < 30 ? 0 : 100} />
        <Progress size="xs" color={color} transitionDuration={0} value={strength < 50 ? 0 : 100} />
        <Progress size="xs" color={color} transitionDuration={0} value={strength < 70 ? 0 : 100} />
      </Group>
    </div>
  );
}
```


#### Example: stylesApi

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return (
    <Progress.Root size="xl">
      <Progress.Section value={35}>
        <Progress.Label>Documents</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
```


## Accessibility

* Progress section has `role="progressbar"` attribute
* Progress section has `aria-valuenow` attribute with current value
* `aria-valuemin` and `aria-valuemax` attributes are always set to `0` and `100` as component does not support other values

Set `aria-label` attribute to label progress:

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return <Progress aria-label="Uploading progress" value={10} />;
}

function DemoCompound() {
  return (
    <Progress.Root>
      <Progress.Section aria-label="Uploading progress" value={10} />
    </Progress.Root>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animated | boolean | - | If set, the sections stripes are animated, <code>striped</code> prop is ignored |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS value |
| orientation | "horizontal" | "vertical" | - | Controls orientation |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| size | number | MantineSize | (string & {}) | - | Controls track height |
| striped | boolean | - | If set, the section has stripes |
| transitionDuration | number | - | Controls sections width transition duration, value is specified in ms |
| value | number | required | Value of the progress |


#### Styles API

Progress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Progress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Progress-root | Root element |
| section | .mantine-Progress-section | `Progress.Section` root element |
| label | .mantine-Progress-label | `Progress.Label` root element |

**Progress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --progress-radius | Controls `border-radius` of track and sections |
| root | --progress-size | Controls height of progress bar |
| root | --progress-transition-duration | Controls width `transition-duration` of progress bar |

**Progress data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| section | data-striped | - | - |
| section | data-animated | - | - |


--------------------------------------------------------------------------------

### Radio
Package: @mantine/core
Import: import { Radio } from '@mantine/core';
Description: Wrapper for input type radio

## Usage

#### Example: configurator

```tsx
import { Radio } from '@mantine/core';


function Demo() {
  return (
    <Radio
      
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Radio } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## States

#### Example: states

```tsx
import { Radio, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Radio checked={false} onChange={() => {}} label="Default radio" />
      <Radio checked onChange={() => {}} label="Checked radio" />
      <Radio checked variant="outline" onChange={() => {}} label="Outline checked radio" />
      <Radio disabled label="Disabled radio" />
      <Radio disabled checked onChange={() => {}} label="Disabled checked radio" />
    </Stack>
  );
}
```


## Change icon

#### Example: icon

```tsx
import { Radio, CheckIcon } from '@mantine/core';

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}
```


## Change icon color

#### Example: iconColor

```tsx
import { Radio } from '@mantine/core';

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="Custom icon color"
      name="check"
      value="check"
      defaultChecked
    />
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { Radio, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Radio checked disabled label="React" value="react" />
      <Radio disabled label="Angular" value="nu" />
      <Radio disabled label="Svelte" value="sv" />
    </Group>
  );
}
```


## Pointer cursor

By default, radio input and label have `cursor: default` (same as native `input[type="radio"]`).
To change cursor to pointer, set `cursorType` on [theme](https://mantine.dev/theming/theme-object/):

```tsx
import { createTheme, MantineProvider, Radio } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Radio label="Pointer cursor" />
    </MantineProvider>
  );
}
```

## Radio with tooltip

You can change target element to which tooltip is attached with `refProp`:

* If `refProp` is not set, the tooltip is attached to the checkbox input
* If `refProp="rootRef"` is set, the tooltip is attached to the root element (contains label, input and other elements)

#### Example: tooltip

```tsx
import { Tooltip, Radio } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="Radio with tooltip">
        <Radio label="Tooltip on radio only" />
      </Tooltip>

      <Tooltip label="Radio with tooltip" refProp="rootRef">
        <Radio label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
```


<WrapperProps component="Radio" />

## Wrapper props

Radio supports additional props that are passed to the wrapper element for more customization options.

## Radio.Group component

#### Example: groupConfigurator

```tsx
import { Radio, Group } from '@mantine/core';


function Demo() {
  return (
    <Radio.Group
      name="favoriteFramework"
      
    >
      <Group mt="xs">
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </Group>
    </Radio.Group>
  );
}
```


## Radio.Group disabled state



## Controlled Radio.Group

```tsx
import { useState } from 'react';
import { Radio } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <Radio.Group
      value={value}
      onChange={setValue}
      name="favoriteFramework"
      label="Select your favorite framework/library"
      description="This is anonymous"
      withAsterisk
    >
      <Radio value="react" label="React" />
      <Radio value="svelte" label="Svelte" />
      <Radio value="ng" label="Angular" />
      <Radio value="vue" label="Vue" />
    </Radio.Group>
  );
}
```

## Radio.Indicator

`Radio.Indicator` looks exactly the same as `Radio` component, but it does not
have any semantic meaning, it's just a visual representation of radio state. You
can use it in any place where you need to display radio state without any interaction
related to the indicator. For example, it is useful in cards based on buttons, trees, etc.

Note that `Radio.Indicator` cannot be focused or selected with keyboard. It is not
accessible and should not be used as a replacement for `Radio` component.

#### Example: indicator

```tsx
import { Radio, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}
```


## Radio.Card component

`Radio.Card` component can be used as a replacement for `Radio` to build custom
cards/buttons/other things that work as radios. The root element of the component
has `role="radio"` attribute, it is accessible by default and supports the same
keyboard interactions as `input[type="radio"]`.

#### Example: card

```tsx
import { useState } from 'react';
import { Radio, Group, Text } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Radio.Card
      className={classes.root}
      radius="md"
      checked={checked}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>@mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Radio.Card>
  );
}
```


You can use `Radio.Card` with `Radio.Group` the same way as `Radio` component:

#### Example: cardGroup

```tsx
import { useState } from 'react';
import { Radio, Group, Stack, Text } from '@mantine/core';
import classes from './Demo.module.css';

const data = [
  {
    name: '@mantine/core',
    description: 'Core components library: inputs, buttons, overlays, etc.',
  },
  { name: '@mantine/hooks', description: 'Collection of reusable hooks for React applications.' },
  { name: '@mantine/notifications', description: 'Notifications system' },
];

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  const cards = data.map((item) => (
    <Radio.Card className={classes.root} radius="md" value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));

  return (
    <>
      <Radio.Group
        value={value}
        onChange={setValue}
        label="Pick one package to install"
        description="Choose a package that you will need in your application"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Radio.Group>

      <Text fz="xs" mt="md">
        CurrentValue: {value || '–'}
      </Text>
    </>
  );
}
```


<GetElementRef component="Radio" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Radio } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Radio ref={ref} />;
}
```

#### Example: stylesApi

```tsx
import { Radio } from '@mantine/core';

function Demo() {
  return (
    <Radio
      label="Radio"
      description="Radio description"
      error="Radio error"
      defaultChecked
     
    />
  );
}
```


## Accessibility

Set `aria-label` or `label` prop to make the radio accessible:

```tsx
import { Radio } from '@mantine/core';

// Not ok, input is not labeled
function Bad() {
  return <Radio />;
}

// Ok, input is labelled by aria-label
function GoodAriaLabel() {
  return <Radio aria-label="My radio" />;
}

// Ok, input is labelled by label element
function GoodLabel() {
  return <Radio label="My radio" />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set input color in checked state |
| description | React.ReactNode | - | Description displayed below the label |
| error | React.ReactNode | - | Error displayed below the label |
| icon | FC<RadioIconProps> | - | A component that replaces default check icon |
| iconColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set icon color, by default value depends on <code>theme.autoContrast</code> |
| label | React.ReactNode | - | Content of the <code>label</code> associated with the radio |
| labelPosition | "left" | "right" | - | Position of the label relative to the input |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius,</code> |
| rootRef | ForwardedRef<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | (string & {}) | - | Controls size of the component |
| wrapperProps | Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & DataAttributes | - | Props passed down to the root element |


#### Styles API

Radio component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Radio selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Radio-root | Root element |
| radio | .mantine-Radio-radio | Input element (`input[type="radio"]`) |
| icon | .mantine-Radio-icon | Radio icon, used to display checked icon |
| inner | .mantine-Radio-inner | Wrapper for `icon` and `input` |
| body | .mantine-Radio-body | Input body, contains all other elements |
| labelWrapper | .mantine-Radio-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Radio-label | Label element |
| description | .mantine-Radio-description | Description displayed below the label |
| error | .mantine-Radio-error | Error message displayed below the label |

**Radio CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --radio-color | Controls checked radio `background-color` |
| root | --radio-radius | Controls radio `border-radius` |
| root | --radio-size | Controls radio `width` and `height` |
| root | --radio-icon-color | Controls radio icon `color` |
| root | --radio-icon-size | Controls radio icon `width` and `height` |

**Radio data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| radio | data-error | - | - |
| inner | data-label-position | - | Value of  |

**Radio.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-RadioGroup-root | Root element |
| label | .mantine-RadioGroup-label | Label element |
| required | .mantine-RadioGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-RadioGroup-description | Description element |
| error | .mantine-RadioGroup-error | Error element |

**Radio.Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| indicator | .mantine-RadioIndicator-indicator | Root element |
| icon | .mantine-RadioIndicator-icon | Radio icon |

**Radio.Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| indicator | --radio-color | Controls checked radio `background-color` |
| indicator | --radio-radius | Controls radio `border-radius` |
| indicator | --radio-size | Controls radio `width` and `height` |
| indicator | --radio-icon-color | Controls radio icon `color` |
| indicator | --radio-icon-size | Controls radio icon `width` and `height` |

**Radio.Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| indicator | data-checked | - | - |
| indicator | data-disabled | - | - |

**Radio.Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| card | .mantine-RadioCard-card | Root element |

**Radio.Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| card | --card-radius | Controls card `border-radius` |

**Radio.Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| card | data-checked | - | - |
| card | data-with-border | - | - |


--------------------------------------------------------------------------------

### RangeSlider
Package: @mantine/core
Import: import { RangeSlider } from '@mantine/core';
Description: RangeSlider component

## Usage

#### Example: configurator

```tsx
import { RangeSlider } from '@mantine/core';


function Demo() {
  return (
    <RangeSlider
      
      defaultValue={[20, 60]}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { RangeSlider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return <RangeSlider value={value} onChange={setValue} />;
}
```

## Disabled

#### Example: disabled

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
```


## Control label

To change label behavior and appearance, set the following props:

* `label` – formatter function, accepts value as an argument, set null to disable label, defaults to `f => f`
* `labelAlwaysOn` – if true – label will always be displayed, by default label is visible only when user is dragging
* `labelTransitionProps` – props passed down to the [Transition](https://mantine.dev/core/transition) component, can be used to customize label animation

#### Example: label

```tsx
import { RangeSlider, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">Formatted label</Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">Label always visible</Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />

      <Text size="sm" mt="xl">Custom label transition</Text>
      <RangeSlider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
}
```


## Min, max and step

#### Example: step

```tsx
import { RangeSlider, Text } from '@mantine/core';

const marks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

function Demo() {
  return (
    <>
      <Text>Decimal step</Text>
      <RangeSlider minRange={2} defaultValue={[0, 10]} min={-10} max={10} step={0.1} />

      <Text mt="md">Step matched with marks</Text>
      <RangeSlider defaultValue={[50, 75]} step={25} marks={marks} />
    </>
  );
}
```


## Domain

By default, `min` and `max` values define the possible range of values.
`domain` prop allows setting the possible range of values independently of the
`min` and `max` values:

#### Example: domain

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={[25, 75]}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}
```


## Decimal values

To use `RangeSlider` with decimal values, set `min`, `max` and `step` props:

#### Example: decimal

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider min={0} max={1} minRange={0.2} step={0.0005} defaultValue={[0.2, 0.8]} />;
}
```


## minRange

Use `minRange` prop to control minimum range between `from` and `to` values
in `RangeSlider`. The default value is `10`. The example below shows how to
use `minRange` prop to capture decimal values from the user:

#### Example: decimal

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider min={0} max={1} minRange={0.2} step={0.0005} defaultValue={[0.2, 0.8]} />;
}
```


## pushOnOverlap

`pushOnOverlap` prop controls whether the thumbs should push each other when they overlap.
By default, `pushOnOverlap` is `true`, if you want to disable this behavior, set it to `false`.

Example of `pushOnOverlap={false}`:

#### Example: pushOnOverlap

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}
```


## Marks

Add any number of marks to slider by setting `marks` prop to an array of objects:

```tsx
const marks = [
  { value: 20 }, // -> displays mark on slider track
  { value: 40, label: '40%' }, // -> adds mark label below slider track
];
```

Note that mark value is relative to slider value, not width:

#### Example: marks

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <>
      <RangeSlider
        defaultValue={[20, 60]}
        marks={[{ value: 10 }, { value: 40 }, { value: 95 }]}
        mb={32}
      />

      <RangeSlider
        mb={32}
        defaultValue={[20, 60]}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </>
  );
}
```


## Restrict selection to marks

Set `restrictToMarks` prop to restrict slider value to marks only. Note that in
this case `step` prop is ignored:

#### Example: restrictToMarks

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      restrictToMarks
      defaultValue={[5, 15]}
      marks={[
        { value: 5 },
        { value: 15 },
        { value: 25 },
        { value: 35 },
        { value: 70 },
        { value: 80 },
        { value: 90 },
      ]}
    />
  );
}
```


## Inverted

You can invert the track with the `inverted` prop:

#### Example: inverted

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}
```


## Accessibility

`RangeSlider` component is accessible by default:

* Thumbs are focusable
* When the user uses mouse to interact with the slider, focus is moved to the slider track, when the user presses arrows focus is moved to the thumb
* Value can be changed with arrows with step increment/decrement

To label component for screen readers, add labels to thumbs:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      thumbFromLabel="First thumb aria-label"
      thumbToLabel="Second thumb aria-label"
    />
  );
}
```

## Keyboard interactions


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, controls color of track and thumb |
| defaultValue | RangeSliderValue | - | Uncontrolled component default value |
| disabled | boolean | - | Disables slider |
| domain | [number, number] | - | Domain of the slider, defines the full range of possible values |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| inverted | boolean | - | Determines whether track values representation should be inverted |
| label | ReactNode | ((value: number) => ReactNode) | - | Function to generate label or any react node to render instead, set to null to disable label |
| labelAlwaysOn | boolean | - | Determines whether the label should be visible when the slider is not being dragged or hovered |
| labelTransitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component |
| marks | { value: number; label?: ReactNode; }[] | - | Marks displayed on the track |
| max | number | - | Maximum possible value |
| maxRange | number | - | Maximum range interval |
| min | number | - | Minimal possible value |
| minRange | number | - | Minimal range interval |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: RangeSliderValue) => void | - | Called when value changes |
| onChangeEnd | (value: RangeSliderValue) => void | - | Called when user stops dragging slider or changes value with arrows |
| precision | number | - | Number of significant digits after the decimal point |
| pushOnOverlap | boolean | - | Determines whether the other thumb should be pushed by the current thumb dragging when <code>minRange</code>/<code>maxRange</code> is reached |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| restrictToMarks | boolean | - | Determines whether the selection should be only allowed from the given marks array |
| scale | (value: number) => number | - | A transformation function to change the scale of the slider |
| showLabelOnHover | boolean | - | Determines whether the label should be displayed when the slider is hovered |
| size | number | MantineSize | (string & {}) | - | Controls size of the track |
| step | number | - | Number by which value will be incremented/decremented with thumb drag and arrows |
| thumbChildren | React.ReactNode | - | Content rendered inside thumb |
| thumbFromLabel | string | - | First thumb <code>aria-label</code> |
| thumbProps | (index: 0 | 1) => Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> | - | Props passed down to thumb element based on the thumb index |
| thumbSize | string | number | - | Thumb <code>width</code> and <code>height</code>, by default value is computed based on <code>size</code> prop |
| thumbToLabel | string | - | Second thumb <code>aria-label</code> |
| value | RangeSliderValue | - | Controlled component value |


--------------------------------------------------------------------------------

### Rating
Package: @mantine/core
Import: import { Rating } from '@mantine/core';
Description: Pick and display rating

## Usage

#### Example: configurator

```tsx
import { Rating } from '@mantine/core';

function Demo() {
  return <Rating defaultValue={2} />
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Rating } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} />;
}
```

## Read only

#### Example: readOnly

```tsx
import { Rating } from '@mantine/core';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
```


## Fractions

#### Example: fractions

```tsx
import { Rating, Group, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Group>
        <div>Fractions: 2</div>
        <Rating fractions={2} defaultValue={1.5} />
      </Group>
      <Group>
        <div>Fractions: 3</div>
        <Rating fractions={3} defaultValue={2.33333333} />
      </Group>
      <Group>
        <div>Fractions: 4</div>
        <Rating fractions={4} defaultValue={3.75} />
      </Group>
    </Stack>
  );
}
```


## Custom symbol

#### Example: symbol

```tsx
import { Rating } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function Demo() {
  return <Rating emptySymbol={<IconSun size={16} />} fullSymbol={<IconMoon size={16} />} />;
}
```


## Symbols for each item

#### Example: customSymbol

```tsx
import { Rating } from '@mantine/core';
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from '@tabler/icons-react';

const getIconStyle = (color?: string) => ({
  width: 24,
  height: 24,
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      return <IconMoodCry style={iconStyle} />;
    case 2:
      return <IconMoodSad style={iconStyle} />;
    case 3:
      return <IconMoodSmile style={iconStyle} />;
    case 4:
      return <IconMoodHappy style={iconStyle} />;
    case 5:
      return <IconMoodCrazyHappy style={iconStyle} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <IconMoodCry style={getIconStyle('red')} />;
    case 2:
      return <IconMoodSad style={getIconStyle('orange')} />;
    case 3:
      return <IconMoodSmile style={getIconStyle('yellow')} />;
    case 4:
      return <IconMoodHappy style={getIconStyle('lime')} />;
    case 5:
      return <IconMoodCrazyHappy style={getIconStyle('green')} />;
    default:
      return null;
  }
};

function Demo() {
  return <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />;
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any CSS color value |
| count | number | - | Number of controls |
| defaultValue | number | - | Uncontrolled component default value |
| emptySymbol | ReactNode | ((value: number) => ReactNode) | - | Icon displayed when the symbol is empty |
| fractions | number | - | Number of fractions each item can be divided into |
| fullSymbol | ReactNode | ((value: number) => ReactNode) | - | Icon displayed when the symbol is full |
| getSymbolLabel | (index: number) => string | - | A function to assign <code>aria-label</code> of the the control at index given in the argument. If not specified, control index is used as <code>aria-label</code>. |
| highlightSelectedOnly | boolean | - | If set, only the selected symbol changes to full symbol when selected |
| name | string | - | <code>name</code> attribute passed down to all inputs. By default, <code>name</code> is generated randomly. |
| onChange | (value: number) => void | - | Called when value changes |
| onHover | (value: number) => void | - | Called when one of the controls is hovered |
| readOnly | boolean | - | If set, the user cannot interact with the component |
| size | number | MantineSize | (string & {}) | - | Controls component size |
| value | number | - | Controlled component value |


#### Styles API

Rating component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Rating selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Rating-root | Root element |
| starSymbol | .mantine-Rating-starSymbol | Default star icon |
| input | .mantine-Rating-input | Item input, hidden by default |
| label | .mantine-Rating-label | Item label, used to display star icon |
| symbolBody | .mantine-Rating-symbolBody | Wrapper around star icon for centering |
| symbolGroup | .mantine-Rating-symbolGroup | Group of symbols, used to display fractions |

**Rating CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --rating-color | Controls filled star icon color |
| root | --rating-size | Controls star icon width and height |

**Rating data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-read-only | - | - |
| input | data-active | Input value is the same as component value | - |
| starSymbol | data-filled | Associated input value is less or equal to the component value | - |


--------------------------------------------------------------------------------

### RingProgress
Package: @mantine/core
Import: import { RingProgress } from '@mantine/core';
Description: Give user feedback for status of the task with circle diagram

## Usage

Set `sections` prop to an array of:

* `value` – number between 0 and 100 – amount of space filled by segment
* `color` – segment color from theme or any other css color value

#### Example: usage

```tsx
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
      label={
        <Text size="xs" ta="center">
          Application data usage
        </Text>
      }
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  );
}
```


## Size, thickness & rounded caps

Use `size`, `thickness` & `roundCaps` props to configure RingProgress, size and thickness values:

#### Example: configurator

```tsx
import { RingProgress } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
      
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  )
}
```


## Sections tooltips

Add `tooltip` property to section to display floating [Tooltip](https://mantine.dev/core/tooltip/) when user hovers over it:

#### Example: tooltip

```tsx
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
      size={170}
      thickness={16}
      label={
        <Text size="xs" ta="center" px="xs" style={{ pointerEvents: 'none' }}>
          Hover sections to see tooltips
        </Text>
      }
      sections={[
        { value: 40, color: 'cyan', tooltip: 'Documents – 40 Gb' },
        { value: 25, color: 'orange', tooltip: 'Apps – 25 Gb' },
        { value: 15, color: 'grape', tooltip: 'Other – 15 Gb' },
      ]}
    />
  );
}
```


## Root color

Use `rootColor` property to change the root color:

#### Example: rootColor

```tsx
import { RingProgress } from '@mantine/core';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
```


## Sections props

You can add any additional props to sections:

#### Example: sectionsProps

```tsx
import { useState } from 'react';
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  const [hovered, setHovered] = useState(-1);
  const reset = () => setHovered(-1);
  return (
    <>
      <RingProgress
        onMouseLeave={() => setHovered(-1)}
        size={140}
        sections={[
          { value: 40, color: 'cyan', onMouseEnter: () => setHovered(0), onMouseLeave: reset },
          { value: 20, color: 'blue', onMouseEnter: () => setHovered(1), onMouseLeave: reset },
          { value: 15, color: 'indigo', onMouseEnter: () => setHovered(2), onMouseLeave: reset },
        ]}
      />
      <Text>Hovered section: {hovered === -1 ? 'none' : hovered}</Text>
    </>
  );
}
```


## Customize label

You can add any React node as label, for example [Text](https://mantine.dev/core/text/) component with some additional styles
or [ThemeIcon](https://mantine.dev/core/theme-icon/):

#### Example: label

```tsx
import { ActionIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </>
  );
}
```


## Filled segment transition

By default, transitions are disabled, to enable them, set `transitionDuration` prop
to a number of milliseconds:

#### Example: transitions

```tsx
import { useState } from 'react';
import { Button, RingProgress, Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value, color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>Set random value</Button>
    </Stack>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | React.ReactNode | - | Label displayed in the center of the ring |
| rootColor | MantineColor | - | Color of the root section, key of theme.colors or CSS color value |
| roundCaps | boolean | - | Sets whether the edges of the progress circle are rounded |
| sections | RingProgressSection[] | required | Ring sections |
| size | number | - | Width and height of the progress ring |
| thickness | number | - | Ring thickness |
| transitionDuration | number | - | Transition duration of filled section styles changes in ms |


#### Styles API

RingProgress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**RingProgress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-RingProgress-root | Root element |
| svg | .mantine-RingProgress-svg | svg element |
| curve | .mantine-RingProgress-curve | circle element |
| label | .mantine-RingProgress-label | Label element |

**RingProgress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --rp-label-offset | Label offset on the left and right sides of the ring |
| root | --rp-size | Controls `height` and `width` of svg and root elements |
| root | --rp-transition-duration | Controls transition duration of filled segments |


--------------------------------------------------------------------------------

### ScrollArea
Package: @mantine/core
Import: import { ScrollArea } from '@mantine/core';
Description: Area with custom scrollbars

## Usage

`ScrollArea` component supports the following props:

* `type` defines scrollbars behavior:
  * `hover` – scrollbars are visible on hover
  * `scroll` – scrollbars are visible on scroll
  * `auto` – similar to `overflow: auto` – scrollbars are always visible when the content is overflowing
  * `always` – same as `auto`, but scrollbars are always visible regardless of whether the content is overflowing
  * `never` – scrollbars are always hidden
* `offsetScrollbars` – adds padding to offset scrollbars with the following options:
  * `true` – adds padding to offset both scrollbars
  * `x` – adds padding to offset horizontal scrollbar only
  * `y` – adds padding to offset vertical scrollbar only
  * `present` – adds padding only when scrollbars are visible
* `scrollbarSize` – scrollbar size, controls scrollbar and thumb width/height
* `scrollHideDelay` – delay in ms to hide scrollbars, applicable only when type is `hover` or `scroll`
* `overscrollBehavior` – controls [overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) of the viewport

#### Example: usage

```tsx
import { ScrollArea } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea h={250}>
      {/* ... content */}
    </ScrollArea>
  );
}
```


## Horizontal scrollbars

#### Example: horizontal

```tsx
import { ScrollArea, Box } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea w={300} h={200}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
```


## Disable horizontal scrollbars

To disable horizontal scrollbars set `scrollbars="y"` prop:

#### Example: scrollbars

```tsx
import { ScrollArea, Box } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
```


## Subscribe to scroll position changes

Set `onScrollPositionChange` function to subscribe to scroll position changes,
it will be called each time user scrolls with x and y coordinates:

#### Example: scrollPosition

```tsx
import { useState } from 'react';
import { Text, ScrollArea, Code, Box } from '@mantine/core';

function Demo() {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <>
      <ScrollArea
        w={300}
        h={200}
        onScrollPositionChange={onScrollPositionChange}
      >
        <Box w={600}>
          {/* ... content */}
        </Box>
      </ScrollArea>

      <Text>
        Scroll position: <Code>{`{ x: ${scrollPosition.x}, y: ${scrollPosition.y} }`}</Code>
      </Text>
    </>
  );
}
```


## Scroll to position

To programmatically scroll to any position,
get viewport element ref with `viewportRef` prop and call `scrollTo` method:

#### Example: scrollTo

```tsx
import { useRef } from 'react';
import { ScrollArea, Button, Stack, Group } from '@mantine/core';

function Demo() {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        {/* ... content */}
      </ScrollArea>

      <Group justify="center">
        <Button onClick={scrollToBottom}>Scroll to bottom</Button>
        <Button onClick={scrollToCenter}>Scroll to center</Button>
        <Button onClick={scrollToTop}>Scroll to top</Button>
      </Group>
    </Stack>
  );
}
```


## Styles API

#### Example: stylesApi

```tsx
// Demo.tsx
import { ScrollArea, Box } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}

// Demo.module.css
.scrollbar {
  &,
  &:hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  }

  &[data-orientation='vertical'] .thumb {
    background-color: var(--mantine-color-red-6);
  }

  &[data-orientation='horizontal'] .thumb {
    background-color: var(--mantine-color-blue-6);
  }
}

.corner {
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  opacity: 1;
}
```


## Scroll element into view

#### Example: scrollIntoView

```tsx
import { useState, useRef } from 'react';
import { ScrollArea, UnstyledButton, TextInput } from '@mantine/core';

const groceries: string[] = [
  '🍎 Apples',
  '🍌 Bananas',
  '🍊 Oranges',
  '🥛 Milk',
  '🍞 Bread',
  '🥚 Eggs',
  '🍗 Chicken',
  '🥩 Beef',
  '🍝 Pasta',
  '🍚 Rice',
  '🥔 Potatoes',
  '🧅 Onions',
  '🍅 Tomatoes',
  '🥒 Cucumbers',
  '🥕 Carrots',
  '🥬 Lettuce',
  '🍃 Spinach',
  '🥦 Broccoli',
  '🧀 Cheese',
  '🍦 Yogurt',
  '🧈 Butter',
  '🍚 Sugar',
  '🧂 Salt',
  '🌶️ Pepper',
  '☕ Coffee',
  '🍵 Tea',
  '🥤 Juice',
  '💧 Water',
  '🍪 Cookies',
  '🍫 Chocolate',
];

function Demo() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <>
      <TextInput
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setHovered(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex = current + 1 >= filtered.length ? current : current + 1;
              viewportRef.current
                ?.querySelectorAll('[data-list-item]')
                ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
              return nextIndex;
            });
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex = current - 1 < 0 ? current : current - 1;
              viewportRef.current
                ?.querySelectorAll('[data-list-item]')
                ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
              return nextIndex;
            });
          }
        }}
        placeholder="Search groceries"
      />
      <ScrollArea h={150} type="always" mt="md" viewportRef={viewportRef}>
        {items}
      </ScrollArea>
    </>
  );
}
```


## ScrollArea.Autosize

`ScrollArea.Autosize` component allows to create scrollable containers when given max-height is reached.
It also supports a callback for detecting when vertical overflow occurs:

* onOverflowChange – triggered when content exceeds max-height, making the container scrollable or not

#### Example: maxHeight

```tsx
import { useCounter } from '@mantine/hooks';
import { ScrollArea, Button, Group } from '@mantine/core';

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta perspiciatis reiciendis voluptate eaque itaque quos. Natus iure tenetur libero, reprehenderit ad, sequi, in aliquam eos necessitatibus expedita delectus veniam culpa!';

function Demo() {
  const [count, handlers] = useCounter(3, { min: 0, max: 10 });
  const content = Array(count)
    .fill(0)
    .map((_, index) => <p key={index}>{lorem}</p>);

  return (
    <>
      <ScrollArea.Autosize mah={300} maw={400} mx="auto">
        {content}
      </ScrollArea.Autosize>

      <Group justify="center" mt="md">
        <Button color="red" onClick={handlers.decrement}>
          Remove paragraph
        </Button>
        <Button onClick={handlers.increment}>
          Add paragraph
        </Button>
      </Group>
    </>
  );
}
```


## ScrollArea.Autosize with Popover

#### Example: autosizePopover

```tsx
import { useState, useRef } from 'react';
import { ScrollArea, Popover, TextInput, UnstyledButton, Text, Box } from '@mantine/core';

const groceries = [
  'Apples',
  'Bananas',
  'Oranges',
  'Milk',
  'Bread',
  'Eggs',
  'Chicken',
  'Beef',
  'Pasta',
  'Rice',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Cucumbers',
  'Carrots',
  'Lettuce',
  'Spinach',
  'Broccoli',
  'Cheese',
  'Yogurt',
  'Butter',
  'Sugar',
  'Salt',
  'Pepper',
  'Coffee',
  'Tea',
  'Juice',
  'Water',
  'Cookies',
  'Chocolate',
];

function Demo() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <Popover width="target" opened={opened}>
      <Popover.Target>
        <TextInput
          value={query}
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setHovered(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex = current + 1 >= filtered.length ? current : current + 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex = current - 1 < 0 ? current : current - 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }
          }}
          placeholder="Search groceries"
        />
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <ScrollArea.Autosize viewportRef={viewportRef} mah={200} type="always" scrollbars="y">
          <Box px="xs" py={5}>
            {items.length > 0 ? items : <Text c="dimmed">Nothing found</Text>}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| offsetScrollbars | boolean | "x" | "y" | "present" | - | Determines whether scrollbars should be offset with padding on given axis |
| onBottomReached | () => void | - | Called when scrollarea is scrolled all the way to the bottom |
| onScrollPositionChange | (position: { x: number; y: number; }) => void | - | Called with current position (<code>x</code> and <code>y</code> coordinates) when viewport is scrolled |
| onTopReached | () => void | - | Called when scrollarea is scrolled all the way to the top |
| overscrollBehavior | OverscrollBehavior | - | Defines <code>overscroll-behavior</code> of the viewport |
| scrollHideDelay | number | - | Scroll hide delay in ms, applicable only when type is set to <code>hover</code> or <code>scroll</code> |
| scrollbarSize | string | number | - | Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 0.75rem |
| scrollbars | false | "x" | "y" | "xy" | - | Axis at which scrollbars must be rendered |
| type | "auto" | "scroll" | "always" | "hover" | "never" | - | Defines scrollbars behavior, <code>hover</code> by default
- <code>hover</code> – scrollbars are visible when mouse is over the scroll area
- <code>scroll</code> – scrollbars are visible when the scroll area is scrolled
- <code>always</code> – scrollbars are always visible
- <code>never</code> – scrollbars are always hidden
- <code>auto</code> – similar to <code>overflow: auto</code> – scrollbars are always visible when the content is overflowing |
| viewportProps | DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> | - | Props passed down to the viewport element |
| viewportRef | ForwardedRef<HTMLDivElement> | - | Assigns viewport element (scrollable container) ref |


#### Styles API

ScrollArea component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ScrollArea selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ScrollArea-root | Root element |
| content | .mantine-ScrollArea-content | Wraps component children |
| viewport | .mantine-ScrollArea-viewport | Main scrollable area |
| scrollbar | .mantine-ScrollArea-scrollbar | Horizontal or vertical scrollbar root |
| thumb | .mantine-ScrollArea-thumb | Scrollbar thumb |
| corner | .mantine-ScrollArea-corner | Corner between horizontal and vertical scrollbars |

**ScrollArea CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --scrollarea-scrollbar-size | Scrollbar size |


--------------------------------------------------------------------------------

### SegmentedControl
Package: @mantine/core
Import: import { SegmentedControl } from '@mantine/core';
Description: A linear set of two or more segments

## Usage

#### Example: usage

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'ng' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
  );
}
```

## Data prop

`SegmentedControl` support two different data formats:

1. An array of strings – used when `value` and `label` are the same
2. An array of objects – used when `value` and `label` are different

```tsx
import { SegmentedControl } from '@mantine/core';

function ArrayOfStrings() {
  return (
    <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} />
  );
}

function ArrayOfObjects() {
  return (
    <SegmentedControl
      data={[
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Svelte', label: 'Svelte' },
        { value: 'Vue', label: 'Vue' },
      ]}
    />
  );
}
```

## Disabled

To disable `SegmentedControl` item, use array of objects `data` format and set `disabled: true`
on the item that you want to disable. To disable the entire component, use `disabled` prop.

#### Example: disabled

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <Stack align="center">
      <div>
        <Text size="sm" fw={500} mb={3}>
          Disabled control
        </Text>
        <SegmentedControl
          disabled
          data={[
            {
              value: 'preview',
              label: 'Preview',
            },
            {
              value: 'code',
              label: 'Code',
            },
            {
              value: 'export',
              label: 'Export',
            },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={3}>
          Disabled option
        </Text>
        <SegmentedControl
          data={[
            {
              value: 'preview',
              label: 'Preview',
              disabled: true,
            },
            {
              value: 'code',
              label: 'Code',
            },
            {
              value: 'export',
              label: 'Export',
            },
          ]}
        />
      </div>
    </Stack>
  );
}
```


## React node as label

You can use any React node as label:

#### Example: labels

```tsx
import { Center, SegmentedControl } from '@mantine/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-react';

function Demo() {
  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <Center style={{ gap: 10 }}>
              <IconEye size={16} />
              <span>Preview</span>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center style={{ gap: 10 }}>
              <IconCode size={16} />
              <span>Code</span>
            </Center>
          ),
        },
        {
          value: 'export',
          label: (
            <Center style={{ gap: 10 }}>
              <IconExternalLink size={16} />
              <span>Export</span>
            </Center>
          ),
        },
      ]}
    />
  );
}
```


## Color

By default, `SegmentedControl` uses `theme.white` with shadow in light color scheme and `var(--mantine-color-dark-6)` background color for indicator.
Set `color` prop to change indicator `background-color`:

#### Example: configurator

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} />;
}
```


## Transitions

Change transition properties with:

* `transitionDuration` – all transitions duration in ms, `200` by default
* `transitionTimingFunction` – all transitions timing function, `ease` by default

#### Example: transitions

```tsx
import { SegmentedControl, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm" fw={500} mt={3}>
        No transitions
      </Text>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} transitionDuration={0} />

      <Text size="sm" fw={500} mt="md">
        500ms linear transition
      </Text>
      <SegmentedControl
        data={['React', 'Angular', 'Vue', 'Svelte']}
        transitionDuration={500}
        transitionTimingFunction="linear"
      />
    </>
  );
}
```


## readOnly

Set `readOnly` prop to prevent value from being changed:

#### Example: readOnly

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl readOnly defaultValue="Angular" data={['React', 'Angular', 'Vue']} />;
}
```


#### Example: stylesApi

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} />;
}
```


## Accessibility and usability

`SegmentedControl` uses radio inputs under the hood, it is accessible by default with no extra steps required if you have text in labels.
Component support the same keyboard events as a regular radio group.

In case you do not have text in labels (for example, when you want to use `SegmentedControl` with icons only),
use [VisuallyHidden](https://mantine.dev/core/visually-hidden) to make component accessible:

#### Example: iconsOnly

```tsx
import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-react';

function Demo() {
  const iconProps = {
    style: { display: 'block' },
    size: 20,
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <>
              <IconEye {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'code',
          label: (
            <>
              <IconCode {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'export',
          label: (
            <>
              <IconExternalLink {...iconProps} />
              <VisuallyHidden>Export</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, changes color of indicator, by default color is based on current color scheme |
| data | (string | SegmentedControlItem)[] | required | Data based on which controls are rendered |
| defaultValue | string | - | Uncontrolled component default value |
| disabled | boolean | - | Determines whether the component is disabled |
| fullWidth | boolean | - | Determines whether the component should take 100% width of its parent |
| name | string | - | Name of the radio group, by default random name is generated |
| onChange | (value: string) => void | - | Called when value changes |
| orientation | "horizontal" | "vertical" | - | Component orientation |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set to <code>false</code>, prevents changing the value |
| size | MantineSize | (string & {}) | - | Controls <code>font-size</code>, <code>padding</code> and <code>height</code> properties |
| transitionDuration | number | - | Indicator <code>transition-duration</code> in ms, set <code>0</code> to turn off transitions |
| transitionTimingFunction | string | - | Indicator <code>transition-timing-function</code> property |
| value | string | - | Controlled component value |
| withItemsBorders | boolean | - | Determines whether there should be borders between items |


#### Styles API

SegmentedControl component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SegmentedControl selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SegmentedControl-root | Root element |
| control | .mantine-SegmentedControl-control | Wrapper element for input and label |
| input | .mantine-SegmentedControl-input | Input element (`input[type="radio"]`), hidden by default |
| label | .mantine-SegmentedControl-label | Label element associated with input |
| indicator | .mantine-SegmentedControl-indicator | Floating indicator that moves between items |
| innerLabel | .mantine-SegmentedControl-innerLabel | Wrapper of label element children |

**SegmentedControl CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --sc-color | Control `background-color` of `indicator` |
| root | --sc-font-size | Controls `font-size` of labels |
| root | --sc-padding | Controls `padding` of control |
| root | --sc-radius | Controls `border-radius` of `indicator` and `root` elements |
| root | --sc-shadow | Controls `box-shadow` of indicator |

**SegmentedControl data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-full-width | - | - |
| root | data-with-items-border | - | - |
| root | data-disabled | Value of  | - |
| control | data-orientation | - | Value of  |


--------------------------------------------------------------------------------

### Select
Package: @mantine/core
Import: import { Select } from '@mantine/core';
Description: Custom searchable select

<ComboboxDisclaimer component="Select" />

## Usage

`Select` allows capturing user input based on suggestions from the list.
Unlike [Autocomplete](https://mantine.dev/core/autocomplete/), `Select` does not allow entering custom values.

#### Example: usage

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Controlled

`Select` value must be a string, other types are not supported.
`onChange` function is called with a string value as a single argument.

```tsx
import { useState } from 'react';
import { Select } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>('');
  return <Select data={[]} value={value} onChange={setValue} />;
}
```

## onChange handler

`onChange` is called with two arguments:

* `value` - string value of the selected option
* `option` – selected option object

If you prefer object format in state, use second argument of onChange handler:

```tsx
import { useState } from 'react';
import { ComboboxItem, Select } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  return (
    <Select
      data={[{ value: 'react', label: 'React library' }]}
      value={value ? value.value : null}
      onChange={(_value, option) => setValue(option)}
    />
  );
}
```

## autoSelectOnBlur

Set `autoSelectOnBlur` prop to automatically select the highlighted option when the input loses focus.
To see this feature in action: select an option with up/down arrows, then click outside the input:

#### Example: autoSelectOnBlur

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      autoSelectOnBlur
      searchable
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Clearable

Set `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

#### Example: clearable

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue="React"
      clearable
    />
  );
}
```


## Allow deselect

`allowDeselect` prop determines whether the value should be deselected when user clicks on the selected option.
By default, `allowDeselect` is `true`:

#### Example: allowDeselect

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Option can NOT be deselected"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect={false}
      />

      <Select
        label="Option can be deselected"
        description="This is default behavior, click 'React' in the dropdown"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect
        mt="md"
      />
    </>
  );
}
```


## Searchable

Set `searchable` prop to allow filtering options by user input:

#### Example: searchable

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}
```


## Controlled search value

You can control search value with `searchValue` and `onSearchChange` props:

```tsx
import { useState } from 'react';
import { Select } from '@mantine/core';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

## Nothing found

Set the `nothingFoundMessage` prop to display a given message when no options match the search query
or there is no data available. If the `nothingFoundMessage` prop is not set, the `Select` dropdown will be hidden.

#### Example: nothingFound

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
      nothingFoundMessage="Nothing found..."
    />
  );
}
```


## Checked option icon

Set `checkIconPosition` prop to `left` or `right` to control position of check icon in active option.
To remove the check icon, set `withCheckIcon={false}`. To align unchecked labels with the checked one, set `withAlignedLabels` prop.

#### Example: checkIcon

```tsx
import { Select } from '@mantine/core';


function Demo() {
  return (
    <Select
      
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="Control check icon"
      placeholder="Pick value"
      defaultValue="React"
    />
  );
}
```


<ComboboxData component="Select" />

## Data prop

Data that is used in Select must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

<ComboboxFiltering component="Select" />

## Filtering

Select provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

#### Example: search

```tsx
import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <Select
      label="Your country"
      placeholder="Pick value"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
      searchable
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with `filter` function:

#### Example: sort

```tsx
import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
      nothingFoundMessage="Nothing found..."
      searchable
    />
  );
}
```


<ComboboxLargeData component="Select" />

## Large datasets

Select can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

#### Example: limit

```tsx
import { Select } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <Select
      label="100 000 options autocomplete"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
      searchable
    />
  );
}
```


## renderOption

`renderOption` callback allows you to customize option rendering. It is called with option object and
checked state. The function must return a React node.

#### Example: renderOption

```tsx
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconCheck,
} from '@tabler/icons-react';
import { Group, Select, SelectProps } from '@mantine/core';

const iconProps = {
  stroke: 1.5,
  color: 'currentColor',
  opacity: 0.6,
  size: 18,
};

const icons: Record<string, React.ReactNode> = {
  left: <IconAlignLeft {...iconProps} />,
  center: <IconAlignCenter {...iconProps} />,
  right: <IconAlignRight {...iconProps} />,
  justify: <IconAlignJustified {...iconProps} />,
};

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

function Demo() {
  return (
    <Select
      label="Select with renderOption"
      placeholder="Select text align"
      data={[
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
        { value: 'justify', label: 'Justify' },
      ]}
      renderOption={renderSelectOption}
    />
  );
}
```


## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/core/scroll-area).
You can control dropdown max-height with `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change dropdown styles with [Styles API](https://mantine.dev/styles/styles-api).

#### Example: scrollArea

```tsx
import { Select } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <Select
        label="With scroll area (default)"
        placeholder="Pick value"
        data={data}
        maxDropdownHeight={200}
      />

      <Select
        label="With native scroll"
        placeholder="Pick value"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

#### Example: groups

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When option is disabled, it cannot be selected and is ignored in keyboard navigation.

#### Example: disabledOptions

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


<ComboboxProps component="Select" />

## Inside Popover

To use `Select` inside popover, you need to set `withinPortal: false`:

#### Example: withinPopover

```tsx
import { Popover, Button, Select } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Control dropdown opened state

You can control dropdown opened state with `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

#### Example: dropdownOpened

```tsx
import { Select, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <Select
        label="Your favorite library"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/core/popover) component.

Example of dropdown that is always displayed above the input:

#### Example: dropdownPosition

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is equal to the input width.

#### Example: dropdownWidth

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
```


## Dropdown offset

To change dropdown offset, set `offset` prop in `comboboxProps`:

#### Example: dropdownOffset

```tsx
// Demo.tsx
import { Select } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      classNames={classes}
      comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false }, offset: 0 }}
    />
  );
}

// Demo.module.css
.dropdown {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
  border-top: 0;
}

.input {
  transition: none;

  &[data-expanded] {
    border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
```


## Prevent horizontal infinite scrolling

If you experience horizontal infinite scrolling in the dropdown, set the `shift` middleware `padding` to `0`:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      data={['React', 'Angular', 'Vue']}
      comboboxProps={{
        middlewares: {
          shift: { padding: 0 }
        }
      }}
    />
  );
}
```

## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/core/transition) component.

#### Example: dropdownAnimation

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown padding

#### Example: dropdownPadding

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Zero padding"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Select
        mt="md"
        label="10px padding"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

#### Example: dropdownShadow

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


<InputSections component="Select" />

## Input sections

Select supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { Select } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

function Demo() {
  const icon = <IconComponents size={16} />;
  return (
    <>
      <Select
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <Select
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
    </>
  );
}
```


## Input props

<InputFeatures component="Select" element="input" />

Select component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. Select documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { Select } from '@mantine/core';


function Demo() {
  return (
    <Select
      
      placeholder="Select placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`Select` will not show suggestions and will not call `onChange` function.

#### Example: readOnly

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      readOnly
    />
  );
}
```


## Disabled

Set `disabled` to disable the input. When `disabled` is set,
user cannot interact with the input and `Select` will not show suggestions.

#### Example: disabled

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
```


## Error state

#### Example: error

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Boolean error"
        placeholder="Boolean error"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
     
      leftSection={<IconAt size={18} stroke={1.5} />}
      label="Select"
      description="Description"
      error="Error"
      placeholder="Select"
      data={['React', 'Angular']}
    />
  );
}
```


<GetElementRef component="Select" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Select } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Select ref={ref} />;
}
```

<InputAccessibility component="Select" />

## Accessibility

Select provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.

To set `aria-label` on the clear button, use `clearButtonProps`. Note that it is required
only when `clearable` is set.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      data={[]}
      clearable
      clearButtonProps={{
        'aria-label': 'Clear input',
      }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | If set, it becomes possible to deselect value by clicking on the selected option |
| autoSelectOnBlur | boolean | - | If set, the highlighted option is selected when the input loses focus |
| checkIconPosition | "left" | "right" | - | Position of the check icon relative to the option label |
| chevronColor | MantineColor | - | Controls color of the default chevron, by default depends on the color scheme |
| clearButtonProps | InputClearButtonProps | - | Props passed down to the clear button |
| clearable | boolean | - | If set, the clear button is displayed in the right section when the component has value |
| comboboxProps | ComboboxProps | - | Props passed down to <code>Combobox</code> component |
| data | ComboboxData | - | Data used to generate options. Values must be unique, otherwise an error will be thrown and component will not render. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultSearchValue | string | - | Default search value |
| defaultValue | string | null | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| filter | OptionsFilter | - | Function based on which items are filtered and sorted |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| limit | number | - | Maximum number of options displayed at a time, <code>Infinity</code> by default |
| maxDropdownHeight | string | number | - | <code>max-height</code> of the dropdown, only applicable when <code>withScrollArea</code> prop is <code>true</code>, <code>250</code> by default |
| nothingFoundMessage | React.ReactNode | - | Message displayed when no option matches the current search query when the <code>searchable</code> prop is set or there is no data |
| onChange | (value: string | null, option: ComboboxItem) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: string) => void | - | Called when option is submitted from dropdown with mouse click or <code>Enter</code> key |
| onSearchChange | (value: string) => void | - | Called when search changes |
| openOnFocus | boolean | - | If set, the dropdown opens when the input receives focus |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| renderOption | (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => ReactNode | - | A function to render content of the option, replaces the default content of the option |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed down to the underlying <code>ScrollArea</code> component in the dropdown |
| searchValue | string | - | Controlled search value |
| searchable | boolean | - | Determines whether the select should be searchable |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, <code>false</code> by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, <code>false</code> by default |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| value | string | null | - | Controlled component value |
| withAlignedLabels | boolean | - | If set, unchecked labels are aligned with the checked one |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCheckIcon | boolean | - | If set, the check icon is displayed near the selected option label |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with <code>ScrollArea.AutoSize</code>, <code>true</code> by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

Select component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Select selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Select-wrapper | Root element of the Input |
| input | .mantine-Select-input | Input element |
| section | .mantine-Select-section | Left and right sections |
| root | .mantine-Select-root | Root element |
| label | .mantine-Select-label | Label element |
| required | .mantine-Select-required | Required asterisk element, rendered inside label |
| description | .mantine-Select-description | Description element |
| error | .mantine-Select-error | Error element |

**Select data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### SemiCircleProgress
Package: @mantine/core
Import: import { SemiCircleProgress } from '@mantine/core';
Description: Represent progress with semi circle diagram

## Usage

#### Example: usage

```tsx
import { SemiCircleProgress } from '@mantine/core';


function Demo() {
  return (
    <SemiCircleProgress
      
      label="Label"
    />
  );
}
```


## Change empty segment color

Use `emptySegmentColor` prop to change color of empty segment,
it accepts key of `theme.colors` or any valid CSS color value:

#### Example: emptySegmentColor

```tsx
import { SemiCircleProgress } from '@mantine/core';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}
```


## Change label position

By default, the label is displayed at the bottom of the component,
you can change its position to `center` by using `labelPosition` prop:

#### Example: labelPosition

```tsx
import { SemiCircleProgress } from '@mantine/core';

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="Bottom" mb="xl" />
      <SemiCircleProgress value={30} label="Center" labelPosition="center" />
    </>
  );
}
```


## Filled segment transition

By default, transitions are disabled, to enable them, set `transitionDuration` prop
to a number of milliseconds:

#### Example: transitions

```tsx
import { useState } from 'react';
import { Button, SemiCircleProgress } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <>
      <SemiCircleProgress value={value} transitionDuration={250} label={`${value}%`} />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))} mt="xl" fullWidth>
        Set random value
      </Button>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| emptySegmentColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color value, by default the value is determined based on the color scheme value |
| fillDirection | "right-to-left" | "left-to-right" | - | Direction from which the circle is filled |
| filledSegmentColor | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color value |
| label | React.ReactNode | - | Label rendered inside the circle |
| labelPosition | "center" | "bottom" | - | Label position relative to the circle center |
| orientation | "up" | "down" | - | Orientation of the circle |
| size | number | - | Diameter of the svg in px |
| thickness | number | - | Circle thickness in px |
| transitionDuration | number | - | Transition duration of filled section styles changes in ms |
| value | number | required | Progress value from <code>0</code> to <code>100</code> |


#### Styles API

SemiCircleProgress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SemiCircleProgress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SemiCircleProgress-root | Root element |
| svg | .mantine-SemiCircleProgress-svg | Root svg element |
| emptySegment | .mantine-SemiCircleProgress-emptySegment | Empty circle segment |
| filledSegment | .mantine-SemiCircleProgress-filledSegment | Filled circle segment |
| label | .mantine-SemiCircleProgress-label | Label element |

**SemiCircleProgress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --scp-empty-segment-color | Color of the empty segment |
| root | --scp-filled-segment-color | Color of the filled segment |
| root | --scp-thickness | Controls `strokeWidth` of the circle |
| root | --scp-transition-duration | Controls transition duration of the filled segment |

**SemiCircleProgress data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-position | - | Value of  |


--------------------------------------------------------------------------------

### SimpleGrid
Package: @mantine/core
Import: import { SimpleGrid } from '@mantine/core';
Description: Responsive grid in which each item takes equal amount of space

## Usage

`SimpleGrid` is a responsive grid system with equal-width columns.
It uses CSS grid layout. If you need to set different widths for columns, use
[Grid](https://mantine.dev/core/grid) component instead.

#### Example: usage

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  )
}
```


## spacing and verticalSpacing props

`spacing` prop is used both for horizontal and vertical spacing if `verticalSpacing` is not set:

```tsx
import { SimpleGrid } from '@mantine/core';

// `spacing` is used for both horizontal and vertical spacing
const Spacing = () => <SimpleGrid spacing="xl" />;

// `spacing` is used for horizontal spacing, `verticalSpacing` for vertical
const VerticalSpacing = () => (
  <SimpleGrid spacing="xl" verticalSpacing="lg" />
);
```

## Responsive props

`cols`, `spacing` and `verticalSpacing` props support object notation for responsive values,
it works the same way as [style props](https://mantine.dev/styles/style-props): the object may have `base`, `xs`,
`sm`, `md`, `lg` and `xl` key, and values from those keys will be applied according to current
viewport width.

In the following example, `cols={{ base: 1, sm: 2, lg: 5 }}` means:

* 1 column if viewport width is less than `sm` breakpoint
* 2 columns if viewport width is between `sm` and `lg` breakpoints
* 5 columns if viewport width is greater than `lg` breakpoint

Same logic applies to `spacing` and `verticalSpacing` props.

#### Example: responsive

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, grid columns and spacing
will be adjusted based on the container width, not the viewport width.

Note that, when using container queries, `cols`, `spacing` and `verticalSpacing` props cannot
reference `theme.breakpoints` values in keys. It is required to use exact px or em values.

To see how the grid changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

#### Example: container

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // it is not required in real projects
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '300px': 2, '500px': 5 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </SimpleGrid>
    </div>
  );
}
```


## Browser support

`SimpleGrid` uses [CSS Grid Layout](https://caniuse.com/css-grid), it is supported in all modern browsers.
If you need to support older browsers, use [Grid](https://mantine.dev/core/grid) (flexbox based) component instead.

When `type="container"` is set, `SimpleGrid` uses [container queries](https://caniuse.com/css-container-queries).
Since February 2023, container queries are supported in all modern browsers. If you need to support older browsers,
do not use container queries option.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cols | StyleProp<number> | - | Number of columns |
| spacing | StyleProp<MantineSpacing> | - | Spacing between columns |
| type | "media" | "container" | - | Determines typeof of queries that are used for responsive styles |
| verticalSpacing | StyleProp<MantineSpacing> | - | Spacing between rows |


#### Styles API

SimpleGrid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SimpleGrid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SimpleGrid-root | Root element |
| container | .mantine-SimpleGrid-container | Container element, available only when `type="container"` is set |


--------------------------------------------------------------------------------

### Skeleton
Package: @mantine/core
Import: import { Skeleton } from '@mantine/core';
Description: Indicate content loading state

## Usage

Use `Skeleton` to create a placeholder for loading content. `Skeleton` support the following props:

* `height` – height – any valid CSS value
* `width` – width - any valid CSS value
* `radius` – key of `theme.radius` or any valid CSS value to set border-radius
* `circle` – if true width, height and border-radius will equal to value specified in `height` prop
* `animate` – true by default, controls animation

#### Example: configurator

```tsx
import { Skeleton } from '@mantine/core';

  function Demo() {
    return (
      <>
        <Skeleton'} height={50} circle mb="xl" />
        <Skeleton'} height={8} radius="xl" />
        <Skeleton'} height={8} mt={6} radius="xl" />
        <Skeleton${
          props.animate ? '' : ' animate={false}'
        } height={8} mt={6} width="70%" radius="xl" />
      </>
    );
  }
```


## With content

If you want to indicate the loading state of content that is already on page, wrap it with Skeleton
and control loading overlay visibility with `visible` prop:

#### Example: content

```tsx
import { useState } from 'react';
import { Skeleton, Button } from '@mantine/core';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton visible={loading}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>

      <Button onClick={() => setLoading((l) => !l)}>
        Toggle Skeleton
      </Button>
    </>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animate | boolean | - | Enables animation |
| circle | boolean | - | If set, Skeleton <code>width</code> and <code>border-radius</code> are equal to its <code>height</code> |
| height | Height<string | number> | - | Skeleton <code>height</code>, numbers are converted to rem |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| visible | boolean | - | Determines whether Skeleton overlay should be displayed |
| width | React.CSSProperties["width"] | - | Skeleton <code>width</code>, numbers are converted to rem, ignored when <code>circle</code> prop is set. |


#### Styles API

Skeleton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Skeleton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Skeleton-root | Root element |

**Skeleton CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --skeleton-height | Controls skeleton `height` |
| root | --skeleton-width | Controls skeleton `width` |
| root | --skeleton-radius | Controls skeleton `border-radius` |

**Skeleton data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-visible | - | - |
| root | data-animate | - | - |


--------------------------------------------------------------------------------

### Slider
Package: @mantine/core
Import: import { Slider } from '@mantine/core';
Description: Slider component

## Usage

#### Example: configurator

```tsx
import { Slider } from '@mantine/core';


function Demo() {
  return (
    <Slider
      
      defaultValue={40}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Slider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(40);
  return <Slider value={value} onChange={setValue} />;
}
```

## Disabled

#### Example: disabled

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider defaultValue={60} disabled />;
}
```


## onChangeEnd

`onChangeEnd` callback is called when user the slider is stopped from being dragged or value is changed with keyboard.
You can use it as a debounced callback to avoid too frequent updates.

#### Example: changeEnd

```tsx
import { useState } from 'react';
import { Slider, Text, Box } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  return (
    <Box maw={400} mx="auto">
      <Slider value={value} onChange={setValue} onChangeEnd={setEndValue} />

      <Text mt="md" size="sm">
        onChange value: <b>{value}</b>
      </Text>
      <Text mt={5} size="sm">
        onChangeEnd value: <b>{endValue}</b>
      </Text>
    </Box>
  );
}
```


## Control label

To change label behavior and appearance, set the following props:

* `label` – formatter function, accepts value as an argument, set null to disable label, defaults to `f => f`
* `labelAlwaysOn` – if true – label will always be displayed, by default label is visible only when user is dragging
* `labelTransitionProps` – props passed down to the [Transition](https://mantine.dev/core/transition) component, can be used to customize label animation

#### Example: label

```tsx
import { Slider, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <Slider defaultValue={40} label={null} />

      <Text size="sm" mt="xl">Formatted label</Text>
      <Slider defaultValue={40} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">Label always visible</Text>
      <Slider defaultValue={40} labelAlwaysOn />

      <Text size="sm" mt="xl">Custom label transition</Text>
      <Slider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
}
```


## Min, max and step

#### Example: step

```tsx
import { Slider, Text } from '@mantine/core';

const marks = [
  { value: 0, label: 'xs' },
  { value: 25, label: 'sm' },
  { value: 50, label: 'md' },
  { value: 75, label: 'lg' },
  { value: 100, label: 'xl' },
];

function Demo() {
  return (
    <>
      <Text>Decimal step</Text>
      <Slider
        defaultValue={0}
        min={-10}
        max={10}
        label={(value) => value.toFixed(1)}
        step={0.1}
        styles={{ markLabel: { display: 'none' } }}
      />

      <Text mt="md">Step matched with marks</Text>
      <Slider
        defaultValue={50}
        label={(val) => marks.find((mark) => mark.value === val)!.label}
        step={25}
        marks={marks}
        styles={{ markLabel: { display: 'none' } }}
      />
    </>
  );
}
```


## Domain

By default, `min` and `max` values define the possible range of values.
`domain` prop allows setting the possible range of values independently of the
`min` and `max` values:

#### Example: domain

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={25}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}
```


## Decimal values

To use `Slider` with decimal values, set `min`, `max` and `step` props:

#### Example: decimal

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />;
}
```


## Marks

Add any number of marks to slider by setting `marks` prop to an array of objects:

```tsx
const marks = [
  { value: 20 }, // -> displays mark on slider track
  { value: 40, label: '40%' }, // -> adds mark label below slider track
];
```

Note that mark value is relative to slider value, not width:

#### Example: marks

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Slider defaultValue={40} marks={[{ value: 10 }, { value: 40 }, { value: 95 }]} mb={32} />
      <Slider
        mb={32}
        defaultValue={40}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </>
  );
}
```


## Restrict selection to marks

Set `restrictToMarks` prop to restrict slider value to marks only. Note that in
this case `step` prop is ignored:

#### Example: restrictToMarks

```tsx
import { RangeSlider, Slider, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Slider
        restrictToMarks
        defaultValue={25}
        marks={Array.from({ length: 5 }).map((_, index) => ({ value: index * 25 }))}
      />

      <RangeSlider
        restrictToMarks
        defaultValue={[5, 15]}
        marks={[
          { value: 5 },
          { value: 15 },
          { value: 25 },
          { value: 35 },
          { value: 70 },
          { value: 80 },
          { value: 90 },
        ]}
      />
    </Stack>
  );
}
```


## Thumb size

#### Example: thumbSize

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider defaultValue={20} />;
}
```


## Thumb children

#### Example: thumbChildren

```tsx
import { Slider, RangeSlider } from '@mantine/core';
import { IconHeart, IconHeartBroken } from '@tabler/icons-react';

function Demo() {
  return (
    <>
      <Slider
        thumbChildren={<IconHeart size={16} />}
        color="red"
        label={null}
        defaultValue={40}
        thumbSize={26}
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
      />

      <RangeSlider
        mt="xl"
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
        color="red"
        label={null}
        defaultValue={[20, 60]}
        thumbSize={26}
        thumbChildren={[<IconHeart size={16} key="1" />, <IconHeartBroken size={16} key="2" />]}
      />
    </>
  );
}
```


## Scale

You can use the `scale` prop to represent the value on a different scale.

In the following demo, the value `x` represents the value `2^x`. Increasing `x` by one increases the represented value by 2 to the power of `x`.

#### Example: scale

```tsx
import { RangeSlider, Slider } from '@mantine/core';

function valueLabelFormat(value: number) {
  const units = ['KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

const getScale = (v: number) => 2 ** v;

function Demo() {
  return (
    <>
      <Slider
        scale={getScale}
        step={1}
        min={2}
        max={30}
        labelAlwaysOn
        defaultValue={10}
        label={valueLabelFormat}
      />
      <RangeSlider
        mt={50}
        scale={getScale}
        step={1}
        min={2}
        max={30}
        labelAlwaysOn
        defaultValue={[10, 20]}
        label={valueLabelFormat}
      />
    </>
  );
}
```


## Inverted

You can invert the track with the `inverted` prop:

#### Example: inverted

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider inverted defaultValue={80} />;
}
```


#### Example: stylesApi

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider marks={[{ value: 20, label: '20%' }, { value: 80, label: '80%' }]} labelAlwaysOn />;
}
```


Example of using [Styles API](https://mantine.dev/styles/styles-api/) to change `Slider` styles:

#### Example: customize

```tsx
// Demo.tsx
import { Slider } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Slider
      defaultValue={40}
      size={2}
      classNames={classes}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}

// Demo.module.css
.track {
  &::before {
    background-color: light-dark(var(--mantine-color-blue-1), var(--mantine-color-dark-3));
  }
}

.mark {
  width: 6px;
  height: 6px;
  border-radius: 6px;
  transform: translateX(-3px) translateY(-2px);
  border-color: light-dark(var(--mantine-color-blue-1), var(--mantine-color-dark-3));

  &[data-filled] {
    border-color: var(--mantine-color-blue-6);
  }
}

.markLabel {
  font-size: var(--mantine-font-size-xs);
  margin-bottom: 5px;
  margin-top: 0;
}

.thumb {
  height: 16px;
  width: 16px;
  background-color: var(--mantine-color-white);
  border-width: 1px;
  box-shadow: var(--mantine-shadow-sm);
}
```


## Vertical slider

`Slider` does not provide vertical orientation as it is very rarely used.
If you need this feature you can build it yourself with [use-move](https://mantine.dev/hooks/use-move/) hook.

## Build custom slider

If `Slider` component does not meet your requirements, you can build a custom slider with [use-move](https://mantine.dev/hooks/use-move/) hook:

#### Example: customSlider

```tsx
// Demo.tsx
import { useState } from 'react';
import { IconGripVertical } from '@tabler/icons-react';
import { clamp, useMove } from '@mantine/hooks';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState(0.3);
  const { ref } = useMove(({ x }) => setValue(clamp(x, 0.1, 0.9)));
  const labelFloating = value < 0.2 || value > 0.8;

  return (
    <div className={classes.root}>
      <div className={classes.track} ref={ref}>
        <div
          className={classes.filled}
          style={{
            width: `calc(${value * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined} data-filled>
            {(value * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.empty}
          style={{
            width: `calc(${(1 - value) * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined}>
            {((1 - value) * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.thumb}
          style={{ left: `calc(${value * 100}% - var(--thumb-width) / 2)` }}
        >
          <IconGripVertical stroke={1.5} />
        </div>
      </div>
    </div>
  );
}

// Demo.module.css
.root {
  padding-top: 20px;
}

.track {
  --thumb-width: 20px;
  --thumb-offset: 10px;

  position: relative;
  height: 60px;
  display: flex;
}

.filled {
  height: 100%;
  margin-right: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-blue-filled);
  display: flex;
  align-items: center;
  padding-inline: 10px;
}

.empty {
  height: 100%;
  margin-left: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-gray-1);
  display: flex;
  align-items: center;
  padding-inline: 10px;
  justify-content: flex-end;

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
  }
}

.thumb {
  position: absolute;
  background-color: var(--mantine-color-white);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-md);
  height: 100%;
  width: var(--thumb-width);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mantine-color-gray-5);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
    color: var(--mantine-color-dark-0);
  }
}

.label {
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  transition:
    transform 100ms ease,
    color 100ms ease;

  &[data-filled] {
    color: var(--mantine-color-white);
  }

  &[data-floating] {
    transform: translateY(-44px) translateX(-10px);
    color: var(--mantine-color-black);

    &:not([data-filled]) {
      transform: translateY(-44px) translateX(10px);
    }

    @mixin dark {
      color: var(--mantine-color-white);
    }
  }
}
```


## Accessibility

`Slider` component is accessible by default:

* Thumbs are focusable
* When the user uses mouse to interact with the slider, focus is moved to the slider track, when the user presses arrows focus is moved to the thumb
* Value can be changed with arrows with step increment/decrement

To label component for screen readers, add labels to thumbs:

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider thumbLabel="Thumb aria-label" />;
}
```

## Keyboard interactions


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, controls color of track and thumb |
| defaultValue | number | - | Uncontrolled component default value |
| disabled | boolean | - | Disables slider |
| domain | [number, number] | - | Domain of the slider, defines the full range of possible values |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| inverted | boolean | - | Determines whether track value representation should be inverted |
| label | ReactNode | ((value: number) => ReactNode) | - | Function to generate label or any react node to render instead, set to null to disable label |
| labelAlwaysOn | boolean | - | Determines whether the label should be visible when the slider is not being dragged or hovered |
| labelTransitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component |
| marks | { value: number; label?: ReactNode; }[] | - | Marks displayed on the track |
| max | number | - | Maximum possible value |
| min | number | - | Minimal possible value |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: number) => void | - | Called when value changes |
| onChangeEnd | (value: number) => void | - | Called when user stops dragging slider or changes value with arrows |
| precision | number | - | Number of significant digits after the decimal point |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| restrictToMarks | boolean | - | Determines whether the selection should be only allowed from the given marks array |
| scale | (value: number) => number | - | A transformation function to change the scale of the slider |
| showLabelOnHover | boolean | - | Determines whether the label should be displayed when the slider is hovered |
| size | number | MantineSize | (string & {}) | - | Controls size of the track |
| step | number | - | Number by which value will be incremented/decremented with thumb drag and arrows |
| thumbChildren | React.ReactNode | - | Content rendered inside thumb |
| thumbLabel | string | - | Thumb <code>aria-label</code> |
| thumbProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to thumb element |
| thumbSize | string | number | - | Thumb <code>width</code> and <code>height</code>, by default value is computed based on <code>size</code> prop |
| value | number | - | Controlled component value |


#### Styles API

Slider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Slider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Slider-root | Root element |
| label | .mantine-Slider-label | Thumb label |
| thumb | .mantine-Slider-thumb | Thumb element |
| trackContainer | .mantine-Slider-trackContainer | Wraps track element |
| track | .mantine-Slider-track | Slider track |
| bar | .mantine-Slider-bar | Track filled part |
| markWrapper | .mantine-Slider-markWrapper | Contains `mark` and `markLabel` elements |
| mark | .mantine-Slider-mark | Mark displayed on track |
| markLabel | .mantine-Slider-markLabel | Label of the associated mark, displayed below track |

**Slider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --slider-size | Controls track `height` |
| root | --slider-color | Controls filled track, thumb and marks `background` |
| root | --slider-thumb-size | Controls thumb `width` and `height` |
| root | --slider-radius | Controls `border-radius` of track and thumb |


--------------------------------------------------------------------------------

### Space
Package: @mantine/core
Import: import { Space } from '@mantine/core';
Description: Add horizontal or vertical spacing from theme

## Usage

Use `Space` component to add horizontal or vertical spacing between elements:

#### Example: horizontal

```tsx
import { Text, Space } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>First line</Text>
      <Space />
      <Text>Second line</Text>
    </>
  );
}
```


<br />

#### Example: vertical

```tsx
import { Text, Space } from '@mantine/core';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <Text>First line</Text>
      <Space />
      <Text>Second line</Text>
    </div>
  );
}
```


## Where to use

In most cases, you would want to use margin props instead of `Space` when working with Mantine components:

```tsx
import { Space, Text } from '@mantine/core';

// Space is not required as the same can be achieved with `mt` prop
function Demo() {
  return (
    <>
      <Text>First line</Text>
      <Text mt="md">Second line</Text>
    </>
  );
}
```

But when you work with regular HTML elements you do not have access to `theme.spacing` and you may want to use
`Space` component to skip direct theme subscription:

```tsx
import { Space } from '@mantine/core';

// Margin props are not available on div,
// use Space to add spacing from theme
function Demo() {
  return (
    <>
      <div>First line</div>
      <Space h="md" />
      <div>Second line</div>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|


--------------------------------------------------------------------------------

### Spoiler
Package: @mantine/core
Import: import { Spoiler } from '@mantine/core';
Description: Hide long sections of content under a spoiler

## Usage

Use `Spoiler` to hide long section of content.
Set `maxHeight` prop to control point at which content will be hidden under spoiler and show/hide control appears.
If the content height is less than `maxHeight`, the spoiler will just render children.

`hideLabel` and `showLabel` props are required – they are used as spoiler toggle button label in corresponding state.

#### Example: usage

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
      {/* Content here */}
    </Spoiler>
  );
}
```


## Control expanded state

To control expanded state use `expanded` and `onExpandedChange` props. Note that
`expanded` prop does not have any effect on spoiler visuals if the content height
is less than given `maxHeight`.

```tsx
import { useState } from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Spoiler
      showLabel="Show more"
      hideLabel="Hide details"
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

## Subscribe to expanded state changes

Use `onExpandedChange` to subscribe to expanded state changes:

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler
      showLabel="Show more"
      hideLabel="Hide details"
      onExpandedChange={(expanded) => console.log(expanded)}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

## Transition duration

Control transition duration by setting `transitionDuration` prop (transition-duration CSS property in ms).
To disable animations, set `transitionDuration={0}`:

#### Example: transitions

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
      {/* Content here */}
    </Spoiler>
  );
}
```


## Get control ref

```tsx
import { useRef } from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  const spoilerControlRef = useRef<HTMLButtonElement>(null);
  return (
    <Spoiler
      controlRef={spoilerControlRef}
      hideLabel="Hide"
      showLabel="Show"
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| controlRef | ForwardedRef<HTMLButtonElement> | - | Get ref of spoiler toggle button |
| expanded | boolean | - | Controlled expanded state value |
| hideLabel | React.ReactNode | required | Label for close spoiler action |
| initialState | boolean | - | Initial spoiler state, <code>true</code> to wrap content in spoiler, <code>false</code> to show content without spoiler, opened state is updated on mount |
| maxHeight | number | - | Maximum height of the visible content, when this point is reached spoiler appears |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes (when spoiler visibility is toggled by the user) |
| showLabel | React.ReactNode | required | Label for open spoiler action |
| transitionDuration | number | - | Spoiler reveal transition duration in ms, set 0 or null to turn off animation |


#### Styles API

Spoiler component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Spoiler selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Spoiler-root | Root element |
| content | .mantine-Spoiler-content | Wraps content to set max-height and transition |
| control | .mantine-Spoiler-control | Show/hide content control |

**Spoiler CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --spoiler-transition-duration | Controls transition duration |

**Spoiler data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-has-spoiler | Whether the control button is shown or not | - |


--------------------------------------------------------------------------------

### Stack
Package: @mantine/core
Import: import { Stack } from '@mantine/core';
Description: Compose elements and components in a vertical flex container

## Usage

`Stack` is a vertical flex container. If you need a horizontal flex container, use [Group](https://mantine.dev/core/group)
component instead. If you need to have full control over flex container properties, use [Flex](https://mantine.dev/core/flex) component.

#### Example: configurator

```tsx
import { Stack, Button } from '@mantine/core';

function Demo() {
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      
    >
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}
```


<FlexboxGapSupport component="Stack" />

## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Controls <code>align-items</code> CSS property |
| gap | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set <code>gap</code> property, numbers are converted to rem |
| justify | JustifyContent | - | Controls <code>justify-content</code> CSS property |


#### Styles API

Stack component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Stack selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Stack-root | Root element |

**Stack CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --stack-align | Controls `align-items` property |
| root | --stack-justify | Controls `justify-content` property |
| root | --stack-gap | Controls `gap` property |


--------------------------------------------------------------------------------

### Stepper
Package: @mantine/core
Import: import { Stepper } from '@mantine/core';
Description: Display content divided into a steps sequence

## Usage

#### Example: usage

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
```


## Allow step select

To disable step selection, set `allowStepSelect` prop on `Stepper.Step` component.
It can be used to prevent the user from reaching next steps while letting them go back and forth between steps they've already reached before:

#### Example: allowStepSelect

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="First step"
          description="Create an account"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Verify email"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          Step 3 content: Get full access
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </>
  );
}
```


## Disable next steps selection

Another way to disable selection of upcoming steps is to use the `allowNextStepsSelect` directly on the `Stepper` component.
This is useful when you don't need to control the behavior specifically for each step.

#### Example: allowNextStepsSelect

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
```


## Color, radius and size

#### Example: configurator

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}
```


Component size is controlled by two props: `size` and `iconSize`.
`size` prop controls icon size, label and description font size.
`iconSize` allows to overwrite icon size separately from other size values:

#### Example: iconSizeConfigurator

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}
```


## With custom icons

You can replace the step icon by setting `icon` prop on `Stepper.Step` component.
To change completed check icon set `completedIcon` on `Stepper` component.
You can use any React node as an icon: component, string, number:

#### Example: icons

```tsx
import { useState } from 'react';
import {
  IconUserCheck,
  IconMailOpened,
  IconShieldCheck,
  IconCircleCheck,
} from '@tabler/icons-react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      completedIcon={<IconCircleCheck size={18} />}
    >
      <Stepper.Step
        icon={<IconUserCheck size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<IconMailOpened size={18} />}
        label="Step 2"
        description="Verify email"
      />
      <Stepper.Step
        icon={<IconShieldCheck size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}
```


You can use `Stepper` with icons only. Note that in this case, you will have to
set `aria-label` or `title` on `Stepper.Step` component to make it accessible:

#### Example: iconsOnly

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-react';

function Demo() {
  const [active, setActive] = useState(0);

  return (
    <Stepper active={active} onStepClick={setActive}>
      <Stepper.Step icon={<IconUserCheck size={18} />} />
      <Stepper.Step icon={<IconMailOpened size={18} />} />
      <Stepper.Step icon={<IconShieldCheck size={18} />} />
    </Stepper>
  );
}
```


You can also change the completed icon for each step, for example, to indicate error state:

#### Example: stepColor

```tsx
import { Stepper } from '@mantine/core';
import { IconCircleX } from '@tabler/icons-react';

function Demo() {
  return (
    <Stepper active={2}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step
        label="Step 2"
        description="Verify email"
        color="red"
        completedIcon={<IconCircleX size={20} />}
      />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Vertical orientation

#### Example: orientation

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} orientation="vertical">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Icon position

To change step icon and body arrangement, set `iconPosition="right"`:

#### Example: iconPosition

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} iconPosition="right">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Loading state

To indicate loading state set `loading` prop on Step component, `Loader` will replace step icon.
You can configure the default loader in the [theme](https://mantine.dev/theming/theme-object/).

#### Example: loading

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" loading />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


#### Example: stylesApi

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account" loading>
          <Content>Step 1 content: Create an account</Content>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <Content>Step 2 content: Verify email</Content>
        </Stepper.Step>

        <Stepper.Completed>
          <Content>Completed, click back button to get to previous step</Content>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
```


Examples of styles customization with Styles API:

#### Example: stylesApi2

```tsx
import { useState } from 'react';
import { Stepper, StepperProps } from '@mantine/core';

function StyledStepper(props: StepperProps) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: 4,
        },

        separator: {
          marginLeft: -2,
          marginRight: -2,
          height: 10,
        },
      }}
      {...props}
    />
  );
}

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <StyledStepper active={active} onStepClick={setActive}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </StyledStepper>
  );
}
```


<br />

#### Example: stylesApi3

```tsx
// Demo.tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper classNames={classes} active={active} onStepClick={setActive}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}

// Demo.module.css
.separator {
  height: 2px;
  border-top: 2px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3));
  border-radius: var(--mantine-radius-xl);
  background-color: transparent;

  &[data-active] {
    border-width: 0;
    background-image: linear-gradient(
      45deg,
      var(--mantine-color-blue-6),
      var(--mantine-color-cyan-6)
    );
  }
}

.stepIcon {
  border-color: transparent;
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-4));
  border-width: 0;

  &[data-completed] {
    border-width: 0;
    background-color: transparent;
    background-image: linear-gradient(
      45deg,
      var(--mantine-color-blue-6),
      var(--mantine-color-cyan-6)
    );
  }
}

.step {
  transition: transform 150ms ease;

  &[data-progress] {
    transform: scale(1.05);
  }
}
```


## Get step ref

You can get refs of step button and stepper root element (div):

```tsx
import { useRef } from 'react';
import { Stepper } from '@mantine/core';

function MyStepper() {
  const firstStep = useRef<HTMLButtonElement>(null);
  const stepper = useRef<HTMLDivElement>(null);

  return (
    <Stepper ref={stepper} active={0}>
      <Stepper.Step label="First step" ref={firstStep} />
      <Stepper.Step label="Second step" />
    </Stepper>
  );
}
```

## Wrap Stepper.Step

`Stepper` component relies on `Stepper.Step` order. Wrapping `Stepper.Step` is not supported,
Instead you will need to use different approaches:

```tsx
import { Stepper } from '@mantine/core';

// This will not work, step children will not render
function WillNotWork() {
  return (
    <Stepper.Step label="Nope" description="It will not work">
      This part will not render
    </Stepper.Step>
  );
}

// Create a separate component for children
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="Regular step">First step</Stepper.Step>
      {/* Wrapped Stepper.Step will not render children, do not do that */}
      <WillNotWork />
      <Stepper.Step label="Step with custom content">
        <WillWork />
      </Stepper.Step>
      <Stepper.Step label="Regular step">Third step</Stepper.Step>
    </Stepper>
  );
}
```

## Accessibility

`<Stepper.Step />` components render button element, set `aria-label` or `title` props
to make component visible for screen readers in case you do not specify `label` or `description`:

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper active={0}>
      {/* Not ok, no label for screen reader */}
      <Stepper.Step />

      {/* Ok, label and description */}
      <Stepper.Step label="Step 1" description="Create an account" />

      {/* Ok, aria-label */}
      <Stepper.Step aria-label="Create an account" />
    </Stepper>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | number | required | Index of the active step |
| allowNextStepsSelect | boolean | - | If set, next steps can be selected |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | required | <code>Stepper.Step</code> components |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, controls colors of active and progress steps |
| completedIcon | ReactNode | StepFragmentComponent | - | Step icon displayed when step is completed, check icon by default |
| contentPadding | MantineSpacing | - | Key of <code>theme.spacing</code> or any valid CSS value to set <code>padding-top</code> of the content |
| icon | ReactNode | StepFragmentComponent | - | Step icon, default value is <code>step index + 1</code> |
| iconPosition | "left" | "right" | - | Icon position relative to the step body |
| iconSize | string | number | - | Controls size of the step icon, by default icon size is inferred from <code>size</code> prop |
| onStepClick | (stepIndex: number) => void | - | Called when step is clicked |
| orientation | "horizontal" | "vertical" | - | Stepper orientation |
| progressIcon | ReactNode | StepFragmentComponent | - | Step icon displayed when step is in progress, default value is <code>step index + 1</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set steps border-radius |
| size | MantineSize | - | Controls size of various Stepper elements |
| wrap | boolean | - | Determines whether steps should wrap to the next line if no space is available |


#### Styles API

Stepper component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Stepper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Stepper-root | Root element |
| steps | .mantine-Stepper-steps | Steps controls wrapper |
| separator | .mantine-Stepper-separator | Separator line between step controls |
| verticalSeparator | .mantine-Stepper-verticalSeparator | Vertical separator line between step controls |
| content | .mantine-Stepper-content | Current step content wrapper |
| stepWrapper | .mantine-Stepper-stepWrapper | Wrapper for the step icon and separator |
| step | .mantine-Stepper-step | Step control button |
| stepIcon | .mantine-Stepper-stepIcon | Step icon wrapper |
| stepCompletedIcon | .mantine-Stepper-stepCompletedIcon | Completed step icon, rendered within stepIcon |
| stepBody | .mantine-Stepper-stepBody | Contains stepLabel and stepDescription |
| stepLabel | .mantine-Stepper-stepLabel | Step label |
| stepDescription | .mantine-Stepper-stepDescription | Step description |
| stepLoader | .mantine-Stepper-stepLoader | Step loader |

**Stepper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --stepper-color | Controls color of the active step and separator |
| root | --stepper-icon-color | Controls `color` of the step icon |
| root | --stepper-icon-size | Controls `width` and `height` of the icons |
| root | --stepper-content-padding | Controls `padding-top` of the content |
| root | --stepper-radius | Controls `border-radius` of the step icon |
| root | --stepper-fz | Controls `font-size` of various elements |
| root | --stepper-spacing | Controls various spacings |

**Stepper data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| stepIcon | data-progress | Step is current | - |
| stepIcon | data-completed | Step is completed | - |


--------------------------------------------------------------------------------

### Switch
Package: @mantine/core
Import: import { Switch } from '@mantine/core';
Description: Capture boolean input from user

## Usage

#### Example: configurator

```tsx
import { Switch } from '@mantine/core';


function Demo() {
  return (
    <Switch
      defaultChecked
      
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## States

#### Example: states

```tsx
import { Switch, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Switch value="value" label="Default switch" />
      <Switch checked value="value" label="Checked switch" />
      <Switch disabled value="value" label="Disabled switch" />
      <Switch checked disabled value="value" label="Disabled checked switch" />
    </Stack>
  );
}
```


## Inner Labels

#### Example: labels

```tsx
import { Switch, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Switch size="xs" onLabel="ON" offLabel="OFF" />
      <Switch size="sm" onLabel="ON" offLabel="OFF" />
      <Switch size="md" onLabel="ON" offLabel="OFF" />
      <Switch size="lg" onLabel="ON" offLabel="OFF" />
      <Switch size="xl" onLabel="ON" offLabel="OFF" />
    </Group>
  );
}
```


## Icon labels

#### Example: iconLabels

```tsx
import { Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
    />
  );
}
```


## Thumb icon

#### Example: thumbIcon

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Switch with thumb icon"
      thumbIcon={
        checked ? (
          <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
        ) : (
          <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
        )
      }
    />
  );
}
```


## With tooltip

Set `refProp="rootRef"` on [Tooltip](https://mantine.dev/core/tooltip/) and other similar components to make them work with `Switch`:

#### Example: tooltip

```tsx
import { Switch, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Switch tooltip" refProp="rootRef">
      <Switch label="Switch with tooltip" />
    </Tooltip>
  );
}
```


## Pointer cursor

By default, switch input and label have `cursor: default` (same as native `input[type="checkbox"]`).
To change cursor to pointer, set `cursorType` on [theme](https://mantine.dev/theming/theme-object/):

```tsx
import { createTheme, MantineProvider, Switch } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Switch label="Pointer cursor" />
    </MantineProvider>
  );
}
```

<WrapperProps component="Switch" />

## Wrapper props

Switch supports additional props that are passed to the wrapper element for more customization options.

## Switch.Group

#### Example: groupConfigurator

```tsx
import { Switch, Group } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group
      defaultValue={['react']}
      
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
```


## Switch.Group disabled



## Controlled Switch.Group

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Switch.Group value={value} onChange={setValue}>
      <Switch value="react" label="React" />
      <Switch value="svelte" label="Svelte" />
    </Switch.Group>
  );
}
```

## Change styles based on checked state

#### Example: styles

```tsx
// Demo.module.css
.track {
  transition:
    background-color 200ms ease,
    border-color 200ms ease;

  input:checked + & {
    background-color: var(--mantine-color-lime-5);
    border-color: var(--mantine-color-lime-5);

    & > .thumb {
      background-color: var(--mantine-color-black);

      &::before {
        background-color: var(--mantine-color-lime-5);
      }
    }
  }
}

// Demo.tsx
import { Switch } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}
```


#### Example: stylesApi

```tsx
import { Switch } from '@mantine/core';

function Demo() {
  return <Switch label="Switch component" description="Switch description" error="Switch error />;
}
```


## Get input ref

```tsx
import { useRef } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Switch ref={ref} />;
}
```

## Accessibility

`Switch` is a regular `input[type="checkbox"]`. Set `aria-label` if the `Switch` is used without `label` prop:

```tsx
import { Switch } from '@mantine/core';

// -> not ok, input is not labeled
function Bad() {
  return <Switch />;
}

// -> ok, input has aria-label
function Good() {
  return <Switch aria-label="I agree to everything" />;
}

// -> ok, input has associated label
function AlsoGood() {
  return <Switch label="I agree to everything" />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to set input color in checked state |
| description | React.ReactNode | - | Description displayed below the label |
| error | React.ReactNode | - | Error displayed below the label |
| id | string | - | Id used to bind input and label, if not passed, unique id will be generated instead |
| label | React.ReactNode | - | Content of the <code>label</code> associated with the radio |
| labelPosition | "left" | "right" | - | Position of the label relative to the input |
| offLabel | React.ReactNode | - | Inner label when the <code>Switch</code> is in unchecked state |
| onLabel | React.ReactNode | - | Inner label when the <code>Switch</code> is in checked state |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius,</code> |
| rootRef | ForwardedRef<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | (string & {}) | - | Controls size of all elements |
| thumbIcon | React.ReactNode | - | Icon inside the thumb of the switch |
| withThumbIndicator | boolean | - | If set, the indicator will be displayed inside thumb |
| wrapperProps | Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & DataAttributes | - | Props passed down to the root element |


#### Styles API

Switch component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Switch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Switch-root | Root element |
| track | .mantine-Switch-track | Switch track, contains `thumb` and `trackLabel` |
| trackLabel | .mantine-Switch-trackLabel | Label displayed inside `track` |
| thumb | .mantine-Switch-thumb | Thumb displayed inside `track` |
| input | .mantine-Switch-input | Input element (`input[type="checkbox"]`), hidden by default |
| body | .mantine-Switch-body | Input body, contains all other elements |
| labelWrapper | .mantine-Switch-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Switch-label | Label element |
| description | .mantine-Switch-description | Description displayed below the label |
| error | .mantine-Switch-error | Error message displayed below the label |

**Switch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --switch-radius | Controls `border-radius` of `track` and `thumb` |
| root | --switch-height | Controls height of `track` |
| root | --switch-width | Controls min-width of `track` |
| root | --switch-thumb-size | Controls width and height of `thumb` |
| root | --switch-label-font-size | Controls `font-size` of `trackLabel` |
| root | --switch-track-label-padding | Controls `trackLabel` offset |
| root | --switch-color | Controls track `background-color` when input is checked |

**Switch data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| track | data-error | - | - |

**Switch.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SwitchGroup-root | Root element |
| label | .mantine-SwitchGroup-label | Label element |
| required | .mantine-SwitchGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-SwitchGroup-description | Description element |
| error | .mantine-SwitchGroup-error | Error element |


--------------------------------------------------------------------------------

### TableOfContents
Package: @mantine/core
Import: import { TableOfContents } from '@mantine/core';
Description: Renders a list of headings on the page and tracks current heading visible in the viewport

## Usage

Use `TableOfContents` component to display table of contents like
in the sidebar of mantine.dev documentation. The component tracks
scroll position and highlights current heading in the list.

#### Example: usage

```tsx
import { TableOfContents } from '@mantine/core';


function Demo() {
  return (
    <TableOfContents
      
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


## use-scroll-spy options

`TableOfContents` in based on [use-scroll-spy](https://mantine.dev/hooks/use-scroll-spy) hook.
You can pass options down to `use-scroll-spy` hook using `scrollSpyOptions` prop.

Example of customizing selector, depth and value retrieval:

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      scrollSpyOptions={{
        selector: '#mdx [data-heading]',
        getDepth: (element) => Number(element.getAttribute('data-order')),
        getValue: (element) => element.getAttribute('data-heading') || '',
      }}
    />
  );
}
```

## Pass props to controls

You can pass props down to controls rendered by `TableOfContents` component
with `getControlProps` function. It accepts an object with `active` and `data`
properties and should return props object.

Example of changing controls to links:

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      getControlProps={({ active, data }) => ({
        component: 'a',
        href: `#${data.id}`,
        style: { color: active ? 'blue' : 'gray' },
        children: data.value,
      })}
    />
  );
}
```

## Initial data

`TableOfContents` retrieves data on mount. If you want to render headings
before `TableOfContents` component is mounted (for example during server-side rendering),
you can pass `initialData` prop with array of headings data. `initialData` is replaced
with actual data on mount.

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      initialData={[
        { id: '1', value: 'Heading 1', depth: 1 },
        { id: '2', value: 'Heading 2', depth: 2 },
        { id: '3', value: 'Heading 3', depth: 3 },
      ]}
    />
  );
}
```

## Depth offset

Use `minDepthToOffset` prop to set minimum depth at which offset should be applied.
By default, `minDepthToOffset` is `1`, which means that first and second level headings
will not be offset. Set it to `0` to apply offset to all headings.

To control offset value in px, set `depthOffset` prop:

#### Example: depthOffset

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      minDepthToOffset={0}
      depthOffset={40}
      size="sm"
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


<AutoContrast component="TableOfContents" />

## autoContrast

TableOfContents supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on TableOfContents or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      minDepthToOffset={0}
      depthOffset={40}
      size="sm"
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


## Styles API

Example of customizing `TableOfContents` with [Styles API](https://mantine.dev/styles/styles-api) and [data-\* attributes](https://mantine.dev/styles/data-attributes):

#### Example: styles

```tsx
// Demo.tsx
import { TableOfContents } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <TableOfContents
      size="sm"
      variant="none"
      classNames={classes}
      minDepthToOffset={0}
      depthOffset={40}
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}

// Demo.module.css
.control {
  transition: transform 100ms ease;

  &[data-active] {
    background-color: var(--mantine-color-lime-4);
    color: var(--mantine-color-black);
    transform: scale(1.1);
  }
}
```


## Reinitialize

By default, `TableOfContents` does not track changes in the DOM. If you want
to update headings data after the parent component has mounted, you can use
`reinitializeRef` to get reinitialize function from [use-scroll-spy](https://mantine.dev/hooks/use-scroll-spy) hook:

```tsx
import { useRef, useLayoutEffect } from 'react';
import { TableOfContents } from '@mantine/core';

function Demo({ dependency }) {
  const reinitializeRef = useRef(() => {});

  useLayoutEffect(() => {
    reinitializeRef.current();
  }, [dependency]);

  return <TableOfContents reinitializeRef={reinitializeRef} />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color value |
| depthOffset | string | number | - | Controls padding on the left side of control, multiplied by (<code>depth</code> - <code>minDepthToOffset</code>), <code>20px</code> by default |
| getControlProps | (payload: TableOfContentsGetControlPropsPayload) => UnstyledButtonProps & ElementProps<"button"> & Record<...> | - | A function to pass props down to controls, accepts values from <code>use-scroll-spy</code> hook as an argument and active state. |
| initialData | InitialTableOfContentsData[] | - | Data used to render content until actual values are retrieved from the DOM |
| minDepthToOffset | number | - | Minimum <code>depth</code> value that requires offset, <code>1</code> by default |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>@default <code>theme.defaultRadius</code> |
| reinitializeRef | RefObject<() => void> | - | A function to reinitialize headings from <code>use-scroll-spy</code> hook |
| scrollSpyOptions | UseScrollSpyOptions | - | Options passed down to <code>use-scroll-spy</code> hook |
| size | number | MantineSize | (string & {}) | - | Controls font-size and padding of all elements |


#### Styles API

TableOfContents component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TableOfContents selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-TableOfContents-root | Root element |
| control | .mantine-TableOfContents-control | Control element |

**TableOfContents CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --toc-bg | Background color of active control |
| root | --toc-color | Text color of active control |
| root | --toc-depth-offset | Offset between of control depending on depth |
| root | --toc-radius | Border-radius of control |
| root | --toc-size | Controls font-size and padding of all elements |

**TableOfContents data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Associated heading is currently the best match in the viewport | - |


--------------------------------------------------------------------------------

### Table
Package: @mantine/core
Import: import { Table } from '@mantine/core';
Description: Render table with theme styles

## Usage

Table data for all examples:

```tsx
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
```

#### Example: usage

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```


## data prop

You can use `data` prop to automatically generate table rows from array of React nodes.
`data` prop accepts an object with the following properties:

* `head` – an array of React nodes (`React.ReactNode[]`) to render `Table.Th` in `Table.Thead`
* `foot` – an array of React nodes (`React.ReactNode[]`) to render `Table.Th` in `Table.Tfoot`
* `body` - an array of arrays of React nodes (`React.ReactNode[][]`) to render `Table.Td` in `Table.Tbody`
* `caption` – a React node to render `Table.Caption`

#### Example: data

```tsx
import { Table, TableData } from '@mantine/core';

const tableData: TableData = {
  caption: 'Some elements from periodic table',
  head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
  body: [
    [6, 12.011, 'C', 'Carbon'],
    [7, 14.007, 'N', 'Nitrogen'],
    [39, 88.906, 'Y', 'Yttrium'],
    [56, 137.33, 'Ba', 'Barium'],
    [58, 140.12, 'Ce', 'Cerium'],
  ],
};

function Demo() {
  return <Table data={tableData} />;
}
```


## Sticky header

Set `stickyHeader` to make table header sticky. To customize top position of the header use `stickyHeaderOffset` prop:
it is useful when you have a fixed header in your application. For example, Mantine documentation website has a fixed
header with 60px height:

#### Example: stickyHeader

```tsx
import { Table } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
  );
}
```


## Spacing

To control spacing use `horizontalSpacing` and `verticalSpacing` props. Both props support spacing from `theme.spacing` and any valid CSS value to set cell padding:

#### Example: spacingConfigurator

```tsx
import { Table } from '@mantine/core';

function Demo() {
  return (
    <Table>
      {/* {...rows} */}
    </Table>
  );
}
```


## Caption and tfoot

Table support tfoot and caption elements. Set `captionSide` prop (top or bottom) to change caption position.

#### Example: captions

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Element position</Table.Th>
      <Table.Th>Element name</Table.Th>
      <Table.Th>Symbol</Table.Th>
      <Table.Th>Atomic mass</Table.Th>
    </Table.Tr>
  );

  return (
    <Table captionSide="bottom">
      <Table.Caption>Some elements from periodic table</Table.Caption>
      <Table.Thead>{ths}</Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Tfoot>{ths}</Table.Tfoot>
    </Table>
  );
}
```


## Striped and rows hover

#### Example: configurator

```tsx
import { Table } from '@mantine/core';

function Demo() {
  return (
    <Table>
      {/* {...rows} */}
    </Table>
  );
}
```


## Scroll container

To prevent viewport overflow wrap `Table` with `Table.ScrollContainer`.
The component accepts `minWidth` prop which sets minimum width below which table will be scrollable.

#### Example: scrollContainer

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


By default, `Table.ScrollContainer` uses [ScrollArea](https://mantine.dev/core/scroll-area), you can change it
to native scrollbars by setting `type="native"`:

#### Example: scrollContainerNative

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


You can also set `maxHeight` prop on `Table.ScrollContainer` to limit table height:

#### Example: scrollContainerMaxHeight

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elementsLong.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


## Vertical variant

Set `variant="vertical"` to render table with vertical layout:

#### Example: vertical

```tsx
import { Table } from '@mantine/core';

export function Demo() {
  return (
    <Table variant="vertical" layout="fixed" withTableBorder>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th w={160}>Epic name</Table.Th>
          <Table.Td>7.x migration</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Status</Table.Th>
          <Table.Td>Open</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Total issues</Table.Th>
          <Table.Td>135</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Total story points</Table.Th>
          <Table.Td>874</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Last updated at</Table.Th>
          <Table.Td>September 26, 2024 17:41:26</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
```


## Tabular numbers

Set `tabularNums` prop to render numbers in tabular style. It sets
`font-variant-numeric: tabular-nums` which makes numbers to have equal width.
This is useful when you have columns with numbers and you want them to be aligned:

#### Example: tabularNums

```tsx
import { NumberFormatter, Table } from '@mantine/core';

const data = [
  { product: 'Apples', unitsSold: 2214411234 },
  { product: 'Oranges', unitsSold: 9983812411 },
  { product: 'Bananas', unitsSold: 1234567890 },
  { product: 'Pineapples', unitsSold: 9948810000 },
  { product: 'Pears', unitsSold: 9933771111 },
];

function Demo() {
  const rows = data.map((item) => (
    <Table.Tr key={item.product}>
      <Table.Td>{item.product}</Table.Td>
      <Table.Td>
        <NumberFormatter value={item.unitsSold} thousandSeparator />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Units sold</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```


## Example: Table with row selection

#### Example: rowSelection

```tsx
import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.position)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.position]
                : selectedRows.filter((position) => position !== element.position)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| borderColor | MantineColor | - | Color of table borders, key of <code>theme.colors</code> or any valid CSS color |
| captionSide | "bottom" | "top" | - | Side of the <code>Table.Caption</code> |
| data | TableData | - | Data used to generate table, ignored if <code>children</code> prop is set |
| highlightOnHover | boolean | - | If set, table rows background changes to <code>highlightOnHoverColor</code> when hovered |
| highlightOnHoverColor | MantineColor | - | Background color of table rows when hovered, key of <code>theme.colors</code> or any valid CSS color |
| horizontalSpacing | MantineSpacing | - | Horizontal cells spacing, key of <code>theme.spacing</code> or any valid CSS value for padding, numbers are converted to rem |
| layout | TableLayout | - | Value of <code>table-layout</code> style |
| stickyHeader | boolean | - | If set, <code>Table.Thead</code> is sticky |
| stickyHeaderOffset | string | number | - | Offset from top at which <code>Table.Thead</code> should become sticky |
| striped | boolean | "odd" | "even" | - | If set, every odd/even row background changes to <code>strippedColor</code>, if set to <code>true</code>, then <code>odd</code> value will be used |
| stripedColor | MantineColor | - | Background color of striped rows, key of <code>theme.colors</code> or any valid CSS color |
| tabularNums | boolean | - | If set, <code>font-variant-numeric: tabular-nums</code> style is applied |
| verticalSpacing | MantineSpacing | - | Vertical cells spacing, key of <code>theme.spacing</code> or any valid CSS value for padding, numbers are converted to rem |
| withColumnBorders | boolean | - | If set, the table has borders between columns |
| withRowBorders | boolean | - | If set, the table has borders between rows |
| withTableBorder | boolean | - | If set, the table has the outer border |


#### Styles API

Table component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Table selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| table | .mantine-Table-table | Root `table` element (`Table` component) |
| thead | .mantine-Table-thead | `thead` element (`Table.Thead` component) |
| tbody | .mantine-Table-tbody | `tbody` element (`Table.Tbody` component) |
| tfoot | .mantine-Table-tfoot | `tfoot` element (`Table.Tfoot` component) |
| tr | .mantine-Table-tr | `tr` element (`Table.Tr` component) |
| th | .mantine-Table-th | `th` element (`Table.Th` component) |
| td | .mantine-Table-td | `td` element (`Table.Td` component) |
| caption | .mantine-Table-caption | `caption` element (`Table.Caption` component) |

**Table CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| table | --table-border-color | Controls `border-color` of all elements inside table |
| table | --table-layout | Controls `table-layout` of the table element, auto by default |
| table | --table-caption-side | Controls caption-side of the table element, `bottom` by default |
| table | --table-striped-color | Controls `background-color` of even/odd `Table.Tr` elements |
| table | --table-sticky-header-offset | Controls `top` offset of sticky header |

**Table data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| table | data-with-table-border | - | - |

**Tableofcontents selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tableofcontents-root | Root element |
| control | .mantine-Tableofcontents-control | Control element |

**Tableofcontents CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --toc-bg | Background color of active control |
| root | --toc-color | Text color of active control |
| root | --toc-depth-offset | Offset between of control depending on depth |
| root | --toc-radius | Border-radius of control |
| root | --toc-size | Controls font-size and padding of all elements |

**Tableofcontents data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Associated heading is currently the best match in the viewport | - |


--------------------------------------------------------------------------------

### Tabs
Package: @mantine/core
Import: import { Tabs } from '@mantine/core';
Description: Switch between different views

## Usage

#### Example: usage

```tsx
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

function Demo() {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
```


## Controlled Tabs

To control Tabs state, use `value` and `onChange` props:

```tsx
import { useState } from 'react';
import { Tabs } from '@mantine/core';

function Demo() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Uncontrolled Tabs

If you do not need to subscribe to Tabs state changes, use `defaultValue`:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Change colors

To change colors of all tabs, set `color` on `Tabs` component, to change color of the individual tab,
set `color` on `Tabs.Tab`.

#### Example: colors

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">Teal tab</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">
          Blue tab
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
        First tab color is teal, it gets this value from context
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        Second tab color is blue, it gets this value from props, props have the priority and will
        override context value
      </Tabs.Panel>
    </Tabs>
  );
}
```


## Tabs position

#### Example: position

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
        <Tabs.Tab value="third">Third tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


To display tab on the opposite side, set `margin-left: auto` with `ml="auto"` prop or with `className`:

#### Example: pull

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          Account
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Inverted tabs

To make tabs inverted, place `Tabs.Panel` components before `Tabs.List` and add `inverted` prop to `Tabs` component:

#### Example: inverted

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" inverted>
      <Tabs.Panel value="chat" pb="xs">Chat panel</Tabs.Panel>
      <Tabs.Panel value="gallery" pb="xs">Gallery panel</Tabs.Panel>
      <Tabs.Panel value="account" pb="xs">Account panel</Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Vertical tabs placement

To change placement of `Tabs.List` in vertical orientation set `placement` prop:

#### Example: placement

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="gallery" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
      <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
}
```


## Custom variants

Example of custom variant with [FloatingIndicator](https://mantine.dev/core/floating-indicator):

#### Example: tabs

```tsx
// Demo.tsx
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Third tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
}

// Demo.module.css
.list {
  position: relative;
  margin-bottom: var(--mantine-spacing-md);
}

.indicator {
  background-color: var(--mantine-color-white);
  border-radius: var(--mantine-radius-md);
  border: 1px solid var(--mantine-color-gray-2);
  box-shadow: var(--mantine-shadow-sm);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
  }
}

.tab {
  z-index: 1;
  font-weight: 500;
  transition: color 100ms ease;
  color: var(--mantine-color-gray-7);

  &[data-active] {
    color: var(--mantine-color-black);
  }

  @mixin dark {
    color: var(--mantine-color-dark-1);

    &[data-active] {
      color: var(--mantine-color-white);
    }
  }
}
```


## Disabled tabs

Set `disabled` prop on `Tabs.Tab` component to disable tab.
Disabled tab cannot be activated with mouse or keyboard, and they will be skipped when user navigates with arrow keys:

#### Example: disabled

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Activation mode

By default, tabs are activated when user presses arrows keys or Home/End keys.
To disable that set `activateTabWithKeyboard={false}` on `Tabs` component:

#### Example: keyboardActivation

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" activateTabWithKeyboard={false}>
      {/* ...content */}
    </Tabs>
  );
}
```


## Tab deactivation

By default, active tab cannot be deactivated. To allow that set `allowTabDeactivation` on `Tabs` component:

#### Example: deactivate

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" allowTabDeactivation>
      {/* ...content */}
    </Tabs>
  );
}
```


## Unmount inactive tabs

By default, inactive `Tabs.Panel` will stay mounted, to unmount inactive tabs, set `keepMounted={false}` on Tabs.
This is useful when you want to render components that impact performance inside `Tabs.Panel`. Note that
components that are rendered inside `Tabs.Panel` will reset their state on each mount (tab change).

```tsx
import { Tabs } from '@mantine/core';

// Second tab panel will be mounted only when user activates second tab
function Demo() {
  return (
    <Tabs keepMounted={false} defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Get tab control ref

```tsx
import { useRef } from 'react';
import { Tabs } from '@mantine/core';

function Demo() {
  const secondTabRef = useRef<HTMLButtonElement>(null);

  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="Second" ref={secondTabRef}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="third">Third tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Usage with react-router

```tsx
<Route path="/tabs/:tabValue" element={<Demo />} />
```

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';

function Demo() {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      value={tabValue}
      onChange={(value) => navigate(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Usage with Next.js router

```tsx
// For file /tabs/[activeTab].tsx
import { useRouter } from 'next/router';
import { Tabs } from '@mantine/core';

function Demo() {
  const router = useRouter();

  return (
    <Tabs
      value={router.query.activeTab as string}
      onChange={(value) => router.push(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

#### Example: stylesApi

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" rightSection={<IconSettings size={12} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
```


Example of Styles API usage to customize tab styles:

#### Example: customize

```tsx
// Demo.module.css
.tab {
  position: relative;
  border: 1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4));
  background-color: light-dark(var(--mantine-color-white), var(--mantine-color-dark-6));

  &:first-of-type {
    border-radius: 4px 0 0 4px;

    @mixin rtl {
      border-radius: 0 4px 4px 0;
    }
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;

    @mixin rtl {
      border-radius: 4px 0 0 4px;
    }
  }

  & + & {
    border-left-width: 0;

    @mixin rtl {
      border-right-width: 0;
      border-left-width: 1px;
    }
  }

  @mixin hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5));
  }

  &[data-active] {
    z-index: 1;
    background-color: var(--mantine-color-blue-filled);
    border-color: var(--mantine-color-blue-filled);
    color: var(--mantine-color-white);

    @mixin hover {
      background-color: var(--mantine-color-blue-filled-hover);
    }
  }
}

// Demo.tsx
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
          value="settings"
          leftSection={<IconSettings size={16} />}
        >
          Settings
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          leftSection={<IconMessageCircle size={16} />}
        >
          Messages
        </Tabs.Tab>
        <Tabs.Tab
          value="gallery"
          leftSection={<IconPhoto size={16} />}
        >
          Gallery
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Accessibility

Tabs component follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) on accessibility.

If you use `Tabs.Tab` without text content, for example, only with icon, then set `aria-label`
or use [VisuallyHidden](https://mantine.dev/core/visually-hidden) component:

```tsx
import { IconCoin } from '@tabler/icons-react';
import { Tabs, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        {/* aria-label is not required, tab is labelled by children */}
        <Tabs.Tab value="chat">Chat</Tabs.Tab>

        {/* aria-label is required, tab is not labelled by children */}
        <Tabs.Tab
          value="money"
          aria-label="Get money"
          leftSection={<IconCoin size={14} />}
        />

        {/* You can use VisuallyHidden instead of aria-label */}
        <Tabs.Tab value="money" leftSection={<IconCoin size={14} />}>
          <VisuallyHidden>Get money</VisuallyHidden>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

To set tabs list label, set `aria-label` on `Tabs.List` component, it will be announced by screen reader:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="recent">
      {/* Tabs.List aria-label will be announced when tab is focused for the first time */}
      <Tabs.List aria-label="Chats">
        <Tabs.Tab value="recent">Most recent</Tabs.Tab>
        <Tabs.Tab value="recent">Unanswered</Tabs.Tab>
        <Tabs.Tab value="archived">Archived</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Keyboard interactions


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activateTabWithKeyboard | boolean | - | If set, tab is activated with arrow key press |
| allowTabDeactivation | boolean | - | If set, tab can be deactivated |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>pills</code> variant |
| children | React.ReactNode | - | Tabs content |
| color | MantineColor | - | Changes colors of <code>Tabs.Tab</code> components when variant is <code>pills</code> or <code>default</code>, does nothing for other variants |
| defaultValue | string | null | - | Uncontrolled component default value |
| id | string | - | Base id, used to generate ids to connect labels with controls, generated randomly by default |
| inverted | boolean | - | Determines whether tabs should have inverted styles |
| keepMounted | boolean | - | If set to <code>false</code>, <code>Tabs.Panel</code> content will be unmounted when the associated tab is not active |
| loop | boolean | - | If set, arrow key presses loop though items (first to last and last to first) |
| onChange | (value: string | null) => void | - | Called when value changes |
| orientation | "horizontal" | "vertical" | - | Tabs orientation |
| placement | "left" | "right" | - | <code>Tabs.List</code> placement relative to <code>Tabs.Panel</code>, applicable only when <code>orientation="vertical"</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>@default <code>theme.defaultRadius</code> |
| value | string | null | - | Controlled component value |


#### Styles API

Tabs component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tabs-root | Root element (`Tabs` component) |
| list | .mantine-Tabs-list | List of tabs (`Tabs.List` component) |
| panel | .mantine-Tabs-panel | Panel with tab content (`Tabs.Panel` component) |
| tab | .mantine-Tabs-tab | Tab button (`Tabs.Tab` component) |
| tabLabel | .mantine-Tabs-tabLabel | Label of `Tabs.Tab` |
| tabSection | .mantine-Tabs-tabSection | Left and right sections of `Tabs.Tab` |

**Tabs CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --tabs-radius | Controls `Tabs.Tab` `border-radius` |


--------------------------------------------------------------------------------

### TagsInput
Package: @mantine/core
Import: import { TagsInput } from '@mantine/core';
Description: Capture a list of values from user with free input and suggestions

<ComboboxDisclaimer component="TagsInput" />

## Usage

`TagsInput` provides a way to enter multiple values. It can be used with suggestions or without them.
`TagsInput` is similar to [MultiSelect](https://mantine.dev/core/multi-select), but it allows entering custom values.

#### Example: usage

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return <TagsInput label="Press Enter to submit a tag" placeholder="Enter tag" />;
}
```


## Controlled

`TagsInput` value must be an array of strings, other types are not supported.
`onChange` function is called with an array of strings as a single argument.

```tsx
import { useState } from 'react';
import { TagsInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <TagsInput data={[]} value={value} onChange={setValue} />;
}
```

## Controlled search value

You can control search value with `searchValue` and `onSearchChange` props:

```tsx
import { useState } from 'react';
import { TagsInput } from '@mantine/core';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <TagsInput
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

## Clearable

Set `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

#### Example: clearable

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      defaultValue={['React']}
      clearable
    />
  );
}
```


## Max selected values

You can limit the number of selected values with `maxTags` prop. This will not allow adding more values
once the limit is reached.

#### Example: maxTags

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      description="Add up to 3 tags"
      placeholder="Enter tag"
      maxTags={3}
      defaultValue={['first', 'second']}
    />
  );
}
```


## Accept value on blur

By default, if the user types a value and blurs the input, the value is added to the list.
You can change this behavior by setting `acceptValueOnBlur` to `false`. In this case, the value is added
only when the user presses `Enter` or clicks on a suggestion.

#### Example: acceptValueOnBlur

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TagsInput
        label="Value IS accepted on blur"
        placeholder="Enter text, then blur the field"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur
      />
      <TagsInput
        label="Value IS NOT accepted on blur"
        placeholder="Enter text, then blur the field"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur={false}
        mt="md"
      />
    </>
  );
}
```


## Allow duplicates

By default, `TagsInput` does not allow to add duplicate values, but you can change this behavior by
setting `allowDuplicates` prop. Value is considered duplicate if it is already present in the `value` array,
regardless of the case and trailing whitespace.

#### Example: allowDuplicates

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Duplicates are allowed"
      allowDuplicates
    />
  );
}
```


## isDuplicate

You can use `isDuplicate` prop to control how duplicates are detected. It is a function that
receives two arguments: tag value and current tags. The function must return `true` if the value is duplicate.

Example of using `isDuplicate` to allow using the same value with different casing:

#### Example: isDuplicate

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      isDuplicate={(tagValue, currentTags) => currentTags.some((val) => val === tagValue)}
      defaultValue={['Tag', 'TAG', 'tag']}
    />
  );
}
```


## Split chars

By default, `TagsInput` splits values by comma (`,`), you can change this behavior by setting
`splitChars` prop to an array of strings. All values from `splitChars` cannot be included in the final value.
Values are also split on paste.

Example of splitting by `,`, `|` and space:

#### Example: splitChars

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      splitChars={[',', ' ', '|']}
    />
  );
}
```


## With suggestions

`TagsInput` can be used with suggestions, it will render suggestions list under input and allow to select
suggestions with keyboard or mouse. Note that user is not limited to suggestions, it is still possible to
enter custom values. If you want to allow values only from suggestions, use [MultiSelect](https://mantine.dev/core/multi-select) component instead.

#### Example: data

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Pick tag from list"
      data={['React', 'Angular', 'Svelte']}
    />
  );
}
```


<ComboboxData component="TagsInput" />

## Data prop

Data that is used in TagsInput must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

<ComboboxFiltering component="TagsInput" />

## Filtering

TagsInput provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

#### Example: search

```tsx
import { TagsInput, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <TagsInput
      label="What countries have you visited?"
      placeholder="Pick value or enter anything"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with `filter` function:

#### Example: sort

```tsx
import { TagsInput, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <TagsInput
      label="Your favorite libraries"
      placeholder="Pick value or enter anything"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
    />
  );
}
```


<ComboboxLargeData component="TagsInput" />

## Large datasets

TagsInput can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

#### Example: limit

```tsx
import { TagsInput } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <TagsInput
      label="100 000 options tags input"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
    />
  );
}
```


## renderOption

`renderOption` callback allows you to customize option rendering. It is called with option object.
The function must return a React node.

#### Example: renderOption

```tsx
import { Group, TagsInput, TagsInputProps, Text } from '@mantine/core';

const data: Record<string, { emoji: string; description: string }> = {
  Apples: {
    emoji: '🍎',
    description: 'Crisp and juicy snacking delight',
  },
  Bread: {
    emoji: '🍞',
    description: 'Freshly baked daily essential',
  },
  Bananas: {
    emoji: '🍌',
    description: 'Perfect for a healthy breakfast',
  },
  Eggs: {
    emoji: '🥚',
    description: 'Versatile protein source for cooking',
  },
  Broccoli: {
    emoji: '🥦',
    description: 'Nutrient-rich green vegetable',
  },
};

const renderTagsInputOption: TagsInputProps['renderOption'] = ({ option }) => (
  <Group>
    <Text span fz={24}>
      {data[option.value].emoji}
    </Text>
    <div>
      <Text>{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {data[option.value].description}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <TagsInput
      data={['Apples', 'Bread', 'Bananas', 'Eggs', 'Broccoli']}
      renderOption={renderTagsInputOption}
      label="Groceries"
      placeholder="Pick tag from list or type to add new"
      maxDropdownHeight={300}
    />
  );
}
```


## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/core/scroll-area).
You can control dropdown max-height with `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change dropdown styles with [Styles API](https://mantine.dev/styles/styles-api).

#### Example: scrollArea

```tsx
import { TagsInput } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <TagsInput
        label="With scroll area (default)"
        placeholder="Pick value or enter anything"
        data={data}
        maxDropdownHeight={200}
      />

      <TagsInput
        label="With native scroll"
        placeholder="Pick value or enter anything"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

#### Example: groups

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Enter tags"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When option is disabled, it cannot be selected and is ignored in keyboard navigation.
Note that user can still enter disabled option as a value. If you want to prohibit certain values,
use controlled component and filter them out in `onChange` function.

#### Example: disabledOptions

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Some tags are disabled"
      data={[
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Vue', disabled: true },
        { value: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


<ComboboxProps component="TagsInput" />

## Inside Popover

To use `TagsInput` inside popover, you need to set `withinPortal: false`:

#### Example: withinPopover

```tsx
import { Popover, Button, TagsInput } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TagsInput
          label="Your favorite library"
          placeholder="Pick value or enter anything"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Control dropdown opened state

You can control dropdown opened state with `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

#### Example: dropdownOpened

```tsx
import { TagsInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TagsInput
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/core/popover) component.

Example of dropdown that is always displayed above the input:

#### Example: dropdownPosition

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/core/transition) component.

#### Example: dropdownAnimation

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is equal to the input width.

#### Example: dropdownWidth

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
```


## Dropdown padding

#### Example: dropdownPadding

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TagsInput
        label="Zero padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <TagsInput
        mt="md"
        label="10px padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

#### Example: dropdownShadow

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


<InputSections component="TagsInput" />

## Input sections

TagsInput supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { TagsInput } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

function Demo() {
  const icon = <IconComponents size={16} />;
  return (
    <>
      <TagsInput
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <TagsInput
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
    </>
  );
}
```


## Input props

<InputFeatures component="TagsInput" element="input" />

TagsInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. TagsInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { TagsInput } from '@mantine/core';


function Demo() {
  return (
    <TagsInput
      
      placeholder="TagsInput placeholder"
      value={['First', 'Second']}
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`TagsInput` will not show suggestions and will not call `onChange` function.

#### Example: readOnly

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Read only"
      placeholder="Enter tag"
      readOnly
      defaultValue={['First', 'Second']}
    />
  );
}
```


## Disabled

Set `disabled` to disable the input. When `disabled` is set,
user cannot interact with the input and `TagsInput` will not show suggestions.

#### Example: disabled

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Disabled"
      placeholder="Enter tag"
      disabled
      defaultValue={['First', 'Second']}
    />
  );
}
```


## Error state

#### Example: error

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TagsInput
        label="Boolean error"
        placeholder="Boolean error"
        error
        defaultValue={['React', 'Angular']}
      />
      <TagsInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
        defaultValue={['React', 'Angular']}
      />
    </>
  );
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
     
      leftSection={<IconAt size={18} stroke={1.5} />}
      label="TagsInput"
      description="Description"
      error="Error"
      placeholder="TagsInput"
      defaultValue={['First', 'Second']}
      data={['React', 'Angular']}
    />
  );
}
```


<GetElementRef component="TagsInput" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { TagsInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <TagsInput ref={ref} />;
}
```

<InputAccessibility component="TagsInput" />

## Accessibility

TagsInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.

To set `aria-label` on the clear button, use `clearButtonProps`. Note that it is required
only when `clearable` is set.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      data={[]}
      clearable
      clearButtonProps={{
        'aria-label': 'Clear input',
      }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| acceptValueOnBlur | boolean | - | If set, the value typed in by the user but not submitted is accepted when the input is blurred |
| allowDuplicates | boolean | - | If set, duplicate tags are allowed |
| clearButtonProps | InputClearButtonProps | - | Props passed down to the clear button |
| clearable | boolean | - | If set, the clear button is displayed in the right section when the component has value |
| comboboxProps | ComboboxProps | - | Props passed down to <code>Combobox</code> component |
| data | ComboboxStringData | - | Data displayed in the dropdown. Values must be unique. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultSearchValue | string | - | Default search value |
| defaultValue | string[] | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| filter | OptionsFilter | - | Function based on which items are filtered and sorted |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| hiddenInputValuesDivider | string | - | Divider used to separate values in the hidden input <code>value</code> attribute |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| isDuplicate | (value: string, currentValues: string[]) => boolean | - | Custom function to determine if a tag is duplicate. Accepts tag value and array of current values. By default, checks if the tag exists case-insensitively. |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| limit | number | - | Maximum number of options displayed at a time, <code>Infinity</code> by default |
| maxDropdownHeight | string | number | - | <code>max-height</code> of the dropdown, only applicable when <code>withScrollArea</code> prop is <code>true</code>, <code>250</code> by default |
| maxTags | number | - | Maximum number of tags |
| onChange | (value: string[]) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onDuplicate | (value: string) => void | - | Called when user tries to submit a duplicated tag |
| onOptionSubmit | (value: string) => void | - | Called when option is submitted from dropdown with mouse click or <code>Enter</code> key |
| onRemove | (value: string) => void | - | Called when tag is removed |
| onSearchChange | (value: string) => void | - | Called when search changes |
| openOnFocus | boolean | - | If set, the dropdown opens when the input receives focus |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| renderOption | (input: ComboboxLikeRenderOptionInput<ComboboxStringItem>) => ReactNode | - | A function to render content of the option, replaces the default content of the option |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed down to the underlying <code>ScrollArea</code> component in the dropdown |
| searchValue | string | - | Controlled search value |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, <code>false</code> by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, <code>false</code> by default |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| splitChars | string[] | - | Characters that should trigger tags split, <code>[',']</code> by default |
| value | string[] | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with <code>ScrollArea.AutoSize</code>, <code>true</code> by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

TagsInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TagsInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-TagsInput-wrapper | Root element of the Input |
| input | .mantine-TagsInput-input | Input element |
| section | .mantine-TagsInput-section | Left and right sections |
| root | .mantine-TagsInput-root | Root element |
| label | .mantine-TagsInput-label | Label element |
| required | .mantine-TagsInput-required | Required asterisk element, rendered inside label |
| description | .mantine-TagsInput-description | Description element |
| error | .mantine-TagsInput-error | Error element |
| pill | .mantine-TagsInput-pill | Value pill |
| inputField | .mantine-TagsInput-inputField | Input field |
| pillsList | .mantine-TagsInput-pillsList | List of pills, also contains input field |

**TagsInput data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### TextInput
Package: @mantine/core
Import: import { TextInput } from '@mantine/core';
Description: Capture string input from user

## Usage

<InputFeatures component="TextInput" element="input" />

TextInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. TextInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: usage

```tsx
import { TextInput } from '@mantine/core';


function Demo() {
  return (
    <TextInput
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

<InputSections component="TextInput" />

## Input sections

TextInput supports left and right sections to display icons, buttons or other content alongside the input.

#### Example: sections

```tsx
import { TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  const icon = <IconAt size={16} />;
  return (
    <>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your email"
        placeholder="Your email"
      />
      <TextInput
        mt="md"
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your email"
        placeholder="Your email"
      />
    </>
  );
}
```


## Error state

#### Example: error

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TextInput label="Boolean error" placeholder="Boolean error" error />
      <TextInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return <TextInput disabled label="Disabled input" placeholder="Disabled input" />;
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      label="Label"
      placeholder="TextInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      
    />
  );
}
```


<GetElementRef component="TextInput" refType="input" />

## Get element ref

```tsx
import { useRef } from 'react';
import { TextInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <TextInput ref={ref} />;
}
```

<InputAccessibility component="TextInput" />

## Accessibility

TextInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

TextInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TextInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-TextInput-wrapper | Root element of the Input |
| input | .mantine-TextInput-input | Input element |
| section | .mantine-TextInput-section | Left and right sections |
| root | .mantine-TextInput-root | Root element |
| label | .mantine-TextInput-label | Label element |
| required | .mantine-TextInput-required | Required asterisk element, rendered inside label |
| description | .mantine-TextInput-description | Description element |
| error | .mantine-TextInput-error | Error element |


--------------------------------------------------------------------------------

### Text
Package: @mantine/core
Import: import { Text } from '@mantine/core';
Description: Display text

## Usage

#### Example: usage

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Default text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
      <Text fw={500}>Semibold</Text>
      <Text fw={700}>Bold</Text>
      <Text fs="italic">Italic</Text>
      <Text td="underline">Underlined</Text>
      <Text td="line-through">Strikethrough</Text>
      <Text c="dimmed">Dimmed text</Text>
      <Text c="blue">Blue text</Text>
      <Text c="teal.4">Teal 4 text</Text>
      <Text tt="uppercase">Uppercase</Text>
      <Text tt="capitalize">capitalized text</Text>
      <Text ta="center">Aligned to center</Text>
      <Text ta="right">Aligned to right</Text>
    </>
  );
}
```


<Gradient component="Text" />

## Gradient

Text supports Mantine color format in color prop. Color can be specified as:
- Mantine color name (e.g., 'blue')
- CSS color value (e.g., '#fff', 'rgba(255, 255, 255, 0.8)')
- Gradient string (e.g., 'linear-gradient(45deg, blue, red)')

#### Example: gradient

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
    >
      Gradient Text
    </Text>
  );
}
```


## Truncate

Set `truncate` prop to add `text-overflow: ellipsis` styles:

#### Example: truncate

```tsx
import { Text, Box } from '@mantine/core';

function Demo() {
  return (
    <Box w={300}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde provident eos fugiat id
        necessitatibus magni ducimus molestias. Placeat, consequatur. Quisquam, quae magnam
        perspiciatis excepturi iste sint itaque sunt laborum. Nihil?
      </Text>
    </Box>
  );
}
```


## Line clamp

Specify maximum number of lines with `lineClamp` prop. This option uses [-webkit-line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
CSS property ([caniuse](https://caniuse.com/css-line-clamp)). Note that `padding-bottom` cannot be set on text element:

#### Example: linesConfigurator

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text>
      {/* Text content */}
    </Text>
  );
}
```


Line clamp can also be used with any children (not only strings), for example with [Typography](https://mantine.dev/core/typography/):

#### Example: lineClamp

```tsx
import { Typography, Text } from '@mantine/core';

function Demo() {
  return (
    <Text lineClamp={3} component="div">
      <Typography>
        <h3>Line clamp with Typography</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed
          corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis
          non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum
          veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae
          perspiciatis.
        </p>
      </Typography>
    </Text>
  );
}
```


## Inherit styles

Text always applies font-size, font-family and line-height styles,
but in some cases this is not a desired behavior. To force Text to inherit parent
styles set `inherit` prop. For example, highlight part of [Title](https://mantine.dev/core/title/):

#### Example: inherit

```tsx
import { Text, Title } from '@mantine/core';

function Demo() {
  return <Title order={3}>Title in which you want to <Text span c="blue" inherit>highlight</Text> something</Title>;
}
```


<Polymorphic defaultElement="p" changeToElement="a" component="Text" />

## Polymorphic component

Text is a polymorphic component – its default root element is p, but it can be changed to any other element or component with component prop:

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return <Text component="a" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, TextProps does not extend React.ComponentPropsWithoutRef<'p'> although p is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

## span prop

Use `span` prop as a shorthand for `component="span"`:

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text span>Same as below</Text>
      <Text component="span">Same as above</Text>
    </>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | @deprecated Use <code>c</code> prop instead |
| gradient | MantineGradient | - | Gradient configuration, ignored when <code>variant</code> is not <code>gradient</code> |
| inherit | boolean | - | Determines whether font properties should be inherited from the parent |
| inline | boolean | - | Sets <code>line-height</code> to 1 for centering |
| lineClamp | number | - | Number of lines after which Text will be truncated |
| size | MantineSize | (string & {}) | - | Controls <code>font-size</code> and <code>line-height</code> |
| span | boolean | - | Shorthand for <code>component="span"</code> |
| truncate | TextTruncate | - | Side on which Text must be truncated, if <code>true</code>, text is truncated from the start |


#### Styles API

Text component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Text selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Text-root | Root element |

**Text CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --text-fz | Controls `font-size` property |
| root | --text-lh | Controls `line-height` property |
| root | --text-gradient | Text fill gradient |
| root | --text-line-clamp | Number of lines that should be visible |

**Text data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-truncate | - | Value of  |
| root | data-line-clamp | - | - |
| root | data-inline | - | - |
| root | data-inherit | - | - |

**Textinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Textinput-wrapper | Root element of the Input |
| input | .mantine-Textinput-input | Input element |
| section | .mantine-Textinput-section | Left and right sections |
| root | .mantine-Textinput-root | Root element |
| label | .mantine-Textinput-label | Label element |
| required | .mantine-Textinput-required | Required asterisk element, rendered inside label |
| description | .mantine-Textinput-description | Description element |
| error | .mantine-Textinput-error | Error element |

**Textarea selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Textarea-wrapper | Root element of the Input |
| input | .mantine-Textarea-input | Input element |
| section | .mantine-Textarea-section | Left and right sections |
| root | .mantine-Textarea-root | Root element |
| label | .mantine-Textarea-label | Label element |
| required | .mantine-Textarea-required | Required asterisk element, rendered inside label |
| description | .mantine-Textarea-description | Description element |
| error | .mantine-Textarea-error | Error element |


--------------------------------------------------------------------------------

### Textarea
Package: @mantine/core
Import: import { Textarea } from '@mantine/core';
Description: Autosize or regular textarea

## Usage

<InputFeatures component="Textarea" element="textarea" />

Textarea component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all textarea element props. Textarea documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { Textarea } from '@mantine/core';


function Demo() {
  return (
    <Textarea
      
      placeholder="Input placeholder"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Textarea } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <Textarea
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## Autosize

Autosize textarea uses [react-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize) package.
Textarea height will grow until maxRows are reached or indefinitely if maxRows not set.

#### Example: autosize

```tsx
import { Textarea } from '@mantine/core';

function Demo() {
  return (
    <>
      <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        minRows={2}
      />

      <Textarea
        label="Autosize with 4 rows max"
        placeholder="Autosize with 4 rows max"
        autosize
        minRows={2}
        maxRows={4}
      />
    </>
  );
}
```


## Enable resize

By default, [resize](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) is `none`,
to enable it set `resize` prop to `vertical` or `both`:

#### Example: resize

```tsx
import { Textarea } from '@mantine/core';

function Demo() {
  return <Textarea resize="vertical" label="Disabled" placeholder="Your comment" />;
}
```


## Error state

#### Example: error

```tsx
import { Textarea } from '@mantine/core';

function Demo() {
  return (
    <>
      <Textarea label="Boolean error" placeholder="Boolean error" error />
      <Textarea
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { Textarea } from '@mantine/core';

function Demo() {
  return <Textarea label="Disabled" placeholder="Your comment" disabled />;
}
```


#### Example: stylesApi

```tsx
import { IconAt } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';

function Demo() {
  return (
    <Textarea
      label="Label"
      placeholder="Textarea"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      autosize
      
    />
  );
}
```


<GetElementRef component="Textarea" refType="textarea" />

## Get element ref

```tsx
import { useRef } from 'react';
import { Textarea } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return <Textarea ref={ref} />;
}
```

<InputAccessibility component="Textarea" />

## Accessibility

Textarea provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autosize | boolean | - | If set, enables textarea height growing with its content |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| maxRows | number | - | Maximum rows for autosize textarea to grow, ignored if <code>autosize</code> prop is not set |
| minRows | number | - | Minimum rows of autosize textarea, ignored if <code>autosize</code> prop is not set |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| resize | Resize | - | Controls <code>resize</code> CSS property |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

Textarea component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Textarea selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Textarea-wrapper | Root element of the Input |
| input | .mantine-Textarea-input | Input element |
| section | .mantine-Textarea-section | Left and right sections |
| root | .mantine-Textarea-root | Root element |
| label | .mantine-Textarea-label | Label element |
| required | .mantine-Textarea-required | Required asterisk element, rendered inside label |
| description | .mantine-Textarea-description | Description element |
| error | .mantine-Textarea-error | Error element |


--------------------------------------------------------------------------------

### ThemeIcon
Package: @mantine/core
Import: import { ThemeIcon } from '@mantine/core';
Description: Render icon inside element with theme colors

## Usage

#### Example: usage

```tsx
import { ThemeIcon } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

function Demo() {
  return (
    <ThemeIcon>
      <IconPhoto style={{ width: '70%', height: '70%' }} />
    </ThemeIcon>
  );
}
```


<Gradient component="ThemeIcon" />

## Gradient

ThemeIcon supports Mantine color format in color prop. Color can be specified as:
- Mantine color name (e.g., 'blue')
- CSS color value (e.g., '#fff', 'rgba(255, 255, 255, 0.8)')
- Gradient string (e.g., 'linear-gradient(45deg, blue, red)')

#### Example: gradient

```tsx
import { ThemeIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
    >
      <IconHeart />
    </ThemeIcon>
  );
}
```


## Customize variants colors

You can customize colors for `ThemeIcon` and other components variants by adding
[variantColorResolver](https://mantine.dev/theming/colors#colors-variant-resolver) to your theme.

#### Example: variantColorsResolver

```tsx
import { IconPhoto, IconFingerprint, IconError404 } from '@tabler/icons-react';
import {
  ThemeIcon,
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
        <ThemeIcon color="lime.4" variant="filled">
          <IconPhoto size={20} />
        </ThemeIcon>

        <ThemeIcon color="orange" variant="light">
          <IconFingerprint size={20} />
        </ThemeIcon>

        <ThemeIcon variant="danger">
          <IconError404 size={20} />
        </ThemeIcon>
      </Group>
    </MantineProvider>
  );
}
```


<AutoContrast component="ThemeIcon" />

## autoContrast

ThemeIcon supports autoContrast prop and [theme.autoContrast](https://mantine.dev/theming/theme-object/#autocontrast). If autoContrast is set either on ThemeIcon or on theme, content color will be adjusted to have sufficient contrast with the value specified in color prop.

Note that autoContrast feature works only if you use color prop to change background color. autoContrast works only with filled variant.

#### Example: autoContrast

```tsx
import { IconFingerprint } from '@tabler/icons-react';
import { ThemeIcon, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <IconFingerprint size={20} />
      </ThemeIcon>
    </Group>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Icon displayed inside the component |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color. |
| gradient | MantineGradient | - | Gradient data used when <code>variant="gradient"</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius. Numbers are converted to rem. |
| size | number | MantineSize | (string & {}) | - | Controls width and height of the button. Numbers are converted to rem. |


#### Styles API

ThemeIcon component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ThemeIcon selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ThemeIcon-root | Root element |

**ThemeIcon CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ti-bg | Controls `background` |
| root | --ti-bd | Controls `border` |
| root | --ti-color | Controls icon `color` |
| root | --ti-radius | Controls `border-radius` |
| root | --ti-size | Controls `width`, `height`, `min-width` and `min-height` styles |


--------------------------------------------------------------------------------

### Timeline
Package: @mantine/core
Import: import { Timeline } from '@mantine/core';
Description: Display list of events in chronological order

## Usage

#### Example: usage

```tsx
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';

function Demo() {
  return (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
        <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
        <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
        <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
        <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline>
  );
}
```


## Line and bullet props

Control timeline appearance with the following props:

* `active` – index of current active element, all elements before this index will be highlighted with `color`
* `color` – color from theme that should be used to highlight active items, defaults to `theme.primaryColor`
* `lineWidth` – controls line width and bullet border
* `bulletSize` – bullet width, height and border-radius
* `align` – defines line and bullets position relative to content, also sets text-align

#### Example: configurator

```tsx
import { Timeline } from '@mantine/core';

function Demo() {
  return (
    <Timeline>
      {/* items */}
    </Timeline>
  );
}
```


## Bullet as React node

#### Example: bullet

```tsx
import { ThemeIcon, Text, Avatar, Timeline } from '@mantine/core';
import { IconSun, IconVideo } from '@tabler/icons-react';

function Demo() {
  return (
    <Timeline bulletSize={24}>
      <Timeline.Item title="Default bullet">
        <Text c="dimmed" size="sm">
          Default bullet without anything
        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="Avatar"
        bullet={
          <Avatar
            size={22}
            radius="xl"
            src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
          />
        }
      >
        <Text c="dimmed" size="sm">
          Timeline bullet as avatar image
        </Text>
      </Timeline.Item>
      <Timeline.Item title="Icon" bullet={<IconSun size={13} />}>
        <Text c="dimmed" size="sm">
          Timeline bullet as icon
        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="ThemeIcon"
        bullet={
          <ThemeIcon
            size={22}
            variant="gradient"
            gradient={{ from: 'lime', to: 'cyan' }}
            radius="xl"
          >
            <IconVideo size={13} />
          </ThemeIcon>
        }
      >
        <Text c="dimmed" size="sm">
          Timeline bullet as ThemeIcon component
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
```


## Wrap Timeline.Item

`Timeline` component relies on `Timeline.Item` order. Wrapping `Timeline.Item` is not supported,
Instead you will need to use different approaches:

```tsx
import { Timeline } from '@mantine/core';

// This will not work, step children will not render
function WillNotWork() {
  return <Timeline.Item title="Nope">It will not work</Timeline.Item>;
}

// Create a separate component for children
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Timeline active={1}>
      <Timeline.Item title="Regular item">First item</Timeline.Item>
      <WillNotWork />
      <Timeline.Item title="Works as expected">
        <WillWork />
      </Timeline.Item>
      <Timeline.Item title="Regular item">Third item</Timeline.Item>
    </Timeline>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | number | - | Index of the active element |
| align | "left" | "right" | - | Position of content relative to the bullet |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| bulletSize | string | number | - | Size of the bullet |
| children | React.ReactNode | - | <code>Timeline.Item</code> components |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color to control active item colors |
| lineWidth | string | number | - | Control width of the line |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| reverseActive | boolean | - | If set, the active items direction is reversed without reversing items order |


#### Styles API

Timeline component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Timeline selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Timeline-root | Root element |
| item | .mantine-Timeline-item | Item root element |
| itemBody | .mantine-Timeline-itemBody | Item body, wraps title and content |
| itemTitle | .mantine-Timeline-itemTitle | Item title, controlled by title prop |
| itemContent | .mantine-Timeline-itemContent | Item content, controlled by children prop |
| itemBullet | .mantine-Timeline-itemBullet | Item bullet |

**Timeline CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --tl-bullet-size | Controls bullet `width` and `height` |
| root | --tl-color | Controls active bullet and line colors |
| root | --tl-icon-color | Controls icon color |
| root | --tl-line-width | Controls width of the line between bullets |
| root | --tl-radius | Controls bullet `border-radius` |


--------------------------------------------------------------------------------

### Title
Package: @mantine/core
Import: import { Title } from '@mantine/core';
Description: h1-h6 heading

## Usage

Use Title component to render h1-h6 headings with Mantine [theme](https://mantine.dev/theming/theme-object) styles.
By default, `Title` has no margins and paddings.
You can change `font-size`, `font-weight` and `line-height` per heading with [theme.headings](https://mantine.dev/theming/typography).

Set `order` prop to render a specific element (h1-h6), default order is `1`:

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


## Size

You can change Title `size` independent of its `order`:

* If you set size to `h1`-`h6`, then component will add corresponding `font-size` and `line-height` from the [theme](https://mantine.dev/theming/theme-object/)
* If you set size to any other value, then `line-height` will be calculated based on `order` – `size` will impact only `font-size`

#### Example: size

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={3} size="h1">
        H3 heading with h1 font-size
      </Title>
      <Title size="h4">H1 heading with h4 font-size</Title>
      <Title size={16}>H1 heading with 16px size</Title>
      <Title size="xs">H1 heading with xs size</Title>
    </>
  );
}
```


## Text wrap

Use `textWrap` prop to control [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
CSS property. It controls how text inside an element is wrapped.

#### Example: textWrap

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <Title order={3}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus inventore iusto
      cum dolore molestiae perspiciatis! Totam repudiandae impedit maxime!
    </Title>
  );
}
```


You can also set `textWrap` on [theme](https://mantine.dev/theming/theme-object):

```tsx
import { createTheme, MantineProvider, Title } from '@mantine/core';

const theme = createTheme({
  headings: {
    textWrap: 'wrap',
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Title>Some very long title that should wrap</Title>
    </MantineProvider>
  );
}
```

## Line clamp

Set `lineClamp` prop to truncate text after specified number of lines:

#### Example: lineClamp

```tsx
import { Title, Box } from '@mantine/core';

function Demo() {
  return (
    <Box maw={400}>
      <Title order={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?
      </Title>
    </Box>
  )
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| lineClamp | number | - | Number of lines after which heading will be truncated |
| order | TitleOrder | - | Heading order (1-6), controls <code>font-size</code> style if <code>size</code> prop is not set |
| size | TitleSize | - | Changes title size, if not set, then size is controlled by <code>order</code> prop |
| textWrap | "wrap" | "nowrap" | "balance" | "pretty" | "stable" | - | Heading <code>text-wrap</code> CSS property |


#### Styles API

Title component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Title selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Title-root | Root element |

**Title CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --title-fw | Title `font-weight`, by default value from `theme.headings` |
| root | --title-fz | Title `font-size`, by default value from `theme.headings` |
| root | --title-lh | Title `line-height`, by default value from `theme.headings` |
| root | --title-line-clamp | Controls `-webkit-line-clamp` css property |
| root | --title-text-wrap | Controls `text-wrap` css property |

**Title data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-order | - | Value of the  |
| root | data-line-clamp | - | - |


--------------------------------------------------------------------------------

### Tooltip
Package: @mantine/core
Import: import { Tooltip } from '@mantine/core';
Description: Renders tooltip at given element on mouse over or other event

## Usage

#### Example: usage

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Tooltip children

Tooltip requires an element or a component as a single child –
strings, fragments, numbers and multiple elements/components are not supported and **will throw error**.
Custom components must provide a prop to get root element ref,
all Mantine components support ref out of the box.

```tsx
import { Badge, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="OK">
        <button>Native button – ok</button>
      </Tooltip>

      <Tooltip label="OK">
        <Badge>Mantine component – ok</Badge>
      </Tooltip>

      <Tooltip label="Throws">
        Raw string, NOT OK – will throw error
      </Tooltip>

      {/* Number, NOT OK – will throw error */}
      <Tooltip label="Throws">{2}</Tooltip>

      <Tooltip label="Throws">
        <>Fragment, NOT OK, will throw error</>
      </Tooltip>

      <Tooltip label="Throws">
        <div>More that one node</div>
        <div>NOT OK, will throw error</div>
      </Tooltip>
    </>
  );
}
```

## Tooltip target

`target` prop is an alternative to `children`. It accepts a string (selector),
an HTML element or a ref object with HTML element. Use `target` prop when you do
not render tooltip target as JSX element.

Example of using `target` prop with a string selector:

#### Example: target

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="Tooltip over button" />
      <Button id="hover-me">Hover me to see tooltip</Button>
    </>
  );
}
```


## Required ref prop

Custom components that are rendered inside `Tooltip` are required to support `ref` prop:

```tsx
// Example of code that WILL NOT WORK
import { Tooltip } from '@mantine/core';

function MyComponent() {
  return <div>My component</div>;
}

// This will not work – MyComponent does not support ref
function Demo() {
  return (
    <Tooltip label="Does not work">
      <MyComponent />
    </Tooltip>
  );
}
```

Use `forwardRef` function to forward ref to root element:

```tsx
// Example of code that will work
import { forwardRef } from 'react';
import { Tooltip } from '@mantine/core';

const MyComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props}>
    My component
  </div>
));

// Works correctly – ref is forwarded
function Demo() {
  return (
    <Tooltip label="Works fine">
      <MyComponent />
    </Tooltip>
  );
}
```

## Color

#### Example: configurator

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>With tooltip</Button>
    </Tooltip>
  );
}
```


## Offset

Set `offset` prop to a number to change tooltip position relative to the target element.
This way you can control tooltip offset on main axis only.

#### Example: offset

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip" opened>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


To control offset on both axis, pass object with `mainAxis` and `crossAxis` properties:

#### Example: offsetAxis

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      position="bottom"
      opened
      label="Tooltip"
      offset={{ mainAxis: , crossAxis:  }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Arrow

Set `withArrow` prop to add an arrow to the tooltip. Arrow is a `div` element rotated with `transform: rotate(45deg)`.

`arrowPosition` prop determines how arrow is position relative to the target element when `position` is set to `*-start` and `*-end` values on `Popover` component.
By default, the value is `center` – the arrow is positioned in the center of the target element if it is possible.

If you change `arrowPosition` to `side`, then the arrow will be positioned on the side of the target element,
and you will be able to control arrow offset with `arrowOffset` prop. Note that when `arrowPosition` is set to `center`,
`arrowOffset` prop is ignored.

#### Example: arrow

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip" withArrow opened position="top-start">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Controlled

#### Example: controlled

```tsx
import { useState } from 'react';
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(true);

  return (
    <Tooltip label="Ctrl + J" opened={opened}>
      <Button onClick={() => setOpened((o) => !o)}>
        Toggle color scheme
      </Button>
    </Tooltip>
  );
}
```


## Change events

Events that trigger tooltip can be changed with `events` prop, it accepts an object
with the following properties that determine which events will trigger tooltip:

* `hover` – mouse hover event, `true` by default
* `focus` – focus/blur events excluding clicks on the target element, `false` by default
* `touch` – events for touchscreen devices, `false` by default

```tsx
import { Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      label="Tooltip"
      events={{ hover: true, focus: true, touch: false }}
    >
      <button>target</button>
    </Tooltip>
  );
}
```

## Multiline

To enable multiline mode, set `multiline` prop to enable line breaks and `w` [style prop](https://mantine.dev/styles/style-props) to set tooltip width:

#### Example: multiline

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      multiline
      w={220}
      withArrow
      transitionProps={{ duration: 200 }}
      label="Use this button to save this information in your profile, after that you will be able to access it any time and share it via email."
    >
      <Button>Multiline tooltip</Button>
    </Tooltip>
  );
}
```


## Inline

Set `inline` prop to use `Tooltip` with inline elements:

#### Example: inline

```tsx
import { Tooltip, Mark, Text } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Stantler’s magnificent antlers were traded at high prices as works of art. As a result, this
      Pokémon was hunted close to extinction by those who were after the priceless antlers.{' '}
      <Tooltip inline label="Inline tooltip">
        <Mark>When visiting a junkyard</Mark>
      </Tooltip>
      , you may catch sight of it having an intense fight with Murkrow over shiny objects.Ho-Oh’s
      feathers glow in seven colors depending on the angle at which they are struck by light. These
      feathers are said to bring happiness to the bearers. This Pokémon is said to live at the foot
      of a rainbow.
    </Text>
  );
}
```


## Change transition

Tooltip is built with [Transition](https://mantine.dev/core/transition/) component, it supports `transitionProps` props:

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      label="Tooltip with custom transition"
      transitionProps={{ transition: 'skew-up', duration: 300 }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```

All available premade transitions:

#### Example: transitions

```tsx
function Demo() {
  const transitions = keys(MANTINE_TRANSITIONS).map((transition) => (
    <Tooltip key={transition} label={transition} transitionProps={{ transition, duration: 300 }}>
      <Badge variant="light">{transition}</Badge>
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}
```


## Close and open delay

You can delay tooltip open/close events by setting `openDelay` and `closeDelay` props in ms:

#### Example: delay

```tsx
import { Button, Tooltip, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Tooltip label="Opened after 500ms" openDelay={500}>
        <Button>Delay open - 500ms</Button>
      </Tooltip>
      <Tooltip label="Closes after 500ms" closeDelay={500}>
        <Button>Delay close - 500ms</Button>
      </Tooltip>
    </Group>
  );
}
```


## Tooltip delay group

`Tooltip.Group` component can be used to sync open and close delays for multiple tooltips:

#### Example: group

```tsx
import { Tooltip, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="Tooltip 1">
          <Button>Button 1</Button>
        </Tooltip>
        <Tooltip label="Tooltip 2">
          <Button>Button 2</Button>
        </Tooltip>
        <Tooltip label="Tooltip 3">
          <Button>Button 3</Button>
        </Tooltip>
      </Group>
    </Tooltip.Group>
  );
}
```


## Floating tooltip

`Tooltip.Floating` component has the same API as Tooltip component but tooltip will follow mouse:

#### Example: floating

```tsx
import { Box, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Floating label="Floating tooltip">
      <Box p="xl" bg="var(--mantine-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}
```


## Custom components with Tooltip

If you want to build a component that can be used with Tooltip use
[forwardRef](https://reactjs.org/docs/forwarding-refs.html) or other prop that will allow to get root element ref.
This logic is applied to Tooltip and Tooltip.Floating components:

```tsx
import { forwardRef } from 'react';
import { Tooltip } from '@mantine/core';

// forwardRef function will allow to get root element ref
const MyBadge = forwardRef<HTMLDivElement, { color: string }>(
  ({ color }, ref) => (
    <div ref={ref} color={color}>
      Badge
    </div>
  )
);

// other props can also be used
function MyOtherBadge({
  color,
  innerRef,
}: {
  color: string;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div ref={innerRef} color={color}>
      Badge
    </div>
  );
}

function Demo() {
  return (
    <>
      <Tooltip label="Can be used as is">
        <MyBadge color="red" />
      </Tooltip>

      <Tooltip label="refProp is required" refProp="innerRef">
        <MyOtherBadge color="orange" />
      </Tooltip>
    </>
  );
}
```

## Accessibility

Tooltip follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices/#tooltip):

* Tooltip body has `role="tooltip"` attribute
* Target element has `aria-describedby` attribute
* `Tooltip.Floating` is ignored by screen readers

By default, Tooltip is not triggered by focus events and thus users who use a screen reader
or navigate with keyboard will not be able to get tooltip content. Set `events` prop to enable
focus/blur tooltip events:

```tsx
import { Button, Tooltip } from '@mantine/core';

// Tooltip will be visible for screen readers
function Demo() {
  return (
    <Tooltip
      label="Tooltip"
      events={{ hover: true, focus: true, touch: false }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | ArrowPosition | - | Arrow position relative to the tooltip |
| arrowRadius | number | - | Arrow <code>border-radius</code> in px |
| arrowSize | number | - | Arrow size in px |
| autoContrast | boolean | - | If set, adjusts text color based on background color for <code>filled</code> variant |
| children | React.ReactNode | - | Target element, must support <code>ref</code> prop and <code>...others</code> |
| closeDelay | number | - | Close delay in ms |
| color | MantineColor | - | Key of <code>theme.colors</code> or any valid CSS color, controls tooltip background, by default set based on current color scheme |
| defaultOpened | boolean | - | Uncontrolled tooltip initial opened state |
| disabled | boolean | - | If set, tooltip element will not be rendered |
| events | { hover: boolean; focus: boolean; touch: boolean; } | - | Determines which events will be used to show tooltip |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| inline | boolean | - | Must be set if the tooltip target is an inline element |
| keepMounted | boolean | - | If set, the tooltip is not unmounted from the DOM when hidden, <code>display: none</code> styles are applied instead |
| label | React.ReactNode | required | Tooltip content |
| middlewares | TooltipMiddlewares | - | Floating ui middlewares to configure position handling, <code>{ flip: true, shift: true, inline: false }</code> by default |
| multiline | boolean | - | Determines whether content should be wrapped on to the next line, <code>false</code> by default |
| offset | number | FloatingAxesOffsets | - | Space between target element and tooltip in px |
| onPositionChange | (position: FloatingPosition) => void | - | Called when tooltip position changes |
| openDelay | number | - | Open delay in ms |
| opened | boolean | - | Controlled opened state |
| portalProps | Omit<BasePortalProps, "withinPortal"> | - | Props to pass down to the portal when withinPortal is true |
| position | FloatingPosition | - | Tooltip position relative to target element (<code>Tooltip</code> component) or mouse (<code>Tooltip.Floating</code> component) |
| positionDependencies | any[] | - | @deprecated : Do not use, will be removed in 9.0 |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set border-radius, numbers are converted to rem@default <code>theme.defaultRadius</code> |
| refProp | string | - | Key of the prop that can be used to access element ref, <code>ref</code> by default |
| target | string | HTMLElement | RefObject<HTMLElement | null> | null | - | Selector, ref of an element or element itself that should be used for positioning |
| transitionProps | TransitionProps | - | Props passed down to the <code>Transition</code> component that used to animate tooltip presence, use to configure duration and animation type |
| withArrow | boolean | - | If set, the tooltip has an arrow |
| withinPortal | boolean | - | Determines whether tooltip should be rendered within <code>Portal</code>, <code>true</code> by default |
| zIndex | string | number | - | Tooltip z-index, <code>300</code> by default |


#### Styles API

Tooltip component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tooltip selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| tooltip | .mantine-Tooltip-tooltip | Root element |
| arrow | .mantine-Tooltip-arrow | Tooltip arrow, rendered inside tooltip |

**Tooltip CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| tooltip | --tooltip-bg | Tooltip `background-color` |
| tooltip | --tooltip-radius | Tooltip `border-radius` |
| tooltip | --tooltip-color | Controls tooltip text color |

**Tooltip data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| tooltip | data-multiline | - | - |


--------------------------------------------------------------------------------

### Transition
Package: @mantine/core
Import: import { Transition } from '@mantine/core';
Description: Animate presence of component with pre-made animations

## Premade transitions

Mantine includes several premade transitions:

#### Example: transitions

```tsx
function Demo() {
  const transitions = keys(MANTINE_TRANSITIONS).map((transition) => (
    <Tooltip key={transition} label={transition} transitionProps={{ transition, duration: 300 }}>
      <Badge variant="light">{transition}</Badge>
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}
```


To use one of them set `transition` property to one of these values:

```tsx
import { Transition } from '@mantine/core';

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>Your modal</div>}
    </Transition>
  );
}
```

## Custom transitions

You can create your own transition. `transition` is an object with 4 properties:

* `in` – styles for mounted state
* `out` – styles for unmounted state
* `common` (optional) – styles for both mounted and unmounted states
* `transitionProperty` – properties which participate in transition

#### Example: custom

```tsx
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { Transition, Paper, Button, Box } from '@mantine/core';

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

function Demo() {
  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

  return (
    <Box
      maw={200}
      pos="relative"
      style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
    >
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>
      <Transition
        mounted={opened}
        transition={scaleY}
        duration={200}
        timingFunction="ease"
        keepMounted
      >
        {(transitionStyle) => (
          <Paper
            shadow="md"
            p="xl"
            h={120}
            pos="absolute"
            top={0}
            left={0}
            right={0}
            ref={clickOutsideRef}
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            Dropdown
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
```


## Enter and exit delay

Use `enterDelay` and `exitDelay` props to delay transition start. Values are in milliseconds:

#### Example: delay

```tsx
import { useState } from 'react';
import { Button, Flex, Paper, Transition } from '@mantine/core';

export function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <Flex maw={200} pos="relative" justify="center" m="auto">
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      <Transition mounted={opened} transition="pop" enterDelay={500} exitDelay={300}>
        {(transitionStyle) => (
          <Paper
            shadow="md"
            p="xl"
            h={120}
            pos="absolute"
            inset={0}
            bottom="auto"
            onClick={() => setOpened(false)}
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            Click to close
          </Paper>
        )}
      </Transition>
    </Flex>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | (styles: CSSProperties) => Element | required | Render function with transition styles argument |
| duration | number | - | Transition duration in ms |
| enterDelay | number | - | Delay in ms before enter transition starts |
| exitDelay | number | - | Delay in ms before exit transition starts |
| exitDuration | number | - | Exit transition duration in ms |
| keepMounted | boolean | - | If set, the element is not unmounted from the DOM when hidden, <code>display: none</code> styles are applied instead |
| mounted | boolean | required | Determines whether component should be mounted to the DOM |
| onEnter | () => void | - | Called when enter transition starts |
| onEntered | () => void | - | Called when enter transition ends |
| onExit | () => void | - | Called when exit transition starts |
| onExited | () => void | - | Called when exit transition ends |
| timingFunction | string | - | Transition timing function |
| transition | MantineTransition | - | Transition name or object |


--------------------------------------------------------------------------------

### Tree
Package: @mantine/core
Import: import { Tree } from '@mantine/core';
Description: Display a Tree structure

## Usage

`Tree` component is used to display hierarchical data. `Tree` component
has minimal styling by default, you can customize styles with [Styles API](https://mantine.dev/styles/styles-api).

#### Example: usage

```tsx
import { Tree } from '@mantine/core';
import { data } from './data';

function Demo() {
  return <Tree data={data} />;
}
```


## Data prop

Data passed to the `data` prop should follow these rules:

* Data must be a stable reference (memoized)
* Data must be an array
* Each item in the array represents a node in the tree
* Each node must be an object with `value` and `label` keys
* Each node can have `children` key with an array of child nodes
* The `value` of each node must be unique

Valid data example:

```tsx
// ✅ Valid data, all values are unique
const data = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

Invalid data example:

```tsx
// ❌ Invalid data, values are not unique (components is used twice)
const data = [
  {
    value: 'src',
    label: 'src',
    children: [{ value: 'components', label: 'components' }],
  },
  { value: 'components', label: 'components' },
];
```

## Data type

You can import `TreeNodeData` type to define data type for your tree:

```tsx
import { TreeNodeData } from '@mantine/core';

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

## renderNode

Use `renderNode` prop to customize node rendering.
`renderNode` function receives an object with the following properties as a single argument:

```tsx
export interface RenderTreeNodePayload {
  /** Node level in the tree */
  level: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  expanded: boolean;

  /** `true` if the node has non-empty `children` array */
  hasChildren: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** Node data from the `data` prop of `Tree` */
  node: TreeNodeData;

  /** Tree controller instance, return value of `useTree` hook */
  tree: TreeController;

  /** Props to spread into the root node element */
  elementProps: {
    className: string;
    style: React.CSSProperties;
    onClick: (event: React.MouseEvent) => void;
    'data-selected': boolean | undefined;
    'data-value': string;
    'data-hovered': boolean | undefined;
  };
}
```

#### Example: renderNode

```tsx
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree } from '@mantine/core';
import { data } from './data';

function Demo() {
  return (
    <Tree
      data={data}
      levelOffset={23}
      renderNode={({ node, expanded, hasChildren, elementProps }) => (
        <Group gap={5} {...elementProps}>
          {hasChildren && (
            <IconChevronDown
              size={18}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          )}

          <span>{node.label}</span>
        </Group>
      )}
    />
  );
}
```


## useTree hook

`useTree` hook can be used to control selected and expanded state of the tree.

The hook accepts an object with the following properties:

```tsx
export interface UseTreeInput {
  /** Initial expanded state of all nodes */
  initialExpandedState?: Record<string, boolean>;

  /** Initial selected state of nodes */
  initialSelectedState?: string[];

  /** Initial checked state of nodes */
  initialCheckedState?: string[];

  /** Determines whether multiple node can be selected at a time */
  multiple?: boolean;

  /** Called with the node value when it is expanded */
  onNodeExpand?: (value: string) => void;

  /** Called with the node value when it is collapsed */
  onNodeCollapse?: (value: string) => void;
}
```

And returns an object with the following properties:

```tsx
export interface UseTreeReturnType {
  /** Determines whether multiple node can be selected at a time */
  multiple: boolean;

  /** A record of `node.value` and boolean values that represent nodes expanded state */
  expandedState: TreeExpandedState;

  /** An array of selected nodes values */
  selectedState: string[];

  /** An array of checked nodes values */
  checkedState: string[];

  /** A value of the node that was last clicked
   * Anchor node is used to determine range of selected nodes for multiple selection
   */
  anchorNode: string | null;

  /** Initializes tree state based on provided data, called automatically by the Tree component */
  initialize: (data: TreeNodeData[]) => void;

  /** Toggles expanded state of the node with provided value */
  toggleExpanded: (value: string) => void;

  /** Collapses node with provided value */
  collapse: (value: string) => void;

  /** Expands node with provided value */
  expand: (value: string) => void;

  /** Expands all nodes */
  expandAllNodes: () => void;

  /** Collapses all nodes */
  collapseAllNodes: () => void;

  /** Sets expanded state */
  setExpandedState: React.Dispatch<
    React.SetStateAction<TreeExpandedState>
  >;

  /** Toggles selected state of the node with provided value */
  toggleSelected: (value: string) => void;

  /** Selects node with provided value */
  select: (value: string) => void;

  /** Deselects node with provided value */
  deselect: (value: string) => void;

  /** Clears selected state */
  clearSelected: () => void;

  /** Sets selected state */
  setSelectedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** A value of the node that is currently hovered */
  hoveredNode: string | null;

  /** Sets hovered node */
  setHoveredNode: React.Dispatch<React.SetStateAction<string | null>>;

  /** Checks node with provided value */
  checkNode: (value: string) => void;

  /** Unchecks node with provided value */
  uncheckNode: (value: string) => void;

  /** Checks all nodes */
  checkAllNodes: () => void;

  /** Unchecks all nodes */
  uncheckAllNodes: () => void;

  /** Sets checked state */
  setCheckedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** Returns all checked nodes with status */
  getCheckedNodes: () => CheckedNodeStatus[];

  /** Returns `true` if node with provided value is checked */
  isNodeChecked: (value: string) => boolean;

  /** Returns `true` if node with provided value is indeterminate */
  isNodeIndeterminate: (value: string) => boolean;
}
```

You can pass the value returned by the `useTree` hook to the `tree` prop of the `Tree` component
to control tree state:

#### Example: controller

```tsx
import { Button, Group, Tree, useTree } from '@mantine/core';
import { data } from './data';

function Demo() {
  const tree = useTree();

  return (
    <>
      <Tree data={data} tree={tree} />
      <Group mt="md">
        <Button onClick={() => tree.expandAllNodes()}>Expand all</Button>
        <Button onClick={() => tree.collapseAllNodes()}>Collapse all</Button>
      </Group>
    </>
  );
}
```


## Checked state

`Tree` can be used to display checked state with checkboxes.
To implement checked state, you need to render `Checkbox.Indicator` in the `renderNode` function:

#### Example: checked

```tsx
import { IconChevronDown } from '@tabler/icons-react';
import { Checkbox, Group, RenderTreeNodePayload, Tree } from '@mantine/core';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  return <Tree data={data} levelOffset={23} expandOnClick={false} renderNode={renderTreeNode} />;
}
```


To check/uncheck nodes, use `checkAllNodes` and `uncheckAllNodes` functions:

#### Example: checkAllNodes

```tsx
import { IconChevronDown } from '@tabler/icons-react';
import {
  Button,
  Checkbox,
  getTreeExpandedState,
  Group,
  RenderTreeNodePayload,
  Tree,
  useTree,
} from '@mantine/core';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, '*'),
    initialCheckedState: [
      'node_modules',
      'node_modules/@mantine/core/index.d.ts',
      'node_modules/@mantine/form/package.json',
    ],
  });

  return (
    <>
      <Group mb="md">
        <Button onClick={() => tree.checkAllNodes()}>Check all</Button>
        <Button onClick={() => tree.uncheckAllNodes()}>Uncheck all</Button>
      </Group>

      <Tree
        tree={tree}
        data={data}
        levelOffset={23}
        expandOnClick={false}
        renderNode={renderTreeNode}
      />
    </>
  );
}
```


## Initial expanded state

Expanded state is an object of `node.value` and boolean values that represent nodes expanded state.
To change initial expanded state, pass `initialExpandedState` to the `useTree` hook.
To generate expanded state from data with expanded nodes, you can use `getTreeExpandedState` function:
it accepts data and an array of expanded nodes values and returns expanded state object.

If `'*'` is passed as the second argument to `getTreeExpandedState`, all nodes will be expanded:

```tsx
import { getTreeExpandedState } from '@mantine/core';

// Expand two given nodes
getTreeExpandedState(data, ['src', 'src/components']);

// Expand all nodes
getTreeExpandedState(data, '*');
```

#### Example: expandedState

```tsx
import { getTreeExpandedState, Tree, useTree } from '@mantine/core';
import { data } from './data';

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, ['src', 'src/components']),
  });

  return <Tree data={data} tree={tree} />;
}
```


## Example: files tree

#### Example: files

```tsx
import { IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { Group, RenderTreeNodePayload, Tree } from '@mantine/core';
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from '@mantinex/dev-icons';
import { data, dataCode } from './data';
import classes from './Demo.module.css';

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith('package.json')) {
    return <NpmIcon size={14} />;
  }

  if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('tsconfig.json')) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <IconFolderOpen color="var(--mantine-color-yellow-9)" size={14} stroke={2.5} />
    ) : (
      <IconFolder color="var(--mantine-color-yellow-9)" size={14} stroke={2.5} />
    );
  }

  return null;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowRangeSelection | boolean | - | If set, tree nodes range can be selected with click when <code>Shift</code> key is pressed |
| checkOnSpace | boolean | - | If set, tree node is checked on space key press |
| clearSelectionOnOutsideClick | boolean | - | If set, selection is cleared when user clicks outside of the tree |
| data | TreeNodeData[] | required | Data used to render nodes |
| expandOnClick | boolean | - | If set, tree node with children is expanded on click |
| expandOnSpace | boolean | - | If set, tree node with children is expanded on space key press |
| levelOffset | MantineSpacing | - | Horizontal padding of each subtree level, key of <code>theme.spacing</code> or any valid CSS value |
| renderNode | RenderNode | - | A function to render tree node label |
| selectOnClick | boolean | - | If set, tree node is selected on click |
| tree | UseTreeReturnType | - | Use-tree hook instance that can be used to manipulate component state |


#### Styles API

Tree component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tree selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tree-root | Root element |
| node | .mantine-Tree-node | Node element (li), contains label and subtree elements |
| subtree | .mantine-Tree-subtree | Subtree element (ul) |
| label | .mantine-Tree-label | Node label |

**Tree CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --level-offset | Controls offset of nested tree levels |


--------------------------------------------------------------------------------

### Typography
Package: @mantine/core
Import: import { Typography } from '@mantine/core';
Description: Styles provider for html content

## Usage

Mantine does not include typography global styles.
Use `Typography` to add typography styles to your html content:

```tsx
import { Typography } from '@mantine/core';

function Demo() {
  return (
    <Typography>
      <div
        dangerouslySetInnerHTML={{ __html: '<p>Your html here</p>' }}
      />
    </Typography>
  );
}
```

## Example

#### Example: usage

```tsx
import { Typography } from '@mantine/core';

const html = '...html content here...';

function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
```


## All styles demo

`Typography` includes styles for:

* paragraphs
* headings
* lists
* blockquotes
* tables
* links
* images
* hr
* kbd
* code and pre

#### Example: all

```tsx
function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
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

### UnstyledButton
Package: @mantine/core
Import: import { UnstyledButton } from '@mantine/core';
Description: Unstyled polymorphic button

## Usage

`UnstyledButton` resets default button styles, it is used as a
base for all other button components. You can use it to as a base for custom
polymorphic buttons.

#### Example: usage

```tsx
import { UnstyledButton } from '@mantine/core';

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}
```


<Polymorphic defaultElement="button" changeToElement="a" component="UnstyledButton" />

## Polymorphic component

UnstyledButton is a polymorphic component – its default root element is button, but it can be changed to any other element or component with component prop:

```tsx
import { UnstyledButton } from '@mantine/core';

function Demo() {
  return <UnstyledButton component="a" />;
}
```

**Polymorphic components with TypeScript**

Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element. For example, UnstyledButtonProps does not extend React.ComponentPropsWithoutRef<'button'> although button is the default element.

If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your component props interface should extend HTML element props.

<GetElementRef component="UnstyledButton" refType="button" />

## Get element ref

```tsx
import { useRef } from 'react';
import { UnstyledButton } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <UnstyledButton ref={ref} />;
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | string | number | - | Size passed from parent component, sets <code>data-size</code> if value is not number like |


#### Styles API

UnstyledButton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**UnstyledButton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-UnstyledButton-root | Root element |


--------------------------------------------------------------------------------

### VisuallyHidden
Package: @mantine/core
Import: import { VisuallyHidden } from '@mantine/core';
Description: Hide element visually but keep it accessible for screen readers

## Usage

`VisuallyHidden` is a utility component that hides content visually but leaves it available to screen readers.

For example, it can be used with [ActionIcon](https://mantine.dev/core/action-icon) component:

```tsx
import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <ActionIcon>
      <IconHeart />
      <VisuallyHidden>Like post</VisuallyHidden>
    </ActionIcon>
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|


--------------------------------------------------------------------------------

