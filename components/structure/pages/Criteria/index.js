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
import {Modal, View} from 'react-native';
import {flexStyle, mainStyle} from '../../../layout/style';
import CrudView from '../../../tbd/flatlist';

export default function Criteria() {
  const [criteria, setCriteria] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function handleNew() {
    const formData = {
      name: tname,
      weight: tweight,
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
      name: tname,
      weight: tweight,
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
          id: tid,
          name: tname,
          weight: tweight,
        };
        setCriteria(criteria);
        closeModal();
      })
      .then(err => {
        console.log(err);
      });
  }

  async function fetchData() {
    const res = await fetch('https://dm-api.herokuapp.com/api/criteria/');
    res
      .json()
      .then(res => setCriteria(res))
      .then(err => console.log(err));
  }

  // function renderRow(data) {
  //   const {item} = data;
  //   return (
  //     <ListItem onPress={() => renderEdit(item)}>
  //       <Left>
  //         <Text>{item.name}</Text>
  //       </Left>
  //       <Right>
  //         <Text>{item.weight}</Text>
  //       </Right>
  //     </ListItem>
  //   );
  // }

  useEffect(() => {
    fetchData();
  }, []);

  const [name, weight] = ['name', 'weight'];

  const fields = [name, weight];
  const listDisplays = {
    left: name,
    right: weight,
  };

  return (
    <Container style={mainStyle.container}>
      <Header>
        <Body>
          <Title>Criteria</Title>
        </Body>
      </Header>
      <CrudView data={criteria} displayFields={listDisplays} fields={fields} />
    </Container>
  );
}
