'use strict';

/*!
 * import(s)
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');


/*!
 * export(s)
 */
module.exports = Task;


/*!
 * Initialize a new `Task` instance.
 *
 * @param {Object} opts
 */
function Task (opts) {
  EventEmitter.call(this);

  this._name = opts.name || '';
  this._description = opts.description || '';
  this._runner = opts.runner || null;
  this._list = opts.list || [];
  this._dict = opts.dict || {};
  this._action = opts.action || null;
}

util.inherits(Task, EventEmitter);


/*!
 * name
 *
 * @return {String}
 */
Object.defineProperty(Task.prototype, 'name', {
  get: function () { return this._name; }
});


/*!
 * description
 *
 * @return {String}
 */
Object.defineProperty(Task.prototype, 'description', {
  get: function () { return this._description; }
});


/*!
 * Execute task
 *
 * @return {Task}
 */
Task.prototype.execute = function () {
  var self = this;

  if (this._action) {
    this._action(this._runner, {
      list: this._list,
      dict: this._dict,
    }, function (ret) {
      if (ret === undefined) {
        self.emit('success');
      } else {
        self.emit('error', ret);
      }
    });
  }

  return this;
};
