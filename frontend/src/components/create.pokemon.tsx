import { Button, Checkbox, Col, Form, Input, InputNumber, PageHeader, Row } from 'antd';
import React from 'react';
import { Page } from './page';
import pokemonHttpService from '../services/pokemon-http.service';
import { PokemonCreateRequest } from '../models/pokemon';

export class CreatePokemon extends React.Component<{history: any}, {}> {
  constructor(props: any) {
    super(props);
    this.createPokemon = this.createPokemon.bind(this);
    this.displayError = this.displayError.bind(this);
  };

  private createPokemon(values: any): void {
    const pokemon = {name: values.name, type: values.type, stats: { HP: values.HP, attack: values.attack, defense: values.defense, specialAttack: values.specialAttack, specialDefense: values.specialDefense, speed: values.speed}} as PokemonCreateRequest;
    pokemonHttpService.createPokemon(pokemon).then(() => this.props.history.push('/pokemons'));
  }

  private displayError(): void {
    alert('Creating new Pokemon failed. Please fix all errors first.');
  }

  render() {
    return (
      <Page>
        <PageHeader onBack={() => this.props.history.push('/pokemons')} title='Create new Pokemon' />

        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={this.createPokemon}
          onFinishFailed={this.displayError}
          autoComplete='off'
          requiredMark={false} 
        >
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
                  <Input />
          </Form.Item>
            <Row>
              <Col span={24}>
              </Col>
            </Row>

          <Form.Item name='type' label='Type' rules={[{ required: true }]}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={6}>
                  <Checkbox value='Bug'>Bug</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Dragon'>Dragon</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Electric'>Electric</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Fairy'>Fairy</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Checkbox value='Fighting'>Fighting</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Fire'>Fire</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Flying'>Flying</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Ghost'>Ghost</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Checkbox value='Grass'>Grass</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Ground'>Ground</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Ice'>Ice</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Normal'>Normal</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Checkbox value='Poison'>Poison</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Psychic'>Psychic</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Rock'>Rock</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value='Steel'>Steel</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Checkbox value='Water'>Water</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Row>
            <Col span={12}>
            <Form.Item labelCol={{ span: 16 }} wrapperCol={{ span: 2 }} label='HP' name='HP' rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 2 }} label='Special Attack' name='specialAttack' rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item labelCol={{ span: 16 }} wrapperCol={{ span: 2 }} label='Attack' name='attack' rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 2 }} label='Special Defense' name='specialDefense' rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item labelCol={{ span: 16 }} wrapperCol={{ span: 2 }} label='Defense' name='defense' rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 2 }} label='Speed' name='speed' rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col flex='auto' style={{textAlign: 'center'}}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type='primary' htmlType='submit'>
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Page>
    );
  }
}