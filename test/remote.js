'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var fs = require('fs');
var anyrun = require('../');


var TEST_PRIVATE_KEY = fs.readFileSync(__dirname + '/fixtures/id_rsa.vagrant');


/*!
 * test(s)
 */

describe('remote', function () {

  describe('with successful command', function () {
    it('should run', function (done) {
      var runner = anyrun()
        .ssh('host', 'localhost')
        .ssh('port', 2222)
        .ssh('username', 'vagrant')
        .ssh('privateKey', TEST_PRIVATE_KEY)
        .run('uname -s', function (err, stdout, stderr) {
          runner.done(function () {
            expect(err).to.eql(null);
            expect(stdout.length).to.be.greaterThan(0);
            expect(stderr).to.eql('');
            done();
          });
        });
    });
  });

  describe('with failed command', function () {
    it('should run', function (done) {
      var runner = anyrun()
        .ssh('host', 'localhost')
        .ssh('port', 2222)
        .ssh('username', 'vagrant')
        .ssh('privateKey', TEST_PRIVATE_KEY)
        .run('uname -u', function (err, stdout, stderr) {
          runner.done(function () {
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

  describe('multiple command', function () {
    it('should run', function (done) {
      var runner = anyrun()
        .ssh('host', 'localhost')
        .ssh('port', 2222)
        .ssh('username', 'vagrant')
        .ssh('privateKey', TEST_PRIVATE_KEY)
        .run('uname -s', function (err, stdout, stderr) {
          expect(err).to.eql(null);
          expect(stdout.length).to.be.greaterThan(0);
          expect(stderr).to.eql('');
          runner.run('uname -u', function (err, stdout, stderr) {
            runner.done(function () {
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

});

