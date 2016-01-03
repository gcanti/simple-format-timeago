var test = require('tape');
var formatTimeago = require('..');
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var MONTH = 30 * DAY;
var YEAR = 12 * MONTH;

var it = {
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

test('should handle just now', function (assert) {
  assert.plan(2);
  assert.equal(formatTimeago(0), 'Just now');
  assert.equal(formatTimeago(999), 'Just now');
});

test('should handle minutes', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * SECOND), '1 second ago');
  assert.equal(formatTimeago(3 * SECOND), '3 seconds ago');

  // future
  assert.equal(formatTimeago(-1 * SECOND), '1 second from now');
  assert.equal(formatTimeago(-3 * SECOND), '3 seconds from now');
});

test('should handle minutes', function (assert) {
  assert.plan(12);

  // past
  assert.equal(formatTimeago(60 * SECOND), '1 minute ago');
  assert.equal(formatTimeago(61 * SECOND), '1 minute ago');
  assert.equal(formatTimeago(2 * 60 * SECOND - SECOND), '2 minutes ago');
  assert.equal(formatTimeago(2 * 60 * SECOND), '2 minutes ago');

  assert.equal(formatTimeago(60 * SECOND, it), '1 minuto fa');
  assert.equal(formatTimeago(2 * 60 * SECOND, it), '2 minuti fa');

  // future
  assert.equal(formatTimeago(-60 * SECOND), '1 minute from now');
  assert.equal(formatTimeago(-61 * SECOND), '1 minute from now');
  assert.equal(formatTimeago(-2 * 60 * SECOND + SECOND), '2 minutes from now');
  assert.equal(formatTimeago(-2 * 60 * SECOND), '2 minutes from now');

  assert.equal(formatTimeago(-60 * SECOND, it), 'tra 1 minuto');
  assert.equal(formatTimeago(-2 * 60 * SECOND, it), 'tra 2 minuti');
});

test('should handle hours', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * HOUR), '1 hour ago');
  assert.equal(formatTimeago(3 * HOUR), '3 hours ago');

  // future
  assert.equal(formatTimeago(-1 * HOUR), '1 hour from now');
  assert.equal(formatTimeago(-3 * HOUR), '3 hours from now');
});

test('should handle days', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * DAY), '1 day ago');
  assert.equal(formatTimeago(3 * DAY), '3 days ago');

  // future
  assert.equal(formatTimeago(-1 * DAY), '1 day from now');
  assert.equal(formatTimeago(-3 * DAY), '3 days from now');
});

test('should handle weeks', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * WEEK), '1 week ago');
  assert.equal(formatTimeago(3 * WEEK), '3 weeks ago');

  // future
  assert.equal(formatTimeago(-1 * WEEK), '1 week from now');
  assert.equal(formatTimeago(-3 * WEEK), '3 weeks from now');
});

test('should handle months', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * MONTH), '1 month ago');
  assert.equal(formatTimeago(3 * MONTH), '3 months ago');

  // future
  assert.equal(formatTimeago(-1 * MONTH), '1 month from now');
  assert.equal(formatTimeago(-3 * MONTH), '3 months from now');
});

test('should handle years', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatTimeago(1 * YEAR), '1 year ago');
  assert.equal(formatTimeago(3 * YEAR), '3 years ago');

  // future
  assert.equal(formatTimeago(-1 * YEAR), '1 year from now');
  assert.equal(formatTimeago(-3 * YEAR), '3 years from now');
});

test('should handle options.templates', function (assert) {
  assert.plan(1);
  assert.equal(formatTimeago(60 * SECOND, { templates: {
    past: '<%= labels.minutes %>: <%= count %>'
  } }), 'minutes: 1');
});


