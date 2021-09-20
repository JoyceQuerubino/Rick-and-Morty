import React, {useEffect, useState} from 'react';
import axios from 'axios'; 

import { View} from 'react-native';
import { CharactereCard, CharacteresProps } from '../../components/CharactereCard';  

interface CharactereCardProps extends CharacteresProps{}; 

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
  Subtitle, 
  CharacteresList
 } from './styles';


export default function Home(){

  const [ teste, setTeste] = useState<CharactereCardProps[]>([]); 
  const [page, setPage] = useState(1); 

  async function fetchCharacters(){
   axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      setTeste(response.data.results)
        
        if(page > 1){
          setTeste(oldValue => [...oldValue, ...response.data.results]);
        }  else{
          setTeste(response.data.results);
        }
    })
    .catch(() => {
      console.log("Error")
    })
  }

  function handleFetchMore(distance:number){
    if(distance < 1)
        return; 
    setPage(oldValue => oldValue + 1); //vai virar página 2
    fetchCharacters(); //chama a função que carrega os dados da api
}

  useEffect(() => {
    fetchCharacters(); 
  }, [])

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

        <CharacteresList
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 8, 
            marginBottom: 24
          }}
          
          keyExtractor={item => "_" + item.id}
          data={teste}
          renderItem={({item}) => (
            <CharactereCard 
                data={item}
            />
          )}
          numColumns={2} //mostrar a lista em 2 colunas
          showsVerticalScrollIndicator={false} // remover scroll 
          onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
        />
    </Container>
  )
}
