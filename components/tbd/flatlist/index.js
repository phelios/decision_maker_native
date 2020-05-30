import {FlatList} from 'react-native';
import {Container, Left, ListItem, Right, Text} from 'native-base';
import React, {useState} from 'react';

export default function RestFlatList(props) {

  const {fields, displayFields, data} = props;

  const [modalVisible, setModalVisible] = useState(false);

  function renderEdit(item) {
    console.log(item);
    setModalVisible(true);
    // setName(item.name);
    // setWeight(item.weight.toString());
    // setId(item.id);
  }

  function renderRow(data) {
    const {item} = data;
    return (
      <ListItem onPress={() => renderEdit(item)}>
        <Left>
          <Text>{item[displayFields.left]}</Text>
        </Left>
        <Right>
          <Text>{item[displayFields.right]}</Text>
        </Right>
      </ListItem>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderRow}
      keyExtractor={item => item.id.toString()}
    />
  );
}
