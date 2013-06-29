'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;


/*!
 * test(s)
 */

describe('anyrun', function () {

  describe('bin/anyrun', function () {
    before(function (done) {
      exec('bin/anyrun', function (err, stdout) {
        if (err) { return done(err); }
        this.stdout = stdout;
        done();
      }.bind(this));
    });

    describe('stdout', function () {
      it('expect to contain "anyrun [options] [action ...]"', function (done) {
        expect(this.stdout).to.contain('anyrun [options] [action ...]');
        done();
      });

      it('expect to contain "-h, --help"', function (done) {
        expect(this.stdout).to.contain('-h, --help');
        done();
      });

      it('expect to contain "-t, --tasks"', function (done) {
        expect(this.stdout).to.contain('-t, --tasks');
        done();
      });

      it('expect to contain "-V, --version"', function (done) {
        expect(this.stdout).to.contain('-V, --version');
        done();
      });
    });
  });

});
