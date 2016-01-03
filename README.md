A simple clean way to format intervals with Javascript

# Setup

```sh
npm install simple-format-timeago --save
```

# Usage

```js
import formatTimeago from 'simple-format-timeago';

// handle now
formatTimeago(new Date()); // => 'Just now'
// handle past
formatTimeago(60 * 1000); // => '1 minute ago'
// handle plurals
formatTimeago(2 * 60 * 1000); // => '2 minutes ago'
// handle future
formatTimeago(-2 * 60 * 1000); // => '2 minutes from now'
```

Changing i18n

```js
var it = { // italian
  labels: {
    now: 'Adesso',
    seconds: 'secondi',
    second: 'secondo',
    minutes: 'minuti',
    minute: 'minuto',
    hours: 'ore',
    hour: 'ora',
    days: 'giorni',
    day: 'giorno',
    weeks: 'settimane',
    week: 'settimana',
    months: 'mesi',
    month: 'mese',
    years: 'anni',
    year: 'anno'
  },
  templates: {
    past: '<%= count %> <%= unit %> fa',
    future: 'tra <%= count %> <%= unit %>'
  }
};

formatTimeago(60 * SECOND, it); // => '1 minuto fa'
```

# API

```js
formatTimeago(date: Date | number, options: Object) => string
```

where:

- `date` a date (in the past or the future) or an interval expressed in milliseconds
- `options`
  - `labels`
    - `now` (default `'Just now'`)
    - `seconds` (default `'seconds'`)
    - `second` (default `'second'`)
    - `minutes` (default `'minutes'`)
    - `minute` (default `'minute'`)
    - `hours` (default `'hours'`)
    - `hour` (default `'hour'`)
    - `days` (default `'days'`)
    - `day` (default `'day'`)
    - `weeks` (default `'weeks'`)
    - `week` (default `'week'`)
    - `months` (default `'months'`)
    - `month` (default `'month'`)
    - `years` (default `'years'`)
    - `year` (default `'year'
  - `templates`
    - `past` (default `'<%= count %> <%= unit %> ago'`)
    - `future` (default `'<%= count %> <%= unit %> from now'`)

The following `locals` will be passed in to templates:

```js
{
  count: number; // the current count expressed in unit
  unit: string; // the current unit
  labels: {[key: string]: string;} // all labels
}
```