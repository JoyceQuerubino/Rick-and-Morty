import React, {useState, useEffect} from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { 
    CharacteresList,
    Container, 
    Content,
    Title,
   } from './styles';

import { BtnReturn } from '../../components/BtnReturn';
import { CharactereCard, CharacteresProps } from '../../components/CharactereCard';  

export interface CharactereCardProps extends CharacteresProps{}; 

export default function Favorites(){

    const navigation = useNavigation<any>(); 
    const [characters, setCharacters] = useState<CharactereCardProps[]>([]); 
    
    let convertStringValue = ''; 

    async function getIdArrayCharacters(){
        const response = await AsyncStorage.getItem('@rickmorty:idArray'); 
        if(response !== null){
            console.log('Possuí o array de ids salvos')
            convertStringValue = response; 
            fetchFavoritesCharacters(); 
        }
    }

    async function fetchFavoritesCharacters(){
        try {
          const result = await axios.get(`https://rickandmortyapi.com/api/character/${convertStringValue}`)
          const resultdata = result.data; 
      
              if(!resultdata)
                return console.log('não tem dado')
            
            if(resultdata.length > 1)
                setCharacters([...characters, ...resultdata])
            else 
                setCharacters(oldState => [ ...oldState, resultdata ])
    
        } catch(error){
            console.log(error)
        }
    }

    function handleSelectedCharacterPage(pagCharacters: CharactereCardProps){
        navigation.navigate('Characters', {pagCharacters})
    }

    useEffect(() => {
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
                    renderItem={({item }) => (
                        <CharactereCard 
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