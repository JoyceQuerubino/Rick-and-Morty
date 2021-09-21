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
        species: string,
        location: {
            name: string,
        }
        episode: [],
        favorities: boolean, 
    }
}

export default function CharacterScreen(){

    //recuperar o objeto 'pagCharacters', que é passado pela chamada da navegação da paǵina
    const route = useRoute(); 
    const { pagCharacters} = route.params as Params; 

    const [eps, setEps] = useState<Params[]>([]); 
    const [teste, setTeste] = useState({pagCharacters}); 

   

    const [arrayFavorites, setArrayFavorites] = useState<String[]>([]); 

    function handleEpisodes(){
        const arreyEpisodes = pagCharacters.episode
        
        const novo = arreyEpisodes.map(getEpisodeNumberFromUr)
        // console.log(novo);

        fetchEps(); 

        async function fetchEps(){
            try {
              const result = await axios.get(`https://rickandmortyapi.com/api/episode/${novo}`)
                //   const resultdata = result.data.results; 
                // console.log('OLHA APARTIR DAQUI')
                // console.log(result)
          
                //   if(!resultdata)
                //     return console.log('nada')
        
                //     setEps([...eps, ...resultdata])
        
            } catch(error){
                console.log(error)
            }
        }

    }
    function getEpisodeNumberFromUr(fullUrl: string){
        //nesse caso se a url mudar eu não preciso me preocupar
        const ep = fullUrl.replace('https://rickandmortyapi.com/api/episode/', '') 
        return ep
    }

   

    async function getData(){
        const response = await AsyncStorage.getItem('@rickmorty:id'); 
        if(response !== null){
            console.log('Tem dado')
            // console.log(`o dado é ${response}`)
        }
    }

    async function setIDCharacterAsyncStorage(arrayFavorites: String[]){
        await AsyncStorage.setItem('@rickmorty:id', JSON.stringify(arrayFavorites), (err)=> {
            console.log("Adicionado com sucesso");
            console.log(arrayFavorites);
            if(err){
                console.log("Ocorreu um erro");
                throw err;
            }
        })
    }

    async function removeData(arrayFavorites: String[]){
        const id = teste.pagCharacters.id
        arrayFavorites.splice(arrayFavorites.indexOf(id)); 
        console.log("Removido");
        console.log(arrayFavorites)

        await AsyncStorage.removeItem('@rickmorty:id')
       
    }

    
    function handleFavoriteCharacter(){ 
        if(!teste.pagCharacters.favorities){
            teste.pagCharacters.favorities = true
            const idCharacter = teste.pagCharacters.id

            setArrayFavorites(oldSkill => [...oldSkill, idCharacter])
            
            setIDCharacterAsyncStorage(arrayFavorites);

        } else {
            teste.pagCharacters.favorities = false
            const idCharacter = teste.pagCharacters.id
            setArrayFavorites(arrayFavorites.splice(arrayFavorites.indexOf(idCharacter), 1))
            console.log("Removido");
            console.log(arrayFavorites); 
        }
    }

    // useEffect(() => {
    //     getData();
    // }, [])

    // useEffect(() => {
    //     arrayFavorites;
    // }, [])

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
                        onPress={() => handleFavoriteCharacter()}
                    >
                    </BtnFavorite>
                </FavoriteContainer>
            </Content>

            <Description>
                <Strip>
                    <SubTitle>Sobre o personagem</SubTitle>
                </Strip>
                <TopicsContainer>
                    <Topic>Localização: </Topic>
                    <Text>{pagCharacters.location.name}</Text>
                </TopicsContainer>
                <TopicsContainer>
                    <Topic>Espécie: </Topic>
                    <Text>{pagCharacters.species}</Text>
                </TopicsContainer>
                <Strip>
                    <SubTitle>Episódios em que aparece</SubTitle>
                </Strip>
            </Description>
        </Container>
    )
}   