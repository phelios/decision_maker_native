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
  Spinner,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {flexStyle} from '../../layout/style';

export default function CrudView(props) {
  const {fields, displayFields, url} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);

  const initData = fields.reduce((obj, val) => {
    obj[val] = '';
    return obj;
  }, {});

  const [formData, setFormData] = useState(initData);

  function renderEdit(item) {
    setModalVisible(true);
    setFormData(item);
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

  function _fetch(_url, data, handler) {
    setIsLoading(true);
    fetch(_url, data)
      .then(r => {
        handler(r);
        closeModal();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleNew() {
    let data = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    _fetch(url, data, r => {
      r.json().then(newData => setListData([...listData, newData]));
    });
  }

  function handleDelete() {
    let data = {
      method: 'DELETE',
    };
    _fetch(`${url}${formData.id}`, data, r => {
      setListData(
        listData.filter(v => {
          return v.id !== formData.id;
        }),
      );
    });
  }

  function handleUpdate() {
    let data = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    _fetch(`${url}${formData.id}`, data, r => {
      const idx = listData.findIndex(i => i.id === formData.id);
      listData[idx] = formData;
      setListData(listData);
    });
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    _fetch(url, {}, r => {
      r.json().then(json => setListData(json));
    });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  function RenderSpinner() {
    if (isLoading) {
      return <Spinner color="black" />;
    } else {
      return null;
    }
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

  function renderModalButtons() {
    if (formData.id) {
      return (
        <>
          <Button style={flexStyle.button} onPress={handleUpdate}>
            <Text>Update</Text>
          </Button>
          <Button danger style={flexStyle.button} onPress={handleDelete}>
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

  return (
    <>
      <RenderSpinner />
      <FlatList
        data={listData}
        renderItem={renderRow}
        keyExtractor={item => item.id.toString()}
      />
      <Button block onPress={() => setModalVisible(true)}>
        <Text>Add</Text>
      </Button>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Container>
          <Header>
            <Left>
              <RenderSpinner />
            </Left>
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
                  <Label style={flexStyle.label}>{field}</Label>
                  <Input
                    value={formData[field].toString()}
                    onChangeText={t => updateFormData(field, t)}
                  />
                </Item>
              ))}
            </Form>
            <View style={flexStyle.rowFlex}>{renderModalButtons()}</View>
          </Content>
        </Container>
      </Modal>
    </>
  );
}
