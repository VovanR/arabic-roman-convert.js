(function () {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('ArabicRoman', function () {
        /**
         */
        var module = function () {
            return window.ArabicRoman;
        };

        var cod = {
            I: '\u2160',
            II: '\u2161',
            III: '\u2162',
            IV: '\u2163',
            V: '\u2164',
            VI: '\u2165',
            VII: '\u2166',
            VIII: '\u2167',
            IX: '\u2168',
            X: '\u2169',
            XI: '\u216A',
            XII: '\u216B',
            L: '\u216C',
            C: '\u216D',
            D: '\u216E',
            M: '\u216F',
        };
        /**
         * @return {String}
         */
        var charToCode = function () {
            var res = '';
            var args = arguments;
            var i;
            for (i = 0; i < args.length; i++) {
                res += cod[args[i]];
            }
            return res;
        };

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });
        });

        describe('#toRoman', function () {
            it('should not convert number < 1', function () {
                var m = module();
                assert.isUndefined(m.toRoman(0));
                assert.isUndefined(m.toRoman(-1));
            });

            it('should not convert nubmer > 4000', function () {
                var m = module();
                assert.isDefined(m.toRoman(4000));
                assert.isUndefined(m.toRoman(4001));
            });

            it('should parse string attributes', function () {
                var m = module();
                assert.equal(m.toRoman('1'), '\u2160');
                assert.isUndefined(m.toRoman(NaN));
                assert.isUndefined(m.toRoman('a1'));
            });

            it('should convert arabic to roman numerals (from 1 to 10)', function () {
                var m = module();
                var codes = [
                    '',
                    charToCode('I'),
                    charToCode('II'),
                    charToCode('III'),
                    charToCode('IV'),
                    charToCode('V'),
                    charToCode('VI'),
                    charToCode('VII'),
                    charToCode('VIII'),
                    charToCode('IX'),
                    charToCode('X'),
                ];
                for (var i = 1; i < codes.length - 1; i++) {
                    assert.equal(m.toRoman(i), codes[i]);
                }
            });

            it('should convert big numbers', function () {
                var m = module();
                assert.equal(m.toRoman(11), charToCode('XI'));
                assert.equal(m.toRoman(12), charToCode('XII'));
                assert.equal(m.toRoman(50), charToCode('L'));
                assert.equal(m.toRoman(100), charToCode('C'));
                assert.equal(m.toRoman(500), charToCode('D'));
                assert.equal(m.toRoman(1000), charToCode('M'));
            });

            it('should convert complex numbers', function () {
                var m = module();
                assert.equal(m.toRoman(13), charToCode('X', 'III'));
                assert.equal(m.toRoman(14), charToCode('X', 'IV'));
                assert.equal(m.toRoman(15), charToCode('X', 'V'));
                assert.equal(m.toRoman(19), charToCode('X', 'IX'));
                assert.equal(m.toRoman(20), charToCode('X', 'X'));
                assert.equal(m.toRoman(39), charToCode('X', 'X', 'X', 'IX'));
                assert.equal(m.toRoman(4000), charToCode('M', 'M', 'M', 'M'));
                assert.equal(
                    m.toRoman(3888),
                    charToCode('M', 'M', 'M', 'D', 'C', 'C', 'C', 'L', 'X', 'X', 'X', 'VIII')
                );
                assert.equal(m.toRoman(3999), charToCode('M', 'M', 'M', 'C', 'M', 'X', 'C', 'IX'));
            });

            it('should convert hard numbers', function () {
                var m = module();
                assert.equal(m.toRoman(4), charToCode('IV'));
                assert.equal(m.toRoman(9), charToCode('IX'));
                assert.equal(m.toRoman(40), charToCode('X', 'L'));
                assert.equal(m.toRoman(90), charToCode('X', 'C'));
                assert.equal(m.toRoman(400), charToCode('C', 'D'));
                assert.equal(m.toRoman(900), charToCode('C', 'M'));
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

})();
