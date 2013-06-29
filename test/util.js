'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var Anyrun = require('../');
var parseTaskArgs = Anyrun.util.parseTaskArgs;


/*!
 * test(s)
 */

describe('util', function () {

  describe('parseTaskArgs(args)', function () {

    describe('with "task1"', function () {
      before(function (done) {
        this.ret = parseTaskArgs('task1');
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be task1', function (done) {
            expect(this.ret.name).to.be('task1');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal []', function (done) {
            expect(this.ret.list).to.eql([])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal {}', function (done) {
            expect(this.ret.dict).to.eql({});
            done();
          });
        });
      });
    }); // end of 'with "task1"'

    describe('with "task1#foo"', function () {
      before(function (done) {
        this.ret = parseTaskArgs('task1#foo');
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be task1', function (done) {
            expect(this.ret.name).to.be('task1');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal ["foo"]', function (done) {
            expect(this.ret.list).to.eql(['foo'])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal {}', function (done) {
            expect(this.ret.dict).to.eql({});
            done();
          });
        });
      });
    }); // end of 'with "task1#foo"'

    describe('with "task1#foo=1"', function () {
      before(function (done) {
        this.ret = parseTaskArgs('task1#foo=1');
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be task1', function (done) {
            expect(this.ret.name).to.be('task1');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal []', function (done) {
            expect(this.ret.list).to.eql([])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal { foo: "1" }', function (done) {
            expect(this.ret.dict).to.eql({ foo: '1' });
            done();
          });
        });
      });
    }); // end of 'with "task1#foo=1"'

    describe('with "task1#foo#bar=1#baz#hoge=1#piyo=2"', function () {
      before(function (done) {
        this.ret = parseTaskArgs('task1#foo#bar=1#baz#hoge=1#piyo=2');
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be task1', function (done) {
            expect(this.ret.name).to.be('task1');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal ["foo", "baz"]', function (done) {
            expect(this.ret.list).to.eql(['foo', 'baz'])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal { bar: "1", hoge: "1", piyo: "2" }', function (done) {
            expect(this.ret.dict).to.eql({ bar: '1', hoge: '1', piyo: '2' });
            done();
          });
        });
      });
    }); // end of 'with "task1#foo#bar=1#baz#hoge=1#piyo=2"'

    describe('with ""', function () {
      before(function (done) {
        this.ret = parseTaskArgs('');
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be ""', function (done) {
            expect(this.ret.name).to.be('');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal []', function (done) {
            expect(this.ret.list).to.eql([])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal {}', function (done) {
            expect(this.ret.dict).to.eql({});
            done();
          });
        });
      });
    }); // end of 'with ""'

    describe('with null', function () {
      before(function (done) {
        this.args = parseTaskArgs(null);
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be ""', function (done) {
            expect(this.ret.name).to.be('');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal []', function (done) {
            expect(this.ret.list).to.eql([])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal {}', function (done) {
            expect(this.ret.dict).to.eql({});
            done();
          });
        });
      });
    }); // end of 'with null'

    describe('no speficy', function () {
      before(function (done) {
        this.args = parseTaskArgs();
        done();
      });

      describe('return', function () {
        it('expect to be an Object', function (done) {
          expect(this.ret).to.be.an(Object);
          done();
        });

        describe('name property', function () {
          it('expect to be ""', function (done) {
            expect(this.ret.name).to.be('');
            done();
          });
        });

        describe('list property', function () {
          it('expect to equal []', function (done) {
            expect(this.ret.list).to.eql([])
            done();
          });
        });

        describe('dict property', function () {
          it('expect to equal {}', function (done) {
            expect(this.ret.dict).to.eql({});
            done();
          });
        });
      });
    }); // end of 'no speficy'

  }); // end of 'parseTaskArgs(args)'

}); // end of 'util'
