'use strict';

/*!
 * import(s)
 */
 var exec = require('child_process').exec;
 var debug = require('debug')('anyrun:local');


/*!
 * export(s)
 */
module.exports = Local;


/*!
 * Initialize a new `Local` instance.
 */
function Local () {
}

/*!
 * Run local command
 *
 * @param {String} cmd
 * @param {Object} opts
 * @param {Function} cb
 * @return {Local}
 */
Local.prototype.run = function () {
  var args = arguments;
  var cmd = args[0];
  var opts = null
  var cb = null;

  if (typeof(args[1]) === 'function') {
    cb = args[1];
  } else if (typeof(args[1]) === 'object') {
    opts = args[1];
    cb = args[2];
  }

  exec(cmd, opts, cb);
  return this;
};
