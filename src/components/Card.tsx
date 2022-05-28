import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  color: string;
}

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 290px;
  background-color: #c4b2a9;
  border-radius: 4px;
  padding: 1px;
  margin: 1px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Content = styled(View)`
  align-self: center;
`;
const Card = ({ children, color = '#ff867c' }: Props) => (
  <Container color={color}>
    <Content>
      {children}
    </Content>
  </Container>
);

export default Card;