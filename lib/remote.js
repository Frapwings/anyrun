'use strict';

/*!
 * import(s)
 */
var exec = require('child_process').exec;
var Connection = require('ssh2');
var debug = require('debug')('anyrun:remote');
var nextTick = process.nextTick;


/*!
 * export(s)
 */
module.exports = Remote;


/*!
 * Initialize a new `Remote` instance.
 */
function Remote() {
  this._ssh = null;
  this._connection = null;
}

/*!
 * Set ssh options.
 *
 * @param {String} key
 * @param {String|Number|Buffer} value
 * @return {Remote|String}Number|Buffer}
 */
Remote.prototype.ssh = function () {
  var args = arguments;
  var key = args[0];
  var value = args[1];
  var ret;

  if (!this._ssh) {
    this._ssh = {
      host: 'localhost',
      port: 22
    };
  }

  if (value) {
    this._ssh[key] = value;
    ret = this;
  } else {
    ret = this._ssh[key];
  }

  return ret;
};

/*!
 * Run remote command
 *
 * @param {String} cmd
 * @param {Object} opts
 * @param {Function} cb
 * @return {Remote}
 */
Remote.prototype.run = function () {
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

  if (!this._connection) {
    connect(this._ssh, function (err, con) {
      if (err && cb) {
        return cb(err, '', '');
      }
      this._connection = con;
      run(con, cmd, opts, cb);
    }.bind(this));
  } else {
    run(this._connection, cmd, opts, cb);
  }

  return this;
};

/*!
 * end remote session
 *
 * @param {Function} cb
 * @return {Remote}
 */
Remote.prototype.end = function (cb) {
  if (this._connection) {
    this._connection.once('close', function (had_error) {
      debug('ssh connection close event:', had_error);
      cb && cb();
      this._connection = null;
    }.bind(this));
    this._connection.end();
  }

  return this;
};

function connect (opts, cb) {
  var con = new Connection();
  con.once('ready', function () {
    debug('ssh connection ready event');
    cb(null, con);
  });
  con.once('error', function (err) {
    debug('ssh connection error event', err);
    con.end();
    cb(err);
  });
  con.connect(opts);
}

function run (con, cmd, opts, cb) {
  var opts = opts || {};
  var cmd = cmd;
  if (opts && opts.cwd) {
    cmd = 'cd ' + opts.cwd + ';' + cmd;
  }
  debug('run:', cmd);

  con.exec(cmd, opts, function (err, stream) {
    var stdout = '';
    var stderr = '';

    if (err) {
      return cb(err, stdout, stderr);
    }

    stream.on('data', function (data, extended) {
      debug('ssh stream data event', data.toString(), extended);
      if (extended === 'stderr') {
        stderr += data.toString();
      } else {
        stdout += data.toString();
      }
    });

    stream.on('exit', function (code, signal) {
      debug('ssh stream exit event', code, signal);
      nextTick(function () {
        var err = null;
        if (code !== 0) {
          err = new Error('Error');
          err.code = code;
          err.signal = signal || null;
        }
        cb(err, stdout, stderr);
      });
    });
  }); 
}
