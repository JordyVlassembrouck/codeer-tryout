import { Button, Checkbox, Col, Form, Input, PageHeader, Row } from 'antd';
import React from 'react';
import { Page } from './page';

export class CreatePokemon extends React.Component<{history: any}, {}> {
  constructor(props: any) {
    super(props);
  };

  render() {

    return (
      <Page>
        <PageHeader onBack={() => this.props.history.push('/pokemons')} title='Create new Pokemon' />

        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark={false}
        >
          <Form.Item label='Name' required>
            <Input />
          </Form.Item>

          <Row>
            <Col span={6} offset={6}>
              <Form.Item label='HP' required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='HP' required>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6} offset={6}>
            <Form.Item label='HP' required>
              <Input />
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='Special Attack' required>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
            <Form.Item label='Attack' required>
              <Input />
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='Special Defense' required>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>
            <Form.Item label='Defense' required>
              <Input />
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='Speed' required>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Page>
    );
  }
}