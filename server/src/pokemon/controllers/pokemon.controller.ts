import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Pokemon } from '../models/pokemon';
import { PokemonRepository } from '../repositories';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    @Get()
    getAllPokemon(): Pokemon[] {
        return this.pokemonRepository.getAllPokemon();
    }

    @Get(':id')
    getPokemon(@Param() params): Pokemon {
        const pokemonId = parseInt(params.id, 10);

        if (isNaN(pokemonId)) {
            console.error('[SERVER ERROR] GET /pokemons/:id request failed because an incorrect Pokemon ID was provided');
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'ServerError.IncorrectPokemonId'
            }, HttpStatus.BAD_REQUEST);
        }
        
        const pokemon = this.pokemonRepository.getPokemon(pokemonId);

        return pokemon;
    }
}
