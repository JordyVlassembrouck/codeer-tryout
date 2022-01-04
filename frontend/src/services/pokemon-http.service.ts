import axios from 'axios';
import { Pokemon, PokemonListView } from '../models/pokemon';

const pokemonHttpService = {
  getAllPokemon: (): Promise<PokemonListView[]> => {
    return axios.get('http://localhost:4000/pokemons')
      .then((result) => result.data)
      .catch((error) => {
        console.error('An error has occured while fetching Pokemons:', error);
        throw error;
      })
  },

  getPokemonDetails: (id: number): Promise<Pokemon> => {
    return axios.get(`http://localhost:4000/pokemons/${id}`)
      .then((result) => result.data)
      .catch((error) => {
        console.error('An error has occured while fetching Pokemons:', error);
        throw error;
      })
  },

  deletePokemon: (id: number): any => {
    return axios.delete(`http://localhost:4000/pokemons/${id}`)
      .catch((error) => {
        console.error('An error has occured while deleting Pokemons:', error);
        throw error;
      })
  }
}

export default pokemonHttpService;