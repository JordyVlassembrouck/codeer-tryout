export class Pokemon {
  public id: number;
  public name: string;
  public type: string[];
  public stats: PokemonStats;

  constructor(id: number, name: string, type: string[], HP: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stats = new PokemonStats(HP, attack, defense, specialAttack, specialDefense, speed);    
  }
}

class PokemonStats {
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

export class PokemonListView {
  public id: number;
  public name: string;
  public type: string[];

  constructor(id: number, name: string, type: string[]) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}