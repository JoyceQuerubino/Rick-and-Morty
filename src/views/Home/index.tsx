import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Container, 
  Header,
  Title,
  FavoriteButton, 
  IconFavorite,
  InputContainer,
  Input,
 } from './styles';

import exampleSlice from '../../redux/reducers/example';


const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>
        <Title>Rick and Morty</Title>
        <FavoriteButton>
          <IconFavorite name="star"/>
        </FavoriteButton>
      </Header>
        <InputContainer>
          <Input 
            placeholder="Digite o nome do personagem"
          />
          {/* <InputButton></InputButton> */}
        </InputContainer>
    </Container>
  )
}

export default Home;
