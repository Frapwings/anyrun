'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var anyrun = require('../');
var AnyRun = anyrun.AnyRun;
var Task = anyrun.Task;


/*!
 * test(s)
 */

describe('Task()', function () {

  describe('.name', function () {
    it('expect to be foo', function (done) {
      var task = new Task({ name: 'foo' });
      expect(task.name).to.be('foo');
      done();
    });
  });

  describe('.description', function () {
    it('expect to be bar', function (done) {
      var task = new Task({ description: 'bar' });
      expect(task.description).to.be('bar');
      done();
    });
  });

  describe('#execute()', function () {

    describe('success', function () {
      before(function (_done) {
        var task = new Task({
          runner: new AnyRun(),
          action: function (anyrun, args, done) {
            this.anyrun = anyrun;
            this.args = args;
            done();
          }.bind(this)
        });
        task.once('success', function () {
          this.success = true;
          _done();
        }.bind(this));
        task.execute();
      });

      describe('success event', function () {
        it('expect to raise event', function (done) {
          expect(this.success).to.be.ok();
          done();
        });
      });

      describe('anyrun argument', function () {
        it('expect to be an AnyRun', function (done) {
          expect(this.anyrun).to.be.an(AnyRun);
          done();
        });
      });

      describe('args argument', function () {
        it('expect to be an Object', function (done) {
          expect(this.args).to.be.an(Object);
          done();
        });
        it('expect to have list property', function (done) {
          expect(this.args).to.have.property('list');
          done();
        });
        it('expect to have dict property', function (done) {
          expect(this.args).to.have.property('dict');
          done();
        });
      });
    }); // end of 'success'

    describe('error', function () {
      before(function (_done) {
        var task = new Task({
          runner: new AnyRun(),
          action: function (anyrun, args, done) {
            this.anyrun = anyrun;
            this.args = args;
            done(new Error());
          }.bind(this)
        });
        task.once('error', function (err) {
          this.error = err;
          _done();
        }.bind(this));
        task.execute();
      });
        
      describe('error event', function () {
        it('expect to raise event', function (done) {
          expect(this.error).to.be.an(Error);
          done();
        });
      });

      describe('anyrun argument', function () {
        it('expect to be an AnyRun', function (done) {
          expect(this.anyrun).to.be.an(AnyRun);
          done();
        });
      });

      describe('args argument', function () {
        it('expect to be an Object', function (done) {
          expect(this.args).to.be.an(Object);
          done();
        });
        it('expect to have list property', function (done) {
          expect(this.args).to.have.property('list');
          done();
        });
        it('expect to have dict property', function (done) {
          expect(this.args).to.have.property('dict');
          done();
        });
      });

    }); // end of 'error'
  });
});
