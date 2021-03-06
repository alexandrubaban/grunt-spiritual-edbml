"use strict";

/**
 * EDB processing instruction.
 * @TODO Problem with one-letter variable names in <?input name="a" type="TestData"?>
 * @param {String} pi
 */
class Instruction {

	/**
	 * @param {String} pi
	 */
	constructor ( pi ) {
		this.tag = pi.split ( "<?" )[ 1 ].split ( " " )[ 0 ]; // TODO: regexp this
		this.attributes = Object.create ( null );
		var hit, atexp = Instruction._ATEXP;
		while (( hit = atexp.exec ( pi ))) {
			var n = hit [ 1 ], v = hit [ 2 ];
			this.attributes [ n ] = cast ( v );
		}
	}
}


// STATICS .............................................................................

/**
 * Extract processing instructions from source.
 * @param {String} source
 * @returns {Array<Instruction>}
 */
Instruction.from = function ( source ) {
	var pis = [], hit = null; 
	while (( hit = this._PIEXP.exec ( source ))) {
			pis.push ( new Instruction ( hit [ 0 ]));
	}
	return pis;
};

/**
 * Remove processing instructions from source.
 * @param {String} source
 * @returns {String}
 */
Instruction.clean = function ( source ) {
	return source.replace ( this._PIEXP, "" );
};

/**
 * Math processing instruction.
 * @type {RegExp}
 */
Instruction._PIEXP = /<\?.[^>?]+\?>/g;

/**
 * Match attribute name and value.
 * @type {RegExp}
 */
Instruction._ATEXP = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
