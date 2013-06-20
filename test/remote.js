'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var anyrun = require('../');

/*!
 * test(s)
 */

describe('remote', function () {
  describe('zb-test', function () {
    it('should run with specify command', function (done) {
      anyrun().host('zb-test')
        .run('uname -u', function (err, stdout, stderr) {
          console.log('err', err);
          console.log('stdout', stdout);
          console.log('stderr', stderr);
          done();
        });
    });
  });

  describe('10.0.2.2', function () {
    it('should run with specify command', function (done) {
      anyrun().host('10.0.2.2')
        .run('uname -u', function (err, stdout, stderr) {
          console.log('err', err);
          console.log('stdout', stdout);
          console.log('stderr', stderr);
          done();
        });
    });
  });
});

