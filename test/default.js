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
  it('should output help', function (done) {
    exec('bin/anyrun', function (err, stdout) {
      if (err) { return done(err); }
      expect(stdout).to.contain('anyrun [options] [action ...]');
      expect(stdout).to.contain('-h, --help');
      expect(stdout).to.contain('-t, --tasks');
      expect(stdout).to.contain('-V, --version');
      done();
    });
  });
});
