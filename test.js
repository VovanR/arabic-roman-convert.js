var assert = require('chai').assert;
var arabicRoman = require('./index');

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

describe('#toRoman', function () {
    it('should not convert number < 1', function () {
        assert.isUndefined(arabicRoman.toRoman(0));
        assert.isUndefined(arabicRoman.toRoman(-1));
    });

    it('should not convert nubmer > 4000', function () {
        assert.isDefined(arabicRoman.toRoman(4000));
        assert.isUndefined(arabicRoman.toRoman(4001));
    });

    it('should parse string attributes', function () {
        assert.equal(arabicRoman.toRoman('1'), '\u2160');
        assert.isUndefined(arabicRoman.toRoman(NaN));
        assert.isUndefined(arabicRoman.toRoman('a1'));
    });

    it('should convert arabic to roman numerals (from 1 to 10)', function () {
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
            assert.equal(arabicRoman.toRoman(i), codes[i]);
        }
    });

    it('should convert big numbers', function () {
        assert.equal(arabicRoman.toRoman(11), charToCode('XI'));
        assert.equal(arabicRoman.toRoman(12), charToCode('XII'));
        assert.equal(arabicRoman.toRoman(50), charToCode('L'));
        assert.equal(arabicRoman.toRoman(100), charToCode('C'));
        assert.equal(arabicRoman.toRoman(500), charToCode('D'));
        assert.equal(arabicRoman.toRoman(1000), charToCode('M'));
    });

    it('should convert complex numbers', function () {
        assert.equal(arabicRoman.toRoman(13), charToCode('X', 'III'));
        assert.equal(arabicRoman.toRoman(14), charToCode('X', 'IV'));
        assert.equal(arabicRoman.toRoman(15), charToCode('X', 'V'));
        assert.equal(arabicRoman.toRoman(19), charToCode('X', 'IX'));
        assert.equal(arabicRoman.toRoman(20), charToCode('X', 'X'));
        assert.equal(arabicRoman.toRoman(39), charToCode('X', 'X', 'X', 'IX'));
        assert.equal(arabicRoman.toRoman(4000), charToCode('M', 'M', 'M', 'M'));
        assert.equal(
            arabicRoman.toRoman(3888),
            charToCode('M', 'M', 'M', 'D', 'C', 'C', 'C', 'L', 'X', 'X', 'X', 'VIII')
        );
        assert.equal(arabicRoman.toRoman(3999), charToCode('M', 'M', 'M', 'C', 'M', 'X', 'C', 'IX'));
    });

    it('should convert hard numbers', function () {
        assert.equal(arabicRoman.toRoman(4), charToCode('IV'));
        assert.equal(arabicRoman.toRoman(9), charToCode('IX'));
        assert.equal(arabicRoman.toRoman(40), charToCode('X', 'L'));
        assert.equal(arabicRoman.toRoman(90), charToCode('X', 'C'));
        assert.equal(arabicRoman.toRoman(400), charToCode('C', 'D'));
        assert.equal(arabicRoman.toRoman(900), charToCode('C', 'M'));
    });
});

describe('#convertRoman', function () {
    it('should convert string to utf-8 symbols', function () {
        for (var num in cod) {
            assert.equal(arabicRoman.convertRoman(num), charToCode(num));
        }
    });

    it('should convert symbols not in dict', function () {
        assert.equal(arabicRoman.convertRoman('XV'), charToCode('X', 'V'));
        assert.equal(arabicRoman.convertRoman('XXX'), charToCode('X', 'X', 'X'));
        assert.equal(arabicRoman.convertRoman('CXXVIII'), charToCode('C', 'X', 'X', 'VIII'));
    });

    it('should support lowercase input', function () {
        assert.equal(arabicRoman.convertRoman('vii'), charToCode('VII'));
    });
});
