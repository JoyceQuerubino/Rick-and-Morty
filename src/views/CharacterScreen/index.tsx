import React from 'react'; 
import { useRoute } from '@react-navigation/core'; //para recuperar valores passados pela rota

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
    }
}

export default function CharacterScreen(){

    //recuperar o objeto 'pagCharacters', que é passado pela chamada da navegação da paǵina
    const route = useRoute(); 
    const { pagCharacters } = route.params as Params; 


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
                    <BtnFavorite>
                    </BtnFavorite>
                </FavoriteContainer>
            </Content>

            <Description>
                <Strip>
                    <SubTitle>Sobre o personagem</SubTitle>
                </Strip>
                <TopicsContainer>
                    <Topic>Localização: </Topic>
                    <Text>OI</Text>
                </TopicsContainer>
                <TopicsContainer>
                    <Topic>Espécie: </Topic>
                    <Text>OI</Text>
                </TopicsContainer>
            </Description>

        </Container>
    )
}   