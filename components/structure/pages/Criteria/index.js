import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Right,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {Modal, View} from 'react-native';
import {flex} from '../../../layout/style';

export default function Criteria() {
  const [criteria, setCriteria] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [id, setId] = useState(null);

  function handleNew() {
    const formData = {
      name: name,
      weight: weight,
    };

    let data = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch('https://dm-api.herokuapp.com/api/criteria/', data)
      .then(response => response.json()) // promise
      .then(json => setId(json.id));
  }

  async function fetchData() {
    const res = await fetch('https://dm-api.herokuapp.com/api/criteria/');
    res
      .json()
      .then(res => setCriteria(res))
      .then(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <Body>
          <Title>Criteria</Title>
        </Body>
      </Header>
      <Content padder>
        <List>
          {criteria.map(item => (
            <ListItem key={item.id}>
              <Body>
                <Text>{item.name}</Text>
              </Body>
              <Right>
                <Text>{item.weight}</Text>
              </Right>
            </ListItem>
          ))}
          <Button block onPress={() => setModalVisible(true)}>
            <Text>Add</Text>
          </Button>
        </List>
      </Content>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Container>
          <Content padder>
            <Form>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input value={name} onChangeText={t => setName(t)} />
              </Item>
              <Item stackedLabel>
                <Label>Weight</Label>
                <Input value={weight} onChangeText={t => setWeight(t)} />
              </Item>
            </Form>
            <View style={flex.rowFlex}>
              <Button
                style={flex.button}
                danger
                onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </Button>
              <Button style={flex.button} onPress={handleNew}>
                <Text>Add</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Modal>
    </Container>
  );
}
