# DATES COMPONENTS AND FEATURES

Source: https://mantine.dev/llms-full.txt
Generated: 2026-02-25T00:31:54.921Z

## DATES COMPONENTS AND FEATURES
Primary Package: @mantine/dates

### Calendar
Package: @mantine/dates
Import: import { Calendar } from '@mantine/dates';
Description: Base component for custom date pickers

## Usage

Use `Calendar` component to create custom date pickers if [DatePicker](https://mantine.dev/dates/date-picker/)
component does not meet your requirements. `Calendar` supports all [DatePicker](https://mantine.dev/dates/date-picker/)
props and some other props that are listed in props table – check it out to learn about all component features.

By default, `Calendar` works the same way as [DatePicker](https://mantine.dev/dates/date-picker/) component but does not
include any logic of dates selection:

#### Example: usage

```tsx
import { Calendar } from '@mantine/dates';

function Demo() {
  return <Calendar />;
}
```


## Custom date pickers

Use `Calendar` as a base for custom date pickers. For example, you can create a date picker
that allows user to pick three or less dates:

#### Example: picker

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';

function Demo() {
  const [selected, setSelected] = useState<string[]>([]);
  const handleSelect = (date: string) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <Calendar
      getDayProps={(date) => ({
        selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
        onClick: () => handleSelect(date),
      })}
    />
  );
}
```


Another custom date picker example – week picker:

#### Example: weekPicker

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';

function getDay(date: string) {
  const day = dayjs(date).day();
  return day === 0 ? 6 : day - 1;
}

function startOfWeek(date: string) {
  return dayjs(date)
    .subtract(getDay(date) + 1, 'day')
    .toDate();
}

function endOfWeek(date: string) {
  return dayjs(date)
    .add(6 - getDay(date), 'day')
    .endOf('day')
    .toDate();
}

function isInWeekRange(date: string, value: string | null) {
  return value
    ? dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value))
    : false;
}

function Demo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  return (
    <Calendar
      withCellSpacing={false}
      getDayProps={(date) => {
        const isHovered = isInWeekRange(date, hovered);
        const isSelected = isInWeekRange(date, value);
        const isInRange = isHovered || isSelected;
        return {
          onMouseEnter: () => setHovered(date),
          onMouseLeave: () => setHovered(null),
          inRange: isInRange,
          firstInRange: isInRange && new Date(date).getDay() === 1,
          lastInRange: isInRange && new Date(date).getDay() === 0,
          selected: isSelected,
          onClick: () => setValue(date),
        };
      }}
    />
  );
}
```


## Static prop

Set `static` prop to display a calendar that user cannot interact with.
It is useful when you want to display data with in calendar view but do
not want it to be interactive.

#### Example: isStatic

```tsx
import dayjs from 'dayjs';
import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';

function Demo() {
  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = dayjs(date).date();
        return (
          <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level in uncontrolled mode |
| enableKeyboardNavigation | boolean | - | Enable enhanced keyboard navigation (Ctrl/Cmd + Arrow keys for year navigation, Ctrl/Cmd + Shift + Arrow keys for decade navigation, Y key to open year view) |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| getDayAriaLabel | (date: string) => string | - | Assigns <code>aria-label</code> to <code>Day</code> components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> & DataAttributes | - | Passes props down to <code>Day</code> components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" | "previous" | "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| level | "month" | "year" | "decade" | - | Current displayed level displayed in controlled mode |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | Max level that user can go up to (decade, year, month) |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| minLevel | "month" | "year" | "decade" | - | Min level that user can go down to (decade, year, month) |
| monthLabelFormat | string | ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters month control |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters year control |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| size | MantineSize | - | Component size |
| static | boolean | - | Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way |
| weekdayFormat | string | ((date: string) => string) | - | <code>dayjs</code> format for weekdays names |
| weekendDays | (0 | 1 | 2 | 3 | 4 | 5 | 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by <code>DatesProvider</code>. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

Calendar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Calendar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-Calendar-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-Calendar-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-Calendar-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-Calendar-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-Calendar-levelsGroup | Group of months levels |
| yearsList | .mantine-Calendar-yearsList | Years list table element |
| yearsListRow | .mantine-Calendar-yearsListRow | Years list row element |
| yearsListCell | .mantine-Calendar-yearsListCell | Years list cell element |
| yearsListControl | .mantine-Calendar-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-Calendar-monthsList | Months list table element |
| monthsListRow | .mantine-Calendar-monthsListRow | Months list row element |
| monthsListCell | .mantine-Calendar-monthsListCell | Months list cell element |
| monthsListControl | .mantine-Calendar-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-Calendar-monthThead | thead element of month table |
| monthRow | .mantine-Calendar-monthRow | tr element of month table |
| monthTbody | .mantine-Calendar-monthTbody | tbody element of month table |
| monthCell | .mantine-Calendar-monthCell | td element of month table |
| month | .mantine-Calendar-month | Month table element |
| weekdaysRow | .mantine-Calendar-weekdaysRow | Weekdays tr element |
| weekday | .mantine-Calendar-weekday | Weekday th element |
| day | .mantine-Calendar-day | Month day control |
| weekNumber | .mantine-Calendar-weekNumber | Week number td element |

**Calendarheader selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-Calendarheader-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-Calendarheader-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-Calendarheader-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-Calendarheader-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |

**Calendarheader CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| calendarHeader | --dch-control-size | Controls size of the previous/next and level controls |
| calendarHeader | --dch-fz | Controls font-size of the previous/next and level controls |

**Calendarheader data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| calendarHeaderControl | data-direction | - | - |
| calendarHeaderControl | data-disabled | Control is disabled for any reason | - |


--------------------------------------------------------------------------------

### DateInput
Package: @mantine/dates
Import: import { DateInput } from '@mantine/dates';
Description: Free form date input

## DatePicker props

`DateInput` supports most of the [DatePicker](https://mantine.dev/dates/date-picker/) props,
read through [DatePicker](https://mantine.dev/dates/date-picker/) documentation to learn about all component features that are not listed on this page.

## Usage

#### Example: usage

```tsx
import { useState } from 'react';
import { DateInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DateInput
      value={value}
      onChange={setValue}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


## Value format

Use `valueFormat` prop to change [dayjs format](https://day.js.org/docs/en/display/format) of value label.
To use some custom formats, you need to enable [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format) plugin:

```tsx
// Do this once in your application root file
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

Example of using DateInput with custom format:

#### Example: format

```tsx
import { DateInput } from '@mantine/dates';

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="Date input" placeholder="Date input" />;
}
```


## Date parser

Use `dateParser` prop to replace default date parser. Parser function accepts user input (string)
and must return `Date` object:

#### Example: parser

```tsx
import dayjs from 'dayjs';
import { DateInput, DateInputProps } from '@mantine/dates';

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return '1939-09-01';
  }

  return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

function Demo() {
  return (
    <DateInput
      dateParser={dateParser}
      valueFormat="DD/MM/YYYY"
      label="Type WW2"
      placeholder="Type WW2"
    />
  );
}
```


## Allow clear

Set `clearable` prop to allow removing value from the input. Input will be cleared if
user selects the same date in dropdown or clears input value:

#### Example: clearable

```tsx
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


## Min and max date

Set `minDate` and `maxDate` props to define min and max dates. If date that is after `maxDate`
or before `minDate` is entered, then it will be considered invalid and input value will be reverted
to last known valid date value.

#### Example: minMax

```tsx
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';

function Demo() {
  return (
    <DateInput
      minDate={dayjs().format('YYYY-MM-DD')}
      maxDate={dayjs().add(1, 'month').format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { DateInput } from '@mantine/dates';

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}
```


## Input props

<InputFeatures component="DateInput" element="input" />

DateInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. DateInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { DateInput } from '@mantine/dates';


function Demo() {
  return (
    <DateInput
      
      placeholder="Input placeholder"
    />
  );
}
```


<GetElementRef component="DateInput" refType="input" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { DateInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <DateInput ref={ref} />;
}
```

<InputAccessibility component="DateInput" packageName="@mantine/dates" />

## Accessibility

DateInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | If set, the value can be deselected by deleting everything from the input or by clicking the selected date in the dropdown. By default, <code>true</code> if <code>clearable</code> prop is set, <code>false</code> otherwise. |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, clear button is displayed in the <code>rightSection</code> when the component has value. Ignored if <code>rightSection</code> prop is set. |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| dateParser | (value: string) => string | Date | null | - | A function to parse user input and convert it to date string value |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| fixOnBlur | boolean | - | If set to <code>false</code>, invalid user input is preserved and is not corrected on blur |
| getDayAriaLabel | (date: string) => string | - | Assigns <code>aria-label</code> to <code>Day</code> components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> & DataAttributes | - | Passes props down to <code>Day</code> components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| hasNextLevel | boolean | - | Determines whether next level button should be enabled |
| headerControlsOrder | ("next" | "previous" | "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| level | "month" | "year" | "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | Max level that user can go up to |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| monthLabelFormat | string | ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextDisabled | boolean | - | Disables next control |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: string | null) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: CalendarLevel) => void | - | Called when the level changes |
| onLevelClick | () => void | - | Called when the level button is clicked |
| onNext | () => void | - | Called when the next button is clicked |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPrevious | () => void | - | Called when the previous button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to the <code>Popover</code> component |
| previousDisabled | boolean | - | Disables previous control |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | - | Component size |
| value | DateValue | - | Controlled component value |
| valueFormat | string | - | <code>dayjs</code> format to display input value, <code>"MMMM D, YYYY"</code> by default |
| weekdayFormat | string | ((date: string) => string) | - | <code>dayjs</code> format for weekdays names |
| weekendDays | (0 | 1 | 2 | 3 | 4 | 5 | 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by <code>DatesProvider</code>. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withNext | boolean | - | Determines whether next control should be rendered |
| withPrevious | boolean | - | Determines whether previous control should be rendered |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DateInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DateInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DateInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DateInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DateInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DateInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DateInput-levelsGroup | Group of months levels |
| yearsList | .mantine-DateInput-yearsList | Years list table element |
| yearsListRow | .mantine-DateInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-DateInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DateInput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DateInput-monthsList | Months list table element |
| monthsListRow | .mantine-DateInput-monthsListRow | Months list row element |
| monthsListCell | .mantine-DateInput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DateInput-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DateInput-monthThead | thead element of month table |
| monthRow | .mantine-DateInput-monthRow | tr element of month table |
| monthTbody | .mantine-DateInput-monthTbody | tbody element of month table |
| monthCell | .mantine-DateInput-monthCell | td element of month table |
| month | .mantine-DateInput-month | Month table element |
| weekdaysRow | .mantine-DateInput-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DateInput-weekday | Weekday th element |
| day | .mantine-DateInput-day | Month day control |
| weekNumber | .mantine-DateInput-weekNumber | Week number td element |


--------------------------------------------------------------------------------

### DatePickerInput
Package: @mantine/dates
Import: import { DatePickerInput } from '@mantine/dates';
Description: Date, multiple dates and dates range picker input

## DatePicker props

`DatePickerInput` supports most of the [DatePicker](https://mantine.dev/dates/date-picker/) props,
read through [DatePicker](https://mantine.dev/dates/date-picker/) documentation to learn about all component features that are not listed on this page.

## Usage



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Presets

Use `presets` prop to add custom date presets. Presets are displayed next to the calendar:

#### Example: presets

```tsx
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      label="With presets"
      placeholder="Select date"
      presets={[
        { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), label: 'Yesterday' },
        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD'), label: 'Next month' },
        { value: dayjs().add(1, 'year').format('YYYY-MM-DD'), label: 'Next year' },
        { value: dayjs().subtract(1, 'month').format('YYYY-MM-DD'), label: 'Last month' },
        { value: dayjs().subtract(1, 'year').format('YYYY-MM-DD'), label: 'Last year' },
      ]}
    />
  );
}
```


To use `presets` with `type="range"`, define value a tuple of two dates:

#### Example: presetsRange

```tsx
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <DatePickerInput
      type="range"
      presets={[
        {
          value: [today.subtract(2, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last two days',
        },
        {
          value: [today.subtract(7, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last 7 days',
        },
        {
          value: [today.startOf('month').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'This month',
        },
        {
          value: [
            today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last month',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Last year',
        },
      ]}
    />
  );
}
```


## Open picker in modal

By default, [DatePicker](https://mantine.dev/dates/date-picker/) is rendered inside [Popover](https://mantine.dev/core/popover/).
You can change that to [Modal](https://mantine.dev/core/modal/) by setting `dropdownType="modal"`:



## Value format

Use `valueFormat` prop to change [dayjs format](https://day.js.org/docs/en/display/format) of value label:

#### Example: valueFormat

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      valueFormat="YYYY MMM DD"
      type="multiple"
      label="Pick date"
      placeholder="Pick date"
    />
  );
}
```


## Value formatter

`valueFormatter` is a more powerful alternative to `valueFormat` prop.
It allows formatting value label with a custom function.
The function is the same for all component types (`default`, `multiple` and `range`)
– you need to perform additional checks inside the function to handle different types.

Example of using a custom formatter function with `type="multiple"`:



## Clearable

Set `clearable` prop to display clear button in the right section. Note that if you set `rightSection`
prop, clear button will not be displayed.



## Disabled state

#### Example: disabled

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      valueFormat="YYYY MMM DD"
      type="multiple"
      label="Disabled"
      placeholder="Pick date"
      disabled
    />
  );
}
```


## Input props

<InputFeatures component="DatePickerInput" element="button" />

DatePickerInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. DatePickerInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.



## With icon



<GetElementRef component="DatePickerInput" refType="button" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { DatePickerInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <DatePickerInput ref={ref} />;
}
```

<InputAccessibility component="DatePickerInput" packageName="@mantine/dates" />

## Accessibility

DatePickerInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, clear button is displayed in the <code>rightSection</code> when the component has value. Ignored if <code>rightSection</code> prop is set. |
| closeOnChange | boolean | - | Determines whether the dropdown is closed when date is selected, not applicable with <code>type="multiple"</code> |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownType | "popover" | "modal" | - | Type of the dropdown |
| enableKeyboardNavigation | boolean | - | Enable enhanced keyboard navigation (Ctrl/Cmd + Arrow keys for year navigation, Ctrl/Cmd + Shift + Arrow keys for decade navigation, Y key to open year view) |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| getDayAriaLabel | (date: string) => string | - | Assigns <code>aria-label</code> to <code>Day</code> components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> & DataAttributes | - | Passes props down to <code>Day</code> components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" | "previous" | "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| labelSeparator | string | - | Separator between range value |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| level | "month" | "year" | "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | - |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to <code>Modal</code> component |
| monthLabelFormat | string | ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters month control |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters year control |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to <code>Popover</code> component |
| presets | DatePickerPreset<Type>[] | - | Predefined values to pick from |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before <code>onChange</code> call, only applicable with type="multiple" |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| valueFormat | string | - | <code>dayjs</code> format for input value |
| valueFormatter | DateFormatter | - | A function to format selected dates values into a string. By default, date is formatted based on the input type. |
| weekdayFormat | string | ((date: string) => string) | - | <code>dayjs</code> format for weekdays names |
| weekendDays | (0 | 1 | 2 | 3 | 4 | 5 | 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by <code>DatesProvider</code>. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DatePickerInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DatePickerInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DatePickerInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DatePickerInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DatePickerInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DatePickerInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DatePickerInput-levelsGroup | Group of months levels |
| yearsList | .mantine-DatePickerInput-yearsList | Years list table element |
| yearsListRow | .mantine-DatePickerInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-DatePickerInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DatePickerInput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DatePickerInput-monthsList | Months list table element |
| monthsListRow | .mantine-DatePickerInput-monthsListRow | Months list row element |
| monthsListCell | .mantine-DatePickerInput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DatePickerInput-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DatePickerInput-monthThead | thead element of month table |
| monthRow | .mantine-DatePickerInput-monthRow | tr element of month table |
| monthTbody | .mantine-DatePickerInput-monthTbody | tbody element of month table |
| monthCell | .mantine-DatePickerInput-monthCell | td element of month table |
| month | .mantine-DatePickerInput-month | Month table element |
| weekdaysRow | .mantine-DatePickerInput-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DatePickerInput-weekday | Weekday th element |
| day | .mantine-DatePickerInput-day | Month day control |
| weekNumber | .mantine-DatePickerInput-weekNumber | Week number td element |
| datePickerRoot | .mantine-DatePickerInput-datePickerRoot | Date picker root element, contains calendar and presets |
| presetsList | .mantine-DatePickerInput-presetsList | Presets wrapper element |
| presetButton | .mantine-DatePickerInput-presetButton | Preset button |
| placeholder | .mantine-DatePickerInput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### DatePicker
Package: @mantine/dates
Import: import { DatePicker } from '@mantine/dates';
Description: Inline date, multiple dates and dates range picker

## Usage



## Allow deselect

Set `allowDeselect` to allow user to deselect current selected date by clicking on it.
`allowDeselect` is disregarded when `type` prop is `range` or `multiple`. When date is
deselected `onChange` is called with `null`.



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Single date in range

By default, it is not allowed to select single date as range – when user clicks the same date second time it is deselected.
To change this behavior set `allowSingleDateInRange` prop. `allowSingleDateInRange` is ignored when
`type` prop is not `range`.



## Presets

Use `presets` prop to add custom date presets. Presets are displayed next to the calendar:

#### Example: presets

```tsx
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <DatePicker
      presets={[
        { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), label: 'Yesterday' },
        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD'), label: 'Next month' },
        { value: dayjs().add(1, 'year').format('YYYY-MM-DD'), label: 'Next year' },
        { value: dayjs().subtract(1, 'month').format('YYYY-MM-DD'), label: 'Last month' },
        { value: dayjs().subtract(1, 'year').format('YYYY-MM-DD'), label: 'Last year' },
      ]}
    />
  );
}
```


To use `presets` with `type="range"`, define value a tuple of two dates:

#### Example: presetsRange

```tsx
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <DatePicker
      type="range"
      presets={[
        {
          value: [today.subtract(2, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last two days',
        },
        {
          value: [today.subtract(7, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last 7 days',
        },
        {
          value: [today.startOf('month').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'This month',
        },
        {
          value: [
            today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last month',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Last year',
        },
      ]}
    />
  );
}
```


## Default date

Use `defaultDate` prop to set date value that will be used to determine which year should be displayed initially.
For example to display `2015 February` month set `defaultDate={new Date(2015, 1)}`. If value is not specified,
then `defaultDate` will use `new Date()`. Day, minutes and seconds are ignored in provided date object, only year and month data is used –
you can specify any date value.

Note that if you set `date` prop, then `defaultDate` value will be ignored.

#### Example: defaultDate

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <DatePicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
```


## Controlled date

Set `date`, and `onDateChange` props to make currently displayed month, year and decade controlled.
By doing so, you can customize date picking experience, for example, when user selects first date in range,
you can add one month to the current date value:

#### Example: controlledDate

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [date, setDate] = useState(new Date());

  const handleChange = (val: [Date | null, Date | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => new Date(current.getFullYear() + 1, 1));
    }

    setValue(val);
  };

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      type="range"
      value={value}
      onChange={handleChange}
    />
  );
}
```


## Default level

Set `defaultLevel` prop to configure initial level that will be displayed:

#### Example: defaultLevel

```tsx
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker defaultLevel="decade" />
      <DatePicker defaultLevel="year" />
    </Group>
  );
}
```


## Hide outside dates

Set `hideOutsideDates` prop to remove all dates that do not belong to the current month:

#### Example: hideOutsideDates

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker hideOutsideDates />;
}
```


## Display week numbers

Set `withWeekNumbers` prop to display week numbers:

#### Example: withWeekNumbers

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker withWeekNumbers />;
}
```


## First day of week

Set `firstDayOfWeek` prop to configure first day of week. The prop accepts number from 0 to 6,
where 0 is Sunday and 6 is Saturday. Default value is 1 – Monday. You can also configure this option
for all components with [DatesProvider](https://mantine.dev/dates/getting-started/).

#### Example: firstDayOfWeek

```tsx
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={6} />
    </Group>
  );
}
```


## Hide weekdays

Set `hideWeekdays` prop to hide weekdays names:

#### Example: hideWeekdays

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker hideWeekdays />;
}
```


