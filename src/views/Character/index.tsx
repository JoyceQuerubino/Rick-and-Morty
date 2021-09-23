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
    
    const [btnFavoriteStatus, setBtnFavoriteStatus] = useState(false); 
    const [episode, setEpisode] = useState<EpisodeType[]>([]); 

    const [valorinicial, setvalorInicial] = useState(''); 

    let convertStringValue = ''; 


    async function getIdArrayCharacters(){
        console.log('verificou se existe dados salvos no arrey de ID')
        const response = await AsyncStorage.getItem('@rickmorty:idArray'); 
        if(response !== null){
            console.log('Possuí o array de ids salvos')
            setvalorInicial(response); 
        }
    }

    async function setIdArrayCharacterAsyncStorage(valor){
        await AsyncStorage.setItem('@rickmorty:idArray', valor); 
        console.log('Valor convertido salvo no dispositivo')
    }

    function setIdCharacter(id: number){
        console.log(`Valor inicial que vem abaixo: ${valorinicial}`) 

        var ConvertervaloresEmArrey = valorinicial.split(',').map(Number); 

        if(!ConvertervaloresEmArrey.includes(id)){
            ConvertervaloresEmArrey.push(id)
            console.log(ConvertervaloresEmArrey);
    
            const removervaloresiguais = [ ...new Set( ConvertervaloresEmArrey ) ];
    
            convertStringValue = removervaloresiguais.toString();
    
            setIdArrayCharacterAsyncStorage(convertStringValue); 

            console.log(`O array é esse aqui: ${convertStringValue}`)
        } else {
            ConvertervaloresEmArrey.splice(ConvertervaloresEmArrey.indexOf(id), 1);

            convertStringValue = ConvertervaloresEmArrey.toString();
            
            console.log(`O valor foi removido com sucesso, o array agora é: ${ConvertervaloresEmArrey}`);

            console.log(`A string agora é: ${convertStringValue}`);
            
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
        setBtnFavoriteStatus(!btnFavoriteStatus)

        const characterId = pagCharacters.id; 
        setIdCharacter(characterId)

    }

    useEffect(() => {
        getIdArrayCharacters(); 
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