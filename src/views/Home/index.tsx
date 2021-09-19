import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCharacteres } from '../../redux/actions/characteres';
import { CharactereCard } from '../../components/CharactereCard';  

interface CharactereCardProps {
  id: string;
  character: string;
}

// import exampleSlice from '../../store/reducers/example';
import { 
  Container, 
  Header,
  Title,
  FavoriteButton, 
  IconFavorite,
  InputContainer,
  Input,
  InputButton, 
  IconSearch, 
  Subtitle
 } from './styles';
import { Text } from 'react-native';


export default function Home(){

  const dispatch = useDispatch();
  const characteres = useSelector((state) => state.characteres.characteres);
  const loading = useSelector((state) => state.characteres.loading);
  const error = useSelector((state) => state.characteres.error);

  useEffect(() => {
    dispatch(getCharacteres());
}, []); 


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
            placeholderTextColor="#7A7A7A" 
          />
          <InputButton>
            <IconSearch name="search" />
          </InputButton>
        </InputContainer>
        <Subtitle>Personagens</Subtitle>

        {characteres.loading && <Text>Loading...</Text>}

        {characteres.length > 0 && characteres.map((characteres) => (
          <CharactereCard character={characteres.character} key={characteres.id}/>
        ))}

        {characteres.length === 0 && !loading && <Text>Nenhum dado carregado</Text>}
        {error && !loading && <Text>{error}</Text>}

    </Container>
  )
}