## Weekend days

Use `weekendDays` prop to configure weekend days. The prop accepts an array of numbers from 0 to 6,
where 0 is Sunday and 6 is Saturday. Default value is `[0, 6]` – Saturday and Sunday. You can also configure this option
for all components with [DatesProvider](https://mantine.dev/dates/getting-started/).

#### Example: weekendDays

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}
```


## Render day function

You can customize day rendering with `renderDay` prop. For example, it can be used to add
[Indicator](https://mantine.dev/core/indicator/) to certain days.

#### Example: renderDay

```tsx
import dayjs from 'dayjs';
import { Indicator } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePicker renderDay={dayRenderer} />;
}
```


## Min and max date

Set `minDate` and `maxDate` props to define min and max dates. If previous/next page is not available
then corresponding control will be disabled.

#### Example: minMax

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-10"
      maxDate="2022-02-25"
    />
  );
}
```


## Change header controls order

Use `headerControlsOrder` prop to change order of header controls. The prop accepts an array of
`'next' | 'previous' | 'level`. Note that each control can be used only once in the array.

#### Example: headerControlsOrder

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <DatePicker
      defaultDate="2022-02-01"
      headerControlsOrder={['level', 'previous', 'next']}
      styles={{
        calendarHeaderLevel: {
          justifyContent: 'flex-start',
          paddingInlineStart: 8,
        },
      }}
    />
  );
}
```


## Add props to day, year and month control

You can add props to year, month and day controls with `getYearControlProps`, `getMonthControlProps` and `getDayProps` functions. All functions accept date as single argument,
props returned from the function will be added to year/month/day control. For example, it can be used to disable specific
control or add styles:

#### Example: controlProps

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';

const getDayProps: DatePickerProps['getDayProps'] = (date) => {
  const d = dayjs(date);

  if (d.day() === 5 && d.date() === 13) {
    return {
      style: {
        backgroundColor: 'var(--mantine-color-red-filled)',
        color: 'var(--mantine-color-white)',
      },
    };
  }

  return {};
};

const getYearControlProps: DatePickerProps['getYearControlProps'] = (date) => {
  const d = dayjs(date);

  if (d.year() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (d.year() === new Date().getFullYear() + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: DatePickerProps['getMonthControlProps'] = (date) => {
  const d = dayjs(date);
  if (d.month() === 1) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (d.month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePicker
      value={value}
      onChange={setValue}
      defaultDate="2021-08-01"
      getDayProps={getDayProps}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
```


