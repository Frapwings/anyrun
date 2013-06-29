'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;


/*!
 * test(s)
 */

describe('anyrun', function () {

  var testHelpOption = function (opt) {
    describe(opt, function () {
      describe(format('bin/anyrun %s', opt), function () {
        before(function (done) {
          exec(format('bin/anyrun %s', opt), function (err, stdout) {
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

  };

  testHelpOption('--help');
  testHelpOption('-h');

}); // end of 'anyrun'
