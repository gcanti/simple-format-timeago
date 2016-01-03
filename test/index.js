var test = require('tape');
var formatInterval = require('../lib/formatInterval');
var times = require('../lib/times');
var SECOND = times.SECOND;

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
    past: '<%= units %> <%= label %> fa',
    future: 'tra <%= units %> <%= label %>'
  }
};

test('should handle just now', function (assert) {
  assert.plan(2);
  assert.equal(formatInterval(0), 'Just now');
  assert.equal(formatInterval(999), 'Just now');
});

test('should handle minutes', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatInterval(1 * SECOND), '1 second ago');
  assert.equal(formatInterval(3 * SECOND), '3 seconds ago');

  // future
  assert.equal(formatInterval(-1 * SECOND), '1 second from now');
  assert.equal(formatInterval(-3 * SECOND), '3 seconds from now');
});

test('should handle minutes', function (assert) {
  assert.plan(12);

  // past
  assert.equal(formatInterval(60 * SECOND), '1 minute ago');
  assert.equal(formatInterval(61 * SECOND), '1 minute ago');
  assert.equal(formatInterval(2 * 60 * SECOND - SECOND), '2 minutes ago');
  assert.equal(formatInterval(2 * 60 * SECOND), '2 minutes ago');

  assert.equal(formatInterval(60 * SECOND, it), '1 minuto fa');
  assert.equal(formatInterval(2 * 60 * SECOND, it), '2 minuti fa');

  // future
  assert.equal(formatInterval(-60 * SECOND), '1 minute from now');
  assert.equal(formatInterval(-61 * SECOND), '1 minute from now');
  assert.equal(formatInterval(-2 * 60 * SECOND + SECOND), '2 minutes from now');
  assert.equal(formatInterval(-2 * 60 * SECOND), '2 minutes from now');

  assert.equal(formatInterval(-60 * SECOND, it), 'tra 1 minuto');
  assert.equal(formatInterval(-2 * 60 * SECOND, it), 'tra 2 minuti');
});

test('should handle months', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatInterval(1 * times.MONTH), '1 month ago');
  assert.equal(formatInterval(3 * times.MONTH), '3 months ago');

  // future
  assert.equal(formatInterval(-1 * times.MONTH), '1 month from now');
  assert.equal(formatInterval(-3 * times.MONTH), '3 months from now');
});

test('should handle years', function (assert) {
  assert.plan(4);

  // past
  assert.equal(formatInterval(1 * times.YEAR), '1 year ago');
  assert.equal(formatInterval(3 * times.YEAR), '3 years ago');

  // future
  assert.equal(formatInterval(-1 * times.YEAR), '1 year from now');
  assert.equal(formatInterval(-3 * times.YEAR), '3 years from now');
});

test('should handle options.templates', function (assert) {
  assert.plan(1);
  assert.equal(formatInterval(60 * SECOND, { templates: {
    past: '<%= labels.minutes %>: <%= units %>'
  } }), 'minutes: 1');
});


