import { Injectable } from '@nestjs/common';
import * as pokemonJson from '../data/pokemons.json';
import { Pokemon } from '../models/pokemon';
import { PokemonDto } from '../models/pokemon.dto';
import { PokemonNotFoundException } from './pokemon-not-found.exception';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class PokemonRepository {
    private pokemonDtos: PokemonDto[];

    constructor() {
        this.pokemonDtos = pokemonJson;
    }

    createNewPokemon(pokemon: Pokemon): PokemonDto {
        const filePath = resolve(__dirname, '../data/pokemons.json');
        const fileExists = existsSync(filePath);

        if (!fileExists) {
            console.error('[SERVER ERROR] Data file does not exist');
            throw new Error('[SERVER ERROR] Data file does not exist');
        } else {
            try {
                const lastPokemonId = this.pokemonDtos[this.pokemonDtos.length - 1].id;
                pokemon.id = lastPokemonId + 1;
                const newPokemonDto = this.createPokemonDtoFrom(pokemon);

                this.pokemonDtos.push(newPokemonDto);

                writeFileSync(filePath, JSON.stringify(this.pokemonDtos));
                this.pokemonDtos = JSON.parse(readFileSync(filePath).toString());

                return newPokemonDto;
            } catch (error) {
                console.error('[SERVER ERROR] Encountered an error while writing pokemon data');
                throw error;
            }
        }
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

    deletePokemon(id: number): void {
        const remainingPokemons = this.pokemonDtos.filter((pokemonDto: PokemonDto) => pokemonDto.id !== id);

        const filePath = resolve(__dirname, '../data/pokemons.json');
        const fileExists = existsSync(filePath);

        if (!fileExists) {
            console.error('[SERVER ERROR] Data file does not exist');
            throw new Error('[SERVER ERROR] Data file does not exist');
        } else {
            try {
                writeFileSync(filePath, JSON.stringify(remainingPokemons));
                this.pokemonDtos = JSON.parse(readFileSync(filePath).toString());
            } catch (error) {
                console.error('[SERVER ERROR] Encountered an error while reading/writing pokemon data');
                throw error;
            }
        }
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

    private createPokemonDtoFrom(pokemon: Pokemon): PokemonDto {
        return new PokemonDto(
            pokemon.id,
            pokemon.name,
            pokemon.type,
            pokemon.stats.HP,
            pokemon.stats.attack,
            pokemon.stats.defense,
            pokemon.stats.specialAttack,
            pokemon.stats.specialDefense,
            pokemon.stats.speed
        );
    }
}
