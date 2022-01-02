import { Injectable } from '@nestjs/common';
import * as pokemonJson from '../data/pokemons.json';
import { Pokemon } from '../models/pokemon';
import { PokemonDto } from '../models/pokemon.dto';

@Injectable()
export class PokemonRepository {
    private pokemonDtos: PokemonDto[];

    constructor() {
        this.pokemonDtos = pokemonJson;
    }

    findAll(): Pokemon[] {
        const pokemons = [];
        this.pokemonDtos.forEach((pokemonDto: PokemonDto) => 
            pokemons.push(new Pokemon(
                pokemonDto.id,
                pokemonDto.name,
                pokemonDto.type,
                pokemonDto.base.HP,
                pokemonDto.base.Attack,
                pokemonDto.base.Defense,
                pokemonDto.base['Sp. Attack'],
                pokemonDto.base['Sp. Defense'],
                pokemonDto.base.Speed
            ))
        );
        return pokemons;
    }
}
