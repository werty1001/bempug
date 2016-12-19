
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

		let selfClosing = ['img','input','hr','br','wbr','source','area','col','colgroup','meta','link'];

		let fixCompiled = PugCompiled.replace( /\/>/gi, '>' ).replace( /(<[A-Z][A-Z0-9]*\b[^>]*>)([^<>]*)(<\/[A-Z][A-Z0-9]*>)/gi, function(str, start, content, end) {

			let tag = start.replace( /<|>/gi, '' ).split( ' ' )[0];

			return start + ( ( selfClosing.indexOf( tag ) === -1 ) ? content.trim() : content ) + end;
		});

		require( 'fs' ).writeFileSync( __dirname + '/page.pug.html', PugCompiled + '<!-- Pug v2.0.0-beta6 -->', 'utf8' );
		require( 'fs' ).writeFileSync( __dirname + '/page.fix.html', fixCompiled + '<!-- Pug v2.0.0-beta6 -->', 'utf8' );

	}

	if ( jade ) {

		let JadeCompiled = jade.renderFile( file, options );

		require( 'fs' ).writeFileSync( __dirname + '/page.jade.html', JadeCompiled + '<!-- Jade v1.11.0 -->', 'utf8' );

	}

})();
