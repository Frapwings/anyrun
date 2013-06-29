'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var fs = require('fs');
var format = require('util').format;

var PKG = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));


/*!
 * test(s)
 */

describe('anyrun', function () {

  var testVersionOption = function (opt) {
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
          it(format('expect to contain "%s"', PKG.version), function (done) {
            expect(this.stdout).to.contain(PKG.version);
            done();
          });
        });
      });
    });
  };

  testVersionOption('--version');
  testVersionOption('-V');

}); // end of 'anyrun'
