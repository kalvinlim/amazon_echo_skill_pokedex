'use strict';

module.change_code = 1;

var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('pokedex');
var PokedexDataHelper = require('./pokedex_data_helper');

app.launch(function(req, res) {
	var prompt = 'Which pokemon would you like info on?';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('pokedex', {
	'slots': {
		'POKEMONNAME': 'POKEMON'
	},
	'utterances': ['{|lookup} {-|POKEMONNAME}']
}, function(req, res) {
	    var pokemonName = req.slot('POKEMONNAME');
	    var reprompt = 'Give me a pokemon name.';

	    if (_.isEmpty(pokemonName)) {
	    	var prompt = 'I didn\'t hear a pokemon name. Please try again.';
	    	res.say(prompt).reprompt(reprompt).shouldEndSession(false);

	    	return true;  	
	    } else {
	    	var pokedexHelper = new PokedexDataHelper();
	    	pokedexHelper.requestPokemon(pokemonName).then(function(pokemonName) {
	    		res.say(pokedexHelper.formatPokedexData(pokemonName)).send();
	    	}).catch(function(err) {
	    		console.log(err.statusCode);
	    		var prompt = 'I didn\'t have data for ' + pokemonName;
	    		res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
	    	});

	    	return false;
	    }
	}
);

module.exports = app;