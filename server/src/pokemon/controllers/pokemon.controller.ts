import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { Pokemon, PokemonListView } from '../models/pokemon';
import { PokemonCreateJsonRequest } from '../models/pokemon-create.json-request';
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

    @Post()
    createPokemon(@Body() jsonRequest: PokemonCreateJsonRequest): number {
        const pokemon = new Pokemon(null, jsonRequest.name, jsonRequest.type, jsonRequest.stats.HP, jsonRequest.stats.attack, jsonRequest.stats.defense, jsonRequest.stats.specialAttack, jsonRequest.stats.specialDefense, jsonRequest.stats.speed);

        const newPokemon = this.pokemonRepository.createNewPokemon(pokemon);
        
        return newPokemon.id;
    }
}
