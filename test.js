import test from 'ava';
import sinon from 'sinon';
import arabicRoman from './';

const cod = {
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
	M: '\u216F'
};

/**
 * @return {String}
 */
const charToCode = function () {
	let res = '';
	const args = arguments;
	let i;
	for (i = 0; i < args.length; i++) {
		res += cod[args[i]];
	}
	return res;
};

// toRoman
test('#toRoman should fire `arabicToRoman` if argument is arabic number', t => {
	const spy = sinon.spy(arabicRoman, 'arabicToRoman');

	arabicRoman.toRoman(3);
	arabicRoman.toRoman('5');

	t.true(spy.called);
	t.is(spy.getCall(0).args[0], 3);
	t.is(spy.getCall(1).args[0], '5');

	spy.restore();
});

test('#toRoman should fire `convertRoman` if argument is simple roman', t => {
	const spy = sinon.spy(arabicRoman, 'convertRoman');

	arabicRoman.toRoman('III');

	t.true(spy.called);
	t.is(spy.getCall(0).args[0], 'III');

	spy.restore();
});

// arabicToRoman
test('#arabicToRoman should not convert number < 1', t => {
	t.is(arabicRoman.arabicToRoman(0), undefined);
	t.is(arabicRoman.arabicToRoman(-1), undefined);
});

test('#arabicToRoman should not convert nubmer > 4000', t => {
	t.truthy(arabicRoman.arabicToRoman(4000));
	t.is(arabicRoman.arabicToRoman(4001), undefined);
});

test('#arabicToRoman should parse string attributes', t => {
	t.is(arabicRoman.arabicToRoman('1'), '\u2160');
	t.is(arabicRoman.arabicToRoman(NaN), undefined);
	t.is(arabicRoman.arabicToRoman('a1'), undefined);
});

test('#arabicToRoman should convert arabic to roman numerals (from 1 to 10)', t => {
	const codes = [
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
		charToCode('X')
	];
	for (let i = 1; i < codes.length - 1; i++) {
		t.is(arabicRoman.arabicToRoman(i), codes[i]);
	}
});

test('#arabicToRoman should convert big numbers', t => {
	t.is(arabicRoman.arabicToRoman(11), charToCode('XI'));
	t.is(arabicRoman.arabicToRoman(12), charToCode('XII'));
	t.is(arabicRoman.arabicToRoman(50), charToCode('L'));
	t.is(arabicRoman.arabicToRoman(100), charToCode('C'));
	t.is(arabicRoman.arabicToRoman(500), charToCode('D'));
	t.is(arabicRoman.arabicToRoman(1000), charToCode('M'));
});

test('#arabicToRoman should convert complex numbers', t => {
	t.is(arabicRoman.arabicToRoman(13), charToCode('X', 'III'));
	t.is(arabicRoman.arabicToRoman(14), charToCode('X', 'IV'));
	t.is(arabicRoman.arabicToRoman(15), charToCode('X', 'V'));
	t.is(arabicRoman.arabicToRoman(19), charToCode('X', 'IX'));
	t.is(arabicRoman.arabicToRoman(20), charToCode('X', 'X'));
	t.is(arabicRoman.arabicToRoman(39), charToCode('X', 'X', 'X', 'IX'));
	t.is(arabicRoman.arabicToRoman(4000), charToCode('M', 'M', 'M', 'M'));
	t.is(
		arabicRoman.arabicToRoman(3888),
		charToCode('M', 'M', 'M', 'D', 'C', 'C', 'C', 'L', 'X', 'X', 'X', 'VIII')
	);
	t.is(arabicRoman.arabicToRoman(3999), charToCode('M', 'M', 'M', 'C', 'M', 'X', 'C', 'IX'));
});

test('#arabicToRoman should convert hard numbers', t => {
	t.is(arabicRoman.arabicToRoman(4), charToCode('IV'));
	t.is(arabicRoman.arabicToRoman(9), charToCode('IX'));
	t.is(arabicRoman.arabicToRoman(40), charToCode('X', 'L'));
	t.is(arabicRoman.arabicToRoman(90), charToCode('X', 'C'));
	t.is(arabicRoman.arabicToRoman(400), charToCode('C', 'D'));
	t.is(arabicRoman.arabicToRoman(900), charToCode('C', 'M'));
});

// convertRoman
test('#convertRoman should parse string attributes', t => {
	t.is(arabicRoman.convertRoman(3), undefined);
	t.is(arabicRoman.convertRoman('asdif'), undefined);
});

test('#convertRoman should convert string to utf-8 symbols', t => {
	Object.keys(cod).forEach(num => {
		t.is(arabicRoman.convertRoman(num), charToCode(num));
	});
});

test('#convertRoman should convert symbols not in dict', t => {
	t.is(arabicRoman.convertRoman('XV'), charToCode('X', 'V'));
	t.is(arabicRoman.convertRoman('XXX'), charToCode('X', 'X', 'X'));
	t.is(arabicRoman.convertRoman('CXXVIII'), charToCode('C', 'X', 'X', 'VIII'));
});

test('#convertRoman should support lowercase input', t => {
	t.is(arabicRoman.convertRoman('vii'), charToCode('VII'));
});
