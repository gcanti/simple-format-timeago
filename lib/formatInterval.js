var template = require('lodash/string/template');
var assign = require('lodash/object/assign');
var times = require('./times');
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
    past: '<%= units %> <%= label %> ago',
    future: '<%= units %> <%= label %> from now'
  }
};

function formatInterval(delta, options) {
  options = assign({}, defaults, options);
  var labels = options.labels;
  var abs = Math.abs(delta);
  if (abs < times.SECOND) {
    return labels.now;
  }
  var units, label;
  if (abs < times.MINUTE) {
    units = Math.round(abs / times.SECOND);
    label = units > 1 ? labels.seconds : labels.second;
  } else if (abs < times.HOUR) {
    units = Math.round(abs / times.MINUTE);
    label = units > 1 ? labels.minutes : labels.minute;
  } else if (abs < times.DAY) {
    units = Math.round(abs / times.HOUR);
    label = units > 1 ? labels.hours : labels.hour;
  } else if (abs < times.WEEK) {
    units = Math.round(abs / times.DAY);
    label = units > 1 ? labels.days : labels.day;
  } else if (abs < times.MONTH) {
    units = Math.round(abs / times.WEEK);
    label = units > 1 ? labels.weeks : labels.week;
  } else if (abs < times.YEAR) {
    units = Math.round(abs / times.MONTH);
    label = units > 1 ? labels.months : labels.month;
  } else {
    units = Math.round(abs / times.YEAR);
    label = units > 1 ? labels.years : labels.year;
  }
  var formatter = delta >= 0 ? options.templates.past : options.templates.future;
  if (typeof formatter === 'string') {
    // compile the template just once
    formatter = ( templates[formatter] = templates[formatter] || template(formatter) );
  }
  return formatter({
    units: units,
    label: label,
    labels: labels
  });
}

module.exports = formatInterval;