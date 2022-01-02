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