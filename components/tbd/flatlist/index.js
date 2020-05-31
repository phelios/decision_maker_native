import {FlatList, Modal, View} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Input,
  Item,
  Label,
  Left,
  ListItem,
  Right,
  Text,
  Title,
} from 'native-base';
import React, {useState} from 'react';
import {flexStyle} from '../../layout/style';

export default function CrudView(props) {
  const {fields, displayFields, data} = props;

  const [modalVisible, setModalVisible] = useState(false);

  const initData = fields.reduce((obj, val) => {
    obj[val] = null;
    return obj;
  }, {});

  const [formData, setFormData] = useState(initData);

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

  function resetData() {
    setFormData(initData);
  }

  function closeModal() {
    resetData();
    setModalVisible(false);
  }

  function updateFormData(fieldName, text) {
    setFormData({...formData, [fieldName]: text});
  }

  // function renderModalButtons() {
  //   if (tid) {
  //     return (
  //       <>
  //         <Button style={flexStyle.button} onPress={() => handleUpdate(tid)}>
  //           <Text>Update</Text>
  //         </Button>
  //         <Button
  //           danger
  //           style={flexStyle.button}
  //           onPress={() => handleDelete(tid)}>
  //           <Text>Delete</Text>
  //         </Button>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <Button style={flexStyle.button} onPress={handleNew}>
  //         <Text>Add</Text>
  //       </Button>
  //     );
  //   }
  // }

  return (
    <>
      <FlatList
        data={data}
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
              {fields.map(field => (
                <Item stackedLabel key={field}>
                  <Label>{field}</Label>
                  <Input
                    value={formData[field]}
                    onChangeText={t => updateFormData(field, t)}
                  />
                </Item>
              ))}
            </Form>
            {/*<View style={flexStyle.rowFlex}>{renderModalButtons()}</View>*/}
          </Content>
        </Container>
      </Modal>
    </>
  );
}
