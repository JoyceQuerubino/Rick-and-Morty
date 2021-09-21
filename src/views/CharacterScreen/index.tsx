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


    // async function fetchEps(){
    //     try {
    //       const result = await axios.get(`${pagCharacters.episode}`)
    //       const resultdata = result.data.results; 
    //       console.log(resultdata)
      
    //           if(!resultdata)
    //             return console.log('nada')
    
    //             setEps([...eps, ...resultdata])
    
    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    async function getData(){
        const response = await AsyncStorage.getItem('@rickmorty:favorities'); 
        if(response !== null){
            console.log('Tem dado')
            setTeste(JSON.parse(response)); 
            console.log(teste)

        }
    }

    async function setData(){
        await AsyncStorage.setItem('@rickmorty:favorities', JSON.stringify(teste), (err)=> {
            console.log("Adicionado com sucesso");
            if(err){
                console.log("an error");
                throw err;
            }
        })
    }

    async function removeData(){
        await AsyncStorage.removeItem('@rickmorty:favorities')
        console.log("Removido");
    }

    
    async function handleFavoriteCharacter(){ 
        if(!teste.pagCharacters.favorities){
            teste.pagCharacters.favorities = true
            setData(); 
        } else {
            teste.pagCharacters.favorities = false
            removeData();
        }
    }

    useEffect(() => {
        getData();
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