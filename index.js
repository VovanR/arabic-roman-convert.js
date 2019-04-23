/*!
 * arabic-roman-convert.js
 * Copyright(c) 2016 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

(function (root, factory) {
	// eslint-disable-next-line no-undef
	if (typeof define === 'function' && define.amd) {
		// eslint-disable-next-line no-undef
		define([], function () {
			// eslint-disable-next-line no-return-assign
			return (root.ArabicRoman = factory());
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.ArabicRoman = factory();
	}
})(this, function () {
	'use strict';

	var arabic = [
		1000,
		900, // Hard number
		500,
		400, // Hard number
		100,
		90, // Hard number
		50,
		40, // Hard number
		12,
		11
	];
	var stringRoman = [
		'M',
		'#',
		'D',
		'#',
		'C',
		'#',
		'L',
		'#',
		'XII',
		'XI',
		'X',
		'IX',
		'VIII',
		'VII',
		'VI',
		'V',
		'IV',
		'III',
		'II',
		'I'
	];
	var roman = [
		'\u216F',
		'\u216D\u216F', // Hard number
		'\u216E',
		'\u216D\u216E', // Hard number
		'\u216D',
		'\u2169\u216D', // Hard number
		'\u216C',
		'\u2169\u216C', // Hard number
		'\u216B',
		'\u216A'
	];

	// From 10 to 1
	var i = 11;
	while (--i) {
		arabic.push(i);
		roman.push(String.fromCharCode(8543 + i));
	}

	var length = roman.length;

	/**
	 * @param {string} source
	 * @return {string}
	 */
	function convertRoman(source) {
		var result = '';
		var i;
		var current;
		var re;
		for (i = 0; i < length; i += 1) {
			current = stringRoman[i];
			re = new RegExp('^' + current, 'i');
			if (re.test(source)) {
				result = roman[i];
				result += convertRoman(source.substr(current.length, source.length));
				break;
			}
		}

		return result;
	}

	return {
		/**
		 * @param {number|string} source
		 * @return {string}
		 */
		toRoman: function (source) {
			var result;

			if (
				(typeof source === 'string' && parseInt(source, 10) > 0) ||
				typeof source === 'number'
			) {
				result = this.arabicToRoman(source);
			} else {
				result = this.convertRoman(source);
			}

			return result;
		},

		/**
		 * Convert arabic nubmer to roman UTF-8 numerals
		 *
		 * @param {number|string} number
		 * @return {string}
		 */
		arabicToRoman: function (number) {
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

		/**
		 * Convert simple roman string to roman UTF-8 numerals
		 *
		 * @param {string} source
		 * @return {string}
		 */
		convertRoman: function (source) {
			if (typeof source !== 'string') {
				return;
			}

			if (!source.match(/^[ivxlcdm]+$/i)) {
				return;
			}

			return convertRoman(source);
		}
	};
});
