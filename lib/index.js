var formatInterval = require('./formatInterval');

function formatTimeago(date, options) {
  return formatInterval(new Date() - date, options);
}

module.exports = formatTimeago;