/*!
 * arabic-roman-convert.js
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ArabicRoman = factory();
    }
}(this, function () {

    'use strict';

    var arabic = [
        1000,
        900, // hard number
        500,
        400, // hard number
        100,
        90, // hard number
        50,
        40, // hard number
        12,
        11,
    ];
    var roman = [
        '\u216F',
        '\u216D\u216F', // hard number
        '\u216E',
        '\u216D\u216E', // hard number
        '\u216D',
        '\u2169\u216D', // hard number
        '\u216C',
        '\u2169\u216C', // hard number
        '\u216B',
        '\u216A',
    ];

    // from 10 to 1
    var i = 11;
    while (--i) {
        arabic.push(i);
        roman.push(String.fromCharCode(8543 + i));
    }

    return {
        /**
         * Convert arabic to numeral numerals
         *
         * @param {Number|String} number
         * @return {String}
         */
        toRoman: function (number) {
            if (typeof number === 'string') {
                number = parseInt(number, 10);
            }

            if (typeof number !== 'number' || isNaN(number)) {
                return;
            }

            if (number <= 0 || number > 4000) {
                return;
            }

            var result = '';
            var length = arabic.length;
            var i;
            var currentArabic;
            for (i = 0; i < length; i += 1) {
                currentArabic = arabic[i];
                while (number >= currentArabic && number > 0) {
                    if (
                        (currentArabic === 12 && number > 12) ||
                        (currentArabic === 11 && number > 11)
                    ) {
                        break;
                    }
                    result += roman[i];
                    number -= currentArabic;
                }
            }

            return result;
        },
    };

}));
