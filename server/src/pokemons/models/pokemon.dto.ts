class PokemonBase {
    public HP: number;
    public Attack: number;
    public Defense: number;
    public 'Sp. Attack': number;
    public 'Sp. Defense': number;
    public 'Speed': number;
}

export class PokemonDto {
    public id: number;
    public name: string;
    public type: string[];
    public base: PokemonBase;
}
