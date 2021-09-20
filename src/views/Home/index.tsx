import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import { ActivityIndicator} from 'react-native';
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
import { Loading } from '../../components/Loading';

export default function Home(){

  const [ characters, setCharacters] = useState<CharactereCardProps[]>([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [loadingApi, setLoadingApi] = useState(true); 

  async function fetchCharacters(){
    try {
      setLoading(true); 
      const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      const resultdata = result.data.results; 
  
          if(!resultdata)
            return setLoadingApi(true)

          setCharacters([...characters, ...resultdata])
          setLoadingApi(false)

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

  if(loadingApi)
        return <Loading />

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
          
          keyExtractor={(item) => String(item.id)}
          data={characters}
          renderItem={({item, index}) => (<CharactereCard key={item.id.toString()} 
            data={item}
        />)}
          numColumns={2} //mostrar a lista em 2 colunas
          showsVerticalScrollIndicator={false} // remover scroll 
          onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela
          onEndReached={handleFetchMore}
          ListFooterComponent={
            //aparecer só quando o LoadingMore for verdadeiro
            loading ?
            <ActivityIndicator color={'green'}/>
            : <></> //quando não tiver mais nada, carregue i disfragmente que é nada. 
        }
        />
    </Container>
  )
}
