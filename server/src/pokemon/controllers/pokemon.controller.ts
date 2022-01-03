import { Controller, Delete, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Pokemon, PokemonListView } from '../models/pokemon';
import { PokemonRepository } from '../repositories';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    @Get()
    getAllPokemon(): PokemonListView[] {
        const pokemons = this.pokemonRepository.getAllPokemon();

        const listViewPokemon = pokemons.map((pokemon: Pokemon) => new PokemonListView(pokemon.id, pokemon.name, pokemon.type));

        return listViewPokemon;
    }

    @Get(':id')
    getPokemon(@Param() params): Pokemon {
        const pokemonId = this.checkIfIdIsValid(params.id);
        
        const pokemon = this.pokemonRepository.getPokemon(pokemonId);

        return pokemon;
    }

    @Delete(':id')
    deletePokemon(@Param() params): void {
        const pokemonId = this.checkIfIdIsValid(params.id);
        
        this.pokemonRepository.deletePokemon(pokemonId);
    }

    private checkIfIdIsValid(pokemonId: string): number {
        const parsedPokemonId = parseInt(pokemonId, 10);
        if (isNaN(parsedPokemonId)) {
            console.error(`[SERVER ERROR] GET /pokemons/:id request failed because an incorrect Pokemon ID (${parsedPokemonId}) was provided`);
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'ServerError.IncorrectPokemonId'
            }, HttpStatus.BAD_REQUEST);
        } else {
            return parsedPokemonId;
        }
    }
}
