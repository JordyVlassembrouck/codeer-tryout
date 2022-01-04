export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  stats: PokemonStats;
}

interface PokemonStats {
  HP: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonListView {
  id: number;
  name: string;
  type: string[];
}

export interface PokemonCreateRequest {
  name: string;
  type: string[];
  stats: PokemonStats;
}