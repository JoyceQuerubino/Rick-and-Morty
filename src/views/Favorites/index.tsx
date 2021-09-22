import React, {useState, useEffect} from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { 
    Container, 
    Title,
    Content,
    CharacteresList,
   } from './styles';
import { BtnReturn } from '../../components/BtnReturn';
import { CharactereCard, CharacteresProps } from '../../components/CharactereCard';  

export interface CharactereCardProps extends CharacteresProps{}; 

export default function Favorites(){

    const navigation = useNavigation(); 
    const [characters, setCharacters] = useState<CharactereCardProps[]>([]); 
    let arrayFavorites: Array<string> = [];
    let convertStringValue = ''; 

    async function getIdArrayCharacters(){
        const response = await AsyncStorage.getItem('@rickmorty:idArray'); 
        if(response !== null){
            console.log('Possuí o array de ids salvos')
            setIdCharacter(response);
        }
    }

    async function getIdCharacter(){
        const response = await AsyncStorage.getItem('@rickmorty:id'); 
        if(response !== null){
            console.log('Possuí id salvo')
            setIdCharacter(response);
        }
    }

    function setIdCharacter(id: string){
        const validacao = arrayFavorites.filter( valor => valor === id)

        if(validacao.length == 0){
            arrayFavorites.push(id)

            convertStringValue = arrayFavorites.toString();
            async function setIdArrayCharacterAsyncStorage(){
                await AsyncStorage.setItem('@rickmorty:idArray', convertStringValue); 
                console.log('Valor convertido salvo')
            }
        
            setIdArrayCharacterAsyncStorage(); 
            console.log(`O array é esse aqui ${convertStringValue}`)

            fetchFavoritesCharacters(); 

            return convertStringValue

        } else {
            console.log('Esse valor já existe no array')
        }
    }

    async function fetchFavoritesCharacters(){
        try {
          const result = await axios.get(`https://rickandmortyapi.com/api/character/${convertStringValue}`)
          const resultdata = result.data; 
      
              if(!resultdata)
                return console.log('não tem dado')
    
              setCharacters([...characters, ...resultdata])
    
        } catch(error){
            console.log(error)
        }
    }

    function handleSelectedCharacterPage(pagCharacters: CharactereCardProps){
        navigation.navigate('Characters', {pagCharacters})
    }

    useEffect(() => {
        getIdCharacter();
        getIdArrayCharacters(); 
    }, [])

    return(
        <Container>
            <BtnReturn
                title='Voltar'
            />
            <Content>
                <Title>Favorites</Title>
                <CharacteresList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center', 
                        marginBottom: 24, 
                    }}
                    keyExtractor={(item) => String(item.id)}
                    data={characters}
                    initialNumToRender={4}
                    maxToRenderPerBatch={8}
                    updateCellsBatchingPeriod={50}
                    renderItem={({item, index}) => (
                        <CharactereCard 
                            key={item.id.toString()} 
                            data={item}
                            onPress={() => handleSelectedCharacterPage(item)}
                        />
                        )}
                    numColumns={2} 
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
             </Content>
        </Container>
    )
}