## Exclude dates

To disable specific dates use `excludeDate` prop.
It accepts function that takes date as argument and returns boolean value – if `true` is returned, date will be disabled.
Example of disabling all dates that are not Fridays:

#### Example: excludeDate

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker excludeDate={(date) => new Date(date).getDay() !== 5} />;
}
```


## Number of columns

Set `numberOfColumns` prop to define number of pickers that will be rendered side by side:



## Max level

#### Example: maxLevel

```tsx
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker maxLevel="year" />
      <DatePicker maxLevel="month" />
    </Group>
  );
}
```


## Size



## Change year and months controls format

Use `yearsListFormat` and `monthsListFormat` props to change [dayjs format](https://day.js.org/docs/en/display/format) of year/month controls:

#### Example: listFormat

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}
```


## Change label format

Use `decadeLabelFormat`, `yearLabelFormat` and `monthLabelFormat` props to change [dayjs format](https://day.js.org/docs/en/display/format) of decade/year label:

#### Example: labelFormat

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePicker
      defaultLevel="decade"
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      monthLabelFormat="MM/YY"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Localization

Usually it is better to specify `@mantine/dates` package locale in [DatesProvider](https://mantine.dev/dates/getting-started/),
but you can also override locale per component:

#### Example: locale

```tsx
import 'dayjs/locale/ru';
import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker locale="ru" />;
}
```


## Accessibility

### Aria labels

Set `ariaLabels` prop to specify `aria-label` attributes for next/previous controls:

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <DatePicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
        nextYear: 'Next year',
        previousYear: 'Previous year',
        nextMonth: 'Next month',
        previousMonth: 'Previous month',
        yearLevelControl: 'Change to decade view',
        monthLevelControl: 'Change to year view',
      }}
    />
  );
}
```

### Year/month control aria-label

Use `getYearControlProps`/`getMonthControlProps`/`getDayProps` to customize `aria-label` attribute:

```tsx
import { DatePicker } from '@mantine/dates';

function Demo() {
  return (
    <DatePicker
      getDayProps={(date) => ({
        'aria-label': `Select date ${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`,
      })}
      getYearControlProps={(date) => ({
        'aria-label': `Select year ${date.getFullYear()}`,
      })}
      getMonthControlProps={(date) => ({
        'aria-label': `Select month ${date.getFullYear()}/${date.getMonth()}`,
      })}
    />
  );
}
```

### Keyboard interactions

Note that the following events will only trigger if focus is on date control.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| enableKeyboardNavigation | boolean | - | Enable enhanced keyboard navigation (Ctrl/Cmd + Arrow keys for year navigation, Ctrl/Cmd + Shift + Arrow keys for decade navigation, Y key to open year view) |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| getDayAriaLabel | (date: string) => string | - | Assigns <code>aria-label</code> to <code>Day</code> components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> & DataAttributes | - | Passes props down to <code>Day</code> components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" | "previous" | "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| level | "month" | "year" | "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | - |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| monthLabelFormat | string | ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters month control |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters year control |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| presets | DatePickerPreset<Type>[] | - | Predefined values to pick from |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| size | MantineSize | - | Component size |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| weekdayFormat | string | ((date: string) => string) | - | <code>dayjs</code> format for weekdays names |
| weekendDays | (0 | 1 | 2 | 3 | 4 | 5 | 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by <code>DatesProvider</code>. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DatePicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DatePicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DatePicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DatePicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DatePicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DatePicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DatePicker-levelsGroup | Group of months levels |
| yearsList | .mantine-DatePicker-yearsList | Years list table element |
| yearsListRow | .mantine-DatePicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-DatePicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DatePicker-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DatePicker-monthsList | Months list table element |
| monthsListRow | .mantine-DatePicker-monthsListRow | Months list row element |
| monthsListCell | .mantine-DatePicker-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DatePicker-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DatePicker-monthThead | thead element of month table |
| monthRow | .mantine-DatePicker-monthRow | tr element of month table |
| monthTbody | .mantine-DatePicker-monthTbody | tbody element of month table |
| monthCell | .mantine-DatePicker-monthCell | td element of month table |
| month | .mantine-DatePicker-month | Month table element |
| weekdaysRow | .mantine-DatePicker-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DatePicker-weekday | Weekday th element |
| day | .mantine-DatePicker-day | Month day control |
| weekNumber | .mantine-DatePicker-weekNumber | Week number td element |
| datePickerRoot | .mantine-DatePicker-datePickerRoot | Date picker root element, contains calendar and presets |
| presetsList | .mantine-DatePicker-presetsList | Presets wrapper element |
| presetButton | .mantine-DatePicker-presetButton | Preset button |

**DatePickerinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DatePickerinput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DatePickerinput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DatePickerinput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DatePickerinput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DatePickerinput-levelsGroup | Group of months levels |
| yearsList | .mantine-DatePickerinput-yearsList | Years list table element |
| yearsListRow | .mantine-DatePickerinput-yearsListRow | Years list row element |
| yearsListCell | .mantine-DatePickerinput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DatePickerinput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DatePickerinput-monthsList | Months list table element |
| monthsListRow | .mantine-DatePickerinput-monthsListRow | Months list row element |
| monthsListCell | .mantine-DatePickerinput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DatePickerinput-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DatePickerinput-monthThead | thead element of month table |
| monthRow | .mantine-DatePickerinput-monthRow | tr element of month table |
| monthTbody | .mantine-DatePickerinput-monthTbody | tbody element of month table |
| monthCell | .mantine-DatePickerinput-monthCell | td element of month table |
| month | .mantine-DatePickerinput-month | Month table element |
| weekdaysRow | .mantine-DatePickerinput-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DatePickerinput-weekday | Weekday th element |
| day | .mantine-DatePickerinput-day | Month day control |
| weekNumber | .mantine-DatePickerinput-weekNumber | Week number td element |
| datePickerRoot | .mantine-DatePickerinput-datePickerRoot | Date picker root element, contains calendar and presets |
| presetsList | .mantine-DatePickerinput-presetsList | Presets wrapper element |
| presetButton | .mantine-DatePickerinput-presetButton | Preset button |
| placeholder | .mantine-DatePickerinput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### DateTimePicker
Package: @mantine/dates
Import: import { DateTimePicker } from '@mantine/dates';
Description: Capture datetime from the user

## DatePicker props

`DateTimePicker` supports most of the [DatePicker](https://mantine.dev/dates/date-picker/) props,
read through [DatePicker](https://mantine.dev/dates/date-picker/) documentation to learn about all component features that are not listed on this page.

## Usage

#### Example: usage

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return <DateTimePicker label="Pick date and time" placeholder="Pick date and time" />;
}
```


## With seconds

