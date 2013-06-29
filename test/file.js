'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;

var ANYRUN_DEFINE_FILE = __dirname + '/fixtures/anyrun.js';


/*!
 * test(s)
 */

describe('anyrun', function () {

  var testFileOption = function (opt) {
    describe(opt, function () {
      describe(format('bin/anyrun --tasks %s', opt), function () {
        before(function (done) {
          exec(format('bin/anyrun --tasks %s ', opt) + ANYRUN_DEFINE_FILE, function (err, stdout) {
            if (err) { return done(err); }
            this.stdout = stdout;
            done();
          }.bind(this));
        });

        describe('stdout', function () {
          it('expect to contain "task1"', function (done) {
            expect(this.stdout).to.contain('task1');
            done();
          });
          
          it('expect to contain "This is the task1"', function (done) {
            expect(this.stdout).to.contain('This is the task1');
            done();
          });

          it('expect to contain "task2"', function (done) {
            expect(this.stdout).to.contain('task2');
            done();
          });
          
          it('expect to contain "This is the task2"', function (done) {
            expect(this.stdout).to.contain('This is the task2');
            done();
          });
        });
      });
    });
  };

  testFileOption('--file');
  testFileOption('-f');

}); // end of 'anyrun'
