'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var Anyrun = require('../');
var Local = Anyrun.Local;
var format = require('util').format;


/*!
 * test(s)
 */

describe('Local()', function () {

  var describeWithSuccessfulCmd = function (cmd) {
    describe(format('with successful cmd: "%s"', cmd), function () {
      var local, err, stdout, stderr;
      before(function (done) {
        local = new Local();
        local.run(cmd, function () {
          var args = arguments;
          err = args[0];
          stdout = args[1];
          stderr = args[2];
          done();
        });
      });

      describe('err', function () {
        it('expect to equal null', function (done) {
          expect(err).to.eql(null);
          done();
        });
      });

      describe('stdout', function () {
        it('expect to be greater than 0', function (done) {
          expect(stdout.length).to.be.greaterThan(0);
          done();
        });
      });

      describe('stderr', function () {
        it('expect to equal ""', function (done) {
          expect(stderr).to.eql('')
          done();
        });
      });

    });
  };

  var describeWithFailedCmd = function (cmd) {
    describe(format('with failed cmd: "%s"', cmd), function () {
      var local, err, stdout, stderr;
      before(function (done) {
        local = new Local();
        local.run(cmd, function () {
          var args = arguments;
          err = args[0];
          stdout = args[1];
          stderr = args[2];
          done();
        });
      });

      describe('err', function () {
        it('expect to be an Error', function (done) {
          expect(err).to.be.an(Error);
          done();
        });
      });

      describe('err.code', function () {
        it('expect not to equal 0', function (done) {
          expect(err.code).not.to.eql(0);
          done();
        });
      });

      describe('err.signal', function () {
        it('expect to equal null', function (done) {
          expect(err.signal).to.eql(null);
          done();
        });
      });

      describe('stdout', function () {
        it('expect to equal ""', function (done) {
          expect(stdout).to.eql('')
          done();
        });
      });

      describe('stderr', function () {
        it('expect to be greater than 0', function (done) {
          expect(stderr.length).to.be.greaterThan(0);
          done();
        });
      });

    });
  };


  describe('#run(cmd, [opts], cb)', function () {
    describeWithSuccessfulCmd('uname -s');
    describeWithFailedCmd('uname -u');

    describe('execute multiple', function () {
      describe('first execute', function () {
        describeWithSuccessfulCmd('uname -s');
        describe('second execute', function () {
          describeWithFailedCmd('uname -u')
        });
      });
    });

    describe('with opts', function () {

      describe('cwd', function () {
        var err, stdout, stderr;
        var cwd = process.cwd() + '/test';
        before(function (done) {
          new Local().run('pwd', { cwd: cwd }, function () {
            var args = arguments;
            err = args[0];
            stdout = args[1];
            stderr = args[2];
            done();
          });
        });

        describe('err', function () {
          it('expect to equal null', function (done) {
            expect(err).to.eql(null);
            done();
          });
        });

        describe('stdout', function () {
          it(format('expect to contain "%s"', cwd), function (done) {
            expect(stdout).to.contain(cwd);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(stderr).to.eql('')
            done();
          });
        });
      }); // end of 'cwd'

      describe('env', function () {
        var env = { HOGE: 'hoge' };
        var err, stdout, stderr;
        before(function (done) {
          new Local().run('env | grep hoge', { env: env }, function () {
            var args = arguments;
            err = args[0];
            stdout = args[1];
            stderr = args[2];
            done();
          });
        });

        describe('err', function () {
          it('expect to equal null', function (done) {
            expect(err).to.eql(null);
            done();
          });
        });

        describe('stdout', function () {
          it(format('expect to contain "%s"', env.HOGE), function (done) {
            expect(stdout).to.contain(env.HOGE);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(stderr).to.eql('')
            done();
          });
        });
      }); // end of 'env'

    }); // end of 'with opts'

  }); // end of '#run(cmd, [opts], cb)'

}); // end of 'Local()'