#### Example: withSeconds

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return <DateTimePicker withSeconds label="Pick date and time" placeholder="Pick date and time" />;
}
```


## Presets

Use `presets` prop to add custom date presets. Presets are displayed next to the calendar:

#### Example: presets

```tsx
import dayjs from 'dayjs';
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      presets={[
        { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Yesterday' },
        { value: dayjs().format('YYYY-MM-DD HH:mm:ss'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: 'Next month' },
        { value: dayjs().add(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: 'Next year' },
        {
          value: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
          label: 'Last month',
        },
        { value: dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: 'Last year' },
      ]}
    />
  );
}
```


## TimePicker props

You can pass props down to the underlying [TimePicker](https://mantine.dev/dates/time-picker/) component
with `timePickerProps` prop. Example of enabling dropdown and setting `12h` format
for time picker:

#### Example: timePickerProps

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}
```


## Value format

Use `valueFormat` prop to change [dayjs format](https://day.js.org/docs/en/display/format) of value label:

#### Example: format

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      valueFormat="DD MMM YYYY hh:mm A"
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


## Disabled state

#### Example: disabled

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return <DateTimePicker label="Disabled" placeholder="Pick date and time" disabled />;
}
```


## Input props

<InputFeatures component="DateTimePicker" element="button" />

DateTimePicker component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. DateTimePicker documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { DateTimePicker } from '@mantine/dates';


function Demo() {
  return (
    <DateTimePicker
      
      placeholder="Input placeholder"
    />
  );
}
```


## Clearable

Set `clearable` prop to display clear button in the right section. Note that if you set `rightSection`
prop, clear button will not be displayed.

#### Example: clearable

```tsx
import dayjs from 'dayjs';
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


## Open picker in modal

By default, picker is rendered inside [Popover](https://mantine.dev/core/popover/).
You can change that to [Modal](https://mantine.dev/core/modal/) by setting `dropdownType="modal"`:

#### Example: modal

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      dropdownType="modal"
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


<GetElementRef component="DateTimePicker" refType="button" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { DateTimePicker } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <DateTimePicker ref={ref} />;
}
```

<InputAccessibility component="DateTimePicker" packageName="@mantine/dates" />

## Accessibility

DateTimePicker provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, clear button is displayed in the <code>rightSection</code> when the component has value. Ignored if <code>rightSection</code> prop is set. |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level in uncontrolled mode |
| defaultTimeValue | string | - | Default time value in <code>HH:mm</code> or <code>HH:mm:ss</code> format. Assigned to time when date is selected. |
| defaultValue | DateValue | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownType | "popover" | "modal" | - | Type of the dropdown |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| getDayAriaLabel | (date: string) => string | - | Assigns <code>aria-label</code> to <code>Day</code> components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars"> & DataAttributes | - | Passes props down to <code>Day</code> components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" | "previous" | "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| labelSeparator | string | - | Separator between range value |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| level | "month" | "year" | "decade" | - | Current displayed level displayed in controlled mode |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | Max level that user can go up to |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to <code>Modal</code> component |
| monthLabelFormat | string | ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: string | null) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to <code>Popover</code> component |
| presets | DatePickerPreset<"default">[] | - | Presets values |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before <code>onChange</code> call, only applicable with type="multiple" |
| submitButtonProps | ActionIconProps & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> | - | Props passed down to the submit button |
| timePickerProps | Omit<TimePickerProps, "defaultValue" | "value"> | - | Props passed down to <code>TimePicker</code> component |
| value | DateValue | - | Controlled component value |
| valueFormat | string | - | <code>dayjs</code> format for input value |
| weekdayFormat | string | ((date: string) => string) | - | <code>dayjs</code> format for weekdays names |
| weekendDays | (0 | 1 | 2 | 3 | 4 | 5 | 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by <code>DatesProvider</code>. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withSeconds | boolean | - | Determines whether the seconds input should be displayed |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DateTimePicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DateTimePicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DateTimePicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DateTimePicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DateTimePicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DateTimePicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DateTimePicker-levelsGroup | Group of months levels |
| yearsList | .mantine-DateTimePicker-yearsList | Years list table element |
| yearsListRow | .mantine-DateTimePicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-DateTimePicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DateTimePicker-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DateTimePicker-monthsList | Months list table element |
| monthsListRow | .mantine-DateTimePicker-monthsListRow | Months list row element |
| monthsListCell | .mantine-DateTimePicker-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DateTimePicker-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DateTimePicker-monthThead | thead element of month table |
| monthRow | .mantine-DateTimePicker-monthRow | tr element of month table |
| monthTbody | .mantine-DateTimePicker-monthTbody | tbody element of month table |
| monthCell | .mantine-DateTimePicker-monthCell | td element of month table |
| month | .mantine-DateTimePicker-month | Month table element |
| weekdaysRow | .mantine-DateTimePicker-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DateTimePicker-weekday | Weekday th element |
| day | .mantine-DateTimePicker-day | Month day control |
| weekNumber | .mantine-DateTimePicker-weekNumber | Week number td element |
| datePickerRoot | .mantine-DateTimePicker-datePickerRoot | Date picker root element, contains calendar and presets |
| presetsList | .mantine-DateTimePicker-presetsList | Presets wrapper element |
| presetButton | .mantine-DateTimePicker-presetButton | Preset button |
| placeholder | .mantine-DateTimePicker-placeholder | Placeholder element |
| timeWrapper | .mantine-DateTimePicker-timeWrapper | Wrapper around time input and submit button |
| timeInput | .mantine-DateTimePicker-timeInput | TimeInput |
| submitButton | .mantine-DateTimePicker-submitButton | Submit button |


--------------------------------------------------------------------------------

### GettingStartedDates
Package: @mantine/dates
Import: import { GettingStartedDates } from '@mantine/dates';

## Installation

```bash
yarn add @mantine/dates dayjs
```

```bash
npm install @mantine/dates dayjs
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import dates styles after core package styles
import '@mantine/dates/styles.css';
```

## Do not forget to import styles

Followed installation instructions above but something is not working
(calendars and date pickers have no styles and look broken)?
You've fallen into the trap of not importing dates styles!
To fix the issue, import dates styles at the root of your application:

```tsx
import '@mantine/dates/styles.css';
```

## Usage

After installing `@mantine/dates` package and importing styles, you can use all components from it:



## dayjs

`@mantine/dates` components use [dayjs](https://day.js.org/) under the hood for date manipulations and formatting.
dayjs is a required dependency – you cannot change it to another date library. If you want to use a different
date library in your application, you will need to install it separately.

## DatesProvider

`DatesProvider` component lets you set various settings that are shared across all
components exported from `@mantine/dates` package. `DatesProvider` supports the following settings:

* `locale` – dayjs locale, note that you also need to import corresponding locale module from dayjs. Default value is `en`.
* `firstDayOfWeek` – number from 0 to 6, where 0 is Sunday and 6 is Saturday. Default value is 1 – Monday.
* `weekendDays` – an array of numbers from 0 to 6, where 0 is Sunday and 6 is Saturday. Default value is `[0, 6]` – Saturday and Sunday.
* `consistentWeeks` – boolean, if `true` every month will have 6 weeks. Default value is `false`.

#### Example: usage

```tsx
import 'dayjs/locale/ru';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
      <MonthPickerInput label="Pick month" placeholder="Pick month" />
      <DatePickerInput mt="md" label="Pick date" placeholder="Pick date" />
    </DatesProvider>
  );
}
```


## Consistent weeks

If you want to avoid layout shifts, set `consistentWeeks: true` in `DatesProvider` settings.
This will make sure that every month has 6 weeks, even if outside days are not in the same month.

#### Example: consistentWeeks

```tsx
import { DatePicker, DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}
```


## Custom parse format

Some components like [DateInput](https://mantine.dev/dates/date-input) require [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format)
dayjs plugin. You need to extend dayjs with this plugin before using components that require it. Note that
it is usually done once in your application root file, so you don't need to do it every time you use component.

```tsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

## Localization and server components

To add localization you must import `import 'dayjs/locale/x';` in your application (`x` is locale name)
and set `locale` either on `DatesProvider` or on each component individually.

Example of setting locale on DatesProvider:

```tsx
import 'dayjs/locale/ru';

import { DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* Your app  */}
    </DatesProvider>
  );
}
```

The code above works in all environments, except Next.js app router.
If you are using Next.js app router, you must add `'use client';` to the
top of the file where you are importing `dayjs/locale/x` – locale data
is required both on client and server.

```tsx
'use client';

import 'dayjs/locale/ru';

import { DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* Your app  */}
    </DatesProvider>
  );
}
```


--------------------------------------------------------------------------------

### MiniCalendar
Package: @mantine/dates
Import: import { MiniCalendar } from '@mantine/dates';
Description: Compact calendar to display a small number of days in a row

## Usage

#### Example: usage

```tsx
import { useState } from 'react';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  const [value, onChange] = useState<string | null>('2025-04-15');
  return <MiniCalendar value={value} onChange={onChange} numberOfDays={6} />;
}
```


## Number of days

Use `numberOfDays` prop to control how many days are displayed at once.
The default value is `7`.

#### Example: numberOfDays

```tsx
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}
```


## getDayProps

Use `getDayProps` to add custom props to days, for example, assign styles to weekends:

#### Example: getDayProps

```tsx
import dayjs from 'dayjs';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return (
    <MiniCalendar
      numberOfDays={6}
      getDayProps={(date) => ({
        style: {
          color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-red-8)' : undefined,
        },
      })}
    />
  );
}
```


## Min and max dates

Use `minDate` and `maxDate` props to limit date selection:

#### Example: minMax

```tsx
import { useState } from 'react';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  const [value, onChange] = useState<string | null>('2025-04-15');
  return (
    <MiniCalendar
      value={value}
      onChange={onChange}
      numberOfDays={6}
      defaultDate="2025-04-13"
      minDate="2025-04-14"
      maxDate="2025-04-24"
    />
  );
}
```


## Localization

You can change localization both on component level with `locale` prop and
globally with [DatesProvider](https://mantine.dev/dates/getting-started).

#### Example: locale

```tsx
import 'dayjs/locale/ru';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return <MiniCalendar defaultDate="2025-04-15" locale="ru" numberOfDays={6} />;
}
```


## Accessibility

Use `nextControlProps` and `previousControlProps` to add `aria-label` and other props to navigation buttons:

```tsx
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return (
    <MiniCalendar
      nextControlProps={{ 'aria-label': 'Next range' }}
      previousControlProps={{ 'aria-label': 'Previous range' }}
    />
  );
}
```


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| date | string | Date | - | Controlled component date value, start date of the interval |
| defaultDate | string | Date | - | Uncontrolled component default value, start date of the interval |
| getDayProps | (date: string) => Record<string, any> | - | Props passed down to the day component |
| locale | string | - | dayjs locale used for formatting |
| maxDate | string | Date | - | Maximum date that can be selected, date object or date string in <code>YYYY-MM-DD</code> format |
| minDate | string | Date | - | Minimum date that can be selected, date object or date string in <code>YYYY-MM-DD</code> format |
| monthLabelFormat | string | - | Dayjs format string for month label |
| nextControlProps | Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & DataAttributes | - | Props passed to next control button |
| numberOfDays | number | - | Number of days to display in the calendar |
| onChange | (date: string) => void | - | Called with date in <code>YYYY-MM-DD</code> format when date changes |
| onDateChange | (date: string) => void | - | Called with date in <code>YYYY-MM-DD</code> format when date internal changes |
| onNext | () => void | - | Called when the next button is clicked |
| onPrevious | () => void | - | Called when the previous button is clicked |
| previousControlProps | Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & DataAttributes | - | Props passed to previous control button |
| size | MantineSize | - | Component size |
| value | string | Date | null | - | Selected date, controlled value |


#### Styles API

MiniCalendar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MiniCalendar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-MiniCalendar-root | Root element |
| control | .mantine-MiniCalendar-control | Button in the dropdown which is used to select hours/minutes/seconds/am-pm |
| days | .mantine-MiniCalendar-days | Days container |
| day | .mantine-MiniCalendar-day | Single day element |
| dayMonth | .mantine-MiniCalendar-dayMonth | Day element in month view |
| dayNumber | .mantine-MiniCalendar-dayNumber | Day number element |

**MiniCalendar CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --mini-calendar-font-size | Controls size of all elements (based on em units) |

**MiniCalendar data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | disabled | Next/previous range is after  | - |
| control | direction | - | - |
| day | selected | The day matches the  | - |
| day | disabled | The day is before  | - |


--------------------------------------------------------------------------------

### MonthPickerInput
Package: @mantine/dates
Import: import { MonthPickerInput } from '@mantine/dates';
Description: Month, multiple months and months range picker input

## MonthPicker props

`MonthPickerInput` supports most of the [MonthPicker](https://mantine.dev/dates/month-picker/) props,
read through [MonthPicker](https://mantine.dev/dates/month-picker/) documentation to learn about all component features that are not listed on this page.

## Usage



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Open picker in modal

By default, [MonthPicker](https://mantine.dev/dates/month-picker/) is rendered inside [Popover](https://mantine.dev/core/popover/).
You can change that to [Modal](https://mantine.dev/core/modal/) by setting `dropdownType="modal"`:



## Value format

Use `valueFormat` prop to change [dayjs format](https://day.js.org/docs/en/display/format) of value label:

#### Example: valueFormat

```tsx
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="Pick month"
      placeholder="Pick month"
    />
  );
}
```


## Value formatter

`valueFormatter` is a more powerful alternative to `valueFormat` prop.
It allows formatting value label with a custom function.
The function is the same for all component types (`default`, `multiple` and `range`)
– you need to perform additional checks inside the function to handle different types.

Example of using a custom formatter function with `type="multiple"`:



## Clearable

Set `clearable` prop to display clear button in the right section. Note that if you set `rightSection`
prop, clear button will not be displayed.



## Disabled state

#### Example: disabled

```tsx
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="Disabled"
      placeholder="Pick month"
      disabled
    />
  );
}
```


## Input props

<InputFeatures component="MonthPickerInput" element="button" />

MonthPickerInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. MonthPickerInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.



## With icon



<GetElementRef component="MonthPickerInput" refType="button" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { MonthPickerInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <MonthPickerInput ref={ref} />;
}
```

