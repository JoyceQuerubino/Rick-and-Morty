import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import { ActivityIndicator, Alert, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CharactereCard, CharacteresProps } from '../../components/CharactereCard';  
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

export interface CharactereCardProps extends CharacteresProps{}; 

export default function Home(){

  const nevigation = useNavigation(); 

  const [characters, setCharacters] = useState<CharactereCardProps[]>([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [loadingApi, setLoadingApi] = useState(true); 

  const [ searchName, setSearchName] = useState(''); 

  function handleStart(pagCharacters: CharactereCardProps){
    nevigation.navigate('Personagens', {pagCharacters})
  }

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
      setPage(page + 1); 
  }

  function handleInputChange(value: string){
    setSearchName(value)
  }

  function filterResultByCharName(){
    if(searchName){
      return characters.filter(character => character.name.includes(searchName));
    }
    return characters
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
            value={searchName}
            placeholder="Digite o nome do personagem"
            placeholderTextColor="#7A7A7A" 
            onChangeText={handleInputChange}
          />
          <InputButton
          >
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
          data={filterResultByCharName()}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={50}
          renderItem={({item, index}) => (
              <CharactereCard 
                key={item.id.toString()} 
                data={item}
                onPress={() => handleStart(item)}
              />
            )}
          numColumns={2} 
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={handleFetchMore}
          ListFooterComponent={
            loading ?
            <ActivityIndicator color={'green'}/>
            : <></>  
          }
      />
    </Container>
  )
}
