var template = require('lodash/string/template');
var assign = require('lodash/object/assign');
var templates = {};
var defaults = {
  labels: {
    now: 'Just now',
    seconds: 'seconds',
    second: 'second',
    minutes: 'minutes',
    minute: 'minute',
    hours: 'hours',
    hour: 'hour',
    days: 'days',
    day: 'day',
    weeks: 'weeks',
    week: 'week',
    months: 'months',
    month: 'month',
    years: 'years',
    year: 'year'
  },
  templates: {
    past: '<%= count %> <%= unit %> ago',
    future: '<%= count %> <%= unit %> from now'
  }
};
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var MONTH = 30 * DAY;
var YEAR = 12 * MONTH;

function formatTimeago(date, options) {
  var delta = date instanceof Date ? new Date() - date.getTime() : date;
  options = assign({}, defaults, options);
  var labels = options.labels;
  var abs = Math.abs(delta);
  if (abs < SECOND) {
    return labels.now;
  }
  var count, unit;
  if (abs < MINUTE) {
    count = Math.round(abs / SECOND);
    unit = count > 1 ? labels.seconds : labels.second;
  } else if (abs < HOUR) {
    count = Math.round(abs / MINUTE);
    unit = count > 1 ? labels.minutes : labels.minute;
  } else if (abs < DAY) {
    count = Math.round(abs / HOUR);
    unit = count > 1 ? labels.hours : labels.hour;
  } else if (abs < WEEK) {
    count = Math.round(abs / DAY);
    unit = count > 1 ? labels.days : labels.day;
  } else if (abs < MONTH) {
    count = Math.round(abs / WEEK);
    unit = count > 1 ? labels.weeks : labels.week;
  } else if (abs < YEAR) {
    count = Math.round(abs / MONTH);
    unit = count > 1 ? labels.months : labels.month;
  } else {
    count = Math.round(abs / YEAR);
    unit = count > 1 ? labels.years : labels.year;
  }
  var formatter = delta >= 0 ? options.templates.past : options.templates.future;
  if (typeof formatter === 'string') {
    // compile the template just once
    formatter = ( templates[formatter] = templates[formatter] || template(formatter) );
  }
  return formatter({
    count: count,
    unit: unit,
    labels: labels
  });
}

module.exports = formatTimeago;