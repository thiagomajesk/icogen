# HOOKS COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## HOOKS COMPONENTS AND FEATURES
Primary Package: @mantine/hooks

### HooksPackage
Package: @mantine/hooks
Import: import { HooksPackage } from '@mantine/hooks';

# Mantine hooks

[![npm](https://img.shields.io/npm/dm/@mantine/hooks)](https://www.npmjs.com/package/@mantine/hooks)

[@mantine/hooks](https://www.npmjs.com/package/@mantine/hooks) package
provides more than 70 hooks to build custom components. `@mantine/hooks`
package is used internally in most of other `@mantine/*` packages –
it is required to be installed in your project to use Mantine components.

## Installation

```bash
yarn add @mantine/hooks
```

```bash
npm install @mantine/hooks
```

## Usage

`@mantine/hooks` package can be used in any web React application, state
management hooks (like [use-pagination](https://mantine.dev/hooks/use-pagination) or [use-queue](https://mantine.dev/hooks/use-queue))
are also compatible with React Native. The package can be used even if you
do not use Mantine components or other Mantine libraries – it is standalone
and does not have any dependencies except React.

Example of using [use-move](https://mantine.dev/hooks/use-move) hook to create a custom slider:

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


## License

MIT


--------------------------------------------------------------------------------

### useClickOutside
Package: @mantine/hooks
Import: import { UseClickOutside } from '@mantine/hooks';

## Usage



## API

`use-click-outside` hook accepts 3 arguments:

* `handler` – function that is called on outside click
* `events` – optional list of events that trigger outside click, `['mousedown', 'touchstart']` by default
* `nodes` - optional list of nodes that should not trigger outside click event

The hook returns a `ref` object that must be passed to the element
based on which outside clicks should be captured.

```tsx
import { useClickOutside } from '@mantine/hooks';

function Example() {
  const handleClickOutside = () =>
    console.log('Clicked outside of div');
  const ref = useClickOutside(handleClickOutside);
  return <div ref={ref} />;
}
```

## Change events

By default, `use-click-outside` listens to `mousedown` and `touchstart` events,
you can change these events by passing an array of events as second argument:



## Multiple nodes

```tsx
// Will work only with useState, not useRef
import { useState } from 'react';
import { Portal } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(
    null
  );
  const [control, setControl] = useState<HTMLDivElement | null>(null);

  useClickOutside(() => console.log('outside'), null, [
    control,
    dropdown,
  ]);

  return (
    // We cannot use root element ref as it does not contain dropdown
    <div>
      <div ref={setControl}>Control</div>
      <Portal>
        <div ref={setDropdown}>Dropdown</div>
      </Portal>
    </div>
  );
}
```

## Set ref type

```tsx
import { useClickOutside } from '@mantine/hooks';

const ref = useClickOutside<HTMLDivElement>(() =>
  console.log('Click outside')
);
```

## Definition

```tsx
function useClickOutside<T extends HTMLElement = any>(
  handler: () => void,
  events?: string[] | null,
  nodes?: HTMLElement[]
): React.RefObject<T>;
```


--------------------------------------------------------------------------------

### useClipboard
Package: @mantine/hooks
Import: import { UseClipboard } from '@mantine/hooks';

## Usage

`use-clipboard` hook provides a simple way to copy text to the clipboard,
track the copied state, handle errors, and reset the state after a given timeout.
It uses [navigator.clipboard.writeText](https://caniuse.com/mdn-api_clipboard_writetext) API under the hood.



## Limitations

Due to security reasons `use-clipboard` hook will not work in iframes and may not work with local files opened with `file://` protocol
(hook will work fine with local websites that are using `http://` protocol). You can learn more about `navigator.clipboard` [here](https://web.dev/async-clipboard/).

## Definition

```tsx
interface UseClipboardOptions {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

interface UseClipboardReturnValue {
  /** Function to copy value to clipboard */
  copy: (value: any) => void;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

function useClipboard(options?: UseClipboardOptions): UseClipboardReturnValue
```

## Exported types

`UseClipboardOptions` and `UseClipboardReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseClipboardOptions, UseClipboardReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useColorScheme
Package: @mantine/hooks
Import: import { UseColorScheme } from '@mantine/hooks';

## Usage

`use-color-scheme` hook returns preferred OS color scheme value (`dark` or `light`)
and subscribes to changes:



## Limitations

`use-color-scheme` uses [use-media-query](https://mantine.dev/hooks/use-media-query/) under the hood.
It relies on `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and always returns the specified initial value (first argument, `light` by default)
if the API is not available (for example, during the server-side rendering).

```tsx
// returns 'dark' on server side
// returns computed value on client side after mount
const colorScheme = useColorScheme('dark');
```

## Get initial value in effect

By default, to support server-side rendering, `use-color-scheme` does not
calculate the initial value on the first render during state initialization.
Instead, the value is calculated in `useEffect` and updated after the parent
component mounts.

If your application does not have server-side rendering, you can enable
immediate calculation of the initial value by changing `getInitialValueInEffect` option:

```tsx
const colorScheme = useColorScheme('light', { getInitialValueInEffect: true });
```

## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type UseColorSchemeValue = 'dark' | 'light';

function useColorScheme(
  initialValue?: UseColorSchemeValue,
  options?: UseMediaQueryOptions,
): UseColorSchemeValue
```

## Exported types

`UseColorSchemeValue` and `UseMediaQueryOptions` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseColorSchemeValue, UseMediaQueryOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useCounter
Package: @mantine/hooks
Import: import { UseCounter } from '@mantine/hooks';

## Usage



## Definition

```tsx
interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterHandlers {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

type UseCounterReturnValue = [number, UseCounterHandlers];

function useCounter(
  initialValue?: number,
  options?: UseCounterOptions,
): UseCounterReturnValue
```

## Exported types

`UseCounterOptions`, `UseCounterHandlers` and `UseCounterReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseCounterOptions, UseCounterHandlers, UseCounterReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedCallback
Package: @mantine/hooks
Import: import { UseDebouncedCallback } from '@mantine/hooks';

## Usage

`use-debounced-callback` creates a debounced version of the given function,
delaying its execution until a specified time has elapsed since the last invocation.



## flushOnUnmount option

By default, the callback is not fired when the component unmounts.
If you want to execute the pending callback before the component unmounts,
set `flushOnUnmount: true`:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(
  () => console.log('Hello'),
  { delay: 1000, flushOnUnmount: true },
);
```

## Flush debounced callback

You can call the `flush` method to execute the debounced callback immediately:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(() => console.log('Hello'), 1000);

callback.flush(); // immediately executes the pending callback
```

## Definition

```tsx
interface UseDebouncedCallbackOptions {
  delay: number;
  flushOnUnmount?: boolean;
}

type UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => void) & { flush: () => void };

function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delayOrOptions: number | UseDebouncedCallbackOptions
): UseDebouncedCallbackReturnValue<T>
```

## Exported types

`UseDebouncedCallbackOptions` and `UseDebouncedCallbackReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseDebouncedCallbackOptions, UseDebouncedCallbackReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedState
Package: @mantine/hooks
Import: import { UseDebouncedState } from '@mantine/hooks';

## Usage

`use-debounced-state` hook debounces value changes.
This can be useful in case you want to perform a heavy operation based on react state,
for example, send search request. Unlike [use-debounced-value](https://mantine.dev/hooks/use-debounced-value/) it
is designed to work with uncontrolled components.



## Differences from use-debounce-value

* You do not have direct access to the non-debounced value.
* It is used for uncontrolled inputs (`defaultValue` prop instead of `value`), for example does not render with every state change like a character typed in an input.
* It does not work with custom state providers or props, and it uses `useState` internally.

## Leading update

You can immediately update value with first call with `{ leading: true }` options:



## Definition

```tsx
interface UseDebouncedStateOptions {
  leading?: boolean;
}

type UseDebouncedStateReturnValue<T> = [T, (newValue: SetStateAction<T>) => void];

function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options?: UseDebouncedStateOptions,
): UseDebouncedStateReturnValue<T>
```

## Exported types

`UseDebouncedStateOptions` and `UseDebouncedStateReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseDebouncedStateOptions, UseDebouncedStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedValue
Package: @mantine/hooks
Import: import { UseDebouncedValue } from '@mantine/hooks';

## Usage

`use-debounced-value` hook debounces value changes.
This can be useful in case you want to perform a heavy operation based on react state,
for example, send search request. Unlike [use-debounced-state](https://mantine.dev/hooks/use-debounced-state/) it
is designed to work with controlled components.



## Differences from use-debounced-state

* You have direct access to the non-debounced value.
* It is used for controlled inputs (`value` prop instead of `defaultValue`), for example renders on every state change like a character typed in an input.
* It works with props or other state providers, and it does not force use of `useState`.

## Leading update

You can immediately update value with first call with `{ leading: true }` options:



## Cancel update

Hook provides `cancel` callback, you can use it to cancel update.
Update cancels automatically on component unmount.

In this example, type in some text and click the cancel button
within a second to cancel debounced value change:



## Definition

```tsx
interface UseDebouncedValueOptions {
  leading?: boolean;
}

type UseDebouncedValueReturnValue<T> = [T, () => void];

function useDebouncedValue<T = any>(
  value: T,
  wait: number,
  options?: UseDebouncedValueOptions,
): UseDebouncedValueReturnValue<T>
```

## Exported types

`UseDebouncedValueOptions` and `UseDebouncedValueReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseDebouncedValueOptions, UseDebouncedValueReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDidUpdate
Package: @mantine/hooks
Import: import { UseDidUpdate } from '@mantine/hooks';

## Usage

`use-did-update` hook works the same way as `useEffect` but it is not called when component is mounted:

```tsx
import { useDidUpdate } from '@mantine/hooks';

function Demo() {
  useDidUpdate(
    () => console.log("Will not be called when mounted"),
    [dependency1, dependency2]
  );
}
```

## Definition

```tsx
function useDidUpdate(fn: React.EffectCallback, dependencies?: any[]): void;
```


--------------------------------------------------------------------------------

### useDisclosure
Package: @mantine/hooks
Import: import { UseDisclosure } from '@mantine/hooks';

## Usage

`use-disclosure` hook manages boolean state. It provides `open`, `close` and `toggle` handlers
and accepts optional `onOpen` and `onClose` callbacks. You can use it to manage controlled modals,
popovers and other similar components:

```tsx
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false);

  // Sets opened to true
  handlers.open();

  // Sets opened to false
  handlers.close();

  // Sets opened to true if it was false and vice versa
  handlers.toggle();
}
```

## Callbacks

The `onOpen` and `onClose` callbacks execute when the opened state changes:

```tsx
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  });

  // Calls `onOpen` callback and sets opened to true
  handlers.open();

  // Does nothing, opened is already true
  handlers.open();

  // Calls `onClose` callback and sets opened to false
  handlers.close();

  // Does nothing, opened is already false
  handlers.close();

  // Calls `onOpen` or `onClose` depending on the current state
  handlers.toggle();
}
```

## Definition

```tsx
interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

interface UseDisclosureHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

function useDisclosure(
  initialState?: boolean,
  options?: UseDisclosureOptions,
): UseDisclosureReturnValue
```

## Exported types

`UseDisclosureOptions`, `UseDisclosureHandlers` and `UseDisclosureReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseDisclosureOptions, UseDisclosureHandlers, UseDisclosureReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDocumentTitle
Package: @mantine/hooks
Import: import { UseDocumentTitle } from '@mantine/hooks';

## Usage

`use-document-title` sets `document.title` property with `React.useLayoutEffect` hook.
`use-document-title` is not called during server side rendering.
Use this hook with client only applications, for isomorphic use more advanced options
(for example, [react-helmet](https://github.com/nfl/react-helmet)).

Call hook with a string that should be set as document title in any component.
`use-document-title` triggers every time value changes
and the value is not an empty string (trailing whitespace is trimmed) or `null`.



## Definition

```tsx
function useDocumentTitle(title: string): void;
```


--------------------------------------------------------------------------------

### useDocumentVisibility
Package: @mantine/hooks
Import: import { UseDocumentVisibility } from '@mantine/hooks';

## Usage

`use-document-visibility` hook returns current [document.visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
– it allows detecting if the current tab is active:



## Definition

```tsx
// DocumentVisibilityState is 'visible' | 'hidden'
function useDocumentVisibility(): DocumentVisibilityState;
```


--------------------------------------------------------------------------------

### use-element-size
Package: @mantine/hooks
Import: import { use-element-size } from '@mantine/hooks';
Description: Returns element width and height and observes changes with ResizeObserver

## Usage



## API

`use-element-size` is a simpler version of [use-resize-observer](https://mantine.dev/hooks/use-resize-observer/) hook.
Hook returns a `ref` object that should be passed to the observed element, and the element's `height` and `width`.
On the first render (as well as during SSR), or when no element is being observed, `width` and `height` properties are equal to `0`.

```tsx
import { useElementSize } from '@mantine/hooks';

const { ref, width, height } = useElementSize();
```

## Definition

```tsx
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): readonly [React.RefObject<T>, ObserverRect];
```


--------------------------------------------------------------------------------

### useEventListener
Package: @mantine/hooks
Import: import { UseEventListener } from '@mantine/hooks';

## Usage

`use-event-listener` adds a given event listener to an element to which `ref` is assigned.
Hook supports the same options as `addEventListener` method.
After the component is unmounted, the listener is automatically removed.



## Definition

```tsx
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  type: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): React.RefCallback<T | null>
```


--------------------------------------------------------------------------------

### useEyeDropper
Package: @mantine/hooks
Import: import { UseEyeDropper } from '@mantine/hooks';

## Usage

`use-eye-dropper` hook provides an interface to work with [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API).
Check [browser support](https://caniuse.com/mdn-api_eyedropper) to learn which browsers support the API.



## Definition

```tsx
interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

interface UseEyeDropperReturnValue {
  supported: boolean;
  open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperOpenReturnType | undefined>;
}

function useEyeDropper(): UseEyeDropperReturnValue;
```

## Exported types

`EyeDropperOpenOptions`, `EyeDropperOpenReturnType` and `UseEyeDropperReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type {
  EyeDropperOpenOptions,
  EyeDropperOpenReturnType,
  UseEyeDropperReturnValue,
} from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFavicon
Package: @mantine/hooks
Import: import { UseFavicon } from '@mantine/hooks';

## Usage

`use-favicon` appends `<link />` element to head component with given favicon in `useLayoutEffect`.
The hook is not called during server side rendering.

Call hook with a favicon URL (supported formats: `.ico`, `.png`, `.svg` and `.gif`) that should be set as favicon.
The hook is triggered every time the URL changes and the value is not an empty string (trailing whitespace is trimmed) or `null`.



## Definition

```tsx
function useFavicon(url: string): void;
```


--------------------------------------------------------------------------------

### useFetch
Package: @mantine/hooks
Import: import { UseFetch } from '@mantine/hooks';

## Usage

`useFetch` hook sends a fetch request to the specified URL and returns the response data, loading state, error,
`refetch` and `abort` functions. You can pass other parameters that fetch takes like method, headers etc.



## Definition

```tsx
interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

interface UseFetchReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  abort: () => void;
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
): UseFetchReturnValue<T>
```

## Exported types

`UseFetchOptions` and `UseFetchReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseFetchOptions, UseFetchReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFileDialog
Package: @mantine/hooks
Import: import { UseFileDialog } from '@mantine/hooks';

## Usage

`use-file-dialog` allows capturing one or more files from the user without file input element:



## Definition

```tsx
interface UseFileDialogOptions {
  /** Determines whether multiple files are allowed, `true` by default */
  multiple?: boolean;

  /** `accept` attribute of the file input, '*' by default */
  accept?: string;

  /** `capture` attribute of the file input */
  capture?: string;

  /** Determines whether the user can pick a directory instead of file, `false` by default */
  directory?: boolean;

  /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
  resetOnOpen?: boolean;

  /** Initial selected files */
  initialFiles?: FileList | File[];

  /** Called when files are selected */
  onChange?: (files: FileList | null) => void;

  /** Called when file dialog is canceled */
  onCancel?: () => void;
}

interface UseFileDialogReturnValue {
  files: FileList | null;
  open: () => void;
  reset: () => void;
}

function useFileDialog(input?: UseFileDialogOptions): UseFileDialogReturnValue;
```

## Exported types

`UseFileDialogOptions` and `UseFileDialogReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseFileDialogOptions, UseFileDialogReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFocusReturn
Package: @mantine/hooks
Import: import { UseFocusReturn } from '@mantine/hooks';

## Usage

`use-focus-return` automatically returns focus to the last focused element when a given condition is met.
For example, it is used in [Modal](https://mantine.dev/core/modal/) component to restore focus after the modal was closed.

Close the modal with the `Escape` key and see how focus returns to the button after the modal closes:

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


In most cases, you should use this hook with [use-focus-trap](https://mantine.dev/hooks/use-focus-trap/).

```tsx
import { useFocusReturn } from '@mantine/hooks';

useFocusReturn({
  // Is region with focus trap active?
  // When it activates hook saves document.activeElement to the internal state
  // and focuses this element once focus trap is deactivated
  opened: false,

  // Determines whether focus should be returned automatically, true by default
  shouldReturnFocus: true,
});
```

If `shouldReturnFocus` option is set to `false` you can call returned function to focus last active element:

```tsx
import { useFocusReturn } from '@mantine/hooks';

const returnFocus = useFocusReturn({
  opened: false,
  shouldReturnFocus: false,
});

// ... later
returnFocus();
```

## Definition

```tsx
interface UseFocusReturnOptions {
  opened: boolean;
  shouldReturnFocus?: boolean;
}

type UseFocusReturnReturnValue = () => void;

function useFocusReturn(options: UseFocusReturnOptions): UseFocusReturnReturnValue
```

## Exported types

`UseFocusReturnOptions` and `UseFocusReturnReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseFocusReturnOptions, UseFocusReturnReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFocusTrap
Package: @mantine/hooks
Import: import { UseFocusTrap } from '@mantine/hooks';

## Usage

`use-focus-trap` traps focus at the given node, for example in modal, drawer or menu.
Node must include at least one focusable element. When the node unmounts, the focus trap is automatically released.

```tsx
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
    </div>
  );
}
```

## API

The hook accepts focus trap active state as a single argument:

```tsx
import { useFocusTrap } from '@mantine/hooks';

useFocusTrap(); // -> focus trap inactive
useFocusTrap(true); // -> focus trap active

useFocusTrap(false); // -> focus trap disabled
```

The hook returns `ref` that should be passed to the element:

```tsx
import { Paper } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <>
      {/* With regular element: */}
      <div ref={focusTrapRef} />

      {/* With Mantine component: */}
      <Paper ref={focusTrapRef} />
    </>
  );
}
```

## Combine with other ref based hooks

To combine `use-focus-trap` with other ref based hooks, use [use-merged-ref](https://mantine.dev/hooks/use-merged-ref/) hook:

```tsx
import { useRef } from 'react';
import {
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from '@mantine/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(
    myRef,
    useClickOutsideRef,
    focusTrapRef
  );

  return <div ref={mergedRef} />;
}
```

## Initial focus

By default, focus trap will move focus to the first interactive element.
To specify the element that should receive initial focus, add `data-autofocus` attribute:

```tsx
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
      {/* Second input in modal will have initial focus */}
      <input data-autofocus />
      <input />
    </div>
  );
}
```

## Definition

```tsx
function useFocusTrap(active?: boolean): React.RefCallback<HTMLElement | null>
```


--------------------------------------------------------------------------------

### useFocusWithin
Package: @mantine/hooks
Import: import { UseFocusWithin } from '@mantine/hooks';

## Usage

`use-focus-within` hook detects if any element within the other element has focus.
It works the same way as `:focus-within` CSS selector:



## Definition

```tsx
interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

interface UseFocusWithinReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  focused: boolean;
}

function useFocusWithin<T extends HTMLElement = any>(
  options?: UseFocusWithinOptions,
): UseFocusWithinReturnValue<T>
```

## Exported types

`UseFocusWithinOptions` and `UseFocusWithinReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseFocusWithinOptions, UseFocusWithinReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useForceUpdate
Package: @mantine/hooks
Import: import { UseForceUpdate } from '@mantine/hooks';

## Usage

`use-force-update` returns a function, which when called rerenders the component:



## Definition

```tsx
function useForceUpdate(): () => void;
```


--------------------------------------------------------------------------------

### useFullscreen
Package: @mantine/hooks
Import: import { UseFullscreen } from '@mantine/hooks';

## Usage

`use-fullscreen` allows to enter/exit fullscreen for given element using the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
By default, if you don't provide `ref`, the hook will target `document.documentElement`:



## Custom target element

The hook returns an optional `ref` function that can be passed to an element to act as root.
Be sure to follow best practices to not [confuse or trap the end user](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know):



## Definition

```tsx
interface UseFullscreenReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

function useFullscreen<T extends HTMLElement = any>(): UseFullscreenReturnValue<T>
```

## Exported types

`UseFullscreenReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseFullscreenReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHash
Package: @mantine/hooks
Import: import { UseHash } from '@mantine/hooks';

## Usage

`use-hash` returns hash from URL, subscribes to its changes with [hashchange event](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)
and allows changing it with `setHash` function:



## Initial state value

By default, `use-hash` will retrieve value in `useEffect`. If you want to get initial value
as soon as hook is called, set `getInitialValueInEffect` to `false`. Note that this option is
not compatible with server side rendering – you can only use it if your app is client-side only.

```tsx
import { Button } from '@mantine/core';
import { useHash } from '@mantine/hooks';

function Demo() {
  const [hash, setHash] = useHash({ getInitialValueInEffect: false });
  return (
    <Button onClick={() => setHash('new-hash')}>Change hash</Button>
  );
}
```

## Definition

```tsx
interface UseHashOptions {
  getInitialValueInEffect?: boolean;
}

type UseHashReturnValue = [string, (value: string) => void];

function useHash(options?: UseHashOptions): UseHashReturnValue
```

## Exported types

`UseHashOptions` and `UseHashReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import { UseHashOptions, UseHashReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHeadroom
Package: @mantine/hooks
Import: import { UseHeadroom } from '@mantine/hooks';

## Usage

Use `use-headroom` hook to create headers that are hidden after user scrolls past the given distance in px.
The hook returns a boolean value that determines whether the element should be pinned or hidden.
Hook returns `true` when the current scroll position is less than the specified `fixedAt` value and
after user scrolled up.



## Definition

```tsx
interface UseHeadroomOptions {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

function useHeadroom(input?: UseHeadroomOptions): boolean;
```

## Exported types

`UseHeadroomOptions` type is exported from `@mantine/hooks` package, you can import it in your application:

```tsx
import { UseHeadroomOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHotkeys
Package: @mantine/hooks
Import: import { UseHotkeys } from '@mantine/hooks';

## Usage

`use-hotkeys` accepts as its first argument an array of hotkeys and handler tuples:

* `hotkey` - hotkey string, for example `ctrl+E`, `shift+alt+L`, `mod+S`
* `handler` - event handler called when a given combination was pressed
* `options` - object with extra options for hotkey handler



The second argument is a list of HTML tags on which hotkeys should be ignored.
By default, hotkeys events are ignored if the focus is in `input`, `textarea` and `select` elements.

```tsx
import { useHotkeys } from '@mantine/hooks';

function Demo() {
  // Ignore hotkeys events only when focus is in input and textarea elements
  useHotkeys(
    [['ctrl+K', () => console.log('Trigger search')]],
    ['INPUT', 'TEXTAREA']
  );

  // Empty array – do not ignore hotkeys events on any element
  useHotkeys([['ctrl+K', () => console.log('Trigger search')]], []);
}
```

## Targeting elements

`use-hotkeys` hook can work only with document element, you will need to create your own event listener
if you need to support other elements. For this purpose, `@mantine/hooks` package exports `getHotkeyHandler` function
which should be used with `onKeyDown`:



With `getHotkeyHandler` you can also add events to any dom node using `.addEventListener`:

```tsx
import { getHotkeyHandler } from '@mantine/hooks';

document.body.addEventListener(
  'keydown',
  getHotkeyHandler([
    ['mod+Enter', () => console.log('Submit')],
    ['mod+S', () => console.log('Save')],
  ])
);
```

## Supported formats

* `mod+S` – detects `⌘+S` on macOS and `Ctrl+S` on Windows
* `ctrl+shift+X` – handles multiple modifiers
* `alt + shift + L` – you can use whitespace inside hotkey
* `ArrowLeft` – you can use special keys using [this format](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
* `shift + [plus]` – you can use `[plus]` to detect `+` key
* `Digit1` and `Hotkey1` - You can use physical key assignments [defined on MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values).

## Types

`@mantine/hooks` exports `HotkeyItemOptions` and `HotkeyItem` types:

```tsx
interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];
```

`HotkeyItemOptions` provides the `usePhysicalKeys` option to force the physical key assignment. Useful for non-QWERTY keyboard layouts.

`HotkeyItem` type can be used to create hotkey items outside of `use-hotkeys` hook:

```tsx
import { HotkeyItem, useHotkeys } from '@mantine/hooks';

const hotkeys: HotkeyItem[] = [
  [
    'mod+J',
    () => console.log('Toggle color scheme'),
    { preventDefault: false },
  ],
  ['ctrl+K', () => console.log('Trigger search')],
  ['alt+mod+shift+X', () => console.log('Rick roll')],
  [
    'D',
    () => console.log('Triggers when pressing "E" on Dvorak keyboards!'),
    { usePhysicalKeys: true }
  ],
];

useHotkeys(hotkeys);
```

## Definition

```tsx
interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?]

function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore?: string[],
  triggerOnContentEditable?: boolean
): void;
```

## Exported types

`HotkeyItemOptions` and `HotkeyItem` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { HotkeyItemOptions, HotkeyItem } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHover
Package: @mantine/hooks
Import: import { UseHover } from '@mantine/hooks';

## Usage



## Definition

```tsx
interface UseHoverReturnValue<T extends HTMLElement = any> {
  hovered: boolean;
  ref: React.RefCallback<T | null>;
}

function useHover<T extends HTMLElement = any>(): UseHoverReturnValue<T>
```

## Exported types

`UseHoverReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseHoverReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useId
Package: @mantine/hooks
Import: import { UseId } from '@mantine/hooks';

## Usage

`use-id` hook generates a random id that persists across renders.
The hook is usually used to bind input elements to labels.
The generated random id is saved to ref and will not change unless the component is unmounted.

```tsx
import { useId } from '@mantine/hooks';

function Input({ id }: { id?: string }) {
  const uuid = useId(id);

  return (
    <>
      <label htmlFor={uuid}>Input label</label>
      <input type="text" id={uuid} />
    </>
  );
}

// input and label will have id 'my-id'
const withId = <Input id="my-id" />;

// input and label will have random id 'mantine-fZMoF'
const withoutId = <Input />;
```

## Definition

```tsx
function useId(id: string): string;
```


--------------------------------------------------------------------------------

### useIdle
Package: @mantine/hooks
Import: import { UseIdle } from '@mantine/hooks';

## Usage

`use-idle` detects if user does nothing for a given time in ms:



## Custom events

By default, the hook will listen to `keypress`, `mousemove`, `touchmove`, `wheel`, `click` and `scroll` events to set idle status.
To change that, provide a list of events in the `options` argument:



## Initial state

By default, the hook will return an idle state.
To change that, provide an initial state value in the `options` argument:



### Definition

```tsx
interface UseIdleOptions {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
}

function useIdle(timeout: number, options?: UseIdleOptions): boolean;
```

## Exported types

`UseIdleOptions` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseIdleOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInViewport
Package: @mantine/hooks
Import: import { UseInViewport } from '@mantine/hooks';

## Usage

`use-in-viewport` is a simpler alternative to [use-intersection](https://mantine.dev/hooks/use-intersection) that only checks if the element
is visible in the viewport:



## Definition

```tsx
interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inViewport: boolean;
  ref: React.RefCallback<T | null>;
}

function useInViewport<T extends HTMLElement = any>(): UseInViewportReturnValue<T>
```

## Exported types

`UseInViewportReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseInViewportReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInputState
Package: @mantine/hooks
Import: import { UseInputState } from '@mantine/hooks';

## Usage

`use-input-state` handles state of native inputs (with event in `onChange` handler) and custom inputs (with value in `onChange` handler).
Hook works with all Mantine and native inputs:

```tsx
import { useState } from 'react';
import { NumberInput, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

function WithUseInputState() {
  const [stringValue, setStringValue] = useInputState('');
  const [numberValue, setNumberValue] = useInputState<
    string | number
  >(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={setStringValue}
      />
      <TextInput value={stringValue} onChange={setStringValue} />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}

function WithUseState() {
  const [stringValue, setStringValue] = useState('');
  const [numberValue, setNumberValue] = useState<string | number>(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <TextInput
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}
```

## Definition

```tsx
type UseInputStateReturnValue<T> = [
  T,
  (value: null | undefined | T | React.ChangeEvent<any>) => void,
];

function useInputState<T>(initialState: T): UseInputStateReturnValue<T>
```

## Exported types

`UseInputStateReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseInputStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useIntersection
Package: @mantine/hooks
Import: import { UseIntersection } from '@mantine/hooks';

## Usage

`use-intersection` returns information about the intersection
of a given element with its scroll container or body element with [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API):



## API

The hook accepts `IntersectionObserver`'s options as its only optional argument:

```tsx
import { useIntersection } from '@mantine/hooks';

useIntersection({
  root: document.querySelector('#some-element'),
  rootMargin: '0rem',
  threshold: 1.0,
});
```

The hook returns a `ref` function that should be passed to the observed element, and the latest entry, as returned by `IntersectionObserver`'s callback.
See [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) documentation to learn everything about options.

On the first render (as well as during SSR), or when no element is being observed, the entry is `null`.

```tsx
import { Paper } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';

function Demo() {
  const { ref } = useIntersection();

  return (
    <>
      {/* With regular element: */}
      <div ref={ref} />

      {/* With Mantine component: */}
      <Paper ref={ref} />
    </>
  );
}
```

## Definition

```tsx
interface UseIntersectionReturnValue<T> {
  ref: React.RefCallback<T | null>;
  entry: IntersectionObserverEntry | null;
}

function useIntersection<T extends HTMLElement = any>(
  options?: IntersectionObserverInit,
): UseIntersectionReturnValue<T>
```

## Exported types

`UseIntersectionReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseIntersectionReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInterval
Package: @mantine/hooks
Import: import { UseInterval } from '@mantine/hooks';

## Usage



## Auto invoke interval

To automatically start interval when component is mounted, set `autoInvoke` option to `true`:

```tsx
import { useInterval } from '@mantine/hooks';

const interval = useInterval(
  () => console.log('Interval tick'),
  1000,
  { autoInvoke: true }
);
```

## API

```tsx
import { useInterval } from '@mantine/hooks';

const { start, stop, toggle, active } = useInterval(fn, interval);
```

Arguments:

* `fn` – function that is called at each interval tick
* `interval` – amount of milliseconds between each tick

Return object:

* `start` – start interval
* `stop` – stop interval
* `toggle` – toggle interval
* `active` – current interval status

## Definition

```tsx
interface UseIntervalOptions {
  /** If set, the interval will start automatically when the component is mounted, `false` by default */
  autoInvoke?: boolean;
}

interface UseIntervalReturnValue {
  /** Starts the interval */
  start: () => void;

  /** Stops the interval */
  stop: () => void;

  /** Toggles the interval */
  toggle: () => void;

  /** Indicates if the interval is active */
  active: boolean;
}

function useInterval(
  fn: () => void,
  interval: number,
  options?: UseIntervalOptions,
): UseIntervalReturnValue
```

## Exported types

`UseIntervalOptions` and `UseIntervalReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseIntervalOptions, UseIntervalReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useIsFirstRender
Package: @mantine/hooks
Import: import { UseIsFirstRender } from '@mantine/hooks';

## Usage

`useIsFirstRender` returns true if the component is being rendered for the first time,
otherwise it returns false.



## Definition

```tsx
function useIsFirstRender(): boolean;
```


--------------------------------------------------------------------------------

### useIsomorphicEffect
Package: @mantine/hooks
Import: import { UseIsomorphicEffect } from '@mantine/hooks';

## Usage

`use-isomorphic-effect` is a replacement for `useLayoutEffect` hook that works in both browser and server environments.

```tsx
import { useIsomorphicEffect } from '@mantine/hooks';

function Demo() {
  useIsomorphicEffect(() => {
    document.title = 'title';
  });

  return null;
}
```


--------------------------------------------------------------------------------

### useListState
Package: @mantine/hooks
Import: import { UseListState } from '@mantine/hooks';

## Usage

`use-list-state` provides an API to work with list state:

```tsx
import { useListState } from '@mantine/hooks';

const [values, handlers] = useListState([{ a: 1 }]);

// add one or more items to the end of the list
const append = () => handlers.append({ a: 2 });
// values -> [{ a: 1 }, { a: 2 }]

// add one or more items to the start of the list
const prepend = () => handlers.prepend({ a: 3 }, { a: 4 });
// values -> [{ a: 3 }, { a: 4 }, { a: 1 }, { a: 2 }]

// remove items at given positions
const remove = () => handlers.remove(0, 2);
// values -> [{ a: 4 }, { a: 2 }]

// insert one or more items at given position
const insert = () => handlers.insert(1, { a: 5 });
// values -> [{ a: 4 }, { a: 5 }, { a: 2 }]

// apply function to each element of the list
const apply = () =>
  handlers.apply((item, index) => ({ a: item.a * index }));
// values -> [{ a: 0 }, { a: 5 }, { a: 4 }]

// move item from one position to another
const reorder = () => handlers.reorder({ from: 2, to: 0 });
// values -> [{ a: 4 }, { a: 0 }, { a: 5 }]

// swap items positions
const swap = () => handlers.swap({ from: 0, to: 2 });
// values -> [{ a: 5 }, { a: 0 }, { a: 4 }]

// apply function to each element that matches condition
const applyWhere = () =>
  handlers.applyWhere(
    (item) => item.a > 0,
    (item) => ({ a: item.a + 2 })
  );
// values -> [{ a: 7 }, { a: 0 }, { a: 6 }]

// set entirely new state
const setState = () => handlers.setState([{ a: 6 }, { a: 7 }]);
// values -> [{ a: 6 }, { a: 7 }]

// set individual item at given position
const setItem = () => handlers.setItem(0, { a: 8 });
// values -> [{ a: 8 }, { a: 7 }]

// set item property at given position
const setItemProp = () => handlers.setItemProp(1, 'a', 'new-prop');
// values -> [{ a: 8 }, { a: 'new-prop' }]

// filter objects that have a = 'new-prop'
const filter = () => handlers.filter((item) => item.a === 'new-prop');
// values -> [{ a: 'new-prop' }]
```

## API

`use-list-state` takes an array as a single argument and
returns a list of values and handlers to change them in a tuple, similar to `useState` hook.

The hook provides handlers to work with array data:

* `append` – add items to the end of the list
* `prepend` – add items to the start of the list
* `pop` – remove last item
* `shift` – remove first item
* `insert` – insert items at given index
* `remove` – remove items at given indices
* `reorder` – move item from one position to another
* `swap` – swap items positions
* `apply` – apply given function to all items in the list
* `applyWhere` - apply given function to selective items using condition
* `setItem` – replace item at given index
* `setItemProp` – set item property at given index
* `setState` – set list state with react action
* `filter` - filter values with callback function

## Indeterminate state checkbox example

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


## UseListStateHandlers type

`@mantine/hooks` package exports `UseListStateHandlers`. It is a generic type
that contains all handlers from `useListState` hook. It can be used to type
handlers in your components.

`UseListStateHandlers` type:

```tsx
export interface UseListStateHandlers<T> {
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  append: (...items: T[]) => void;
  prepend: (...items: T[]) => void;
  insert: (index: number, ...items: T[]) => void;
  pop: () => void;
  shift: () => void;
  apply: (fn: (item: T, index?: number) => T) => void;
  applyWhere: (
    condition: (item: T, index: number) => boolean,
    fn: (item: T, index?: number) => T
  ) => void;
  remove: (...indices: number[]) => void;
  reorder: ({ from, to }: { from: number; to: number }) => void;
  swap: ({ from, to }: { from: number; to: number }) => void;
  setItem: (index: number, item: T) => void;
  setItemProp: <K extends keyof T, U extends T[K]>(
    index: number,
    prop: K,
    value: U
  ) => void;
  filter: (fn: (item: T, i: number) => boolean) => void;
}
```

The type is useful when you want to pass `use-list-state` handlers to child components
as a prop:

```tsx
import { UseListStateHandlers } from '@mantine/hooks';

interface Props {
  handlers: UseListStateHandlers<string>;
}

function Demo({ handlers }: Props) {
  return (
    <button type="button" onClick={() => handlers.append('hello')}>
      Append hello
    </button>
  );
}
```

## Set item type

By default, `use-list-state` will use type from `initialValues`.
If you call the hook with an empty array, you must specify item type:

```tsx
import { useListState } from '@mantine/hooks';

useListState(['hello']); // ok, item type is string
useListState([]); // not ok, item type is any
useListState<string>([]); // ok, item type is string
```

## Definition

```tsx
function useListState<T>(
  initialValue?: T[]
): [T[], UseListStateHandlers<T>];
```

## Exported types

`UseListStateHandlers` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseListStateHandlers } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useLocalStorage
Package: @mantine/hooks
Import: import { UseLocalStorage } from '@mantine/hooks';

## Usage

`use-local-storage` allows using value from the `localStorage` as react state.
The hook works the same way as `useState`, but also writes the value to the `localStorage`:

```tsx
import { useLocalStorage } from '@mantine/hooks';

// The hook will read value from localStorage.getItem('color-scheme')
// If localStorage is not available or value at a given key does not exist
// 'dark' will be assigned to value variable
const [value, setValue] = useLocalStorage({
  key: 'color-scheme',
  defaultValue: 'dark',
});

// Value is set both to state and localStorage at 'color-scheme'
setValue('light');

// You can also use callback like in useState hook to set value
setValue((current) => (current === 'dark' ? 'light' : 'dark'));
```

## Example

Example of a color scheme toggle button that uses `use-local-storage` hook
to store current color scheme in the `localStorage`:

```tsx
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function ColorSchemeToggle() {
  const [colorScheme, setColorScheme] = useLocalStorage<
    'light' | 'dark'
  >({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    );

  return (
    <ActionIcon onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  );
}
```

## Remove value

Use `removeValue` callback to clean `localStorage`/`sessionStorage`.
When value is removed it is reset to `defaultValue`:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue, removeValue] = useLocalStorage({
  key: 'color-scheme',
  defaultValue: 'light',
});
```

## Browser tabs synchronization

`use-local-storage` subscribes to [storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).
When state changes in one tab, it automatically updates the value in all other opened browser tabs.
You can test this feature by opening 2 tabs with Mantine docs side by side and changing the color scheme
(button on the top right or `⌘ + J` on MacOS and `Ctrl + J` on Windows and Linux).

## Serialize/deserialize JSON

By default, the hook will serialize/deserialize data with `JSON.stringify`/`JSON.parse`.
If you need to store data in local storage that cannot be serialized with `JSON.stringify`
– provide your own serialization handlers:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue] = useLocalStorage({
  key: 'color-scheme',
  serialize: (value) => {
    /* return value serialized to string */
  },
  deserialize: (localStorageValue) => {
    /* parse localStorage string value and return value */
  },
});
```

## Usage with superjson

[superjson](https://github.com/blitz-js/superjson) is compatible with `JSON.stringify`/`JSON.parse` but works for `Date`, `Map`, `Set` and `BigInt`:

```tsx
import superjson from 'superjson';
import { useLocalStorage } from '@mantine/hooks';

const defaultValue = { name: 'John', age: 25 };

const [value, setValue] = useLocalStorage({
  key: 'data',
  defaultValue,
  serialize: superjson.stringify,
  deserialize: (str) =>
    str === undefined ? defaultValue : superjson.parse(str),
});
```

## use-session-storage

`use-session-storage` hook works the same way as `use-local-storage` hook but uses `sessionStorage` instead of `window.localStorage`:

```tsx
import { useSessionStorage } from '@mantine/hooks';

const [value, setValue] = useSessionStorage({
  key: 'session-key',
  defaultValue: 'mantine',
});
```

## Set value type

You can specify value type same as in `useState` hook:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue] = useLocalStorage<'dark' | 'light'>({
  key: 'color-scheme',
  defaultValue: 'light',
});
```

## Read storage value

To read value from storage without using hook, use `readLocalStorageValue`/`readSessionStorageValue` functions.
Functions accept the same arguments as `use-local-storage`/`use-session-storage` hooks:

```tsx
import { readLocalStorageValue } from '@mantine/hooks';

const value = readLocalStorageValue({ key: 'color-scheme' });
```

## Definition

```tsx
interface UseStorageOptions<T> {
  /** Local storage key */
  key: string;

  /** Default value that will be set if value is not found in local storage */
  defaultValue?: T;

  /** If set to true, value will be updated in useEffect after mount. Default value is true. */
  getInitialValueInEffect?: boolean;

  /** Determines whether the value must be synced between browser tabs, `true` by default */
  sync?: boolean;

  /** Function to serialize value into a string to be saved in local storage */
  serialize?: (value: T) => string;

  /** Function to deserialize string value from local storage to value */
  deserialize?: (value: string) => T;
}

type UseStorageReturnValue<T> = [
  T, // current value
  (val: T | ((prevState: T) => T)) => void, // callback to set value in storage
  () => void, // callback to remove value from storage
];

function useLocalStorage<T = string>(
  options: UseStorageOptions<T>,
): UseStorageReturnValue<T>;
```

## Exported types

`UseStorageOptions` and `UseStorageReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseStorageOptions, UseStorageReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useLogger
Package: @mantine/hooks
Import: import { UseLogger } from '@mantine/hooks';

## Usage

`use-logger` logs given values to the console each time component renders.
Open devtools to see state changes in console:



## Definition

```tsx
function useLogger(componentName: string, props: any[]): any;
```


--------------------------------------------------------------------------------

### useLongPress
Package: @mantine/hooks
Import: import { UseLongPress } from '@mantine/hooks';

## Usage



## Definition

```tsx
interface UseLongPressOptions {
  /** Time in milliseconds to trigger the long press, default is 400ms */
  threshold?: number;

  /** Callback triggered when the long press starts */
  onStart?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press finishes */
  onFinish?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press is canceled */
  onCancel?: (event: React.MouseEvent | React.TouchEvent) => void;
}

interface UseLongPressReturnValue {
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
}

function useLongPress(
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  options?: UseLongPressOptions,
): UseLongPressReturnValue
```

## Exported types

`UseLongPressOptions` and `UseLongPressReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseLongPressOptions, UseLongPressReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMap
Package: @mantine/hooks
Import: import { UseMap } from '@mantine/hooks';

## Usage

`useMap` returns [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
object that can be used as React state – `set`, `clear` and `delete` methods update state and trigger rerender.



## Definition

```tsx
function useMap<T, V>(initialState?: [T, V][]): Map<T, V>;
```


--------------------------------------------------------------------------------

### useMediaQuery
Package: @mantine/hooks
Import: import { UseMediaQuery } from '@mantine/hooks';

## Usage

`use-media-query` subscribes to media queries.
It receives a media query as an argument and returns `true` if the given media query matches the current state.
The hook relies on `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and will return `false` if the API is not available, unless an initial value is provided in the second argument.

Resize browser window to trigger `window.matchMedia` event:



## Server Side Rendering

During server side rendering the hook will always return `false` as `window.matchMedia` api is not available,
if that is not a desired behavior, you can override the initial value:

```tsx
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  // Set initial value in second argument and getInitialValueInEffect option to false
  const matches = useMediaQuery('(max-width: 40em)', true, {
    getInitialValueInEffect: false,
  });
}
```

## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useMediaQuery(
  query: string,
  initialValue?: boolean,
  options?: UseMediaQueryOptions,
): boolean;
```

## Exported types

`UseMediaQueryOptions` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseMediaQueryOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMergedRef
Package: @mantine/hooks
Import: import { UseMergedRef } from '@mantine/hooks';

## Usage

`use-merged-ref` accepts any number of refs and returns a function that should be passed to the `ref` prop.
Use this hook when you need to use more than one ref on a single dom node, for example,
when you want to use [use-click-outside](https://mantine.dev/hooks/use-click-outside/) and [use-focus-trap](https://mantine.dev/hooks/use-focus-trap/) hooks and also get a ref for yourself:

```tsx
import { useRef } from 'react';
import {
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from '@mantine/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(
    myRef,
    useClickOutsideRef,
    focusTrapRef
  );

  return <div ref={mergedRef} />;
}
```

## mergeRefs function

`use-merged-ref` hooks memoizes refs with `useCallback` hook, but in some cases
memoizing is not a valid strategy, for example, when you are working with a list
of dynamic components React will complain that different number of hooks was called
across two renders. To fix that issue, use `mergeRefs` function instead:

```tsx
import { useRef } from 'react';
import { mergeRefs, useClickOutside } from '@mantine/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const mergedRef = mergeRefs(myRef, useClickOutsideRef);
  return <div ref={mergedRef} />;
}
```

`mergeRefs` works the same way as `use-merged-ref`, but does not use hooks internally.
Use it only when you cannot use `use-merged-ref`. Note that `mergeRefs` will not work
correctly with [use-focus-trap](https://mantine.dev/hooks/use-focus-trap/) hook, you are required to
use `use-merged-ref` with it.

## assignRef function

`assignRef` function can be used to assign refs that are not memoized with `useCallback`.
It is usually used to assign refs that do not reference elements:

```tsx
import { useState } from 'react';
import { assignRef } from '@mantine/hooks';

interface NumberInputHandlers {
  increment: () => void;
  decrement: () => void;
}

interface DemoProps {
  handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;
}

function Demo({ handlersRef }: DemoProps) {
  const [value, setValue] = useState(0);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);

  assignRef(handlersRef, { increment, decrement });

  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
```

## Set node type

```tsx
import { useMergedRef } from '@mantine/hooks';

const ref = useMergedRef<HTMLDivElement>();
```

## Definition

```tsx
function useMergedRef<T = any>(
  ...refs: React.ForwardedRef<T>[]
): (node: T) => void;
```


--------------------------------------------------------------------------------

### useMounted
Package: @mantine/hooks
Import: import { UseMounted } from '@mantine/hooks';

## Usage

`useMounted` hook returns `true` if component is mounted and `false` if it's not.

```tsx
import { useMounted } from '@mantine/hooks';

function Demo() {
  const mounted = useMounted();
  return (
    <div>
      {mounted ? 'Component is mounted' : 'Component is not mounted'}
    </div>
  );
}
```

## Definition

```tsx
function useMounted(): boolean;
```


--------------------------------------------------------------------------------

### useMouse
Package: @mantine/hooks
Import: import { UseMouse } from '@mantine/hooks';

## Usage



If you do not provide `ref`, mouse position is tracked relative to the document element:



## API

Set `resetOnExit` option to reset mouse position to `0, 0` when mouse leaves the element:

```tsx
import { useMouse } from '@mantine/hooks';

const { ref, x, y } = useMouse({ resetOnExit: true });
```

The hook returns an object with `ref` and `x`, `y` mouse coordinates:

```tsx
import { useMouse } from '@mantine/hooks';

const {
  ref, // -> pass ref to target element, if not used document element will be used as target element
  x, // -> mouse x position
  y, // -> mouse y position
} = useMouse();
```

On the first render (as well as during SSR), both `x` and `y` values are equal to `0`.

## Definition

```tsx
function useMouse<T extends HTMLElement = any>(options?: {
  resetOnExit?: boolean;
}): {
  x: number;
  y: number;
  ref: React.RefObject<T>;
};
```


--------------------------------------------------------------------------------

### useMove
Package: @mantine/hooks
Import: import { UseMove } from '@mantine/hooks';

## Usage

`use-move` handles move behavior over any element:



## API

The hook accepts a callback that is called when user moves pressed mouse over the given element
and returns an object with `ref` and active state:

```tsx
import { useMove } from '@mantine/hooks';

const {
  ref, // -> pass ref to target element
  active, // -> is user changing something right now?
} = useMove(({ x, y }) => console.log({ x, y }));
```

`x` and `y` values are always between `0` and `1`, you can use them to calculate value in your boundaries.

## Horizontal slider

You can ignore changes for one of the axis:



## Horizontal slider with styles

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


## Vertical slider

Moving the slider down increases the value, to reverse that set value to `1 - y` in your `setValue` function:



## Color picker



## clampUseMovePosition

`clampUseMovePosition` function can be used to clamp `x` and `y` values to `0-1` range.
It is useful when you want to use external events to change the value, for example changing value with keyboard arrows:

```tsx
import { clampUseMovePosition } from '@mantine/hooks';

clampUseMovePosition({ x: 0.5, y: 0.5 }); // -> { x: 0.5, y: 0.5 }
clampUseMovePosition({ x: 1.5, y: 0.5 }); // -> { x: 1, y: 0.5 }
clampUseMovePosition({ x: -0.5, y: 0.5 }); // -> { x: 0, y: 0.5 }
```

## UseMovePosition

`@mantine/hooks` exports `UseMovePosition` type, it can be used as a type parameter for `useState`:

```tsx
import { useState } from 'react';
import { UseMovePosition } from '@mantine/hooks';

const [value, setValue] = useState<UseMovePosition>({
  x: 0.5,
  y: 0.5,
});
```

## Definition

```tsx
interface UseMovePosition {
  x: number;
  y: number;
}

interface UseMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

interface UseMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  active: boolean;
}

function useMove<T extends HTMLElement = any>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  dir?: "ltr" | "rtl",
): UseMoveReturnValue<T>
```

## Exported types

`UseMovePosition`, `UseMoveReturnValue` and `UseMoveHandlers` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseMovePosition, UseMoveHandlers, UseMoveReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMutationObserver
Package: @mantine/hooks
Import: import { UseMutationObserver } from '@mantine/hooks';

## Usage

`use-mutation-observer` is a wrapper for the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
It allows subscribing changes being made to the DOM tree.



## Target element

If you cannot pass `ref` to the target element, you can pass a function to resolve
the target element as a third argument.



## Definition

```tsx
function useMutationObserver<Element extends HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
): RefObject<Element>;
```


--------------------------------------------------------------------------------

### useNetwork
Package: @mantine/hooks
Import: import { UseNetwork } from '@mantine/hooks';

## Usage

`use-network` hook returns an object with current connection status:



## Browser support

`use-network` uses experimental `navigator.connection`, see [browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection#browser_compatibility).

## Definition

```tsx

interface UserNetworkReturnValue {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
}

function useNetwork(): UserNetworkReturnValue;
```

## Exported types

`UserNetworkReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UserNetworkReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useOrientation
Package: @mantine/hooks
Import: import { UseOrientation } from '@mantine/hooks';

## Usage

`useOrientation` returns an object with the current orientation of the device:



## Definition

```tsx
interface UseOrientationOptions {
  /** Default angle value, used until the real can be retrieved
   * (during server side rendering and before js executes on the page)
   * If not provided, the default value is `0`
   * */
  defaultAngle?: number;

  /** Default angle value, used until the real can be retrieved
   * (during server side rendering and before js executes on the page)
   * If not provided, the default value is `'landscape-primary'`
   * */
  defaultType?: OrientationType;

  /** If true, the initial value will be resolved in useEffect (ssr safe)
   *  If false, the initial value will be resolved in useLayoutEffect (ssr unsafe)
   *  True by default.
   */
  getInitialValueInEffect?: boolean;
}

interface UseOrientationReturnType {
  angle: number;
  type: OrientationType;
}

function useOrientation(options?: UseOrientationOptions): UseOrientationReturnType;
```

## Exported types

`UseOrientationOptions` and `UseOrientationReturnType` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseOrientationOptions, UseOrientationReturnType } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useOs
Package: @mantine/hooks
Import: import { UseOs } from '@mantine/hooks';

## Usage

`use-os` returns user's os. Possible values are: `undetermined`, `macos`, `ios`, `windows`, `android`, `linux`, `chromeos`.
If the OS cannot be identified, for example, during server side rendering `undetermined` will be returned.



## Definition

```tsx
type UseOSReturnValue =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | 'chromeos';

interface UseOsOptions {
  getValueInEffect: boolean;
}

function getOS(options?: UseOsOptions): UseOSReturnValue;
```

## Exported types

`UseOsOptions` and `UseOSReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseOsOptions, UseOSReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### usePageLeave
Package: @mantine/hooks
Import: import { UsePageLeave } from '@mantine/hooks';

## Usage

`use-page-leave` calls given function when mouse leaves the page:



## Definition

```tsx
function usePageLeave(onPageLeave: () => void): void;
```


--------------------------------------------------------------------------------

### usePagination
Package: @mantine/hooks
Import: import { UsePagination } from '@mantine/hooks';

## Usage

`use-pagination` is a state management hook for [Pagination](https://mantine.dev/core/pagination/) component,
it manages pagination with controlled and uncontrolled state:

#### Example: usage

```tsx
function Demo() {
  return <Pagination total={10} />;
}
```


```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 10, initialPage: 1 });

pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];

pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.next();
pagination.range; // -> [1, 'dots', 5, 6, 7, 'dots', 10];

pagination.previous();
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.last();
pagination.range; // -> [1, 'dots', 6, 7, 8, 9, 10];

pagination.first();
pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
```

## Controlled

The hook supports controlled mode, provide `page` and `onChange` props to manage state from outside:

```tsx
import { useState } from 'react';
import { usePagination } from '@mantine/hooks';

const [page, onChange] = useState(1);
const pagination = usePagination({ total: 10, page, onChange });

// Will call onChange with 5
pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

// ... All other examples work the same
```

## Siblings

Control number of active item siblings with `siblings`:

```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 20, siblings: 3 });
```

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

Control number of items on each boundary with `boundaries`:

```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 20, boundaries: 3 });
```

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


## Definition

```tsx
export interface UsePaginationOptions {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

export interface UsePaginationReturnValue {
  /** Array of page numbers and dots */
  range: (number | 'dots')[];

  /** Active page number */
  active: number;

  /** Function to set active page */
  setPage: (page: number) => void;

  /** Function to go to next page */
  next: () => void;

  /** Function to go to previous page */
  previous: () => void;

  /** Function to go to first page */
  first: () => void;

  /** Function to go to last page */
  last: () => void;
}

function usePagination(settings: UsePaginationOptions): UsePaginationReturnValue;
```

## Exported types

`UsePaginationOptions` and `UsePaginationReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UsePaginationOptions, UsePaginationReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### usePrevious
Package: @mantine/hooks
Import: import { UsePrevious } from '@mantine/hooks';

## Usage

`use-previous` stores the previous value of a state in a ref.
It returns `undefined` on initial render and the previous value of a state after rerender:



## Definition

```tsx
function usePrevious<T>(value: T): T | undefined;
```


--------------------------------------------------------------------------------

### useQueue
Package: @mantine/hooks
Import: import { UseQueue } from '@mantine/hooks';

## Usage

`use-queue` limits the number of data in current state and places the rest of it in a queue.
For example, in [@mantine/notifications](https://mantine.dev/x/notifications/) package number of
notifications that is currently displayed is limited and other new notifications are added to the queue and displayed once
available space appears.

```tsx
import { useQueue } from '@mantine/hooks';

const { state, queue, add, update, cleanQueue } = useQueue({
  initialValues: [1],
  limit: 2,
});

// state -> [1], queue -> []

// When state.length is less that limit, new items are added to state
add(2);
// state -> [1,2], queue -> []

// When state.length is equal to limit, new items are added to queue
add(3, 4, 5, 6);
// state -> [1,2], queue -> [3,4,5,6]

// Use update function to modify items
update((values) => values.map((item) => item * 3));
// state -> [3,6], queue -> [9,12,15,18]

// If you add or remove items in update function,
// they will be divided between queue and state according to limit
// order is always preserved
update((values) => values.filter((item) => item % 2));
// state -> [3,9], queue -> [15]

// Remove all items from queue
cleanQueue();
// state -> [3,9], queue -> []

// Remove all items from queue and state
update(() => []);
// state -> [], queue -> []
```

## API

The hook accepts one argument – a configuration object with keys:

* `initialValues` – optional initial values (divided between state and queue according to limit), defaults to empty array
* `limit` – maximum number of items that state can include, every next item after the limit is exceeded is put in queue

Return value:

* `state` – current state
* `queue` – current queue
* `add` – add any number of items to state or queue
* `update` – apply given function to all items in state and queue, use it to filter, modify or add items
* `cleanQueue` – remove all items from the queue

## Set item type

By default, the hook will get types information from `initialValues` automatically:

```tsx
import { useQueue } from '@mantine/hooks';

const q = useQueue({
  limit: 2,
  initialValues: [
    { name: 'Bob', id: 1 },
    { name: 'Alice', id: 2 },
  ],
});

typeof q.state[number]; // -> { name: string; id: number; }
```

If you do not provide `initialValues`, pass in type for state item:

```tsx
import { useQueue } from '@mantine/hooks';

const q = useQueue<{ name: string; id: number }>({
  limit: 2,
  initialValues: [],
});

q.add({ name: 'Bob', id: 1 });
```

## Definition

```tsx
export interface UseQueueOptions<T> {
  /** Initial values to be added to the queue */
  initialValues?: T[];

  /** Maximum number of items in the state */
  limit: number;
}

export interface UseQueueReturnValue<T> {
  /** Array of items in the queue */
  queue: T[];

  /** Array of items in the state */
  state: T[];

  /** Function to add items to state or queue */
  add: (...items: T[]) => void;

  /** Function to apply updates to current items */
  update: (fn: (state: T[]) => T[]) => void;

  /** Function to clear the queue */
  cleanQueue: () => void;
}

function useQueue<T>(options: UseQueueOptions<T>): UseQueueReturnValue<T>
```

## Exported types

`UseQueueOptions` and `UseQueueReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseQueueOptions, UseQueueReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useRadialMove
Package: @mantine/hooks
Import: import { UseRadialMove } from '@mantine/hooks';

## Usage

`use-radial-move` hook can be used to create custom radial sliders, for example [AngleSlider](https://mantine.dev/core/angle-slider)
component is based on this hook. It works similar to [use-move](https://mantine.dev/hooks/use-move) hook.

Example of creating custom radial slider:



## Definition

```tsx
interface UseRadialMoveOptions {
  /** Number by which value is incremented/decremented with mouse and touch events, `0.01` by default */
  step?: number;

  /** Called in `onMouseUp` and `onTouchEnd` events with the current value */
  onChangeEnd?: (value: number) => void;

  /** Called in `onMouseDown` and `onTouchStart` events */
  onScrubStart?: () => void;

  /** Called in `onMouseUp` and `onTouchEnd` events */
  onScrubEnd?: () => void;
}

interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  /** Ref to be passed to the element that should be used for radial move */
  ref: React.RefCallback<T | null>;

  /** Indicates whether the radial move is active */
  active: boolean;
}

function useRadialMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: number) => void,
  options?: UseRadialMoveOptions,
): UseRadialMoveReturnValue<T>;
```

## Exported types

`UseRadialMoveOptions` and `UseRadialMoveReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseRadialMoveOptions, UseRadialMoveReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useReducedMotion
Package: @mantine/hooks
Import: import { UseReducedMotion } from '@mantine/hooks';

## Usage

`use-reduced-motion` detects if user [prefers to reduce motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
It uses [use-media-query](https://mantine.dev/hooks/use-media-query/) hook under the hood.
Hook relies on `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and will always return `false` if api is not available (for example, during server side rendering), unless the initial value is provided in the first argument.

Use hook to detect if user prefers to reduce motion (`(prefers-reduced-motion: reduce)` media query) and set animations duration based on this value.



## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions): boolean;
```


--------------------------------------------------------------------------------

### useResizeObserver
Package: @mantine/hooks
Import: import { UseResizeObserver } from '@mantine/hooks';

## Usage



## API

`use-resize-observer` returns a `ref` object that should be passed to the observed element, and the current element content rect, as returned by `ResizeObserver`'s callback `entry.contentRect`.
See [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) documentation to learn more.
On the first render (as well as during SSR), or when no element is being observed, all of the properties are equal to `0`.

```tsx
import { useResizeObserver } from '@mantine/hooks';

function Demo() {
  const [ref, rect] = useResizeObserver();
  return <div ref={ref}>Observed</div>;
}
```

See also [use-element-size](https://mantine.dev/hooks/use-element-size/) hook in case you need to subscribe only to `width` and `height`.

## Definition

```tsx
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): readonly [React.RefObject<T>, ObserverRect];
```


--------------------------------------------------------------------------------

### useScrollIntoView
Package: @mantine/hooks
Import: import { UseScrollIntoView } from '@mantine/hooks';

## Usage

`use-scroll-into-view` handles scroll behavior for any scrollable element. Basic usage works the same way as `element.scrollIntoView()`.
Hook adjusts scrolling animation with respect to the `reduced-motion` user preference.



## API

The hook is configured with settings object:

* `onScrollFinish` – function that will be called after scroll animation
* `easing` – custom math easing function
* `duration` - duration of scroll animation in milliseconds
* `axis` - axis of scroll
* `cancelable` - indicator if animation may be interrupted by user scrolling
* `offset` - additional distance between the nearest edge and element
* `isList` - indicator that prevents content jumping in scrolling lists with multiple targets, for example Select, Carousel

Hook returns an object with:

* `scrollIntoView` – function that starts scroll animation
* `cancel` – function that stops scroll animation
* `targetRef` - ref of target HTML node
* `scrollableRef` - ref of scrollable parent HTML element, if not used document element will be used

Returned `scrollIntoView` function accepts single optional argument `alignment` - optional target element alignment relatively to parent based on current axis.

```tsx
import { useScrollIntoView } from '@mantine/hooks';

const { scrollIntoView } = useScrollIntoView();

scrollIntoView({ alignment: 'center' });
```

## Easing

The hook accept custom `easing` math function to control the flow of animation.
It takes `t` argument, which is a number between `0` and `1`.

Default easing is `easeInOutQuad` - more info [here](https://easings.net/#easeInOutQuad).
You can find other popular examples on [easings.net](https://easings.net/)

```tsx
import { useScrollIntoView } from '@mantine/hooks';

useScrollIntoView({
  easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2), // easeInOutQuint
});
```

## Parent node



## Scroll X axis



## Definition

```tsx
interface UseScrollIntoViewAnimation {
  /** Target element alignment relatively to parent based on current axis */
  alignment?: 'start' | 'end' | 'center';
}

interface UseScrollIntoViewOptions {
  /** Callback fired after scroll */
  onScrollFinish?: () => void;

  /** Duration of scroll in milliseconds */
  duration?: number;

  /** Axis of scroll */
  axis?: 'x' | 'y';

  /** Custom mathematical easing function */
  easing?: (t: number) => number;

  /** Additional distance between nearest edge and element */
  offset?: number;

  /** Indicator if animation may be interrupted by user scrolling */
  cancelable?: boolean;

  /** Prevents content jumping in scrolling lists with multiple targets */
  isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: React.RefObject<Parent | null>;
  targetRef: React.RefObject<Target | null>;
  scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
  cancel: () => void;
}

function useScrollIntoView<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null
>(
  options?: UseScrollIntoViewOptions,
): UseScrollIntoViewReturnValue<Target, Parent>
```

## Exported types

`UseScrollIntoViewOptions` and `UseScrollIntoViewReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseScrollIntoViewOptions, UseScrollIntoViewReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useScrollSpy
Package: @mantine/hooks
Import: import { UseScrollSpy } from '@mantine/hooks';

## Usage

`use-scroll-spy` hook tracks scroll position and returns index of the
element that is currently in the viewport. It is useful for creating
table of contents components (like in mantine.dev sidebar on the right side)
and similar features.



## Hook options

`use-scroll-spy` accepts an object with options:

* `selector` - selector to get headings, by default it is `'h1, h2, h3, h4, h5, h6'`
* `getDepth` - a function to retrieve depth of heading, by default depth is calculated based on tag name
* `getValue` - a function to retrieve heading value, by default `element.textContent` is used
* `scrollHost` - host element to attach scroll event listener, if not provided, `window` is used
* `offset` - offset from the top of the viewport to use when determining the active heading, by default `0` is used

Example of using custom options to get headings with `data-heading` attribute:



## Reinitializing hook data

By default, `use-scroll-spy` does not track changes in the DOM. If you want
to update headings data after the parent component has mounted, you can use
`reinitialize` function:

```tsx
import { useEffect } from 'react';
import { useScrollSpy } from '@mantine/hooks';

function Demo({ dependency }) {
  const { reinitialize } = useScrollSpy();

  useEffect(() => {
    reinitialize();
  }, [dependency]);

  return null;
}
```

## Definition

All types used in the definition are exported from `@mantine/hooks` package.

```tsx
interface UseScrollSpyHeadingData {
  /** Heading depth, 1-6 */
  depth: number;

  /** Heading text content value */
  value: string;

  /** Heading id */
  id: string;

  /** Function to get heading node */
  getNode: () => HTMLElement;
}

interface UseScrollSpyOptions {
  /** Selector to get headings, `'h1, h2, h3, h4, h5, h6'` by default */
  selector?: string;

  /** A function to retrieve depth of heading, by default depth is calculated based on tag name */
  getDepth?: (element: HTMLElement) => number;

  /** A function to retrieve heading value, by default `element.textContent` is used */
  getValue?: (element: HTMLElement) => string;

  /** Host element to attach scroll event listener, if not provided, `window` is used */
  scrollHost?: HTMLElement;

  /** Offset from the top of the viewport to use when determining the active heading, `0` by default */
  offset?: number;
}

interface UseScrollSpyReturnType {
  /** Index of the active heading in the `data` array */
  active: number;

  /** Headings data. If not initialize, data is represented by an empty array. */
  data: UseScrollSpyHeadingData[];

  /** True if headings value have been retrieved from the DOM. */
  initialized: boolean;

  /** Function to update headings values after the parent component has mounted. */
  reinitialize: () => void;
}

function useScrollSpy(options?: UseScrollSpyOptions): UseScrollSpyReturnType
```

## Exported types

`UseScrollSpyOptions` and `UseScrollSpyReturnType` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseScrollSpyOptions, UseScrollSpyReturnType } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSelection
Package: @mantine/hooks
Import: import { UseSelection } from '@mantine/hooks';

## Usage



## Definition

```tsx
export interface UseSelectionInput<T> {
  /** The array of items to select from */
  data: T[];

  /** The initial selection, empty array by default */
  defaultSelection?: T[];

  /** If true, selection is reset when data changes */
  resetSelectionOnDataChange?: boolean;
}

export interface UseSelectionHandlers<T> {
  /** Add an item to the selection */
  select: (selected: T) => void;

  /** Remove an item from the selection */
  deselect: (deselected: T) => void;

  /** Toggle an item's selection state */
  toggle: (toggled: T) => void;

  /** Returns true if all items from the `data` are selected */
  isAllSelected: () => boolean;

  /** Returns true if at least one item from the `data` is selected */
  isSomeSelected: () => boolean;

  /** Set the selection to a specific array of items */
  setSelection: (selection: T[]) => void;

  /** Clear all selections */
  resetSelection: () => void;
}

export type UseSelectionReturnValue<T> = readonly [T[], UseSelectionHandlers<T>];

function useSelection<T>(input: UseSelectionInput<T>): UseSelectionReturnValue<T>
```

## Exported types

`UseSelectionInput`, `UseSelectionReturnValue` and `UseSelectionHandlers` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseSelectionInput, UseSelectionReturnValue, UseSelectionHandlers } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSetState
Package: @mantine/hooks
Import: import { UseSetState } from '@mantine/hooks';

## Usage

`use-set-state` works similar to how `this.setState` works in class components – it shallow merges state partial
into current state.

```tsx
import { useSetState } from '@mantine/hooks';

const [state, setState] = useSetState({
  name: 'John',
  age: 35,
  job: 'Engineer',
});

state; // -> { name: 'John', age: 35, job: 'Engineer' }

setState({ name: 'Jane' }); // -> { name: 'Jane', age: 35, job: 'Engineer' }
setState({ age: 25, job: 'Manager' }); // -> { name: 'Jane', age: 25, job: 'Manager' }
setState((current) => ({ age: current.age + 7 })); // -> { name: 'Jane', age: 32, job: 'Manager' }
```

Note that it can work only with objects: primitive values and arrays are not supported:

```tsx
import { useSetState } from '@mantine/hooks';

useSetState([1, 2, 3]); // -> will not work
useSetState(1); // -> will not work
useSetState({ skills: ['JavaScript', 'TypeScript'] }); // -> works fine
```

## Definition

```tsx
type UseSetStateCallback<T> = (
  state: Partial<T> | ((currentState: T) => Partial<T>)
) => void;

type UseSetStateReturnValue<T> = [T, UseSetStateCallback<T>];

function useSetState<T extends Record<string, any>>(initialState: T): UseSetStateReturnValue<T>
```

## Exported types

`UseSetStateCallback` and `UseSetStateReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseSetStateCallback, UseSetStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSet
Package: @mantine/hooks
Import: import { UseSet } from '@mantine/hooks';

## Usage

`useSet` return [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
object that can be used as React state: `add`, `clear` and `delete` methods trigger state updates.



## Definition

```tsx
function useSet<T>(values?: T[]): Set<T>;
```


--------------------------------------------------------------------------------

### useShallowEffect
Package: @mantine/hooks
Import: import { UseShallowEffect } from '@mantine/hooks';

## Usage

`use-shallow-effect` works exactly like `useEffect`, but performs shallow dependencies comparison instead of referential comparison:

```tsx
import { useEffect } from 'react';
import { useShallowEffect } from '@mantine/hooks';

// Will be called on each render
useEffect(() => {}, [{ a: 1 }]);

// Will be called only once
useShallowEffect(() => {}, [{ a: 1 }]);
```

Hook works with primitive values, arrays and objects:

```tsx
import { useShallowEffect } from '@mantine/hooks';

// Primitive values are handled like in useEffect
useShallowEffect(() => {}, [1, 2, 3]);

// Arrays with primitive values will not trigger callback
useShallowEffect(() => {}, [[1], [2], [3]]);

// Objects with primitive values will not trigger callback
useShallowEffect(() => {}, [{ a: 1 }, { b: 2 }]);

// Arrays with objects will trigger callback since values are not shallow equal
useShallowEffect(() => {}, [[{ a: 1 }], [{ b: 2 }]]);
```

## Definition

```tsx
function useShallowEffect(
  cb: () => void,
  dependencies?: React.DependencyList
): void;
```


--------------------------------------------------------------------------------

### useStateHistory
Package: @mantine/hooks
Import: import { UseStateHistory } from '@mantine/hooks';

## Usage

`useStateHistory` hook is used to create a state with history, it returns current value, handlers to
go back/forward and a history object with all previous values and current index.



## Definition

`UseStateHistoryHandlers` and `StateHistory` interfaces are exported from `@mantine/hooks`
package.

```tsx
interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
  reset: () => void;
}

interface UseStateHistoryValue<T> {
  history: T[];
  current: number;
}

type UseStateHistoryReturnValue<T> = [
  T,
  UseStateHistoryHandlers<T>,
  UseStateHistoryValue<T>,
];

function useStateHistory<T>(initialValue: T): UseStateHistoryReturnValue<T>;
```

## Exported types

`UseStateHistoryHandlers`, `UseStateHistoryReturnValue` and `UseStateHistoryValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseStateHistoryHandlers, UseStateHistoryReturnValue, UseStateHistoryValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useTextSelection
Package: @mantine/hooks
Import: import { UseTextSelection } from '@mantine/hooks';

## Usage

`use-text-selection` returns current text selection:



## Definition

```tsx
function useTextSelection(): Selection | null;
```


--------------------------------------------------------------------------------

### useThrottledCallback
Package: @mantine/hooks
Import: import { UseThrottledCallback } from '@mantine/hooks';

## Usage

`useThrottledCallback` accepts a function and a wait time in milliseconds.
It returns a throttled version of the function that will only be called at most once every `wait` milliseconds.



## Definition

```tsx
function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): (...args: Parameters<T>) => void;
```


--------------------------------------------------------------------------------

### useThrottledState
Package: @mantine/hooks
Import: import { UseThrottledState } from '@mantine/hooks';

## Usage

`useThrottledState` works similar to `useState` but throttles the state updates.
`setThrottledState` handler in the example below will be called at most once every 1000ms.



## Definition

```tsx
function useThrottledState<T = any>(
  defaultValue: T,
  wait: number
): readonly [T, (newValue: React.SetStateAction<T>) => void];
```


--------------------------------------------------------------------------------

### useThrottledValue
Package: @mantine/hooks
Import: import { UseThrottledValue } from '@mantine/hooks';

## Usage

`useThrottledValue` accepts a value and a wait time in milliseconds.
It returns a throttled value that cannot change more than once every `wait` milliseconds.



## Definition

```tsx
function useThrottledValue<T>(value: T, wait: number): T;
```


--------------------------------------------------------------------------------

### useTimeout
Package: @mantine/hooks
Import: import { UseTimeout } from '@mantine/hooks';

## Usage



## API

```tsx
import { useTimeout } from '@mantine/hooks';

const { start, clear } = useTimeout(callback, delay, {
  autoInvoke: true,
});
```

Arguments:

* `callback` – function that will be called after the timer elapses
* `delay` – number of milliseconds the timer should wait before the specified function is executed
* `options: { autoInvoke }` - determines whether the timer should be started on mount, defaults to false

Return object:

* `start` - starts the timer
* `clear` – cancels the timer

## Definition

```tsx
interface UseTimeoutOptions {
  autoInvoke: boolean;
}

interface UseTimeoutReturnValue {
  start: (...args: any[]) => void;
  clear: () => void;
}

function useTimeout(
  callback: (...args: any[]) => void,
  delay: number,
  options?: UseTimeoutOptions,
): UseTimeoutReturnValue
```

## Exported types

`UseTimeoutOptions` and `UseTimeoutReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseTimeoutOptions, UseTimeoutReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useToggle
Package: @mantine/hooks
Import: import { UseToggle } from '@mantine/hooks';

## Usage

`use-toggle` implements a common state pattern – it switches state between given values:



## API

The hook accepts an array as single argument, the first option will be used as the default value.

The hook returns an array with state value and toggle function:

```tsx
import { useToggle } from '@mantine/hooks';

const [value, toggle] = useToggle(['light', 'dark'] as const);

toggle(); // -> value == 'light'
toggle(); // -> value == 'dark'

// You can force specific value, in this case state will be set to given value
toggle('dark'); // -> value == 'dark'
```

If you do not provide an array with options, then `use-toggle` will use boolean values with `false` as default:

```tsx
import { useToggle } from '@mantine/hooks';

const [value, toggle] = useToggle();
// -> value === false
toggle(); // -> value === true
```

## Set type

By default, TypeScript will guess your type, but in most cases it's better to use const assertion to prevent type widening:

```tsx
import { useToggle } from '@mantine/hooks';

useToggle(['light', 'dark']); // value is string
useToggle(['light', 'dark'] as const); // value is 'dark' | 'light'
useToggle<'dark' | 'light'>(['light', 'dark']); // same as above
```

## Definition

```tsx
type UseToggleAction<T> = (value?: React.SetStateAction<T>) => void;
type UseToggleReturnValue<T> = [T, UseToggleAction<T>];

function useToggle<T = boolean>(options?: T[]): UseToggleReturnValue<T>;
```

## Exported types

`UseToggleReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseToggleReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useUncontrolled
Package: @mantine/hooks
Import: import { UseUncontrolled } from '@mantine/hooks';

## Usage

`use-uncontrolled` manages state for both controlled and uncontrolled components:

```tsx
import { useUncontrolled } from '@mantine/hooks';

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function CustomInput({
  value,
  defaultValue,
  onChange,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 'Final',
    onChange,
  });

  return (
    <input
      type="text"
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
    />
  );
}
```

## Set value type

By default, the hook will set type automatically, but you can provide your own type:

```tsx
import { useUncontrolled } from '@mantine/hooks';

function Demo() {
  const [_value, handleChange] = useUncontrolled<number>({
    value: 10,
    defaultValue: 5,
    finalValue: 20,
    onChange: (val) => console.log(val > 10),
  });
}
```

## Definition

```tsx
interface UseUncontrolledOptions<T> {
  /** Value for controlled state */
  value?: T;

  /** Initial value for uncontrolled state */
  defaultValue?: T;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;

  /** Controlled state onChange handler */
  onChange?: (value: T) => void;
}

type UseUncontrolledReturnValue<T> = [
  /** Current value */
  T,

  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T, ...payload: any[]) => void,

  /** True if the state is controlled, false if uncontrolled */
  boolean,
];

function useUncontrolled<T>(input: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T>;
```

## Exported types

`UseUncontrolledOptions` and `UseUncontrolledReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseUncontrolledOptions, UseUncontrolledReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useValidatedState
Package: @mantine/hooks
Import: import { UseValidatedState } from '@mantine/hooks';

## Usage

`use-validated-state` validates state with a given rule each time state is set.
It returns an object with current validation state, last valid value and current value:

```tsx
import { useValidatedState } from '@mantine/hooks';

const [{ lastValidValue, value, valid }, setValue] =
  useValidatedState('valid', (state) => state === 'valid');

lastValidValue; // -> valid
value; // -> valid
valid; // -> true

setValue('invalid');

lastValidValue; // -> valid
value; // -> invalid
valid; // -> false
```

## Example



## Definition

```tsx
interface UseValidatedStateValue<T> {
  /** Current value */
  value: T;

  /** Last valid value */
  lastValidValue: T | undefined;

  /** True if the current value is valid, false otherwise */
  valid: boolean;
}

type UseValidatedStateReturnValue<T> = [
  /** Current value */
  UseValidatedStateValue<T>,
  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T) => void,
];

function useValidatedState<T>(
  initialValue: T,
  validate: (value: T) => boolean,
  initialValidationState?: boolean,
): UseValidatedStateReturnValue<T>
```

## Exported types

`UseValidatedStateValue` and `UseValidatedStateReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseValidatedStateValue, UseValidatedStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useViewportSize
Package: @mantine/hooks
Import: import { UseViewportSize } from '@mantine/hooks';

## Usage

`use-viewport-size` returns current viewport's `width` and `height`, it subscribes to `resize` and `orientationchange` events,
during ssr hook will return `{ width: 0, height: 0 }`:



## Definition

```tsx
function useViewportSize(): {
  height: number;
  width: number;
};
```


--------------------------------------------------------------------------------

### useWindowEvent
Package: @mantine/hooks
Import: import { UseWindowEvent } from '@mantine/hooks';

## Usage

`use-window-event` adds event listener to `window` object on component mount and removes it on unmount:

```tsx
import { useEffect } from 'react';
import { useWindowEvent } from '@mantine/hooks';

const handler = (event: KeyboardEvent) => console.log(event);

// regular way
useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// with use-window-event hook
useWindowEvent('keydown', handler);
```

## Example

Search focus with `⌘ + K` on mac or `Ctrl + K` on windows and linux on Mantine docs website:

```tsx
import { useRef } from 'react';
import { useWindowEvent } from '@mantine/hooks';

function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return <input ref={inputRef} />;
}
```

## Definition

The hook has the same definition as `window.addEventListener` function:

```tsx
function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void;
```


--------------------------------------------------------------------------------

### useWindowScroll
Package: @mantine/hooks
Import: import { UseWindowScroll } from '@mantine/hooks';

## Usage

`use-window-scroll` returns current scroll position and a function to scroll smoothly to given position:



## Definition

```tsx
interface UseWindowScrollPosition {
  x: number;
  y: number;
}

type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void;
type UseWindowScrollReturnValue = [UseWindowScrollPosition, UseWindowScrollTo];

function useWindowScroll(): UseWindowScrollReturnValue;
```

## Exported types

`UseWindowScrollTo`, `UseWindowScrollPosition` and `UseWindowScrollReturnValue` types are exported from `@mantine/hooks` package,
you can import them in your application:

```tsx
import type { UseWindowScrollTo, UseWindowScrollPosition, UseWindowScrollReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