<InputAccessibility component="MonthPickerInput" packageName="@mantine/dates" />

## Accessibility

MonthPickerInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, clear button is displayed in the <code>rightSection</code> when the component has value. Ignored if <code>rightSection</code> prop is set. |
| closeOnChange | boolean | - | Determines whether the dropdown is closed when date is selected, not applicable with <code>type="multiple"</code> |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownType | "popover" | "modal" | - | Type of the dropdown |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| labelSeparator | string | - | Separator between range value |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| level | "month" | "year" | "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | Max level that user can go up to |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to <code>Modal</code> component |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onLevelChange | (level: MonthPickerLevel) => void | - | Called when level changes |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to <code>Popover</code> component |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before <code>onChange</code> call, only applicable with type="multiple" |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| valueFormat | string | - | <code>dayjs</code> format for input value |
| valueFormatter | DateFormatter | - | A function to format selected dates values into a string. By default, date is formatted based on the input type. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

MonthPickerInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MonthPickerInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPickerInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPickerInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPickerInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPickerInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPickerInput-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPickerInput-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPickerInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPickerInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPickerInput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPickerInput-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPickerInput-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPickerInput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPickerInput-monthsListControl | Button used to pick months and years |
| placeholder | .mantine-MonthPickerInput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### MonthPicker
Package: @mantine/dates
Import: import { MonthPicker } from '@mantine/dates';
Description: Inline month, multiple months and months range picker

## Usage



## Allow deselect

Set `allowDeselect` to allow user to deselect current selected date by clicking on it.
`allowDeselect` is disregarded when `type` prop is `range` or `multiple`. When date is
deselected `onChange` is called with `null`.



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Single date in range

By default, it is not allowed to select single date as range – when user clicks the same date second time it is deselected.
To change this behavior set `allowSingleDateInRange` prop. `allowSingleDateInRange` is ignored when
`type` prop is not `range`.



## Default date

Use `defaultDate` prop to set date value that will be used to determine which year should be displayed initially.
For example to display `2015` year set `defaultDate={new Date(2015, 1)}`. If value is not specified,
then `defaultDate` will use `new Date()`. Month, day, minutes and seconds are ignored in provided date object, only year is used –
you can specify any date value.

Note that if you set `date` prop, then `defaultDate` value will be ignored.

#### Example: defaultDate

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
```


## Controlled date

Set `date`, and `onDateChange` props to make currently displayed year and decade controlled.
By doing so, you can customize date picking experience, for example, when user selects first date in range,
you can add one year to current date value:

#### Example: controlledDate

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleChange = (val: [string | null, string | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => dayjs(current).add(1, 'year').format('YYYY-MM-DD'));
    }

    setValue(val);
  };

  return (
    <MonthPicker
      date={date}
      onDateChange={setDate}
      type="range"
      value={value}
      onChange={handleChange}
    />
  );
}
```


## Min and max date

Set `minDate` and `maxDate` props to define min and max dates. If previous/next page is not available
then corresponding control will be disabled.

#### Example: minMax

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}
```


## Add props to year and month control

You can add props to year and month controls with `getYearControlProps` and `getMonthControlProps` functions. Both functions accept date as single argument,
props returned from the function will be added to year/month control. For example, it can be used to disable specific
control or add styles:

#### Example: controlProps

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker, MonthPickerProps } from '@mantine/dates';

const getYearControlProps: MonthPickerProps['getYearControlProps'] = (date) => {
  if (dayjs(date).year() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).year() === new Date().getFullYear() + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: MonthPickerProps['getMonthControlProps'] = (date) => {
  if (dayjs(date).month() === 1) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
```


## Number of columns

Set `numberOfColumns` prop to define number of pickers that will be rendered side by side:



## Max level

To disallow user going to the decade level set `maxLevel="year"`:

#### Example: maxLevel

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
```


## Size



## Change year and months controls format

Use `yearsListFormat` and `monthsListFormat` props to change [dayjs format](https://day.js.org/docs/en/display/format) of year/month controls:

#### Example: listFormat

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
```


## Change label format

Use `decadeLabelFormat` and `yearLabelFormat` to change [dayjs format](https://day.js.org/docs/en/display/format) of decade/year label:

#### Example: labelFormat

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Localization

Usually it is better to specify `@mantine/dates` package locale in [DatesProvider](https://mantine.dev/dates/getting-started/),
but you can also override locale per component:

#### Example: locale

```tsx
import 'dayjs/locale/ru';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker locale="ru" />;
}
```


## Accessibility

### Aria labels

Set `ariaLabels` prop to specify `aria-label` attributes for next/previous controls:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return (
    <MonthPicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
        nextYear: 'Next year',
        previousYear: 'Previous year',
        yearLevelControl: 'Change to decade view',
      }}
    />
  );
}
```

### Year/month control aria-label

Use `getYearControlProps`/`getMonthControlProps` to customize `aria-label` attribute:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return (
    <MonthPicker
      getYearControlProps={(date) => ({
        'aria-label': `Select year ${date.getFullYear()}`,
      })}
      getMonthControlProps={(date) => ({
        'aria-label': `Select month ${date.getFullYear()}/${date.getMonth()}`,
      })}
    />
  );
}
```

### Keyboard interactions

Note that the following events will only trigger if focus is on month control.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" | "year" | "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| level | "month" | "year" | "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| maxLevel | "month" | "year" | "decade" | - | Max level that user can go up to |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| monthsListFormat | string | - | <code>dayjs</code> format for months list |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: MonthPickerLevel) => void | - | Called when level changes |
| onMonthSelect | (date: string) => void | - | Called when month is selected |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| size | MantineSize | - | Component size |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| yearLabelFormat | string | ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

MonthPicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MonthPicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPicker-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPicker-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPicker-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPicker-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPicker-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPicker-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPicker-monthsListControl | Button used to pick months and years |

**MonthPickerinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPickerinput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPickerinput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPickerinput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPickerinput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPickerinput-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPickerinput-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPickerinput-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPickerinput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPickerinput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPickerinput-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPickerinput-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPickerinput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPickerinput-monthsListControl | Button used to pick months and years |
| placeholder | .mantine-MonthPickerinput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### TimeGrid
Package: @mantine/dates
Import: import { TimeGrid } from '@mantine/dates';
Description: Captures time value from the user with a predefined set of options

## Usage

Use `TimeGrid` component to capture time value from the user with a
predefined set of time slots:

#### Example: usage

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';


function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '10:00', endTime: '21:00', interval: '01:00' })}
      simpleGridProps={{
        type: 'container',
        cols: { base: 1, '180px': 2, '320px': 3 },
        spacing: 'xs',
      }}
      
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { TimeGrid } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>('10:00');
  return <TimeGrid value={value} onChange={setValue} data={['10:00', '12: 00']} />;
}
```

## data prop

`data` prop accepts an array of time values in 24-hour format. Values
must be unique. To generate time range use `getTimeRange` function
exported from `@mantine/dates` package:

```tsx
import { TimeGrid, getTimeRange } from '@mantine/dates';

