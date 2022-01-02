import React from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/page";
import { Table } from "antd";
import { Pokemon } from "../models/pokemon";

export class PokemonList extends React.Component<{}, {pokemons: Pokemon[], isLoaded: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {pokemons: [], isLoaded: false};
  }

  componentDidMount() {
    fetch("http://localhost:4000/pokemons")
      .then(response => response.json())
      .then(
        (result) => {
          const pokemons: Pokemon[] = [];
          result.forEach((pokemon: Pokemon) => pokemons.push(pokemon));

          this.setState({
            pokemons: pokemons,
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
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string, pokemon: Pokemon) => <Link to={`pokemons/${pokemon.id}`}>{name}</Link>
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      }
    ];;

    return (
      <Page>
        {loadingIndicator}
        <Table dataSource={dataSource} columns={columns} rowKey="id" />;
      </Page>
    );
  }
}
