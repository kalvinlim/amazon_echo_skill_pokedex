	'use strict';

	var _ = require('lodash');
	var rp = require('request-promise');
	var ENDPOINT = 'http://pokeapi.co/api/v2/pokemon/';

	function PokedexDataHelper() { }

	PokedexDataHelper.prototype.requestPokemon = function(pokemon) {
		return this.getPokemon(pokemon).then(
			function(response) {
				console.log('success - received pokemon info for ' + pokemon);
				return response.body;
			}
		);
	};

	PokedexDataHelper.prototype.getPokemon = function(pokemon) {
		var options = {
			method: 'GET',
			uri: ENDPOINT + pokemon,
			resolveWithFullResponse: true,
			json: true
		};

		return rp(options);
	};

	PokedexDataHelper.prototype.formatPokedexData = function(pokedexData) {
		return _.template('${pokemon}, the ${types} pokemon.')({
			types: _.map(pokedexData.types, 'type.name'),
			pokemon: pokedexData.name
		});
	};

	module.exports = PokedexDataHelper;