# OTHER COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## OTHER COMPONENTS AND FEATURES

### NotFound

# 404

Nothing found. If some of the Mantine documentation pages are linking to
this page, please let us know by opening an [issue](https://github.com/mantinedev/mantine/issues/new/choose).
Otherwise, get back to the [home page](https://mantine.dev/).


--------------------------------------------------------------------------------

### About

# About Mantine

Mantine is a React components library focused on providing great user and developer experience.
Mantine development was started in January 2021 and the 1.0 version was released on [May 3rd, 2021](https://github.com/mantinedev/mantine/releases/tag/1.0.0),
and since then, [more than 200 releases have been published](https://github.com/mantinedev/mantine/releases).

## Releases cycle

All `@mantine/*` packages follow [semver](https://semver.org/):

* Patches (1.0.X) are usually released every one or two weeks
* Minor versions (1.X.0) are usually released once every 1-2 months
* Major versions (X.0.0) are released when breaking changes are required, usually a new major version is released once every 1-2 years

## Previous versions documentation

* [v1.mantine.dev](https://v1.mantine.dev/)
* [v2.mantine.dev](https://v2.mantine.dev/)
* [v3.mantine.dev](https://v3.mantine.dev/)
* [v4.mantine.dev](https://v4.mantine.dev/)
* [v5.mantine.dev](https://v5.mantine.dev/)
* [v6.mantine.dev](https://v6.mantine.dev/)
* [v7.mantine.dev](https://v7.mantine.dev/)

## Project maintenance

Mantine is built and maintained by [Vitaly Rtishchev](https://github.com/rtivital) and [more than 500 other contributors](https://github.com/mantinedev/mantine/graphs/contributors).
Most of new features and components/hooks are added to the library based on feedback from the community –
you can participate in new features discussions on [GitHub](https://github.com/mantinedev/mantine/discussions) or [Discord](https://discord.gg/wbH82zuWMN).

## Stats

Stats are counted automatically each time new version is published:

* {count.components} components (all `@mantine/*` packages)
* {count.hooks} hooks (`@mantine/hooks` package)
* {count.pages} documentation pages
* {count.demos} demos

## Mantine logo

Download Mantine logos in `.svg` format:

<LogoAssets />

You can also install `@mantinex/mantine-logo` package and import `MantineLogo` component.
Note that the package depends on `@mantine/core` and `@mantine/hooks` packages.

```bash
yarn add @mantinex/mantine-logo
```

```bash
npm install @mantinex/mantine-logo
```

#### Example: logo

```tsx
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return <MantineLogo />;
}
```



--------------------------------------------------------------------------------

### BrowserSupport

# Browser support

Mantine is tested on real devices in the following browsers before each minor and major release: Chrome, Safari, Firefox,
Edge, Safari for iOS, Chrome for Android. Testing in other browsers is not performed.

## Supported browsers

All Mantine components and hooks were tested to work in the following browsers:

* Chromium browsers 108+ – Chrome, Edge, Chrome for Android, etc.
* Firefox 101+
* Safari 15.4+
* IE (any version) is not supported

Browser versions that support [:where selector](https://caniuse.com/mdn-css_selectors_where) and [@layer directive](https://caniuse.com/mdn-css_at-rules_layer)
features that are required for Mantine styles (any versions below may have major issues with styles):

* Chromium browsers 99+ – Chrome, Edge, Chrome for Android, etc.
* Firefox 97+
* Safari 15.4+

## CSS features that contribute to browser support

Mantine components use the following CSS features:

* [:where selector](https://caniuse.com/mdn-css_selectors_where) in all components
* [@layer directive](https://caniuse.com/mdn-css_at-rules_layer) in all styles
* [:has pseudo-class](https://caniuse.com/css-has) in several components for non-critical styles
* [flexbox gap](https://caniuse.com/flexbox-gap) in most components
* [dvh units](https://caniuse.com/mdn-css_types_length_viewport_percentage_units_dynamic) in several components
* [color-mix](https://caniuse.com/mdn-css_types_color_color-mix) function is not used in any components by default, but can be used on your side with [alpha](styles/postcss-preset/#alpha-function) PostCSS function.
* [aspect-ratio](https://caniuse.com/mdn-css_properties_aspect-ratio) CSS property is used in several components
* [container queries](https://caniuse.com/css-container-queries) are used in several components if the option is explicitly enabled via prop

All CSS features listed above are supported in all modern browsers (90% or more of global usage as of January 2024).

If you need to support older browsers, you should:

* check the component `Browser support` section before usage and decide whether this component will work for your case
* install corresponding polyfills that are required for hook/component to work in older browsers
* check that the component works in those browsers on your side (we do not test Mantine in browsers that are older than those that are listed above)

## Polyfills

Mantine does not include any polyfills by default, you should install them manually if you need to support older browsers.
Usually, polyfills are automatically added to the project by your framework bundler (webpack, vite, etc.) based on the browserslist configuration.


--------------------------------------------------------------------------------

### Contribute

# Contributing to Mantine

First of all, thank you for showing interest in contributing to Mantine! All your contributions are extremely valuable to the project!

## Ways to contribute

* **Improve documentation:** Fix incomplete or missing docs, bad wording, examples or explanations.
* **Give feedback:** We are constantly working on making Mantine better. Please share how you use Mantine, what features are missing and what is done well via [GitHub Discussions](https://github.com/mantinedev/mantine/discussions/new) or [Discord](https://discord.gg/wbH82zuWMN).
* **Share Mantine:** Share links to the Mantine docs with everyone who might be interested! [Share Mantine on X here](https://x.com/intent/tweet?text=Mantine%20%E2%80%93%20new%20React%20library%20with%20100%2B%20components%20and%20hooks.%20It%20has%20native%20dark%20theme%20support%20and%20focuses%20on%20accessibility%20and%20usability.%0A%0Ahttp%3A%2F%2Fmantine.dev%0A%0A%23reactjs%20).
* **Contribute to the codebase:** Propose new features via [GitHub Issues](https://github.com/mantinedev/mantine/issues/new), or find an [existing issue](https://github.com/mantinedev/mantine/labels/help%20wanted) that you are interested in and work on it!
* **Give us a code review:** Help us identify problems with the [source code](https://github.com/mantinedev/mantine/tree/master/packages) or make Mantine more performant.

## Contributing workflow

* Decide on what you want to contribute.
* If you would like to implement a new feature, discuss it with the maintainer ([GitHub Discussions](https://github.com/mantinedev/mantine/discussions/new) or [Discord](https://discord.gg/wbH82zuWMN)) before jumping into coding.
* After finalizing issue details, you can begin working on the code.
* Run tests with `npm test` and submit a PR once all tests have passed.
* Get a code review and fix all issues noticed by the maintainer.
* If you cannot finish your task or if you change your mind – that's totally fine! Just let us know in the GitHub issue that you created during the first step of this process. The Mantine community is friendly – we won't judge or ask any questions if you decide to cancel your submission.
* Your PR is merged. You are awesome ❤️!

## Get started with Mantine locally

* Install the [editorconfig](https://editorconfig.org/) extension for your editor.
* Fork the [repository](https://github.com/mantinedev/mantine), then clone or download your fork.
* Run `nvm use` to switch to the Node version specified in `.nvmrc` file ([install nvm](https://github.com/nvm-sh/nvm)).
* Install dependencies with yarn – `yarn`
* Setup project – `npm run setup`
* Build local version of all packages – `npm run build all`
* To start storybook – `npm run storybook`
* To start docs – `npm run docs`
* To rebuild props descriptions – `npm run docs:docgen`

## npm scripts

All npm scripts are located at [main package.json](https://github.com/mantinedev/mantine/blob/master/package.json).
Individual packages do not have dedicated scripts.

### Development scripts

* `storybook` – Starts the storybook development server. To start storybook for a specific component, use the `npm run storybook Tooltip` command.
* `docs` – Starts the docs development server.

### Testing scripts

* `syncpack` – runs [syncpack](https://www.npmjs.com/package/syncpack)
* `typecheck` – runs TypeScript typechecking with `tsc --noEmit` on all packages and docs
* `lint` – runs ESLint on src folder
* `jest` – runs tests with jest
* `test` – runs all above testing scripts

### Docs scripts

* `docs:docgen` – generates components types information with [docgen script](https://github.com/mantinedev/mantine/blob/master/scripts/docgen/index.ts)
* `docs:build` – builds docs for production
* `docs:deploy` – builds and deploys docs to the GitHub Pages


--------------------------------------------------------------------------------

### EslintConfig

# Mantine ESLint config

[eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
is a set of ESLint rules and configurations used in Mantine projects.
You can use it in your project to ensure that your code follows the same
style and conventions as Mantine.

## Installation

Mantine ESLint config requires ESLint 9 or higher:

```bash
yarn add @eslint/js eslint eslint-plugin-jsx-a11y eslint-plugin-react typescript-eslint eslint-config-mantine
```

```bash
npm install @eslint/js eslint eslint-plugin-jsx-a11y eslint-plugin-react typescript-eslint eslint-config-mantine
```

## Usage

Add the following configuration to your `eslint.config.mjs`:

```tsx
import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
);
```

## Rules and source code

Mantine ESLint config extends recommended [ESLint](https://eslint.org/docs/rules/), [typescript-eslint](https://typescript-eslint.io/)
and [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) rules and adds custom rules and configurations.
You can find the full list of rules and source code in the [eslint-config-mantine repository](https://github.com/mantinedev/eslint-config-mantine/blob/master/eslint.config.js).


--------------------------------------------------------------------------------

### GettingStarted

# Getting started

## Get started with a template

The easiest way to get started is to use one of the templates.
All templates include required dependencies and pre-configured settings.
Some templates also include additional features like [Jest](https://jestjs.io/),
[Storybook](https://storybook.js.org/), [ESLint](https://eslint.org/), etc.

Templates include only `@mantine/core` and `@mantine/hooks` packages,
if you need additional `@mantine/*` packages, follow installation instructions
of the package you want to use.

To get started with a template, open it on GitHub and click "Use this template"
button. In order to use this feature you need to be logged in to your GitHub account.
If you are not familiar with GitHub, you can find a detailed instruction on how to
bootstrap a project from a template [in this article](https://help.mantine.dev/q/templates-usage).

Templates list:

<TemplatesList />

## Community templates

Community templates are created and maintained by the community members. These templates
include additional features and third-party integrations. You are welcome
to share your template with the community by following [this guide](https://help.mantine.dev/q/submit-template).

<TemplatesList community />

## Framework guide

If you want to add Mantine to an existing project or prefer to set up everything manually,
follow one of the guides below to get started with Mantine and your preferred framework.

<FrameworksGuides />

## Can I use Mantine with create-react-app?

[Create React App](https://create-react-app.dev/) was deprecated in early 2023 ([comment from maintainers](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741)).
It is not recommended to use it for new projects. It is recommended to use [Vite](https://vitejs.dev/) or [Next.js](https://nextjs.org/) instead.
Starting from version 7.0, certain Mantine styling features are no longer officially supported in Create React App.
If you still prefer to use Create React App, follow [this guide](https://help.mantine.dev/q/can-i-use-mantine-with-cra).

## Get started without framework

<PackagesInstallation />

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

> **PostCSS without framework**
>
> If you are using a framework that is not officially supported,
> you may need to configure PostCSS manually. Please refer to the framework's documentation for specific instructions.
> For instance, if you are using Webpack, it will be necessary to install and set up [postcss-loader](https://webpack.js.org/loaders/postcss-loader/).

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

Add styles imports to the root of your application. Usually styles are imported
once in the root file. For example, if you are using Next.js with pages router,
you can import styles in `_app.tsx` file:

```tsx
// core styles are required for all packages
import '@mantine/core/styles.css';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
```

Wrap your application with [MantineProvider](https://mantine.dev/theming/mantine-provider/):

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

If your application has server side rendering, add [ColorSchemeScript](https://mantine.dev/theming/color-schemes)
to the `<head />` of your application and spread `mantineHtmlProps` on the `<html />` element
to [avoid seeing a hydration warning](https://help.mantine.dev/q/color-scheme-hydration-warning):

```tsx
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

function Demo() {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>My awesome app</title>

        <ColorSchemeScript />
      </head>
      <body>{/* Your app here */}</body>
    </html>
  );
}
```

All set! You can now use Mantine components in your application.

## Set up VS Code

By default, VS Code does not recognize postcss syntax, you need to install
[PostCSS Intellisense and Highlighting](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss)
to enable syntax highlighting and suppress variables (`$variable`) errors.

To get CSS variables autocomplete, install [CSS Variable Autocomplete extension](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables).
Then create `.vscode/settings.json` file in the root folder of your project with the following content:

```json
{
  "cssVariables.lookupFiles": [
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "node_modules/@mantine/core/styles.css"
  ]
}
```

## Learn

Before you jump into the code, it is recommended to learn more about Mantine theming and styling options.
The most important documentation pages are:

* [Theme object](https://mantine.dev/theming/theme-object) – learn about available theme properties
* [Colors](https://mantine.dev/theming/colors) – learn how to add/replace colors in the theme object
* [CSS modules](https://mantine.dev/styles/css-modules) – learn how to use CSS modules with Mantine
* [postcss-preset-mantine](https://mantine.dev/styles/postcss-preset) – learn about `postcss-preset-mantine` functions and mixins
* [Responsive styles](https://mantine.dev/styles/responsive) – learn how to apply responsive styles to components
* [Styles API](https://mantine.dev/styles/styles-api) – learn how to style internal elements of any component
* [Polymorphic components](https://mantine.dev/guides/polymorphic) – learn how to use polymorphic components to change rendered element

## Support Mantine

All contributions to the projects are welcome and appreciated.
Contribute financially by [sponsoring the project on OpenCollective](https://opencollective.com/mantinedev).
Your sponsorship will help us to maintain the project and develop new features.

<Button rightSection={<IconHeartFilled size={22} color="var(--mantine-color-red-7)" />} size="lg" miw={300} justify="space-between" children="Sponsor Mantine" variant="default" radius="md" component="a" href="https://opencollective.com/mantinedev" />

Other ways to support the project:

* Share your feedback in [GitHub Discussions](https://github.com/mantinedev/mantine/discussions/categories/feedback) –
  we are always happy to hear your thoughts on how to improve Mantine. Most of the new features and components
  are based on the feedback received from the community.
* Help others on [Discord](https://discord.gg/wbH82zuWMN) and/or [GitHub Discussions](https://github.com/mantinedev/mantine/discussions). There are usually 10-20 new questions every day,
  you can help people with their issues and questions. While helping others, you will learn yourself and become
  more proficient with React and Mantine.
* Give us a code review. You are welcome to explore the [source code](https://github.com/mantinedev/mantine) of `@mantine/*` packages
  and provide your feedback on how it can be improved. We are always open to new ideas and suggestions.
* Send us some [kind words](https://github.com/mantinedev/mantine/discussions/categories/kind-words). We usually receive only
  bug reports and feature requests, it is always nice to hear that people enjoy working with Mantine.
* Star the project on [GitHub](https://github.com/mantinedev/mantine). It is a small thing that helps us grow and get more
  people interested in the project.
* [Contribute](https://mantine.dev/contribute) to the Mantine codebase. We welcome all kinds of contributions: if you do not have much
  experience with React/TypeScript, you can help us improve the documentation to make it more clear and understandable
  for new developers. If you are an experienced React developer, you can help us with open [issues](https://github.com/mantinedev/mantine/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).
* If you are using Mantine at work and your company wants to support the project, you can allocate some time
  of your engineers to contribute to Mantine.

## Mantine for Figma

Design is not a part of the development process – there are no official
Figma or Sketch design files. However, there are community-driven projects that provide Figma components
based on Mantine. Note that these projects are not maintained by Mantine team, and it is not guaranteed
that they are up-to-date with the latest Mantine version.

* [Design files by **Ravn**](https://www.figma.com/community/file/1293978471602433537)
* [Design files by **In The Zone**](https://www.figma.com/community/file/1067173247578645134)
* [Design files by **Devias**](https://www.figma.com/community/file/1212329956432440320/Mantine-UI-Design-System---v5.10)
* [Design files by **AlleyCorp Nord**](https://www.figma.com/community/file/1294398524808646906/mantine-lean-ui-library-alley-corp-nord)

## License

All `@mantine/*` packages are distributed under [MIT](https://github.com/mantinedev/mantine/blob/master/LICENSE) license.
You can use them in any project, commercial or not, with or without attribution. All `@mantine/*` packages
dependencies are also distributed under MIT license.


--------------------------------------------------------------------------------

### Support

# Support

This guide will help you understand how to get help, report bugs and connect with the community.
Keep in mind that Mantine is maintained by a small team of developers, all Mantine projects
are open-source and free for everyone.

## Get help

If you have any questions, need help with Mantine, want to request a feature,
or just want to chat with other developers, you can:

* Join [Mantine Discord server](https://discord.gg/wbH82zuWMN)
* Ask questions using [GitHub discussion](https://github.com/orgs/mantinedev/discussions)
* Visit [Help Center](https://help.mantine.dev/) to browse FAQ and guides

## Report an issue

We use GitHub issues to track bugs. You can find a list of current open issues on
[this page](https://github.com/mantinedev/mantine/issues). Usually, it takes up to
3 weeks to review and fix the issue. Issues reported on GitHub are fixed only in patch
releases (8.0.x) – minor and major releases are reserved for new features and breaking changes.

If you found a bug and want to report it, please follow these steps:

1. Search for similar issues on GitHub, maybe someone has already reported it.
2. Make sure that you are using the latest version of Mantine, the issue might have been already fixed.
3. If you did not find similar issues, [create a new one](https://github.com/mantinedev/mantine/issues/new/choose),
   make sure to use one of the provided templates and provide as much information as possible, including
   a [minimal reproduction example](https://stackoverflow.com/help/minimal-reproducible-example).
4. Wait for the issue to be reviewed and fixed.

## Get help on GitHub Discussions

[GitHub discussion](https://github.com/orgs/mantinedev/discussions) are used for questions,
feature requests, feedback, showcase and discussions. If clearly stated, questions are usually
answered within 24 hours. To get help on GitHub Discussions:

1. Before creating a new discussion, search for similar topics on [GitHub](https://github.com/orgs/mantinedev/discussions)
   and [Help Center](https://help.mantine.dev/).
2. If you did not find similar topics, [create a new discussion](https://github.com/orgs/mantinedev/discussions).
3. Wait for the discussion to be reviewed and answered.
4. If the provided answer solves your issue, mark it as a solution.

## Support Mantine

All contributions to the projects are welcome and appreciated.
There are many ways to support the project:

* Share your feedback in [GitHub Discussions](https://github.com/mantinedev/mantine/discussions/categories/feedback) –
  we are always happy to hear your thoughts on how to improve Mantine. Most of the new features and components
  are based on the feedback received from the community.
* Help others on [Discord](https://discord.gg/wbH82zuWMN) and/or [GitHub Discussions](https://github.com/mantinedev/mantine/discussions). There are usually 10-20 new questions every day,
  you can help people with their issues and questions. While helping others, you will learn yourself and become
  more proficient with React and Mantine.
* Give us a code review. You are welcome to explore the [source code](https://github.com/mantinedev/mantine) of `@mantine/*` packages
  and provide your feedback on how it can be improved. We are always open to new ideas and suggestions.
* Send us some [kind words](https://github.com/mantinedev/mantine/discussions/categories/kind-words). We usually receive only
  bug reports and feature requests, it is always nice to hear that people enjoy working with Mantine.
* Star the project on [GitHub](https://github.com/mantinedev/mantine). It is a small thing that helps us grow and get more
  people interested in the project.
* [Contribute](https://mantine.dev/contribute) to the Mantine codebase. We welcome all kinds of contributions: if you do not have much
  experience with React/TypeScript, you can help us improve the documentation to make it more clear and understandable
  for new developers. If you are an experienced React developer, you can help us with open [issues](https://github.com/mantinedev/mantine/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).
* If you are using Mantine at work and your company wants to support the project, you can allocate some time
  of your engineers to contribute to Mantine.


--------------------------------------------------------------------------------

### formActions
Package: @mantine/form
Import: import { FormActions } from '@mantine/form';

## Usage

Form actions allow changing state of the form from anywhere in your application.
The mechanism of form actions is similar to [notifications system](https://mantine.dev/x/notifications/),
[modals manager](https://mantine.dev/x/modals/) and other similar packages.

To use form actions, set `name` property in [use-form](https://mantine.dev/form/use-form/) settings:

```tsx
import { useForm } from '@mantine/form';

export interface DemoFormValues {
  name: string;
  age: number;
}

function Demo() {
  const form = useForm<DemoFormValues>({
    mode: 'uncontrolled',
    name: 'demo-form',
    initialValues: {
      name: '',
      age: 0,
    },
  });
}
```

Then call `createFormActions` function with the same form name as specified in `useForm` settings:

```tsx
// Import type of form values from the file where you defined useForm
import { createFormActions } from '@mantine/form';
import type { DemoFormValues } from './DemoForm';

export const demoFormActions =
  createFormActions<DemoFormValues>('demo-form');
```

After that, you can use `demoFormActions` to change form state from anywhere in your application.
For example, after a fetch request or after a user interaction with a component that does not have access
to the form state:

```tsx
import { useEffect } from 'react';
import { Button } from '@mantine/core';
import { demoFormActions } from './demoFormActions';

function ExternalComponent() {
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((res) =>
        demoFormActions.setValues({
          name: res.name,
          age: res.age,
        })
      );
  }, []);

  return (
    <Button onClick={() => demoFormActions.reset()}>
      Reset demo form
    </Button>
  );
}
```

## Form name

Form name must be a string that contains only letters, numbers and dashes:

```tsx
import { useForm } from '@mantine/form';

// ✅ Valid form name
const valid = useForm({
  name: 'valid-FORM-name-10',
  mode: 'uncontrolled',
});

// ❌ Invalid form name: must not contain spaces and special characters
const invalid = useForm({
  name: 'invalid_form name',
  mode: 'uncontrolled',
});
```

Note that form names must be unique, if you have multiple forms with the same name, form actions will
update the state of all forms with the same name.

## Form actions

`createFormActions` function returns an object with the following methods:

* `setFieldValue`
* `setValues`
* `setInitialValues`
* `setErrors`
* `setFieldError`
* `clearFieldError`
* `clearErrors`
* `reset`
* `validate`
* `validateField`
* `reorderListItem`
* `removeListItem`
* `insertListItem`
* `setDirty`
* `setTouched`
* `resetDirty`
* `resetTouched`

All methods work similar to [use-form](https://mantine.dev/form/use-form/) hooks methods –
functions accept the same arguments but do not return anything.


--------------------------------------------------------------------------------

### Form context
Package: @mantine/form
Import: import { Form context } from '@mantine/form';
Description: Add context support to use-form with createFormContext

## Usage

`createFormContext` function creates context provider and hook to get form object from context:

```tsx
import { TextInput } from '@mantine/core';
import { createFormContext } from '@mantine/form';

// Definition of form values is required
interface FormValues {
  age: number;
  name: string;
}

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
const [FormProvider, useFormContext, useForm] =
  createFormContext<FormValues>();

function ContextField() {
  const form = useFormContext();
  return (
    <TextInput
      label="Your name"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}

export function Context() {
  // Create form as described in use-form documentation
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 0,
      name: '',
    },
  });

  // Wrap your form with FormProvider
  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>
        <ContextField />
      </form>
    </FormProvider>
  );
}
```

## Store context in separate file

Usually it is a good idea to store form context in separate file to avoid dependencies cycle:

```tsx
// form-context.ts file
import { createFormContext } from '@mantine/form';

interface UserFormValues {
  age: number;
  name: string;
}

// You can give context variables any name
export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();
```

Then you can import context variables from anywhere:

```tsx
// NameInput.tsx
import { TextInput } from '@mantine/core';
import { useUserFormContext } from './form-context';

export function NameInput() {
  const form = useUserFormContext();
  return (
    <TextInput
      label="Name"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}
```

```tsx
// UserForm.tsx
import { NumberInput } from '@mantine/core';
import { UserFormProvider, useUserForm } from './form-context';
import { NameInput } from './NameInput';

function UserForm() {
  const form = useUserForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 0,
      name: '',
    },
  });

  return (
    <UserFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>
        <NumberInput
          label="Age"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />
        <NameInput />
      </form>
    </UserFormProvider>
  );
}
```


--------------------------------------------------------------------------------

### formErrors
Package: @mantine/form
Import: import { FormErrors } from '@mantine/form';

## Errors object

`form.errors` is an object of React nodes that contains validation errors:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { firstName: '', lastName: '' },
  validate: {
    firstName: (value) =>
      value.length < 2 ? 'First name is too short' : null,
    lastName: (value) =>
      value.length < 2 ? 'Last name is too short' : null,
  },
});

// Errors object is empty by default
form.errors; // -> {}

// Errors will be filled when you call form.validate manually
// or automatically with form.onSubmit handler
form.validate();

form.errors; // ->
// {
//   firstName: 'First name is too short',
//   lastName: 'Last name is too short'
// }
```

## Initial errors

Same as with [initial values](https://mantine.dev/form/values/) you can set initial form errors:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { firstName: '', lastName: '' },
  initialErrors: {
    firstName: 'First name is too short',
    lastName: 'Last name is too short',
  },
});
```

## setErrors handler

```tsx
import { useForm } from '@mantine/form';

const form = useForm({ mode: 'uncontrolled' });
form.setErrors({ firstName: 'Too short', email: 'Invalid email' });

form.errors;
// -> { firstName: 'Too short', email: 'Invalid email' }
```

## setFieldError handler

`form.setFieldError` handler sets error of the given field:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '' },
});

form.setFieldError('email', 'Invalid email');

form.errors; // -> { email: 'Invalid email' }
```

## clearErrors handler

`form.clearErrors` handler clear all form errors:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: 'Too short', email: 'Invalid email' },
});

form.clearErrors();

form.errors; // -> {}
```

## clearFieldError handler

`form.clearFieldError` handler clears error of the given field:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: 'Too short', email: 'Invalid email' },
});
form.clearFieldError('name');

form.errors; // -> { email: 'Invalid email' }
```

## Errors as react node

You can use any React node as an error message:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '' },
  initialErrors: {
    name: <p>Paragraph error</p>, // -> error as a react element
    email: 42, // -> error as a number
  },
});
```

Note that errors that are `false`, `null` or `undefined` will be automatically removed:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: 'name-error', email: null },
});

form.errors; // -> { name: 'name-error' }, email error is not included in errors object
```

## FormErrors type

`form.errors` type is `Record<string, React.ReactNode>`, you can import a shorthand `FormErrors` type from `@mantine/form`:

```tsx
import type { FormErrors } from '@mantine/form';
```

You can also get type directly from the `form` instance:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({ mode: 'uncontrolled' });

const handleErrors = (errors: typeof form.errors) => {};
```


--------------------------------------------------------------------------------

### formGetInputProps
Package: @mantine/form
Import: import { FormGetInputProps } from '@mantine/form';

## getInputProps handler

`form.getInputProps` returns an object with `value` (`defaultValue` for "uncontrolled" mode), `onChange`, `onFocus`, `onBlur`, `error`
and all props specified in `enhanceGetInputProps` function. Return value should be spread to the input component.

You can pass the following options to `form.getInputProps` as second argument:

* `type`: default `input`. Must be set to `checkbox` if the input requires `checked` prop instead of `value`.
* `withError`: default `type === 'input'`. Determines whether the returned object should contain an `error` property with
  `form.errors[path]` value.
* `withFocus`: default `true`. Determines whether the returned object should contain an `onFocus` handler. If disabled, the touched
  state will only change if value of the field has been changed.
* Any additional props that can be accessed with `enhanceGetInputProps` function. These props are not passed to the input.

```tsx
import { Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', accepted: false },
    validate: {
      name: (value) => value.trim().length > 2,
    },
  });

  return (
    <>
      <TextInput
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <Checkbox
        key={form.key('accepted')}
        {...form.getInputProps('accepted', { type: 'checkbox' })}
      />
    </>
  );
}
```

## enhanceGetInputProps

`enhanceGetInputProps` is a function that can be used to add additional props to the object returned by `form.getInputProps`.
You can define it in `useForm` hook options. Its argument is an object with the following properties:

* `inputProps` – object returned by `form.getInputProps` by default
* `field` – field path, first argument of `form.getInputProps`, for example `name`, `user.email`, `users.0.name`
* `options` – second argument of `form.getInputProps`, for example `{ type: 'checkbox' }`, can be used to pass additional
  options to `enhanceGetInputProps` function
* `form` – form instance

Example of using `enhanceGetInputProps` to disable input based on field path:

#### Example: enhanceGetInputProps

```tsx
import { NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => ({
      disabled: payload.field === 'name',
    }),
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
    </>
  );
}
```


Example of using `enhanceGetInputProps` to add additional props to the input based on option passed to `form.getInputProps`:

#### Example: enhanceGetInputPropsOptions

```tsx
import { NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (payload.options.fieldType === 'name') {
        return {
          label: 'Your name',
          placeholder: 'Your name',
          withAsterisk: true,
          description: 'Your personal information is stored securely. (Just kidding!)',
        };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput {...form.getInputProps('name', { fieldType: 'name' })} key={form.key('name')} />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
    </>
  );
}
```


Example of using `enhanceGetInputProps` to add `disabled` prop to all inputs if the form
has not been initialized yet:

#### Example: enhanceGetInputPropsForm

```tsx
import { NumberInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) {
        return { disabled: true };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Your name"
        placeholder="Your name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
      <Button onClick={() => form.initialize({ name: 'John', age: 20 })} mt="md">
        Initialize form
      </Button>
    </>
  );
}
```


## Initialize form

When called `form.initialize` handler sets `initialValues` and `values` to the same value
and marks form as initialized. It can be used only once, next `form.initialize` calls
are ignored.

`form.initialize` is useful when you want to sync form values with backend API response:

#### Example: initialize

```tsx
import { Button, NumberInput, TextInput } from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function apiRequest(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 25 });
    }, 1000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: 0 },
    validate: {
      name: isNotEmpty('Name is required'),
      age: isInRange({ min: 18 }, 'You must be at least 18 to register'),
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
      <Button onClick={() => apiRequest().then((values) => form.initialize(values))} mt="md">
        Initialize form
      </Button>
    </>
  );
}
```


Example with [TanStack Query](https://tanstack.com/query/latest) (react-query):

```tsx
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

function Demo() {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: () => fetch('/api/users/me').then((res) => res.json()),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (query.data) {
      // Even if query.data changes, form will be initialized only once
      form.initialize(query.data);
    }
  }, [query.data]);
}
```

## Integrate getInputProps with custom inputs

`form.getInputProps` returns an object with the following properties:

* `value`
* `defaultValue`
* `onChange`
* `onFocus`
* `onBlur`
* `error`

To create a custom input that works with `form.getInputProps`, make sure that your component
accepts these props and passes them to the input component or uses them in any other way.

Example of creating a custom input component:

```tsx
interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export function CustomInput({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  error,
}: CustomInputProps) {
  return (
    <div>
      <input
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <div>{error}</div>}
    </div>
  );
}
```

Then use it with `form.getInputProps`:

```tsx
import { useForm } from '@mantine/form';
import { CustomInput } from './CustomInput';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
  });

  return (
    <CustomInput
      {...form.getInputProps('name')}
      key={form.key('name')}
    />
  );
}
```


--------------------------------------------------------------------------------

### formNested
Package: @mantine/form
Import: import { FormNested } from '@mantine/form';

## Properties paths

Most of `form` handlers accept property path as the first argument.
Property path includes keys/indices of objects/arrays at which target property is contained:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },

    fruits: [
      { name: 'Banana', available: true },
      { name: 'Orange', available: false },
    ],

    deeply: {
      nested: {
        object: [{ item: 1 }, { item: 2 }],
      },
    },
  },
});

// Props for input that is controlled by user object firstName field
form.getInputProps('user.firstName');

// Set value of `name` field that is contained in object at second position of fruits array:
form.setFieldValue('fruits.1.name', 'Carrot');

// Validate deeply nested field
form.validateField('deeply.nested.object.0.item');
```

## Nested objects

#### Example: nested

```tsx
import { useForm } from '@mantine/form';
import { Box, Checkbox, TextInput } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      terms: false,
      user: {
        firstName: '',
        lastName: '',
      },
    },
  });

  return (
    <Box maw={340} mx="auto">
      <TextInput
        label="First name"
        placeholder="First name"
        key={form.key('user.firstName')}
        {...form.getInputProps('user.firstName')}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        mt="md"
        key={form.key('user.lastName')}
        {...form.getInputProps('user.lastName')}
      />
      <Checkbox
        label="I accept terms and conditions"
        mt="sm"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </Box>
  );
}
```


## Set nested object value

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      name: '',
      occupation: '',
    },
  },
});

// You can set values for each field individually
form.setFieldValue('user.name', 'John');
form.setFieldValue('user.occupation', 'Engineer');

// Or set the entire object
form.setFieldValue('user', { name: 'Jane', occupation: 'Architect' });
```

## Nested object values validation

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      name: '',
      occupation: '',
    },
  },

  validate: {
    user: {
      name: (value) =>
        value.length < 2 ? 'Name is too short' : null,
      occupation: (value) =>
        value.length < 2 ? 'Occupation is too short' : null,
    },
  },
});

form.validate();
form.errors; // -> { 'user.name': 'Name is too short', 'user.occupation': 'Occupation is too short' }
```

## Nested arrays

#### Example: lists

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: '', active: false, key: randomId() }],
    },
  });

  const fields = form.getValues().employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`employees.${index}.name`)}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <Switch
        label="Active"
        key={form.key(`employees.${index}.active`)}
        {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box maw={500} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Name
          </Text>
          <Text fw={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('employees', { name: '', active: false, key: randomId() })
          }
        >
          Add employee
        </Button>
      </Group>
    </Box>
  );
}
```


## List handlers

`useForm` hook provides the following handlers to manage list state:

* `removeListItem` – removes list item at given index
* `insertListItem` – inserts list item at given index (appends item to the end of the list if index is not specified)
* `reorderListItem` – reorders list item with given position at specified field
* `replaceListItem` – replaces list item at given index with new value

## List values validation

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    users: [
      { name: 'John', age: 12 },
      { name: '', age: 22 },
    ],
  },

  validate: {
    users: {
      name: (value) =>
        value.length < 2
          ? 'Name should have at least 2 letters'
          : null,
      age: (value) =>
        value < 18 ? 'User must be 18 or older' : null,
    },
  },
});

// Validate list item field
form.validateField('users.1.name');

// Or with all other fields
form.validate();
console.log(form.errors);
// {
//  'users.0.age': 'User must be 18 or older',
//  'users.1.name': 'Name should have at least 2 letters'
// }
```


--------------------------------------------------------------------------------

### HooksPackage
Package: @mantine/form
Import: import { HooksPackage } from '@mantine/form';

# Mantine form

[![npm](https://img.shields.io/npm/dm/@mantine/form)](https://www.npmjs.com/package/@mantine/form)

[@mantine/form](https://www.npmjs.com/package/@mantine/form) package
contains `useForm` hook that manages form state, validation, and submission.
`useForm` hook is designed to be used with other Mantine libraries (`@mantine/core`, `@mantine/dates`, etc.)
– all Mantine inputs are compatible with `useForm` out of the box.

## Installation

```bash
yarn add @mantine/form
```

```bash
npm install @mantine/form
```

## Usage

`@mantine/form` package can be used in any web React application.
Although the package is designed to work with Mantine component, it can
be used with native inputs or any other form libraries – it is standalone
and does not have any dependencies except React.

Example of using `useForm` hook to create a simple form:

#### Example: usage

```tsx
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key('termsOfService')}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


## License

MIT


--------------------------------------------------------------------------------

### formRecipes
Package: @mantine/form
Import: import { FormRecipes } from '@mantine/form';

## Set initial values with async request

#### Example: asyncSetValues

```tsx
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Checkbox } from '@mantine/core';

interface FormValues {
  email: string;
  terms: boolean;
}

function loadInitialValues(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ email: 'test@email', terms: true }), 2000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { email: '', terms: false },
  });

  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Checkbox
        mt="sm"
        label="I accept terms and conditions"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </form>
  );
}
```


## Save form values to local storage

#### Example: localStorage

```tsx
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Box } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', occupation: '' },
    onValuesChange: (values) => {
      window.localStorage.setItem('user-form', JSON.stringify(values));
    },
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem('user-form');
    if (storedValue) {
      try {
        form.setValues(JSON.parse(window.localStorage.getItem('user-form')!));
      } catch (e) {
        console.log('Failed to parse stored value');
      }
    }
  }, []);

  return (
    <Box maw={340} mx="auto">
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Occupation"
        placeholder="Occupation"
        key={form.key('occupation')}
        {...form.getInputProps('occupation')}
      />
    </Box>
  );
}
```


## List items reordering

#### Example: dnd

```tsx
import { Group, TextInput, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconGripVertical } from '@tabler/icons-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, index, form }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Group ref={setNodeRef} mt="xs" style={style} {...attributes}>
      <Center {...listeners}>
        <IconGripVertical size={18} />
      </Center>
      <TextInput
        placeholder="John Doe"
        key={form.key(`employees.${index}.name`)}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <TextInput
        placeholder="example@mail.com"
        key={form.key(`employees.${index}.email`)}
        {...form.getInputProps(`employees.${index}.email`)}
      />
    </Group>
  );
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [
        { name: 'John Doe', email: 'john@mantine.dev', key: randomId() },
        { name: 'Bill Love', email: 'bill@mantine.dev', key: randomId() },
        { name: 'Nancy Eagle', email: 'nanacy@mantine.dev', key: randomId() },
        { name: 'Lim Notch', email: 'lim@mantine.dev', key: randomId() },
        { name: 'Susan Seven', email: 'susan@mantine.dev', key: randomId() },
      ],
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const items = form.getValues().employees.map((item) => item.key);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const employees = form.getValues().employees;
      const oldIndex = employees.findIndex((e) => e.key === active.id);
      const newIndex = employees.findIndex((e) => e.key === over.id);
      form.setFieldValue(
        'employees',
        arrayMove(employees, oldIndex, newIndex)
      );
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => (
            <SortableItem key={id} id={id} index={index} form={form} />
          ))}
        </SortableContext>
      </DndContext>
      <Group justify="center" mt="md">
        <Button onClick={() => form.insertListItem('employees', { name: '', email: '', key: randomId() })}>
          Add employee
        </Button>
      </Group>
    </div>
  );
}
```


## Form with multiple steps

#### Example: stepper

```tsx
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email: /^\\S+@\\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput
            label="Username"
            placeholder="Username"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <TextInput
            label="Website"
            placeholder="Website"
            key={form.key('website')}
            {...form.getInputProps('website')}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            key={form.key('github')}
            {...form.getInputProps('github')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
}
```



--------------------------------------------------------------------------------

### formSchemaValidation
Package: @mantine/form
Import: import { FormSchemaValidation } from '@mantine/form';

## Schema based validation

`@mantine/form` supports schema validation with:

* [zod](https://www.npmjs.com/package/zod)
* [joi](https://www.npmjs.com/package/joi)
* [yup](https://www.npmjs.com/package/yup)
* [superstruct](https://www.npmjs.com/package/superstruct)
* [valibot](https://www.npmjs.com/package/valibot)

You need to install one of the libraries yourself, `@mantine/form` package does not depend on any of them.
If you do not know what schema validation library to choose, use [zod](https://www.npmjs.com/package/zod),
it is the most modern and developer-friendly library.

## zod

Installation:

```bash
yarn add zod mantine-form-zod-resolver
```

```bash
npm install zod mantine-form-zod-resolver
```

Basic fields validation with zod v3:

```tsx
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  age: z.number().min(18, {
    message: 'You must be at least 18 to create an account',
  }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: zodResolver(schema),
});

form.validate();
form.errors;
// -> {
//  name: 'Name should have at least 2 letters',
//  email: 'Invalid email',
//  age: 'You must be at least 18 to create an account'
// }
```

Nested fields validation

```tsx
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';

const nestedSchema = z.object({
  nested: z.object({
    field: z
      .string()
      .min(2, { message: 'Field should have at least 2 letters' }),
  }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: zodResolver(nestedSchema),
});

form.validate();
form.errors;
// -> {
//  'nested.field': 'Field should have at least 2 letters',
// }
```

List fields validation:

```tsx
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';

const listSchema = z.object({
  list: z.array(
    z.object({
      name: z
        .string()
        .min(2, { message: 'Name should have at least 2 letters' }),
    })
  ),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    list: [{ name: '' }],
  },
  validate: zodResolver(listSchema),
});

form.validate();
form.errors;
// -> {
//  'list.0.name': 'Name should have at least 2 letters',
// }
```

## zod v4

To use zod 4:

* Update `mantine-form-zod-resolver` to `1.2.0` or later version
* Update zod to version `3.25.0` or later
* Replace `zod` imports with `zod/v4` (only if you have `zod@3` in your `package.json`)
* Replace `zodResolver` with `zod4Resolver` in your code
* All other code remains the same

Example with zod v4:

```tsx
import { z } from 'zod/v4';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const schema = z.object({
  name: z.string().min(2, { error: 'Name should have at least 2 letters' }),
  email: z.email({ error: 'Invalid email' }),
  age: z.number().min(18, { error: 'You must be at least 18 to create an account' }),
});

const form = useForm({
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: zod4Resolver(schema),
})
```

## yup

Installation:

```bash
yarn add yup mantine-form-yup-resolver
```

```bash
npm install yup mantine-form-yup-resolver
```

Basic fields validation:

```tsx
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name should have at least 2 letters'),
  email: yup
    .string()
    .required('Invalid email')
    .email('Invalid email'),
  age: yup
    .number()
    .min(18, 'You must be at least 18 to create an account'),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: yupResolver(schema),
});

form.validate();
form.errors;
// -> {
//  name: 'Name should have at least 2 letters',
//  email: 'Invalid email',
//  age: 'You must be at least 18 to create an account'
// }
```

Nested fields validation:

```tsx
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';

const nestedSchema = yup.object().shape({
  nested: yup.object().shape({
    field: yup
      .string()
      .min(2, 'Field should have at least 2 letters'),
  }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: yupResolver(nestedSchema),
});

form.validate();
form.errors;
// -> {
//  'nested.field': 'Field should have at least 2 letters',
// }
```

List fields validation:

```tsx
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';

const listSchema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .min(2, 'Name should have at least 2 letters'),
    })
  ),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    list: [{ name: '' }],
  },
  validate: yupResolver(listSchema),
});

form.validate();
form.errors;
// -> {
//  'list.0.name': 'Name should have at least 2 letters',
// }
```

## joi

Installation:

```bash
yarn add joi mantine-form-joi-resolver
```

```bash
npm install joi mantine-form-joi-resolver
```

Basic fields validation:

```tsx
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useForm } from '@mantine/form';

const schema = Joi.object({
  name: Joi.string().min(2).messages({
    'string.min': 'Name should have at least 2 letters',
    'string.empty': 'Name should have at least 2 letters',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Invalid email',
      'string.empty': 'Invalid email',
    }),
  age: Joi.number()
    .min(18)
    .message('You must be at least 18 to create an account'),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: joiResolver(schema),
});

form.validate();
form.errors;
// -> {
//  name: 'Name should have at least 2 letters',
//  email: 'Invalid email',
//  age: 'You must be at least 18 to create an account'
// }
```

Nested fields validation:

```tsx
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useForm } from '@mantine/form';

const nestedSchema = Joi.object({
  nested: Joi.object({
    field: Joi.string().min(2).messages({
      'string.min': 'Field should have at least 2 letters',
      'string.empty': 'Field should have at least 2 letters',
    }),
  }),
});
const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: joiResolver(nestedSchema),
});

form.validate();
form.errors;
// -> {
//  'nested.field': 'Field should have at least 2 letters',
// }
```

List fields validation:

```tsx
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useForm } from '@mantine/form';

const listSchema = Joi.object({
  list: Joi.array().items(
    Joi.object({
      name: Joi.string().min(2).messages({
        'string.min': 'Name should have at least 2 letters',
        'string.empty': 'Name should have at least 2 letters',
      }),
    })
  ),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    list: [{ name: '' }],
  },
  validate: joiResolver(listSchema),
});

form.validate();
form.errors;
// -> {
//  'list.0.name': 'Name should have at least 2 letters',
// }
```

## superstruct

Installation:

```bash
yarn add superstruct mantine-form-superstruct-resolver
```

```bash
npm install superstruct mantine-form-superstruct-resolver
```

Basic fields validation:

```tsx
import isEmail from 'is-email';
import { superstructResolver } from 'mantine-form-superstruct-resolver';
import * as s from 'superstruct';

const emailString = s.define('email', isEmail);

const schema = s.object({
  name: s.size(s.string(), 2, 30),
  email: emailString,
  age: s.min(s.number(), 18),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: superstructResolver(schema),
});

form.validate();
form.errors;
// -> {
//   name: 'name: Expected a string with a length between `2` and `30` but received one with a length of `0`',
//   email: 'email: Expected a value of type `email`, but received: `""`',
//   age: 'age: Expected a number greater than or equal to 18 but received `16`',
// }
```

Nested fields validation:

```tsx
import { superstructResolver } from 'mantine-form-superstruct-resolver';
import * as s from 'superstruct';
import { useForm } from '@mantine/form';

const nestedSchema = s.object({
  nested: s.object({
    field: s.size(s.string(), 2, 30),
  }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: superstructResolver(nestedSchema),
});

form.validate();
form.errors;
// -> {
//  'nested.field': 'nested field: Expected a string with a length between `2` and `30` but received one with a length of `0`',
// }
```

List fields validation:

```tsx
import { superstructResolver } from 'mantine-form-superstruct-resolver';
import * as s from 'superstruct';
import { useForm } from '@mantine/form';

const listSchema = s.object({
  list: s.array(
    s.object({
      name: s.size(s.string(), 2, 30),
    })
  ),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    list: [{ name: '' }],
  },
  validate: superstructResolver(listSchema),
});

form.validate();
form.errors;
// -> {
//  'list 0 name: Expected a string with a length between `2` and `30` but received one with a length of `0`',
// }
```

## valibot

Installation:

```bash
yarn add valibot mantine-form-valibot-resolver
```

```bash
npm install valibot mantine-form-valibot-resolver
```

Basic fields validation:

```tsx
import { valibotResolver } from 'mantine-form-valibot-resolver';
import * as v from 'valibot';
import { useForm } from '@mantine/form';

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Name should have at least 2 letters')
  ),
  email: v.pipe(v.string(), v.email('Invalid email')),
  age: v.pipe(
    v.number(),
    v.minValue(18, 'You must be at least 18 to create an account')
  ),
});

const form = useForm({
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: valibotResolver(schema),
});

form.validate();
form.errors;
// -> {
//  name: 'Name should have at least 2 letters',
//  email: 'Invalid email',
//  age: 'You must be at least 18 to create an account'
// }
```

Nested fields validation:

```tsx
import { valibotResolver } from 'mantine-form-valibot-resolver';
import * as v from 'valibot';
import { useForm } from '@mantine/form';

const nestedSchema = v.object({
  nested: v.object({
    field: v.pipe(
      v.string(),
      v.minLength(2, 'Field should have at least 2 letters')
    ),
  }),
});

const form = useForm({
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: valibotResolver(nestedSchema),
});

form.validate();
form.errors;
// -> {
//  'nested.field': 'Field should have at least 2 letters',
// }
```

List fields validation:

```tsx
import { valibotResolver } from 'mantine-form-valibot-resolver';
import * as v from 'valibot';
import { useForm } from '@mantine/form';

const listSchema = v.object({
  list: v.array(
    v.object({
      name: v.pipe(
        v.string(),
        v.minLength(2, 'Name should have at least 2 letters')
      ),
    })
  ),
});

const form = useForm({
  initialValues: {
    list: [{ name: '' }],
  },
  validate: valibotResolver(listSchema),
});

form.validate();
form.errors;
// -> {
//  'list.0.name': 'Name should have at least 2 letters',
// }
```

With TypeScript:

You can use the `InferInput` type from the `valibot` library to get the type of the form data.

```tsx
import { valibotResolver } from 'mantine-form-valibot-resolver';
import * as v from 'valibot';
import { useForm } from '@mantine/form';

export const userSchema = v.object({
  email: v.pipe(v.string(), v.email()),
});

type FormData = v.InferInput<typeof userSchema>;

const form = useForm<FormData>({
  initialValues: {
    email: '',
  },
  validate: valibotResolver(userSchema),
});
```


--------------------------------------------------------------------------------

### formStatus
Package: @mantine/form
Import: import { FormStatus } from '@mantine/form';

## Touched and dirty state

`form.isTouched` and `form.isDirty` fields provide information about current field status:

* Field is considered to be `touched` when user focused it or its value was changed programmatically with `form.setFieldValue` handler
* Field is considered to be `dirty` when its value was changed and new value is different from field value specified in `initialValues` (compared with [fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal))

#### Example: status

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: 'initial value' },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('text')}
        key={form.key('text')}
        label="Touched/dirty demo"
        placeholder="Touched/dirty demo"
      />

      <Button
        onClick={() =>
          console.log({ touched: form.isTouched('text'), dirty: form.isDirty('text') })
        }
      >
        Log status to console
      </Button>
    </div>
  );
}
```


## isTouched and isDirty functions

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: 1, nested: { field: '' } },
});

// Provide path as first argument to get state of single field
form.isTouched('a'); // -> was field 'a' focused or changed?
form.isDirty('a'); // -> was field 'a' modified?
form.isDirty('nested.field'); // -> nested fields are also supported

// If field path is not provided,
// then functions will return form state instead
form.isTouched(); // -> was any field in form focused or changed?
form.isDirty(); // -> was any field in form modified?
```

## touchTrigger option

`touchTrigger` option allows customizing events that change touched state.
It accepts two options:

* `change` (default) – field will be considered touched when its value changes or it has been focused
* `focus` – field will be considered touched only when it has been focused

Example of using `focus` trigger:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: 1 },
  touchTrigger: 'focus',
});

form.isTouched('a'); // -> false
form.setFieldValue('a', 2);
form.isTouched('a'); // -> false

// onFocus is called automatically when the user focuses the field
form.getInputProps('a').onFocus();
form.isTouched('a'); // -> true
```

## Initial values

You can provide initial touched and dirty values with `initialTouched` and `initialDirty` properties.
Both properties support [the same fields path format as errors](https://mantine.dev/form/errors/):

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: 1, nested: { field: '' } },
  initialTouched: { a: true, 'nested.field': true },
  initialDirty: { a: true, 'nested.field': true },
});
```

## resetTouched and resetDirty

`form.resetTouched` and `form.resetDirty` functions will make all fields clean and untouched.
Note that `form.reset` will also reset `touched` and `dirty` state:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: 1 },
  initialTouched: { a: true },
  initialDirty: { a: true },
});

form.isDirty('a'); // -> true
form.isTouched('a'); // -> true

form.resetTouched();
form.isTouched('a'); // -> false

form.resetDirty();
form.isDirty('a'); // -> false
```

To reset values that are used for dirty check call `form.resetDirty` with new values:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: 1 },
});

form.setValues({ a: 2 });
form.isDirty(); // -> true

form.resetDirty({ a: 2 });
form.isDirty(); // -> false

form.setValues({ a: 3 });
form.isDirty(); // -> true
```

## Submitting state

`form.submitting` field will be set to `true` if function passed to
`form.onSubmit` returns a promise. After the promise is resolved or rejected,
`form.submitting` will be set to `false`:

#### Example: submitting

```tsx
import { useState } from 'react';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const asyncSubmit = (values: any) =>
  new Promise((resolve) => setTimeout(() => resolve(values), 3000));

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: 'John' },
  });

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    await asyncSubmit(values);
    setCompleted(true);
  };

  if (completed) {
    return (
      <Stack>
        <Text>Form submitted!</Text>
        <Button onClick={() => setCompleted(false)}>Reset to initial state</Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Your name"
        key={form.key('name')}
        disabled={form.submitting}
        {...form.getInputProps('name')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={form.submitting}>
          Submit
        </Button>
      </Group>
    </form>
  );
}
```


You can also manually set `form.submitting` to `true` or `false`:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({ mode: 'uncontrolled' });
form.submitting; // -> false

form.setSubmitting(true);
form.submitting; // -> true

form.setSubmitting(false);
form.submitting; // -> false
```


--------------------------------------------------------------------------------

### formUncontrolled
Package: @mantine/form
Import: import { FormUncontrolled } from '@mantine/form';

## Controlled mode

Controlled mode is the default mode of the form. In this mode, the form data is
stored in React state and all components are rerendered when form data changes.
Controlled mode is not recommended for large forms.

Example of a form with controlled mode:

#### Example: controlled

```tsx
import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'controlled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput {...form.getInputProps('name')} label="Name" placeholder="Name" />
      <TextInput {...form.getInputProps('email')} mt="md" label="Email" placeholder="Email" />
      <Button type="submit" mt="md">
        Submit
      </Button>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
    </form>
  );
}
```


As you can see in the example above, `form.values` update on every change. This
means that every component that uses `form.values` will rerender on every change.

## Uncontrolled mode

Uncontrolled mode is an alternative mode of the form introduced in 7.8.0 release.
It is now the recommended mode for all forms.
Uncontrolled mode provides significant performance improvements for large forms.

With uncontrolled mode, the form data is stored in a ref instead of React state
and `form.values` are not updated on every change.

Example of a form with uncontrolled mode:

#### Example: uncontrolled

```tsx
import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <TextInput
        {...form.getInputProps('email')}
        key={form.key('email')}
        mt="md"
        label="Email"
        placeholder="Email"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
    </form>
  );
}
```


As you can see in the example above, `form.values` do not update at all.

## form.getValues

`form.getValues` function returns current form values. It can be
used anywhere in the component to get the current form values. It can
be used in both controlled and uncontrolled modes.

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
});

form.getValues(); // { name: 'John Doe' }

form.setValues({ name: 'John Smith' });
form.getValues(); // { name: 'John Smith' }
```

Although `form.values` can be used to get the current form values in controlled mode, it is
recommended to use `form.getValues` instead as it always returns the latest
values while `form.values` is outdated in uncontrolled mode and before state
update in controlled mode.

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
});

const handleNameChange = () => {
  form.setFieldValue('name', 'Test Name');

  // ❌ Do not use form.values to get the current form values
  // form.values has stale name value until next rerender in controlled mode
  // and is always outdated in uncontrolled mode
  console.log(form.values); // { name: 'John Doe' }

  // ✅ Use form.getValues to get the current form values
  // form.getValues always returns the latest form values
  console.log(form.getValues()); // { name: 'Test Name' }
};
```

`form.getValues()` returns a ref value of the current form values. This means that
you cannot pass it to `useEffect` dependencies array as it will always be the same
reference.

```tsx
import { useEffect } from 'react';
import { useForm } from '@mantine/form';

const form = useForm({ mode: 'uncontrolled' });

useEffect(() => {
  // ❌ This will not work as form.getValues() is a ref value
  // and will always be the same reference
}, [form.getValues()]);
```

Instead of observing form values with `useEffect`, use `onValuesChange` callback
to listen to form values changes:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
  onValuesChange: (values) => {
    // ✅ This will be called on every form values change
    console.log(values);
  },
});
```

## form.getInputProps

[form.getInputProps](https://mantine.dev/form/get-input-props/) returns different props for controlled
and uncontrolled modes. In controlled mode, the returned object has `value` prop,
while in uncontrolled mode it has `defaultValue` prop.

Uncontrolled mode relies on `key` returned from `form.key()` to update
components when `form.setFieldValue` or `form.setValues` are called. You should
set `key` supplied by `form.key()` to the input component to ensure that it has
updated value:

```tsx
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: '' },
  });

  return (
    <input {...form.getInputProps('text')} key={form.key('text')} />
  );
}
```

In case you need to have a [list of fields](https://mantine.dev/form/nested/#nested-arrays),
do not pass `key` to the input component directly, instead add a wrapper
element and pass `key` to it:

```tsx
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';

// ❌ Incorrect: Do not override key prop, even in lists
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      jobs: [{ company: 'Google' }, { company: 'Facebook' }],
    },
  });

  const fields = form.getValues().jobs.map((_, index) => (
      <input
        {...form.getInputProps(`jobs.${index}.company`)}
        key={index}
      />
    ));

  return <form>{fields}</form>;
}

// ✅ Correct: Add wrapper element and pass key to it
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      jobs: [
        { company: 'Google', key: randomId() },
        { company: 'Facebook', key: randomId() },
      ],
    },
  });

  const fields = form.getValues().jobs.map((item, index) => (
      <div key={item.key}>
        <input
          {...form.getInputProps(`jobs.${index}.company`)}
          key={form.key(`jobs.${index}.company`)}
        />
      </div>
    ));

  return <form>{fields}</form>;
}
```

## Uncontrolled mode in custom components

If you want to build a custom component that supports uncontrolled form mode,
you must add support for `defaultValue` prop. The best way to add support for
`defaultValue` is to use [use-uncontrolled](https://mantine.dev/hooks/use-uncontrolled/) hook:

```tsx
import { useUncontrolled } from '@mantine/hooks';

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

// ✅ CustomInput supports both controlled and uncontrolled modes
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

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: 'Initial' },
  });

  // ✅ CustomInput supports `defaultValue` prop,
  // it can be used in uncontrolled mode
  return (
    <CustomInput
      {...form.getInputProps('text')}
      key={form.key('text')}
    />
  );
}
```


--------------------------------------------------------------------------------

### use-field
Package: @mantine/form
Import: import { use-field } from '@mantine/form';
Description: use-field hook – manage single field state

## Usage

`use-field` hook is a simpler alternative to [use-form](https://mantine.dev/form/use-form), it can be used to
manage state of a single input without the need to create a form:



## use-field API

`use-field` hook accepts the following options object as a single argument:

```tsx
interface UseFieldInput<T> {
  /** Field mode, controlled by default */
  mode?: 'controlled' | 'uncontrolled';

  /** Initial field value */
  initialValue: T;

  /** Initial touched value */
  initialTouched?: boolean;

  /** Initial field error message */
  initialError?: React.ReactNode;

  /** Called with updated value when the field value changes */
  onValueChange?: (value: T) => void;

  /** Determines whether the field should be validated when value changes, false by default */
  validateOnChange?: boolean;

  /** Determines whether the field should be validated when it loses focus, false by default */
  validateOnBlur?: boolean;

  /** Determines whether the field should clear error message when value changes, true by default */
  clearErrorOnChange?: boolean;

  /** A function to validate field value, can be sync or async */
  validate?: (value: T) => React.ReactNode | Promise<React.ReactNode>;

  /** Field type, input by default */
  type?: 'input' | 'checkbox';

  /** A function to resolve validation error from the result returned from validate function, should return react node */
  resolveValidationError?: (error: unknown) => React.ReactNode;
}
```

And returns the following object:

```tsx
export interface UseFieldReturnType<ValueType> {
  /** Returns props to pass to the input element */
  getInputProps: () => {
    /* props for input component */
  };

  /** Returns current input value */
  getValue: () => ValueType;

  /** Sets input value to the given value */
  setValue: (value: ValueType) => void;

  /** Resets field value to initial state, sets touched state to false, sets error to null */
  reset: () => void;

  /** Validates current input value when called */
  validate: () => Promise<React.ReactNode | void>;

  /** Set to true when async validate function is called, stays true until the returned promise resolves */
  isValidating: boolean;

  /** Current error message */
  error: React.ReactNode;

  /** Sets error message to the given react node */
  setError: (error: React.ReactNode) => void;

  /** Returns true if the input has been focused at least once */
  isTouched: () => boolean;

  /** Returns true if input value is different from the initial value */
  isDirty: () => boolean;

  /** Resets touched state to false */
  resetTouched: () => void;

  /** key that should be added to the input when mode is uncontrolled */
  key: number;
}
```

## Validate on blur

To validate the field on blur, set `validateOnBlur` option to `true`:



## Validate on change

To validate the field on change, set `validateOnChange` option to `true`:



## Async validation

`validate` option accepts both async and sync functions, in both cases the function
must return an error message that will be displayed to the user or `null` if the value
is valid. To keep track of async validation state, use `isValidating` property:



Async validation can be used with `validateOnBlur` option, but not recommended with
`validateOnChange` because it will trigger validation on every key press which may
lead to race conditions:



## Touched and dirty

To get information about whether the field has been focused at least once, use `isTouched` method
and to check if the value has been changed from the initial value, use `isDirty` method:



## Clear error on change

By default, the error message is cleared when the value changes, to disable this behavior
set `clearErrorOnChange` option to `false`:



## Uncontrolled mode

Uncontrolled mode of `use-field` hook works similar to uncontrolled mode of [use-form](https://mantine.dev/form/uncontrolled).
In uncontrolled mode, rerenders are minimized and the input value is managed by the input itself.
It is useful if you experience performance issues with controlled mode, but in most cases controlled
mode is recommended as it always provides up to date field information as React state.




--------------------------------------------------------------------------------

### use-form
Package: @mantine/form
Import: import { use-form } from '@mantine/form';
Description: Manage form state

## Installation

`@mantine/form` package does not depend on any other libraries, you can use it with or without `@mantine/core` inputs:

```bash
yarn add @mantine/form
```

```bash
npm install @mantine/form
```

## Usage

#### Example: usage

```tsx
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key('termsOfService')}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


## API overview

All examples below use the following example use-form hook.

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    path: '',
    path2: '',
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },
    fruits: [
      { name: 'Banana', available: true },
      { name: 'Orange', available: false },
    ],
    accepted: false,
  },
});
```

### Values

[Form values guide](https://mantine.dev/form/values/)

```tsx
// get current form values
form.getValues();

// Set all form values
form.setValues(values);

// Set all form values using the previous state
form.setValues((prev) => ({ ...prev, ...values }));

// Set value of single field
form.setFieldValue('path', value);

// Set value of nested field
form.setFieldValue('user.firstName', 'Jane');

// Resets form values to `initialValues`,
// clears all validation errors,
// resets touched and dirty state
form.reset();

// Reset field at `path` to its initial value
form.resetField('path');

// Sets initial values, used when form is reset
form.setInitialValues({ values: 'object' });
```

### List items

[Nested fields guide](https://mantine.dev/form/nested/)

```tsx
// Inserts given list item at the specified path
form.insertListItem('fruits', { name: 'Apple', available: true });

// An optional index may be provided to specify the position in a nested field.
// If the index is provided, item will be inserted at the given position.
// If the index is larger than the current list, the element is inserted at the last position.
form.insertListItem('fruits', { name: 'Orange', available: true }, 1);

// Removes the list item at the specified path and index.
form.removeListItem('fruits', 1);

// Replaces the list item at the specified path and index with the given item.
form.replaceListItem('fruits', 1, { name: 'Apple', available: true });

// Swaps two items of the list at the specified path.
// You should make sure that there are elements at at the `from` and `to` index.
form.reorderListItem('fruits', { from: 1, to: 0 });
```

### Validation

[Form validation guide](https://mantine.dev/form/validation/)

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    email: '',
    user: {
      firstName: '',
      lastName: '',
    },
  },
  validate: {
    email: (value) => (value.length < 2 ? 'Invalid email' : null),
    user: {
      firstName: (value) =>
        value.length < 2
          ? 'First name must have at least 2 letters'
          : null,
    },
  },
});

// Validates all fields with specified `validate` function or schema, sets form.errors
form.validate();

// Validates single field at specified path, sets form.errors
form.validateField('user.firstName');

// Works the same way as form.validate but does not set form.errors
form.isValid();
form.isValid('user.firstName');
```

### Errors

[Form errors guide](https://mantine.dev/form/errors/)

Validation errors occur when defined validation rules were violated, `initialErrors` were specified in useForm properties
or validation errors were set manually.

```tsx
// get current errors state
form.errors;

// Set all errors
form.setErrors({ path: 'Error message', path2: 'Another error' });

// Set error message at specified path
form.setFieldError('user.lastName', 'No special characters allowed');

// Clears all errors
form.clearErrors();

// Clears error of field at specified path
form.clearFieldError('path');
```

### onReset and onSubmit

Wrapper function for form `onSubmit` and `onReset` event handler. `onSubmit` handler accepts as second argument a function
that will be called with errors object when validation fails.

```tsx
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({ mode: 'uncontrolled' });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <>
      {/* Supply handle submit as a single argument to receive validated values */}
      <form onSubmit={form.onSubmit(handleSubmit)} />

      {/* Supply second argument to handle errors */}
      <form
        onSubmit={form.onSubmit(
          (values, event) => {
            console.log(
              values, // <- form.getValues() at the moment of submit
              event // <- form element submit event
            );
          },
          (validationErrors, values, event) => {
            console.log(
              validationErrors, // <- form.errors at the moment of submit
              values, // <- form.getValues() at the moment of submit
              event // <- form element submit event
            );
          }
        )}
      />

      {/* form.onReset calls form.reset */}
      <form onReset={form.onReset}></form>
    </>
  );
}
```

### onSubmitPreventDefault option

By default, `event.preventDefault()` is called on the form `onSubmit` handler.
If you want to change this behavior, you can pass `onSubmitPreventDefault` option
to `useForm` hook. It can have the following values:

* `always` (default) - always call `event.preventDefault()`
* `never` - never call `event.preventDefault()`
* `validation-failed` - call `event.preventDefault()` only if validation failed

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  onSubmitPreventDefault: 'never',
});
```

### Touched and dirty

[Touched & dirty guide](https://mantine.dev/form/status/)

```tsx
// Returns true if user interacted with any field inside form in any way
form.isTouched();

// Returns true if user interacted with field at specified path
form.isTouched('path');

// Set all touched values
form.setTouched({ 'user.firstName': true, 'user.lastName': false });

// Clears touched status of all fields
form.resetTouched();

// Returns true if form values are not deep equal to initialValues
form.isDirty();

// Returns true if field value is not deep equal to initialValues
form.isDirty('path');

// Sets dirty status of all fields
form.setDirty({ 'user.firstName': true, 'user.lastName': false });

// Clears dirty status of all fields, saves form.values snapshot
// After form.resetDirty is called, form.isDirty will compare
// form.getValues() to snapshot instead of initialValues
form.resetDirty();
```

## UseFormReturnType

`UseFormReturnType` can be used when you want to pass `form` as a prop to another component:

```tsx
import { TextInput } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';

interface FormValues {
  name: string;
  occupation: string;
}

function NameInput({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <TextInput
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}

function OccupationInput({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <TextInput
      key={form.key('occupation')}
      {...form.getInputProps('occupation')}
    />
  );
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', occupation: '' },
  });
  return (
    <>
      <NameInput form={form} />
      <OccupationInput form={form} />
    </>
  );
}
```


--------------------------------------------------------------------------------

### formValidation
Package: @mantine/form
Import: import { FormValidation } from '@mantine/form';

## Validation with rules object

To validate form with rules object, provide an object of functions which take field value as an argument
and return error message (any React node) or null if field is valid:

#### Example: rulesValidation

```tsx
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="Age"
        placeholder="Age"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


## Rule function arguments

Each form rule receives the following arguments:

* `value` – value of field
* `values` – all form values
* `path` – field path, for example `user.email` or `cart.0.price`

`path` argument can be used to get information about field location relative to other fields,
for example you can get index of array element:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: [{ b: 1 }, { b: 2 }] },
  validate: {
    a: {
      b: (value, values, path) => (path === 'a.0.b' ? 'error' : null),
    },
  },
});
```

## formRootRule

`formRootRule` is a special rule path that can be used to validate objects and arrays
alongside with their nested fields. For example, it is useful when you want to capture
a list of values, validate each value individually and then validate the list itself
to not be empty:

#### Example: rootRuleArray

```tsx
import { IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Switch, Text, TextInput } from '@mantine/core';
import { formRootRule, isNotEmpty, useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: '', active: false, key: randomId() }],
    },
    validate: {
      employees: {
        [formRootRule]: isNotEmpty('At least one employee is required'),
        name: isNotEmpty('Name is required'),
      },
    },
  });

  const fields = form.getValues().employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`employees.${index}.name`)}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <Switch
        label="Active"
        key={form.key(`employees.${index}.active`)}
        {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Name
          </Text>
          <Text fw={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}

      {fields}

      {form.errors.employees && (
        <Text c="red" size="sm" mt="sm">
          {form.errors.employees}
        </Text>
      )}

      <Group justify="space-between" mt="md">
        <Button
          variant="default"
          onClick={() => {
            form.insertListItem('employees', { name: '', active: false, key: randomId() });
            form.clearFieldError('employees');
          }}
        >
          Add employee
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


Another example is to validate an object fields combination:

#### Example: rootRuleObject

```tsx
import { Button, Text, TextInput } from '@mantine/core';
import { formRootRule, isNotEmpty, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      user: {
        firstName: '',
        lastName: '',
      },
    },

    validate: {
      user: {
        [formRootRule]: (value) =>
          value.firstName.trim().length > 0 && value.firstName === value.lastName
            ? 'First name and last name cannot be the same'
            : null,
        firstName: isNotEmpty('First name is required'),
        lastName: isNotEmpty('Last name is required'),
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        label="First name"
        placeholder="First name"
        {...form.getInputProps('user.firstName')}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        mt="md"
        {...form.getInputProps('user.lastName')}
      />
      {form.errors.user && (
        <Text c="red" mt={5} fz="sm">
          {form.errors.user}
        </Text>
      )}
      <Button type="submit" mt="lg">
        Submit
      </Button>
    </form>
  );
}
```


## Validation based on other form values

You can get all form values as a second rule function argument to perform field validation based on other
form values. For example, you can validate that password confirmation is the same as password:

#### Example: password

```tsx
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: 'secret',
      confirmPassword: 'sevret',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput
          label="Password"
          placeholder="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
```


## Function based validation

Another approach to handle validation is to provide a function to `validate`.
Function takes form values as single argument and should return object that contains
errors of corresponding fields. If field is valid or field validation is not required, you can either return null or simply omit it
from the validation results.

#### Example: validateFunction

```tsx
import { useForm } from '@mantine/form';
import { Box, TextInput, NumberInput, Button, Group } from '@mantine/core';

function Demo() {
  const form = useForm<{ name: string; age: number | undefined }>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: undefined },
    validate: (values) => ({
      name: values.name.length < 2 ? 'Too short name' : null,
      age:
        values.age === undefined
          ? 'Age is required'
          : values.age < 18
            ? 'You must be at least 18'
            : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Name"
          placeholder="Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="You age"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
```


## Validate fields on change

To validate all fields on change set `validateInputOnChange` option to `true`:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnChange: true,
});
```

#### Example: liveValidation

```tsx
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="Age"
        placeholder="Age"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


You can also provide an array of fields paths to validate only those values:

```tsx
import { FORM_INDEX, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnChange: [
    'name',
    'email',
    `jobs.${FORM_INDEX}.title`,
  ],
});
```

#### Example: liveFieldValidation

```tsx
import { useForm, FORM_INDEX } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: [
      'email',
      'name',
      // use FORM_INDEX to reference fields indices
      `jobs.${FORM_INDEX}.title`,
    ],
    initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      jobs: {
        title: (value) => (value.length < 2 ? 'Job must have at least 2 letters' : null),
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="Age"
        placeholder="Age"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <TextInput
        mt="sm"
        label="Job 1"
        placeholder="Job 1"
        key={form.key('jobs.0.title')}
        {...form.getInputProps('jobs.0.title')}
      />
      <TextInput
        mt="sm"
        label="Job 2"
        placeholder="Job 2"
        key={form.key('jobs.1.title')}
        {...form.getInputProps('jobs.1.title')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


## Validate fields on blur

To validate all fields on blur set `validateInputOnBlur` option to `true`:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnBlur: true,
});
```

#### Example: blurValidation

```tsx
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="Age"
        placeholder="Age"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


You can also provide an array of fields paths to validate only those values:

```tsx
import { FORM_INDEX, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnBlur: ['name', 'email', `jobs.${FORM_INDEX}.title`],
});
```

#### Example: blurFieldValidation

```tsx
import { useForm, FORM_INDEX } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: [
      'email',
      'name',
      // use FORM_INDEX to reference fields indices
      `jobs.${FORM_INDEX}.title`,
    ],
    initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      jobs: {
        title: (value) => (value.length < 2 ? 'Job must have at least 2 letters' : null),
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="Age"
        placeholder="Age"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <TextInput
        mt="sm"
        label="Job 1"
        placeholder="Job 1"
        key={form.key('jobs.0.title')}
        {...form.getInputProps('jobs.0.title')}
      />
      <TextInput
        mt="sm"
        label="Job 2"
        placeholder="Job 2"
        key={form.key('jobs.1.title')}
        {...form.getInputProps('jobs.1.title')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


## Clear field error on change

By default, field error is cleared when value changes. To change this, set `clearInputErrorOnChange` to `false`:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  clearInputErrorOnChange: false,
});
```

#### Example: clearErrorOnChange

```tsx
import { TextInput, Checkbox, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    clearInputErrorOnChange: false,
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key('termsOfService')}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


## Validation in onSubmit handler

`form.onSubmit` accepts two arguments: first argument is `handleSubmit` function that will be called with form values, when validation
was completed without errors, second argument is `handleErrors` function, it is called with errors object when validation was completed with errors.

You can use `handleErrors` function to perform certain actions when user tries to submit form without values,
for example, you can show a notification:

#### Example: onSubmitErrors

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  return (
    <form onSubmit={form.onSubmit(console.log, handleError)}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
}
```


## isValid handler

`form.isValid` performs form validation with given validation functions, rules object or schema, but unlike
`form.validate` it does not set `form.errors` and just returns boolean value that indicates whether form is valid.

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', age: 0 },
  validate: {
    name: (value) => (value.trim().length < 2 ? 'Too short' : null),
    age: (value) => (value < 18 ? 'Too young' : null),
  },
});

// get validation status of all values
form.isValid(); // -> false

// get validation status of field
form.isValid('name'); // -> false
```

## Focus first invalid field

The second argument of the `form.onSubmit` function is a callback function that is called
with the [errors object](https://mantine.dev/form/errors) when form validation fails.
You can use this callback to focus the first invalid field or perform any other action.

To get the DOM node of any input, use `form.getInputNode('path-to-field')`. Note that
in order for this feature to work, you need to spread `form.getInputProps('path-to-field')` to
the input element.

#### Example: focusError

```tsx
import { Button, Group, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'register-form',
    initialValues: {
      name: '',
      email: '',
    },

    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(
        (values) => console.log(values),
        (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        }
      )}
    >
      <TextInput
        withAsterisk
        label="Your name"
        placeholder="Your name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <TextInput
        withAsterisk
        label="Your email"
        placeholder="your@email.com"
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```



--------------------------------------------------------------------------------

### formValidators
Package: @mantine/form
Import: import { FormValidators } from '@mantine/form';

## Usage

`@mantine/form` package exports several functions that can be used in [validation rules object](https://mantine.dev/form/validation/#validation-with-rules-object).
Validation functions are tiny in size and provide basic validation, if you have complex validation requirements, use other types of [validation](https://mantine.dev/form/validation/).

#### Example: validators

```tsx
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, TextInput, NumberInput } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      job: '',
      email: '',
      favoriteColor: '',
      age: 18,
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      job: isNotEmpty('Enter your current job'),
      email: isEmail('Invalid email'),
      favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/, 'Enter a valid hex color'),
      age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        label="Name"
        placeholder="Name"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Your job"
        placeholder="Your job"
        withAsterisk
        mt="md"
        key={form.key('job')}
        {...form.getInputProps('job')}
      />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Your favorite color"
        placeholder="Your favorite color"
        withAsterisk
        mt="md"
        key={form.key('favoriteColor')}
        {...form.getInputProps('favoriteColor')}
      />
      <NumberInput
        label="Your age"
        placeholder="Your age"
        withAsterisk
        mt="md"
        key={form.key('age')}
        {...form.getInputProps('age')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


## Optional error

Last argument of all validator functions below is optional. If error is not set, then fields with failed validation will
only have invalid styles without error message:

#### Example: validatorsEmpty

```tsx
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, TextInput, NumberInput } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      job: '',
      email: '',
      favoriteColor: '',
      age: 18,
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }),
      job: isNotEmpty(),
      email: isEmail(),
      favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/),
      age: isInRange({ min: 18, max: 99 }),
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        label="Name"
        placeholder="Name"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Your job"
        placeholder="Your job"
        withAsterisk
        mt="md"
        key={form.key('job')}
        {...form.getInputProps('job')}
      />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Your favorite color"
        placeholder="Your favorite color"
        withAsterisk
        mt="md"
        key={form.key('favoriteColor')}
        {...form.getInputProps('favoriteColor')}
      />
      <NumberInput
        label="Your age"
        placeholder="Your age"
        withAsterisk
        mt="md"
        key={form.key('age')}
        {...form.getInputProps('age')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```


## isNotEmpty

`isNotEmpty` checks that form value is not empty. Empty string, empty array, `false`, `null` and `undefined`
values are considered to be empty. Strings are trimmed before validation.

```tsx
import { isNotEmpty, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    acceptTermsOfUse: false,
    country: null,
    previousJobs: [],
  },

  validate: {
    // Empty strings are considered to be invalid
    name: isNotEmpty('Name cannot be empty'),

    // False value is considered to be invalid
    acceptTermsOfUse: isNotEmpty('You must accept terms of use'),

    // null is considered to be invalid
    country: isNotEmpty('Pick your country'),

    // Empty arrays are considered to be invalid
    previousJobs: isNotEmpty('Enter at least one job'),
  },
});
```

## isEmail

`isEmail` uses `/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/` regexp to determine whether form value is an email:

```tsx
import { isEmail, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    email: '',
  },

  validate: {
    email: isEmail('Invalid email'),
  },
});
```

## matches

`matches` checks whether form value matches given regexp. If form value is not a string, validation will be failed.

```tsx
import { matches, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    color: '',
  },

  validate: {
    color: matches(/^#([0-9a-f]{3}){1,2}$/, 'Invalid color'),
  },
});
```

## isInRange

`isInRange` checks whether form value is within given `min`-`max` range. If form value is not a number, validation will be failed.

```tsx
import { isInRange, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    maxRange: 0,
    minRange: 0,
    minMaxRange: 0,
  },

  validate: {
    maxRange: isInRange({ max: 20 }, 'Value must be 20 or less'),
    minRange: isInRange({ min: 10 }, 'Value must be 10 or more'),
    minMaxRange: isInRange(
      { min: 10, max: 20 },
      'Value must be between 10 and 20'
    ),
  },
});
```

## hasLength

`hasLength` check whether form value length is within given `min`-`max` range.
`hasLength` will work correctly with strings, arrays and any other objects that have `length` property.
Strings are trimmed before validation.

```tsx
import { hasLength, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    exact: '',
    maxLength: '',
    minLength: '',
    minMaxLength: '',
  },

  validate: {
    exact: hasLength(5, 'Values must have exactly 5 characters'),
    maxLength: hasLength(
      { max: 20 },
      'Value must have 20 or less characters'
    ),
    minLength: hasLength(
      { min: 10 },
      'Value must have 10  or more characters'
    ),
    minMaxLength: hasLength(
      { min: 10, max: 20 },
      'Value must have 10-20 characters'
    ),
  },
});
```

## matchesField

`matchesField` checks whether form value is the same as value in other form field.
Note that `matchesField` can only work with primitive values (arrays and objects cannot be compared).

```tsx
import { matchesField, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    password: '',
    confirmPassword: '',
  },

  validate: {
    confirmPassword: matchesField(
      'password',
      'Passwords are not the same'
    ),
  },
});
```

## isJSONString

`isJSONString` checks whether form value is a valid JSON string.

```tsx
import { isJSONString, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    json: '',
  },

  validate: {
    json: isJSONString('Invalid JSON string'),
  },
});
```

## isNotEmptyHTML

`isNotEmptyHTML` checks that form value is not an empty HTML string. Empty string, string with only HTML tags and whitespace are considered to be empty.

```tsx
import { isNotEmptyHTML, useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    html: '',
  },

  validate: {
    html: isNotEmptyHTML('HTML cannot be empty'),
  },
});
```


--------------------------------------------------------------------------------

### formValues
Package: @mantine/form
Import: import { FormValues } from '@mantine/form';

## Initial values

In most cases you should set `initialValues`:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
  },
});
```

## setValues handler

With `form.setValues` you can set all form values, for example you can set values after you have received a response from the backend API:

#### Example: setValues

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="center" mt="xl">
        <Button
          onClick={() =>
            form.setValues({
              name: randomId(),
              email: `${randomId()}@test.com`,
            })
          }
        >
          Set random values
        </Button>
      </Group>
    </div>
  );
}
```


## setValues partial

`form.setValues` can also be used to set multiple values at once, payload will be shallow merged with current values state:

```tsx
import { useForm } from '@mantine/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '', age: 0 },
});

form.setValues({ name: 'John', age: 21 });
form.getValues(); // -> { name: 'John', email: '', age: 21 }
```

## Initialize form

When called `form.initialize` handler sets `initialValues` and `values` to the same value
and marks form as initialized. It can be used only once, next `form.initialize` calls
are ignored.

`form.initialize` is useful when you want to sync form values with backend API response:

#### Example: initialize

```tsx
import { Button, NumberInput, TextInput } from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function apiRequest(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 25 });
    }, 1000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: 0 },
    validate: {
      name: isNotEmpty('Name is required'),
      age: isInRange({ min: 18 }, 'You must be at least 18 to register'),
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
      <Button onClick={() => apiRequest().then((values) => form.initialize(values))} mt="md">
        Initialize form
      </Button>
    </>
  );
}
```


Example with [TanStack Query](https://tanstack.com/query/latest) (react-query):

```tsx
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

function Demo() {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: () => fetch('/api/users/me').then((res) => res.json()),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (query.data) {
      // Even if query.data changes, form will be initialized only once
      form.initialize(query.data);
    }
  }, [query.data]);
}
```

Note that `form.initialize` will erase all values that were set before it was called.
It is usually a good idea to set `readOnly` or `disabled` on all form fields before
`form.initialize` is called to prevent data loss. You can implement this with
[enhanceGetInputProps](https://mantine.dev/form/get-input-props/#enhancegetinputprops):

#### Example: enhanceGetInputPropsForm

```tsx
import { NumberInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) {
        return { disabled: true };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Your name"
        placeholder="Your name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
      <Button onClick={() => form.initialize({ name: 'John', age: 20 })} mt="md">
        Initialize form
      </Button>
    </>
  );
}
```


## setFieldValue handler

`form.setFieldValue` handler allows to set value of the field at given path:

#### Example: setFieldValue

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="center" mt="xl">
        <Button onClick={() => form.setFieldValue('name', randomId())}>Random name</Button>
        <Button onClick={() => form.setFieldValue('email', `${randomId()}@test.com`)}>
          Random email
        </Button>
      </Group>
    </div>
  );
}
```


## reset handler

`form.reset` handler sets values to `initialValues` and clear all errors:

#### Example: reset

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="center" mt="xl">
        <Button onClick={() => form.reset()}>Reset to initial values</Button>
      </Group>
    </div>
  );
}
```


## setInitialValues handler

`form.setInitialValues` handler allows to update `initialValues` after form was initialized:

```tsx
import { useEffect } from 'react';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        // Update initial values after form was initialized
        // These values will be used in form.reset
        // and to compare values to get dirty state
        form.setInitialValues(data);
        form.setValues(data);
      });
  }, []);
}
```

## transformValues

Use `transformValues` to transform values before they get submitted in `onSubmit` handler.
For example, it can be used to merge several fields into one or to convert types:

#### Example: transformValues

```tsx
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Code } from '@mantine/core';

function Demo() {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      age: '33',
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
      age: Number(values.age) || 0,
    }),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}
      >
        <TextInput
          label="First name"
          placeholder="First name"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label="Last name"
          placeholder="Last name"
          mt="md"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput
          type="number"
          label="Age"
          placeholder="Age"
          mt="md"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>

      {submittedValues && (
        <Code block mt="md">
          {submittedValues}
        </Code>
      )}
    </>
  );
}
```


## Get transformed values

You can get transformed values outside of `form.onSubmit` method by calling `form.getTransformedValues`.
It accepts `values` that need to be transformed as optional argument, if it is not provided, then
the result of `form.getValues()` transformation will be returned instead:

```tsx
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
    }),
  });

  form.getTransformedValues(); // -> { fullName: 'John Doe' }
  form.getTransformedValues({
    firstName: 'Jane',
    lastName: 'Loe',
  }); // { fullName: 'Jane Loe' }
}
```

## onValuesChange

`onValuesChange` function is called every time form values change, use it
instead of `useEffect` to subscribe to form values changes:

#### Example: onValuesChange

```tsx
import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
    </div>
  );
}
```


## form.watch

`form.watch` is an effect function that allows subscribing to changes of a
specific form field. It accepts field path and a callback function that is
called with new value, previous value, touched and dirty field states:

#### Example: watch

```tsx
import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  form.watch('name', ({ previousValue, value, touched, dirty }) => {
    console.log({ previousValue, value, touched, dirty });
  });

  return (
    <div>
      <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
    </div>
  );
}
```


Note that `form.watch` uses `useEffect` under the hood – all hooks rules apply.
For example, you cannot use `form.watch` conditionally or inside loops.

```tsx
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
  });

  // ❌ This will not work
  if (Math.random() > 0.5) {
    form.watch('name', ({ previousValue, value, touched, dirty }) => {
      console.log({ previousValue, value, touched, dirty });
    });
  }
}
```

## form.watch cascade

To loosely subscribe to changes, you can set `cascadeUpdates: true`.
This allows for parent objects to be written to directly, while still having
subscribers to nested keys updated. Additionally, writes to nested keys
will bubble up triggering parent key subscriptions as well.

#### Example: cascadeUpdates

```tsx
import { Button, Code, Stack, TextInput } from '@mantine/core';
import { createFormContext } from '@mantine/form';
import { useState } from 'react';

const [Provider, usePersonFormContext, usePersonForm] = createFormContext<{ person: { name: string } }>();

function Demo() {
  const form = usePersonForm({
    mode: 'uncontrolled',
    cascadeUpdates: true,
    initialValues: {
      person: { name: "" }
    }
  })

  return (
    <Provider form={form}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Name"
          key={form.key('person.name')}
          {...form.getInputProps('person.name')}
        />
        <Button onClick={() => form.setFieldValue("person", { name: "Jane Doe" })}>Set 'person' object to `{'{ name: "Jane Doe" }'}`</Button>
        <Watcher />
      </Stack>
    </Provider>
  );
}

function Watcher() {
  const form = usePersonFormContext();

  const [person, setPerson] = useState<{ name: string }>();
  const [name, setName] = useState<string>();

  form.watch('person', ({ value }) => setPerson(value));
  form.watch("person.name", ({ value }) => setName(value));

  return <Code block>{JSON.stringify({ person, name }, null, 2)}</Code>
}
```


## Get values type

```tsx
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({ initialValues: { name: '', age: 0 } });

  // Get inferred form values type, will be `{ name: string; age: number }`
  type FormValues = typeof form.values;

  // Use values type in handleSubmit function or anywhere else
  const handleSubmit = (values: FormValues) => console.log(values);
}
```

## Get transformed values type

To get transformed values (output of [transformValues](#transformvalues)) use `TransformedValues` type.
It is useful when you want to create a custom submit function:

```tsx
import { TransformedValues, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      locationId: '2',
    },

    transformValues: (values) => ({
      ...values,
      locationId: Number(values.locationId),
    }),
  });

  type Transformed = TransformedValues<typeof form>;
  // -> { name: string, locationId: number }

  const handleSubmit = (values: TransformedValues<typeof form>) => {};

  return <form onSubmit={form.onSubmit(handleSubmit)} />;
}
```

## Set values type

By default, form values types will be inferred from `initialValues`.
To avoid that, you can pass type to `useForm` hook, this approach is useful when
types cannot be correctly inferred or when you want to provide more specific types:

```tsx
import { useForm } from '@mantine/form';

interface FormValues {
  name: string; // regular field, same as inferred type
  role: 'user' | 'admin'; // union, more specific than inferred string type

  // values that may be undefined or null
  // cannot be correctly inferred in strict mode
  age: number | undefined;
  registeredAt: Date | null;

  // Arrays that are empty cannot be inferred correctly
  jobs: string[];
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      role: 'user',
      age: undefined,
      registeredAt: null,
      jobs: [],
    },
  });
}
```


--------------------------------------------------------------------------------

