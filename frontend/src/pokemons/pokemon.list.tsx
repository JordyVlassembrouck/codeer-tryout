import React from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/page";
import { Table } from "antd";
import { Pokemon } from "../models/pokemon";
import { PokemonTypeTag } from "./pokemon-type.tag";

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
          this.setState({
            pokemons: result,
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
        width: 100
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (name: string, pokemon: Pokemon) => <Link to={`pokemons/${pokemon.id}`}>{name}</Link>
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (types: string[]) => {
          const tags = types.map((type: string) => <PokemonTypeTag type={type} key={type} />);
          return tags;
        }
      }
    ];

    return (
      <Page>
        {loadingIndicator}
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 60 }} rowKey="id"/>;
      </Page>
    );
  }
}
