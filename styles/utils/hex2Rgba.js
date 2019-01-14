'use strict'
/**
 * Constants.
 */
var BASE = 16;
var HEX_REGEX = /^#?[a-fA-F0-9]+$/;
var HEX_SHORTHAND_LENGTH = 3;
var HEX_LENGTH = 6;

/**
 * Converts hexadecimal to RGBA.
 *
 * @param  {String}        hex     - The hexadecimal.
 * @param  {Number|String} [alpha] - The alpha transparency.
 * @return {String}                - The RGBA.
 */
export function hex2Rgba(hex, alpha) {
    if (!HEX_REGEX.test(hex)) {
        throw Error('hex2rgba: first argument has invalid hexadecimal characters');
    }

    // trim unnecessary characters
    if (hex[0] === '#') {
        hex = hex.slice(1);
    }

    // expand shorthand
    if (hex.length === HEX_SHORTHAND_LENGTH) {
        hex = hex.split('');
        hex.splice(2, 0, hex[2]);
        hex.splice(1, 0, hex[1]);
        hex.splice(0, 0, hex[0]);
        hex = hex.join('');
    }

    if (hex.length !== HEX_LENGTH) {
        throw Error('hex2rgba: first argument has invalid hexadecimal length');
    }

    // convert hex to rgb
    var values = [
        parseInt(hex.slice(0, 2), BASE),
        parseInt(hex.slice(2, 4), BASE),
        parseInt(hex.slice(4, 6), BASE)
    ];

    alpha = typeof alpha === 'number' ? alpha : parseFloat(alpha);
    if (alpha >= 0 && alpha <= 1) {
        values.push(alpha);
    } else {
        values.push(1);
    }

    return 'rgba(' + values.join(',') + ')';
};



// export function hex2Rgba(hex, alpha = 1) {
//     const r = parseInt(hex.substring(1, 3), 16);
//     const g = parseInt(hex.substring(3, 5), 16);
//     const b = parseInt(hex.substring(5, 7), 16);
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   }