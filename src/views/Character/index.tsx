import React, {useState, useEffect} from 'react'; 
import { useRoute } from '@react-navigation/core'; //para recuperar valores passados pela rota
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 

import {ScrollView} from 'react-native'; 

import { 
    BtnFavorite,
    Container, 
    Description,
    EpisodeContainer, 
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
    TopicsContainer 
} from './styles';
import { BtnReturn } from '../../components/BtnReturn';

interface Params {
    pagCharacters: { 
        id: string,
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
    id: string, 
    name: string, 
    episode: string
}

export default function Character(){

    //recuperar o objeto 'pagCharacters', que é passado pela chamada da navegação da paǵina
    const route = useRoute(); 
    const { pagCharacters} = route.params as Params; 
    
    const [btnFavoriteStatus, setBtnFavoriteStatus] = useState(false); 
    const [episode, setEpisode] = useState<EpisodeType[]>([]); 

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
        setBtnFavoriteStatus(!btnFavoriteStatus)

        const characterId = pagCharacters.id; 
        const convertedIdToString = characterId.toString();

        async function setCharacterIdForAsyncStorage(){
            await AsyncStorage.setItem('@rickmorty:id', convertedIdToString); 
            console.log('Valor salvo')
        }
        setCharacterIdForAsyncStorage(); 
    }

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
                    <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
                        {
                            episode.map( (item: EpisodeType) => (
                                <EpisodeContainer key={item.id}>
                                    <TopicEpisode>{item.name}</TopicEpisode>  
                                    <Text>{item.episode}</Text>  
                                </EpisodeContainer>
                            ))
                        }
                    </ScrollView>
                </Section>
            </Description>
        </Container>
    )
}   