function WithArray() {
  return <TimeGrid data={['10:00', '12:00']} />
}

function WithRange() {
  // In this example we generate time range from 10:00 to 14:00 with 1 hour step:
  // ['10:00', '11:00', '12:00', '13:00', '14:00']
  return <TimeGrid data={getTimeRange({ from: '10:00', to: '14:00', step: '01:00' })} />
}
```

## Min and max time

Set `minTime` and `maxTime` props to limit available time range.
Both props accept time values in 24-hour format:

#### Example: minMax

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      minTime="11:00"
      maxTime="18:00"
    />
  );
}
```


## Disable specific controls

You can disable specific time values by providing an array of disabled
values to the `disableTime` prop:

#### Example: disableTime

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '11:45', interval: '00:15' })}
      disableTime={['10:45', '11:00', '11:30']}
    />
  );
}
```


## Allow deselect

Set `allowDeselect` prop to allow deselecting time value by clicking on
the control with selected value:

#### Example: allowDeselect

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '12:00', interval: '01:00' })}
      defaultValue="11:00"
      allowDeselect
    />
  );
}
```


## Change AM/PM labels

#### Example: amPmLabels

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      format="12h"
      amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }}
    />
  );
}
```


## Disabled

Set `disabled` prop to disable all controls:

#### Example: disabled

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      disabled
    />
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether the value can be deselected when the current active option is clicked or activated with keyboard |
| amPmLabels | { am: string; pm: string } | - | Labels used for am/pm values |
| data | string[] | required | Time data in 24h format to be displayed in the grid, for example <code>['10:00', '18:30', '22:00']</code>. Time values must be unique. |
| defaultValue | string | null | - | Uncontrolled component default value |
| disableTime | string[] | ((time: string) => boolean) | - | Array of time values to disable |
| disabled | boolean | - | If set, all controls are disabled |
| format | "12h" | "24h" | - | Time format displayed in the grid |
| getControlProps | (time: string) => React.ComponentPropsWithoutRef<"button"> | - | A function to pass props down to control based on the time value |
| maxTime | string | - | All controls after this time are disabled |
| minTime | string | - | All controls before this time are disabled |
| onChange | (value: string | null) => void | - | Called when value changes |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code> |
| simpleGridProps | SimpleGridProps | - | Props passed down to the underlying <code>SimpleGrid</code> component |
| size | MantineSize | - | Control <code>font-size</code> of controls, key of <code>theme.fontSizes</code> or any valid CSS value |
| value | string | null | - | Controlled component value |
| withSeconds | boolean | - | Determines whether the seconds part should be displayed |


#### Styles API

TimeGrid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TimeGrid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-TimeGrid-root | Root element |
| control | .mantine-TimeGrid-control | Time grid control |
| simpleGrid | .mantine-TimeGrid-simpleGrid | SimpleGrid component root |

**TimeGrid CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --time-grid-fz | Controls `font-size` property of all controls |
| root | --time-grid-radius | Controls `border-radius` property of all controls |

**TimeGrid data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Current component value is the same as control value | - |
| control | data-disabled | Component is disabled by one of the props:  | - |


--------------------------------------------------------------------------------

### TimeInput
Package: @mantine/dates
Import: import { TimeInput } from '@mantine/dates';
Description: Capture time from the user

## Usage

<InputFeatures component="TimeInput" element="input" />

TimeInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. TimeInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { TimeInput } from '@mantine/dates';


function Demo() {
  return (
    <TimeInput
      
    />
  );
}
```


## TimePicker component

`TimeInput` component is based on the native `input[type="time"]` element and does not support
most of advanced features like choosing time format or custom dropdown with time select. If you need
more features, use [TimePicker](https://mantine.dev/dates/time-picker) component instead.

`TimeInput` features/limitations:

* Native `input[type="time"]` element
* Native browser controls for time selection on mobile devices
* Time format depends on the user's locale
* Only native dropdown with hours/minutes/seconds, does not work in Firefox
* Mobile Safari does not provide an option to select seconds

## Controlled

```tsx
import { useState } from 'react';
import { TimeInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <TimeInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## Show browser picker

You can show browser picker by calling `showPicker` method of input element.
Note that some browsers (desktop Safari) do not support this feature and the
method will do nothing.

#### Example: picker

```tsx
import { useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <TimeInput label="Click icon to show browser picker" ref={ref} rightSection={pickerControl} />
  );
}
```


## With seconds

#### Example: withSeconds

```tsx
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
```


## With icon

#### Example: icon

```tsx
import { IconClock } from '@tabler/icons-react';
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput leftSection={<IconClock size={16} stroke={1.5} />} />;
}
```


## Disabled state

#### Example: disabled

```tsx
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput disabled />;
}
```


<GetElementRef component="TimeInput" refType="input" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { TimeInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <TimeInput ref={ref} />;
}
```

<InputAccessibility component="TimeInput" packageName="@mantine/dates" />

## Accessibility

TimeInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


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
| maxTime | string | - | Maximum possible string time, if <code>withSeconds</code> is true, time should be in format HH:mm:ss, otherwise HH:mm |
| minTime | string | - | Minimum possible string time, if <code>withSeconds</code> is true, time should be in format HH:mm:ss, otherwise HH:mm |
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
| withSeconds | boolean | - | Determines whether seconds input should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


--------------------------------------------------------------------------------

### TimePicker
Package: @mantine/dates
Import: import { TimePicker } from '@mantine/dates';
Description: Captures time value from the user

## Usage

`TimePicker` component is an alternative to [TimeInput](https://mantine.dev/dates/time-input) that offers more
features, it supports 24-hour and 12-hour formats, dropdown with hours, minutes and seconds, and
more.

#### Example: usage

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" />;
}
```


## Controlled

`TimePicker` component value is a string in `hh:mm:ss` or `hh:mm` 24-hour format (for example `18:34:55`, `18:34`).
Empty string is used to represent no value. `onChange` function is called only when the entered value is valid.
The input value is considered valid in the following cases:

* All inputs are empty. In this case `onChange` is called with an empty string.
* All inputs are filled. For example if `withSeconds` prop is set and the user entered `12:34:56`, `onChange` will be called with `12:34:56`. But if the user entered `12:34`, `onChange` will not be called because seconds value is missing.

```tsx
import { useState } from 'react';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState('');
  return <TimePicker value={value} onChange={setValue} />;
}
```

## With seconds

Set `withSeconds` prop to enable seconds input. Note that if this prop is used,
`onChange` is not called until all inputs are filled – it is not possible
to enter only hours and minutes.

#### Example: withSeconds

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}
```


## 12-hour format

Set `format="12h"` to use 12-hour format. Note that `onChange` is called only when all inputs are filled
including am/pm input.

#### Example: format12h

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}
```


## Change am/pm labels

To change am/pm labels use `amPmLabels` prop. Example of changing labels to Hindi:

#### Example: amPmLabels

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker label="Enter time" format="12h" amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }} />
  );
}
```


## Min and max values

Set `min` and `max` props to limit available time range:

#### Example: minMax

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" min="10:00" max="18:30" />
      <TimePicker label="Enter time (12h format)" min="10:00" max="18:30" format="12h" mt="md" />
    </>
  );
}
```


## With dropdown

Set `withDropdown` prop to display the dropdown with hours, minutes, seconds and am/pm selects.
By default, the dropdown is visible when one of the inputs is focused.

#### Example: withDropdown

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" withSeconds withDropdown />
      <TimePicker label="Enter time (12h format)" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}
```


## Hours/minutes/seconds step

Use `hoursStep`, `minutesStep` and `secondsStep` props to control step for each input.
These props are used to control value by which the input is incremented or decremented when
up/down arrow keys are pressed and to generate corresponding values range in the dropdown.

#### Example: steps

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withSeconds
      withDropdown
      hoursStep={1}
      minutesStep={5}
      secondsStep={10}
    />
  );
}
```


## Control dropdown opened state

Use `popoverProps` to pass props down to the underlying [Popover](https://mantine.dev/core/popover) component:

#### Example: controlledDropdown

```tsx
import { useState } from 'react';
import { IconClock } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [value, setValue] = useState('');

  return (
    <TimePicker
      withDropdown
      rightSection={
        <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
          <IconClock size={18} stroke={1.5} />
        </ActionIcon>
      }
      value={value}
      onChange={(val) => {
        setValue(val);
        if (value === '') {
          setDropdownOpened(false);
        }
      }}
      popoverProps={{
        opened: dropdownOpened,
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
}
```


## Time presets

You can define time presets with `presets` prop. Presets are displayed in the dropdown and can be selected by clicking on them.
Time values for presets should be in `hh:mm:ss` or `hh:mm` 24-hour time format. Presets
display value is generated based on `format`, `amPmLabels` and `withSeconds` props.

#### Example: presets

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={['12:30', '15:45', '18:00', '20:15', '22:30']}
    />
  );
}
```


## Time presets groups

To group presets use an array of objects with `label` and `values` keys:

#### Example: presetsGroups

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      maxDropdownContentHeight={300}
      presets={[
        { label: 'Morning', values: ['06:00:00', '08:00:00', '10:00:00'] },
        { label: 'Afternoon', values: ['12:00:00', '14:00:00', '16:00:00'] },
        { label: 'Evening', values: ['18:00:00', '20:00:00', '22:00:00'] },
      ]}
    />
  );
}
```


## Time presets range

If you need to generate a range of time values, use `getTimeRange` function exported from
`@mantine/dates` package. The function accepts start, end time and interval in `hh:mm:ss` format.

#### Example: presetsRange

```tsx
import { getTimeRange, TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
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
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
      }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is adjusted to fit all content. Example of dropdown width set
to the input width:

#### Example: dropdownWidth

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      withSeconds
      format="12h"
      popoverProps={{
        width: 'target',
      }}
    />
  );
}
```


## Paste events

By default, `TimePicker` handles only time in 24-hour format (for example `17:33:43` or `19:22`) for paste events.
With `pasteSplit` prop you can create a custom paste time parser:

#### Example: pasteSplit

```tsx
import { Code, Text } from '@mantine/core';
import { TimePicker, TimePickerPasteSplit } from '@mantine/dates';

