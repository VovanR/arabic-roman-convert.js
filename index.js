/*!
 * arabic-roman-convert.js
 * Copyright(c) 2016 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

(function (root, factory) {
	/* eslint-disable */
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return (root.ArabicRoman = factory());
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.ArabicRoman = factory();
	}
	/* eslint-enable */
})(this, function () {
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
		'\u216D\u216F', // hard number
		'\u216E',
		'\u216D\u216E', // hard number
		'\u216D',
		'\u2169\u216D', // hard number
		'\u216C',
		'\u2169\u216C', // hard number
		'\u216B',
		'\u216A'
	];

	// from 10 to 1
	var i = 11;
	while (--i) {
		arabic.push(i);
		roman.push(String.fromCharCode(8543 + i));
	}

	var length = roman.length;

	/**
	 * @param {String} source
	 * @return {String}
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
		 * @param {Number|String} source
		 * @return {String}
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
		 * @param {Number|String} number
		 * @return {String}
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
		 * @param {String} source
		 * @return {String}
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
