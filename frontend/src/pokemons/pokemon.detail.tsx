import React from 'react';
import { Page } from '../components/page';
import axios from 'axios';
import { Pokemon } from '../models/pokemon';
import { PokemonTypeTag } from './pokemon-type.tag';


export class PokemonDetail extends React.Component<{}, {id: string, pokemon: Pokemon | null, isLoaded: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {id: props.match.params.id, pokemon: null, isLoaded: false}
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/pokemons/${this.state.id}`)
      .then(
        (result) => {
          this.setState({
            pokemon: result.data,
            isLoaded: true
          });
        },
        (error) => {
          console.error('An error has occured while fetching Pokemons:', error);
          this.setState({
            isLoaded: true
          });
        }
      )
  }

  render() {
    let pokemonDetails;

    if (this.state.pokemon) {
      const pokemon = this.state.pokemon;

      const typeTags = pokemon.type.map((type: string) => <PokemonTypeTag type={type} key={type} />);
      
      pokemonDetails = (
        <div>
          <h1>{pokemon.name} {typeTags}</h1>
          <p><b>HP</b>: {pokemon.stats.HP}</p>
          <p><b>Attack</b>: {pokemon.stats.attack}</p>
          <p><b>Defense</b>: {pokemon.stats.defense}</p>
          <p><b>Speed</b>: {pokemon.stats.speed}</p>
          <p><b>Special Attack</b>: {pokemon.stats.specialAttack}</p>
          <p><b>Special Defense</b>: {pokemon.stats.specialDefense}</p>
        </div>
      );
    }


    return (
      <Page>
        {pokemonDetails}
      </Page>
    );
  }
}