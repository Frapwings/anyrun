'use strict';

/*!
 * import(s)
 */
var debug = require('debug')('anyrun:util');


/*!
 * export(s)
 */
module.exports = {
  parseTaskArgs: parseTaskArgs
}


function parseTaskArgs (args) {
  var ret = {
    name: '',
    list: [],
    dict: {}
  };
  debug('parseTaskArgs args:', args);

  if (args !== undefined && args !== null && args !== '') {
    var splited = args.split('#');
    debug('splited', splited);
    ret.name = splited.shift();
    splited.forEach(function (arg) {
      var v = arg.split('=');
      if (v.length === 1) {
        ret.list.push(v[0]);
      } else {
        ret.dict[v[0]] = v[1];
      }
    });
  }

  debug('parseTaskArgs ret:', ret);
  return ret;
}
