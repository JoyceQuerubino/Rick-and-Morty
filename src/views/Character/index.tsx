import React, {useState, useEffect} from 'react'; 
import { useRoute } from '@react-navigation/core'; //para recuperar valores passados pela rota
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 

import { 
    Container, 
    Content,
    Title, 
    Image, 
    Description,
    FavoriteContainer,
    BtnFavorite,
    IconFavorite, 
    Strip, 
    SubTitle, 
    TopicsContainer, 
    Topic,
    Text, 
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

export default function Character(){

    //recuperar o objeto 'pagCharacters', que é passado pela chamada da navegação da paǵina
    const route = useRoute(); 
    const { pagCharacters} = route.params as Params; 
    const [btnFavoriteStatus, setBtnFavoriteStatus] = useState(false); 

    const [eps, setEps] = useState<Params[]>([]); 
    // const [teste, setTeste] = useState({pagCharacters}); 

    function handleEpisodes(){
        const arreyEpisodes = pagCharacters.episode
        
        const novo = arreyEpisodes.map(getEpisodeNumberFromUr)
        // console.log(novo);

        fetchEps(); 

        async function fetchEps(){
            try {
              const result = await axios.get(`https://rickandmortyapi.com/api/episode/${novo}`)
                const resultdata = result.data; 
                console.log('OLHA APARTIR DAQUI')
                console.log(resultdata.id) //Duvida aqui 
          
                  if(!resultdata)
                    return console.log('Requisição concluída')
        
                    setEps([...eps, ...resultdata])
        
            } catch(error){
                console.log(error)
            }
        }

    }
    function getEpisodeNumberFromUr(fullUrl: string){
        const ep = fullUrl.replace('https://rickandmortyapi.com/api/episode/', '') 
        return ep
    }

    function handleFavoriteCharacter(){ 
        setBtnFavoriteStatus(!btnFavoriteStatus)

        const valor = pagCharacters.id; 
        const valorConvertido = valor.toString();
        console.log(valorConvertido)

        async function setIDCharacterAsyncStorage(){
            await AsyncStorage.setItem('@rickmorty:id', valorConvertido); 
            console.log('Valor salvo')
        }
    
        setIDCharacterAsyncStorage(); 
    }

    useEffect(() => {
        handleEpisodes(); 
    }, [])


    return(
        <Container>
            <BtnReturn 
                title='Voltar'
            />
            <Content>
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
            </Content>

            <Description>
                <Strip>
                    <SubTitle>About the character</SubTitle>
                </Strip>
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
                <Strip>
                    <SubTitle>Episodes list</SubTitle>
                </Strip>
            </Description>
        </Container>
    )
}   