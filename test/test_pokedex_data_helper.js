'use strict';

var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var PokedexDataHelper = require('../pokedex_data_helper');

chai.config.includeStack = true;

describe('PokedexDataHelper', function() {
	var pokedexDataHelper = new PokedexDataHelper();
	var pokemonName;
	
	describe('#requestPokemon', function() {
 		this.timeout(15000);
		context('with a valid pokemon name', function() {
			it('returns response data for said pokemon name', function() {
				pokemonName = 'pikachu';
				var value = pokedexDataHelper.requestPokemon(pokemonName).then(function(data) {
					return data.name
				});

				return expect(value).to.eventually.eq(pokemonName);
			});
		});

		context('with an invalid pokemon name', function() {
			it('returns error response', function() {
				pokemonName = 'A';

				return expect(pokedexDataHelper.requestPokemon(pokemonName)).to.be.rejectedWith(Error);
			});
		});

	});


	describe('#formatPokedexData', function() {
		var data = {
			"forms": [
				{
					"url": "https://pokeapi.co/api/v2/pokemon-form/6/",
					"name": "charizard"
				}
			],
			"name": "charizard",
			"weight": 905,
			"base_experience": 240,
			"types": [
				{
					"slot": 2,
					"type": {
						"url": "https://pokeapi.co/api/v2/type/3/",
						"name": "flying"
					}
				},
				{
					"slot": 1,
					"type": {
						"url": "https://pokeapi.co/api/v2/type/10/",
						"name": "fire"
					}
				}
			]
		};

		context('with a pokedex data response', function() {
			it('formats the output response as expected', function() {
				expect(pokedexDataHelper.formatPokedexData(data)).to.eq('charizard, the flying,fire pokemon.');
			});
		});
	});

});
