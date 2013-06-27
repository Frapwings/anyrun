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

  describe('#run(cmd, [opts], cb)', function () {
    describe('with successful cmd: "uname -s"', function () {
      before(function (done) {
        this.local = new Local();
        this.local.run('uname -s', function () {
          var args = arguments;
          this.err = args[0];
          this.stdout = args[1];
          this.stderr = args[2];
          done();
        }.bind(this));
      });

      describe('err', function () {
        it('expect to equal null', function (done) {
          expect(this.err).to.eql(null);
          done();
        });
      });

      describe('stdout', function () {
        it('expect to be greater than 0', function (done) {
          expect(this.stdout.length).to.be.greaterThan(0);
          done();
        });
      });

      describe('stderr', function () {
        it('expect to equal ""', function (done) {
          expect(this.stderr).to.eql('')
          done();
        });
      });

    }); // end of 'with successful cmd: "uname -s"'

    describe('with failed cmd: "uname -u"', function () {
      before(function (done) {
        this.local = new Local();
        this.local.run('uname -u', function () {
          var args = arguments;
          this.err = args[0];
          this.stdout = args[1];
          this.stderr = args[2];
          done();
        }.bind(this));
      });

      describe('err', function () {
        it('expect to be an Error', function (done) {
          expect(this.err).to.be.an(Error);
          done();
        });
      });

      describe('err.code', function () {
        it('expect not to equal 0', function (done) {
          expect(this.err.code).not.to.eql(0);
          done();
        });
      });

      describe('err.signal', function () {
        it('expect to equal null', function (done) {
          expect(this.err.signal).to.eql(null);
          done();
        });
      });

      describe('stdout', function () {
        it('expect to equal ""', function (done) {
          expect(this.stdout).to.eql('')
          done();
        });
      });

      describe('stderr', function () {
        it('expect to be greater than 0', function (done) {
          expect(this.stderr.length).to.be.greaterThan(0);
          done();
        });
      });

    }); // end of 'with failed cmd: "uname -u"'

    describe('multiple cmd', function () {
      describe('first cmd: "uname -s"', function () {
        before(function (done) {
          this.local = new Local();
          this.local.run('uname -s', function () {
            var args = arguments;
            this.err = args[0];
            this.stdout = args[1];
            this.stderr = args[2];
            done();
          }.bind(this));
        });

        describe('err', function () {
          it('expect to equal null', function (done) {
            expect(this.err).to.eql(null);
            done();
          });
        });

        describe('stdout', function () {
          it('expect to be greater than 0', function (done) {
            expect(this.stdout.length).to.be.greaterThan(0);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(this.stderr).to.eql('')
            done();
          });
        });

        describe('second cmd: "uname -s"', function () {
          before(function (done) {
            this.local.run('uname -u', function () {
              var args = arguments;
              this.err = args[0];
              this.stdout = args[1];
              this.stderr = args[2];
              done();
            }.bind(this));
          });

          describe('err', function () {
            it('expect to be an Error', function (done) {
              expect(this.err).to.be.an(Error);
              done();
            });
          });

          describe('err.code', function () {
            it('expect not to equal 0', function (done) {
              expect(this.err.code).not.to.eql(0);
              done();
            });
          });

          describe('err.signal', function () {
            it('expect to equal null', function (done) {
              expect(this.err.signal).to.eql(null);
              done();
            });
          });

          describe('stdout', function () {
            it('expect to equal ""', function (done) {
              expect(this.stdout).to.eql('')
              done();
            });
          });

          describe('stderr', function () {
            it('expect to be greater than 0', function (done) {
              expect(this.stderr.length).to.be.greaterThan(0);
              done();
            });
          });

        }); // end of 'second cmd: "uname -u"'

      }); // end of 'first cmd: "uname -s"'

    }); // end of 'multiple cmd'

    describe('with opts', function () {

      describe('cwd', function () {
        var cwd = process.cwd() + '/test';
        before(function (done) {
          new Local().run('pwd', { cwd: cwd }, function () {
            var args = arguments;
            this.err = args[0];
            this.stdout = args[1];
            this.stderr = args[2];
            done();
          }.bind(this));
        });

        describe('err', function () {
          it('expect to equal null', function (done) {
            expect(this.err).to.eql(null);
            done();
          });
        });

        describe('stdout', function () {
          it(format('expect to contain "%s"', cwd), function (done) {
            expect(this.stdout).to.contain(cwd);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(this.stderr).to.eql('')
            done();
          });
        });
      }); // end of 'cwd'

      describe('env', function () {
        var env = { HOGE: 'hoge' };
        before(function (done) {
          new Local().run('env | grep hoge', { env: env }, function () {
            var args = arguments;
            this.err = args[0];
            this.stdout = args[1];
            this.stderr = args[2];
            done();
          }.bind(this));
        });

        describe('err', function () {
          it('expect to equal null', function (done) {
            expect(this.err).to.eql(null);
            done();
          });
        });

        describe('stdout', function () {
          it(format('expect to contain "%s"', env.HOGE), function (done) {
            expect(this.stdout).to.contain(env.HOGE);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(this.stderr).to.eql('')
            done();
          });
        });
      }); // end of 'env'

    }); // end of 'with opts'

  }); // end of '#run(cmd, [opts], cb)'

}); // end of 'Local()'
