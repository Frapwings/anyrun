'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;

var anyrun_define_file = __dirname + '/fixtures/anyrun.js';

/*!
 * test(s)
 */

describe('anyrun --tasks', function () {
  it('should output task list', function (done) {
    exec('bin/anyrun --tasks --file ' + anyrun_define_file, function (err, stdout) {
      if (err) { return done(err); }
      expect(stdout).to.contain('task1');
      expect(stdout).to.contain('This is the task1');
      expect(stdout).to.contain('task2');
      expect(stdout).to.contain('This is the task2');
      done();
    });
  });
});

describe('anyrun -t', function () {
  it('should output task list', function (done) {
    exec('bin/anyrun -t --file ' + anyrun_define_file, function (err, stdout) {
      if (err) { return done(err); }
      expect(stdout).to.contain('task1');
      expect(stdout).to.contain('This is the task1');
      expect(stdout).to.contain('task2');
      expect(stdout).to.contain('This is the task2');
      done();
    });
  });
});
