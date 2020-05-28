import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
} from 'native-base';
import React from 'react';

const sample_data = [
  {
    id: 1,
    name: 'Close to city',
    weight: 60,
  },
  {
    id: 2,
    name: 'No front porch',
    weight: 40,
  },
];

export default function CriteriaSet() {
  return (
    <Container>
      <Header />
      <Content>
        <List>
          {sample_data.map(item => (
            <ListItem key={item.id}>
              <Body>
                <Text>{item.name}</Text>
              </Body>
              <Right>
                <Text>{item.weight}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
