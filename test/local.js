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

  describe('with successful command', function () {
    it('should run', function (done) {
      anyrun().run('uname -s', function (err, stdout, stderr) {
        expect(err).to.eql(null);
        expect(stdout.length).to.be.greaterThan(0);
        expect(stderr).to.eql('');
        done();
      });
    });
  });

  describe('with failed command', function () {
    it('should run', function (done) {
      anyrun().run('uname -u', function (err, stdout, stderr) {
        expect(err).to.be.an(Error);
        expect(err.code).not.to.eql(0);
        expect(err.signal).to.eql(null);
        expect(stdout).to.eql('')
        expect(stderr.length).to.be.greaterThan(0);
        done();
      });
    });
  });

  describe('multiple command', function () {
    it('should run', function (done) {
      var runner = anyrun();
      runner.run('uname -s', function (err, stdout, stderr) {
        expect(err).to.eql(null);
        expect(stdout.length).to.be.greaterThan(0);
        expect(stderr).to.eql('');
        runner.run('uname -u', function (err, stdout, stderr) {
          expect(err).to.be.an(Error);
          expect(err.code).not.to.eql(0);
          expect(err.signal).to.eql(null);
          expect(stdout).to.eql('')
          expect(stderr.length).to.be.greaterThan(0);
          done();
        });
      });
    });
  });
});

