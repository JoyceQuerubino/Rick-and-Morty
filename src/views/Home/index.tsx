import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Title, ClickMeButton } from './styles';

import exampleSlice from '../../redux/reducers/example';


const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <ClickMeButton onPress={() => dispatch(exampleSlice.actions.execute())}>
        <Title>Click me!</Title>
      </ClickMeButton>
    </Container>
  )
}

export default Home;
