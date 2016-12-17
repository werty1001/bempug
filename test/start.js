
'use strict';

(function() {

	let file = __dirname + '/page.pug';

	let options = {
		pretty: '\t',
		doctype: 'html'
	};

	try {

		var pug = require( 'pug' );

	} catch( err ) {

		console.log( 'For Pug test you must install module [ npm i pug --save-dev ]' );

	}

	try {

		var jade = require( 'jade' );

	} catch( err ) {

		console.log( 'For Jade test you must install module [ npm i jade --save-dev ]' );

	}

	if ( pug ) {

		let PugCompiled = pug.renderFile( file, options );

		require( 'fs' ).writeFileSync( __dirname + '/page.pug.html',  PugCompiled +  '<!-- Pug v2.0.0-beta6 -->', 'utf8' );

	}

	if ( jade ) {

		let JadeCompiled = jade.renderFile( file, options );

		require( 'fs' ).writeFileSync( __dirname + '/page.jade.html', JadeCompiled + '<!-- Jade v1.11.0 -->', 'utf8' );

	}

})();
