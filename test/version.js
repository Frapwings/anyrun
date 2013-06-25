'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));


/*!
 * test(s)
 */

describe('anyrun --version', function () {
  it('should output version', function (done) {
    exec('bin/anyrun --version', function (err, stdout) {
      if (err) { return done(err); }
      expect(stdout).to.contain(pkg.version);
      done();
    });
  });
});

describe('anyrun -V', function () {
  it('should output version', function (done) {
    exec('bin/anyrun -V', function (err, stdout) {
      if (err) { return done(err); }
      expect(stdout).to.contain(pkg.version);
      done();
    });
  });
});
