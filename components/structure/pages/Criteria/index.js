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
import CrudView from '../../../tbd/CrudView';

export default function Criteria() {
  const [criteria, setCriteria] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);



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
      <CrudView
        displayFields={listDisplays}
        fields={fields}
        url={'https://dm-api.herokuapp.com/api/criteria/'}
      />
    </Container>
  );
}
