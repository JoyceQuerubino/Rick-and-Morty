import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import { CharactereCard, CharacteresProps } from '../../components/CharactereCard';  

export interface CharactereCardProps extends CharacteresProps{}; 

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
import { isLoading } from 'expo-font';


export default function Home(){

  const [ characters, setCharacters] = useState<CharactereCardProps[]>([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 

  async function fetchCharacters(){
    try {
      setLoading(true)
      const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      const resultdata = result.data.results; 
      console.log(page)
  
          if(!resultdata)
          return console.log('nada') 
          setCharacters([...characters, ...resultdata])
    } catch(error){
        console.log(error)
    } finally{
      setLoading(false)
    }
  }

  function handleFetchMore(){
    setPage(page + 1); //vai virar página 2
    // fetchCharacters();
}

  useEffect(() => {
    fetchCharacters(); 
  }, [page])

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
            alignItems: 'center', 
            marginBottom: 24
          }}
          
          keyExtractor={item => item.id}
          data={characters}
          renderItem={({item}) => (<CharactereCard 
            data={item}
        />)}
          numColumns={2} //mostrar a lista em 2 colunas
          showsVerticalScrollIndicator={false} // remover scroll 
          onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela
          onEndReached={handleFetchMore}
        />
    </Container>
  )
}