const re = /^(1[0-2]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?\\s?(AM|PM)$/;

const customPasteSplit: TimePickerPasteSplit = ({ time }) => {
  if (!re.test(time)) {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const [hours, minutes, second] = time.split(':').map((part) => part.replace(/AM|PM/g, ''));
  const isPm = time.toLowerCase().includes('pm');

  return {
    hours: typeof hours === 'string' ? Number(hours) : null,
    minutes: typeof minutes === 'string' ? Number(minutes) : null,
    seconds: typeof second === 'string' ? Number(second) : 0,
    amPm: isPm ? 'PM' : 'AM',
  };
};

function Demo() {
  return (
    <div>
      <TimePicker label="Paste time here" format="12h" withSeconds pasteSplit={customPasteSplit} />
      <Text mt="md">
        Try pasting time in 12h format in any input. For example, try pasting <Code>12:34 PM</Code>{' '}
        or <Code>8:56:45 AM</Code>
      </Text>
    </div>
  );
}
```


## Clearable

Set `clearable` prop to display a clear button in the right section of the input.
The clear button is visible when at least one of the fields has value.

#### Example: clearable

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" clearable defaultValue="12:34:44" />;
}
```


## Disabled

#### Example: disabled

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" disabled />;
}
```


## Read only

#### Example: readOnly

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" defaultValue="12:45:33" readOnly />;
}
```


## Input props

<InputFeatures component="TimePicker" element="div" />

TimePicker component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all div element props. TimePicker documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

#### Example: configurator

```tsx
import { TimePicker } from '@mantine/dates';


function Demo() {
  return (
    <TimePicker
      withDropdown
      
    />
  );
}
```


## Get refs of inner inputs

Use `hoursRef`, `minutesRef`, `secondsRef` and `amPmRef` props to get refs of inner inputs:

```tsx
import { useRef } from 'react';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const amPmRef = useRef<HTMLSelectElement>(null);

  return (
    <TimePicker
      hoursRef={hoursRef}
      minutesRef={minutesRef}
      secondsRef={secondsRef}
      amPmRef={amPmRef}
    />
  );
}
```

## onFocus and onBlur events

`onFocus` and `onBlur` events are called when the first input is focused and the last input is blurred:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      onFocus={() => console.log('Focused')}
      onBlur={() => console.log('Blurred')}
    />
  );
}
```

## Accessibility

Set aria labels for hours, minutes, seconds and am/pm inputs and clear button with corresponding props:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      hoursInputLabel="Hours"
      minutesInputLabel="Minutes"
      secondsInputLabel="Seconds"
      amPmInputLabel="AM/PM"
      clearButtonProps={{ 'aria-label': 'Clear time' }}
    />
  );
}
```

Keyboard interactions:


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| amPmInputLabel | string | - | <code>aria-label</code> of am/pm input |
| amPmLabels | { am: string; pm: string } | - | Labels used for am/pm values |
| amPmRef | Ref<HTMLSelectElement> | - | A ref object to get node reference of the am/pm select |
| amPmSelectProps | React.ComponentPropsWithoutRef<"select"> | - | Props passed down to am/pm select |
| clearButtonProps | CloseButtonProps | - | Props passed down to clear button |
| clearable | boolean | - | Determines whether the clear button should be displayed |
| defaultValue | string | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | If set, the component becomes disabled |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| form | string | - | <code>form</code> prop passed down to the hidden input |
| format | "12h" | "24h" | - | Time format, <code>'24h'</code> by default |
| hiddenInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to the hidden input |
| hoursInputLabel | string | - | <code>aria-label</code> of hours input |
| hoursInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to hours input |
| hoursPlaceholder | string | - | Hours input placeholder, |
| hoursRef | Ref<HTMLInputElement> | - | A ref object to get node reference of the hours input |
| hoursStep | number | - | Number by which hours are incremented/decremented |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| max | string | - | Max possible time value in <code>hh:mm:ss</code> format |
| maxDropdownContentHeight | number | - | Maximum height of the content displayed in the dropdown in px |
| min | string | - | Min possible time value in <code>hh:mm:ss</code> format |
| minutesInputLabel | string | - | <code>aria-label</code> of minutes input |
| minutesInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to minutes input |
| minutesPlaceholder | string | - | Minutes input placeholder, |
| minutesRef | Ref<HTMLInputElement> | - | A ref object to get node reference of the minutes input |
| minutesStep | number | - | Number by which minutes are incremented/decremented |
| name | string | - | <code>name</code> prop passed down to the hidden input |
| onBlur | (event: FocusEvent<HTMLDivElement, Element>) => void | - | Called once when the focus is no longer on any of the inputs |
| onChange | (value: string) => void | - | Called when the value changes |
| onFocus | (event: FocusEvent<HTMLInputElement, Element>) => void | - | Called once when one of the inputs is focused, not called when focused is shifted between hours, minutes, seconds and am/pm inputs |
| pasteSplit | TimePickerPasteSplit | - | A function to transform paste values, by default time in 24h format can be parsed on paste for example <code>23:34:22</code> |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | PopoverProps | - | Props passed down to <code>Popover</code> component |
| presets | TimePickerPresets | - | Time presets to display in the dropdown |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the value cannot be updated |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| reverseTimeControlsList | boolean | - | If set, the time controls list are reversed, |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed down to all underlying <code>ScrollArea</code> components |
| secondsInputLabel | string | - | <code>aria-label</code> of seconds input |
| secondsInputProps | React.ComponentPropsWithoutRef<"input"> | - | Props passed down to seconds input |
| secondsPlaceholder | string | - | Seconds input placeholder, |
| secondsRef | Ref<HTMLInputElement> | - | A ref object to get node reference of the seconds input |
| secondsStep | number | - | Number by which seconds are incremented/decremented |
| size | MantineSize | (string & {}) | - | Controls input <code>height</code> and horizontal <code>padding</code> |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withDropdown | boolean | - | Determines whether the dropdown with time controls list should be visible when the input has focus |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| withSeconds | boolean | - | Determines whether the seconds input should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

TimePicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TimePicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-TimePicker-wrapper | Root element of the Input |
| input | .mantine-TimePicker-input | Input element |
| section | .mantine-TimePicker-section | Left and right sections |
| root | .mantine-TimePicker-root | Root element |
| label | .mantine-TimePicker-label | Label element |
| required | .mantine-TimePicker-required | Required asterisk element, rendered inside label |
| description | .mantine-TimePicker-description | Description element |
| error | .mantine-TimePicker-error | Error element |
| control | .mantine-TimePicker-control | Button in the dropdown which is used to select hours/minutes/seconds/am-pm |
| controlsList | .mantine-TimePicker-controlsList | List of buttons with hours/minutes/seconds/am-pm |
| controlsListGroup | .mantine-TimePicker-controlsListGroup | Group of controlsLists |
| dropdown | .mantine-TimePicker-dropdown | Popover dropdown |
| fieldsRoot | .mantine-TimePicker-fieldsRoot | A wrapper element for all fieldsGroups |
| fieldsGroup | .mantine-TimePicker-fieldsGroup | A wrapper element for hours/minutes/seconds/am-pm fields |
| field | .mantine-TimePicker-field | Hours/minutes/seconds/am-pm input field |
| presetControl | .mantine-TimePicker-presetControl | Time preset button |
| presetsGroup | .mantine-TimePicker-presetsGroup | Wraps preset controls and label |
| presetsGroupLabel | .mantine-TimePicker-presetsGroupLabel | Labels of the preset group |
| presetsRoot | .mantine-TimePicker-presetsRoot | Element wrapping all presets content |
| scrollarea | .mantine-TimePicker-scrollarea | Scroll area in the dropdown |

**TimePicker CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| dropdown | --control-font-size | Controls `font-size` of dropdown controls |


--------------------------------------------------------------------------------

### TimeValue
Package: @mantine/dates
Import: import { TimeValue } from '@mantine/dates';
Description: Display a formatted time value

## Usage

Use `TimeValue` component to display time in different formats:

#### Example: usage

```tsx
import { Text } from '@mantine/core';
import { TimeValue } from '@mantine/dates';

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value="18:45:34" />
      </Text>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" />
      </Text>
    </div>
  );
}
```


## With seconds

Use `withSeconds` prop to display seconds:

#### Example: withSeconds

```tsx
import { Text } from '@mantine/core';
import { TimeValue } from '@mantine/dates';

function Demo() {
  return (
    <div>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" withSeconds />
      </Text>
      <Text>
        24h format: <TimeValue value="18:45:34" withSeconds />
      </Text>
    </div>
  );
}
```


## AM/PM labels

Use `amPmLabels` prop to display AM/PM labels:

#### Example: amPmLabels

```tsx
import { Text } from '@mantine/core';
import { TimeValue } from '@mantine/dates';

function Demo() {
  return (
    <div>
      <Text>
        Custom AM/PM labels:{' '}
        <TimeValue value="18:45:34" format="12h" amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }} />
      </Text>
    </div>
  );
}
```


## Date object

You can use `Date` object instead of string as `value`:

#### Example: dateObject

```tsx
import { Text } from '@mantine/core';
import { TimeValue } from '@mantine/dates';

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
      <Text>
        12h format: <TimeValue format="12h" value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
    </div>
  );
}
```



#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| amPmLabels | { am: string; pm: string } | - | AM/PM labels |
| format | "12h" | "24h" | - | Time format |
| value | string | Date | required | Time to format |
| withSeconds | boolean | - | Determines whether seconds should be displayed |


--------------------------------------------------------------------------------

### YearPickerInput
Package: @mantine/dates
Import: import { YearPickerInput } from '@mantine/dates';
Description: Inline year, multiple years and years range picker

## YearPicker props

