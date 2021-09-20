import React, {useEffect, useState} from 'react';
import { CharactereCard } from '../../components/CharactereCard';  
import axios from 'axios'; 

interface CharactereCardProps {
  id: string;
  name: string;
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
  Subtitle, 
  CharacteresList
 } from './styles';
import { Text } from 'react-native';


export default function Home(){

  const [ teste, setTeste] = useState<CharactereCardProps[]>([]); 
  const [page, setPage] = useState(1); 

  async function fetchPlants(){
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
    fetchPlants(); //chama a função que carrega os dados da api
}

  useEffect(() => {
    fetchPlants(); 
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
          data={teste}
          // keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => {
            return(
              <>
                <Text key={item.id} style={[{color: '#FFF'}, {fontSize: 24}]}>{item.name}</Text>
              </>
              )
          }}
          onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
        />
    </Container>
  )
}
