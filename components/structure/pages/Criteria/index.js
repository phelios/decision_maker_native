import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  ListItem,
  Text,
  Button,
  Right,
  Form,
  Item,
  Label,
  Input,
  Left,
} from 'native-base';
import {FlatList, Modal, View} from 'react-native';
import {flexStyle, mainStyle} from '../../../layout/style';

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
      .then(json => {
        setCriteria([...criteria, json]);
        closeModal();
      })
      .then(err => {
        console.log(err);
      });
  }

  function handleDelete(itemId) {
    let data = {
      method: 'DELETE',
    };
    return fetch(`https://dm-api.herokuapp.com/api/criteria/${itemId}`, data)
      .then(response => {
        setCriteria(
          criteria.filter(v => {
            return v.id !== itemId;
          }),
        );
        closeModal();
      })
      .then(err => {
        console.log(err);
      });
  }

  function handleUpdate(itemId) {
    const formData = {
      name: name,
      weight: weight,
    };

    let data = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch(`https://dm-api.herokuapp.com/api/criteria/${itemId}`, data)
      .then(response => {
        console.log(response);

        const idx = criteria.findIndex(i => i.id === itemId);
        criteria[idx] = {
          id: id,
          name: name,
          weight: weight,
        };
        setCriteria(criteria);
        closeModal();
      })
      .then(err => {
        console.log(err);
      });
  }

  function resetData() {
    setName(null);
    setWeight(null);
    setId(null);
  }

  function closeModal() {
    resetData();
    setModalVisible(false);
  }

  function renderEdit(item) {
    console.log(item);
    setModalVisible(true);
    setName(item.name);
    setWeight(item.weight.toString());
    setId(item.id);
  }

  async function fetchData() {
    const res = await fetch('https://dm-api.herokuapp.com/api/criteria/');
    res
      .json()
      .then(res => setCriteria(res))
      .then(err => console.log(err));
  }

  function renderRow(data) {
    const {item} = data;
    return (
      <ListItem onPress={() => renderEdit(item)}>
        <Left>
          <Text>{item.name}</Text>
        </Left>
        <Right>
          <Text>{item.weight}</Text>
        </Right>
      </ListItem>
    );
  }

  function renderModalButtons() {
    if (id) {
      return (
        <>
          <Button style={flexStyle.button} onPress={() => handleUpdate(id)}>
            <Text>Update</Text>
          </Button>
          <Button
            danger
            style={flexStyle.button}
            onPress={() => handleDelete(id)}>
            <Text>Delete</Text>
          </Button>
        </>
      );
    } else {
      return (
        <Button style={flexStyle.button} onPress={handleNew}>
          <Text>Add</Text>
        </Button>
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container style={mainStyle.container}>
      <Header>
        <Body>
          <Title>Criteria</Title>
        </Body>
      </Header>
      <FlatList
        data={criteria}
        renderItem={renderRow}
        keyExtractor={item => item.id.toString()}
      />
      <Button block onPress={() => setModalVisible(true)}>
        <Text>Add</Text>
      </Button>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Add Criteria</Title>
            </Body>
            <Right>
              <Button danger transparent onPress={() => closeModal()}>
                <Text>close</Text>
              </Button>
            </Right>
          </Header>
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
            <View style={flexStyle.rowFlex}>{renderModalButtons()}</View>
          </Content>
        </Container>
      </Modal>
    </Container>
  );
}
