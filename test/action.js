'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;

var ANYRUN_DEFINE_FILE = __dirname + '/fixtures/anyrun.js';


/*!
 * test(s)
 */

describe('anyrun', function () {

  describe('with exist task: task1', function () {
    before(function (done) {
      exec('bin/anyrun --file ' + ANYRUN_DEFINE_FILE + ' task1', function (err, stdout) {
        if (err) { return done(err); }
        this.stdout = stdout;
        done();
      }.bind(this));
    });

    describe('stdout', function () {
      it('expect to contain "load average"', function (done) {
        expect(this.stdout).to.contain('load average');
        done();
      });
    });
  });


  describe('with not exist task: foo', function () {
    before(function (done) {
      exec('bin/anyrun --file ' + ANYRUN_DEFINE_FILE + ' foo', function (err, stdout, stderr) {
        if (err) { return done(err); }
        this.stderr = stderr;
        done();
      }.bind(this));
    });

    describe('stderr', function () {
      it('expect to contain "Not exist `foo` task"', function (done) {
        expect(this.stderr).to.contain('Not exist `foo` task');
        done();
      });
    });
  });


  describe('with multiple tasks: task1 task2', function () {
    before(function (done) {
      exec('bin/anyrun --file ' + ANYRUN_DEFINE_FILE + ' task1#foo task2#bar=1', function (err, stdout) {
        if (err) { return done(err); }
        this.stdout = stdout;
        done();
      }.bind(this));
    });

    describe('stdout', function () {
      it('expect to contain "load average"', function (done) {
        expect(this.stdout).to.contain('load average');
        done();
      });
      it('expect to contain "hello"', function (done) {
        expect(this.stdout).to.contain('hello');
        done();
      });
    });
  });

}); // enf of 'anyrun'
