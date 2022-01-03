import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/page';
import { Button, Table } from 'antd';
import { PokemonListView } from '../models/pokemon';
import { PokemonTypeTag } from './pokemon-type.tag';
import { DeleteOutlined } from '@ant-design/icons';
import pokemonHttpService from '../services/pokemon-http.service';

export class PokemonList extends React.Component<{}, {pokemons: PokemonListView[], isLoaded: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {pokemons: [], isLoaded: false};
    this.deletePokemon = this.deletePokemon.bind(this);
  }

  componentDidMount() {
    this.getAllPokemon();
  }

  private getAllPokemon() {
    pokemonHttpService.getAllPokemon().then((pokemons: PokemonListView[]) => this.setState({
      pokemons: pokemons,
      isLoaded: true
    }));
  }

  private deletePokemon(id: number): void {
    pokemonHttpService.deletePokemon(id).then(() => this.getAllPokemon());
  }

  render() {
    let loadingIndicator;
    if (!this.state.isLoaded) {
      loadingIndicator = <span>Loading...</span>;
    }

    const dataSource = this.state.pokemons;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (name: string, pokemon: PokemonListView) => <Link to={`/pokemons/${pokemon.id}` }>{name}</Link>
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (types: string[]) => {
          const tags = types.map((type: string) => <PokemonTypeTag type={type} key={type} />);
          return tags;
        }
      },
      {
        title: 'Actions',
        width: 50,
        render: (pokemon: PokemonListView) => {
          return <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => this.deletePokemon(pokemon.id)}></Button>
        }
      }
    ];

    return (
      <Page>
        {loadingIndicator}
        <Table dataSource={dataSource} columns={columns} rowKey='id'/>;
      </Page>
    );
  }
}
