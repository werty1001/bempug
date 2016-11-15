
'use strict';

(function(){

	try {

		var pug = require( 'pug' );

	} catch( e ) {

		console.log( 'For test install Pug [ npm i pug --save-dev ] then try again.' );
		return;

	}

	try {

		var jade = require( 'jade' );

	} catch( e ) {

		console.log( 'For test install Jade [ npm i jade --save-dev ] then try again.' );
		return;

	}

	let fs = require( 'fs' );
	let file = __dirname + '/page.pug';
	let options = {pretty: '\t', doctype: 'html'};

	let PugCompiled = pug.renderFile( file, options );
	let JadeCompiled = jade.renderFile( file, options );

	fs.writeFileSync( __dirname + '/page.pug.html',  PugCompiled +  '<!-- Pug v2.0.0-beta6 -->',  'utf8' );
	fs.writeFileSync( __dirname + '/page.jade.html', JadeCompiled + '<!-- Jade v1.11.0 -->',      'utf8' );

})();