`YearPickerInput` supports most of the [YearPicker](https://mantine.dev/dates/year-picker/) props,
read through [YearPicker](https://mantine.dev/dates/year-picker/) documentation to learn about all component features that are not listed on this page.

## Usage



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Open picker in modal

By default, [YearPicker](https://mantine.dev/dates/year-picker/) is rendered inside [Popover](https://mantine.dev/core/popover/).
You can change that to [Modal](https://mantine.dev/core/modal/) by setting `dropdownType="modal"`:



## Value format

Use `valueFormat` prop to change [dayjs format](https://day.js.org/docs/en/display/format) of value label:

#### Example: valueFormat

```tsx
import { YearPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <YearPickerInput valueFormat="YY" type="multiple" label="Pick year" placeholder="Pick year" />
  );
}
```


## Value formatter

`valueFormatter` is a more powerful alternative to `valueFormat` prop.
It allows formatting value label with a custom function.
The function is the same for all component types (`default`, `multiple` and `range`)
– you need to perform additional checks inside the function to handle different types.

Example of using a custom formatter function with `type="multiple"`:



## Clearable

Set `clearable` prop to display clear button in the right section. Note that if you set `rightSection`
prop, clear button will not be displayed.



## Disabled state

#### Example: disabled

```tsx
import { YearPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <YearPickerInput
      valueFormat="YY"
      type="multiple"
      label="Disabled"
      placeholder="Pick year"
      disabled
    />
  );
}
```


## Input props

<InputFeatures component="MonthPickerInput" element="button" />

MonthPickerInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. MonthPickerInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.



## With icon



<GetElementRef component="YearPickerInput" refType="button" package="@mantine/dates" />

## Get element ref

```tsx
import { useRef } from 'react';
import { YearPickerInput } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLButtonElement>(null);
  return <YearPickerInput ref={ref} />;
}
```

<InputAccessibility component="YearPickerInput" packageName="@mantine/dates" />

## Accessibility

YearPickerInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| clearButtonProps | React.ComponentPropsWithoutRef<"button"> | - | Props passed down to the clear button |
| clearable | boolean | - | If set, clear button is displayed in the <code>rightSection</code> when the component has value. Ignored if <code>rightSection</code> prop is set. |
| closeOnChange | boolean | - | Determines whether the dropdown is closed when date is selected, not applicable with <code>type="multiple"</code> |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of <code>Input.Description</code> component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps & DataAttributes | - | Props passed down to the <code>Input.Description</code> component |
| disabled | boolean | - | Sets <code>disabled</code> attribute on the <code>input</code> element |
| dropdownType | "popover" | "modal" | - | Type of the dropdown |
| error | React.ReactNode | - | Contents of <code>Input.Error</code> component. If not set, error is not displayed. |
| errorProps | InputErrorProps & DataAttributes | - | Props passed down to the <code>Input.Error</code> component |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| inputContainer | (children: ReactNode) => ReactNode | - | Input container component |
| inputSize | string | - | <code>size</code> attribute passed down to the input element |
| inputWrapperOrder | ("input" | "label" | "description" | "error")[] | - | Controls order of the elements |
| label | React.ReactNode | - | Contents of <code>Input.Label</code> component. If not set, label is not displayed. |
| labelProps | InputLabelProps & DataAttributes | - | Props passed down to the <code>Input.Label</code> component |
| labelSeparator | string | - | Separator between range value |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>leftSection</code> element |
| leftSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>leftSection</code> element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set <code>width</code> of the section and input <code>padding-left</code>, by default equals to the input height |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to <code>Modal</code> component |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have <code>cursor: pointer</code> style |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to <code>Popover</code> component |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| radius | MantineRadius | number | - | Key of <code>theme.radius</code> or any valid CSS value to set <code>border-radius</code>, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets <code>pointer-events</code> styles on the <code>rightSection</code> element |
| rightSectionProps | React.ComponentPropsWithoutRef<"div"> | - | Props passed down to the <code>rightSection</code> element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set <code>width</code> of the section and input <code>padding-right</code>, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before <code>onChange</code> call, only applicable with type="multiple" |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| valueFormat | string | - | <code>dayjs</code> format to display input value |
| valueFormatter | DateFormatter | - | A function to format selected dates values into a string. By default, date is formatted based on the input type. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides <code>required</code> prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the <code>error</code> prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

YearPickerInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**YearPickerInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-YearPickerInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-YearPickerInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-YearPickerInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-YearPickerInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-YearPickerInput-levelsGroup | Group of decades levels |
| yearsList | .mantine-YearPickerInput-yearsList | Years list table element |
| yearsListRow | .mantine-YearPickerInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-YearPickerInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-YearPickerInput-yearsListControl | Button used to pick months and years |
| placeholder | .mantine-YearPickerInput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### YearPicker
Package: @mantine/dates
Import: import { YearPicker } from '@mantine/dates';
Description: Inline year, multiple years and years range picker

## Usage



## Allow deselect

Set `allowDeselect` to allow user to deselect current selected date by clicking on it.
`allowDeselect` is disregarded when `type` prop is `range` or `multiple`. When date is
deselected `onChange` is called with `null`.



## Multiple dates

Set `type="multiple"` to allow user to pick multiple dates:



## Dates range

Set `type="range"` to allow user to pick dates range:



## Single date in range

By default, it is not allowed to select single date as range – when user clicks the same date second time it is deselected.
To change this behavior set `allowSingleDateInRange` prop. `allowSingleDateInRange` is ignored when
`type` prop is not `range`.



## Default date

Use `defaultDate` prop to set date value that will be used to determine which decade should be displayed initially.
For example to display `2040 – 2049` decade set `defaultDate={new Date(2040, 1)}`. If value is not specified,
then `defaultDate` will use `new Date()`. Month, day, minutes and seconds are ignored in provided date object, only year is used –
you can specify any date value.

Note that if you set `date` prop, then `defaultDate` value will be ignored.

#### Example: defaultDate

```tsx
import { useState } from 'react';
import { YearPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker defaultDate="2040-02-01" value={value} onChange={setValue} />;
}
```


## Controlled date

Set `date`, and `onDateChange` props to make currently displayed decade controlled.
By doing so, you can customize date picking experience, for example, when user selects first date in range,
you can add 20 years to current date value:

#### Example: controlledDate

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleChange = (val: [string | null, string | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => dayjs(current).add(20, 'year').format('YYYY-MM-DD'));
    }

    setValue(val);
  };

  return (
    <YearPicker
      date={date}
      onDateChange={setDate}
      type="range"
      value={value}
      onChange={handleChange}
    />
  );
}
```


## Min and max date

Set `minDate` and `maxDate` props to define min and max dates. If previous/next page is not available
then corresponding control will be disabled.

#### Example: minMax

```tsx
import { useState } from 'react';
import { YearPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPicker
      value={value}
      onChange={setValue}
      minDate="2021-02-01"
      maxDate="2028-02-01"
    />
  );
}
```


## Add props to year control

You can add props to year controls with `getYearControlProps` function. It accepts year date as single argument,
props returned from the function will be added to year control. For example, it can be used to disable specific
control or add styles:

#### Example: controlProps

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPicker, YearPickerProps } from '@mantine/dates';

const getYearControlProps: YearPickerProps['getYearControlProps'] = (date) => {
  if (dayjs(date).year() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).year() === new Date().getFullYear() + 1) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker value={value} onChange={setValue} getYearControlProps={getYearControlProps} />;
}
```


## Number of columns

Set `numberOfColumns` prop to define number of pickers that will be rendered side by side:



## Size



## Change year controls format

Use `yearsListFormat` to change [dayjs format](https://day.js.org/docs/en/display/format) of year control:

#### Example: yearsListFormat

```tsx
import { useState } from 'react';
import { YearPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker yearsListFormat="YY" value={value} onChange={setValue} />;
}
```


## Change decade label format

Use `decadeLabelFormat` to change [dayjs format](https://day.js.org/docs/en/display/format) of decade label:

#### Example: decadeLabelFormat

```tsx
import { useState } from 'react';
import { YearPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker decadeLabelFormat="YY" value={value} onChange={setValue} />;
}
```


## Accessibility

### Aria labels

Set `ariaLabels` prop to specify `aria-label` attributes for next/previous controls:

```tsx
import { YearPicker } from '@mantine/dates';

function Demo() {
  return (
    <YearPicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
      }}
    />
  );
}
```

### Year control aria-label

Use `getYearControlProps` to customize `aria-label` attribute:

```tsx
import { YearPicker } from '@mantine/dates';

function Demo() {
  return (
    <YearPicker
      getYearControlProps={(date) => ({
        'aria-label': `Select year ${date.getFullYear()}`,
      })}
    />
  );
}
```

### Keyboard interactions

Note that the following events will only trigger if focus is on year control.


#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | <code>aria-label</code> attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as <code>numberOfColumns</code> if not set explicitly |
| date | string | Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string | ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | <code>dayjs</code> format for decade label or a function that returns decade label based on the date value |
| defaultDate | string | Date | - | Initial displayed date in uncontrolled mode |
| defaultValue | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Default value for uncontrolled component |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string | Date | - | Maximum possible date in <code>YYYY-MM-DD</code> format or Date object |
| minDate | string | Date | - | Minimum possible date in <code>YYYY-MM-DD</code> format or Date object |
| nextLabel | string | - | Next button <code>aria-label</code> |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onYearSelect | (date: string) => void | - | Called when year is selected |
| previousLabel | string | - | Previous button <code>aria-label</code> |
| size | MantineSize | - | Component size |
| type | "range" | "multiple" | "default" | - | Picker type: range, multiple or default |
| value | DateValue | DatesRangeValue<DateValue> | DateValue[] | - | Value for controlled component |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

YearPicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**YearPicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-YearPicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-YearPicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-YearPicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-YearPicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-YearPicker-levelsGroup | Group of decades levels |
| yearsList | .mantine-YearPicker-yearsList | Years list table element |
| yearsListRow | .mantine-YearPicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-YearPicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-YearPicker-yearsListControl | Button used to pick months and years |

**YearPickerinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-YearPickerinput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-YearPickerinput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-YearPickerinput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-YearPickerinput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-YearPickerinput-levelsGroup | Group of decades levels |
| yearsList | .mantine-YearPickerinput-yearsList | Years list table element |
| yearsListRow | .mantine-YearPickerinput-yearsListRow | Years list row element |
| yearsListCell | .mantine-YearPickerinput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-YearPickerinput-yearsListControl | Button used to pick months and years |
| placeholder | .mantine-YearPickerinput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

