import React, {useState, useEffect} from 'react'; 
import { useRoute } from '@react-navigation/core'; //para recuperar valores passados pela rota
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 

import { 
    BtnFavorite,
    Container, 
    Description,
    EpisodeContainer, 
    EpisodesList,
    FavoriteContainer,
    Header,
    IconFavorite, 
    Image, 
    Section,
    SubTitle, 
    Text, 
    Title, 
    Topic,
    TopicEpisode,
    TopicsContainer, 
} from './styles';
import { BtnReturn } from '../../components/BtnReturn';

interface Params {
    pagCharacters: { 
        id: number,
        name: string,
        image: string,
        status: string;
        species: string,
        location: {
            name: string,
        }
        episode: [],
        favorities: boolean, 
    }
}

interface EpisodeType {
    id: number, 
    name: string, 
    episode: string
}

export default function Character(){

    //recuperar o objeto 'pagCharacters', que é passado pela chamada da navegação da paǵina
    const route = useRoute(); 
    const { pagCharacters} = route.params as Params; 
    
    const [episode, setEpisode] = useState<EpisodeType[]>([]); 
    const [btnFavoriteStatus, setBtnFavoriteStatus] = useState(false); 
    const [charactersIdAsyncStorageList, setCharactersIdAsyncStorageList] = useState(''); 

    let convertStringValue = ''; 

    async function getIdArrayCharacters(){
        const response = await AsyncStorage.getItem('@rickmorty:idArray'); 
        if(response !== null){
            console.log('Possuí o array de ids salvos')
            setCharactersIdAsyncStorageList(response); 
        }
    }

    async function getIButtonFavoriteAsyncStorage(){
        const response = await AsyncStorage.getItem('@rickmorty:buttonFavorite'); 
        if(response !== null){
            let convertBoolean = response.toLowerCase() == 'true';
            setBtnFavoriteStatus(convertBoolean); 
        }
    }

    async function setIdArrayCharacterAsyncStorage(idList: string){
        await AsyncStorage.setItem('@rickmorty:idArray', idList); 
    }

    async function setButtonFavoriteAsyncStorage(buttonFavorite: string){
        await AsyncStorage.setItem('@rickmorty:buttonFavorite', buttonFavorite); 
    }

    function setIdCharacter(id: number){
        var idConvertedToArray = charactersIdAsyncStorageList.split(',').map(Number); 

        if(!idConvertedToArray.includes(id)){
            
            idConvertedToArray.push(id)
            const removeRepeatedValues = [ ...new Set( idConvertedToArray ) ];
            
            //Remover o valor 0, apenas na primeira inclusão do array
            if(removeRepeatedValues.includes(0)){
                removeRepeatedValues.splice(removeRepeatedValues.indexOf(0), 1);
            }

            convertStringValue = removeRepeatedValues.toString();
            setIdArrayCharacterAsyncStorage(convertStringValue); 

        } else {
            idConvertedToArray.splice(idConvertedToArray.indexOf(id), 1);
            convertStringValue = idConvertedToArray.toString();
            setIdArrayCharacterAsyncStorage(convertStringValue); 
        }
    }

    function handleEpisodes(){
        
        const arreyEpisodes = pagCharacters.episode
        const filteredUrl = arreyEpisodes.map(getEpisodeNumberFromUr)

        fetchEpisodes(); 

        async function fetchEpisodes(){
            try {
              const result = await axios.get(`https://rickandmortyapi.com/api/episode/${filteredUrl}`)
                const resultdata = result.data; 
          
                  if(!resultdata)
                    return console.log('Requisição concluída')
        
                    // Quando tiver apenas 1 episódio, precisa mudar a forma de receber os dados
                    if(resultdata.length > 1)
                        setEpisode([...episode, ...resultdata])
                    else 
                        setEpisode(oldState => [ ...oldState, resultdata ])
            } catch(error){
                console.log(error)
            }
        }
    }

    function getEpisodeNumberFromUr(fullUrl: string){
        const episodeNumber = fullUrl.replace('https://rickandmortyapi.com/api/episode/', '') 
        return episodeNumber
    }

    function handleFavoriteCharacter(){ 

        if(btnFavoriteStatus){
            setBtnFavoriteStatus(false)
            AsyncStorage.removeItem('userId');
        } else {
            setBtnFavoriteStatus(true)
            setButtonFavoriteAsyncStorage('true')
        }

        const characterId = pagCharacters.id; 
        setIdCharacter(characterId)
    }

    useEffect(() => {
        getIdArrayCharacters(); 
        getIButtonFavoriteAsyncStorage(); 
    }, [])

    useEffect(() => {
        handleEpisodes(); 
    }, [])

    return(
        <Container>
            <BtnReturn 
                title='Voltar'
            />
            <Header>
                <Image
                    source={{uri: pagCharacters.image}}
                    resizeMode="cover"
                />
                <FavoriteContainer>
                    <Title>{pagCharacters.name}</Title>
                    <BtnFavorite
                        onPress={handleFavoriteCharacter}
                    >
                        {
                            btnFavoriteStatus ? 
                            (<IconFavorite name='star'/>) : 
                            (<IconFavorite name='staro'/>)
                        }
                    </BtnFavorite>
                </FavoriteContainer>
            </Header>
            <Description>
                <Section>
                    <SubTitle>About the character</SubTitle>
                    <TopicsContainer>
                        <Topic>Status: </Topic>
                        <Text>{pagCharacters.status}</Text>
                    </TopicsContainer>
                    <TopicsContainer>
                        <Topic>Location: </Topic>
                        <Text>{pagCharacters.location.name}</Text>
                    </TopicsContainer>
                    <TopicsContainer>
                        <Topic>Species: </Topic>
                        <Text>{pagCharacters.species}</Text>
                    </TopicsContainer>
                </Section>
                <Section>
                    <SubTitle>Episodes list</SubTitle>
                    <EpisodesList 
                        showsVerticalScrollIndicator={true} 
                        nestedScrollEnabled={true}
                    >
                        {
                            episode.map( (item: EpisodeType) => (
                                <EpisodeContainer key={item.id}>
                                    <TopicEpisode>{item.name}</TopicEpisode>  
                                    <Text>{item.episode}</Text>  
                                </EpisodeContainer>
                            ))
                        }
                    </EpisodesList>
                </Section>
            </Description>
        </Container>
    )
}   