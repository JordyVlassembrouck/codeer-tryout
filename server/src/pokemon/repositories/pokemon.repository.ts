import { HttpException, Injectable } from '@nestjs/common';
import * as pokemonJson from '../data/pokemons.json';
import { Pokemon } from '../models/pokemon';
import { PokemonDto } from '../models/pokemon.dto';
import { PokemonNotFoundException } from './pokemon-not-found.exception';

@Injectable()
export class PokemonRepository {
    private pokemonDtos: PokemonDto[];

    constructor() {
        this.pokemonDtos = pokemonJson;
    }

    getAllPokemon(): Pokemon[] {
        const pokemons = [];
        this.pokemonDtos.forEach((pokemonDto: PokemonDto) => 
            pokemons.push(this.createPokemonFrom(pokemonDto))
        );
        return pokemons;
    }

    getPokemon(id: number): Pokemon {
        const pokemonDto = this.pokemonDtos.find((pokemonDto: PokemonDto) => pokemonDto.id === id);

        if (!pokemonDto) {
            console.error(`[SERVER ERROR] Pokemon for ID ${id} not found`);
            throw new PokemonNotFoundException();
        }

        return this.createPokemonFrom(pokemonDto);
    }

    private createPokemonFrom(pokemonDto: PokemonDto): Pokemon {
        return new Pokemon(
            pokemonDto.id,
            pokemonDto.name,
            pokemonDto.type,
            pokemonDto.base.HP,
            pokemonDto.base.Attack,
            pokemonDto.base.Defense,
            pokemonDto.base['Sp. Attack'],
            pokemonDto.base['Sp. Defense'],
            pokemonDto.base.Speed
        );
    }
}
