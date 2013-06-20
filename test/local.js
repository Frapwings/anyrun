'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var anyrun = require('../');

/*!
 * test(s)
 */

describe('local', function () {

  describe('host no specify', function () {
    it('should run with specify command', function (done) {
      anyrun().run('uname -u', function (err, stdout, stderr) {
        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
        done();
      });
    });
  });

  describe('localhost', function () {
    it('should run with specify command', function (done) {
      anyrun().host('localhost')
        .run('uname -u', function (err, stdout, stderr) {
          console.log('err', err);
          console.log('stdout', stdout);
          console.log('stderr', stderr);
          done();
        });
    });
  });

  describe('127.0.0.1', function () {
    it('should run with specify command', function (done) {
      anyrun().host('127.0.0.1')
        .run('uname -u', function (err, stdout, stderr) {
          console.log('err', err);
          console.log('stdout', stdout);
          console.log('stderr', stderr);
          done();
        });
    });
  });
});

