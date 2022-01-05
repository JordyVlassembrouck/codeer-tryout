import { Pokemon, PokemonListView } from '../src/pokemon/models/pokemon';
import { PokemonDto } from '../src/pokemon/models/pokemon.dto';
const { PokemonController } = require('../src/pokemon/controllers/pokemon.controller');

const pokemonDtos = [
  new PokemonDto(1, 'Bulbasaur', ['Grass', 'Poison'], 1, 2, 3, 4, 5, 6,),
  new PokemonDto(2, 'Ivysaur', ['Grass', 'Poison'], 9, 8, 7, 6, 5, 4)
];

const repositoryMock = { 
  pokemonDtos: pokemonDtos,
  getAllPokemon() { return this.pokemonDtos },
  getPokemon(id: number) { }
};
const controller = new PokemonController(repositoryMock);

// getAllPokemon
test('getAllPokemon returns all Pokemon', () => {
  // given
  const ALL_POKEMON_LIST_VIEW = [
    new PokemonListView(pokemonDtos[0].id, pokemonDtos[0].name, pokemonDtos[0].type),
    new PokemonListView(pokemonDtos[1].id, pokemonDtos[1].name, pokemonDtos[1].type), 
  ];

  // when
  const expectedPokemon = controller.getAllPokemon();

  // then
  expect(expectedPokemon).toStrictEqual(ALL_POKEMON_LIST_VIEW);
});

test('getAllPokemon returns an empty list when no Pokemon are present', () => {
  // given
  const NO_POKEMONS = [];
  repositoryMock.getAllPokemon = () => { return NO_POKEMONS};
  
  // when
  const expectedPokemon = controller.getAllPokemon();
  
  // then
  expect(expectedPokemon).toStrictEqual(NO_POKEMONS);
});