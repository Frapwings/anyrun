'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var Anyrun = require('../');
var Remote = Anyrun.Remote;
var format = require('util').format;
var fs = require('fs');

var TEST_PRIVATE_KEY = fs.readFileSync(__dirname + '/fixtures/id_rsa.vagrant');


/*!
 * test(s)
 */

describe('Remote()', function () {

  describe('#ssh(key, [value])', function () {
    it('export to not throwError', function (done) {
      this.remote = new Remote();
      expect(function () {
        this.remote.ssh('host', 'localhost');
      }.bind(this)).to.not.throwException();
      done();
    });

    describe('value of "host" key', function () {
      it('expect to equal "localhost"', function (done) {
        expect(this.remote.ssh('host')).to.eql('localhost')
        done();
      });
    });
  });

  describe('#run(cmd, [opts], cb)', function () {
    describe('with successful cmd: "uname -s"', function () {
      before(function (done) {
        var remote = this.remote = new Remote();
        remote.ssh('host', 'localhost')
        .ssh('port', 2222)
        .ssh('username', 'vagrant')
        .ssh('privateKey', TEST_PRIVATE_KEY)
        .run('uname -s', function () {
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
        var remote = this.remote = new Remote();
        remote.ssh('host', 'localhost')
        .ssh('port', 2222)
        .ssh('username', 'vagrant')
        .ssh('privateKey', TEST_PRIVATE_KEY)
        .run('uname -u', function () {
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
          var remote = this.remote = new Remote();
          remote.ssh('host', 'localhost')
          .ssh('port', 2222)
          .ssh('username', 'vagrant')
          .ssh('privateKey', TEST_PRIVATE_KEY)
          .run('uname -s', function () {
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

        describe('second cmd: "uname -u"', function () {
          before(function (done) {
            this.remote.run('uname -u', function () {
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
        var cwd = '/home';
        before(function (done) {
          new Remote()
          .ssh('host', 'localhost')
          .ssh('port', 2222)
          .ssh('username', 'vagrant')
          .ssh('privateKey', TEST_PRIVATE_KEY)
          .run('pwd', { cwd: cwd }, function () {
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
        var env = { __HOGE__: 'hoge' };
        before(function (done) {
          new Remote()
          .ssh('host', 'localhost')
          .ssh('port', 2222)
          .ssh('username', 'vagrant')
          .ssh('privateKey', TEST_PRIVATE_KEY)
          .run('env | grep hoge', { env: env }, function () {
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
          it(format('expect to contain "%s"', env.__HOGE__), function (done) {
            expect(this.stdout).to.contain(env.__HOGE__);
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

  describe('#end([cb])', function () {
    before(function (done) {
      var remote = this.remote = new Remote();
      remote.ssh('host', 'localhost')
      .ssh('port', 2222)
      .ssh('username', 'vagrant')
      .ssh('privateKey', TEST_PRIVATE_KEY)
      .run('uname -s', function () {
        remote.end(function (err) {
          this.err = err;
          done();
        }.bind(this));
      }.bind(this));
    });

    describe('err', function () {
      it('expect to equal undefined', function (done) {
        expect(this.err).to.eql(undefined);
        done();
      });
    });

    describe('when cmd: "uname -s"', function () {
      before(function (done) {
        this.remote.run('uname -s', function () {
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

    }); // end of 'second cmd: "uname -u"'

  }); // end of '#end([cb])'

}); // end of 'Remote()'
