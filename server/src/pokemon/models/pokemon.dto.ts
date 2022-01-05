class PokemonBase {
    public HP: number;
    public Attack: number;
    public Defense: number;
    public 'Sp. Attack': number;
    public 'Sp. Defense': number;
    public 'Speed': number;

    constructor(HP: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
        this.HP = HP;
        this.Attack = attack;
        this.Defense = defense;
        this['Sp. Attack'] = specialAttack;
        this['Sp. Defense'] = specialDefense;
        this['Speed'] = speed;
      }
}

export class PokemonDto {
    public id: number;
    public name: string;
    public type: string[];
    public base: PokemonBase;

    constructor(id: number, name: string, type: string[], HP: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.base = new PokemonBase(HP, attack, defense, specialAttack, specialDefense, speed);    
      }
}
