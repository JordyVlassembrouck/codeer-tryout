export class PokemonCreateJsonRequest {
  public name: string;
  public type: string[];
  public stats: PokemonStatsCreateJsonRequest;

  constructor(name: string, type: string[], HP: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
    this.name = name;
    this.type = type;
    this.stats = new PokemonStatsCreateJsonRequest(HP, attack, defense, specialAttack, specialDefense, speed);    
  }
}

class PokemonStatsCreateJsonRequest {
  public HP: number;
  public attack: number;
  public defense: number;
  public specialAttack: number;
  public specialDefense: number;
  public speed: number;

  constructor(HP: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
    this.HP = HP;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }
}