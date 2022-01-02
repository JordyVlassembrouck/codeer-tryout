import { Controller, Get } from '@nestjs/common';
import { Pokemon } from '../models/pokemon';
import { PokemonRepository } from '../repositories';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    @Get()
    findAll(): Pokemon[] {
        return this.pokemonRepository.findAll();
    }
}
