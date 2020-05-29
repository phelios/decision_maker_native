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
} from 'native-base';
import {Modal, View} from 'react-native';
import {flex} from '../../../layout/style';

export default function Criteria() {
  const [criteria, setCriteria] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function fetchData() {
    const res = await fetch('https://dm-api.herokuapp.com/api/criteria/');
    res
      .json()
      .then(res => setCriteria(res))
      .then(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  });

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
            <Text>Hello World!</Text>
            <View style={flex.rowFlex}>
              <Button
                style={flex.button}
                danger
                onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </Button>
              <Button style={flex.button}>
                <Text>Add</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Modal>
    </Container>
  );
}
