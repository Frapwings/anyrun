'use strict';

/*!
 * import(s)
 */
 var exec = require('child_process').exec;
 var dns = require('dns');
 var Connection = require('ssh2');
 var debug = require('debug')('anyrun');
 var nextTick = process.nextTick;


/*!
 * export(s)
 */
exports = module.exports = anyrun;


/*!
 * Initialize a new `AnyRun` instance.
 */
function anyrun () {
  return new AnyRun();
}

/*!
 * Initialize a new `AnyRun` instance.
 */
function AnyRun () {
  this._ssh = null;
  this._connection = null;
}

/*!
 * Set ssh options
 *
 * @param {String} key
 * @param {String | Number | Buffer} value
 * @return {AnyRun}
 */
AnyRun.prototype.ssh = function (key, value) {
  if (!this._ssh) {
    this._ssh = {
      host: 'localhost',
      port: 22
    };
  }
  this._ssh[key] = value;
  return this;
};

/*!
 * Run command
 *
 * @param {String} command
 * @param {Function} callback
 * @return {AnyRun}
 */
AnyRun.prototype.run = function (cmd, cb) {
  var self = this;
  if (this._ssh) {
    if (!this._connection) {
      sshConnect(this._ssh, function (err, con) {
        if (err && cb) {
          return cb(err);
        }
        self._connection = con;
        sshRun(con, cmd, cb);
      });
    } else {
      sshRun(this._connection, cmd, cb);
    }
  } else {
    exec(cmd, cb);
  }
  return this;
};

/*!
 * done
 *
 * @return {AnyRun}
 */
AnyRun.prototype.done = function (cb) {
  var self = this;
  if (this._connection) {
    this._connection.on('close', function (had_error) {
      debug('raise ssh connection close event', had_error);
      cb && cb();
      self._connection = null;
    });
    this._connection.end();
  }
  if (this._ssh) {
    this._ssh = null;
  }
  return this;
};

function sshConnect (opts, cb) {
  var con = new Connection();
  con.on('ready', function () {
    debug('raise ssh connection ready event');
    cb(null, con);
  });
  con.on('error', function (err) {
    debug('raise ssh connection error event', err);
    con.end();
    cb(err);
  });
  con.connect(opts);
}

function sshRun (con, cmd, cb) {
  con.exec(cmd, function (err, stream) {
    if (err) {
      return cb(err);
    }
    var stdout = '';
    var stderr = '';
    stream.on('data', function (data, extended) {
      debug('raise ssh connection data event', data, extended);
      if (extended === 'stderr') {
        stderr += data.toString();
      } else {
        stdout += data.toString();
      }
    });
    stream.on('exit', function (code, signal) {
      debug('raise ssh connection exit event', code, signal);
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
