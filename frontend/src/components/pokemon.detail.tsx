import React from 'react';
import { Page } from '../components/page';
import { Pokemon } from '../models/pokemon';
import { PokemonTypeTag } from './pokemon-type.tag';
import { Button, Col, PageHeader, Progress, Row, Statistic } from 'antd';
import pokemonHttpService from '../services/pokemon-http.service';

export class PokemonDetail extends React.Component<{history: any}, {id: number, pokemon: Pokemon | null, pokemonSprite: any, detailsLoaded: boolean, spriteLoaded: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {id: parseInt(props.match.params.id, 10), pokemon: null, pokemonSprite: null, detailsLoaded: false, spriteLoaded: false}
    this.deletePokemon = this.deletePokemon.bind(this);
    this.getProgressColor = this.getProgressColor.bind(this);
  };

  componentDidMount() {
    this.getPokemonDetails(this.state.id);
  }

  private getPokemonDetails(id: number): void {
    pokemonHttpService.getPokemonDetails(id).then((pokemon: Pokemon) => this.setState({
      pokemon: pokemon,
      detailsLoaded: true
    }));
  }

  private deletePokemon(id: number): void {
    pokemonHttpService.deletePokemon(id).then(() => this.props.history.push('/pokemons'));
  }

  private getProgressColor(percentage: number): string {
    const RED = '#ff4d4f';
    const ORANGE = '#faad14';
    const GREEN = '#52c41a';

    if (percentage < 30) {
      return RED;
    } else if (percentage < 70) {
      return ORANGE;
    } else {
      return GREEN;
    }
  }

  render() {
    let detailsLoadingIndicator;
    if (!this.state.detailsLoaded) {
      detailsLoadingIndicator = <span>Details loading...</span>;
    }

    let pageHeader;
    let pokemonDetails;

    if (this.state.pokemon) {
      pageHeader = (<PageHeader onBack={() => this.props.history.push('/pokemons')} title={`Details of ${this.state.pokemon?.name}`} />)

      const pokemon = this.state.pokemon;
      const typeTags = pokemon.type.map((type: string) => <PokemonTypeTag type={type} key={type} />);

      const TOP_5_HP = 130;
      const TOP_5_ATTACK = 130;
      const TOP_5_DEFENSE = 120;
      const TOP_5_SPECIAL_ATTACK = 125;
      const TOP_5_SPECIAL_DEFENSE = 110;
      const TOP_5_SPEED = 120;

      const hpPercentage = pokemon.stats.HP / TOP_5_HP * 100;
      const attackPercentage = pokemon.stats.attack / TOP_5_ATTACK * 100;
      const defensePercentage = pokemon.stats.defense / TOP_5_DEFENSE * 100;
      const specialAttackPercentage = pokemon.stats.specialAttack / TOP_5_SPECIAL_ATTACK * 100;
      const specialDefensePercentage = pokemon.stats.specialDefense / TOP_5_SPECIAL_DEFENSE * 100;
      const speedPercentage = pokemon.stats.speed / TOP_5_SPEED * 100;
      
      pokemonDetails = (
        <div>
          <Row>
            <Col flex='auto' style={{textAlign: 'center'}}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`} alt='PokemonSprite'/></Col>
          </Row>
          <Row>
            <Col flex='auto' style={{textAlign: 'center'}}><h1><b>{pokemon.name}</b></h1></Col>
          </Row>
          <Row>
            <Col flex='auto' style={{textAlign: 'center'}}><h1>{typeTags}</h1></Col>
          </Row>
          <Row>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='HP' value={pokemon.stats.HP} />
              <Progress percent={hpPercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(hpPercentage)} />
            </Col>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='Special Attack' value={pokemon.stats.specialAttack} />
              <Progress percent={specialAttackPercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(specialAttackPercentage)} />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='Attack' value={pokemon.stats.attack} />
              <Progress percent={attackPercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(attackPercentage)} />
            </Col>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='Special Defense' value={pokemon.stats.specialDefense} />
              <Progress percent={specialDefensePercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(specialDefensePercentage)} />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='Defense' value={pokemon.stats.defense} />
              <Progress percent={defensePercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(defensePercentage)} />
            </Col>
            <Col span={12} style={{textAlign: 'center'}}>
              <Statistic title='Speed' value={pokemon.stats.speed} />
              <Progress percent={speedPercentage} steps={5} showInfo={false} strokeColor={this.getProgressColor(speedPercentage)} />
            </Col>
          </Row>
          <Row>
            <Col flex='auto' style={{textAlign: 'center'}}>
                <Button onClick={() => this.deletePokemon(pokemon.id)} type='primary' shape='round' danger style={{top: '150px'}}>Delete</Button>
            </Col>
          </Row>
        </div>
      );
    }


    return (
      <Page>
        {pageHeader}
        {detailsLoadingIndicator}
        {pokemonDetails}
      </Page>
    );
  }
}